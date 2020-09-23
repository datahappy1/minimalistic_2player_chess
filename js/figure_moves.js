function getFigureColor(figure){
    if (figure.startsWith("white")){
        return "white"
    }
    if (figure.startsWith("black")){
        return "black"
        }
}

function checkFigureAlreadyMoved(figure, position){
    if (initialBoardState[position] !== figure){
        return true
    } 
    else {
        return false
    }
}

function checkFigureMoveBlockedByFigureColor(figure, position){
    var _boardPosition = boardState[position];
    var result;
    
    if (_boardPosition == null){
        return "none";
    }
    if (_boardPosition.startsWith("white")){
        return "white";
    }
    if (_boardPosition.startsWith("black")){
        return "black";
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
    var figureColor = getFigureColor(figure);
    
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
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) === "none"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }        
                
        for (i = 0; i < _captureMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _captureMovesBase[i]) === "black"){
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
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) === "none"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }        
                
        for (i = 0; i < _captureMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _captureMovesBase[i]) === "white"){
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
        
        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) !== figureColor){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    if (figure.includes("_rook")){
        var _allowedMovesBase = []

        var allowedMoves = [];
        
        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    _allowedMovesBase.push(_pos)
                    break
                }
            }
            catch(err){};
        }

        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) !== figureColor){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    if (figure.includes("_bishop")){
        var _allowedMovesBase = []

        var allowedMoves = [];

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index + rows[i]].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index - rows[i]].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index + rows[i]].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index - rows[i]].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    _allowedMovesBase.push(_pos)
                    break
                }
            }
            catch(err){};
        }

        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) !== figureColor){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    if (figure.includes("_queen")){
        var _allowedMovesBase = []

        var allowedMoves = [];

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index + rows[i]].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index - rows[i]].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index + rows[i]].concat(checkPositionColumnInIndexMap(position_column - rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
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
            try {_pos = indexToColumnMap[column_index - rows[i]].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                    _allowedMovesBase.push(_pos)
                }
                else {
                    _allowedMovesBase.push(_pos)
                    break
                }
            }
            catch(err){};
        }

        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) !== figureColor){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        return allowedMoves
    }

    if (figure.includes("_king")){
        var _allowedMovesBase = []
        
        var allowedMoves = [];
        
        try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + 1))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};
        
        try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - 1))
            if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                _allowedMovesBase.push(_pos)
            }
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column + 1))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                 _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column - 1))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column - 1))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                 _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column + 1))
             if (checkFigureMoveBlockedByFigureColor(figure, _pos) === "none"){
                 _allowedMovesBase.push(_pos)
             }
        }
        catch(err){};
        
        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlockedByFigureColor(figure, _allowedMovesBase[i]) !== figureColor){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    else {
        return []
    }
    
}
