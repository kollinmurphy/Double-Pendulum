class Painter {
    constructor(cvs, pivot, bob) {
        this.cvs = cvs;
        this.ctx = cvs.getContext("2d");
        this.objects = [];
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    paint() {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(this.ctx);
        }
    }
}