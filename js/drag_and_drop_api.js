function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var draggedObject = ev.dataTransfer.getData("text");
    var draggedObjectById = document.getElementById(draggedObject)

    if (draggedObjectById.id.startsWith("black")) {
        draggedObjectById.style.backgroundColor = "#ff3333";
    } else {
        draggedObjectById.style.backgroundColor = "#3366ff";
    }
}

function drop(ev) {
    ev.preventDefault();
    var droppedObject = ev.dataTransfer.getData("text");
    var droppedObjectById = document.getElementById(droppedObject);
    var targetObjectParent = ev.target.parentNode
    var targetObjectParentById = targetObjectParent.id
    var targetObjectParentElements = targetObjectParent.getElementsByTagName('*')

    if (droppedObject.startsWith("black")) {
        var droppedFigureColor = "black";
    } else {
        var droppedFigureColor = "white";
    }

    droppedObjectById.style.backgroundColor = "transparent";

    // if the target is the lost figures section of the board check that color of the lost figure
    // corresponds with the name of the lost figures section
    if (targetObjectParentById.endsWith("lost_figures")) {
        if (targetObjectParentById && targetObjectParentById.startsWith(droppedFigureColor)) {
            ev.target.appendChild(droppedObjectById);
        }
    }
    // if the target is in the game canvas board check that there is no more than 2 figures already
    // and check that if there is already a figure, it's got the opposite color as the dragged figure
    else {
        if (targetObjectParentById && targetObjectParentElements.length < 3) {
            if (targetObjectParentElements[1] != null) {
                if (targetObjectParentElements[1].id.startsWith(droppedFigureColor) == false) {
                    ev.target.appendChild(droppedObjectById);
                }
            } else {
                ev.target.appendChild(droppedObjectById);
            }
        }
    }

}
