class Bob {
    constructor(painter, mass, pivot, theta, radius) {
        this.painter = painter;
        this.mass = mass;
        this.pivot = pivot;
        this.theta = theta;
        this.radius = radius;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.cw = false;

        let coords = calculate_xy(theta, radius);
        this.x = this.pivot.x + coords[0];
        this.y = this.pivot.y + coords[1];
        let self = this;

        this.clock = setInterval(function () {
            self.theta = calculate_theta(self.x, self.y, self.pivot.x, self.pivot.y);
            let coords = calculate_xy(self.theta, self.radius);
            self.x = self.pivot.x + coords[0] - self.calculate_velocity_x() / 10;
            if (Math.abs(self.calculate_velocity_x()) < 0.01) {
                if (self.x < self.pivot.x) {
                    self.cw = true;
                } else {
                    self.cw = false;
                }
            }
            if (self.cw) {
                self.y = self.pivot.y + coords[1] + self.calculate_velocity_y() / 10;
            } else {
                self.y = self.pivot.y + coords[1] - self.calculate_velocity_y() / 10;
            }
            self.painter.paint();
        }, 10);
    }

    draw(ctx) {
        ctx.strokeStyle = "black";
        // ctx.moveTo(this.x, (this.y > this.pivot.y) ? this.y : this.pivot.y * 2 - this.y);
        // ctx.lineTo(this.pivot.x, this.pivot.y);
        // ctx.stroke();
        ctx.fillStyle = "red";
        ctx.beginPath();
        // ctx.arc(this.x, (this.y > this.pivot.y) ? this.y : this.pivot.y * 2 - this.y, 15, 0, Math.PI * 2);
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    calculate_tension() {
        return 9.8 * this.mass * Math.abs(Math.cos(this.theta));
    }

    calculate_velocity_x() {
        return this.calculate_velocity() * Math.cos(this.theta);
    }

    calculate_velocity_y() {
        return this.calculate_velocity() * Math.sin(this.theta);
    }

    calculate_velocity() {
        return Math.sqrt(this.radius * this.calculate_tension() / this.mass);
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
    if (diff_x === 0 && diff_y > 0) { theta = Math.PI; }
    if (diff_x === 0 && diff_y < 0) { theta = 0; }

    if (theta < 0) { theta += Math.PI * 2; }
    if (theta > Math.PI * 2) { theta -= Math.PI * 2; }
    return theta;
}

function calculate_xy(theta, radius) {
    let x = Math.sin(theta) * radius;
    let y = Math.cos(theta) * radius;
    return [x, y];
}