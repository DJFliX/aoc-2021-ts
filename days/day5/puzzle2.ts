
import { getPuzzleInput } from '../../lib/util';

const isBetween = (a: number, b: number, testNum: number): boolean => {
  const smallerNum = (a < b) ? a : b,
    largerNum = (a > b) ? a : b;
  return testNum >= smallerNum && testNum <= largerNum
}

const getRaster = (x: number, y: number): string[][] => {
  const mkR = (count: number): string[] => {
    let r: string[] = [];
    for (let i = 0; i < count; i++) {
      r.push(".")
    }
    return r;
  }
  let row = mkR(x);
  let res: string[][] = [];
  for (let i = 0; i < y; i++) {
    res.push([...row]);
  }
  return res;
}

class VentLine {
  private x1: number
  private x2: number
  private y1: number
  private y2: number
  private xMin: number
  private xMax: number
  private yMin: number
  private yMax: number
  private isHorizontal: boolean
  private isVertical: boolean
  private isDiagonal: boolean

  constructor(input: string) {
    [this.x1, this.y1, this.x2, this.y2] = input.split(" -> ").map(i => i.split(",")).flat().map(Number);
    [this.xMin, this.xMax, this.yMin, this.yMax] = [Math.min(this.x1, this.x2), Math.max(this.x1, this.x2), Math.min(this.y1, this.y2), Math.max(this.y1, this.y2)]
    this.isHorizontal = this.x1 === this.x2;
    this.isVertical = this.y1 === this.y2;
    this.isDiagonal = !(this.isHorizontal || this.isVertical)
  }

  isBetweenDiagonally = (x: number, y: number): boolean => {
    if (x < this.xMin || x > this.xMax || y < this.yMin || y > this.yMax) return false;
    const [xIterator, xStopFn] = this.x1 > this.x2 ? [-1, (i: number) => i >= this.x2] : [1, (i: number) => i <= this.x2];
    const [yIterator, yStopFn] = this.y1 > this.y2 ? [-1, (i: number) => i >= this.y2] : [1, (i: number) => i <= this.y2];
    for (let i = this.x1, j = this.y1; xStopFn(i) && yStopFn(j); i += xIterator, j += yIterator)
      if (i === x && j === y) return true;
    return false;
  }

  intersectsWith = (x: number, y: number): boolean =>
    (this.isHorizontal && this.x1 === x && isBetween(this.y1, this.y2, y))
    || (this.isVertical && this.y1 === y && isBetween(this.x1, this.x2, x))
    || (this.isDiagonal && this.isBetweenDiagonally(x, y))

}

getPuzzleInput(5).then((input) => {
  const lines = input.split("\n")

  const ventLines = lines.map(line => new VentLine(line))
  const maxWidth = 1000; // Based on test data ranges
  const maxHeight = 1000; // Based on test data ranges
  // The debugRaster is fine with the test input but it isn't that awesome when your input data requires
  // a range of 1000x1000
  //const debugRaster: string[][] = getRaster(maxWidth, maxHeight);
  let numDangerousPoints = 0;
  // This is a dumb and low-effort way to iterate over every point in the matrix. Even points that
  // might have 0 lines. So if performance were important this is NOT the way to go. But since this is
  // for lulz and my CPU is plenty fast IDC. 
  for (let hor = 0; hor < maxWidth; hor++) {
    for (let ver = 0; ver < maxHeight; ver++) {
      const numIntersections = ventLines.filter(ventLine => ventLine.intersectsWith(hor, ver)).length;
      if (numIntersections >= 2) numDangerousPoints++
      //debugRaster[ver][hor] = `${numIntersections}`;
    }
  }
  console.log("Number of dangerous points: " + numDangerousPoints)
  //console.log(debugRaster.map(row => row.map(field => field.replace('0', '.')).join('')).join("\n"))
})
