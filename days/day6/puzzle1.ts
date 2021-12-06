
import { getPuzzleInput } from '../../lib/util';

class Lanternfish {
  private currentVal: number

  constructor(timerVal: number) {
    this.currentVal = timerVal;
  }

  public advance = (): boolean => {
    if(this.currentVal === 0) {
      this.currentVal = 6;
      return true
    } else {
      this.currentVal--;
      return false;
    }
  }

  public getAge = (): number => {
    return this.currentVal
  }
}

getPuzzleInput(6).then((input) => {
  const fishInitValues = input.split(",").map(Number)
  // const fishInitValues = `3,4,3,1,2`.split(",").map(Number)
  let allFish = fishInitValues.map(initValue => new Lanternfish(initValue))
  for (let day = 1; day <= 80; day++) {
    let spawnCount = allFish.map(fish => fish.advance()).filter(v => v === true).length
    for(let newFish = 0; newFish < spawnCount; newFish++) {
      allFish.push(new Lanternfish(8))
    }
    // console.log(`After ${day} days: ${allFish.map(f => f.getAge()).join(",")}`)
    console.log(`After ${day} days ${allFish.length}`)
  }

})
