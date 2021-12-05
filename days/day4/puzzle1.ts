
import { getPuzzleInput } from '../../lib/util';

enum CrossOffNumberResult {
  Miss = "miss",
  Hit = "hit",
  Bingo = "bingo"
}


class BingoBoard {
  boardLines: number[][]
  crossedNumbers: boolean[][]

  crossOffNumber = (input: number): CrossOffNumberResult => {
    let numberWasCrossed = false;
    this.boardLines.forEach((line, lineIdx) => line.forEach((num, numIdx) => {
      if (num === input) {
        this.crossedNumbers[lineIdx][numIdx] = true;
        numberWasCrossed = true;
      }
    }))
    if (numberWasCrossed) {
      const hasBingo = this.checkBingo()
      if (hasBingo) return CrossOffNumberResult.Bingo
      else return CrossOffNumberResult.Hit
    }
    return CrossOffNumberResult.Miss;
  }

  private checkBingo = (): boolean => {
    const checkRow = (rowIdx: number): boolean => {
      const line = this.crossedNumbers[rowIdx];
      return (line.filter((b) => b === true).length === line.length)
    }
    const checkColumn = (columnIdx: number): boolean => this.crossedNumbers.map((line) => line[columnIdx]).filter((b) => b === true).length === 5
    for (let i = 0; i < 5; i++) {
      if (checkRow(i) || checkColumn(i))
        return true;
    }
    return false;
  }

  getUnmarkedNumbers = (): number[] => {
    let unmarkedNumbers: number[] = [];
    this.crossedNumbers.forEach((line, lineIdx) => line.forEach((b, numIdx) => {
      if (b === false) {
        unmarkedNumbers.push(this.boardLines[lineIdx][numIdx]);
      }
    }))
    return unmarkedNumbers;
  }

  constructor(boardStr: string[]) {
    this.boardLines = boardStr.map((line) => {
      return line.trim()
        .replace("  ", " ") // Ugly replace to make sure all numbers are clean
        .replace("  ", " ") // because today I'm too lazy to do regex
        .replace("  ", " ")
        .replace("  ", " ")
        .replace("  ", " ")
        .split(" ")
        .map(str => Number(str.trim()))
    })
    this.crossedNumbers = [...this.boardLines.map((line) => line.map(_ => false))]
  }
}

getPuzzleInput(4).then((input) => {
  const lines = input.split("\n")
  const bingoNumbers = lines.splice(0, 2)[0].split(",").map(Number)
  let boards: BingoBoard[] = [];
  while (lines.length >= 5) {
    boards.push(new BingoBoard(lines.splice(0, 6).filter(line => line.length > 2)))
  }
  const feedNumber = (currentNumber: number): BingoBoard | undefined => {
    for (const board of boards) {
      const result = board.crossOffNumber(currentNumber);
      //if(result !== CrossOffNumberResult.Miss) console.log(result)
      if (result === CrossOffNumberResult.Bingo) return board;
    }
    console.log("No board had bingo for number " + currentNumber)
    return undefined;
  }

  for (let i = 0; i < bingoNumbers.length; i++) {
    const winningBoard = feedNumber(bingoNumbers[i]);
    if (winningBoard) {
      const uncrossedNumbers = winningBoard.getUnmarkedNumbers();
      const score = uncrossedNumbers.reduce((a, b) => a + b, 0) * bingoNumbers[i]
      console.log("The winning board has score " + score);
      process.exit(0);
    }
  }

})
