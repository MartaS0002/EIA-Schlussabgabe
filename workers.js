"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Workers extends doenerTrainer.Moveable {
        constructor(_position, _goalPosition, _moveBack) {
            super(_position, _goalPosition);
            this.mood = "happy";
            this.position = _position;
            this.velocity = new doenerTrainer.Vector(Math.random() * 1 + 0.2, Math.random() * 1 + 0.2);
            this.goalPosition = _goalPosition;
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