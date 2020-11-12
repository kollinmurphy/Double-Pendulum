class Bob {
    constructor(ctx, mass, theta, velocity_x, velocity_y) {
        this.ctx = ctx;
        this.mass = mass;
        this.theta = theta;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.x = 260;
        this.y = 120;
        let self = this; 

        this.clock = setInterval(function () {
            const G = 9.8;
            self.theta = calculate_theta(self.x, self.y, 360, 260);
            let acceleration_vector = G * self.mass * Math.sin(self.theta);
            let acceleration_x = -acceleration_vector * Math.cos(self.theta);
            let acceleration_y = acceleration_vector * Math.sin(self.theta);
            self.velocity_x = acceleration_x;
            self.velocity_y = acceleration_y;
            self.velocity();
            self.x += self.velocity_x / 10;
            self.y += self.velocity_y / 10;
            self.draw();
        }, 10);

        
        this.draw();
    }

    velocity() {

    }

    draw() {
        this.ctx.clearRect(0, 0, 720, 720);
        this.ctx.fillText(this.theta, 100,100);

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(360, 260, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    calculate_tension() {
        return 9.8 * this.mass * Math.cos(this.theta);
    }
}

function calculate_theta(x, y, pivot_x, pivot_y) {
    let diff_x = x - pivot_x;
    let diff_y = y - pivot_y;
    let theta = Math.atan(diff_x / diff_y);
    theta += Math.PI;
    if (theta > Math.PI * 2) {
        theta -= Math.PI * 2;
    }
    return theta;
}