class Bob {
    constructor(painter, mass, pivot, theta, radius, bob=Bob) {
        this.painter = painter;
        this.first = false;
        this.second = false;
        this.pair = bob;
        this.mass = mass;
        this.pivot = pivot;
        this.ON = false;
        this.theta = theta; // set theta and radius, move to correct x/y coordinates, then recalculate theta to be in correct domain
        this.radius = radius;
        this.path = new Path([this.x, this.y]);
        this.move_to_arc();
        this.painter.addObject(this.path);
        this.time = 0;
        this.g = 1;
        this.timestep = 10 / 10000;
        this.theta = calculate_theta(this.x, this.y, this.pivot.x, this.pivot.y, radius);
        this.thetaMax = this.theta;
        this.T = 2*Math.PI*Math.sqrt(this.radius/this.g);                   //Period
        this.thetad = 0;
        this.thetadd = 0;
        
        let self = this;
        this.clock = setInterval(function () {
            if (self.ON){
                self.time += self.timestep;               
                self.calculate_xy(self.thetaMax, self.radius, self.g, self.time);
            }
            self.move_to_arc();
            self.path.addPoint([self.x, self.y]);
            self.painter.paint(); // draw all objects onto the canvas
        }, this.timestep * 10000);
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
    }

    move_to_arc() {
        this.x = this.pivot.x + Math.sin(this.theta) * this.radius;
        this.y = this.pivot.y + Math.cos(this.theta) * this.radius;
    }

    calculate_xy(thetaMax, radius, g, t){
        //this.theta = thetaMax*Math.cos(2*Math.PI*t/this.T);
        let mu = 0;
        if (this.first){
            mu = 1 + this.mass / this.pair.mass;
            this.thetadd += this.thetaddFirst(t, mu);
        } else {
            mu = 1 + this.pair.mass / this.mass;
            this.thetadd += this.thetaddSecond(t, mu);
        }
        this.thetad += this.thetadd * t;
        this.theta += this.thetad * t;
        this.x = this.pivot.x + radius * Math.sin(this.theta);   //Update x and y
        this.y = this.pivot.y + radius * Math.cos(this.theta);
    }

    getThetad(t) {
        return this.thetad;
        //return (-this.thetaMax*2*Math.PI/this.T)*Math.sin(2*Math.PI*t/this.T);
    }

    thetaddFirst(t, mu){
        return (this.g*(Math.sin(this.pair.theta)*Math.cos(this.theta - this.pair.theta)-
        mu*Math.sin(this.theta))-(this.pair.radius*this.pair.getThetad(t)*this.pair.getThetad(t)+
        this.radius*this.getThetad(t)*this.getThetad(t)*Math.cos(this.theta-this.pair.theta))*Math.sin(this.theta-this.pair.theta))
        / (this.radius * (mu - Math.cos(this.theta - this.pair.theta)*Math.cos(this.theta-this.pair.theta)));
        // return this.g * (2*this.mass + this.pair.mass) * Math.sin(this.theta) - 
        // this.pair.mass * this.g*Math.sin(this.theta - 2*this.pair.theta) -
        //  2*Math.sin(this.theta-this.pair.theta)*this.pair.mass*(Math.pow(this.pair.getThetad(t),2)*this.pair.radius + 
        //  Math.pow(this.getThetad(t), 2)*this.radius*Math.cos(this.theta - this.pair.theta)) / 
        //  (this.radius*(2*this.mass+this.pair.mass - this.pair.mass*Math.cos(2*this.theta - 2*this.pair.theta)));
    }
    thetaddSecond(t, mu){
        return (mu*this.g*(Math.sin(this.pair.theta)*Math.cos(this.pair.theta - this.theta)-
        Math.sin(this.theta))+(mu*this.pair.radius*this.pair.getThetad(t)*this.pair.getThetad(t)+
        this.radius*this.getThetad(t)*this.getThetad(t)*Math.cos(this.pair.theta-this.theta))*Math.sin(this.pair.theta-this.theta)) / 
        (this.radius * (mu - Math.cos(this.pair.theta-this.theta)*Math.cos(this.pair.theta-this.theta)));
        // return 2*Math.sin(this.pair.theta - this.theta)*(Math.pow(this.pair.getThetad(t),2)*this.pair.radius * 
        // (this.mass + this.pair.mass) + this.g * (this.mass + this.pair.mass) * Math.cos(this.pair.theta) + 
        // Math.pow(this.getThetad(t),2)*this.radius*this.mass*Math.cos(this.pair.theta - this.theta)) / 
        // (this.radius*(2*this.pair.mass + this.mass - this.mass*Math.cos(2*this.pair.theta - 2*this.theta)));
    }
}

function calculate_theta(x, y, pivot_x, pivot_y, radius) {
    let theta = Math.asin((x - pivot_x) / radius);
    if (theta == Math.acos((y-pivot_y) / radius)){
        return theta;
    }
    let diff_x = x-pivot_x;
    let diff_y = y-pivot_y;
    theta = Math.atan(diff_x / diff_y);

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


