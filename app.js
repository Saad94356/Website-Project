//slider start

const slides = document.querySelectorAll(".slider .slide");
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
  const playIcon = document.querySelector(".videoButton i");
  const video = document.querySelector(".first-video");
  const button = document.querySelector(".videoButton");

  button.addEventListener("click", () => {
    button.classList.toggle("playButton");
    button.classList.toggle("stopButton");
    if (button.classList.contains("playButton")) {
      video.play();
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    } else {
      video.pause();
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    }
  });
}

videoPlay();

//plants slider

const plantSlider = document.querySelector(".plants-slider");
const plantSlides = document.querySelectorAll(".plant-slide");
const next = document.querySelector("#next-plant");
const prev = document.querySelector("#prev-plant");
const slideStyle = window.getComputedStyle(plantSlides[0]);

// plant slides margin
const marginNum =
  Number(slideStyle.marginLeft.replace("px", "")) +
  Number(slideStyle.marginRight.replace("px", ""));
let margin = marginNum;
let counter = 0;
const size = plantSlides[0].clientWidth;
plantSlider.style.transform = `translate(${size * 1 + margin}px)`;

prev.addEventListener("click", () => {
  prevPlSlide();
  resetPlTimer();
});

next.addEventListener("click", () => {
  nextPlSlide();
  resetPlTimer();
});
function prevPlSlide() {
  if (counter === 0) {
    counter = 0;
    margin = marginNum;
  } else {
    counter--;
    counter--;
    margin -= marginNum + marginNum;
    plantSlider.style.transform = `translate(${-size * counter - margin}px)`;
    plantSlider.style.transition = "0.5s ease-in-out";
    counter++;
    console.log(counter);
    margin += marginNum;
    if (counter < 1) {
      margin = marginNum;
    }
    console.log(margin);
  }
  changePlSlide();
}

function nextPlSlide() {
  if (counter == plantSlides.length - 1) {
    counter = 0;
    margin = marginNum;
    plantSlider.style.transform = `translate(${size + margin}px)`;
  } else {
    plantSlider.style.transform = `translate(${-size * counter}px)`;
    if (counter >= 1) {
      plantSlider.style.transform = `translate(${-size * counter - margin}px)`;
      margin += marginNum;
    }
    counter++;
    plantSlider.style.transition = "0.5s ease-in-out";
  }
  changePlSlide();
}
function changePlSlide() {
  for (let i = 0; i < plantSlides.length; i++) {
    plantSlides[i].classList.remove("active");
    plantSlides[i].style.pointerEvents = "none";
  }
  plantSlides[counter].classList.add("active");
  plantSlides[counter].style.pointerEvents = "all";
}

  function resetPlTimer() {
    // when click to indicator or controls button
    // stop timer
    clearInterval(plTimer);
    // then started again timer
    plTimer = setInterval(auto, 8000);
  }

function auto() {
  nextPlSlide();
}

let plTimer = setInterval(auto, 8000);

plantSlider.addEventListener("mouseover", () => {
  clearInterval(plTimer);
});

plantSlider.addEventListener("mouseout", () => {
  plTimer = setInterval(auto, 8000);
});
