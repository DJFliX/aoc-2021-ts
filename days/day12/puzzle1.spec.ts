import { Cave, CaveSystem, CaveType, Route } from "./types"

describe("Cave system", () => {
    const cs = new CaveSystem(`start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`.split("\n").map(line => line.trim()).filter(line => line.length > 2))

    it("creates six Caves based on the test input", () => {
        expect([...cs.caves.keys()].length).toBe(6)
    })
    it("creates cave connections based on the test input", () => {
        expect([...cs.connections.keys()].length).toBe(6) //Connections per cave
        expect(cs.connections.get("start")).toEqual([cs.caves.get("A"), cs.caves.get("b")])
        expect(cs.connections.get("end")).toEqual([cs.caves.get("A"), cs.caves.get("b")])
    })

    it("resolves a simple route", () => {
        const scs = new CaveSystem(`start-A
        A-end`.split("\n").map(line => line.trim()).filter(line => line.length > 2))

        const result = scs.resolveRoutes()
        expect(result.length).toBe(1)
        expect(result[0].toString()).toBe("start,A,end")
    })

    it("resolves 36 possibilities using the v2 rules", () => {
        const result = cs.resolveRoutes(undefined, true).filter(r => r.hasEnded)
        expect(result.length).toBe(36)
    })
})

describe("Cave", () => {
    it("Creates a start cave", () => {
        const c: Cave = new Cave("start")
        expect(c.type).toBe(CaveType.Start)
    })
    it("Creates an end cave", () => {
        const c: Cave = new Cave("end")
        expect(c.type).toBe(CaveType.End)
    })
    it("Creates a small cave", () => {
        const c: Cave = new Cave("a")
        expect(c.type).toBe(CaveType.Small)
    })
    it("Creates a big cave", () => {
        const c: Cave = new Cave("A")
        expect(c.type).toBe(CaveType.Big)
    })
})

describe("Route", () => {
    it("follows an allowed route", () => {
        const start = new Cave("start")
        const b = new Cave("b")
        const c = new Cave("c")
        const end = new Cave("end")
        const r = new Route([start]).follow(b).follow(c).follow(end)
        expect(r.toString()).toEqual("start,b,c,end")
    })
    it("updates hasEnded when an end cave is encountered", () => {
        const end = new Cave("end")
        const result = new Route([end])
        expect(result.hasEnded).toBeTruthy()
    })
    it("Disallows visiting a small cave twice", () => {
        const start = new Cave("start")
        const b = new Cave("b")
        const c = new Cave("c")
        expect(new Route([start,b,c]).stepIsAllowed(b)).toBeFalsy()
    })
})