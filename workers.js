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
            let image = document.getElementById("workerIcon");
            doenerTrainer.crc2.drawImage(image, this.position.x, this.position.y, 60, 60);
        }
    }
    doenerTrainer.workers = workers;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=workers.js.map