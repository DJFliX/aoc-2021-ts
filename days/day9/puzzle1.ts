
import { getPuzzleInput } from '../../lib/util';

getPuzzleInput(9).then((input) => {
  const lines: number[][] = input.split("\n").map(line => line.trim().split("").map(Number))

  const findLowPoints = () => {
    let lowpointNumbers: number[] = [];
    for (let y = 0; y < lines.length; y++) {
      const [doTopCheck, doBottomCheck, lineLength] = [y > 0, y < (lines.length - 2), lines[y].length]
      for (let x = 0; x < lineLength; x++) {
        const [doLeftCheck, doRightCheck] = [x > 0, x < lineLength - 1]
        const [lowerThanTop, lowerThanBotton, lowerThanLeft, lowerThanRight] = [
          doTopCheck ? lines[y - 1][x] > lines[y][x] : true, 
          doBottomCheck ? lines[y + 1][x] > lines[y][x] : true, 
          doLeftCheck ? lines[y][x - 1] > lines[y][x] : true, 
          doRightCheck ? lines[y][x + 1] > lines[y][x] : true
        ];
        if(lowerThanTop && lowerThanBotton && lowerThanLeft && lowerThanRight) {
          lowpointNumbers.push(lines[y][x])
          console.log(`Low point found: ${lines[y][x]} surrounded by ${doTopCheck ? lines[y - 1][x] : 'nothing'}, ${doBottomCheck ? lines[y + 1][x] : 'nothing'}, ${doLeftCheck ? lines[y][x-1] : 'nothing'}, ${doRightCheck ? lines[y][x+1] : 'nothing'}, `)
        }
      }
    }
    return lowpointNumbers
  }

  const lowPoints = findLowPoints();
  const riskLevels = lowPoints.map(point => point + 1)
  console.log(riskLevels.reduce((a, b) => a + b, 0))
})
