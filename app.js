//slider start

const slides = document.querySelectorAll(".slide");
const pointContainer = document.querySelector(".pointer");
const pointers = document.querySelectorAll(".pointer span");
let index = 0;

function circleIndicator() {
  for (let i = 0; i < slides.length; i++) {
    const span = document.createElement("span");
    span.addEventListener("click", function () {
      indicateSlide(this);
    });
    span.id = i;
    if (i == 0) {
      span.classList.add("active");
    }
    pointContainer.appendChild(span);
  }
}
circleIndicator();

function indicateSlide(element) {
  index = element.id;
  changeSlide();
  updateCircleIndicator();
  resetTimer();
}

function updateCircleIndicator() {
  for (let i = 0; i < pointContainer.children.length; i++) {
    pointContainer.children[i].classList.remove("active");
  }
  pointContainer.children[index].classList.add("active");
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("next");
    slides[i].classList.add("previous");
  }
  slides[index].classList.remove("previous");
  slides[index].classList.add("next");
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
}

function resetTimer() {
  // when click to indicator or controls button
  // stop timer
  clearInterval(timer);
  // then started again timer
  timer = setInterval(autoPlay, 4000);
}

function autoPlay() {
  nextSlide();
  updateCircleIndicator();
}

let timer = setInterval(autoPlay, 4000);

//slider finish

// video starter

function videoPlay() {
  const playButton = document.querySelector(".playButton");
  const palyIcon = document.querySelector(".playButton i");
  const video = document.querySelector(".first-video");

  playButton.addEventListener("click", () => {
    video.addEventListener("ended", () => {
      palyIcon.classList.add("fa-play");
      palyIcon.classList.remove("fa-pause");
      video.classList.remove("start");
    });
    palyIcon.classList.toggle("fa-play");
    palyIcon.classList.toggle("fa-pause");
    video.pause();
    video.classList.toggle("start");
    const start = document.querySelector(".start");
    start.play();
  });
}

videoPlay();

//plants slider

const plantSlides = document.querySelectorAll(".plant-slide");
const plantSlider = document.querySelector(".plants-slider");
const next = document.querySelector("#next-plant");
const prev = document.querySelector("#prev-plant");
const slidesStyle = window.getComputedStyle(plantSlides[0]);
let margin =
  Number(slidesStyle.marginRight.replace("px", "")) +
  Number(slidesStyle.marginLeft.replace("px", ""));

let counter = 0;
const size = plantSlides[0].clientWidth;
plantSlider.style.transform = `translate(${size * 1 + margin}px)`;

next.addEventListener("click", () => {
  prev.style.pointerEvents = "all";
  if (counter >= plantSlides.length - 1) return;
  plantSlider.style.transition = "0.4s ease-in-out";
  counter++;
  if (counter > 1) {
    margin = margin + 48;
  }
  console.log(counter);
  plantSlider.style.transform = `translate(${-size * counter - margin}px)`;
  if (counter === 0) {
    plantSlider.style.transform = `translate(${-size * 0}px)`;
  }
  if (plantSlides[counter] === plantSlides[plantSlides.length - 2]) {
    next.style.pointerEvents = "none";
  }
});

counter--;

prev.addEventListener("click", () => {
  next.style.pointerEvents = "all";
  if (counter <= 0) return;
  plantSlider.style.transition = "0.4s ease-in-out";

  if (counter >= 0) {
    margin = margin - 48;
  }
  counter--;
  console.log(counter);
  plantSlider.style.transform = `translate(${-size * counter - margin}px)`;

  if (plantSlides[counter] === plantSlides[0]) {
    margin = 48;
    plantSlider.style.transform = `translate(${size + margin}px)`;
    prev.style.pointerEvents = "none";
  }
  if (plantSlides[counter] === plantSlides[0]) {
    return counter--;
  }
});
