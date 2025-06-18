document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('#main-nav-links li a');

    navItems.forEach(item => {
        if (item.href.includes(currentPath) && currentPath !== '/') {
            item.parentNode.classList.add('active');
        } else if (currentPath === '/' && item.id === 'nav-home') {
            item.parentNode.classList.add('active');
        }
    });

    const highlightImage = document.getElementById('highlight-image');
    const highlightTitle = document.getElementById('highlight-title');
    const highlightDescription = document.getElementById('highlight-description');
    const highlightButton = document.getElementById('highlight-button');

    if (highlightImage && highlightTitle && highlightDescription && highlightButton) {
        fetch('data/properties.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const properties = data.properties;
                if (properties && properties.length > 0) {
                    const randomIndex = Math.floor(Math.random() * properties.length);
                    const randomProperty = properties[randomIndex];

                    highlightImage.src = randomProperty.images[0];
                    highlightImage.alt = `${randomProperty.tipology} in ${randomProperty.location}`;
                    highlightTitle.textContent = `${randomProperty.tipology} in ${randomProperty.location}`;
                    highlightDescription.textContent = `${randomProperty.area} sqr mtr for $${randomProperty.price.toLocaleString()}`;
                    highlightButton.href = `property-details.html?id=${randomProperty.id}`;

                    const hotDealsGallery = document.getElementById('hot-deals-gallery');
                    if (hotDealsGallery) {
                        const hotDeals = properties.filter(prop => prop.hot_deal);

                        const shuffledHotDeals = hotDeals.sort(() => 0.5 - Math.random());
                        const selectedHotDeals = shuffledHotDeals.slice(0, 3);

                        if (selectedHotDeals.length > 0) {
                            hotDealsGallery.innerHTML = '';

                            selectedHotDeals.forEach(deal => {
                                const dealItem = document.createElement('div');
                                dealItem.classList.add('deal-item');
                                dealItem.innerHTML = `
                                    <a href="property-details.html?id=${deal.id}">
                                        <img src="${deal.images[0]}" alt="${deal.tipology} in ${deal.location}" loading="lazy">
                                        <p class="deal-description">${deal.tipology} in ${deal.location} - $${deal.price.toLocaleString()}</p>
                                    </a>
                                `;
                                hotDealsGallery.appendChild(dealItem);
                            });
                        } else {
                            hotDealsGallery.innerHTML = '<p>No hot deals available at the moment.</p>';
                        }
                    }
                }
            })
            .catch(error => console.error('Error loading property data:', error));
    }

    const homeTestimonialGrid = document.getElementById('home-testimonial-grid');
    if (homeTestimonialGrid) {
        fetch('data/testimonials.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const testimonials = data.testimonials;
                if (testimonials && testimonials.length > 0) {
                    const shuffledTestimonials = testimonials.sort(() => 0.5 - Math.random());
                    const selectedTestimonials = shuffledTestimonials.slice(0, 3);

                    homeTestimonialGrid.innerHTML = ''; 

                    selectedTestimonials.forEach(testimonial => {
                        const testimonialItem = document.createElement('div');
                        testimonialItem.classList.add('testimonial-item');
                        testimonialItem.innerHTML = `
                            <p>"${testimonial.quote}"</p>
                            <p class="author">${testimonial.author}, ${testimonial.role}</p>
                        `;
                        homeTestimonialGrid.appendChild(testimonialItem);
                    });
                } else {
                    homeTestimonialGrid.innerHTML = '<p>No testimonials available at the moment.</p>';
                }
            })
            .catch(error => console.error('Error loading testimonials data:', error));
    }
});
