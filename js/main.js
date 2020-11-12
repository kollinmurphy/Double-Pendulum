window.onload = function() {
    let cvs = document.querySelector("#mainCanvas");
    var painter = new Painter(cvs);
    var pivot = new Pivot(360, 260);
    var bob = new Bob(painter, 1, pivot, -Math.PI * 5 / 6, 100);

    painter.addObject(bob);
    painter.addObject(pivot);
    painter.paint();
};