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
    var draggedFigureColor = getFigureColor(draggedFigure)

    if (lastMoveSide == draggedFigureColor || (lastMoveSide == null && draggedFigureColor == "black")){
        alert("Invalid move - It's Opponent move time");
        return
    }
    
    allowedTargetCells = getAllowedMovesForFigureOnPosition(draggedFigureElement.id, currentCellBoardPosition.id)
    console.log(allowedTargetCells)

    if (allowedTargetCells.length == 0){
        alert("No allowed moves for " + draggedFigureElement.id)
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
    var droppedFigureColor = getFigureColor(droppedFigure)
        
    if (droppedFigure.startsWith("black")) {
        var lostFigures = document.getElementById("black_lost_figures");
    } 
    if (droppedFigure.startsWith("white")) {
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

        targetCell.parentNode.appendChild(droppedFigureElement);
        targetCell.remove(targetFigureElement);
        lostFigures.append(targetFigureElement);
        lastMoveSide = droppedFigureColor;
        boardState[targetCellBoardPosition.id] = droppedFigureElement.id
    }

    if (checkIfPawnPromotion(droppedFigure, targetCellBoardPosition.id) == true){
            alert("Pawn promotion")

            targetCell.removeChild(droppedFigureElement);
            lostFigures.append(droppedFigureElement);
            lastMoveSide = droppedFigureColor;

            //TODO construct all 4: queen,rook,bishop,knight in lost items
            PromotedFigureName = droppedFigureColor + "_queen_promoted" ;
            if (droppedFigureColor === "white"){
                PromotedFigureValue = "\u2655";
            }
            else {
                PromotedFigureValue = "\u265B";
            }
            PromotedFigureElement = document.createElement("div");
            PromotedFigureElement.setAttribute("class", "figure");
            PromotedFigureElement.setAttribute("id", PromotedFigureName);
            PromotedFigureElement.setAttribute("draggable", "true");
            PromotedFigureElement.setAttribute("ondragstart", "drag(event)");
            PromotedFigureElement.appendChild(document.createTextNode(PromotedFigureValue));

            console.log(PromotedFigureElement)

            targetCell.appendChild(PromotedFigureElement)

            boardState[targetCellBoardPosition.id] = droppedFigureElement.id
        }
}
