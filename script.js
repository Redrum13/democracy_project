let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

let throttle = false;

const showSlide = index => {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });

  // Initialize map only when reaching slide 2
  if (index === 1 && !window.mapInitialized) {
    initializeMap();
    window.mapInitialized = true;
  }
};

const nextSlide = () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
};

const prevSlide = () => {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
};

window.addEventListener('wheel', e => {
  if (throttle) return;
  throttle = true;
  setTimeout(() => throttle = false, 2000);

  if (e.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
});

window.addEventListener('keydown', e => {
  if (throttle) return;
  throttle = true;
  setTimeout(() => throttle = false, 2000);

  if (e.key === 'ArrowDown') {
    nextSlide();
  } else if (e.key === 'ArrowUp') {
    prevSlide();
  }
});

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', e => {
  touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});

function handleGesture() {
  if (throttle) return;
  throttle = true;
  setTimeout(() => throttle = false, 2000);

  const diff = touchStartY - touchEndY;
  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
}

// Initialize Leaflet map
function initializeMap() {
  const map = L.map('map').setView([7.5, 20], 3.5); // Center on Africa

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Dummy unrest markers
  L.marker([6.5244, 3.3792]).addTo(map).bindPopup("Lagos, Nigeria – #EndSARS");
  L.marker([-1.2921, 36.8219]).addTo(map).bindPopup("Nairobi, Kenya – Protest 2023");
  L.marker([15.5007, 32.5599]).addTo(map).bindPopup("Khartoum, Sudan – Civil Unrest");
}
function goToSlide(index) {
  currentSlide = index;
  showSlide(index);
}
