namespace doenerTrainer {
  export class workers extends Moveable {
    position: Vector;
    constructor(_position: Vector) {
      super(_position);
      if (_position) this.position = _position;
      else this.position = new Vector(crc2.canvas.width, 380);

      this.velocity = Vector.getRandom(0.5, 0.5);
    }

    public draw(): void {

      let image: any = document.getElementById("workerIcon");
      crc2.drawImage(image, this.position.x, this.position.y, 60, 60);
    }
  }
}
