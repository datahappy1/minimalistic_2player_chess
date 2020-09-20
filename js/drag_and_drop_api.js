var lastMoveSide = null;


function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.style.background = "yellow";
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var draggedFigure = ev.dataTransfer.getData("text");
    var draggedFigureElement = document.getElementById(draggedFigure)
    
    if (draggedFigure.startsWith("black")) {
        var draggedFigureColor = "black";
    } 
    if (draggedFigure.startsWith("white")) {
        var draggedFigureColor = "white";
    }
    
    if (lastMoveSide == draggedFigureColor || (lastMoveSide == null && draggedFigureColor == "black")){
        alert("Invalid move - It's Opponent move time");
        return
    }

    var currentCell = ev.target.parentElement.parentElement.id
    var allowedTargetCells = getAllowedMovesForFigureOnPosition(draggedFigureElement.id, currentCell)
    //console.log(allowedTargetCells)
    //xdoc = document.getElementById(allowedTargetCells)
    //xdoc.style.background = "lightblue";

    boardState[currentCell] = null

}

function leave(ev) {
    ev.currentTarget.style.background = "";
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.style.background = "";
    
    var droppedFigure = ev.dataTransfer.getData("text");
    var droppedFigureElement = document.getElementById(droppedFigure);
    
    if (droppedFigure.startsWith("black")) {
        var droppedFigureColor = "black";
        var lostFigures = document.getElementById("black_lost_figures");
    } 
    if (droppedFigure.startsWith("white")) {
        var droppedFigureColor = "white";
        var lostFigures = document.getElementById("white_lost_figures");
    }
    
    var targetCell = ev.target

    if (targetCell.className == "draggable"){
        var targetCellBoardPosition = targetCell.parentNode
        targetCell.appendChild(droppedFigureElement);
        lastMoveSide = droppedFigureColor;
        boardState[targetCellBoardPosition.id] = droppedFigureElement.id
        console.log(boardState)
    }
    
    if (targetCell.className == "figure"){
        var targetCellBoardPosition = targetCell.parentNode.parentNode
        var targetFigureElement = ev.target
        if (targetFigureElement.id == droppedFigureElement.id){
            return
        }
        
        if (targetFigureElement.id.startsWith(droppedFigureColor)){
            alert("Invalid move - No Cannibalism in here");
            return
        }

        targetCell.parentNode.appendChild(droppedFigureElement);
        targetCell.remove(targetFigureElement);
        lostFigures.append(targetFigureElement);
        lastMoveSide = droppedFigureColor;
        boardState[targetCellBoardPosition.id] = droppedFigureElement.id
    }
}
