class Path {
    constructor(point) {
        this.points = [point];
    }

    addPoint(point) {
        this.points.push(point);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        for (let i = 1; i < this.points.length; i++) {
            // ctx.lineTo(this.points[i][1] + 100, this.points[i][0] - 100);
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
    }
}