import { FoldDirection, OrigamiSolver } from "./types"

describe("parser", () => {
    const testInput = `6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0
    
    fold along y=7
    fold along x=5
    `

    it("should remove newlines and yield the expected output", () => {
        const solver = new OrigamiSolver(testInput)
        expect(solver.instructions).toHaveLength(20)
        expect(solver.instructions[0]).toEqual({ x: 6, y: 10 })
        expect(solver.instructions[19]).toEqual({ direction: FoldDirection.Horizontal, position: 5 })
    })

    it("should return a grid that is the size of the maximum points", () => {

        const solver = new OrigamiSolver(`0,0
0,2
2,0
9,0
6,7
`)
        const result = solver.solve(0)
        expect(result.length).toEqual(8)
        expect(result[0].length).toEqual(10)

    })

    it("should apply a horizontal fold", () => {
        const solver = new OrigamiSolver(`0,3
1,3
2,3
3,3
4,3

fold along x=2
`)
        const result = solver.solve(1)

        expect(result).toHaveLength(2)
        expect(result[1].join("")).toEqual("#####")
    })

    it("should apply a vertical fold", () => {
        const solver = new OrigamiSolver(`3,0
3,1
3,2
3,3
3,4

fold along y=2
`)
        const result = solver.solve(1)
        expect(result[0]).toHaveLength(2)
        expect(result[0].join("")).toEqual(".#")
        expect(result[1].join("")).toEqual(".#")
        expect(result[2].join("")).toEqual(".#")
        expect(result[3].join("")).toEqual(".#")
        expect(result[4].join("")).toEqual(".#")
    })
})