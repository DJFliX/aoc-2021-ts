import { getPuzzleInput } from '../../lib/util';

const getMostCommonBitAtPos = (arr: string[], pos: number): boolean => {
  const numberOfOnes = arr.filter((line) => line[pos] === "1").length
  const numberOfZeros = arr.length - numberOfOnes;
  return numberOfZeros < numberOfOnes;
}

getPuzzleInput(3).then((input) => {
  const lines = input.split("\n")
  const numChars = lines[0].length // assuming all lines have the same length
  let gammaBinStr = "";
  let epsilonBinStr = "";
  for(let i = 0; i < numChars; i++) {
    gammaBinStr += getMostCommonBitAtPos(lines, i) ? "1" : "0";
    epsilonBinStr += getMostCommonBitAtPos(lines, i) ? "0" : "1";
  }
  let gammaRate = parseInt(gammaBinStr, 2)
  let epsilonRate = parseInt(epsilonBinStr, 2)
  let powerConsumption = gammaRate * epsilonRate;
  console.log(powerConsumption)
})
