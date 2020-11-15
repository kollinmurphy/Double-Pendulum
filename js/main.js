window.onload = function() {
    let cvs = document.querySelector("#mainCanvas");
    var painter = new Painter(cvs);
    var pivot = new Pivot(360, 260);
    var bob;
    var count = 0;
    // var bob = new Bob(painter, 1, pivot, Math.PI * 1 / 4, 100);
    // bob.ON = true;

    // painter.addObject(bob);
    painter.addObject(pivot);
    painter.paint();

    window.addEventListener("click", function(e) {
        count += 1;
        if (count == 2) {
            count -= 2;
            let theta = calculate_theta(e.clientX, e.clientY, bob.x, bob.y, calculate_distance(e.clientX, e.clientY, bob));
            bob2 = new Bob(painter, 1, bob, theta, calculate_distance(e.clientX, e.clientY, bob), bob);
            painter.addObject(bob2);
            painter.paint();
            bob.pair = bob2;
            bob.ON = true;
            bob2.ON = true;
            bob2.second = true;
            bob2.first = false;
            bob.first = true;
        }
        else {
            let theta = calculate_theta(e.clientX, e.clientY, pivot.x, pivot.y, calculate_distance(e.clientX, e.clientY, pivot));
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

function calculate_theta(x, y, pivot_x, pivot_y, radius) {
    let theta = Math.asin((x - pivot_x) / radius);
    if (theta == Math.acos((y-pivot_y) / radius)){
        return theta;
    }
    let diff_x = x-pivot_x;
    let diff_y = y-pivot_y;
    theta = Math.atan(diff_x / diff_y);

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