const jsonPath = "data/members.json";

function getRandomItems(array, n) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        const spotlightContainer = document.querySelector(".businesses");

        const filteredMembers = data.filter(
            member => member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const spotlightMembers = getRandomItems(filteredMembers, 3);

        spotlightMembers.forEach(member => {
            const spotlightHTML = `
                <section class="business">
                    <div class="business-name">
                        <h3>${member.name}</h3>
                        <p>${member.membershipLevel === 3 ? "Gold Member" : "Silver Member"}</p>
                    </div>
                    <div class="business-details">
                        <img class="business-image" src="images/logo.jpg" alt="${member.name} Logo"/>
                        <div class="business-contacts">
                            <p><strong>Address:</strong> ${member.address}</p>
                            <p><strong>Phone:</strong> ${member.phone}</p>
                            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        </div>
                    </div>
                </section>
            `;
            spotlightContainer.innerHTML += spotlightHTML;
        });
    })
    .catch(error => console.error("Error fetching spotlight data:", error));