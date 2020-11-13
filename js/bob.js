class Bob {
    constructor(painter, mass, pivot, theta, radius) {
        this.painter = painter;
        this.mass = mass;
        this.pivot = pivot;
        this.ON = false;
        this.theta = theta; // set theta and radius, move to correct x/y coordinates, then recalculate theta to be in correct domain
        this.radius = radius;
        this.move_to_arc();
        this.path = new Path([this.x, this.y]);
        this.painter.addObject(this.path);
        // this.trace = [[]]; //array of recent points to keep highlighted?
        this.time = 0;
        this.g = 8;
        this.timestep = 10;
        this.theta = calculate_theta(this.x, this.y, this.pivot.x, this.pivot.y);
        this.thetaMax = this.theta;
        this.T = 2*Math.PI*Math.sqrt(this.radius/this.g);                   //Period
        
        let self = this;
        this.clock = setInterval(function () {
            if (self.ON){
                self.time += self.timestep;               
                self.calculate_xy(self.thetaMax, self.radius, self.g, self.time);
                self.path.addPoint([self.x, self.y]);
            }
            //if (self.trace.length > 50) {self.trace.pop()}  //Is pop() right? remove the first point
            self.move_to_arc();
            self.painter.paint(); // draw all objects onto the canvas
        }, this.timestep);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.pivot.x, this.pivot.y);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        // loop through each point. 
        // (use length - 1 b/c we use i + 1)
        // for (let i = 0; i < trace.length - 1; i++) {
        //     ctx.beginPath();
        //     ctx.strokeStyle = "green";
        //     moveTo(trace[i], trace[i][i]);
        //     ctx.lineTo(trace[i+1], trace[i+1][i + 1]);
        //     ctx.stroke();
        //     ctx.closePath();
        // }
    }

    move_to_arc() {
        // move to correct coordinates from polar coordinates
        this.x = this.pivot.x + Math.sin(this.theta) * this.radius;
        this.y = this.pivot.y + Math.cos(this.theta) * this.radius;
    }

    calculate_xy(thetaMax, radius, g, t){
        this.thetaMax *= .999;                                   //friction 
        t = t / 75;                                             //Slow it down
        this.theta = thetaMax*Math.cos(2*Math.PI*t/this.T);           //Calculate new theta based on time differential
        this.x = this.pivot.x + radius * Math.cos(this.theta);   //Update x and y
        this.y = this.pivot.y + radius * Math.sin(this.theta);
        // this.trace.append(this.x); //add the x, y point to the array
        // this.trace[].append(this.y);
    }
}

function calculate_theta(x, y, pivot_x, pivot_y) {
    let diff_x = x - pivot_x;
    let diff_y = y - pivot_y;
    let theta = Math.atan(diff_x / diff_y);

    if (diff_x < 0 && diff_y < 0) { theta = (Math.PI) + theta; } // adjust for quadrant I
    if (diff_x > 0 && diff_y < 0) { theta = theta - Math.PI; } // adjust for quadrant II

    if (diff_y === 0 && diff_x < 0) { theta = 3 * Math.PI / 2; } // adjust for axes
    if (diff_y === 0 && diff_x > 0) { theta = Math.PI / 2; }
    if (diff_x === 0 && diff_y < 0) { theta = Math.PI; }
    if (diff_x === 0 && diff_y > 0) { theta = 0; }

    if (theta < 0) { theta += Math.PI * 2; }
    if (theta > Math.PI * 2) { theta -= Math.PI * 2; }

    if (theta > Math.PI) { // convert angles greater than pi to negative angles
        theta -= Math.PI * 2;
    }

    return theta;
}
