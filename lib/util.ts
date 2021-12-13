import { open, close, readFile, writeFile } from 'fs';
import fetch from 'node-fetch';

interface Config {
  sessionCookie: string
}

/**
 * Deserialises the configuration from the filesystem
 */
const getConfig = async (): Promise<Config> => {
  return JSON.parse((await getFile('config.json')))
}

/**
 * Retrieves a file from the filesystem
 */
const getFile = async (targetFilename: string): Promise<string> => {
  return new Promise((res, rej) => {
    readFile(targetFilename, 'utf-8', (err, data) => {
      if (err) rej(err);
      res(data);
    })
  })
}

/**
 * Checks whether the file at the provided path exists
 */
const exists = async (filename: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    open(filename, 'r', (err, fd) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error(`${filename} does not exist`);
          res(false);
          return;
        }
        rej(err);
      } else {
        close(fd);
        res(true);
      }
    });
  })
}

/**
 * Writes a file to the filesystem
 */
const _writeFile = async (filename: string, data: string): Promise<void> => {
  return writeFile(filename, data, () => { });
}

/**
 * Retrieves the puzzle input for the provided day on the calendar
 */
const getPuzzleInput = async (day: number): Promise<string> => {
  const targetFilename = `./inputs/day${day}.txt`
  const fileExists = await exists(targetFilename);
  if (fileExists) {
    return getFile(targetFilename)
  } else {
    const config = await getConfig();
    if (config.sessionCookie === "paste_cookie_here") {
      throw new Error("Please take the session cookie from your browser and paste it in config.json")
    }
    const response = await fetch(`https://adventofcode.com/2021/day/${day}/input`, {
      method: 'GET', headers: {
        cookie: config.sessionCookie
      }
    })
    if (response.ok) {
      const text = await response.text();
      if (text.indexOf("Please don't repeatedly request") === 0) {
        throw new Error("");
      } else {
        writeFile(targetFilename, text, () => { });
      }
      return text;
    } else {
      throw new Error("Not sure what happened, but we did not get input text.");
    }
  }
}

interface GenericFunctionType {
  <T>(x: number, y: number, initVal: T): T[][]
}

interface GenenicMkRowFn {
  <T>(x: number, initVal: T): T[]
}

const init2dArray: GenericFunctionType = (x, y, initVal) => {
  let row = new Array(x).fill(initVal);
  let res: (typeof initVal)[][] = [];
  for (let i = 0; i < y; i++) {
    res.push([...row]);
  }
  return res;
}

declare global {
  interface Array<T>
  {
    groupBy<T, K>(func:(x:T) => K): Map<K, T[]>
    sum<T>(): number
  }
}

Array.prototype.groupBy = function<T, K>(this: T[], func: (x:T) => K) {
	let map = new Map<K, T[]>();
	this.forEach(item => {
		let itemKey = func(item);
		if (map.has(itemKey))
      map.get(itemKey)!.push(item)
		else 
			map.set(itemKey, [item]);
	});
	return map;
}

export { getPuzzleInput, exists, _writeFile as writeFile, init2dArray }