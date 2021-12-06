
import { getPuzzleInput } from '../../lib/util';

getPuzzleInput(6).then((input) => {
  const fishInitValues = input.split(",").map(Number)
  // const fishInitValues = `3,4,3,1,2`.split(",").map(Number)
  let ogFish = fishInitValues.map(initValue => initValue)
  let fishArrays: number[][] = [[]]
  for(let arrCnt = 0; arrCnt < 16000; arrCnt++) {
    fishArrays[arrCnt] = [];
  }
  let spawnCount = 0;
  const advance = (fishState: number): number => {
    if(fishState === 0) {
      spawnCount++;
      return 6;
    } else {
      return --fishState;
    }
  }

  for (let day = 1; day <= 256; day++, spawnCount = 0) {
    ogFish = ogFish.map(p => advance(p))
    for(let arrCnt = 0; arrCnt < fishArrays.length; arrCnt++) {
      fishArrays[arrCnt] = fishArrays[arrCnt].map(p => advance(p));
    }

    for(let newFish = 0; newFish < spawnCount; newFish++) {
      for(let arrCnt = 0; arrCnt < fishArrays.length; arrCnt++) {
        if(fishArrays[arrCnt].length < 80000000) {
          fishArrays[arrCnt].push(8);
          break;
        }
      }
    }
    console.log(`After ${day} days ${ogFish.length + fishArrays.map((v) => v.length).reduce((a, b) => a + b, 0)}`)
  }

})
