namespace doenerTrainer {
  export abstract class Moveable {
    position: Vector;
    public velocity: Vector;

    constructor(_position?: Vector) {
      if (_position) this.position = _position.copy();
      else this.position = new Vector(0, 0);
    }

    public move(_timeslice: number): void {

      let offset: Vector = this.velocity.copy();
      // offset.scale(_timeslice);
      this.position.add(offset);

      if (this.position.x < 50) this.velocity.scale(-1);
      if (this.position.y < 170) this.velocity.scale(-1);
      if (this.position.x > 650) this.velocity.scale(-1);
      if (this.position.y > 430) this.velocity.scale(-1);
    }

    public abstract draw(): void;
  }
}
