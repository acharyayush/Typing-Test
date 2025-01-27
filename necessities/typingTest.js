let prevLetterParent, currLetterParent;
let hasStartedTyping = false, moreThanOnce = false;
let cpm = document.querySelector(".cpm");
let wpm = document.querySelector(".wpm");
let accuracy = document.querySelector(".accuracy");
const inputText = document.querySelector(".inputText");
const menuIcon = document.querySelector(".menuIcon");
const menusContainer = document.querySelector(".menusContainer");
const menuType = document.querySelectorAll(".menuType");
const languages = document.querySelectorAll(".language");
const timeMenus = document.querySelectorAll(".timeMenu");
const paraSizes = document.querySelectorAll(".para");
const menuListItem = document.querySelectorAll(".menuListItem");
const paragraphContainer = document.querySelector(".paragraphContainer");
let interval;
let time = document.querySelector(".time");
let activeLanguage = document.querySelector(".activeLanguage");
let activeTimeDuration = 30*60;
let paraLength = 20;
let toggleLanMenu, handleLanSelection;
let timeLeft = 60, timeTaken;
let charIndex, paraLetterArr, writtencharArr;
let timeOptionsInMin = [1, 2, 5, 10, 20, 30];
let paraLenOptions = [5, 8, 10, 12, 15, 20];

let paragraphs = englishParagraphs;
let randIndex;

//Main.....................................................**********************
menuListItem[0].classList.add("activeMenu");
languages[0].classList.add("activeMenu");
timeMenus[timeMenus.length-1].classList.add("activeMenu");
paraSizes[paraSizes.length-1].classList.add("activeMenu");
menuType[0].classList.add("activeMenuType");
//remove menucontainer whenever clicked on the click
document.addEventListener("click", ()=>{
  document.querySelector(".menusContainer").classList.remove("menusContainerActive")
})
menusContainer.addEventListener("click", (e)=>{
  e.stopPropagation()
})
//set Highscore in local storage initially if it is not stored in local web storage
if (localStorage.getItem("highscore") === null) localStorage.setItem("highscore", "0");
//switch Menus
menuListItem.forEach((item, ind) => {
  item.addEventListener("click", () => {
    switchItem(item, menuListItem, "activeMenu");
    switchItem(menuType[ind], menuType, "activeMenuType");
  })
});
//switch Languages
languages.forEach((lan) => {
  lan.addEventListener("click", () => {
    switchItem(lan, languages, "activeMenu");
    paragraphs = lan == languages[0] ? englishParagraphs : nepaliUnicodeParagraphs;
    reset();
  })
});
//switch Time
timeMenus.forEach((time, ind) => {
  time.addEventListener("click", () => {
    switchItem(time, timeMenus, "activeMenu");
    timeLeft = timeOptionsInMin[ind] * 60;
    activeTimeDuration = timeLeft;
    reset();
  })
});
//switch Paragraphs Length
paraSizes.forEach((size, ind) => {
  size.addEventListener("click", () => {
    switchItem(size, paraSizes, "activeMenu");
    paraLength = paraLenOptions[ind];
    reset();
  })
})

