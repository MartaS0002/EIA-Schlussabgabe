"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class workers extends doenerTrainer.Moveable {
        constructor(_position) {
            super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new doenerTrainer.Vector(doenerTrainer.crc2.canvas.width, 380);
            this.velocity = doenerTrainer.Vector.getRandom(0.5, 0.5);
        }
        draw() {
            doenerTrainer.crc2.beginPath();
            doenerTrainer.crc2.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI);
            doenerTrainer.crc2.fillStyle = "grey";
            doenerTrainer.crc2.fill();
            doenerTrainer.crc2.stroke();
        }
    }
    doenerTrainer.workers = workers;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=workers.js.map