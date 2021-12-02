import { readFileSync } from 'fs'

let increases = 0;
readFileSync("./day1/input.txt", 'utf-8').split("\n").map((s) => parseInt(s.trim())).forEach((curr, idx, arr) => {
    if(idx > 0 && curr > arr[idx-1]) increases++;
})

console.log(`${increases} increases`)
