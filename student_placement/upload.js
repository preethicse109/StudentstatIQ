document.getElementById('collegeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formValid = true;
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        if (!input.value) {
            formValid = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '1px solid #ccc';
        }
    });

    if (formValid) {
        alert('Form submitted successfully!');
        // Here you can add code to submit the form data using AJAX or any other method
    } else {
        alert('Please fill all the fields.');
    }
});
