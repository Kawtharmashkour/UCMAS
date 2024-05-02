        // Define classes
        class Component {
            constructor(name) {
                this.name = name;
            }
        
            async render(container) {
                const element = document.createElement('div');
                element.textContent = this.name;
                container.appendChild(element);
                await this.renderChildren(element);
            }

            async renderChildren(container) {
                // Default implementation, overridden by subclasses if needed
            }
        }
        
        class Program extends Component {
            constructor(name) {
                super(name);
                this.children = [];
            }
        
            add(course) {
                this.children.push(course);
            }
        
            async render(container) {
                const element = document.createElement('div');
                element.textContent = `Program: ${this.name}`;
                container.appendChild(element);
                await this.renderChildren(element);
            }
        
            async renderChildren(container) {
                for (const child of this.children) {
                    await child.render(container);
                }
            }
        }
        
        class Course extends Component {
            constructor(name) {
                super(name);
                this.students = [];
            }
        
            addStudent(student) {
                this.students.push(student);
            }
        
            async render(container) {
                const element = document.createElement('div');
                element.textContent = `Course: ${this.name}`;
                container.appendChild(element);
                for (const student of this.students) {
                    const studentElement = document.createElement('div');
                    studentElement.textContent = `- Student: ${student.name}`;
                    element.appendChild(studentElement);
                }
            }
        }
        
        class Student {
            constructor(name) {
                this.name = name;
            }
        }

// Function to fetch programs from the server
async function fetchPrograms() {
    const response = await fetch('/program');
    console.log(programs);
    const programs = await response.json();
    console.log(programs);
    return programs;
}

// Function to render programs
async function renderPrograms() {
    const programsContainer = document.getElementById('programsContainer');
    programsContainer.innerHTML = ''; // Clear previous content
    const programs = await fetchPrograms();
    for (const programData of programs) {
        const program = new Program(programData.name);
        for (const courseData of programData.courses) {
            const course = new Course(courseData.name);
            for (const studentData of courseData.students) {
                const student = new Student(studentData.name);
                course.addStudent(student);
            }
            program.add(course);
        }
        await program.render(programsContainer);
    }
}

// Function to add a new program
async function addProgram(event) {
    event.preventDefault();
    const programNameInput = document.getElementById('programName');
    const programName = programNameInput.value;
    if (!programName) {
        alert('Please enter a program name');
        return;
    }
    try {
        const response = await fetch('/program', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: programName })
        });
        if (!response.ok) {
            throw new Error('Failed to add program');
        }
        programNameInput.value = ''; // Clear input field
        renderPrograms(); // Refresh programs list
    } catch (error) {
        console.error('Error adding program:', error.message);
        alert('Failed to add program. Please try again.');
    }
}

// Event listener for form submission
const addProgramForm = document.getElementById('addProgramForm');
addProgramForm.addEventListener('submit', addProgram);

// Initial rendering of programs
renderPrograms();

// Event lister wen page loaded
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/v1/course')
        .then(response => response.json())
        .then(data => {
            const coursesContainer = document.getElementById('coursesList');
            data.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.className = 'col-md-4 mt-3';
                courseElement.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${course.name}</h5>
                           
                        </div>
                    </div>
                `;
                coursesContainer.appendChild(courseElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});