window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const timeleft = document.querySelector('#time-left');
    const announce = document.querySelector('.announce');

    let hitPosition;
    let currentTime = 15;
    let timerId = null;
    let board = ['', '', '', '', '', '', '', '', ''];
    let won = false;


    function randomTile() {
        tiles.forEach(tile => {
            tile.classList.remove('mole')
        })
        let randomTile = tiles[Math.floor(Math.random() * 9)];
        randomTile.classList.add('mole');
        hitPosition = randomTile.id;
    }


    tiles.forEach(tile => {
        tile.addEventListener('mousedown', () => {
            if (tile.id == hitPosition) {
                tile.innerText = 'X'
                tile.classList.add('mole-hit');
                updateBoard();
                hitPosition = null;
            }
        })
    })

    function moveMole() {
        timerId = setInterval(randomTile, 500);
    }
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function checkWin() {
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === 'X' && b === 'X' && c === 'X') {
                won = true;
                break;
            }
        }
        if (won) {
            announce.classList.add('win')
            announce.innerText = 'You WON the game!';
        } else {
            announce.classList.add('lose')
            announce.innerText = 'You LOST the game!';
        }
    }

    function updateBoard() {
        if (hitPosition !== null) {
            board[hitPosition] = 'X'
        }
    }

    //time stuff
    function countDown() {
        currentTime--;
        timeleft.textContent = currentTime;

        if (currentTime == 0) {
            clearInterval(startCountDown)
            clearInterval(timerId)
            checkWin()
            tiles.forEach(tile => {
                tile.classList.remove('mole')
            })
        }
    }

    let startCountDown = setInterval(countDown, 1000)
    moveMole();

})
