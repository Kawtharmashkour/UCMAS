class Component {
    constructor(name) {
      this.name = name;
    }
  
    // Common method to display the name of the component
    display() {
      console.log(this.name);
    }
  }
  
  // composite class represent programs, which can contain multiple courses
  class Program extends Component {
    constructor(name) {
      super(name);
      this.children = []; // Array to hold courses
    }
  
    async fetchPrograms() {
        try {
            const response = await fetch('/api/v1/program'); 
            const programs = await response.json();
            const programSelect = document.getElementById('programSelect');

            // Add a placeholder option at the start of the select
            let placeholderOption = new Option("Select a program", "", true, true);
            placeholderOption.disabled = true; // Make it unselectable
            programSelect.add(placeholderOption);

            programs.forEach(program => {
                let option = new Option(program.name, program._id);
                programSelect.add(option);
            });
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    }
  }

class Course extends Component{
    constructor(name,apiUrl) {
        super(name);
        this.apiUrl = apiUrl;
        this.coursesList = document.getElementById('coursesList');
        this.courseForm = document.getElementById('courseForm');
        this.courseForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('courseName').value;
        const program = document.getElementById('programSelect').value;
        const price = parseFloat(document.getElementById('coursePrice').value);
        const maxAge = parseInt(document.getElementById('courseMaxAge').value, 10);
        const duration = parseInt(document.getElementById('courseDuration').value, 10);
        const startDate = document.getElementById('courseStartDate').value;
        const endDate = document.getElementById('courseEndDate').value;
        console.log('New course name:',name);
    
        this.createCourse({
            name,
            program,
            price,
            maxAge,
            duration,
            startDate,
            endDate
        });
    };

    async createCourse(course) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course)
            });

            const responseData = await response.json();
            if (response.ok) {
                alert('New Course Created Successfully');
                this.fetchCourses();
            } else {
                console.error('Failed to create course:', responseData);
            }
        } catch (error) {
            console.error('Error creating course:', error);
        }
    }

    async fetchCourses() {
        try {
            const apiUrl = this.apiUrl + '?program='; // Append program IDs as needed
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const courses = await response.json();
            this.displayCourses(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    
    }

    displayCourses(courses) {
        this.coursesList.innerHTML = ''; // clear existing courses
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'col-md-4 mt-3';
            courseElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${course.name}</h5>
                        <p class="card-text">${course.price || 'No description available'}</p>
                    </div>
                </div>
            `;
            this.coursesList.appendChild(courseElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const manager = new Course('Course Manager', '/api/v1/course');
    manager.fetchCourses();

    const programs = new Program('Program Manager');
    programs.fetchPrograms();

    fetch('/api/v1/user/students/pending')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('pendingRegistrations');
            data.forEach(student => {
                const studentElement = document.createElement('div');
                studentElement.innerHTML = `
                    <h3>${student.userName} (${student.userEmail})</h3>
                    <ul>
                        ${student.pendingCourses.map(course => `
                                <li>${course.courseName} - Registered on ${new Date(course.registrationDate).toLocaleDateString()}
                                    <button onclick="approveRegistration('${student.userId}', '${course.courseId}')" class="btn btn-success btn-sm">Approve</button>
                                    <button onclick="deleteRegistration('${student.userId}', '${course.courseId}')" class="btn btn-danger btn-sm">Delete</button>
                                </li>
                        `).join('')}
                    </ul>
                `;
                container.appendChild(studentElement);
            });
        })
        .catch(error => console.error('Error loading pending registrations:', error));

});

// functions
function approveRegistration(userId, courseId) {
    fetch(`/api/v1/user/students/approve/${userId}/${courseId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert('Registration approved!');
            location.reload(); // Reload the page to update the list
        })
        .catch(error => {
            console.error('Error approving registration:', error);
            alert('Failed to approve registration.');
        });
}

function deleteRegistration(userId, courseId) {
    fetch(`/api/v1/user/students/delete/${userId}/${courseId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert('Registration deleted!');
            location.reload(); // Reload the page to update the list
        })
        .catch(error => {
            console.error('Error deleting registration:', error);
            alert('Failed to delete registration.');
        });
}
