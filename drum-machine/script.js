const pads = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");

const sounds = {
  Q: "Heater 1",
  W: "Heater 2",
  E: "Heater 3",
  A: "Heater 4",
  S: "Clap",
  D: "Open Hi-Hat",
  Z: "Kick n' Hat",
  X: "Kick",
  C: "Closed Hi-Hat"
};

function playSound(key) {
  const audio = document.getElementById(key);

  if (!audio) {
    return;
  }

  audio.currentTime = 0;
  audio.play();

  display.textContent = sounds[key];

  const pad = audio.parentElement;

  pad.classList.add("active");

  setTimeout(() => {
    pad.classList.remove("active");
  }, 150);
}

// Play a sound when a pad is clicked
pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const audio = pad.querySelector("audio");
    playSound(audio.id);
  });
});

// Play a sound using the keyboard
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();

  if (sounds[key]) {
    playSound(key);
  }
});
