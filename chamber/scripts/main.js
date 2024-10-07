const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");
const bodyTag = document.querySelector("body");

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

// Dynamic Year for Footer Copyright
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Dynamic Last Modified Date
document.getElementById('lastModified').textContent = "Last modified: " + document.lastModified;