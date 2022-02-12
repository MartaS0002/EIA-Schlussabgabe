namespace doenerTrainer {
  export abstract class Moveable {
    angekommen: boolean = false;
    position: Vector;
    public velocity: Vector;
    zielposition: Vector;

    constructor(_zielposition: Vector, _position?: Vector) {
      if (_position) this.position = _position.copy();
      else this.position = new Vector(0, 0);
      this.zielposition = _zielposition;
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
    public moveManager(_timeslice: number): void {
      
      let offset: Vector = this.velocity.copy();
      // offset.scale(_timeslice);
      this.position.addCustomer(offset);
      if (this.position.x < 0) {
        this.velocity.scale(-1);
      }
      if (this.position.x > this.zielposition.x) {

        this.velocity = new Vector(0, 0);
      }
    
  }

    public moveCustomer(_timeslice: number): void {

      let offset: Vector = this.velocity.copy();
      // offset.scale(_timeslice);
      this.position.addCustomer(offset);
      if (this.position.x < 0) {
        this.velocity.scale(-1);
      }
      if (this.position.x > this.zielposition.x) {

        this.velocity = new Vector(0, 0);
        if (this.angekommen === false) {
          callOrder();
        }
        this.angekommen = true;
      }
    }

    public abstract draw(): void;
  }
}
