"use strict";
var doenerTrainer;
(function (doenerTrainer) {
  class CanvasBackground {
    drawBackground() {
      // line above horizontal
      doenerTrainer.crc2.beginPath();
      doenerTrainer.crc2.moveTo(0, 150);
      doenerTrainer.crc2.lineTo(doenerTrainer.crc2.canvas.width, 150);
      doenerTrainer.crc2.strokeStyle = "white";
      doenerTrainer.crc2.stroke();
      doenerTrainer.crc2.closePath();
      // line below horizontal
      doenerTrainer.crc2.beginPath();
      doenerTrainer.crc2.moveTo(0, doenerTrainer.crc2.canvas.height - 150);
      doenerTrainer.crc2.lineTo(
        doenerTrainer.crc2.canvas.width,
        doenerTrainer.crc2.canvas.height - 150
      );
      doenerTrainer.crc2.strokeStyle = "white";
      doenerTrainer.crc2.stroke();
      doenerTrainer.crc2.closePath();
    }
    displayJars() {
      let imageJarMeat = document.getElementById("jarMeat");
      doenerTrainer.crc2.drawImage(imageJarMeat, 150, 30, 60, 90);
      let imageJarLettuce = document.getElementById("jarLettuce");
      doenerTrainer.crc2.drawImage(imageJarLettuce, 250, 30, 60, 90);
      let imageJarMushrooms = document.getElementById("jarMushrooms");
      doenerTrainer.crc2.drawImage(imageJarMushrooms, 350, 30, 60, 90);
      let imageJarOnions = document.getElementById("jarOnions");
      doenerTrainer.crc2.drawImage(imageJarOnions, 450, 30, 60, 90);
      let imageJarTomatos = document.getElementById("jarTomatos");
      doenerTrainer.crc2.drawImage(imageJarTomatos, 550, 30, 60, 90);
    }
  }
  doenerTrainer.CanvasBackground = CanvasBackground;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=canvasBackground.js.map
