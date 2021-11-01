import { Swap } from "./sorters.js";
import { Box } from "./box.js";

export enum Action {
    Show,
    Hide
}

export class Render {
    ctx = null;
    arr = null;
    div = null;
    sorter = null;
    prev = null;
    
    constructor(ctx: CanvasRenderingContext2D, arr: number[], div: HTMLDivElement, sorter: (a: number[]) => Generator<Swap, Swap, Swap>) {
        this.ctx = ctx;
        this.arr = arr.slice();
        this.div = div;
        this.sorter = sorter(arr.slice());
    }

    step() {
        let cur = this.div.box();
        if (!cur.eq(this.prev)) {
            this.render_chart(cur);
            this.prev = cur;
            return;
        }
        let mv = this.sorter.next();
        if (!mv.done) {
            this.render_elem(mv.value.from, cur, Action.Hide);
            this.render_elem(mv.value.to, cur,  Action.Hide);
            this.arr.swap(mv.value.from, mv.value.to);
            this.render_elem(mv.value.from, cur, Action.Show);
            this.render_elem(mv.value.to, cur, Action.Show);
        }
    }

    private render_chart(box: Box) {
        for (let k of this.arr.keys()) {
            this.render_elem(k, box, Action.Show);
        }         
    }

    private render_elem(k: number, box: Box, action: Action) {
        this.ctx.fillStyle = action == Action.Show ? "black": "white";
        
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 1;

        let pbox = box.padded(15);
    
        let w = pbox.w / this.arr.length; 
        let h = (this.arr[k] / this.arr.length) * pbox.h;

        this.ctx.fillRect(pbox.x + k*w, pbox.y + (pbox.h - h) , w, h);
        this.ctx.strokeRect(pbox.x + k*w, pbox.y + (pbox.h - h), w, h);
    }
}