window.onload = function() {
    var bob = new Bob(document.querySelector("#mainCanvas").getContext("2d"), 1, Math.PI / 3, 0, 0);

    window.addEventListener("mousemove", function(e) {
        console.log(calculate_theta(e.clientX, e.clientY, 360, 260));
    });
};