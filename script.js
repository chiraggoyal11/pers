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
