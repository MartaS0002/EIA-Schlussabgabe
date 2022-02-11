"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Workers extends doenerTrainer.Moveable {
        constructor(_position, _zielposition) {
            super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new doenerTrainer.Vector(doenerTrainer.crc2.canvas.width, 380);
            this.velocity = new doenerTrainer.Vector(Math.random() * 1, Math.random() * 1);
            this.zielposition = _zielposition;
        }
        draw() {
            let image = document.getElementById("workerIcon");
            doenerTrainer.crc2.drawImage(image, this.position.x, this.position.y, 60, 60);
        }
    }
    doenerTrainer.Workers = Workers;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=workers.js.map