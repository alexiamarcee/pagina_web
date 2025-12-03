document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.toggle-info');

    images.forEach(image => {
        image.addEventListener('click', () => {
            const paintingSection = image.closest('section');

            if (!paintingSection){
                return;
            } 
            const infoContainer = paintingSection.querySelector('.painting-info');

            if (infoContainer) {
                if (infoContainer.style.display === 'none' || infoContainer.style.display === '') {
                    infoContainer.style.display = 'block';
                } else {
                    infoContainer.style.display = 'none';
                }
            }
        });
    });
});