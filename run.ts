import { visualize } from "./visualize.js";
import * as s from "./sorters.js";
import { Box } from "./box.js";

declare global {
    interface Array<T> {
        swap(l: number, r: number);
    }
    interface HTMLDivElement {
        transform(rect: Box);
    }
    interface HTMLDivElement {
        box(): Box;
    }
    interface HTMLCanvasElement {
        box(): Box;
    }
    interface Array<T> {
        swap(l: number, r: number);
    }
}

HTMLDivElement.prototype.box = function(): Box {
    let r = this.getBoundingClientRect();
    return new Box(r.x, r.y, r.width, r.height);
}

HTMLCanvasElement.prototype.box = function(): Box {
    let r = this.getBoundingClientRect();
    return new Box(r.x, r.y, r.width, r.height);
}

HTMLDivElement.prototype.transform = function(box: Box) {
    this.style.left = box.x;
    this.style.top = box.y;
    this.style.width = box.w;
    this.style.height = box.h;
    //console.log(box);
}

Array.prototype.swap = function(l: number, r: number) {
    let t = this[l];
    this[l] = this[r];
    this[r] = t;
}



let sorters = [
    s.bubble, 
    s.gnome, 
    s.selection, 
    s.comb, 
    s.shell
];

export function run(canvas: HTMLCanvasElement) {
    visualize(
        Array.from({length: 100}, () => Math.floor(Math.random() * 100)), 
        canvas, 
        sorters
    );
}