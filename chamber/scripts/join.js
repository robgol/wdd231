        document.getElementById('timestamp').value = new Date().toISOString();

        const modals = document.querySelectorAll('.modal');
        const links = document.querySelectorAll('#membershipCards a');

        links.forEach((link, index) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                modals[index].style.display = 'flex';
            });
        });

        modals.forEach((modal) => {
            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });