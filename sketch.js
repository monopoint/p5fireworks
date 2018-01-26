let rockets = [];
let pips = [];
let gravity;
let pipGravity;

function setup() {
    createCanvas(window.innerWidth-10, window.innerHeight-10);
    gravity = createVector(0, 0.03)
    pipGravity = gravity.copy().mult(0.3);
    createRockets();

    strokeWeight(0);
}

function draw() {
    background(0, 30);

    deadRockets = 0;
    rockets.forEach(rocket => {
        rocket.update();
        rocket.show();
        if (rocket.isDead) deadRockets++;
    })

    deadPips = 0;
    pips.forEach(pip => {
        pip.update();
        pip.show();
        if (pip.isDead) deadPips++;
    });

    if (deadPips == pips.length  && pips.length > 0
    && deadRockets == rockets.length){
        pips = [];
        window.setTimeout(createRockets,2000);
    }
}

function createRockets(){
    background(0);
    rockets = [];
    let numRockets = random(8)+2;
    for (let i = 0 ; i < numRockets; i++){
        rockets.push(new Rocket())
    }
    //return rockets;
}
