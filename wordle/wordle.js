//Global Variables
let guessInput = document.querySelector(".guessHere");
let letterBoxContainer = document.querySelector(".letterBoxContainer");
let chanceLeftEl = document.querySelector("#chanceLeft");
let bestRes = document.querySelector(".bestResult");
let wordleGame = document.querySelector(".wordleGame");
let resultMenu = document.querySelector(".resultMenu");
let resultStatus = document.querySelector(".resultStatus");
let realWordEl = document.querySelector(".realWord");
let resultImg = document.querySelector(".resultImg");
let restart = document.querySelector(".restart i");
let submit = document.querySelector(".submit");
let menuIcon = document.querySelector(".menuIcon i");
let menuBox = document.querySelector(".wordSizeMenu");
let levels = document.querySelectorAll(".levels");
let previousActive = document.querySelector(".activeLevel");
let currentScore = document.querySelector(".currentScore");
let highscore = document.querySelector(".highscore");
let spans;

//words starts
threeSizeWords = ["aba","abs","ace","act","add","ado","aft","age","ago","ban","bar","bat","bay","bed","bee","dry","dub","due","dug","dun","duo","fly","foe","fog","for","fox","fry","may","med","meg","men","Met","mid","nap","nay","neb","neg","net","new","nil","nip","nod","sea","sec","see","sen","set","sew","sex","she","shy","tat","tax","tea","ted","tee","ten","the","thy","tie","tin","tip","tod","yes","yet","you","zip","zoo"];
fourSizeWords = ["able","acid","aged","also","area","army","away","baby","back","ball","band","bank","base","bath","bear","came","camp","card","care","case","cash","cast","cell","chat","drug","dual","duke","dust","duty","each","earn","ease","east","easy","edge","else","feet","fell","felt","file","fill","film","high","hill","hire","hold","hole","holy","lose","loss","lost","love","luck","made","mail","main","make","poor","port","post","pull","pure","push","race","rail","rain","rank","rare","rate","save","seat","seed","seek","seem","seen","self","sell","send","sent","sept","ship","with","wood","word","wore","work","yard","yeah","year","your","zero","zone"];
fiveSizeWords = ["about","above","abuse","actor","acute","admit","adopt","adult","after","brain","brand","bread","break","breed","brief","chest","chief","child","china","chose","civil","claim","class","clean","debut","delay","depth","doing","doubt","dozen","horse","hotel","house","human","ideal","image","index","inner","input","rough","round","route","royal","rural","scale","scene","scope","score","sense","serve","seven","shall","shape","share","noise","north","noted","novel","nurse","occur","ocean","offer","often","order","other","ought","paint","panel","paper"];
sixSizeWords = ["abroad","accept","access","across","acting","action","active","actual","advice","behind","belief","belong","berlin","better","beyond","dealer","debate","decade","decide","defeat","defend","define","degree","demand","review","reward","riding","rising","robust","ruling","safety","salary","sample","saving","saying","scheme","school","screen","search","season","second","secret","sector","secure","seeing","theory","thirty","though","threat","thrown","ticket","timely","timing","tissue","toward","travel","treaty","winner","winter","within","wonder","worker","wright","writer","yellow"];
sevenSizeWords = ["ability","absence","academy","account","accused","achieve","acquire","address","advance","adverse","advised","adviser","between","billion","binding","brother","brought","burning","cabinet","caliber","calling","capable","capital","captain","caption","capture","careful","carrier","caution","ceiling","service","serving","session","setting","seventh","several","shortly","showing","silence","silicon","similar","sitting","sixteen","skilled","smoking","society","somehow","someone","teacher","telecom","telling","tension","theatre","therapy","whether","willing","winning","without","witness","working","writing","written","network","neutral","notable","nothing","nowhere","nuclear","nursing","obvious","offense","officer","ongoing","opening","operate","opinion","optical","organic","outcome","outdoor","initial","inquiry","insight","install","instant","instead","intense","interim","involve","jointly","journal","journey","justice","justify","keeping","killing","kingdom","kitchen"];
eightsizeWords = ["absolute","abstract","academic","accepted","accident","accuracy","accurate","achieved","acquired","activity","actually","addition","adequate","adjacent","adjusted","advanced","advisory","advocate","bachelor","bacteria","baseball","bathroom","becoming","benjamin","birthday","boundary","breaking","breeding","building","bulletin","business","calendar","campaign","capacity","casualty","catching","category","Catholic","cautious","cellular","ceremony","chairman","champion","chemical","children","circular","civilian","clearing","contrast","convince","corridor","coverage","covering","creation","creative","criminal","critical","crossing","cultural","currency","customer","database","daughter","daylight","deadline","deciding","decision","decrease","deferred","definite","delicate","delivery","describe","designer","detailed","diabetes","dialogue","diameter","directly","director","disabled","disaster","disclose","discount","enormous","entirely","entrance","envelope","equality","equation","schedule","scrutiny","seasonal","secondly","security","sensible","sentence","separate","sequence","sergeant","shipping","shortage","shoulder","simplify","situated","whenever","wherever","wildlife","wireless","withdraw","woodland","workshop","yourself"];
wordSizeArray = [threeSizeWords,fourSizeWords,fiveSizeWords,sixSizeWords,sevenSizeWords,eightsizeWords];
//words ends

let winImg = ["win1.png", "win2.png"];
let loseImg = ["lost1.png", "lost2.png"];
let totalChances = 10;
let chancesLeft = totalChances;
let bestMatch = 0;
let hasMadeSpan = false;
let randIndex = Math.floor(Math.random() * fiveSizeWords.length)
let mainWord = fiveSizeWords[randIndex].toUpperCase();
chanceLeftEl.innerHTML = `Chances : ${chancesLeft}`;

