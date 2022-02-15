namespace doenerTrainer {
  export abstract class Moveable {
    public velocity: Vector;
    position: Vector;
    goalPosition: Vector;
    arrived: boolean = false;
    moveBack: boolean = false;
    mood: string;

    constructor(_goalPosition: Vector, _position: Vector) {
      this.position = new Vector(0, 0);
      this.goalPosition = _goalPosition;
    }

    public move(_timeslice: number): void {
      let offset: Vector = this.velocity.copy();
      this.position.add(offset);
      if (this.position.x < 50) this.velocity.scale(-1);
      if (this.position.y < 170) this.velocity.scale(-1);
      if (this.position.x > 650) this.velocity.scale(-1);
      if (this.position.y > 400) this.velocity.scale(-1);
    }

    public moveManager(_timeslice: number): void {
      let offset: Vector = this.velocity.copy();
      this.position.addCustomer(offset);

      if (this.moveBack === false) {
        if (this.position.x > this.goalPosition.x) {
          this.velocity = new Vector(0, 0);
        }
      } else if (this.moveBack === true) {
        if (this.position.x < this.goalPosition.x) {
          this.velocity = new Vector(0, 0);
        }
      }
    }

    public moveCustomer(_timeslice: number): void {
      let offset: Vector = this.velocity.copy();

      this.position.addCustomer(offset);
      if (this.position.x < 0) {
        this.velocity.scale(-1);
      }
      if (this.position.x > this.goalPosition.x) {
        this.velocity = new Vector(0, 0);
        if (this.arrived === false) {
          callOrder();
        }
        this.arrived = true;
      }
    }

    public abstract draw(): void;
  }
}
