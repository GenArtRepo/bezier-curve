
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
            this.curve = this.points;
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
        // if(this.t == 'quadratic'){

        // }else{
        //     for(let i = 0; i < this.res + 1; i++){
        //         let t = i/this.res;
        //         // for(let k = this.points.length - 1; k > 0; k--){
        //         //     for(let j = 0; j < k; j++){
        //         //         let px
        //         //     }
        //         // }
        //         for(let j = 0; j + 3 < this.points.length; j++){
        //             let x = 0;
        //             let y = 0;
        //             //scale p
        //             let a = this.points[j];
        //             let b = this.points[j+1];
        //             let c = this.points[j+2];
        //             let d = this.points[j+3];
        //             //add scaled p.x and p.y to x and y 
        //             let ta = -Math.pow(t, 3)+3*Math.pow(t,2)-3*t+1;
        //             let tb = 3*Math.pow(t,3)-6*Math.pow(t,2)+3*t;
        //             let tc = -3*Math.pow(t,3)+3*Math.pow(t,2);
        //             let td = Math.pow(t,3);
                    
        //             x+=((a.x*ta)+(b.x*tb)+(c.x*tc)+(d.x*td));
        //             y+=((a.y*ta)+(b.y*tb)+(c.y*tc)+(d.y*td));

        //             this.curve.push({x:x, y:y});

                    
        //         }

        //     }
        // }
    }
}