
/*
** Bezier Curves
* Camilo Cruz Gambardella, October 2022
* Example based on 'The Beauty of Bezier Curves' by Freya Holmer, and 'A Primer on
* Bezier Curves' by Pomax.
* See Freya's video here: 
* https://www.youtube.com/watch?v=aVwxzDHniEw
* Find Pomax's in depth tutorial here:
* https://pomax.github.io/bezierinfo/
* 
* 
*/

// global variables
let controlPoints = [];
let b;

// Settings, values used in the algorithm execution
let settings = {
  Type:"linear", 
  // Reset: function(){ init(); },
  // Len: 200,
  // Angle: 30,
  // Iteration: 0,
};

function gui(){
  // Adding the GUI menu
  var gui = new dat.GUI();
  gui.width = 150;
  gui.add(settings, "Type", ["linear", "quadratic", "cubic"]).onChange(function () {init()});
  // gui.add(settings,'Generate');
  // gui.add(settings,'Reset');
  // gui.add(settings,'Len', 50, 500).step(1);
  // gui.add(settings,'Angle', -180, 180);
  
}
// // run gui
// gui();




function setup() {
  createCanvas(400, 400);
  background(255, 247, 230);

  // run gui
  gui();
  // add control points
  init();

  // b = new Bezier(controlPoints, 50, 'cubic');
  // b.init();
  // console.log(b.curve);
}

function draw() {
  background(255, 247, 230);
  noFill();
  b.update();
  strokeWeight(1);
  stroke(0);
  beginShape();
  for(let p of controlPoints){
    vertex(p.loc.x,p.loc.y);
  }
  endShape();
  for(let p of controlPoints){
    p.show();
  }

  strokeWeight(1);
  stroke(255,0,0);
  beginShape();
  for(let v of b.curve){
    vertex(v.x, v.y);
  }
  endShape();
}

// function that generates control points
function init(){
  controlPoints = [];
  let n;
  switch(settings.Type){
    case "linear":
      n = 2;
      break;
    case "quadratic":
      n = 3;
      break;
    case "cubic":
      n = 4;
      break;
    default:
      n = 2;
      break;
  }
  for(let i = 0; i < n; i++){
    controlPoints.push(new ControlPoint(random(width), random(height)));
  }
  b = new Bezier(controlPoints, 50, 'cubic');
  console.log("init called");
}

function mousePressed(){
  for(let p of controlPoints){
    p.clicked(mouseX, mouseY);
  }
}

function mouseDragged(){
  for(let p of controlPoints){
    p.dragged(mouseX, mouseY);
  }
}

function mouseReleased(){
  for(let p of controlPoints){
    p.locked = false;
  }
}
