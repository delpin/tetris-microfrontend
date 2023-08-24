export const generateEmptyMatrix = (line: number, columns: number): number[][] => 
new Array(line).fill(0).map(() =>  new Array(columns).fill(0) as number[])