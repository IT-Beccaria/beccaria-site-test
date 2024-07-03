let currentSlide = 0;
const slides = [
    {
        text: "La Beccaria Srl ha focalizzato gli investimenti, la ricerca, l'assetto della struttura produttiva, la selezione e la formazione del personale nel settore della lavorazione dell'acciaio inossidabile, mostrando un alto grado di competitività nel mercato globale.<br>L'azienda serve differenti settori merceologici con la più alta flessibilità in termini di lotti produttivi e di complessità e dimensioni dei particolari (da diam. 3 a diam. 300).<br>I controlli e la cura riservati a tutte le fasi del processo produttivo, di lavaggio e imballo garantiscono un elevatissimo grado di qualità complessiva.",
        image: "images/3-1.webp"
    },
    {
        text: "La produzione è organizzata su tre turni a ciclo continuo. Disponiamo di un parco macchine diversificato e di ultimissima generazione, per poter offrire la più alta flessibilità quanto a complessità e dimensioni degli oggetti da produrre. La nostra struttura ci permette di gestire contemporaneamente lotti produttivi molto elevati e piccole serie spot, garantendo notevole reattività, in linea con la rapida e continua evoluzione dei mercati. Tali peculiarità ci consentono di avviare e gestire produzioni estremamente variabili in termini di controlli finali e modalità di consegna/imballi, prestando particolare attenzione alla finitura e agli aspetti cosmetici dei prodotti.",
        image: "images/3-2.webp"
    },
    {
        text: "Consideriamo l’ottimizzazione dei costi un valore imprescindibile e veniamo coinvolti dai nostri clienti, con cui condividiamo il nostro know-how, dal concepimento del progetto alla definizione del disegno definitivo, contribuendo alla realizzazione di sinergie vincenti con immediati sviluppi sul mercato.",
        image: "images/3-3.webp"
    }
];

let autoScrollInterval;
let isAutoScrollStarted = false;

function showSlide(index) {
    const textOverlay = document.getElementById("cosa-facciamo-text");
    const imageSlides = document.querySelectorAll("#cosa-facciamo .image-slide");

    textOverlay.innerHTML = slides[index].text;
    imageSlides.forEach((img, idx) => {
        img.classList.toggle('active', idx === index);
    });
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    stopAutoScroll(); // Stop auto-scroll when button is pressed
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    stopAutoScroll(); // Stop auto-scroll when button is pressed
}

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
