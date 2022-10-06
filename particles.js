//REQUIRES JQUERY TO BE USED

//"n" for node debugging, "h" for html
var n_h = "h"

if (n_h === "h") {
    var device = {
        height: $(window).height(),
        width: $(window).width(),
    }
    $(document).ready(init)
} else if (n_h === "n") {
    init()
}

function init() {
    var interval = setInterval(update, 1000 / 60)

    function wait(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function getRandom(min, max) {
        var random = Math.round(Math.random() * (max - min) + min)
        if (random) {
            return (random);
        } else {
            return (getRandom(min, max))
        }
    }
    particles = []
    var shapes = {
        "triangle": function (particle) {
            return (" width: 0; height: 0; border-left: " + (particle.size.w / 2) + "rem solid transparent; border-right: " + (particle.size.w / 2) + "rem solid transparent; border-bottom: " + particle.size.w + "rem solid rgb(" + particle.color.r + ', ' + particle.color.g + ', ' + particle.color.b + ");")
        },
        "circle": function (particle) {
            return (" height: " + particle.size.h + "rem; width: " + particle.size.h + "rem; background-color: rgb(" + particle.color.r + ', ' + particle.color.g + ', ' + particle.color.b + "); border-radius: 50%;")
        },
        "square": function (particle) {
            return (" height: " + particle.size.h + "rem; width: " + particle.size.h + "rem; background-color: rgb(" + particle.color.r + ', ' + particle.color.g + ', ' + particle.color.b + ");")
        },
    }
    rotations = {
        "right": function () {
            return (" transform: rotate(-45deg); -webkit-transform: rotate(-45deg);")
        },
        "left": function () {
            return (" transform: rotate(135deg); -webkit-transform: rotate(135deg);")
        },
        "up": function () {
            return ("transform: rotate(-135deg); -webkit-transform: rotate(-135deg);")
        },
        "down": function () {
            return ("transform: rotate(45deg); -webkit-transform: rotate(45deg);")
        },
    }

    /*colors must be stored in object format as follows
    color = {
        r: 0-255,
        g: 0-255,
        b: 0-255,
    }
    */
    function new_particle(id, shape, size, color, position, lifespan, rotation) {
        //generate a new template for a particle to be added to a list and later rendered
        var info = {
            id: id,
            classes: "",
            shape: shape,
            size: {
                w: size.w,
                h: size.w,
            },
            color: {
                r: color.r,
                g: color.g,
                b: color.b,
            },
            position: {
                x: position.x,
                y: position.y,
            },
            rotation: rotation,
            html: "",
            amount: amount,
            lifespan: lifespan,
        };
        info.html = generate_html(info)
        particles.push(info)
        //console.log(info)
        return (info)
    }

    function generate_html(particle) {
        //generate the html to be rendered
        var html = ('<div id="' + particle.id + '" class="shape ' + particle.classes + '" style="left: ' + particle.position.x + 'px; top: ' + (particle.position.y) + "px;" + shapes[particle.shape](particle) + rotations[particle.rotation](particle) + '")></div>')
        console.log(html)
        return (html)
    }

    function spawn_test(particles) {
        for (var i = 0; i <= particles.length - 1; i++) {
            spawn_particle(particles[i])
        }
    }

    function spawn_particle(particle) {
        $("body").append(particle.html)
    }

    function rgb_bg() {
        var r, g, b = 0;
        r = (getRandom(0, 255));
        g = (getRandom(0, 255));
        b = (getRandom(0, 255));
        $("body").css('background-color', 'rgb(' + r + ', ' + g + ', ' + b + ')')
    }

    function update_screen(particles) {
        //console.log(particles.length + " particle pattern(s) exist")
        for (var i = 1; i <= (particles.length); i++) {
            var particle = particles[i - 1]
            //console.log(particle)
            for (var p = 0; p <= (particle.amount + 1); p++) {
                console.log("test")
                //console.log("ind")
                console.log(particle)
                if (n_h === "h") {
                    var id = '#' + particle.id + "_" + i
                    console.log("test")
                    let x = (particle.position.x) + "px"
                    let y = (particle.position.y * -1) + "px"
                    //let x = (getRandom(0, device.width))
                    //let y = (getRandom(0, device.height))
                    $(id).css({
                        "left": ((x) + "px"),
                        "bottom": ((y) + "px")
                    })
                    //$(id).attr('left', x)
                    //$(id).attr('top', y)
                }
            }
        }
    }

    function move_particle(particle, x, y) {
        particles[particle.id].x = x;
        particles[particle.id].y = y;
    }

    function update() {
        //console.log("update")
        update_screen(particles)
        rgb_bg()
    }

    //a test particle, simply a red triangle facing upwards
    new_particle("red_triangle", "triangle", {
        w: 10,
        h: 10,
    }, {
        r: 255,
        g: 0,
        b: 0,
    }, {
        x: 1000,
        y: 150,
    }, 1, "up");
    new_particle("blue_circle", "circle", {
        w: 10,
        h: 10,
    }, {
        r: 0,
        g: 0,
        b: 255,
    }, {
        x: 250,
        y: 300,
    }, 1, "right");
    new_particle("green_square", "square", {
        w: 10,
        h: 10,
    }, {
        r: 0,
        g: 255,
        b: 0,
    }, {
        x: 50,
        y: 75,
    }, 1, "left");
    spawn_test(particles)
    //console.log(particles[0])
};