
import { getPuzzleInput } from '../../lib/util';



getPuzzleInput(7).then((input) => {
  const lines = input.split(",").map(Number)
  const getTotalFuelCost = ( desiredEndPosition: number): number => {
    return (lines.map(n => {
      let distance = Math.abs(n - desiredEndPosition)
      return (distance * (distance + 1)) /2
    })).reduce((a, b) => a + b, 0)
  }

  let cheapestPosition = 0;
  let cheapestPositionCost = Number.MAX_SAFE_INTEGER
  const start = new Date()

  for(let i = 0; i < 1000; i+=30) {
    const fuelCostForStep = getTotalFuelCost(i)
    if(fuelCostForStep < cheapestPositionCost) {
      cheapestPosition = i;
      cheapestPositionCost = fuelCostForStep;
    }
  }
  const cheapestPosFromIterationOne = Number(cheapestPosition);
  for(let i = -15; i < 15; i++) {
    const fuelCostForStep = getTotalFuelCost(cheapestPosFromIterationOne + i)
    if(fuelCostForStep < cheapestPositionCost) {
      cheapestPosition = cheapestPosFromIterationOne + i;
      cheapestPositionCost = fuelCostForStep;
    }
  }

  const time = new Date().getTime() - start.getTime();

  console.log(`The cheapest position is ${cheapestPosition} at ${cheapestPositionCost} fuel in ${time}ms`)
})
