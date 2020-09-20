function checkFigureAlreadyMoved(figure, position){
    if (initialBoardState[position] == figure){
        return false
    } 
    else {
        return true
    }
}

function checkFigureMoveBlocked(figure, position){
    if (boardState[position] == null){
        return false
    } 
    else {
        return true
    }
}

function getAllowedMovesForFigureOnPosition(figure, position){
    position_column = position.charAt(0);
    position_row = parseInt(position.charAt(1));

    column_index = columnToIndexMap[position_column]
    
    if (figure.startsWith("white_pawn")){
        _alreadyMoved = checkFigureAlreadyMoved(figure, position)
        
        allowedMoves = [indexToColumnMap[column_index + 1].concat(position_row)]
        
        if (_alreadyMoved == false){
            allowedMoves.push(indexToColumnMap[column_index + 2].concat(position_row))
        }
        
        for (i = 0; i < allowedMoves.length; i++) {
            _blockedMove = checkFigureMoveBlocked(figure, allowedMoves[i]);
            if (_blockedMove == true){
                allowedMoves.splice(i, 1);
            }
            
        }
        
        return allowedMoves
    }
    
    if (figure.startsWith("black_pawn")){
        _alreadyMoved = checkFigureAlreadyMoved(figure, position)
        
        allowedMoves = [indexToColumnMap[column_index - 1].concat(position_row)]
        
        if (_alreadyMoved == false){
            allowedMoves.push(indexToColumnMap[column_index - 2].concat(position_row))
        }
        
        for (i = 0; i < allowedMoves.length; i++) {
            _blockedMove = checkFigureMoveBlocked(figure, allowedMoves[i]);
            if (_blockedMove == true){
                allowedMoves.splice(i, 1);
            }
        }
        
        return allowedMoves
    }
    
    else {
        return []
    }
}
