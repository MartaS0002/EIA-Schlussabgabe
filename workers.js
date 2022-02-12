"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Workers extends doenerTrainer.Moveable {
        constructor(_position, _zielposition, _moveBack) {
            super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new doenerTrainer.Vector(doenerTrainer.crc2.canvas.width, 380);
            this.velocity = new doenerTrainer.Vector(Math.random() * 1, Math.random() * 1);
            this.zielposition = _zielposition;
            _moveBack = this.moveBack;
        }
        draw() {
            let image = document.getElementById("workerIcon");
            if (this.mood === "happy") {
                image = document.getElementById("workerIcon");
            }
            else if (this.mood === "sad") {
                image = document.getElementById("workerIconSad");
            }
            doenerTrainer.crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
        }
    }
    doenerTrainer.Workers = Workers;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=workers.js.map