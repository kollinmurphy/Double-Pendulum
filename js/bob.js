class Bob {
    constructor(painter, mass, pivot, theta, radius) {
        this.painter = painter;
        this.mass = mass;
        this.pivot = pivot;

        this.theta = theta; // set theta and radius, move to correct x/y coordinates, then recalculate theta to be in correct domain
        this.radius = radius;
        this.move_to_arc();
        this.theta = calculate_theta(this.x, this.y, this.pivot.x, this.pivot.y);

        this.theta_dilation = this.calculate_dilation();
        this.turnaround_sensitivity = this.calculate_turnaround_sensitivity();
        this.cw = false;
        
        let self = this;
        this.clock = setInterval(function () {
            self.theta = calculate_theta(self.x, self.y, self.pivot.x, self.pivot.y);
            self.move_to_arc();
            
            if (Math.abs(self.calculate_velocity()) < self.turnaround_sensitivity) { // detect direction changes
                if (self.x < self.pivot.x && !self.cw) {
                    self.cw = true;
                } else if (self.x > self.pivot.x && self.cw) {
                    self.cw = false;
                }
            }

            let vel_x = self.calculate_velocity_x() / 10; // calculate velocities
            let vel_y = self.calculate_velocity_y() / 10;

            if (self.cw) { // switch direction of velocity if moving clockwise
                vel_x *= -1;
                vel_y *= -1;
            }

            // set new coordinates to calculated coordinates plus pivot points plus velocity
            self.x += vel_x; 
            self.y += vel_y;

            self.painter.paint(); // draw all objects onto the canvas
        }, 10);
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillText(this.theta, 100, 100);
        ctx.strokeStyle = "black";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.pivot.x, this.pivot.y);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    move_to_arc() {
        // move to correct coordinates from polar coordinates
        this.x = this.pivot.x + Math.sin(this.theta) * this.radius;
        this.painter.paint();
        this.y = this.pivot.y + Math.cos(this.theta) * this.radius;
        this.painter.paint();
    }

    calculate_dilation() {
        // calculate factor that will cause bob to rise to correct angle
        return Math.PI / (2 * this.theta);
    }

    calculate_turnaround_sensitivity() {
        return 1.2 / (this.theta - 0.1) + 1;
    }

    calculate_tension() {
        return this.mass * Math.abs(Math.cos(this.theta * this.theta_dilation));
    }

    calculate_velocity_x() {
        return -this.calculate_velocity() * Math.cos(this.theta);
    }

    calculate_velocity_y() {
        return this.calculate_velocity() * Math.sin(this.theta);
    }

    calculate_velocity() {
        // this.theta_dilation -= 0.00001; // air resistance? (not working very well)
        // console.log(this.theta_dilation);
        // return Math.sqrt(this.radius * this.calculate_tension() / this.mass) * 1.4; // speed factor?
        return 8 * Math.sqrt(this.radius * this.calculate_tension() / this.mass);
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
