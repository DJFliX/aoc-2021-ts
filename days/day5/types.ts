const isBetween = (a: number, b: number, testNum: number): boolean => {
    const smallerNum = (a < b) ? a : b,
      largerNum = (a > b) ? a : b;
    return testNum >= smallerNum && testNum <= largerNum
  }
  
 export class VentLine {
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
  
    intersectsWith2 = (x: number, y: number): boolean =>
      (this.isHorizontal && this.x1 === x && isBetween(this.y1, this.y2, y))
      || (this.isVertical && this.y1 === y && isBetween(this.x1, this.x2, x))
      || (this.isDiagonal && this.isBetweenDiagonally(x, y))
  
  }
  