import { getPuzzleInput } from '../../lib/util';

getPuzzleInput(1).then((input) => {
  let increases = 0;
  input.split("\n").map((s) => parseInt(s.trim())).forEach((curr, idx, arr) => {
    if (idx > 0 && curr > arr[idx - 1]) increases++;
  })
  console.log(`${increases} increases`)
})
