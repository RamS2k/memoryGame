let card = document.getElementsByClassName("card");
let cards = [... card];

var cardsOpened =[];

const deck = document.getElementById("card-deck");

let moves = 0;
let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

let cardsMatched = document.getElementsByClassName("match");

let starsList = document.querySelectorAll(".stars li");

let modal = document.getElementById("alert")

let closePopup = document.querySelector(".close");


function shuffle(array) {
    var current = array.length;
    var temp;
    var random;

    while (current !== 0) {
        random = Math.floor(Math.random() * current);
        current -= 1;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
};

document.body.onload = startGame();

function startGame(){
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled", "unmatched");
    }
    var timer = document.querySelector(".timer");
    moves = 0;
    counter.innerHTML = moves;
    for (var i= 0; i < stars.length; i++){
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0; 
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
    cardsOpened.pop();
    clearInterval(interval);
}

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen() {
    cardsOpened.push(this);
    var size = cardsOpened.length;
    if(size === 2){
        moveCounter();
        if(cardsOpened[0].type === cardsOpened[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

function matched(){
    cardsOpened[0].classList.add("match", "disabled");
    cardsOpened[1].classList.add("match", "disabled");
    cardsOpened[0].classList.remove("show", "open", "no-event");
    cardsOpened[1].classList.remove("show", "open", "no-event");
    cardsOpened = [];
}

function unmatched(){
    cardsOpened[0].classList.add("unmatched");
    cardsOpened[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        cardsOpened[0].classList.remove("show", "open", "no-event","unmatched");
        cardsOpened[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        cardsOpened = [];
    },1000);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < cardsMatched.length; i++){
            cardsMatched[i].classList.add("disabled");
        }
    });
}
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    if (moves > 10 && moves < 15){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 16){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
function modalMessage(){
    if (cardsMatched.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    };
}
function closeModal(){
    closePopup.addEventListener("click", function(e){
        modal.classList.remove("show");
    });
}
function retry(){
    modal.classList.remove("show");
    startGame();
}
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",modalMessage);
};
