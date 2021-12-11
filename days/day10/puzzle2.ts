
import { getPuzzleInput } from '../../lib/util';

getPuzzleInput(10).then((input) => {
  const lines = input.split("\n").map(l => l.trim());

  const isOpeningCharacter = (character: string): boolean => {
    switch (character) {
      case '[':
      case '<':
      case '{':
      case '(':
        return true;
      default: return false;
    }
  }

  const wouldMatch = (closingChar: string, openingChar: string): boolean => {
    switch(openingChar) {
      case '[':
        return closingChar === ']';
      case '<':
        return closingChar === '>';
      case '{':
        return closingChar === '}';
      case '(':
        return closingChar === ')';
    }
    throw new Error("ILLEGAL MOVE: " + openingChar)
  }

  const getPointsForChar = (errorChar: string): number => {
    switch(errorChar) {
      case '(':
        return 1;
      case '[':
        return 2;
      case '{':
        return 3;
      case '<':
        return 4;
    }
    throw new Error("Invalid char provided to getPointsForChar")
  }

  const followLineJourney = (line: string): number => {
    let lineOps: string[] = [];
    let totalScore = 0;
    let characters = line.split("")
    for (let i = 0; i < characters.length; i++) {
      if(isOpeningCharacter(characters[i])) {
        lineOps.push(characters[i])
      } else {
        if(wouldMatch(characters[i], lineOps[lineOps.length - 1])) {
          lineOps.pop();
        } else {
          return 0 // Ignore this line: it gets no score because it is corrupt
        }
      }
    }
    while(lineOps.length > 0) {
      totalScore = (totalScore * 5) + getPointsForChar(lineOps.pop()!)
    }
    return totalScore;
  }

  const autoCompletePoints = lines.map(followLineJourney).filter(points => points > 0).sort((a, b) => a - b)
  
  console.log(autoCompletePoints[(autoCompletePoints.length - 1) / 2])
})
