import { getPuzzleInput } from '../../lib/util';

interface sigPat {
  inputs: string[]
  inputNumDecoded: string
  outValRaw: string[]
}

// I'm pretty sure someone way smarter will do it in 5 lines or less.
getPuzzleInput(8).then((input) => {
  const lines = input.split("\n")
  const pats: sigPat[] = lines.filter(line => line.length > 2).map(line => {
    const [allInputsLine, allOutputsLine] = line.split("|")
    const allInputs = allInputsLine.split(" "),
      allOutputs = allOutputsLine.split(" ");
    return {
      inputs: allInputs.map((unsorted) => unsorted.split('').sort().join('')),
      inputNumDecoded: Array(allInputs.length - 1).fill('?').join(''),
      outValRaw: allOutputs.map((unsorted) => unsorted.split('').sort().join(''))
    }
  })

  const replaceAt = (target: string, index: number, replacement: string): string => {
    return target.substr(0, index) + replacement + target.substr(index + replacement.length)
  }

  const isSubsetOf = (input: string, superset: string): boolean => {
    if (input.length > superset.length) return false;
    return input.split('').filter(c => superset.includes(c)).length === input.length
  }


  let sum = 0;

  for (let patIdx = 0; patIdx < pats.length; patIdx++) {
    const sigPt = pats[patIdx];
    let shouldRerun = false;
    const setDecodedSigAtPos = (idx: number, value: string): void => {
      console.log(`Decoded a ${value} at sigIdx ${idx} in pattern ${patIdx}`)
      sigPt.inputNumDecoded = replaceAt(sigPt.inputNumDecoded, idx, value)
    }
    for (let sigIdx = 0; sigIdx < sigPt.inputs.length; sigIdx++) {
      let currSigPt = sigPt.inputs[sigIdx];
      const splitDecoded = sigPt.inputNumDecoded.split('');
      const sevenIndex = splitDecoded.indexOf('7');
      const fourIndex = splitDecoded.indexOf('4');
      const fiveIndex = splitDecoded.indexOf('5');
      const nineIndex = splitDecoded.indexOf('9')
      switch (currSigPt.length) {
        case 2:
          setDecodedSigAtPos(sigIdx, '1');
          break;
        case 3:
          setDecodedSigAtPos(sigIdx, '7');
          break;
        case 4:
          setDecodedSigAtPos(sigIdx, '4');
          break;
        case 5:
          // 2, 3 or 5 -> depends on 9
          if (sevenIndex !== -1 && isSubsetOf(sigPt.inputs[sevenIndex], currSigPt)) {
            // if it contains all segments of 7 it is a 3
            setDecodedSigAtPos(sigIdx, '3')
            break;
          }
          if (nineIndex !== -1) {
            if (isSubsetOf(currSigPt, sigPt.inputs[nineIndex])) {
              setDecodedSigAtPos(sigIdx, '5');
            } else {
              setDecodedSigAtPos(sigIdx, '2');
            }
            break;
          }
          shouldRerun = true;
          break;
        case 6:
          if (sevenIndex !== -1 && fourIndex !== -1 && isSubsetOf(sigPt.inputs[sevenIndex], currSigPt) && isSubsetOf(sigPt.inputs[fourIndex], currSigPt)) {
            setDecodedSigAtPos(sigIdx, '9');
            break;
          }
          if (fiveIndex !== -1) {
            if (isSubsetOf(sigPt.inputs[fiveIndex], currSigPt)) {
              setDecodedSigAtPos(sigIdx, '6');
            } else {
              setDecodedSigAtPos(sigIdx, '0')
            }
            break;
          }
          shouldRerun = true;
          break;
        case 7:
          sigPt.inputNumDecoded = replaceAt(sigPt.inputNumDecoded, sigIdx, '8');
          break;
        default:
          break;
      }
      if (sigIdx === sigPt.inputs.length - 1) {
        if (shouldRerun) {
          console.log(`Triggering rerun for ${patIdx} ${sigIdx}. Findings so far: ${sigPt.inputNumDecoded}`)
          shouldRerun = false;
          sigIdx = -1;
        } else {
          console.log("Done! Result: " + sigPt.inputNumDecoded)
        }
      }
    }
    const together = sigPt.outValRaw.map((pat) => sigPt.inputNumDecoded[sigPt.inputs.indexOf(pat)]).join('')
    sum += Number(together)
  }
  console.log(sum)
})
