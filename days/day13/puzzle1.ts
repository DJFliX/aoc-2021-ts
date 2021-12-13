
import { getPuzzleInput } from '../../lib/util';
import { OrigamiSolver } from './types';

getPuzzleInput(13).then((input) => {
  const solver = new OrigamiSolver(input)
  const result = solver.solve(1);
  console.log(result.flat().filter(char => char === '#').length)
})
