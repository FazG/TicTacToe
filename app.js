const gameBoard = (() => {

  const squaresDOM = document.querySelectorAll(".square");

  var squares =
    ["X", "X", "X",
      "X", "X", "X",
      "X", "X", "X"];

  var turn = Math.round(Math.random()) == 1 ? "x" : "o";

  var nextTurn = turn == "x" ? "o" : "x";

  const changeTurn = () => {
    var a = turn;
    var b = nextTurn;
    turn = b;
    nextTurn = a;
    console.log(turn, nextTurn);
  }

  const getTurn = () => {
    return turn;
  }

  const getNextTurn = () => {
    return nextTurn;
  }

  return { squares, squaresDOM, getTurn, getNextTurn, changeTurn };

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
          currentElement.classList.add(`${gameBoard.getTurn()}`);
          currentElement.classList.remove(`turn-${gameBoard.getTurn()}`);
          gameBoard.changeTurn();
          updateTurn();
        }, { once: true }
        );
      }
    )
  };


  return { updateTurn, initializeClickListeners }
})()

const player = () => {
  return 1;
}

displayController.updateTurn();

displayController.initializeClickListeners();