window.onload = function() {
    let cvs = document.querySelector("#mainCanvas");
    var painter = new Painter(cvs);
    var pivot = new Pivot(360, 260);
    var bob;
    var count = 0;
    // var bob = new Bob(painter, 1, pivot, Math.PI * 1 / 4, 100);

    // painter.addObject(bob);
    painter.addObject(pivot);
    painter.paint();

    window.addEventListener("click", function(e) {
        count += 1;
        if (count == 2) {
            count -= 2;
            let theta = calculate_theta(e.clientX, e.clientY, bob.x, bob.y);
            bob2 = new Bob(painter, 1, bob, theta, calculate_distance(e.clientX, e.clientY, bob));
            painter.addObject(bob2);
            painter.paint();
            bob.ON = true;
            bob2.ON = true;
        }
        else {
        let theta = calculate_theta(e.clientX, e.clientY, pivot.x, pivot.y);
        bob = new Bob(painter, 1, pivot, theta, calculate_distance(e.clientX, e.clientY, pivot));
        painter.addObject(bob);
        bob.ON = false;
        }
    });
};

function calculate_distance(x, y, pivot) {
    let xDiff = x - pivot.x;
    let yDiff = y - pivot.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}