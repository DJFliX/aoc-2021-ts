import { getPuzzleInput } from '../../lib/util';
import { Instruction, Direction } from './types'

getPuzzleInput(2).then((input) => {
  const instructions: Instruction[] = input.split("\n")
    .map((s) => {
      const parts = s.split(' ');
      return {
        d: parts[0] as Direction,
        a: parseInt(parts[1].trim())
      }
    }
    )

  const sumOfType = (d: Direction): number => instructions
    .filter((i) => i.d === d)
    .map(i => i.a)
    .reduce((a, b) => a + b, 0)

  const horizontalPos = sumOfType(Direction.Forward),
    ups = sumOfType(Direction.Up),
    downs = sumOfType(Direction.Down),
    depth = downs - ups;

  console.log(horizontalPos, ups, downs, depth, horizontalPos * depth)

})

