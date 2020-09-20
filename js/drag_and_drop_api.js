var lastMoveSide = null;
var allowedTargetCells = [];


function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.style.background = "yellow";
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var draggedFigure = ev.dataTransfer.getData("text");
    var draggedFigureElement = document.getElementById(draggedFigure)
    
    var currentCellBoardPosition = draggedFigureElement.parentElement.parentElement
    
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
    
    allowedTargetCells = getAllowedMovesForFigureOnPosition(draggedFigureElement.id, currentCellBoardPosition.id)
    console.log(allowedTargetCells)
    
    if (allowedTargetCells.length == 0){
        alert("No moves left for " + draggedFigureElement.id)
        return
    }
    
    for (i = 0; i < allowedTargetCells.length; i++) {
        _doc = document.getElementById(allowedTargetCells[i]);
        _doc.style.background = "lightblue";
    }

    boardState[currentCellBoardPosition.id] = null

}

function leave(ev) {
    ev.currentTarget.style.background = "";
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.style.background = "";

    if (allowedTargetCells.length > 0){
        for (i = 0; i < allowedTargetCells.length; i++) {
            _doc = document.getElementById(allowedTargetCells[i]);
            _doc.style.background = "";
        }
    }
    
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
        
        if (allowedTargetCells.includes(targetCellBoardPosition.id) == false){
            return
        }
        
        targetCell.appendChild(droppedFigureElement);
        lastMoveSide = droppedFigureColor;
        boardState[targetCellBoardPosition.id] = droppedFigureElement.id
    }
    
    if (targetCell.className == "figure"){
        var targetCellBoardPosition = targetCell.parentNode.parentNode
        
        if (allowedTargetCells.includes(targetCellBoardPosition.id) == false){
            return
        }
        
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