reset();
let margin = getComputedStyle(document.querySelector(":root")).getPropertyValue(
  "--spacing"
);
document.addEventListener("keydown", () => inputText.focus());
inputText.addEventListener("input", startTyping);
inputText.addEventListener("keydown", (e)=>{
  if(e.ctrlKey){
    //prevent using ctrl key combinations while typing
    e.preventDefault()
  }
})
menuIcon.addEventListener("click", (e) => {
  menusContainer.classList.toggle("menusContainerActive");
  e.stopPropagation()
});
//Functions
function switchItem(item, itemArr, activatingClass) {
  itemArr.forEach(el => {
    el.classList.remove(activatingClass)
  })
  item.classList.add(activatingClass);
}
function generateRandomParagraph(paragraphs) {
  let randParagraph = paragraphs[randIndex];
  let paraDiv = document.createElement("div");
  paraDiv.classList.add("paragraphs");
  paragraphContainer.append(paraDiv);
  randParagraph.split("").forEach((character) => {
    let span = document.createElement("span");
    span.innerHTML = character;
    paraDiv.appendChild(span);
  });
  randIndex = (randIndex >= paragraphs.length - 1) ? 0 : randIndex+1;
}
function startTyping() {
  if (!hasStartedTyping) {
    startTimer();
  }
  hasStartedTyping = true;
  let indexForScroll = charIndex;
  if (timeLeft > 0) {
    writtencharArr = inputText.value.split("");
    if (writtencharArr[charIndex] == null) {
      correctAudio();
      if (charIndex > 0) charIndex--;
      paraLetterArr[charIndex + 1].classList.remove("active");
      paraLetterArr[charIndex].classList.remove(
        "correct",
        "incorrect",
        "spaceIncorrect"
      );
      paraLetterArr[charIndex].classList.add("active");
    } else {
      if (isCorrect()) {
        correctAudio();
        paraLetterArr[charIndex].classList.add("correct");
      } else if (isSpaceIncorrect()) {
        mistakeAudio();
        paraLetterArr[charIndex].classList.add("spaceIncorrect");
      } else {
        mistakeAudio();
        paraLetterArr[charIndex].classList.add("incorrect");
      }
      paraLetterArr[charIndex].classList.remove("active");
      charIndex++;
      paraLetterArr[charIndex].classList.add("active");
    }
  }
  if (isParagraphSwitched()) {
    let height = prevLetterParent.clientHeight;
    if (writtencharArr[indexForScroll] == null) {
      height = paraLetterArr[charIndex - 1].parentElement.clientHeight;
      paragraphContainer.scrollBy(0, -(height + parseInt(margin)));
    }
    else paragraphContainer.scrollBy(0, height + parseInt(margin));
  }
}
function showResult() {
  timeTaken++;
  timeLeft--;
  time.innerHTML = `Time : ${timeLeft}s`;
  let calculatedWPM = getWPM(timeTaken);
  if (timeTaken != 0) {
    cpm.innerHTML = `CPM : ${getCPM(timeTaken)}`;
    wpm.innerHTML = `WPM : ${calculatedWPM}`;
  }
  if (!isNaN(getAccuracy())) {
    accuracy.innerHTML = `Accuracy : ${getAccuracy()}%`;
  }
  if ((isTimeFinished() || isParaFinished()) && !moreThanOnce) {
    moreThanOnce = true;
    openEndMenu();
    showResultInEndMenu(
      calculatedWPM,
      getAccuracy(),
      getHighScore(calculatedWPM)
    );
  }
}
function isCorrect() {
  if (paraLetterArr[charIndex].innerHTML == writtencharArr[charIndex])
    return true;
}
function isSpaceIncorrect() {
  if (
    paraLetterArr[charIndex].innerHTML != writtencharArr[charIndex] &&
    paraLetterArr[charIndex].innerHTML == " "
  )
    return true;
}
function correctAudio() {
  let audio = document.createElement("audio");
  audio.src = "./necessities/correct.mp3";
  audio.play();
}
function mistakeAudio() {
  let audio = document.createElement("audio");
  audio.src = "./necessities/incorrect.mp3";
  audio.play();
}
function getCPM(timeTaken) {
  let correctCharLength = document.querySelectorAll(".correct").length;
  return Math.floor((correctCharLength / timeTaken) * 60);
}
function getWPM(timeTaken) {
  let correctCharLength = document.querySelectorAll(".correct").length;
  let wordLength = correctCharLength / 5;
  return Math.floor((wordLength / timeTaken) * 60);
}
function getAccuracy() {
  let correctCharLength = document.querySelectorAll(".correct").length;
  return Math.floor((correctCharLength / writtencharArr.length) * 100);
}
function isParagraphSwitched() {
  prevLetterParent = currLetterParent;
  currLetterParent = document.querySelector(".active").parentElement;
  if (prevLetterParent != currLetterParent) {
    return true;
  }
}
function resetTimer(timeDuration) {
  clearInterval(interval);
  timeLeft = timeDuration;
  timeTaken = -1;
  time.innerHTML = `Time : ${timeLeft}s`;
  hasStartedTyping = false;
}
function startTimer() {
  interval = setInterval(showResult, 1000);
}
function isTimeFinished() {
  if (timeLeft <= 0) return true;
  return false;
}
function isParaFinished() {
  if (inputText.value.length >= paraLetterArr.length) return true;
  return false;
}
function clearParagrahs() {
  document.querySelectorAll(".paragraphs").forEach((el) => {
    el.remove();
  });
}
//setHighscore and getHighScore
function getHighScore(currentScore) {
  let highscore = parseInt(localStorage.getItem("highscore"));
  if (currentScore > highscore) {
    localStorage.setItem("highscore", currentScore.toString());
    return currentScore;
  }
  return highscore;
}
function reset() {
  randIndex = Math.floor(Math.random() * paragraphs.length);
  inputText.value = "";
  clearParagrahs();
  resetTimer(activeTimeDuration);
  cpm.innerHTML = `CPM : 0`;
  wpm.innerHTML = `WPM : 0`;
  accuracy.innerHTML = `Accuracy : 0%`;
  for (let i = 0; i < paraLength; i++) {
    generateRandomParagraph(paragraphs);
  }
  charIndex = 0;
  paraLetterArr = document.querySelectorAll("span");
  paraLetterArr[charIndex].classList.add("active");
  prevLetterParent = document.querySelector(".active").parentElement;
  currLetterParent = prevLetterParent;
  paragraphContainer.scrollTo(0, 0);
  moreThanOnce = false;
}

