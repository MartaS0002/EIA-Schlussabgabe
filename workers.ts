namespace doenerTrainer {
  export class Workers extends Moveable {
    position: Vector;

    constructor(_position: Vector, _zielposition: Vector, _moveBack: boolean) {
      super(_position);
      if (_position) this.position = _position;
      else this.position = new Vector(crc2.canvas.width, 380);
      this.velocity = new Vector(
        Math.random() * 1 + 0.2,
        Math.random() * 1 + 0.2
      );
      this.zielposition = _zielposition;
      _moveBack = this.moveBack;
    }

    public draw(): void {
      let image: any = document.getElementById("workerIcon");
      if (this.mood === "happy") {
        image = document.getElementById("workerIcon");
      } else if (this.mood === "sad") {
        image = document.getElementById("workerIconSad");
      }
      crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
    }
  }
}
