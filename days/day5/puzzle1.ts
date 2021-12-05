
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
  private isHorizontal: boolean
  private isVertical: boolean

  constructor(input: string) {
    [this.x1, this.y1, this.x2, this.y2] = input.split(" -> ").map(i => i.split(",")).flat().map(Number)
    this.isHorizontal = this.x1 === this.x2;
    this.isVertical = this.y1 === this.y2;
  }

  intersectsWith = (x: number, y: number): boolean => 
    (this.isHorizontal && this.x1 === x && isBetween(this.y1, this.y2, y)) || (this.isVertical && this.y1 === y && isBetween(this.x1, this.x2, x))

}

getPuzzleInput(5).then((input) => {
  const lines = input.split("\n")
  const ventLines = lines.map(line => new VentLine(line))
  const maxWidth = 1000;
  const maxHeight = 1000;
  // const debugRaster: string[][] = getRaster(maxWidth, maxHeight);
  let numDangerousPoints = 0;
  for (let hor = 0; hor < maxWidth; hor++) {
    for (let ver = 0; ver < maxHeight; ver++) {
      if(ventLines.filter(ventLine => ventLine.intersectsWith(hor, ver)).length >= 2) numDangerousPoints++
    }
  }
  console.log("Number of dangerous points: " + numDangerousPoints)
  // console.log(debugRaster.map(row => row.join()).join("\n"))

})
