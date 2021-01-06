import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Nerdata } from '../src/Nerdata'

describe('Random', () => {
  it('custom function - success', () => {
    const nerdata = new Nerdata({ randomFn: () => 0 })
    const firstNames = Array.from(new Set(new Array(50).map(_ => nerdata.name.first())));
    expect(firstNames.length).to.equal(1);
  })
})
