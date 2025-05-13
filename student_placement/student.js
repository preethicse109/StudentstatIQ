document.addEventListener('DOMContentLoaded', function() {
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.parentElement.nextElementSibling;
            if (details.style.display === 'none' || details.style.display === '') {
                details.style.display = 'block';
                this.innerHTML = '&#x25B2;';  // Change to up arrow
            } else {
                details.style.display = 'none';
                this.innerHTML = '&#x25BC;';  // Change to down arrow
            }
        });
    });
});
