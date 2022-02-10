namespace doenerTrainer {
  export class canvasBackground {
    public drawBackground(): void {
      // // line right vertical
      // crc2.beginPath();
      // crc2.moveTo(crc2.canvas.width - 300, 0);
      // crc2.lineTo(crc2.canvas.width - 300, crc2.canvas.height);
      // crc2.strokeStyle = "white";
      // crc2.stroke();
      // crc2.closePath();

      // line above horizontal
      crc2.beginPath();
      crc2.moveTo(0, 150);
      crc2.lineTo(crc2.canvas.width, 150);
      crc2.strokeStyle = "white";
      crc2.stroke();
      crc2.closePath();

      // line below horizontal
      crc2.beginPath();
      crc2.moveTo(0, crc2.canvas.height - 150);
      crc2.lineTo(crc2.canvas.width, crc2.canvas.height - 150);
      crc2.strokeStyle = "white";
      crc2.stroke();
      crc2.closePath();

      // counter
      crc2.beginPath();
      crc2.fillStyle = "gray";
      crc2.fillRect(
        crc2.canvas.width / 2 - 380,
        crc2.canvas.height - 190,
        500,
        90
      );
      crc2.closePath();
    }
  }
}
