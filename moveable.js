"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Moveable {
        constructor(_zielposition, _position) {
            this.angekommen = false;
            this.moveBack = false;
            this.mood = "happy";
            if (_position)
                this.position = _position.copy();
            else
                this.position = new doenerTrainer.Vector(0, 0);
            this.zielposition = _zielposition;
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
        moveManager(_timeslice) {
            let offset = this.velocity.copy();
            // offset.scale(_timeslice);
            this.position.addCustomer(offset);
            // if (this.position.x < 0) {
            //   this.velocity.scale(-1);
            // }
            if (this.moveBack === false) {
                if (this.position.x > this.zielposition.x) {
                    this.velocity = new doenerTrainer.Vector(0, 0);
                }
            }
            else if (this.moveBack === true) {
                if (this.position.x < this.zielposition.x) {
                    this.velocity = new doenerTrainer.Vector(0, 0);
                }
            }
        }
        moveCustomer(_timeslice) {
            let offset = this.velocity.copy();
            // offset.scale(_timeslice);
            this.position.addCustomer(offset);
            if (this.position.x < 0) {
                this.velocity.scale(-1);
            }
            if (this.position.x > this.zielposition.x) {
                this.velocity = new doenerTrainer.Vector(0, 0);
                if (this.angekommen === false) {
                    doenerTrainer.callOrder();
                }
                this.angekommen = true;
            }
        }
    }
    doenerTrainer.Moveable = Moveable;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=moveable.js.map