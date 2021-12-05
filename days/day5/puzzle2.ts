
import { getPuzzleInput, init2dArray } from '../../lib/util';
import { VentLine } from './types';

getPuzzleInput(5).then((input) => {
  const lines = input.split("\n")

  const ventLines = lines.map(line => new VentLine(line))
  const maxWidth = 1000; // Based on test data ranges
  const maxHeight = 1000; // Based on test data ranges

  // The debugRaster is fine with the test input but it isn't that awesome when your input data requires
  // a range of 1000x1000
  // const debugRaster: string[][] = init2dArray(maxWidth, maxHeight, '.');
  let numDangerousPoints = 0;
  
  // This is a dumb and low-effort way to iterate over every point in the matrix. Even points that
  // might have 0 lines. So if performance were important this is NOT the way to go. But since this is
  // for lulz and my CPU is plenty fast IDC. 
  for (let hor = 0; hor < maxWidth; hor++) {
    for (let ver = 0; ver < maxHeight; ver++) {
      const numIntersections = ventLines.filter(ventLine => ventLine.intersectsWith2(hor, ver)).length;
      if (numIntersections >= 2) numDangerousPoints++
      //debugRaster[ver][hor] = `${numIntersections}`;
    }
  }
  console.log("Number of dangerous points: " + numDangerousPoints)
  //console.log(debugRaster.map(row => row.map(field => field.replace('0', '.')).join('')).join("\n"))
})
