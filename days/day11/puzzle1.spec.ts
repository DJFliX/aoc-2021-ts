import { Grid } from "./types"

const exampleInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split("\n").map(line => line.trim().split("").map(Number))

describe("Grid", () => {
    it("stores the grid in a variable", () => {
        const g = new Grid(exampleInput)
        expect(g.grid).toEqual(exampleInput)
    })

    it("stage1 increments every number by one", () => {
        const g = new Grid(exampleInput)
        g.stage1()
        expect(g.grid).toEqual(`6594254334
        3856965822
        6375667284
        7252447257
        7468496589
        5278635756
        3287952832
        7993992245
        5957959665
        6394862637`.split("\n").map(line => line.trim().split("").map(Number)))
    })

    it("stage2 returns the amount of flashes (including diagonal)", () => {
        const resolveFlashInput = `11111
        19991
        19191
        19991
        11111`.split("\n").map(line => line.trim().split("").map(Number))
        const g = new Grid(resolveFlashInput)
        g.stage1();
        expect(g.stage2()).toEqual(9);
        g.stage3();
        expect(g.grid).toEqual(`34543
        40004
        50005
        40004
        34543`.split("\n").map(line => line.trim().split("").map(Number)))
    })

    it("running stage 1 + 2 twice results in the expected output", () => {
        const resolveFlashInput = `34543
        40004
        50005
        40004
        34543`.split("\n").map(line => line.trim().split("").map(Number))
        const g = new Grid(resolveFlashInput)
        g.stage1();
        expect(g.stage2()).toEqual(0);
        expect(g.grid).toEqual(`45654
        51115
        61116
        51115
        45654`.split("\n").map(line => line.trim().split("").map(Number)))
    })

    it("gives the expected output going from step 2 to 3", () => {
        const resolveFlashInput = `8807476555
        5089087054
        8597889608
        8485769600
        8700908800
        6600088989
        6800005943
        0000007456
        9000000876
        8700006848`.split("\n").map(line => line.trim().split("").map(Number))
        const g = new Grid(resolveFlashInput)
        const flashes = g.takeStep();
        expect(g.grid).toEqual(`0050900866
        8500800575
        9900000039
        9700000041
        9935080063
        7712300000
        7911250009
        2211130000
        0421125000
        0021119000`.split("\n").map(line => line.trim().split("").map(Number)))
    })

    it("gives the expected output going from step 3 to 4", () => {
        const resolveFlashInput = `0050900866
        8500800575
        9900000039
        9700000041
        9935080063
        7712300000
        7911250009
        2211130000
        0421125000
        0021119000`.split("\n").map(line => line.trim().split("").map(Number))
        const g = new Grid(resolveFlashInput)
        const flashes = g.takeStep();
        expect(g.grid).toEqual(`2263031977
        0923031697
        0032221150
        0041111163
        0076191174
        0053411122
        0042361120
        5532241122
        1532247211
        1132230211`.split("\n").map(line => line.trim().split("").map(Number)))
    })
})