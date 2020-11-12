class Bob {
    constructor(painter, mass, pivot, theta) {
        this.painter = painter;
        this.mass = mass;
        this.pivot = pivot;
        this.theta = theta;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.x = 460;
        this.y = 120;
        let self = this; 
        this.radius = radius(this.x, 360, this.y, 260);
        this.clock = setInterval(function () {
            const G = 9.8;
            self.theta = calculate_theta(self.x, self.y, 360, 260);
            let acceleration_vector = G * self.mass * Math.sin(self.theta);
            let acceleration_x = -acceleration_vector * Math.cos(self.theta);
            let acceleration_y = acceleration_vector * Math.sin(self.theta);
            self.velocity_x = acceleration_x;
            self.velocity_y = acceleration_y;
            self.velocity();
            //self.velocity_x = acceleration_x;
            //self.velocity_y = acceleration_y;
            //self.velocity();
            self.x += v_x(this.x, this.y, self.pivot.x, self.pivot.y) / 10;
            self.y += v_y(this.x, this.y, self.pivot.x, self.pivot.y) / 10;
        }, 10);

        
        // this.draw();
    }

    radius(x1, x2, y1, y2) {
        let x = x1 - x2;
        let y = y1 - y2;
        return Math.sqrt((x*2)+(y*2));
    }

    draw(ctx) {
        ctx.fillText(this.theta, 100, 100);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    v_x(){return velocity() * Math.cos(self.calculate_theta(self.x, self.y, 360, 260))}
    v_y(){return velocity() * Math.sin(self.calculate_theta(self.x, self.y, 360, 260))}

    velocity() {return Math.sqrt(self.radius() * self.calculate_tension() / self.mass)}

    calculate_tension() {
        return 9.8 * this.mass * Math.cos(this.theta);
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

function radius(x1, x2, y1, y2) {
        let x = x1 - x2;
        let y = y1 - y2;
        return Math.sqrt((x*2)+(y*2));
    }
function v_x(x, y, x2, y2){return velocity() * Math.cos(calculate_theta(x, y, x2, y2))}
function v_y(x, y, x2, y2){return velocity() * Math.sin(calculate_theta(x, y, x2, y2))}

function velocity() {return Math.sqrt(radius() * calculate_tension())}
function calculate_tension() {
        return 9.8 * this.mass * Math.cos(this.theta);
    }

