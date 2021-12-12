
import { getPuzzleInput } from '../../lib/util';
import { CaveSystem } from './types';

getPuzzleInput(12).then((input) => {
  const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 2)
  const caveSystem = new CaveSystem(lines)
  const routes = caveSystem.resolveRoutes(undefined, true);
  console.log(routes.length)
})
