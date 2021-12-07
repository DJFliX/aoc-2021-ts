
import { getPuzzleInput } from '../../lib/util';

const getTotalFuelCost = (startPositions: number[], desiredEndPosition: number): number => {
  return (startPositions.map(n => {
    let distance = Math.abs(n - desiredEndPosition),
      fuel = 0;
    while(distance > 0) fuel += distance--
    return fuel
  })).reduce((a, b) => a + b, 0)
}

getPuzzleInput(7).then((input) => {
  const lines = input.split(",").map(Number)
  let cheapestPosition = 0;
  let cheapestPositionCost = Number.MAX_SAFE_INTEGER
  for(let i = 0; i < 1000; i++) {
    const fuelCostForStep = getTotalFuelCost(lines, i)
    if(fuelCostForStep < cheapestPositionCost) {
      cheapestPosition = i;
      cheapestPositionCost = fuelCostForStep;
      console.log(`Found a cheaper candidate: ${cheapestPosition} at ${cheapestPositionCost} fuel`)
    }
  }

  console.log(`The cheapest position is ${cheapestPosition} at ${cheapestPositionCost} fuel`)
})
