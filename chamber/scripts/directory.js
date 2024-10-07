// DOM objects to use
const listToggle = document.querySelector("#list-toggle");
const cardsContainer = document.querySelector("#cards-container");

// List/card toggle
listToggle.addEventListener('click', () => {
	cardsContainer.classList.toggle('list');
});

// Directory generation
const directoryJSON = 'data/members.json';

async function getMembers() {
    const response = await fetch(directoryJSON);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) => {
    cardsContainer.innerHTML = "";
    let counter = 0;
    members.forEach(member => {
        const card = document.createElement("div")
        card.classList.add("company-card");
        
        const name = document.createElement("p");
        name.classList.add("name");
        name.textContent = member.name;
        card.appendChild(name);

        const image = document.createElement("img");
        image.setAttribute("src", member.image);
        image.setAttribute("alt", `${member.name} company logo`);
        if(counter>3) {
            image.setAttribute("loading", "lazy");
        }
        image.setAttribute("width",   140);
        image.setAttribute("height",  100);
        card.appendChild(image);

        const address = document.createElement("p");
        address.classList.add("address");
        address.textContent = member.address;
        card.appendChild(address);

        const phone = document.createElement("p");
        phone.classList.add("phone");
        phone.textContent = `Phone: ${member.phone}`;
        card.appendChild(phone);

        const whatsapp = document.createElement("p");
        whatsapp.classList.add("whatsapp");
        whatsapp.textContent = `Whatsapp: ${member.whatsapp}`;
        card.appendChild(whatsapp);

        const url = document.createElement("p");
        url.classList.add("url");
        url.textContent = member.url;
        card.appendChild(url);

        const membership = document.createElement("p")
        membership.classList.add("membership");
        if(member.membership == 1) {
            membership.textContent = "Member";
        }
        if(member.membership == 2) {
            membership.classList.add("silver");
            membership.textContent = "Silver member";
        }
        if(member.membership == 3) {
            membership.classList.add("gold");
            membership.textContent = "Gold member";
        }
        card.appendChild(membership);

        cardsContainer.appendChild(card);
    });
}

// initial load
getMembers();