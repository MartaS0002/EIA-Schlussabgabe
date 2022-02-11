namespace doenerTrainer {
  export interface Preferences {
    meat: boolean;
    lettuce: boolean;
    mushrooms: boolean;
    onion: boolean;
    tomato: boolean;
  }

  export class Customers extends Moveable {
    position: Vector;
    mood: string = "happy";
    preferences: Preferences = {
      meat: Math.random() < 0.5,
      lettuce: Math.random() < 0.5,
      mushrooms: Math.random() < 0.5,
      onion: Math.random() < 0.5,
      tomato: Math.random() < 0.5,
    };

    constructor(_zielposition: Vector, _position: Vector) {
      super(_position);
      if (_position) this.position = _position;
      else this.position = new Vector(crc2.canvas.width, 380);

      this.velocity = new Vector(6, 0);
      this.zielposition = _zielposition;
    }
    public draw(): void {
      let image: any = document.getElementById("happy");
      if (this.mood === "happy") {
        image = document.getElementById("happy");
      } else if (this.mood === "neutral") {
        image = document.getElementById("neutral");
      } else if (this.mood === "mad") {
        image = document.getElementById("mad");
      }

      crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
    }
  }
}
