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
let activeTimeDuration = 60;
let paraLength = 5;
let toggleLanMenu, handleLanSelection;
let timeLeft = 60, timeTaken;
let charIndex, paraLetterArr, writtencharArr;
let timeOptionsInMin = [1,2,5,10,20,30];
let paraLenOptions = [5,8,10,12,15,20];
const englishParagraphs = [
  "Mathematics is an indispenesable in many fields. It is essential in the field of engineering.",
  "A hyperbola is the plane curve consisting of all points whose distances from two fixed points in plane have a constant difference.",
  "The arrangement of objects taken some or all of them at a time in a definite order is permutation.",
  "In the afternoon, Iqbal stetched himself on the coarse string charpoy and tried to get some sleep.",
  "He had spent the night sitting on his bedroll in a crowded third class compartment.",
  "Every time he had dozen off, the train had come to halt ar some wayside station and the door was force open.",
  "Some child sleeping in its mother's lap would start howling till its wails were smothered by a breast thrust into its mouth.",
  "The shouting and clamour would continue until long after the train had left the station.",
  "The same thing was repeated again and again, till the compartment meant for 55 had almost 200 people in it.",
  "There were several people on roof. Most of people were on floor, on seats, on luggage racks, on trunks.",
  "Tempers were frayed and every few minutes an argument would start because someone had spread himself out too much.",
  "Mrs. Baroda was a little provoked to learn that her husband expected his friend, Gouvernail, upto spend a week on plantation.",
];
const nepaliUnicodeParagraphs = [
  "काठमाडौँ – निर्वाचन आयोगले मिति सिफारिस गरेको एक महिना पुग्न लाग्दा पनि चुनाव घोषणा नगरेको सरकारले मनोनयन दर्ताको अघिल्लो दिनसम्म प्रतिनिधिसभालाई निरन्तरता दिन गृहकार्य थालेको छ ।",
  "मन्त्री र सांसदहरू निर्वाचनको घोषणापश्चात् पनि प्रतिनिधिसभालाई निरन्तरता दिने पक्षमा रहेको एक मन्त्रीले बताए ।",
  "प्रमुख प्रतिपक्षी एमालेका प्रमुख सचेतक विशाल भट्टराई पनि मनोनयन दर्ताको अघिल्लो दिनसम्म प्रतिनिधिसभा कायम रहनुपर्ने बताउँछन् । ‘संसद् विघटन गर्ने व्यवस्था नै छैन ।",
  "मनोनयन दर्ताका बेलासम्म प्रतिनिधिसभाको कार्यकाल रहनुपर्छ,’ उनले भने । माओवादी केन्द्रका प्रमुख सचेतक देव गुरुङले पनि मिति घोषणापछि सांसद कायम रहनुपर्ने पक्षमा धारणा राखेका छन् ।",
  "संविधानविद् विपिन अधिकारी भने सरकारले पहिले निर्वाचनको मिति घोषणा गर्नुपर्ने र त्यसपछि निर्वाचन प्रयोजनका लागि राष्ट्रपतिसमक्ष प्रतिनिधिसभा विघटनको सिफारिस गर्नुपर्ने बताउँछन् ।",
  "‘प्रतिनिधिसभा कायम राख्नुको अर्थ सांसद, त्यसका विभिन्न समितिको सभापति, दलको नेतालगायतको पदीय हैसियतको निरन्तरता हो,’ उनले भने ।",
  "संविधानको धारा ९१ मा सभामुख र उपसभामुखको कार्यकाल निर्वाचनको मनोनयनपत्र दाखिला गर्ने अघिल्लो दिनसम्म रहने व्यवस्था छ ।",
  "राजनीतिक दलका नेताहरू भने प्रतिनिधिसभालाई कायमै राखेर चुनावमा जाँदा पदीय दुरुपयोग नहुने दाबी गर्छन् ।",
  "एक/दुई महिनाको सेवासुविधालाई ठूलो विषय मान्नु हुँदैन,’ उनले भने । एमाले संसदीय दलका उपनेता सुवास नेम्वाङले पनि सेवासुविधालाई दुरुपयोग भएको मान्न नमिल्ने तर्क गरे ।",
  "संविधानविद् अधिकारीका अनुसार निर्वाचन घोषणापछि सरकार स्वतः कामचलाऊ (कार्यवाहक) हुन्छ । कार्यवाहक सरकारलाई दीर्घकालीन रूपमा बजेट, नीति तथा कार्यक्रम, कानुन ल्याउने अधिकार हुँदैन ।",
  "एमाले अध्यक्ष केपी शर्मा ओलीले आफू प्रधानमन्त्री भएका बेला दुई पटक प्रतिनिधिसभा विघटन गर्दा सर्वोच्च अदालतले बदर गरिदिएको थियो ।",
  "त्यसैले पनि कतिपयले निर्वाचन घोषणपछि पनि प्रतिनिधिसभा विघटन गर्न मिल्दैन भन्ने तर्क दाबी गरिरहेका छन् । ",
];
let paragraphs = englishParagraphs;
let randIndex = Math.floor(Math.random() * paragraphs.length);

