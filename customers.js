"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class customers extends doenerTrainer.Moveable {
        constructor(_position) {
            super(_position);
            this.mood = "happy";
            if (_position)
                this.position = _position;
            else
                this.position = new doenerTrainer.Vector(doenerTrainer.crc2.canvas.width, 380);
            this.velocity = new doenerTrainer.Vector(6, 0);
        }
        draw() {
            let image = document.getElementById("happy");
            if (this.mood === "happy") {
                image = document.getElementById("happy");
                // } else if (this.mood === "neutral") {
                //     image = document.getElementById("neutral");
                // } else if (this.mood === "mad") {
                //     image = document.getElementById("mad");
            }
            doenerTrainer.crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
        }
    }
    doenerTrainer.customers = customers;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=customers.js.map