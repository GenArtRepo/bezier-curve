
class Bezier{
    constructor(points,res,t){
        this.points = points;
        this.res = res;
        if(t == 'cubic' && this.points.length >= 4){
            this.t = 'cubic';
        }else{
            this.t = 'quadratic';
        }
        this.curve = []
    }
    
    interpolate(a, b, t){
        // interpolate between control points a and b
        // scale a by (1 - t)
        let at = p5.Vector.mult(a,(1-t));
                
        // scale b by t
        let bt = p5.Vector.mult(b,t);
        
        // add a and b
        let ab = p5.Vector.add(at,bt);

        return ab;
    }

    update(){
        this.curve = [];
        if(this.points.length == 2){
            let a = this.points[0].loc;
            let b = this.points[1].loc;
            for(let i = 0; i < this.res + 1; i++){
                let t = i/this.res;

                // interpolate between control points a and b
                let ab = this.interpolate(a,b,t);

                this.curve.push(new p5.Vector(ab.x, ab.y));
            }
        }else if(this.points.length == 3){
            // control points
            let a = this.points[0].loc;
            let b = this.points[1].loc;
            let c = this.points[2].loc;
            for(let i = 0; i < this.res + 1; i++){
                let t = i/this.res;

                // interpolate between control points a and b
                let ab = this.interpolate(a,b,t);
                
                // interpolate between control points b and c
                let bc = this.interpolate(b,c,t);
                
                // interpolate between ab and bc
                let p = this.interpolate(ab, bc,t);
                
                // add p to curve
                this.curve.push(new p5.Vector(p.x, p.y));
            }
        }else if(this.points.length == 4){
            // console.log("four points")
            let a = this.points[0].loc;
            let b = this.points[1].loc;
            let c = this.points[2].loc;
            let d = this.points[3].loc;
            for(let i = 0; i < this.res + 1; i++){
                let t = i/this.res;

                // interpolate between control points a and b
                let ab = this.interpolate(a,b,t);
                
                // interpolate between control points b and c
                let bc = this.interpolate(b,c,t);
                
                // interpolate between control points b and c
                let cd = this.interpolate(c,d,t);

                let abc = this.interpolate(ab,bc,t);
                let bcd = this.interpolate(bc,cd,t);
                
                // interpolate between ab and bc
                let p = this.interpolate(abc, bcd,t);
                
                // add p to curve
                this.curve.push(new p5.Vector(p.x, p.y));
            }

        }
    }
}