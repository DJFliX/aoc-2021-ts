import { getPuzzleInput } from '../../lib/util';

interface sigPat {
  inputs: string[]
  inputNumDecoded: string
  outValRaw: string[]
  outValChar: string
}

getPuzzleInput(8).then((input) => {
  const lines = input.split("\n")
  const pats: sigPat[] = lines.filter(line => line.length > 2).map(line => {
    const [allInputsLine, allOutputsLine] = line.split("|")
    const allInputs = allInputsLine.split(" "),
      allOutputs = allOutputsLine.split(" ");
    return {
      inputs: allInputs.map((unsorted) => unsorted.split('').sort().join('')),
      inputNumDecoded: Array(allInputs.length).fill('?').join(''),
      outValRaw: allOutputs.map((unsorted) => unsorted.split('').sort().join('')),
      outValChar: Array(allOutputs.length).fill('?').join('')
    }
  })

  const replaceAt = (target: string, index: number, replacement: string): string => {
    return target.substr(0, index) + replacement + target.substr(index + replacement.length)
  }

  let specificCharacterCount = 0;

  for(let patIdx = 0; patIdx < pats.length; patIdx++) {
    const sigPt = pats[patIdx];
    for(let sigIdx = 0; sigIdx < sigPt.inputs.length; sigIdx++) {
      let currSigPt = sigPt.inputs[sigIdx];
      switch(currSigPt.length) {
        case 2: 
          sigPt.inputNumDecoded = replaceAt(sigPt.inputNumDecoded, sigIdx, '1');
          break;
        case 3:
          sigPt.inputNumDecoded = replaceAt(sigPt.inputNumDecoded, sigIdx, '7');
          break;
        case 7:
          sigPt.inputNumDecoded = replaceAt(sigPt.inputNumDecoded, sigIdx, '8');
          break;
        case 4:
          sigPt.inputNumDecoded = replaceAt(sigPt.inputNumDecoded, sigIdx, '4');
          break;
      }
    }

    for(let outputPat of sigPt.outValRaw) {
      const inPatIdx = sigPt.inputs.indexOf(outputPat)
      if(sigPt.inputNumDecoded[inPatIdx] !== '?') {
        console.log(`Decoded ${outputPat} to match the ${inPatIdx} element of input which makes it ${sigPt.inputNumDecoded[inPatIdx]}`)
        specificCharacterCount++;
      }
        
    }
  }
  console.log(specificCharacterCount)
})
