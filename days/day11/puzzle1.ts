
import { getPuzzleInput } from '../../lib/util';
import { Grid } from './types';


getPuzzleInput(11).then((input) => {
  const lines = input.split("\n").filter(line => line.length > 2).map(line => line.trim().split("").map(Number))
  const grid = new Grid(lines);
  let flashes = 0;

  for(let i = 0; i < 100; i++) {
    flashes += grid.takeStep();
  }

  console.log(flashes)
})
