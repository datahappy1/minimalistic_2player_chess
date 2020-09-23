function checkFigureAlreadyMoved(figure, position){
    if (initialBoardState[position] !== figure){
        return true
    } 
    else {
        return false
    }
}

function checkFigureMoveBlocked(figure, position){
    if (boardState[position] !== null){
        return true
    } 
    else {
        return false
    }
}

function checkPositionColumnInIndexMap(position_column){
    if (typeof indexMap[position_column] !== "undefined"){
        return position_column
    }
    else {
        throw new Error("undefined grid position");
    }
}

function getAllowedMovesForFigureOnPosition(figure, position){
    var position_row = position.charAt(0);//b
    var position_column = parseInt(position.charAt(1));//2
    var column_index = columnToIndexMap[position_row]
    var figureAlreadyMoved = checkFigureAlreadyMoved(figure, position);
    
    if (figure.startsWith("white_pawn")){
        var _allowedMovesBase = []
        var _captureMovesBase = []
                
        var allowedMoves = [];
        var captureMoves = [];
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index].concat(position_column + 1))}
        catch(err){}
        
        try {_captureMovesBase.push(indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column + 1)))}
        catch(err){}
        
        try {_captureMovesBase.push(indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column + 1)))}
        catch(err){}
        
        if (figureAlreadyMoved === false){
            try {_allowedMovesBase.push(indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + 2)))}
            catch(err){}
            }
        
        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlocked(figure, _allowedMovesBase[i]) === false){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }        
                
        for (i = 0; i < _captureMovesBase.length; i++) {
            if (checkFigureMoveBlocked(figure, _captureMovesBase[i]) === true){
                captureMoves.push(_captureMovesBase[i])
            }
            
        }
        return allowedMoves.concat(captureMoves)
    }
    
    if (figure.startsWith("black_pawn")){
        var _allowedMovesBase = []
        var _captureMovesBase = []
                
        var allowedMoves = [];
        var captureMoves = [];
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - 1)))}
        catch(err){}
        
        try {_captureMovesBase.push(indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column - 1)))}
        catch(err){}
        
        try {_captureMovesBase.push(indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column - 1)))}
        catch(err){}
        
        if (figureAlreadyMoved === false){
            try {_allowedMovesBase.push(indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - 2)))}
            catch(err){}
            }
        
        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlocked(figure, _allowedMovesBase[i]) === false){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }        
                
        for (i = 0; i < _captureMovesBase.length; i++) {
            if (checkFigureMoveBlocked(figure, _captureMovesBase[i]) === true){
                captureMoves.push(_captureMovesBase[i])
            }
            
        }

        return allowedMoves.concat(captureMoves)
    }
    
    if (figure.includes("_knight")){
        var _allowedMovesBase = []

        var allowedMoves = [];

        try {_allowedMovesBase.push(indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column + 2)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column - 2)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index + 2].concat(checkPositionColumnInIndexMap(position_column + 1)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index + 2].concat(checkPositionColumnInIndexMap(position_column - 1)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column + 2)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column - 2)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index - 2].concat(checkPositionColumnInIndexMap(position_column + 1)))}
        catch(err){}
        
        try {_allowedMovesBase.push(indexToColumnMap[column_index - 2].concat(checkPositionColumnInIndexMap(position_column - 1)))}
        catch(err){}     
        
        return _allowedMovesBase
    }

    if (figure.includes("_rook")){
        var _allowedMovesBase = []

        var allowedMoves = [];

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlocked(figure, _pos) === false){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    break
                }
            }
            catch(err){};
        }

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlocked(figure, _pos) === false){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    _allowedMovesBase.push(_pos)
                    break
                }
            }
            catch(err){};
        }

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index + rows[i]].concat(checkPositionColumnInIndexMap(position_column))
                if (checkFigureMoveBlocked(figure, _pos) === false){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    _allowedMovesBase.push(_pos)
                    break
                }
            }
            catch(err){};
        }

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index - rows[i]].concat(checkPositionColumnInIndexMap(position_column))
                if (checkFigureMoveBlocked(figure, _pos) === false){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    _allowedMovesBase.push(_pos)
                    break
                }
            }
            catch(err){};
        }

        return _allowedMovesBase
    }

    else {
        return []
    }
    
}
