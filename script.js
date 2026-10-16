// Floating Hearts Generation
function createFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  const heartIcons = ['❤️', '💖', '💕', '🌸', '✨'];
  
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 10 + 14) + 'px';
    container.appendChild(heart);
  }
}
createFloatingHearts();

// Runaway "No" Button & Growing "Yes" Button
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const bearMouth = document.getElementById('bearMouth');
const bearTear = document.getElementById('bearTear');
const mainTitle = document.getElementById('mainTitle');
const subTitle = document.getElementById('subTitle');

let scaleFactor = 1;
let noClickCount = 0;

const funnyTexts = [
  "Yakin gak mau dimaafin?",
  "Ayo dong, Febriana... 🥺",
  "Nanti Mahendra nangis nih!",
  "Pliss bangettt... 💕",
  "Cobain klik tombol merah deh!"
];

function dodgeButton(e) {
  if (e) e.preventDefault(); // Mencegah klik terlepas di mobile
  noClickCount++;
  
  // Enlarge Yes button
  if (scaleFactor < 2.0) {
    scaleFactor += 0.2;
    yesBtn.style.transform = `scale(${scaleFactor})`;
  }
  
  // Random runaway position yang aman di layar HP
  const maxOffset = window.innerWidth < 400 ? 80 : 140;
  const x = (Math.random() - 0.5) * maxOffset;
  const y = (Math.random() - 0.5) * maxOffset;
  
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${Math.max(0.6, 1 - noClickCount * 0.08)})`;
  
  // Update text
  if (noClickCount < funnyTexts.length) {
    subTitle.innerText = funnyTexts[noClickCount];
  }
}

// Event listener untuk desktop & layar sentuh mobile
noBtn.addEventListener('mouseover', dodgeButton);
noBtn.addEventListener('touchstart', dodgeButton, { passive: false });
noBtn.addEventListener('click', dodgeButton);

// Yes Button Event
yesBtn.addEventListener('click', () => {
  confetti({
    particleCount: 100,
    spread: 60,
    origin: { y: 0.6 }
  });

  bearMouth.setAttribute('d', 'M 90 102 Q 100 118 110 102');
  if (bearTear) bearTear.style.display = 'none';

  mainTitle.innerHTML = "HOREEE! YAAAY! 🎉❤️";
  subTitle.innerHTML = "Makasih banyak ya, <strong>Febriana Agustin</strong> tersayang! Mahendra janji bakal bikin Febriana bahagia terus!";

  noBtn.style.display = 'none';
  yesBtn.style.transform = 'scale(1)';
  yesBtn.innerText = 'Febriana Baik Banget! 💕';
  yesBtn.style.pointerEvents = 'none';
});

// Interactive Envelope Toggle
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
});

// Coupon Claim Handler
function claimCoupon(cardElement) {
  const btn = cardElement.querySelector('.claim-btn');
  if (!cardElement.classList.contains('claimed')) {
    cardElement.classList.add('claimed');
    btn.innerText = 'Berhasil Terklaim! ✨';
    
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.7 }
    });
  }
}

// Romantic Music Synthesizer (Web Audio API)
let isPlaying = false;
let audioCtx, oscillator, gainNode;

document.getElementById('musicBtn').addEventListener('click', () => {
  const musicIcon = document.getElementById('musicIcon');
  
  if (!isPlaying) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00];
    let noteIdx = 0;
    
    function playMelody() {
      if (!isPlaying) return;
      
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = notes[noteIdx];
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
      
      noteIdx = (noteIdx + 1) % notes.length;
      setTimeout(playMelody, 600);
    }
    
    isPlaying = true;
    musicIcon.innerText = '💖';
    playMelody();
  } else {
    isPlaying = false;
    musicIcon.innerText = '🎵';
    if (audioCtx) audioCtx.close();
  }
});