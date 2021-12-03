
import { getPuzzleInput } from '../../lib/util';

const getCommonBitAtPos = (arr: string[], pos: number, valueIfEqual: boolean, comp: (zeros: number, ones: number) => boolean): boolean => {
  const numberOfOnes = arr.filter((line) => line[pos] === "1").length
  const numberOfZeros = arr.length - numberOfOnes;
  if (numberOfZeros === numberOfOnes)
    return valueIfEqual;
  return comp(numberOfZeros, numberOfOnes);
}

const filterEntriesWithCommonAtPos = (arr: string[], pos: number, inverse: boolean): string[] => {
  const relevantEntryForPos = getCommonBitAtPos(arr, pos, !inverse, inverse ? (z, o) => z > o : (z, o) => z < o) ? "1" : "0";
  return arr.filter((entry: string) => entry[pos] === relevantEntryForPos)
}

getPuzzleInput(3).then((input) => {
  const lines = input.split("\n")
  const numChars = lines[0].length // assuming all lines have the same length
  let oxSelection = [...lines];
  let co2Selection = [...lines];
  for (let i = 0; i < numChars; i++) {
    if (oxSelection.length > 1)
      oxSelection = filterEntriesWithCommonAtPos(oxSelection, i, false);
    if (co2Selection.length > 1) 
      co2Selection = filterEntriesWithCommonAtPos(co2Selection, i, true);
  }
  let oxygenRating = parseInt(oxSelection[0], 2)
  let co2Rating = parseInt(co2Selection[0], 2)
  let lifeSupportRating = oxygenRating * co2Rating;
  console.log(lifeSupportRating)
})
