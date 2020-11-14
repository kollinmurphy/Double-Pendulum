window.onload = function() {
    let cvs = document.querySelector("#mainCanvas");
    var painter = new Painter(cvs);
    var painterPath = new Painter(document.querySelector("#mainCanvas2"), false);
    var pivot = new Pivot(360, 260);
    var bob;
    var count = 0;
    // var bob = new Bob(painter, 1, pivot, Math.PI * 1 / 4, 100);
    // bob.ON = true;

    // painter.addObject(bob);
    painter.addObject(pivot);
    painter.draw();

    window.addEventListener("click", function(e) {
        count += 1;
        if (count == 2) {
            count -= 2;
            let theta = calculate_theta(e.clientX, e.clientY, bob.x, bob.y);
            bob2 = new Bob(painter, 1, bob, theta, calculate_distance(e.clientX, e.clientY, bob), painterPath);
            painter.addObject(bob2);
            painter.draw();
            // bob.ON = true;
            // bob2.ON = true;
            angle2 = theta;
            Animate(bob, bob2, painter);
        }
        else {
            let theta = calculate_theta(e.clientX, e.clientY, pivot.x, pivot.y);
            angle1 = theta;
            bob = new Bob(painter, 1, pivot, theta, calculate_distance(e.clientX, e.clientY, pivot), false);
            painter.addObject(bob);
            // bob.ON = false;
            bob.first = true;
        }
    });
};

function calculate_distance(x, y, pivot) {
    let xDiff = x - pivot.x;
    let yDiff = y - pivot.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}