//Main.....................................................**********************
menuListItem[0].classList.add("activeMenu");
languages[0].classList.add("activeMenu");
timeMenus[0].classList.add("activeMenu");
paraSizes[0].classList.add("activeMenu");
menuType[0].classList.add("activeMenuType");
//set Highscore in local storage initially if it is not stored in local web storage
if(localStorage.getItem("highscore") === null) localStorage.setItem("highscore", "0");
//switch Menus
menuListItem.forEach((item,ind) => {
  item.addEventListener("click",()=>{
    switchItem(item,menuListItem,"activeMenu");
    switchItem(menuType[ind],menuType,"activeMenuType");
  })
});
//switch Languages
languages.forEach((lan) => {
  lan.addEventListener("click",()=>{
    switchItem(lan, languages, "activeMenu");
    lan==languages[0]? paragraphs = englishParagraphs : paragraphs = nepaliUnicodeParagraphs;
    reset();
  })
});
//switch Time
timeMenus.forEach((time, ind) => {
  time.addEventListener("click",()=>{
    switchItem(time,timeMenus,"activeMenu");
    timeLeft = timeOptionsInMin[ind]*60;
    activeTimeDuration = timeLeft;
    reset();
  })
});
//switch Paragraphs Length
paraSizes.forEach((size, ind)=>{
  size.addEventListener("click",()=>{
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
menuIcon.addEventListener("click", () => {
  menusContainer.classList.toggle("menusContainerActive");
});
//Functions
function switchItem(item, itemArr, activatingClass){
  itemArr.forEach(el=>{
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
  if (randIndex >= paragraphs.length - 1) randIndex = 0;
  else randIndex++;
}
function startTyping() {
  if(!hasStartedTyping){
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
    if (writtencharArr[indexForScroll] == null)
      paragraphContainer.scrollBy(0, -(height + parseInt(margin)));
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
  audio.src = "correct.mp3";
  audio.play();
}
function mistakeAudio() {
  let audio = document.createElement("audio");
  audio.src = "incorrect.mp3";
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
function resetTimer(timeDuration){
  clearInterval(interval);
  timeLeft = timeDuration;
  timeTaken = -1;
  time.innerHTML = `Time : ${timeLeft}s`;
  hasStartedTyping = false;
}
function startTimer(){
  interval = setInterval(showResult, 1000);
}
function isTimeFinished() {
  if (timeLeft <= 0) return true;
  return false;
}
function isParaFinished(){
  if (inputText.value.length>=paraLetterArr.length) return true;
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
  inputText.value = "";
  clearParagrahs();
  resetTimer(activeTimeDuration);
  cpm.innerHTML = `CPM : 0`;
  wpm.innerHTML = `WPM : 0`;
  accuracy.innerHTML = `Accuracy : 0%`;
  for(let i = 0; i<paraLength; i++){
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

