class Bob {
    constructor(painter, mass, pivot, theta, radius, painterPath) {
        this.painter = painter;
        this.mass = mass;
        this.pivot = pivot;
        this.ON = false;
        this.theta = theta; 
        this.radius = radius;
        this.move_to_arc();
        this.hasPath = false;
        if (painterPath != false) {
            this.hasPath = true;
            this.path = new Path([this.x, this.y]);
            painterPath.addObject(this.path);
            this.painter.addObject(painterPath);
        }
        this.time = 0;
        this.g = 8;
        this.timestep = 10;
        this.theta = calculate_theta(this.x, this.y, this.pivot.x, this.pivot.y);
        this.thetaMax = this.theta;
        this.T = 2 * Math.PI * Math.sqrt(this.radius / this.g); // period
        
        // let self = this;
        // this.clock = setInterval(function() {
        //     if (self.ON){
        //         self.time += self.timestep;               
        //         self.calculate_xy(self.thetaMax, self.radius, self.g, self.time);
        //     }
        //     self.move_to_arc();
        //     self.path.addPoint([self.x, self.y]);
        //     self.painter.paint(); // draw all objects onto the canvas
        // }, this.timestep);
    }

    draw(ctx) {
        if (this.hasPath)
            this.path.addPoint([this.x, this.y]);
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
        // move to correct coordinates from polar coordinates
        this.x = this.pivot.x + Math.sin(this.theta) * this.radius;
        this.y = this.pivot.y + Math.cos(this.theta) * this.radius;
    }

    calculate_xy(thetaMax, radius, g, t){
        // friction
        this.thetaMax *= .999;
        // slow down
        t = t / 75;
        //Calculate new theta based on time differential
        this.theta = thetaMax * Math.cos(2 * Math.PI * t / this.T);
        //Update x and y         
        this.x = this.pivot.x + radius * Math.cos(this.theta);   
        this.y = this.pivot.y + radius * Math.sin(this.theta);
    }
}

var centerx = 350;
var centery = 300;
var rod = 100; //100;
var rod1 = rod;
var rod2 = rod;
var alpha = 2.3;
var m1 = 1;
var g = 0.005;
var radius0 = 20;
var tau = 3.0;
var duration = 500000;
var angle1;
var angle2;
var mu = 1;
var mu3 = Math.pow(mu,1/3);
var radius1 = 2*radius0/(1+mu3);
var radius2 = 2*mu3*radius0/(1+mu3);
var p1 = 0;
var p2 = 0;
var nplus1 = new Array();
var i=0;

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

function Animate (bob1, bob2, painter){
    var enough = setInterval(function () {
        // if (anim) {
            nplus1 = rk4(angle1, angle2, p1, p2);
            angle1=nplus1[0];
            angle2=nplus1[1];
            p1=nplus1[2];
            p2=nplus1[3];
        // }
    // Position of 1st bob
        x1=centerx+rod1*Math.sin(angle1);
        y1=centery+rod1*Math.cos(angle1);
        bob1.x = x1;
        bob1.y = y1;
    // Position of 2nd bob
        x2=centerx+rod1*Math.sin(angle1)+rod2*Math.sin(angle2);
        y2=centery+rod1*Math.cos(angle1)+rod2*Math.cos(angle2);
        bob2.x = x2;
        bob2.y = y2;
    // Final drawing in canvas
        // TrajectoryCircleDraw (x2, y2);
        // Bob2Draw (x2, y2, radius2);
        // Bob1Draw (x1, y1, radius1);
        // CenterDraw (centerx, centery);
        // Rod1Draw (x1, y1);
        // Rod2Draw (x1, y1, x2, y2);
        // context.drawImage(canvas2, 0, 0);
        // context.fillStyle = 'grey';
        // context.font = '11px Verdana';
        // context.fillText ("CopyRight: Math24", 25, canvas.height-10);
        painter.draw();
    }, 3.0);
    }	

function f1 (alpha1, alpha2, p1, p2)  {
    var num11=p1-p2*Math.cos(alpha1-alpha2);
    var den11=m1*rod*rod*(1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2));
    var res1=num11/den11;
    return res1;
}

function f2 (alpha1, alpha2, p1, p2)  {
    var num21=p2*(1+mu)-p1*mu*Math.cos(alpha1-alpha2);
    var den21=m1*rod*rod*(1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2));
    var res2=num21/den21;
    return res2;
}

function f3 (alpha1, alpha2, p1, p2)  {
    var num31=p1*p2*Math.sin(alpha1-alpha2);
    var den31=m1*rod*rod*(1+mu*Math.pow(Math.sin(alpha1-alpha2),2));
     var a1=num31/den31;
    var num32=(p1*p1*mu-2*p1*p2*mu*Math.cos(alpha1-alpha2)+p2*p2*(1+mu))*Math.sin(2*(alpha1-alpha2));
    var den32=2*m1*rod*rod*Math.pow((1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2)),2);
    var a2=num32/den32;
    var res3=-m1*(1+mu)*g*rod*Math.sin(alpha1)-a1+a2;
    return res3;
}

function f4 (alpha1, alpha2, p1, p2)  {
    var num41=p1*p2*Math.sin(alpha1-alpha2);
    var den41=m1*rod*rod*(1+mu*Math.pow(Math.sin(alpha1-alpha2),2));
     var a1=num41/den41;
    var num42=(p1*p1*mu-2*p1*p2*mu*Math.cos(alpha1-alpha2)+p2*p2*(1+mu))*Math.sin(2*(alpha1-alpha2));
    var den42=2*m1*rod*rod*Math.pow((1+mu*Math.sin(alpha1-alpha2)*Math.sin(alpha1-alpha2)),2);
    var a2=num42/den42;
    var res4=-m1*mu*g*rod*Math.sin(alpha2)+a1-a2;
    return res4;
}

function rk4 (alpha1, alpha2, p1, p2)  {
    var y1 = new Array();
    var y2 = new Array();
      var y3 = new Array();
    var y4 = new Array();
    var z = new Array();
    y1[0] = f1 (alpha1, alpha2, p1, p2)*tau;
    y1[1] = f2 (alpha1, alpha2, p1, p2)*tau;
    y1[2] = f3 (alpha1, alpha2, p1, p2)*tau;
    y1[3] = f4 (alpha1, alpha2, p1, p2)*tau;
    y2[0] = f1 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
    y2[1] = f2 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
      y2[2] = f3 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
       y2[3] = f4 (alpha1+1/2*y1[0], alpha2+1/2*y1[1], p1+1/2*y1[2], p2+1/2*y1[3])*tau;
    y3[0] = f1 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
      y3[1] = f2 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
       y3[2] = f3 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
       y3[3] = f4 (alpha1+1/2*y2[0], alpha2+1/2*y2[1], p1+1/2*y2[2], p2+1/2*y2[3])*tau;
       y4[0] = f1 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
    y4[1] = f2 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
    y4[2] = f3 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
      y4[3] = f4 (alpha1+y3[0], alpha2+y3[1], p1+y3[2], p2+y3[3])*tau;
    z[0]=alpha1+1/6*(y1[0]+2*y2[0]+2*y3[0]+y4[0]);
    z[1]=alpha2+1/6*(y1[1]+2*y2[1]+2*y3[1]+y4[1]);
    z[2]=p1+1/6*(y1[2]+2*y2[2]+2*y3[2]+y4[2]);
    z[3]=p2+1/6*(y1[3]+2*y2[3]+2*y3[3]+y4[3]);
    return z;
}