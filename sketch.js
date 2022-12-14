
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
* The algorithm is implemented as a series of interpolations between vertices of a
* polyline.
* 
* 
* 
*/

// global variables
let controlPoints = [];
let b;

// Settings, values used in the algorithm execution
let settings = {
  Type:"linear", 
  Interpolation:0.5,
};

function gui(){
  // Adding the GUI menu
  var gui = new dat.GUI();
  gui.width = 150;
  gui.add(settings, "Type", ["linear", "quadratic", "cubic"]).onChange(function () {init()});
  gui.add(settings, "Interpolation", 0.01,0.99).step(0.01).onChange(function () {draw()});
  
}




function setup() {
  createCanvas(400, 400);
  background(255, 247, 230);

  // run gui
  gui();
  // add control points
  init();
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
  let mid = b.curve[int(b.curve.length * settings.Interpolation)];
  // console.log(mid);
  ellipse(mid.x, mid.y, 8, 8);
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
  b = new Bezier(controlPoints, 100, 'cubic');
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
