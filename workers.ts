namespace doenerTrainer {
  export class Workers extends Moveable {
    position: Vector;
    constructor(_position: Vector, _zielposition: Vector) {
      super(_position);
      if (_position) this.position = _position;
      else this.position = new Vector(crc2.canvas.width, 380);

      this.velocity = new Vector(Math.random() * 1, Math.random() * 1);
      this.zielposition = _zielposition;
    }

    public draw(): void {
      let image: any = document.getElementById("workerIcon");
      crc2.drawImage(image, this.position.x, this.position.y, 60, 60);
    }
  }
}
