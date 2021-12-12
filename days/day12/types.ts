import '../../lib/util'
export enum CaveType {
    Start,
    End,
    Small,
    Big
}

export class Cave {
    public id: string
    public type: CaveType

    constructor(id: string) {
        this.id = id;
        if (id === "start") {
            this.type = CaveType.Start
        } else if (id === "end") {
            this.type = CaveType.End
        } else if (id.toLowerCase() === id) {
            this.type = CaveType.Small
        } else {
            this.type = CaveType.Big
        }
    }
}

export class Route {
    private route: Cave[] = []
    public last: Cave
    public hasEnded: boolean = false
    public isv2: boolean

    constructor(caves: Cave[], isv2?: boolean) {
        this.route.push(...caves)
        this.last = this.route[this.route.length - 1];
        if(this.last.type === CaveType.End)
            this.hasEnded = true;
        this.isv2 = isv2 || false
    }

    stepIsAllowed = (point: Cave): boolean => {
        if(this.hasEnded) return false;
        switch(point.type) {
            case CaveType.Big:
            case CaveType.End:
                return true;
            case CaveType.Small:
                if(this.isv2) {
                    const smallCaveMap = this.route.filter(c => c.type === CaveType.Small).groupBy<Cave, string>((c) => c.id)
                    if(!smallCaveMap.has(point.id)) return true;
                    const anySmallCaveWasVisitedTwice = [...smallCaveMap.values()].map(arr => arr.length).includes(2)
                    return !anySmallCaveWasVisitedTwice
                } else {
                    return !this.route.includes(point)
                }
            case CaveType.Start:
                return false;
        }
    }

    containsType = (type: CaveType): boolean => {
        return !!this.route.find(r => r.type === type)
    }

    follow = (point: Cave): Route => {
        if(this.stepIsAllowed(point)) {
            return new Route([...this.route, point], this.isv2)
        } else {
            console.log("Not allowed to follow this route");
            return this;
        }
    }

    public toString() {
        return this.route.map(c => c.id).join(',')
    }
}

export class CaveSystem {
    public caves: Map<string, Cave>
    public connections: Map<string, Cave[]>

    constructor(input: string[]) {
        this.caves = new Map()
        this.connections = new Map()
        for (let pair of input) {
            const caveIds = pair.split("-")
            caveIds.forEach(caveId => {
                if (!this.caves.has(caveId)) {
                    this.caves.set(caveId, new Cave(caveId))
                }
            })
            if (this.connections.has(caveIds[0])) {
                this.connections.get(caveIds[0])!.push(this.caves.get(caveIds[1])!)
            } else {
                this.connections.set(caveIds[0], [this.caves.get(caveIds[1])!])
            }
            if (this.connections.has(caveIds[1])) {
                this.connections.get(caveIds[1])!.push(this.caves.get(caveIds[0])!)
            } else {
                this.connections.set(caveIds[1], [this.caves.get(caveIds[0])!])
            }
        }
    }

    resolveRoutes = (from?: Route, isv2?: boolean): Route[] => {
        const route = from || new Route([this.caves.get("start")!], isv2 || false)
        if(route.hasEnded) {
            return [route];
        }
        const connectionsForRoute = this.connections.get(route.last.id)!
        return connectionsForRoute.map(candidateCave => {
            if(route.stepIsAllowed(candidateCave))
                return this.resolveRoutes(route.follow(candidateCave), isv2 || false)
            else return [];
        }).flat()
    }
}