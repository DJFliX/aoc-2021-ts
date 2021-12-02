import { exists, writeFile } from './lib/util'
import { mkdirSync } from 'fs';

const baseDate = new Date(2021, 10, 30, 7, 0, 0), // I'm in CET
  now = new Date(),
  timeDiff = now.getTime() - baseDate.getTime(),
  currentPuzzleDay = Math.floor(timeDiff / (1000 * 3600 * 24));

const puzzleTemplate = (day: number): string => {
  return `
import { getPuzzleInput } from '../../lib/util';

getPuzzleInput(${day}).then((input) => {
  const lines = input.split("\\n")
})
`
}

const puzzleFilename = ( puzzleNum: number): string => `./days/day${currentPuzzleDay}/puzzle${puzzleNum}.ts`

exists(puzzleFilename(1)).then(async (puzzleFileExists) => {
  if(puzzleFileExists) {
    console.log(`Files for day ${currentPuzzleDay} already exist. Wait until the next puzzle is published.`);
  } else {
    mkdirSync(`./days/day${currentPuzzleDay}`)
    await writeFile(puzzleFilename(1), puzzleTemplate(currentPuzzleDay))
    await writeFile(puzzleFilename(2), puzzleTemplate(currentPuzzleDay))
  }
})