//Functions
function createBoxes(len){
    for(let i = 0; i<len; i++)
    {
        let d =  document.createElement("div");
        d.classList.add("box");
        letterBoxContainer.append(d);
    }
}
function deleteBoxes(){
    document.querySelectorAll(".box").forEach(box=>{
        box.remove();
    })
}
function clearElements(elements) {
    elements.forEach(el => {
        el.innerHTML = "";
        el.classList.remove("green", "yellow", "red");
    })
}
function showBestMatch() {
    let boxes = document.querySelectorAll(".box");
    if (!hasMadeSpan) {
        bestRes.innerHTML = "Best Matched : "
        hasMadeSpan = true;
        for (let i = 0; i < boxes.length; i++) {
            let s = document.createElement("span");
            bestRes.append(s);
        }
        spans = document.querySelectorAll(".bestResult span");
    }
    clearElements(spans);
    for (let i = 0; i < guess.length; i++) {
        spans[i].innerHTML = guess[i];
        spans[i].classList.add(boxes[i].className.split(" ")[1]);
    }
}
function setChances(chance){
    chanceLeftEl.innerHTML = `Chances : ${chance}`;
}
function decreaseChances() {
    chancesLeft--;
    setChances(chancesLeft);
}
function checkAndShowBestMatch() {
    let boxes = document.querySelectorAll(".box");
    let currentMatch = 0;
    decreaseChances();
    clearElements(boxes);
    guess = guessInput.value.toUpperCase();
    for (let i = 0; i < guess.length; i++) {
        let hasColored = false;
        boxes[i].innerHTML = guess[i];
        if (guess[i] == mainWord[i]) {
            boxes[i].classList.add("green");
            currentMatch++;
            continue;
        }
        for (let j = i + 1; j < mainWord.length; j++) {
            if (guess[i] == mainWord[j]) {
                boxes[i].classList.add("yellow");
                hasColored = true;
                break;
            }
        }
        if (!hasColored)
            boxes[i].classList.add("red");
    }
    if (currentMatch > bestMatch) {
        bestMatch = currentMatch;
        showBestMatch();
    }
}
function getScore() {
    let score = 0;
    if (bestRes.innerHTML != "") {
        spans.forEach(el => {
            let elClass = el.className;
            if (elClass == "green") {
                score += 100;
            }
            else if (elClass == "yellow") {
                score += 50;
            }
        })
        score -= 15 * (totalChances - chancesLeft)
        if (score <= 0) {
            score = 0
        }
    }
    return score;
}
function getHighscore() {
    hs = parseInt(localStorage.getItem("highscore"));
    if (getScore() > hs) {
        hs = getScore();
        localStorage.setItem("highscore", hs.toString());
        return hs;
    }
    return hs;
}
function showResult()
{
//win
if (bestMatch == mainWord.length) {
    currentScore.innerHTML = `Score : ${getScore()}`;
    highscore.innerHTML = `Highscore : ${getHighscore()}`;
    wordleGame.style.display = "none";
    resultMenu.style.display = "block";
    resultImg.style.width = 300 + "px";
    resultStatus.innerHTML = "VICTORY";
    resultImg.style.background = `url(${winImg[Math.floor(Math.random() * winImg.length)]}) no-repeat center center/cover`;
}
//Lost
else if (chancesLeft <= 0) {
    currentScore.innerHTML = `Score : ${getScore()}`;
    highscore.innerHTML = `Highscore : ${getHighscore()}`;
    wordleGame.style.display = "none";
    resultMenu.style.display = "block";
    resultImg.style.width = 200 + "px";
    if (bestMatch > Math.round((mainWord.length) / 2)) {
        resultStatus.innerHTML = "SO CLOSE";
        realWordEl.innerHTML = `The word was ${mainWord}`;
        resultImg.style.background = `url(${loseImg[1]}) no-repeat center center/cover`;
    }
    else {
        resultStatus.style.fontSize = "1.5rem";
        resultStatus.innerHTML = "BETTER LUCK NEXT TIME";
        realWordEl.innerHTML = `The word was ${mainWord}`;
        resultImg.style.background = `url(${loseImg[0]}) no-repeat center center/cover`;
    }
}
}
function resetGame(wordLength) {
    let boxes = document.querySelectorAll(".box");
    realWordEl.innerHTML = "";
    resultMenu.style.display = "none";
    wordleGame.style.display = "block";
    bestRes.innerHTML = "";
    guessInput.value = "";
    bestMatch = 0;
    chancesLeft = totalChances;
    hasMadeSpan = false;
    randIndex = Math.floor(Math.random() * wordLength)
    mainWord = wordSizeArray[wordLength-3][randIndex].toUpperCase();
    setChances(chancesLeft);
    clearElements(boxes);
}

//Main
//submit starts
submit.addEventListener("click", () => {
    checkAndShowBestMatch();
    showResult();
})
guessInput.addEventListener("keydown",e=>{
    if(e.code == "Enter"){
        checkAndShowBestMatch();
        showResult();
    }
})
//submit ends
restart.addEventListener("click", ()=>{
    resetGame(parseInt(previousActive.innerHTML));
});
wordleGame.addEventListener("click",()=>{
    menuBox.classList.remove("activeMenuBox");
})
menuIcon.addEventListener("click",()=>{
    menuBox.classList.toggle("activeMenuBox");
})
levels.forEach(level =>{
    level.addEventListener("click",()=>{
        previousActive.classList.remove("activeLevel");
        level.classList.add("activeLevel");
        previousActive = level;
        wordLength = parseInt(level.innerHTML);
        deleteBoxes();
        createBoxes(wordLength);
        guessInput.setAttribute("maxLength",wordLength)
        totalChances = wordLength*2;
        resetGame(wordLength);
    });
});