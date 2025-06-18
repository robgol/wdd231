document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get('id');

    const detailTitle = document.getElementById('detail-title');
    const detailTypology = document.getElementById('detail-typology');
    const detailLocation = document.getElementById('detail-location');
    const detailPrice = document.getElementById('detail-price');
    const detailArea = document.getElementById('detail-area');
    const detailViews = document.getElementById('detail-views'); 
    const propertyImagesGallery = document.getElementById('property-images-gallery');
    const noPropertyFound = document.getElementById('no-property-found');

    if (!propertyId) {
        detailTitle.textContent = 'Error';
        noPropertyFound.style.display = 'block';
        return;
    }

    let views = localStorage.getItem(`property_views_${propertyId}`);
    if (views) {
        views = parseInt(views) + 1;
    } else {
        views = 1;
    }
    localStorage.setItem(`property_views_${propertyId}`, views);
    detailViews.textContent = views.toLocaleString(); 


    fetch('data/properties.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const property = data.properties.find(p => p.id === propertyId);

            if (property) {
                detailTitle.textContent = `${property.tipology} in ${property.location}`;
                detailTypology.textContent = property.tipology;
                detailLocation.textContent = property.location;
                detailPrice.textContent = `$${property.price.toLocaleString()}`;
                detailArea.textContent = property.area.toLocaleString();

                property.images.forEach(imagePath => {
                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = `${property.tipology} in ${property.location}`;
                    img.classList.add('detail-image');
                    img.setAttribute('loading', 'lazy');
                    propertyImagesGallery.appendChild(img);
                });
            } else {
                detailTitle.textContent = 'Property Not Found';
                noPropertyFound.style.display = 'block';
                localStorage.setItem(`property_views_${propertyId}`, views - 1);
                detailViews.textContent = (views - 1).toLocaleString();
            }
        })
        .catch(error => {
            console.error('Error fetching property details:', error);
            detailTitle.textContent = 'Error Loading Property';
            noPropertyFound.style.display = 'block';
            localStorage.setItem(`property_views_${propertyId}`, views - 1);
            detailViews.textContent = (views - 1).toLocaleString();
        });
});
