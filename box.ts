export class Box {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x:number, y:number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    eq(other: Box): boolean {
        if (other == null) {
            return false;
        }        
        return this.x == other.x && this.y == other.y && this.w == other.w && this.h == other.h;
    }

    padded(p: number): Box {
        return new Box(this.x + p, this.y + p, this.w - p*2, this.h - p*2);
    }
}