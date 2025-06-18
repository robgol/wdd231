document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const fullName = params.get('fullName');
    const subscribedEmailSpan = document.getElementById('subscribed-email');
    const fullNameSpan = document.getElementById('full-name');

    if (email && subscribedEmailSpan) {
        subscribedEmailSpan.textContent = email;
    } else {
        subscribedEmailSpan.textContent = 'your provided email address.';
    }
    if (fullName && fullNameSpan) {
        fullNameSpan.textContent = fullName;
    } else {
        fullNameSpan.textContent = 'your provided email address.';
    }
});