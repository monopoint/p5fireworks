

function Rocket(){

    forceParticle.call(this);

    this.acc = gravity;
    this.vel = createVector(random(2)-1, random(2)-7);
    this.pos = createVector(width / 2, height);

    this.explode = function(){
        background(255, 15 );
        this.isDead = true;
        for (let i = 0 ; i < 200; i++){
            pips.push(new Pip(this.pos));
        }
    }

    this.liveOrDie = function(){
        if (this.vel.y > 0) this.explode();
    }

    this.show = function(){
        if (!this.isDead){
            fill(random(155)+100);
            rect(this.pos.x, this.pos.y, 3, 3);

            if (random(10) <1){
                pips.push(new Tail(this.pos, this.vel));
            }
        }
    }


}

function Tail(parentPos, parentVel){
    Pip.call(this,parentPos.copy());

    this.life = 1;
    this.lifeDrain = 0.8;

    this.vel = parentVel.copy().mult(-0.5);

    this.show = function(){
        if (!this.isDead){
            fill(255);
            rect(this.pos.x, this.pos.y, 1, 1);
        }
    }

}

function Pip(parentPos){
    forceParticle.call(this);

    this.acc = pipGravity;
    this.vel = createVector(random(6)-3, random(6)-3).limit(random(1)+2);
    this.pos = createVector(parentPos.x, parentPos.y);
    this.life = random(15) + 2;
    this.lifeDrain = 0.98;

    this.applyFriction = function(){
        this.vel.mult(0.98);
    }

    this.liveOrDie = function(){
        this.life *= this.lifeDrain;
        if (this.life < 0.1) this.isDead = true;
    }

    this.show = function(){
        if (!this.isDead){
            fill(255, random(255));
            rect(this.pos.x, this.pos.y, 3, 3);
        }
    }
}



function forceParticle() {

    this.isDead = false;

    this.update = function(){
        if (!this.isDead){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.applyFriction();
            this.liveOrDie();
        }
    };

    this.applyFriction = function(){
        return;
    }

    this.show = function(){
        if (!this.isDead){
            fill(random(255));
            rect(this.pos.x, this.pos.y, 2, 2);
        }
    }

    this.liveOrDie = function(){
        return;
    }

    this.applyForce = function(force){
        this.acc.add(force);
    }
}
