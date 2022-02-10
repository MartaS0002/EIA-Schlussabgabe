"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Moveable {
        constructor(_position) {
            this.angekommen = false;
            if (_position)
                this.position = _position.copy();
            else
                this.position = new doenerTrainer.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            // offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 50)
                this.velocity.scale(-1);
            if (this.position.y < 170)
                this.velocity.scale(-1);
            if (this.position.x > 650)
                this.velocity.scale(-1);
            if (this.position.y > 400)
                this.velocity.scale(-1);
        }
        moveCustomer(_timeslice) {
            let offset = this.velocity.copy();
            // offset.scale(_timeslice);
            this.position.addCustomer(offset);
            if (this.position.x < 0) {
                this.velocity.scale(-1);
            }
            if (this.position.x > 570) {
                this.velocity = doenerTrainer.Vector.getRandom(0, 0);
                this.angekommen = true;
            }
        }
    }
    doenerTrainer.Moveable = Moveable;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=moveable.js.map