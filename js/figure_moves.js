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

function checkFigureMoveBlockedBy(figure, position){
    let _boardPosition = boardState[position];
    
    if (_boardPosition == null){
        return "none";
    }
    if (_boardPosition.endsWith("king")){
        return "king";
    }
    if (_boardPosition.startsWith("white")){
        return "white";
    }
    if (_boardPosition.startsWith("black")){
        return "black";
    }
}

function checkPositionColumnInIndexMap(positionColumn){
    if (typeof indexMap[positionColumn] !== "undefined"){
        return positionColumn
    }
    else {
        throw new Error("undefined grid position");
    }
}

function getAllowedMovesForFigureOnPosition(figure, position){
    let position_row = position.charAt(0);//b
    let position_column = parseInt(position.charAt(1));//2
    let column_index = columnToIndexMap[position_row]
    let figureAlreadyMoved = checkFigureAlreadyMoved(figure, position);
    let figureColor = getFigureColor(figure);
    
    if (figure.startsWith("white_pawn")){
        let _allowedMovesBase = []
        let _captureMovesBase = []

        let allowedMoves = [];
        let captureMoves = [];
        
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
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) === "none"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }        

        for (i = 0; i < _captureMovesBase.length; i++) {
            if (checkFigureMoveBlockedBy(figure, _captureMovesBase[i]) === "black"){
                captureMoves.push(_captureMovesBase[i])
            }
            
        }
        return allowedMoves.concat(captureMoves)
    }
    
    if (figure.startsWith("black_pawn")){
        let _allowedMovesBase = []
        let _captureMovesBase = []
                
        let allowedMoves = [];
        let captureMoves = [];
        
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
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) === "none"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }        
                
        for (i = 0; i < _captureMovesBase.length; i++) {
            if (checkFigureMoveBlockedBy(figure, _captureMovesBase[i]) === "white"){
                captureMoves.push(_captureMovesBase[i])
            }
            
        }

        return allowedMoves.concat(captureMoves)
    }
    
    if (figure.includes("_knight")){
        let _allowedMovesBase = []

        let allowedMoves = [];
        
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
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== figureColor && checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== "king"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    if (figure.includes("_rook")){
        let _allowedMovesBase = []

        let allowedMoves = [];
        
        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== figureColor && checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== "king"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    if (figure.includes("_bishop")){
        let _allowedMovesBase = []

        let allowedMoves = [];

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index + rows[i]].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== figureColor && checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== "king"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    if (figure.includes("_queen")){
        let _allowedMovesBase = []

        let allowedMoves = [];

        for (i = 1; i <= rows.length; i++) {
            try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + rows[i]))
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
                if (checkFigureMoveBlockedBy(figure, _pos) === "none"){
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
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== figureColor && checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== "king"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        return allowedMoves
    }

    if (figure.includes("_king")){
        let _allowedMovesBase = []
        
        let allowedMoves = [];
        
        try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column + 1))
            _allowedMovesBase.push(_pos)
        }
        catch(err){};
        
        try {_pos = indexToColumnMap[column_index].concat(checkPositionColumnInIndexMap(position_column - 1))
            _allowedMovesBase.push(_pos)
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column))
            _allowedMovesBase.push(_pos)
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column))
            _allowedMovesBase.push(_pos)
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column + 1))
             _allowedMovesBase.push(_pos)
        }   
        catch(err){};

        try {_pos = indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column - 1))
            _allowedMovesBase.push(_pos)
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index + 1].concat(checkPositionColumnInIndexMap(position_column - 1))
             _allowedMovesBase.push(_pos)
        }
        catch(err){};

        try {_pos = indexToColumnMap[column_index - 1].concat(checkPositionColumnInIndexMap(position_column + 1))
             _allowedMovesBase.push(_pos)
        }
        catch(err){};
        
        for (i = 0; i < _allowedMovesBase.length; i++) {
            if (checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== figureColor && checkFigureMoveBlockedBy(figure, _allowedMovesBase[i]) !== "king"){
                allowedMoves.push(_allowedMovesBase[i])
            }
        }
        
        return allowedMoves
    }

    else {
        return []
    }
    
}

