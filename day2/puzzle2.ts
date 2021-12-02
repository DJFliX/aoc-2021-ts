import { getPuzzleInput } from '../lib/util';
import { Direction, Instruction, Tracker } from './types'

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

  const pos: Tracker = {
    depth: 0,
    aim: 0,
    position: 0
  }

  instructions.forEach((instruction: Instruction): void => {
    switch (instruction.d) {
      case Direction.Forward: //forward X does two things
        pos.position += instruction.a; //It increases your horizontal position by X units
        pos.depth += (pos.aim * instruction.a)
        break;
      case Direction.Down:
        pos.aim += instruction.a;
        break;
      case Direction.Up:
        pos.aim -= instruction.a;
        break;
    }
  });
  console.log(pos.position * pos.depth);
})
