export class Position {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // tail-dir, body-1/2, corner-dir, head-dir, food, wall?
    }
}