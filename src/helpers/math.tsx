function random(randSeed: number): number {
    let x = Math.sin(randSeed) * 10000;
    return x - Math.floor(x);
}

export function randIntBetween(seed: number, min: number, max: number) {
    return Math.floor(random(seed) * (max - min + 1) + min);
}

export function mod(a: number, n: number) {
    return ((a % n) + n) % n;
}

export function deepCopy(obj:Object)  {return JSON.parse(JSON.stringify(obj))};