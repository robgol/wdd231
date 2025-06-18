document.addEventListener('DOMContentLoaded', () => {
    const propertyGrid = document.getElementById('property-grid');
    const typologyFilter = document.getElementById('typology-filter');
    let allProperties = []; 

    function displayProperties(propertiesToDisplay) {
        propertyGrid.innerHTML = ''; 
        propertiesToDisplay.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.classList.add('property-card');

            propertyCard.innerHTML = `
                <img src="${property.images[0]}" alt="${property.tipology} in ${property.location}">
                <h3>${property.tipology}</h3>
                <p><strong>Location:</strong> ${property.location}</p>
                <p><strong>Price:</strong> $${property.price.toLocaleString()}</p>
                <p><strong>Area:</strong> ${property.area} sqft</p>
                <a href="property-details.html?id=${property.id}" class="button">View Details</a>
            `;
            propertyGrid.appendChild(propertyCard);
        });
    }

    fetch('data/properties.json')
        .then(response => response.json())
        .then(data => {
            allProperties = data.properties; 
            displayProperties(allProperties); 

            const typologies = [...new Set(allProperties.map(property => property.tipology))];
            typologies.forEach(typology => {
                const option = document.createElement('option');
                option.value = typology;
                option.textContent = typology;
                typologyFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching properties:', error));

    typologyFilter.addEventListener('change', (event) => {
        const selectedTypology = event.target.value;
        if (selectedTypology === 'all') {
            displayProperties(allProperties); 
        } else {
            const filteredProperties = allProperties.filter(property =>
                property.tipology === selectedTypology
            );
            displayProperties(filteredProperties); 
        }
    });
});
