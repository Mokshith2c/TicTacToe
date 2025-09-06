let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#res-btn");
let turnO = true;
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", function(){
        if(turnO){ //player O
            box.innerText= "🐯";
            turnO = false;
        }else{ //player X
            box.innerText = "🦁";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})
// for(box of boxes){
//     box.addEventListener("click", function(){

//         console.log("clicked");
//     })
// }

const checkWinner = function(){
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                highlightPattern(pattern);
                showWinner(pos1);
                Array.from(boxes).every(box => box.disabled = true);
                return;
            }
        }
    }
    let draw = Array.from(boxes).every(box => box.innerText != "");
    if(draw){
        
        msg.innerHTML = `<p style= "font-family: 'Press Start 2P', cursive;">Whoa! A perfect tie 😮✨</p>`;
        msgContainer.classList.remove("hide");
    }
}
function highlightPattern(pattern){
    pattern.forEach(idx => boxes[idx].classList.add("winner-box"));
}

function showWinner(winner){
    msg.innerHTML = `<p style= "font-family: 'Press Start 2P', cursive;">"${winner}" Wins 🍾</p>`;
    msgContainer.classList.remove("hide");
    
}

function resetGame(){
    msgContainer.classList.add("hide");
    turnO = true;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("winner-box");
    });
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);



