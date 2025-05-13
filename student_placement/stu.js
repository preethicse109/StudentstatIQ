document.addEventListener('DOMContentLoaded', function() {
    const studentsList = document.getElementById('students-list');
    const searchInput = document.getElementById('search-input');

    const studentProfiles = {
        all: [
            {
                name: 'KANIKA N',
                img: 'kanipass.jpg',
                department: 'BE-CSE',
                rollNo: '22CS061',
                bloodGroup: 'O+',
                dob: '18-03-2004',
                validUpto: '2022-2026',
                mobile: '7418941183',
                cv: 'kanika.pdf',
                upload: 'kani.html'
            },
            {
                name: 'LAKSHANA R',
                img: 'luxpass.jpg',
                department: 'BE-CSE',
                rollNo: '22CS073',
                bloodGroup: 'O-',
                dob: '08-12-2004',
                validUpto: '2022-2026',
                mobile: '8148854899',
                cv: 'lux.pdf',
                upload: 'lux.html'
            },
            {
                name: 'NANDHIKA SRI S',
                img: 'nannpass.jpeg',
                department: 'BE-CSE',
                rollNo: '22CS094',
                bloodGroup: 'O+',
                dob: '29-05-2004',
                validUpto: '2022-2026',
                mobile: '7904994652',
                cv: 'n resume.pdf',
                upload: 'nan.html'
            },
            {
                name: 'PREETHI S',
                img: 'preepass.jpg',
                department: 'BE-CSE',
                rollNo: '22CS109',
                bloodGroup: 'A+',
                dob: '19-10-2004',
                validUpto: '2022-2026',
                mobile: '9944795633',
                cv: 'preethi.pdf',
                upload: 'pree.html'
            },
            {
                name: 'PUNITHA PRINCILLA S',
                img: 'prin.jpg.jpg',
                department: 'BE-CSE',
                rollNo: '22CS113',
                bloodGroup: 'O+',
                dob: '13-10-2004',
                validUpto: '2022-2026',
                mobile: '6379800193',
                cv: 'punitha.pdf',
                upload: 'punitha.html'
            }
        ],
        python: [
            {
                name: 'KANIKA N',
                img: 'kanipass.jpg',
                department: 'BE-CSE',
                rollNo: '22CS061',
                bloodGroup: 'O+',
                dob: '18-03-2004',
                validUpto: '2022-2026',
                mobile: '7418941183',
                cv: 'kanika.pdf',
                upload: 'kani.html'
            },
            {
                name: 'LAKSHANA R',
                img: 'luxpass.jpg',
                department: 'BE-CSE',
                rollNo: '22CS073',
                bloodGroup: 'O-',
                dob: '08-12-2004',
                validUpto: '2022-2026',
                mobile: '8148854899',
                cv: 'lux.pdf',
                upload: 'lux.html'
            }
        ],
        java: [
            {
                name: 'NANDHIKA SRI S',
                img: 'nannpass.jpeg',
                department: 'BE-CSE',
                rollNo: '22CS094',
                bloodGroup: 'O+',
                dob: '29-05-2004',
                validUpto: '2022-2026',
                mobile: '7904994652',
                cv: 'n resume.pdf',
                upload: 'nan.html'
            },
            {
                name: 'PREETHI S',
                img: 'preepass.jpg',
                department: 'BE-CSE',
                rollNo: '22CS109',
                bloodGroup: 'A+',
                dob: '19-10-2004',
                validUpto: '2022-2026',
                mobile: '9944795633',
                cv: 'preethi.pdf',
                upload: 'pree.html'
            },
            {
                name: 'PUNITHA PRINCILLA S',
                img: 'prin.jpg.jpg',
                department: 'BE-CSE',
                rollNo: '22CS113',
                bloodGroup: 'O+',
                dob: '13-10-2004',
                validUpto: '2022-2026',
                mobile: '6379800193',
                cv: 'punitha.pdf',
                upload: 'punitha.html'
            }
        ]
    };

    function showProfiles(language) {
        studentsList.innerHTML = ''; 
        const profilesToShow = studentProfiles[language] || [];
        profilesToShow.forEach(profile => {
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            studentItem.innerHTML = `
                <div class="student-header">
                    ${profile.name} <button class="dropdown-btn">&#x25BC;</button>
                </div>
                <div class="student-details" style="display: none;">
                    <img src="${profile.img}" alt="${profile.name}'s Photo" class="student-photo">
                    <p>Department: ${profile.department}</p>
                    <p>Roll No: ${profile.rollNo}</p>
                    <p>Blood Group: ${profile.bloodGroup}</p>
                    <p>D.O.B: ${profile.dob}</p>
                    <p>Valid Upto: ${profile.validUpto}</p>
                    <p>Mobile No: ${profile.mobile}</p>
                    <div class="btn-group">
                        <a href="${profile.cv}" class="btn active" download="${profile.name}_CV.pdf">Download CV</a>
                        <a href="${profile.upload}" class="btn active">Upload</a>
                    </div>
                </div>
            `;
            studentsList.appendChild(studentItem);
            const dropdownBtn = studentItem.querySelector('.dropdown-btn');
            const details = studentItem.querySelector('.student-details');
            dropdownBtn.addEventListener('click', function() {
                details.style.display = details.style.display === 'none' || !details.style.display ? 'block' : 'none';
            });
        });
    }

    function searchProfiles(query) {
        studentsList.innerHTML = ''; 
        const lowerCaseQuery = query.toLowerCase();
        Object.keys(studentProfiles).forEach(language => {
            studentProfiles[language].forEach(profile => {
                if (profile.name.toLowerCase().includes(lowerCaseQuery) || language.includes(lowerCaseQuery)) {
                    const studentItem = document.createElement('div');
                    studentItem.className = 'student-item';
                    studentItem.innerHTML = `
                        <div class="student-header">
                            ${profile.name} <button class="dropdown-btn">&#x25BC;</button>
                        </div>
                        <div class="student-details" style="display: none;">
                            <img src="${profile.img}" alt="${profile.name}'s Photo" class="student-photo">
                            <p>Department: ${profile.department}</p>
                            <p>Roll No: ${profile.rollNo}</p>
                            <p>Blood Group: ${profile.bloodGroup}</p>
                            <p>D.O.B: ${profile.dob}</p>
                            <p>Valid Upto: ${profile.validUpto}</p>
                            <p>Mobile No: ${profile.mobile}</p>
                            <div class="btn-group">
                                <a href="${profile.cv}" class="btn active" download="${profile.name}_CV.pdf">Download CV</a>
                                <a href="${profile.upload}" class="btn active">Upload</a>
                            </div>
                        </div>
                    `;
                    studentsList.appendChild(studentItem);
                    const dropdownBtn = studentItem.querySelector('.dropdown-btn');
                    const details = studentItem.querySelector('.student-details');
                    dropdownBtn.addEventListener('click', function() {
                        details.style.display = details.style.display === 'none' || !details.style.display ? 'block' : 'none';
                    });
                }
            });
        });
    }

    // Initial load
    showProfiles('all');

    // Attach search event listener
    searchInput.addEventListener('input', function() {
        const query = searchInput.value;
        if (query) {
            searchProfiles(query);
        } else {
            // Show default profiles if search input is empty
            showProfiles('all');
        }
    });

    // Fix for initial profile button clicks
    const profileButtons = document.querySelectorAll('.dropdown-btn');
    profileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const language = this.textContent.trim().toLowerCase();
            showProfiles(language);
        });
    });
});
