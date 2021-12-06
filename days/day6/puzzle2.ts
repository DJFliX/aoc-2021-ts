import { getPuzzleInput } from "../../lib/util";

getPuzzleInput(6).then((input) => {
  const fishInitValues = input.split(",").map(Number);
  let fishAges = new Array(9).fill(0);
  for (let starterFishAge of fishInitValues) {
    fishAges[starterFishAge]++;
  }
  for (let i = 0; i < 256; i++) {
    console.log("day " + i + ": " + fishAges.join(", "))
    // Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, 
    // while each other number decreases by 1 if it was present at the start of the day
    const fishOnZero = fishAges.shift(); // move fishes to next bin, set fishes with 0 as respawned fishes
    fishAges[8] = fishOnZero; // new fish on timer 8 == number of fish that "gave birth"
    fishAges[6] += fishOnZero; // number of fish that were spawned
  }

  const finalResultForThisFish =
    fishAges
      .reduce((a, b) => a + b, 0)

  console.log("total fish: " + finalResultForThisFish);
});
