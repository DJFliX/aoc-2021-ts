
import { getPuzzleInput } from '../../lib/util';
import { CaveSystem, CaveType } from './types';

getPuzzleInput(12).then((input) => {
  const lines = input.split("\n").map(line => line.trim()).filter(line => line.length > 2)
  const caveSystem = new CaveSystem(lines)
  const allRoutes = caveSystem.resolveRoutes();
  console.log(allRoutes.filter((r) => r.containsType(CaveType.Small)).length)
})
