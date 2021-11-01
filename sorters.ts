export interface Swap {
    from: number,
    to: number
}

export function* bubble(arr) {

    for (let o of [...Array(arr.length - 1).keys()]) {
        let swapped = false;
        for (let i of [...Array(arr.length - 1).keys()]) {
            if (arr[i] > arr[i + 1]) {
                arr.swap(i, i + 1);
                swapped = true;
                yield {
                    from: i,
                    to: i + 1
                };                    
            }
        }
        if (!swapped) {
            return null;
        }
    }
    return null;
}

export function* gnome(arr) {
    let i = 1;
    let j = 2;
    while (i < arr.length) {
        if (arr[i - 1] < arr[i]) {
            i = j;
            j = j + 1;
        } else {
            arr.swap(i - 1, i);
            yield {
                from: i - 1,
                to: i
            };
            i = i - 1;
            if (i == 0) {
                i = j;
                j = j + 1;
            }
        }
    }
    return null;
}

export function* selection(arr) {
    for (let idx_i = 0; idx_i < arr.length - 1; idx_i++) {
        let min_idx = idx_i;
        for (let idx_j = idx_i + 1; idx_j < arr.length; idx_j++) {
            if (arr[idx_j] < arr[min_idx]) 
            {
                min_idx = idx_j;
            }             
        }
        if (min_idx != idx_i) 
        {
            arr.swap(idx_i, min_idx);
            yield {
                from: idx_i,
                to: min_idx
            };            
        }
    }
    return null;
}

export function* comb(arr) {
    let factor = 1.2473309;
    let step = arr.length - 1;
    while (step >= 1) {
        for (let i = 0; i + step < arr.length; i++) {
            let step_r = Math.round(step);
            //console.log(step, arr[step_r]);
            if (arr[i] > arr[i + step_r])            {
                
                arr.swap(i, i + step_r);
                yield {
                    from: i,
                    to: i + step_r
                };
            }
        }
        step /= factor;
    }
    return null;
}

export function* shell(arr) {
    for (let s = Math.floor(arr.length / 2); s > 0; s = Math.floor(s / 2)) {
        for (let i = s; i < arr.length; ++i) {
            for (let j = i - s; j >= 0 && arr[j] > arr[j + s]; j -= s) {
                arr.swap(j, j + s);
                yield {
                    from: j,
                    to: j + s
                };
            }
        }
    }
    return null;
}

export function* odd_even(arr) {
    let sorted = false;
    while (!sorted) {
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                arr.swap(i, i + 1);
                sorted = false;
                yield {
                    from: i,
                    to: i + 1
                };
            }
        }
        for (var i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                arr.swap(i, i + 1);
                sorted = false;
                yield {
                    from: i,
                    to: i + 1
                };
            }
        }          
    }
    return null;
}