class ControlPoint {
    constructor(x,y){
        this.loc = createVector(x,y);
        // this.y = y;
        this.r = 5;
        this.locked = false;
    }

    clicked(x,y){
        if((dist(this.loc.x, this.loc.y, x, y) <=  this.r)){
            this.locked = true;
        }
    }
    dragged(x,y) {
        if(this.locked){
            this.loc.x = x;
            this.loc.y = y;
        }
    }

    show(){
        ellipse(this.loc.x, this.loc.y, this.r*2);
    }

}