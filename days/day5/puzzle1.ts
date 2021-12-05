
import { getPuzzleInput, init2dArray } from '../../lib/util';
import { VentLine } from './types';

getPuzzleInput(5).then((input) => {
  const lines = input.split("\n")
  const ventLines = lines.map(line => new VentLine(line))
  const maxWidth = 1000;
  const maxHeight = 1000;
  // const debugRaster: string[][] = init2dArray(maxWidth, maxHeight, '.');
  let numDangerousPoints = 0;
  for (let hor = 0; hor < maxWidth; hor++) {
    for (let ver = 0; ver < maxHeight; ver++) {
      const numIntersections = ventLines.filter(ventLine => ventLine.intersectsWith(hor, ver)).length;
      if (numIntersections >= 2) numDangerousPoints++
      //debugRaster[ver][hor] = `${numIntersections}`;
    }
  }
  console.log("Number of dangerous points: " + numDangerousPoints)
  // console.log(debugRaster.map(row => row.map(field => field.replace('0', '.')).join('')).join("\n"))
})
