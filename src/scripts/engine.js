
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        scoreInterval: 10,
        gameVelocity: 1000,
        velocityDecrement: 50,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= (-1)) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    };
};

function enemyVelocity() {
    if (state.values.result % state.values.scoreInterval === 0) {
        state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
        state.values.gameVelocity -= state.values.velocityDecrement;
    };
};

function playSound(audioName) {
    let audio = new Audio(`/src/audio/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
                enemyVelocity();
            }
        });
    });
};

function init() {
    addListenerHitBox();
};

init();