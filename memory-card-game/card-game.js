if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(registration => {
    console.log("sw registered!");
    console.log(registration);
  }).catch(err => {
    console.log("sw failed!");
    console.log(err);
  })
}

let firstSelectedEl, secondSelectedEl;
let hint1, hint2;
var point = 0;
var step = 1;

let cards = [
  { id: 1, src: "./img/shape_1.png" },
  { id: 2, src: "./img/shape_2.png" },
  { id: 3, src: "./img/shape_3.png" },
  { id: 4, src: "./img/shape_4.png" },
  { id: 5, src: "./img/shape_5.png" },
  { id: 6, src: "./img/shape_6.png" },
  { id: 7, src: "./img/shape_7.png" },
  { id: 8, src: "./img/shape_8.png" },
];

let duplicateCards = [...cards, ...cards];
let dealingCards = [];

const selectRandomCard = () => {
  let randomCardOrder = Math.round(Math.random() * duplicateCards.length - 1);
  return duplicateCards.splice(randomCardOrder, 1);
};

const dealCards = () => {
  for (let i = 0; i < 16; i++) {
    dealingCards = [...dealingCards, ...selectRandomCard()];
  }
};

const drawCards = () => {
  dealCards();
  const cardContainerEl = document.querySelector(".card__container");

  let cardItemsHtml = ``;
  dealingCards.forEach((item) => {
    cardItemsHtml += `<img class="card" 
        src="${item.src}"
        data-id="${item.id}"
        onclick="selectCard(this)"/>`;
  });

  cardContainerEl.innerHTML = cardItemsHtml;
};

drawCards();

const selectCard = (el) => {
  if (!el.classList.contains("open")) {
    el.classList.add("open");

    if (firstSelectedEl) {
      secondSelectedEl = el;

      checkSelectedCards(firstSelectedEl, secondSelectedEl);

      firstSelectedEl = null;
      secondSelectedEl = null;
    } else {
      firstSelectedEl = el;
    }
  }
};

const checkSelectedCards = (checkFirstEl, checkSecondEl) => {
  if (checkFirstEl.dataset.id != checkSecondEl.dataset.id) {

    checkFirstEl.classList.add("incorrect");
    checkSecondEl.classList.add("incorrect");

    setTimeout(() => {
      checkFirstEl.classList.remove(
        "open",
        "incorrect",
      );
      checkSecondEl.classList.remove(
        "open",
        "incorrect",
      );
    }, 500);

    point = point - 10
    document.getElementById("pnt").innerHTML = "Puan: " + (point);
    document.getElementById("step").innerHTML = "Adım Sayısı: " + (step++);
  } else {
    checkFirstEl.classList.add("correct");
    checkSecondEl.classList.add("correct");
    point = point + 20
    document.getElementById("pnt").innerHTML = "Puan: " + (point);
    document.getElementById("step").innerHTML = "Adım Sayısı: " + (step++);
  }
};

const giveHint = () => {
  const closedCards = document.querySelectorAll('.card:not(.open)');
  if (closedCards.length >= 2) {
    hint1 = closedCards[0];
    for (let i = 1; i <= 15; i++) {
      hint2 = closedCards[i];
      if (hint1.dataset.id == closedCards[i].dataset.id) {
        hint1.classList.add("hint");
        hint2.classList.add("hint");
        break;
      }
    }
  }
};

