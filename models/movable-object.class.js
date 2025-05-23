class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collisonRight = false;



    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }




    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 180;
        }
    }



    playAnmimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    moveRight() {
        this.x += this.speed;
        this.playAnmimation(this.IMAGES_WALKING);


    }

    moveLeft() {
        this.x -= this.speed;
        this.playAnmimation(this.IMAGES_WALKING);
    }



    getCollisionSide(enemy) {
        let r1 = this;
        let r2 = enemy;
        const dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
        const dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
        const overlapX = (r1.width + r2.width) / 2 - Math.abs(dx);
        const overlapY = (r1.height + r2.height) / 2 - Math.abs(dy);
        // Nur wenn überhaupt Kollision
        const r1Bottom = r1.y + r1.height;
        const r2Top = r2.y;


        if (overlapX > 0 && overlapY > 0) {

            if (overlapX < overlapY) {
                // horizontale Kollision
                if (dx > 0) {
                    console.log("Kollision: links");
                    this.collisionLeft();

                } else {
                    console.log("Kollision: rechts! ");

                    return true;

                }
            } else {



                // vertikale Kollision → jetzt prüfen wir die genaue Richtung


                if (r1Bottom <= r2Top + 10) {
                    // r1 trifft mit Unterkante auf Oberkante von r2
                    console.log("Kollision: unten");
                } else {

                    console.log("Kollision: oben ");
                    console.log("enemmy ", enemy.y, enemy.height)
                    console.log("charater ", this.y, this.height);

                    //if (this.height - this.character.y < 70) {
                    this.collisionTop(enemy);
                    //}



                }

            }
        }
    }



    collisionLeft() {
        console.log("Collison LEFT");
    }


    collisionTop(enemy) {
        console.log("Das oBjekt wurde getroffen ", enemy);
        enemy.dead = true;
        enemy.deadCollision();
    }



    hit() {
        const now = Date.now();

        // Wenn letzter Hit vorhanden und noch nicht 2 Sekunden vergangen sind → Sperre
        if (now - this.lastHit < 1000) {
            return;
        }
        // Nun ausführen und Timestamp updaten
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
            console.log("Keine Energie mehr übrig!");
        }
        this.lastHit = now;
    }



    //Charater ist verletzt
    isHurt() {

        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 500;
        return timepassed < 1;
    }



    //Charatuer ist tot
    isDead() {
        return this.energy == 0;
    }



    dead() {
        console.log("Zeichne Bild");

        // thid.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    }



    createBootle() {
        console.log("F gedrüxckt");
        let newbottle = new BootleCollectible(this.character.x + 200);
        this.bootlecollectible.push(newbottle);
    }



}