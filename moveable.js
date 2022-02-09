"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    class Moveable {
        constructor(_position) {
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
            if (this.position.y > 430)
                this.velocity.scale(-1);
        }
    }
    doenerTrainer.Moveable = Moveable;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=moveable.js.map