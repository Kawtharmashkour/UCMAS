document.addEventListener('DOMContentLoaded', function() {
    fetchCourses();
    document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);
});

function fetchCourses() {
    fetch('/api/v1/course') // Modify this URL based on your actual API endpoint
        .then(response => response.json())
        .then(data => {
            const courseSelect = document.getElementById('courseSelect');
            data.forEach(course => {
                let option = new Option(course.name, course._id);
                courseSelect.add(option);
            });
        })
        .catch(error => console.error('Error loading courses:', error));
}

function handleFormSubmit(event) {
    event.preventDefault();
    const courseId = document.getElementById('courseSelect').value;
    const userId = '<%= user._id %>';  // Embedded from the server-side
    //const userId = 'yourUserId'; // This should be dynamically set, possibly stored in session or local storage
    console.log("current user id = ",userId);
    fetch('/api/v1/user/register-course', { // Modify this URL based on your API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, courseId: courseId })
    })
        .then(response => {
            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error registering for course:', error);
            alert('Error registering for course.');
        });
}

//upload assignment script
function submitAssignment() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
    const userId = '<%= user._id %>';  // Embedded from the server-side

    formData.append('courseId', document.getElementById('courseId').value);
    formData.append('studentId', userId);
    formData.append('gradeType', document.getElementById('gradeType').value);

    const pictures = document.getElementById('pictures').files;
    for (let i = 0; i < pictures.length; i++) {
        formData.append('pictures', pictures[i]);
    }

    fetch('/api/v1/grade/submitAssignment', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = `<div class="alert alert-success" role="alert">
            Successfully submitted! Score: ${data.score}
        </div>`;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<div class="alert alert-danger" role="alert">
            Error submitting assignment: ${error}
        </div>`;
    });
}
