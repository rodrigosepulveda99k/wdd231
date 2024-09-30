// Responsive Menu Toggle
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

// Dynamic Year for Footer Copyright
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Dynamic Last Modified Date
document.getElementById('lastModified').textContent = "Last modified: " + document.lastModified;

// Course List Array
const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 3, completed: true },
    { code: "CSE 210", name: "Data Structures", credits: 3, completed: false },
    { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD 131", name: "JavaScript Programming", credits: 3, completed: false },
    { code: "WDD 231", name: "Intermediate CSS", credits: 3, completed: false }
];

// Display Courses Function
function displayCourses(filter = "all") {
    const courseContainer = document.getElementById('course-container');
    courseContainer.innerHTML = ''; 
    
    const filteredCourses = courses.filter(course => {
        if (filter === 'all') return true;
        return course.code.startsWith(filter);
    });
    
    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-card');
        
        if (course.completed) {
            courseDiv.classList.add('completed-course'); 
        }

        courseDiv.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseContainer.appendChild(courseDiv);
    });

    // Calculate and display total credits
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits: ${totalCredits}`;
}

// Filter Buttons Event Listeners
document.getElementById('show-all').addEventListener('click', () => displayCourses('all'));
document.getElementById('show-cse').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('show-wdd').addEventListener('click', () => displayCourses('WDD'));

// Initial display of all courses
displayCourses('all');
