// distance: number of pixels a puzzle piece will move
const DISTANCE = 100;
/**********************************
// STEP 1 - Create puzzlePieces data structure.
// I suggest using an array of objects but feel free to change that
// An example of a puzzle piece object could be: { name: ".box1", x: 0, y: 0 }
**********************************/
const piecesDOM = document.querySelectorAll('[class^="box"]');
const puzzlePieces = [
  {name: '.box1', x: 0, y: 0}, {name: '.box2', x: 100, y: 0}, {name: '.box3', x: 200, y: 0}, {name: '.box4', x: 300, y: 0},
  {name: '.box5', x: 0, y: 100}, {name: '.box6', x: 100, y: 100}, {name: '.box7', x: 200, y: 100}, {name: '.box8', x: 300, y: 100},
  {name: '.box9', x: 0, y: 200}, {name: '.box10', x: 100, y: 200}, {name: '.box11', x: 200, y: 200}, {name: '.box12', x: 300, y: 200},
  {name: '.box13', x: 0, y: 300}, {name: '.box14', x: 100, y: 300}, {name: '.box15', x: 200, y: 300}
];



// blankSpace: initialize blank square as last piece so as to remember where it is.
// Will eventually use it to ask direction of clicked puzzle piece(s).
// Once pieces move, must remember to update x,y values to new blank space coords
const blankSpace = { x: 300, y: 300, order: 16 };

// I'm structuring my program sort of like how Vue does it - all in my puzzle object below.
const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "",
  initialize: function() {
    /************************************     
    // STEP 2 - Implement initialize function such that it
    // attache click event handlers for each piece
    // and within that, invokes the slide function
    ***************************************/
    piecesDOM.forEach(element => {
      element.addEventListener('click', e => {
        this.currentPiece = e.target;
        this.slide();
      });
    });
    

    // show puzzle pieces
    this.display();
  },
  display: function() {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },
  slide: function() {
    // call isMoveable to find out direction to move
    this.directionToMove = this.isMoveable();
    // remember to adjust coordinates including adjusting blank piece's coordinates
    /************************************
    // STEP 4 - Implement slide function so that you set x,y coordinates of appropriate puzzle piece(s)
    *********************************/
    var piece = this.pieces[this.currentPiece.dataset.idx];
    switch(this.directionToMove){
      case "up": 
        piece.y -= 100;
        blankSpace.y += 100;
        break;
      case "down":
        piece.y += 100;
        blankSpace.y -= 100;
        break;
      case "right":
        piece.x += 100;
        blankSpace.x -= 100;
        break;
      case "left":
        piece.x -= 100;
        blankSpace.x += 100;
        break;
      default: 
        console.log('nowhere to go');
    }

    // Now animate current puzzle piece now that x, y coordinates have been set above
    TweenMax.to(this.currentPiece, 0.17, {
      x: this.pieces[this.currentPiece.dataset.idx].x,
      y: this.pieces[this.currentPiece.dataset.idx].y,
      ease: Power0.easeNone
    });
  },
  isMoveable: function() {
    /********************************************
    // STEP 3 - Implement isMoveable function to find out / return which direction to move
    // Is the clicked piece movable?
    // If yes, then return a direction to one of: "up", "down", "left", "right"
    // If no, then return a direction of ""
     ******************************************/
    var piece = this.pieces[this.currentPiece.dataset.idx];
    if(piece.y == blankSpace.y){
      if(piece.x-100 == blankSpace.x) return "left";
      if(piece.x+100 == blankSpace.x) return "right";
      else return "";
    }
    else if(piece.x == blankSpace.x){
      if(piece.y-100 == blankSpace.y) return "up";
      if(piece.y+100 == blankSpace.y) return "down";
      else return "";
    }
    else return "";
  }
};

puzzle.initialize();

/* 
STEP 5 - Comment each function implemented
STEP 6 - Submit to github
STEP 7 - host on web server
*/
