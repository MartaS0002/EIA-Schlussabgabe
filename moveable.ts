namespace doenerTrainer {
  export abstract class Moveable {
    angekommen: boolean = false;
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
      if (this.position.y > 400) this.velocity.scale(-1);
    }

    public moveCustomer(_timeslice: number): void {

      let offset: Vector = this.velocity.copy();
      // offset.scale(_timeslice);
      this.position.addCustomer(offset);
      if (this.position.x < 0) {
        this.velocity.scale(-1);
      }
      if (this.position.x > 600) {

        this.velocity = Vector.getRandom(0, 0);
        if (this.angekommen === false) {
          callOrder();
        } else {

        }
        this.angekommen = true;
      }
    }

    public abstract draw(): void;
  }
}
