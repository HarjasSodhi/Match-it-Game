let colors = ["#fa8231", "#eb3b5a", "#2bcbba", "#4b6584", "#8854d0"];
let rightSide = document.querySelector(".right-side");
let leftSide = document.querySelector(".left-side");
let middle = document.querySelectorAll(".colorContainer div");
let timer = document.querySelector(".timer");

let clock = setInterval(function () {
    let time = timer.innerText;
    let timeArr = time.split(":");
    let sec = parseInt(timeArr[1]);
    let minute = parseInt(timeArr[0]);
    if (sec == 59) {
        minute++;
        sec = 0;
    }
    else {
        sec++;
    }
    let newTimeArr = []
    if (sec < 10) newTimeArr = [minute, "0" + sec];
    else newTimeArr = [minute, sec];
    timer.innerText = newTimeArr.join(":");
}, 1000);

let divCounter = 0;
let currDragging;
let currdragOver;

divGenerator(rightSide);
divGenerator(leftSide);


for (let i = 0; i < middle.length; i++) {
    middle[i].addEventListener("dragover", function (e) {
        currdragOver = e.currentTarget;
    })
    middle[i].addEventListener("dragleave",function(e){
        setTimeout(() => {
            currdragOver=undefined;
        }, 100);
    })
}


function divGenerator(side) {
    for (let i = 0; i < 25; i++) {
        let div = document.createElement("div");
        div.classList.add("random-divs");
        let num = Math.floor(Math.random() * 8)
        if (num > 4) {
            div.draggable = "false";
        }
        else {
            div.draggable = "true";
            divCounter++;
            div.addEventListener("dragstart", function (e) {
                currDragging = e.currentTarget;
            })
            div.addEventListener("dragend", function () {
                if (!currDragging.classList.contains("removed")) {
                    let score = document.querySelector(".score-card");
                    let scoreArr = score.innerText.split(":");
                    if (currDragging.style.backgroundColor == currdragOver.style.backgroundColor) {
                        scoreArr[1] = parseInt(scoreArr[1]) + 1;
                    }
                    else {
                        scoreArr[1] = parseInt(scoreArr[1]) - 1;
                    }
                    let newScore = scoreArr.join(":");
                    score.innerText = newScore;
                    currDragging.style.background = "none";
                    currDragging.setAttribute("draggable", false);
                    currDragging.classList.add("removed");
                    currDragging = undefined;
                    currdragOver = undefined
                    divCounter--;
                    if (divCounter == 0) {
                        clearInterval(clock);
                        alert(`Game Over.
Your Score Was ${scoreArr[1]} 
Your Time Was ${timer.innerText} minute(s)`)
                        location.reload();
                    }
                }
            })
        }
        div.style.backgroundColor = colors[num];
        side.append(div);
    }
}