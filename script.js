// ---------- Shade data ----------
const shades = [
  { name: "Peptide", color: "#E7CFC2", desc: "A universal clear gloss with a subtle glass-like sheen. Our best seller, for a reason." },
  { name: "Space Cowboy", color: "#C98A7D", desc: "A warm terracotta-brown with a soft satin finish. Everyday neutral, elevated." },
  { name: "Kiss It", color: "#D98C9A", desc: "A cool-toned rosy pink with a juicy, wet-look shine." },
  { name: "Beach Please", color: "#E3A6A0", desc: "A sheer coral wash — your lips, but sun-kissed." },
  { name: "Toasted Teakwood", color: "#A85D52", desc: "A deep spiced brown for a richer, grounded finish." },
  { name: "Unbothered", color: "#EBC9C9", desc: "The softest baby pink — barely-there color, maximum gloss." },
  { name: "Fizzy Grape", color: "#9C6B85", desc: "A playful mauve-violet with a subtle cooling tingle." },
  { name: "Salt Cured", color: "#B98072", desc: "A muted rosy nude, made for layering." },
];

// ---------- Build swatches ----------
const swatchRow = document.getElementById("swatchRow");
const shadePreview = document.getElementById("shadePreview");
const shadeName = document.getElementById("shadeName");
const shadeDesc = document.getElementById("shadeDesc");

function setActiveShade(index) {
  const shade = shades[index];
  shadePreview.style.background = `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), ${shade.color} 65%)`;
  shadeName.textContent = shade.name;
  shadeDesc.textContent = shade.desc;

  document.querySelectorAll(".swatch").forEach((el, i) => {
    el.classList.toggle("active", i === index);
    el.setAttribute("aria-pressed", i === index ? "true" : "false");
  });
}

shades.forEach((shade, i) => {
  const btn = document.createElement("button");
  btn.className = "swatch";
  btn.style.background = `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), ${shade.color} 70%)`;
  btn.setAttribute("role", "listitem");
  btn.setAttribute("aria-label", `Shade: ${shade.name}`);
  btn.setAttribute("aria-pressed", "false");
  btn.addEventListener("click", () => setActiveShade(i));
  swatchRow.appendChild(btn);
});

setActiveShade(0);

// ---------- Scroll reveal for story sections ----------
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Ambient audio toggle ----------
const audioToggle = document.getElementById("audioToggle");
const ambientAudio = document.getElementById("ambientAudio");
const audioLabel = audioToggle.querySelector(".audio-label");

audioToggle.addEventListener("click", () => {
  const isPlaying = audioToggle.getAttribute("aria-pressed") === "true";

  if (isPlaying) {
    ambientAudio.pause();
    audioToggle.setAttribute("aria-pressed", "false");
    audioLabel.textContent = "Sound off";
  } else {
    ambientAudio.play().catch(() => {
      // Autoplay/file may be blocked or missing until a real audio file is added
      console.warn("Add an audio file at assets/audio/ambient.mp3 to enable sound.");
    });
    audioToggle.setAttribute("aria-pressed", "true");
    audioLabel.textContent = "Sound on";
  }
});

// ---------- CTA footer micro-interaction ----------
const shopBtn = document.getElementById("shopBtn");
shopBtn.addEventListener("click", () => {
  shopBtn.textContent = "Added to bag ✓";
  shopBtn.disabled = true;
  setTimeout(() => {
    shopBtn.textContent = "Shop the collection";
    shopBtn.disabled = false;
  }, 2000);
});
