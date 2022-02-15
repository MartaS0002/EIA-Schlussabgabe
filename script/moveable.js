"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Moveable {
        constructor(_goalPosition, _position) {
            this.arrived = false;
            this.moveBack = false;
            this.position = new doenerTrainer.Vector(0, 0);
            this.goalPosition = _goalPosition;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
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
            this.position.addCustomer(offset);
            if (this.moveBack === false) {
                if (this.position.x > this.goalPosition.x) {
                    this.velocity = new doenerTrainer.Vector(0, 0);
                }
            }
            else if (this.moveBack === true) {
                if (this.position.x < this.goalPosition.x) {
                    this.velocity = new doenerTrainer.Vector(0, 0);
                }
            }
        }
        moveCustomer(_timeslice) {
            let offset = this.velocity.copy();
            this.position.addCustomer(offset);
            if (this.position.x < 0) {
                this.velocity.scale(-1);
            }
            if (this.position.x > this.goalPosition.x) {
                this.velocity = new doenerTrainer.Vector(0, 0);
                if (this.arrived === false) {
                    doenerTrainer.callOrder();
                }
                this.arrived = true;
            }
        }
    }
    doenerTrainer.Moveable = Moveable;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=moveable.js.map