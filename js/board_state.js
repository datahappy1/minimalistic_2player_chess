var boardState = {
    "a1": "white_rook1",
    "a2": "white_pawn1",
    "a3": null,
    "a4": null,
    "a5": null,
    "a6": null,
    "a7": "black_pawn1",
    "a8": "black_rook1",
    "b1": "white_knight1",
    "b2": "white_pawn2",
    "b3": null,
    "b4": null,
    "b5": null,
    "b6": null,
    "b7": "black_pawn2",
    "b8": "black_knight1",
    "c1": "white_bishop1",
    "c2": "white_pawn3",
    "c3": null,
    "c4": null,
    "c5": null,
    "c6": null,
    "c7": "black_pawn3",
    "c8": "black_bishop1",
    "d1": "white_queen",
    "d2": "white_pawn4",
    "d3": null,
    "d4": null,
    "d5": null,
    "d6": null,
    "d7": "black_pawn4",
    "d8": "black_queen",
    "e1": "white_king",
    "e2": "white_pawn5",
    "e3": null,
    "e4": null,
    "e5": null,
    "e6": null,
    "e7": "black_pawn5",
    "e8": "black_king",
    "f1": "white_bishop2",
    "f2": "white_pawn6",
    "f3": null,
    "f4": null,
    "f5": null,
    "f6": null,
    "f7": "black_pawn6",
    "f8": "black_bishop2",
    "g1": "white_knight2",
    "g2": "white_pawn7",
    "g3": null,
    "g4": null,
    "g5": null,
    "g6": null,
    "g7": "black_pawn7",
    "g8": "black_knight2",
    "h1": "white_rook2",
    "h2": "white_pawn8",
    "h3": null,
    "h4": null,
    "h5": null,
    "h6": null,
    "h7": "black_pawn8",
    "h8": "black_rook2"
}

function checkIfPawnPromotion(droppedFigure, targetCellBoardPosition){
    if (droppedFigure.includes("_pawn") == true && (targetCellBoardPosition.endsWith("8") || targetCellBoardPosition.endsWith("1"))){
        return true
    }
    else {
        return false
    }
}

function checkIfCastlingPossible(){

}

function checkIfCheck(){

}

function checkIfCheckMate(){

}

