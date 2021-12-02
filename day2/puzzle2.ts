import { readFileSync } from 'fs'

enum Direction {
    Forward = "forward",
    Down = "down",
    Up = "up"
}

interface Instruction {
    d: Direction
    a: number
}

const instructions: Instruction[] = readFileSync("./day2/test.txt", 'utf-8').split("\n")
  .map((s) => { 
    const parts = s.split(' ');
    return {
      d: parts[0] as Direction, 
      a: parseInt(parts[1].trim()) 
    }
  }
)

interface Tracker {
    depth: number,
    aim: number,
    position: number
}

const pos: Tracker = {
    depth: 0,
    aim: 0,
    position: 0
}

const processInstruction = (instruction: Instruction): void => {
    switch(instruction.d) {
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
}

instructions.forEach(processInstruction);

console.log(JSON.stringify(pos));
console.log(pos.position * pos.depth);