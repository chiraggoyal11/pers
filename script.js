// Elements
const questionPage = document.getElementById('question-page');
const acceptancePage = document.getElementById('acceptance-page');
const lovePage1 = document.getElementById('love-page-1');
const lovePage2 = document.getElementById('love-page-2');
const lovePage3 = document.getElementById('love-page-3');
const valentineWeekPage = document.getElementById('valentine-week-page');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const loveBtn = document.getElementById('love-btn');
const nextBtn1 = document.getElementById('next-btn-1');
const nextBtn2 = document.getElementById('next-btn-2');
const valentineWeekBtn = document.getElementById('valentine-week-btn');

// Track clicks on Yes button
let yesClickCount = 0;
const maxClicks = 3;

// Yes button click handler
yesBtn.addEventListener('click', () => {
    yesClickCount++;
    
    // Grow the button
    const currentSize = 1 + (yesClickCount * 0.25);
    yesBtn.style.transform = `scale(${currentSize})`;
    
    // After max clicks, move to acceptance page
    if (yesClickCount >= maxClicks) {
        setTimeout(() => {
            showPage(acceptancePage);
        }, 500);
    }
});

// No button hover handler - moves away from cursor
noBtn.addEventListener('mouseenter', (e) => {
    moveNoButton();
});

// For mobile - move on touchstart
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const container = questionPage.querySelector('.content');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe boundaries
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;
    
    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply position instantly (no transition)
    noBtn.style.position = 'absolute';
    noBtn.style.transition = 'none';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Love button click handler
loveBtn.addEventListener('click', () => {
    showPage(lovePage1);
});

// Next button handlers
nextBtn1.addEventListener('click', () => {
    showPage(lovePage2);
});

nextBtn2.addEventListener('click', () => {
    showPage(lovePage3);
});

// Valentine's Week button handler
valentineWeekBtn.addEventListener('click', () => {
    showPage(valentineWeekPage);
});

// Image Modal functionality
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');

// Rose Modal functionality
const roseModal = document.getElementById('rose-modal');
const closeRose = document.querySelector('.close-rose');

// Mapping of day names to actual file names
const imageMap = {
    'rose-day': 'rose day.jpg.jpeg',
    'propose-day': 'propose day.JPG.jpeg',
    'chocolate-day': 'chocolate day.jpg.jpeg',
    'teddy-day': 'teddy day.jpg.jpeg',
    'promise-day': 'promise day.jpg.jpeg',
    'hug-day': 'hug day.PNG',
    'kiss-day': 'kiss day.jpg.jpeg',
    'valentine-day': 'forever.PNG'  // Using forever.PNG for Valentine's Day
};

// Add click event to all day cards
document.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('click', function() {
        const dayName = this.getAttribute('data-day');
        const dayTitle = this.querySelector('h3').textContent;
        
        // Special handling for Valentine's Day
        if (dayName === 'valentine-day') {
            roseModal.style.display = 'block';
            return;
        }
        
        // Get the correct file name from mapping
        const fileName = imageMap[dayName];
        
        if (fileName) {
            // Set image source
            modalImg.src = `photos/${fileName}`;
            modalImg.alt = dayTitle;
            
            // Show modal immediately
            modal.style.display = 'block';
            captionText.innerHTML = dayTitle + ' 💕';
            
            // Error handling - if image fails to load
            modalImg.onerror = function() {
                console.error('Failed to load image:', `photos/${fileName}`);
                // Try with (1) version
                const fileName2 = fileName.replace('.jpeg', ' (1).jpeg').replace('.PNG', ' (1).PNG');
                modalImg.src = `photos/${fileName2}`;
                modalImg.onerror = function() {
                    modal.style.display = 'none';
                    alert('Image not found! Make sure the photo exists in the photos folder.');
                };
            };
        } else {
            alert('No image found for this day!');
        }
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close rose modal when clicking X
closeRose.addEventListener('click', () => {
    roseModal.style.display = 'none';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close rose modal when clicking outside
roseModal.addEventListener('click', (e) => {
    if (e.target === roseModal) {
        roseModal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
        if (roseModal.style.display === 'block') {
            roseModal.style.display = 'none';
        }
    }
});

// Function to show a specific page
function showPage(pageToShow) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the target page
    setTimeout(() => {
        pageToShow.classList.add('active');
    }, 100);
}

// Initialize - set random position for No button on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const container = questionPage.querySelector('.content');
        const btnRect = noBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Set initial position for No button (to the right of Yes button)
        noBtn.style.position = 'relative';
        noBtn.style.left = '0';
        noBtn.style.top = '0';
    }, 100);
    
    // Fix forever image path on load
    const foreverImg = document.getElementById('forever-image');
    if (foreverImg) {
        foreverImg.onerror = function() {
            console.log('Trying alternate path for forever image');
            this.onerror = null;
            this.style.display = 'block';
        };
    }
});

// Add particle effect on Yes button click
yesBtn.addEventListener('click', (e) => {
    createHeartParticles(e.clientX, e.clientY);
});

function createHeartParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '💕';
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.fontSize = '20px';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(particle);
        
        // Animate particle
        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / 10;
            const distance = 100;
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance;
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(2)';
        }, 10);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}
