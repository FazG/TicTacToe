const gameBoard = (() => {

  var gameIsFinished = false;

  const getGameIsFinished = () => {
    return gameIsFinished;
  }

  const toggleGameIsFinished = () => {
    gameIsFinished = !gameIsFinished;
  }

  const squaresDOM = document.querySelectorAll(".square");

  var xSquares = [];

  var oSquares = [];

  const consoleLogSquares = () => {
    console.log("X");
    console.log(xSquares);
    console.log("O");
    console.log(oSquares);
  }

  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]];

  const checkWin = () => {
    for (combination of winningCombinations) {
      if (xSquares.includes(combination[0]) && xSquares.includes(combination[1]) && xSquares.includes(combination[2])) {
        document.querySelector("body").classList.add("xWinLight");
        document.querySelector("h1").classList.add("xWinDark");
        document.querySelector("h2").textContent = "X wins !"
        document.querySelector("#winDiv").style.backgroundColor = 'rgba(50, 77, 197, 0.76)';
        document.querySelector("button").style.backgroundColor = 'rgb(40, 67, 190)';
        document.querySelector("#winDiv").style.display = 'flex';
        for (var i = 0; i < 9; i++) {
          squaresDOM[i].classList.add("xWinBorderDark", "winSquare");
        }
        gameBoard.toggleGameIsFinished();
        return;
      }
      else if (oSquares.includes(combination[0]) && oSquares.includes(combination[1]) && oSquares.includes(combination[2])) {
        document.querySelector("body").classList.add("oWinLight");
        document.querySelector("h1").classList.add("oWinDark");
        document.querySelector("h2").textContent = "O wins !"
        document.querySelector("#winDiv").style.backgroundColor = 'rgba(216, 100, 32, 0.76)';
        document.querySelector("button").style.backgroundColor = 'rgba(206, 100, 13, 0.993)';
        document.querySelector("#winDiv").style.display = 'flex';
        for (var i = 0; i < 9; i++) {
          squaresDOM[i].classList.add("oWinBorderDark", "winSquare");
        }
        gameBoard.toggleGameIsFinished();
        return;
      }
    }
  }

  var turn = Math.round(Math.random()) == 1 ? "x" : "o";

  var nextTurn = turn == "x" ? "o" : "x";

  const changeTurn = () => {
    var a = turn;
    var b = nextTurn;
    turn = b;
    nextTurn = a;
  };

  const getTurn = () => {
    return turn;
  };

  const getNextTurn = () => {
    return nextTurn;
  };

  const resetGameBoard = () => {
    xSquares.length = 0;
    oSquares.length = 0;
    turn = Math.round(Math.random()) == 1 ? "x" : "o";
    nextTurn = turn == "x" ? "o" : "x";
  };

  return { xSquares, oSquares, squaresDOM, getTurn, getNextTurn, changeTurn, winningCombinations, checkWin, getGameIsFinished, toggleGameIsFinished, resetGameBoard, consoleLogSquares };

})()

const displayController = (() => {

  const updateTurn = () => {
    gameBoard.squaresDOM.forEach(
      function (currentElement) {
        if (!(currentElement.classList.contains("x") || currentElement.classList.contains("o"))) {
          currentElement.classList.remove(`turn-${gameBoard.getNextTurn()}`);
          currentElement.classList.add(`turn-${gameBoard.getTurn()}`);
        }
      }
    )
  };

  const initializeClickListeners = () => {
    gameBoard.squaresDOM.forEach(
      function (currentElement) {
        currentElement.addEventListener('click', () => {
          if (!gameBoard.getGameIsFinished()) {
            var turn = gameBoard.getTurn();
            if (turn === "x") {
              gameBoard.xSquares.push(parseInt(currentElement.dataset.index));
            }
            else if (turn === "o") {
              gameBoard.oSquares.push(parseInt(currentElement.dataset.index));
            }
            currentElement.classList.add(`${turn}`);
            currentElement.classList.remove(`turn-${turn}`);
            gameBoard.changeTurn();
            updateTurn();
            gameBoard.consoleLogSquares();
            gameBoard.checkWin();
          }
        }, { once: true }
        );
      }
    )
  };

  const initializeButton = () => {
    document.querySelector("button").addEventListener('click', () => {
      gameBoard.resetGameBoard();
      resetDisplay();
    })
  };

  const resetDisplay = () => {
    document.querySelector("body").classList.remove("xWinLight", "oWinLight");
    document.querySelector("h1").classList.remove("xWinDark", "oWinDark");
    document.querySelector("#winDiv").style.display = 'none';
    for (var i = 0; i < 9; i++) {
      gameBoard.squaresDOM[i].click();
      gameBoard.squaresDOM[i].classList.remove("xWinBorderDark", "oWinBorderDark", "winSquare");
      gameBoard.squaresDOM[i].classList.remove("x");
      gameBoard.squaresDOM[i].classList.remove("o");
      gameBoard.squaresDOM[i].classList.remove("turn-x");
      gameBoard.squaresDOM[i].classList.remove("turn-o");
    }
    gameBoard.toggleGameIsFinished();
    initializeClickListeners();
    updateTurn();
  };

  return { updateTurn, initializeClickListeners, resetDisplay, initializeButton }
})()

const player = () => {
  return 1;
}

displayController.updateTurn();
displayController.initializeClickListeners();
displayController.initializeButton();