import { Render } from "./render.js";
import { Swap } from "./sorters.js"

function build_grid(canvas: HTMLCanvasElement): HTMLDivElement {
    let outer = document.createElement("div");

    outer.setAttribute("style" , "display: grid; \
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); \
        position: absolute;");

    document.body.appendChild(outer);
    return outer;
}


export function visualize(arr: number[], canvas: HTMLCanvasElement, sorters: Array<(a: number[]) => Generator<Swap, Swap, Swap>>) {    
    let ctx = canvas.getContext("2d");

    let grid = build_grid(canvas);

    let renders: Array<Render> = [];
    sorters.forEach(s => {
        let d = document.createElement("div");
        grid.appendChild(d);
        renders.push(new Render(ctx, arr, d, s));
    });

    setInterval(() => {        
        let c_box = canvas.box();
        if (!grid.box().eq(c_box)) {
            grid.transform(c_box);            
            return;
        }
        renders.forEach(r => r.step());

    }, 20);

}


