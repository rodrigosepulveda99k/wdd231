// DOM objects to use
const cardsContainer = document.querySelector("#member-spotlight");

// Directory generation
const directoryJSON = 'data/members.json';

async function getMembers() {
    const response = await fetch(directoryJSON);
    const data = await response.json();
    const filteredMembers = data.members.filter(member => member.membership >1);
    const randomizedKeys = Object.keys(filteredMembers).sort(() => 0.5 - Math.random());
    cardsContainer.innerHTML = '';
    cardsContainer.appendChild(createMemberCard(filteredMembers[randomizedKeys[0]]));
    cardsContainer.appendChild(createMemberCard(filteredMembers[randomizedKeys[1]]));
    cardsContainer.appendChild(createMemberCard(filteredMembers[randomizedKeys[2]]));
    // console.log(filteredMembers.length);
}

const membershipText = (num) => {
    if(num == 1) {
        return "Member";
    }
    if(num == 2) {
        return "Silver member";
    }
    if(num == 3) {
        return "Gold member";
    }
}

const createMemberCard = (member) => {
    let newCard = document.createElement('div');
    newCard.setAttribute('class', 'featured-member-card');

    newCard.innerHTML = `<div class="title"><p class="company-name">${member.name}</p><p>${membershipText(member.membership)}</p></div>
                <div class="content">
                    <div class="logo"><img src="${member.image}" alt="${member.name} company logo" width="100" height="100"></div>
                    <div class="member-data">
                        <p class="email"><strong>EMAIL:</strong> ${member.email}</p>
                        <p class="phone">Phone: ${member.phone}</p>
                        <p class="url">${member.url}</p>
                    </div>
                </div> `;
    return newCard;
}

getMembers();