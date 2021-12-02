enum Direction {
  Forward = "forward",
  Down = "down",
  Up = "up"
}

interface Instruction {
  d: Direction
  a: number
}

interface Tracker {
  depth: number,
  aim: number,
  position: number
}

export { Direction, Instruction, Tracker }