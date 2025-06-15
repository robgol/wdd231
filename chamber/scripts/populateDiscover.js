document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".businesses-discover");

    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((business, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.gridArea = `card${index + 1}`;

                card.innerHTML = `
                    <h2>${business.name}</h2>
                    <figure>
                        <img src="images/${business.image}" alt="${business.name} logo" loading="lazy" />
                    </figure>
                    <address>${business.address}</address>
                    <p>${business.description}</p>
                    <a href="#" target="_blank" class="website-link">learn more</a>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading JSON data:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("main h1");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("visit-message");

    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const daysSinceLastVisit = Math.floor((now - lastVisit) / millisecondsInADay);

        if (daysSinceLastVisit < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysSinceLastVisit} ${
                daysSinceLastVisit === 1 ? "day" : "days"
            } ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);

    const messageText = document.createElement("span");
    messageText.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.classList.add("close-button");

    closeButton.addEventListener("click", () => {
        messageContainer.remove();
    });

    messageContainer.appendChild(messageText);
    messageContainer.appendChild(closeButton);

    header.insertAdjacentElement("afterend", messageContainer);
});
