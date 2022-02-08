"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class canvasBackground {
        drawBackground() {
            // line right vertical
            doenerTrainer.crc2.beginPath();
            doenerTrainer.crc2.moveTo(doenerTrainer.crc2.canvas.width - 300, 0);
            doenerTrainer.crc2.lineTo(doenerTrainer.crc2.canvas.width - 300, doenerTrainer.crc2.canvas.height);
            doenerTrainer.crc2.strokeStyle = "white";
            doenerTrainer.crc2.stroke();
            doenerTrainer.crc2.closePath();
            // line above horizontal
            doenerTrainer.crc2.beginPath();
            doenerTrainer.crc2.moveTo(0, 150);
            doenerTrainer.crc2.lineTo(doenerTrainer.crc2.canvas.width - 300, 150);
            doenerTrainer.crc2.strokeStyle = "white";
            doenerTrainer.crc2.stroke();
            doenerTrainer.crc2.closePath();
            // line below horizontal
            doenerTrainer.crc2.beginPath();
            doenerTrainer.crc2.moveTo(0, doenerTrainer.crc2.canvas.height - 150);
            doenerTrainer.crc2.lineTo(doenerTrainer.crc2.canvas.width - 300, doenerTrainer.crc2.canvas.height - 150);
            doenerTrainer.crc2.strokeStyle = "white";
            doenerTrainer.crc2.stroke();
            doenerTrainer.crc2.closePath();
            // counter
            doenerTrainer.crc2.beginPath();
            doenerTrainer.crc2.fillStyle = "gray";
            doenerTrainer.crc2.fillRect(doenerTrainer.crc2.canvas.width / 2 - 450, doenerTrainer.crc2.canvas.height - 200, 400, 100);
            doenerTrainer.crc2.closePath();
        }
    }
    doenerTrainer.canvasBackground = canvasBackground;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=canvasBackground.js.map