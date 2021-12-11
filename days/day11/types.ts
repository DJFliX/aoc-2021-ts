export class Grid {
    grid: number[][]

    constructor(input: number[][]) {
        this.grid = input
    }

    // Increments all numbers in the grid by one
    stage1 = (): void => {
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
            this.grid[rowIndex] = this.grid[rowIndex].map(n => n + 1)
        }
    }

    perAdjacentCell(rowIndex: number, columnIndex: number, fn: (r: number, c: number) => number): number {
        let acc = 0;
        const maxColumnIndex = Math.min(this.grid.length - 1, columnIndex + 1);
        const maxRowIndex = Math.min(this.grid[rowIndex].length - 1, rowIndex + 1);
        for (let r = Math.max(0, rowIndex - 1); r <= maxRowIndex; r++) {
            for (let c = Math.max(0, columnIndex - 1); c <= maxColumnIndex; c++) {
                if (c === columnIndex && r === rowIndex) { continue; }
                acc += fn(r, c);
            }
        }
        return acc;
    }

    checkFlashAt = (row: number, column: number): number => {
        let localFlashes = 1
        if (this.grid[row][column] <= 9) return 0;
        this.grid[row][column] = -1000; // make sure we don't go in an endless loop
        localFlashes += this.perAdjacentCell(row, column, (r, c) => { this.grid[r][c]++; return this.checkFlashAt(r, c) })
        return localFlashes
    }

    takeStep = (): number => {
        this.stage1();
        let flashes = this.stage2();
        this.stage3();
        return flashes;
    }

    stage2 = (): number => {
        let flashes = 0;
        for (let rowIndex = 0, row: number[] = []; rowIndex < this.grid.length; row = this.grid[++rowIndex]) {
            for (let columnIndex = 0; columnIndex < this.grid[rowIndex].length; columnIndex++) {
                flashes += this.checkFlashAt(rowIndex, columnIndex)
            }
        }
        return flashes;
    }

    stage3 = (): void => {
        for (let rowIndex = 0, row: number[] = []; rowIndex < this.grid.length; row = this.grid[++rowIndex]) {
            for (let columnIndex = 0; columnIndex < this.grid[rowIndex].length; columnIndex++) {
                if (this.grid[rowIndex][columnIndex] < 0)
                    this.grid[rowIndex][columnIndex] = 0
            }
        }
    }
}