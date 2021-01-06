
export class Random {
  private randomFn: () => number
  constructor(randomFn: () => number) {
    this.randomFn = randomFn
  }

  public integer(from: number, to: number): number {
    return Math.floor(this.randomFn() * (to - from)) + from
  }

  // TODO: replace with <T>, once data is strongly typed
  public element(items: any[]): any {
    if (!items.length) {
      throw new Error('Cannot select item from empty array')
    }
    return items[this.integer(0, items.length)]
  }
}

