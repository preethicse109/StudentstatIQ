from flask import Flask, request, render_template, send_from_directory, send_file, session
import os
import docx2txt
import PyPDF2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import zipfile
import io

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'  # Directory for uploaded files
FILTERED_FOLDER = 'filtered_resumes/'  # Directory for filtered resumes
app.secret_key = 'your_secret_key'  # Required for session to work

# Functions to extract text from different file types
def extract_text_from_pdf(file_path):
    """Extract text from PDF files."""
    text = ""
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text


def extract_text_from_docx(file_path):
    """Extract text from DOCX files."""
    return docx2txt.process(file_path)


def extract_text_from_txt(file_path):
    """Extract text from TXT files."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()


def extract_text(file_path):
    """Determine the file type and extract text accordingly."""
    if file_path.endswith('.pdf'):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        return extract_text_from_docx(file_path)
    elif file_path.endswith('.txt'):
        return extract_text_from_txt(file_path)
    else:
        return ""


# Routes
@app.route("/")
def home():
    """Render the home page."""
    return render_template("student_placement/home.html")


@app.route("/matchresume")
def matchresume():
    """Render the Resume Matcher page."""
    return render_template('matchresume.html')


@app.route('/matcher', methods=['POST'])
def matcher():
    """
    Handle the resume matching logic:
    - Accept job description input.
    - Process uploaded resumes.
    - Calculate cosine similarity scores.
    - Return top matching resumes and their scores.
    """
    if request.method == 'POST':
        job_description = request.form['job_description']
        resume_files = request.files.getlist('resumes')  # Multiple resume files

        resumes = []
        filenames = []
        for resume_file in resume_files:
            # Save the uploaded resume file and extract its text
            filename = os.path.join(app.config['UPLOAD_FOLDER'], resume_file.filename)
            resume_file.save(filename)
            resumes.append(extract_text(filename))
            filenames.append(resume_file.filename)

        # Validation: Ensure both job description and resumes are provided
        if not resumes or not job_description:
            return render_template('matchresume.html', message="Please upload resumes and enter a job description.")

        # Vectorize job description and resumes
        vectorizer = TfidfVectorizer().fit_transform([job_description] + resumes)
        vectors = vectorizer.toarray()

        # Calculate cosine similarities
        job_vector = vectors[0]
        resume_vectors = vectors[1:]
        similarities = cosine_similarity([job_vector], resume_vectors)[0]

        # Get top 5 resumes and their similarity scores
        top_indices = similarities.argsort()[-5:][::-1]  # Indices of top 5 scores
        top_resumes = [filenames[i] for i in top_indices]
        similarity_scores = [round(similarities[i], 2) for i in top_indices]

        # Save filtered resumes to the filtered folder
        if not os.path.exists(FILTERED_FOLDER):
            os.makedirs(FILTERED_FOLDER)
        for i in top_indices:
            resume_path = os.path.join(app.config['UPLOAD_FOLDER'], filenames[i])
            filtered_resume_path = os.path.join(FILTERED_FOLDER, filenames[i])
            if os.path.exists(resume_path):
                with open(resume_path, 'rb') as original, open(filtered_resume_path, 'wb') as filtered:
                    filtered.write(original.read())

        # Store top resumes in session for access in other routes
        session['top_resumes'] = top_resumes

        # Render the results
        return render_template(
            'matchresume.html',
            message="Top matching resumes:",
            top_resumes=top_resumes,
            similarity_scores=similarity_scores
        )

    return render_template('matchresume.html')


@app.route("/home")
def student_home():
    """Render the home page (alternative route)."""
    return render_template("student_placement/home.html")


@app.route('/upload')
def upload():
    return render_template('student_placement/upload.html')


@app.route('/login1')
def login1():
    return render_template('student_placement/login1.html')


@app.route('/student')
def student():
    return render_template('student_placement/student.html')


@app.route('/download/<filename>')
def download_file(filename):
    """
    Serve the filtered PDF file for download.
    """
    return send_from_directory(FILTERED_FOLDER, filename, as_attachment=True, mimetype='application/pdf')


@app.route('/download_all')
def download_all():
    """
    Create a zip file of all top resumes and send it for download.
    """
    # Retrieve top resumes from session
    top_resumes = session.get('top_resumes', [])

    if not top_resumes:
        return render_template('matchresume.html', message="No resumes available to download.")

    # Create a zip file in memory
    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for resume_filename in top_resumes:
            resume_filepath = os.path.join(app.config['UPLOAD_FOLDER'], resume_filename)
            # Assuming the resume file is in the 'uploads' directory
            zip_file.write(resume_filepath, os.path.basename(resume_filename))

    zip_buffer.seek(0)
    return send_file(zip_buffer, as_attachment=True, download_name="top_resumes.zip", mimetype='application/zip')


# Main entry point
if __name__ == '__main__':
    # Create the upload folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    if not os.path.exists(FILTERED_FOLDER):
        os.makedirs(FILTERED_FOLDER)
    app.run(debug=True)
