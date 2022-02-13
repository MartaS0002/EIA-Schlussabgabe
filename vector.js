"use strict";
var doenerTrainer;
(function (doenerTrainer) {
  class Vector {
    constructor(_x, _y) {
      this.x = _x;
      this.y = _y;
    }
    scale(_factor) {
      this.x *= _factor;
      this.y *= _factor;
    }
    add(_addend) {
      this.x += _addend.x;
      this.y += _addend.y;
    }
    addCustomer(_addend) {
      this.x += _addend.x;
    }
    copy() {
      return new Vector(this.x, this.y);
    }
  }
  doenerTrainer.Vector = Vector;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=vector.js.map
