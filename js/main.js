window.onload = function() {
    let cvs = document.querySelector("#mainCanvas");
    var painter = new Painter(cvs);
    var pivot = new Pivot(360, 260);
    var bob;
    // var bob = new Bob(painter, 1, pivot, Math.PI * 1 / 4, 100);

    // painter.addObject(bob);
    painter.addObject(pivot);
    painter.paint();

    window.addEventListener("click", function(e) {
        let theta = calculate_theta(e.clientX, e.clientY, pivot.x, pivot.y);
        bob = new Bob(painter, 1, pivot, theta, calculate_distance(e.clientX, e.clientY, pivot));
        painter.addObject(bob);
        painter.paint();
    });
};

function calculate_distance(x, y, pivot) {
    let xDiff = x - pivot.x;
    let yDiff = y - pivot.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}