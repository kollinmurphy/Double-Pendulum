class Pivot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(360, 260, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}