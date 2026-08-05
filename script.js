const MESSAGES = [
  "ยกโทษให้พี่ไม่ได้จริงหรออ 🥺",
  "จริงดิ ไม่ยกโทษให้พี่เลยอ่ะ?",
  "พี่จะงอนแล้วนะ...",
  "ขอร้องงงง ยกโทษให้พี่นะ",
  "พี่ยอมทำทุกอย่างเพื่อให้เหมยหายงอนเลยนะ",
  "พี่สัญญาว่าจะไม่ทำแบบนี้อีกแล้ว",
  "ให้อภัยพี่เถอะน้าาา",
  "พี่จะทำตัวดีๆแบบนี้ทุกวันเลยนะ",
  "โถ่ ใจแข็งจังเลยอ่ะ 😢",
  "ยังไม่ยกโทษให้พี่อีกหรอ",
  "พี่คิดถึงเหมยมากๆเลยนะ",
  "งอนพี่นานๆแบบนี้ พี่เศร้านะ",
  "โอเคๆ พี่ขอโทษจริงๆ ให้อภัยพี่ได้มั้ย",
  "เหมยยย ใจดีกับพี่หน่อยน้า",
  "พี่จะซื้อมัทฉะให้กินทุกวันเลยนะ",
  "ให้อภัยพี่สักครั้งนะครับ",
  "พี่สัญญาเลยว่าจะรักเหมยที่สุด",
  "ยกโทษให้พี่เถอะ พี่รักเหมยที่สุดในโลก",
  "ใกล้จะยกโทษให้พี่หรือยังเอ่ย",
  "รอบสุดท้ายแล้วนะ ยกโทษให้พี่ได้มั้ย 🎀",
];

let round = 0;

const mainScreen = document.getElementById("main-screen");
const popupOverlay = document.getElementById("popup-overlay");
const popupMessage = document.getElementById("popup-message");
const successScreen = document.getElementById("success-screen");
const floatingHeartsLayer = document.getElementById("floating-hearts");

function showSuccess() {
  mainScreen.classList.add("hidden");
  popupOverlay.classList.add("hidden");
  successScreen.classList.remove("hidden");
  spawnHeartBurst();
}

function handleForgive() {
  showSuccess();
}

function handleNo() {
  round += 1;
  if (round > MESSAGES.length) {
    round = 0;
    popupOverlay.classList.add("hidden");
    mainScreen.classList.remove("hidden");
    return;
  }
  popupMessage.textContent = MESSAGES[round - 1];
  mainScreen.classList.add("hidden");
  popupOverlay.classList.remove("hidden");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (target.dataset.action === "forgive") {
    handleForgive();
  } else if (target.dataset.action === "no") {
    handleNo();
  }
});

// ---------- background floating hearts ----------
const HEART_EMOJI = ["💗", "💕", "🎀", "✨", "💖"];

function spawnFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = HEART_EMOJI[Math.floor(Math.random() * HEART_EMOJI.length)];
  heart.style.left = `${Math.random() * 100}%`;
  const duration = 6 + Math.random() * 5;
  heart.style.animationDuration = `${duration}s`;
  heart.style.fontSize = `${1 + Math.random() * 1.2}rem`;
  floatingHeartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(spawnFloatingHeart, 450);
for (let i = 0; i < 8; i++) {
  setTimeout(spawnFloatingHeart, i * 200);
}

// ---------- success burst ----------
function spawnHeartBurst() {
  const pieces = ["💗", "💖", "🎀", "✨", "💕", "🌸"];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement("span");
    piece.className = "burst-piece";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 220;
    piece.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
    piece.style.setProperty("--rot", `${(Math.random() - 0.5) * 360}deg`);
    piece.style.animationDelay = `${Math.random() * 0.2}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}
