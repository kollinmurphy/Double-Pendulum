class Painter {
    constructor(cvs, clear=true) {
        this.cvs = cvs;
        this.ctx = cvs.getContext("2d");
        this.objects = [];
        this.clear = clear;
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    draw() {
        if (this.clear)
            this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(this.ctx);
        }
        // this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

    }
}