let currentSlide = 0;
const slides = [
    {
        image: "images/3-1.webp"
    },
    {
        image: "images/3-2.webp"
    },
    {
        image: "images/3-3.webp"
    }
];

// Function to show the correct slide
function showSlide(index) {
    // Get all the images and text elements
    const images = document.querySelectorAll("#cosa-facciamo .image-slide");
    const texts = document.querySelectorAll("#cosa-facciamo-text p");

    // Hide all images and texts (by reducing opacity instead of display)
    images.forEach((img, i) => {
        img.style.opacity = i === index ? '1' : '0'; // Only show the current image with opacity transition
    });

    texts.forEach((text, i) => {
        text.style.display = i === index ? 'block' : 'none'; // Show only the current text
    });

    // Update the current slide index
    currentSlide = index;
}

// Function for the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Function for the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize the first slide when the page loads
document.addEventListener("DOMContentLoaded", function () {
    showSlide(currentSlide); // Start with the first slide
});


function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 7000); // Change slide every 7 seconds
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    isAutoScrollStarted = false; // Reset auto-scroll flag
}

// Initialize the slide and set up intersection observer
document.addEventListener("DOMContentLoaded", () => {
    showSlide(currentSlide); // Show the initial slide

    // IntersectionObserver to start auto-scroll when the section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAutoScrollStarted) {
                startAutoScroll();
                isAutoScrollStarted = true;
            }
        });
    }, { threshold: 0.5 });

    const target = document.getElementById("cosa-facciamo");
    observer.observe(target);
});

// Attach event listeners to the buttons
document.querySelector(".carousel-button.left").addEventListener("click", prevSlide);
document.querySelector(".carousel-button.right").addEventListener("click", nextSlide);


document.addEventListener("DOMContentLoaded", () => {
    const langSwitch = document.getElementById('lang-switch');
    if (window.location.href.includes('indexEN')) {
        langSwitch.href = "index.html";
        langSwitch.querySelector('img').src = "images/flag-it.png";
        langSwitch.querySelector('img').alt = "Switch to Italian";
    } else {
        langSwitch.href = "indexEN.html";
        langSwitch.querySelector('img').src = "images/flag-en.png";
        langSwitch.querySelector('img').alt = "Switch to English";
    }
});


// Modal Lightbox Functionality
document.addEventListener("DOMContentLoaded", () => {
    const galleryButton = document.getElementById("gallery-button");
    const modal = document.getElementById("gallery-modal");
    const modalClose = document.getElementById("modal-close");
    const modalImages = document.querySelectorAll(".modal-slide");
    let modalCurrentSlide = 0;

    // Show the modal on button click
    galleryButton.addEventListener("click", () => {
        modal.style.display = "block";
        showModalSlide(modalCurrentSlide);
    });

    // Close the modal
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Show a specific slide in the modal
    function showModalSlide(index) {
        modalImages.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }

    // Navigate to the previous slide
    document.getElementById("modal-prev").addEventListener("click", () => {
        modalCurrentSlide = (modalCurrentSlide - 1 + modalImages.length) % modalImages.length;
        showModalSlide(modalCurrentSlide);
    });

    // Navigate to the next slide
    document.getElementById("modal-next").addEventListener("click", () => {
        modalCurrentSlide = (modalCurrentSlide + 1) % modalImages.length;
        showModalSlide(modalCurrentSlide);
    });

    // Close the modal when clicking outside of the modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
