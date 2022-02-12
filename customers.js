"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Customers extends doenerTrainer.Moveable {
        constructor(_zielposition, _position) {
            super(_position);
            this.mood = "happy";
            this.preferences = {
                meat: (Math.random() < 0.5),
                lettuce: (Math.random() < 0.5),
                mushrooms: (Math.random() < 0.5),
                onion: (Math.random() < 0.5),
                tomato: (Math.random() < 0.5)
            };
            if (_position)
                this.position = _position;
            else
                this.position = new doenerTrainer.Vector(doenerTrainer.crc2.canvas.width, 380);
            this.velocity = new doenerTrainer.Vector(6, 0);
            this.zielposition = _zielposition;
        }
        draw() {
            let image = document.getElementById("happy");
            if (this.mood === "happy") {
                image = document.getElementById("happy");
            }
            else if (this.mood === "neutral") {
                image = document.getElementById("neutral");
            }
            else if (this.mood === "mad") {
                image = document.getElementById("mad");
            }
            doenerTrainer.crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
        }
    }
    doenerTrainer.Customers = Customers;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=customers.js.map