(function() {
    let overlay, lightboxImage, closeBtn, prevBtn, nextBtn;
    let images = [];
    let currentIndex = 0;

    function createLightbox() {
        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        lightboxImage = document.createElement('img');
        lightboxImage.className = 'lightbox-image';
        lightboxImage.alt = '';

        closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', 'Schließen');
        closeBtn.innerHTML = '&times;';

        prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-prev';
        prevBtn.setAttribute('aria-label', 'Vorheriges Bild');
        prevBtn.textContent = '<';

        nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-next';
        nextBtn.setAttribute('aria-label', 'Nächstes Bild');
        nextBtn.textContent = '>';

        content.appendChild(prevBtn);
        content.appendChild(lightboxImage);
        content.appendChild(nextBtn);
        content.appendChild(closeBtn);
        overlay.appendChild(content);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', event => {
            if (event.target === overlay) closeLightbox();
        });
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);
        document.addEventListener('keydown', handleKeydown);
    }

    function openLightbox(index, groupImages) {
        images = groupImages;
        currentIndex = index;
        updateImage();
        overlay.classList.add('open');
    }

    function closeLightbox() {
        overlay.classList.remove('open');
    }

    function updateImage() {
        const { src, alt } = images[currentIndex];
        lightboxImage.src = src;
        lightboxImage.alt = alt;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    function handleKeydown(e) {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    }

    document.addEventListener('DOMContentLoaded', () => {
        createLightbox();

        const allImages = document.querySelectorAll('.gallery-grid img');
        const grouped = {};

        allImages.forEach(img => {
            const group = img.dataset.group || 'default';
            if (!grouped[group]) grouped[group] = [];
            grouped[group].push({ src: img.src, alt: img.alt });

            img.addEventListener('click', () => {
                const index = grouped[group].findIndex(item => item.src === img.src);
                openLightbox(index, grouped[group]);
            });
        });
    });
})();
