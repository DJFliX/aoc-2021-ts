
import { getPuzzleInput } from '../../lib/util';
import { Grid } from './types';


getPuzzleInput(11).then((input) => {
  const lines = input.split("\n").filter(line => line.length > 2).map(line => line.trim().split("").map(Number))
  const grid = new Grid(lines);

  for(let i = 0; i < 1000; i++) {
    let flashes = grid.takeStep();
    if(flashes === grid.grid.length * grid.grid[0].length) {
      console.log(`step ${i + 1}`)
      break;
    }
  }
})
