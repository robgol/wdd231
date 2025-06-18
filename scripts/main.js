// Fetching and displaying properties dynamically
const propertiesContainer = document.querySelector("#listings");

// Load property data asynchronously
async function loadProperties() {
    try {
        const response = await fetch("./data/properties.json");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const properties = await response.json();

        propertiesContainer.innerHTML = properties.map(property => `
            <div class="property">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <h3>${property.title}</h3>
                <p>${property.price}</p>
                <button onclick="showDetails('${property.id}')">Details</button>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading properties:", error);
    }
}

// Show property details in a modal
function showDetails(propertyId) {
    // Fetch property details and display modal logic here
}

// Save user preferences (e.g., recently viewed properties)
function savePreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Run on load
loadProperties();

// Responsive navigation menu toggle
const mobileMenu = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});