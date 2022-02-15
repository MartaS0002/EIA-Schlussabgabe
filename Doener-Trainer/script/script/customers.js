"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Customers extends doenerTrainer.Moveable {
        constructor(_goalPosition, _position) {
            super(_position, _goalPosition);
            this.mood = "happy";
            this.preferences = {
                meat: Math.random() < 0.5,
                lettuce: Math.random() < 0.5,
                mushrooms: Math.random() < 0.5,
                onion: Math.random() < 0.5,
                tomato: Math.random() < 0.5,
            };
            this.position = _position;
            this.velocity = new doenerTrainer.Vector(6, 0);
            this.goalPosition = _goalPosition;
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