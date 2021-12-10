
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
      case ')':
        return 3;
      case ']':
        return 57;
      case '}':
        return 1197;
      case '>':
        return 25137;
    }
    throw new Error("Invalid char provided to getPointsForChar")
  }

  const followLineJourney = (line: string): number => {
    let lineOps: string[] = [];
    let characters = line.split("")
    for (let i = 0; i < characters.length; i++) {
      if(isOpeningCharacter(characters[i])) {
        lineOps.push(characters[i])
      } else {
        if(wouldMatch(characters[i], lineOps[lineOps.length - 1])) {
          lineOps.pop();
        } else {
          return getPointsForChar(characters[i])
        }
      }
    }
    return 0;
  }

  const errorPoints = lines.map(followLineJourney).reduce((a, b) => a + b, 0)
  console.log(errorPoints)
})
