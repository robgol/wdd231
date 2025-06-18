document.addEventListener('DOMContentLoaded', () => {
    const testimonialGridPage = document.getElementById('testimonial-grid-page');

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
                testimonials.forEach(testimonial => {
                    const testimonialItem = document.createElement('div');
                    testimonialItem.classList.add('testimonial-item-page'); 
                    testimonialItem.innerHTML = `
                        <p class="quote">"${testimonial.quote}"</p>
                        <p class="author">${testimonial.author}, ${testimonial.role}</p>
                    `;
                    testimonialGridPage.appendChild(testimonialItem);
                });
            } else {
                testimonialGridPage.innerHTML = '<p>No testimonials available yet.</p>';
            }
        })
        .catch(error => console.error('Error fetching testimonials:', error));
});
