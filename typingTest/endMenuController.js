let typingSpeed = document.querySelector("#typingSpeed"); 
let highscore =  document.querySelector("#hscore");
let accuracyRes = document.querySelector("#acc");
let mainElement = document.querySelector(".main");
let endMenu = document.querySelector(".endMenu");
let inputTexts = document.querySelector(".inputText");
function showResultInEndMenu(speed, acc, hs)
{
    typingSpeed.innerHTML = `Typing Speed : ${speed} WPM`;
    highscore.innerHTML = `Highscore : ${hs} WPM`;
    if(isNaN(acc))
        accuracyRes.innerHTML = `Accuracy : 100%`;
    else
        accuracyRes.innerHTML = `Accuracy : ${acc}%`;
}
function openEndMenu()
{
    mainElement.style.display = "none";
    endMenu.style.display = "block";
}
function restart()
{
    inputTexts.value = "";
    endMenu.style.display = "none";
    mainElement.style.display = "block";
    setInitialtypingInfo();
    reset();
}
function setInitialtypingInfo(){
    time.innerHTML = "Time : 60s";
    cpm.innerHTML = "CPM : 0";
    wpm.innerHTML = "WPM : 0";
    accuracy.innerHTML = "Accuracy: 0%";
}