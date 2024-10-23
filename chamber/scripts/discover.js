const msgOutput = document.querySelector("#visit-message");
const msPerDay = 86400000;

const displayMessage = () => {
    if (localStorage.lastVisit) {
        const currentDate = Date.now();
        let lastVisit = localStorage.lastVisit;
        const dayCount = (currentDate - lastVisit) / msPerDay;
        if ( dayCount < 1) {
            msgOutput.textContent = "You're back Great!"
        } else if (dayCount.toFixed(0) == 1) {
            msgOutput.textContent = `You last visited 1 day ago`
        } else {
            msgOutput.textContent = `You last visited ${dayCount.toFixed(0)} days ago`
        }
    } else {
        msgOutput.textContent = "Welcome! Contact us for more information"
    }
}

displayMessage();
localStorage.setItem("lastVisit", Date.now());
