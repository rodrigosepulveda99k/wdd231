const msgOutput = document.querySelector("#visit-message");
const msPerDay = 86400000;

const displayMessage = () => {
    if (localStorage.lastVisit) {
        const currentDate = Date.now();
        let lastVisit = localStorage.lastVisit;
        const dayCount = (currentDate - lastVisit) / msPerDay;
        if ( dayCount < 1) {
            msgOutput.textContent = "Back so soon? Awesome!"
        } else if (dayCount.toFixed(0) == 1) {
            msgOutput.textContent = `You last visited 1 day ago.`
        } else {
            msgOutput.textContent = `You last visited ${dayCount.toFixed(0)} days ago.`
        }
    } else {
        msgOutput.textContent = "Welcome! Let us know if you have any questions."
    }
}

displayMessage();
localStorage.setItem("lastVisit", Date.now());
