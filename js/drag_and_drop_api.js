function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.style.background = "yellow";
}

function drag(ev) {
    //ev.currentTarget.style.background = "yellow";
    
    ev.dataTransfer.setData("text", ev.target.id);
    var draggedFigure = ev.dataTransfer.getData("text");
    var draggedFigureElement = document.getElementById(draggedFigure)
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
        var lost_figures = document.getElementById("black_lost_figures");
    } 
    if (droppedFigure.startsWith("white")) {
        var droppedFigureColor = "white";
        var lost_figures = document.getElementById("white_lost_figures");
    }
    
    var targetCell = ev.target

    if (targetCell.className == "draggable"){
        targetCell.appendChild(droppedFigureElement);
    }
    if (targetCell.className == "figure"){
        var targetFigureElement = ev.target
        if (targetFigureElement.id == droppedFigureElement.id){
            return
        }
        
        if (targetFigureElement.id.startsWith(droppedFigureColor)){
            alert("Invalid move");
        }
        else {
            targetCell.parentNode.appendChild(droppedFigureElement);
            targetCell.remove(targetFigureElement);
            lost_figures.append(targetFigureElement);
        }
    }

}
