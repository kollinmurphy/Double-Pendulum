window.onload = function() {
    let cvs = document.querySelector("#mainCanvas");
    var painter = new Painter(cvs);
    var pivot = new Pivot(360, 260);
    var bob = new Bob(painter, 1, pivot, Math.PI / 3, 100);

    painter.addObject(pivot);
    painter.addObject(bob);
};