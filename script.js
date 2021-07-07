let colors = ["#fa8231", "#eb3b5a", "#2bcbba", "#4b6584", "#8854d0"];
let rightSide = document.querySelector(".right-side");
let leftSide = document.querySelector(".left-side");
let middle = document.querySelectorAll(".colorContainer div");
let timer = document.querySelector(".timer");
let selectedDiv = undefined;

if(window.innerWidth<1000 && !sessionStorage.getItem('notified')){
    alert("rotate your device your better Experience");
    sessionStorage.setItem('notified', 'true');
}

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
let tottalDivsGenerated = divCounter;

for (let i = 0; i < middle.length; i++) {
    middle[i].addEventListener("dragover", function (e) {
        currdragOver = e.currentTarget;
    });
    middle[i].addEventListener("touchstart", function (e) {
        if (selectedDiv) {
            let score = document.querySelector(".score-card");
            let scoreArr = score.innerText.split(":");
            if (selectedDiv.style.backgroundColor == e.currentTarget.style.backgroundColor) {
                scoreArr[1] = parseInt(scoreArr[1]) + 1;
            }
            else {
                scoreArr[1] = parseInt(scoreArr[1]) - 1;
            }
            let newScore = scoreArr.join(":");
            score.innerText = newScore;
            selectedDiv.style.background = "none";
            selectedDiv.setAttribute("draggable", false);
            selectedDiv.classList.add("removed");
            selectedDiv.classList.remove("selected-div");
            selectedDiv = undefined;
            divCounter--;
            if (divCounter == 0) {
                clearInterval(clock);
                alert(`Game Over.
Your Score Was ${scoreArr[1]}/${tottalDivsGenerated} 
Your Time Was ${timer.innerText} minute(s)`)
                location.reload();
            }
        }
    })
    middle[i].addEventListener("dragleave", function (e) {
        setTimeout(() => {
            currdragOver = undefined;
        }, 50);
    });
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
                if (!currDragging.classList.contains("removed") && currdragOver) {
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
Your Score Was ${scoreArr[1]}/${tottalDivsGenerated} 
Your Time Was ${timer.innerText} minute(s)`)
                        location.reload();
                    }
                }
            });

            div.addEventListener("touchstart", function (e) {
                if (!e.currentTarget.classList.contains("removed")) {
                    if (selectedDiv) selectedDiv.classList.remove("selected-div");
                    selectedDiv = e.currentTarget;
                    e.currentTarget.classList.add("selected-div");
                }
            })

        }
        div.style.backgroundColor = colors[num];
        side.append(div);
    }
}