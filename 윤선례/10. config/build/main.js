"use strict";
class Car {
    constructor() {
        this.engine = 0;
    }
    move() {
        const engine = this.engine + 1;
        console.log("not number type engine");
        console.log(engine);
    }
}
const car = new Car();
car.move();
//# sourceMappingURL=main.js.map