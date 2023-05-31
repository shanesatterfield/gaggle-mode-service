export function calculateMode(values: number[]): number | undefined {
  // Store the number of occurances of each value
  const counter = new Map<number, number>();

  // Populate the counter map
  for (const num of values) {
    const occurances = counter.get(num);
    const newOccurances = (occurances ?? 0) + 1;
    counter.set(num, newOccurances);
  }

  // Find the largest value and return as the mode
  let largestValue: number | undefined = undefined;
  let occurances = 0;

  for (const [key, value] of counter.entries()) {
    if (value > occurances) {
      largestValue = key;
      occurances = value;
    }
  }

  return largestValue;
}
