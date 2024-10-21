// DOM declarations
const goldCard = document.querySelector("#goldCard");
const silverCard = document.querySelector("#silverCard");
const bronzeCard = document.querySelector("#bronzeCard");
const npCard = document.querySelector("#npCard");
const goldModal = document.querySelector("#goldModal");
const silverModal = document.querySelector("#silverModal");
const bronzeModal = document.querySelector("#bronzeModal");
const npModal = document.querySelector("#npModal");
const timestamp = document.querySelector("#timestamp");

// Event listeners
goldCard.addEventListener("click", () => {
  goldModal.showModal();
});

silverCard.addEventListener("click", () => {
  silverModal.showModal();
});

bronzeCard.addEventListener("click", () => {
  bronzeModal.showModal();
});

npCard.addEventListener("click", () => {
  npModal.showModal();
});

goldModal.addEventListener("click", () => {
  goldModal.close();
});

silverModal.addEventListener("click", () => {
  silverModal.close();
});

bronzeModal.addEventListener("click", () => {
  bronzeModal.close();
});

npModal.addEventListener("click", () => {
  npModal.close();
});

function getDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    today = yyyy+""+mm+""+dd;

    document.getElementById("timestamp").value = today;
}

getDate();