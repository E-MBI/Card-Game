// declearing the variable
const StartBtn = document.querySelector('.cover [type="button"]');
const Cover = document.querySelector(".cover");
const UserName = document.querySelector(".headGame span .playerName");
const WrongTries = document.querySelector(".headGame span .Wrong");
const CorrectTries = document.querySelector(".headGame span .Correct");
const GameBlocks = Array.from(document.querySelectorAll(".gameblock"));
const GameOver = document.querySelector(".GameOver");
const Failer = document.querySelector(".GameOver .failer");
const Congrats = document.querySelector(".GameOver .congrats");
const NewGameBtn = document.querySelector('.GameOver [type="button"]');
const count = document.querySelector(".headGame > span > .time .count");

const SuccessSound = document.querySelector("audio.Success");
const FailedSound = document.querySelector("audio.Failed");
const WinnerSound = document.querySelector("audio.Winner");
const LosserSound = document.querySelector("audio.Losser");

let orderRange = [...Array(GameBlocks.length).keys()];
let duration = 1000;

//Start Functionalty

StartBtn.addEventListener("click", () => {
  let userprompt = prompt("Enter Your Name");
  UserName.textContent = userprompt;
  Cover.remove();
  if (userprompt === null || userprompt === "") {
    UserName.textContent = "Unknown";
    Cover.remove();
  }

  let countDown = setInterval(() => {
    count.innerHTML--;
    if (
      parseInt(count.innerHTML) === 0 ||
      CorrectTries.innerHTML === `${GameBlocks.length / 2}`
    ) {
      clearInterval(countDown);
      //Losser Or Winner Message
      GameOverTime();
    }
  }, duration);
});

//GET Random Array from keys of element of blocks
RandomItems(orderRange);

GameBlocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  //trigger function to add class flippe on every block
  block.addEventListener("click", () => {
    flipeBlock(block);
  });
});

//Random function
function RandomItems(array) {
  let Current = array.length,
    random,
    temp;

  while (Current > 0) {
    random = Math.floor(Math.random() * Current);
    Current--;
    //put current item in stash
    temp = array[Current];
    //get Current item = Random item
    array[Current] = array[random];
    // Rondam item = Get item from stash
    array[random] = temp;
  }
  return array;
}

//  flipeBlock function
function flipeBlock(Selectblock) {
  Selectblock.classList.add("is_flipped");

  let CollectionBlock = GameBlocks.filter((filppeblock) =>
    filppeblock.classList.contains("is_flipped")
  );

  if (CollectionBlock.length === 2) {
    let fristblock = CollectionBlock[0],
      secondblock = CollectionBlock[1];

    //no clicking over all the block when selected blocks are two for duration 1 second
    StopClicking();

    //Match if blocks are equal or not
    setTimeout(() => {
      if (fristblock.dataset.tech === secondblock.dataset.tech) {
        fristblock.classList.remove("is_flipped");
        secondblock.classList.remove("is_flipped");

        fristblock.classList.add("is_matched");
        secondblock.classList.add("is_matched");
        CorrectTries.innerHTML = parseInt(CorrectTries.innerHTML++) + 1;
        SuccessSound.play();
      } else {
        fristblock.classList.remove("is_flipped");
        secondblock.classList.remove("is_flipped");
        WrongTries.innerHTML = parseInt(WrongTries.innerHTML++) + 1;
        FailedSound.play();
      }
      //Losser Message
      GameOverWrongTries();
    }, duration);
  }
}

function StopClicking() {
  GameBlocks.forEach((Block) => {
    Block.classList.add("no_clicking");
  });

  setTimeout(() => {
    GameBlocks.forEach((Block) => {
      Block.classList.remove("no_clicking");
    });
  }, duration);
}

//function Game over Message

//  set function GameOver #Failer=> 15 wrong tries*/
function GameOverWrongTries() {
  if (WrongTries.innerHTML === "15") {
    GameOver.style.zIndex = "10";
    GameOver.style.opacity = "1";
    Congrats.style.opacity = "0";
    LosserSound.play();
  } else {
    return false;
  }
}
// set function GameOver # Success => 9 Correct tries || 60 second left

function GameOverTime() {
  if (
    count.innerHTML === "0" ||
    CorrectTries.innerHTML === `${GameBlocks.length / 2}`
  ) {
    if (CorrectTries.innerHTML === `${GameBlocks.length / 2}`) {
      GameOver.style.zIndex = "10";
      GameOver.style.opacity = "1";
      Failer.style.opacity = "0";
      Congrats.style.zIndex = "11";
      WinnerSound.play();
    } else {
      GameOver.style.zIndex = "10";
      GameOver.style.opacity = "1";
      Congrats.style.opacity = "0";
      LosserSound.play();
    }
  } else {
    return false;
  }
}
NewGameBtn.addEventListener("click", function () {
  setTimeout(() => {
    window.location.reload();
  }, duration / 2);
});
