// ============================================
// RAMADHAN GREETING - JAVASCRIPT
// ============================================

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
});

// ============================================
// CURSOR GLOW EFFECT
// ============================================
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ============================================
// PARTICLES ANIMATION
// ============================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
// Adjust particle count based on screen size
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 50 : 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles.length = 0; // Clear existing particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ============================================
// SHOOTING STARS
// ============================================
function createShootingStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.8)';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.zIndex = '1';
    star.style.pointerEvents = 'none';
    document.body.appendChild(star);

    star.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: 'translate(-200px, 200px)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => star.remove();
}

// Create shooting star every 3 seconds
setInterval(createShootingStar, 3000);

// ============================================
// OPEN BUTTON FUNCTIONALITY
// ============================================
const openButton = document.getElementById('openButton');
const openingScreen = document.getElementById('openingScreen');
const mainContent = document.getElementById('mainContent');
const audioControl = document.getElementById('audioControl');
const backgroundMusic = document.getElementById('backgroundMusic');

openButton.addEventListener('click', () => {
    // Fade out opening screen
    openingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        openingScreen.style.display = 'none';
        mainContent.classList.add('visible');
        audioControl.style.display = 'flex';
        
        // Autoplay music
        backgroundMusic.play().catch(e => {
            console.log('Autoplay prevented:', e);
        });

        // Trigger confetti
        createConfetti();
    }, 800);
});

// ============================================
// CONFETTI EFFECT
// ============================================
function createConfetti() {
    const colors = ['#d4af37', '#f4e4a6', '#178582', '#2da39f'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

// ============================================
// AUDIO CONTROL
// ============================================
let isPlaying = true;

audioControl.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        audioControl.innerHTML = '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    } else {
        backgroundMusic.play();
        audioControl.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>';
    }
    isPlaying = !isPlaying;
});

// ============================================
// PARALLAX EFFECT
// ============================================
// Only enable parallax on desktop (not touch devices)
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const card = document.querySelector('.card-container');
        if (card && mainContent.classList.contains('visible')) {
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// ============================================
// RESPONSIVE CANVAS
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Reinitialize particles on resize
        initParticles();
    }, 250);
});

// ============================================
// PREVENT CONTEXT MENU (Optional - for better UX)
// ============================================
// Uncomment if you want to disable right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ============================================
// REPLY FORM FUNCTIONALITY
// ============================================

// EDIT DI SINI - Ganti dengan nomor WhatsApp Anda
// Format: 628xxxxx (tanpa +, tanpa spasi, tanpa tanda hubung)
// Contoh: 6281234567890
const WHATSAPP_NUMBER = '62881010897627'; // GANTI DENGAN NOMOR WHATSAPP ANDA

const replyButton = document.getElementById('replyButton');
const replySidebar = document.getElementById('replySidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const replyForm = document.getElementById('replyForm');

// Open sidebar
replyButton.addEventListener('click', () => {
    replySidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close sidebar
function closeSidebarForm() {
    replySidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeSidebar.addEventListener('click', closeSidebarForm);
sidebarOverlay.addEventListener('click', closeSidebarForm);

// Handle form submission
replyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const senderName = document.getElementById('senderName').value.trim();
    const replyMessage = document.getElementById('replyMessage').value.trim();
    
    if (!senderName || !replyMessage) {
        alert('Mohon isi semua field!');
        return;
    }
    
    // Format pesan untuk WhatsApp
    const whatsappMessage = `*BALASAN UCAPAN RAMADHAN* 🌙

*Dari:* ${senderName}

*Pesan:*
${replyMessage}

---
_Dikirim melalui Website Ucapan Ramadhan_`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Redirect ke WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form dan tutup sidebar
    replyForm.reset();
    setTimeout(closeSidebarForm, 500);
});

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && replySidebar.classList.contains('active')) {
        closeSidebarForm();
    }
});