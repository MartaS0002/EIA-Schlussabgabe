namespace doenerTrainer {
  export class Workers extends Moveable {
    position: Vector;
    mood: string = "happy";

    constructor(_position: Vector, _goalPosition: Vector, _moveBack: boolean) {
      super(_position, _goalPosition);
      this.position = _position;

      this.velocity = new Vector(
        Math.random() * 1 + 0.2,
        Math.random() * 1 + 0.2
      );
      this.goalPosition = _goalPosition;
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
