import assert from 'assert'
import Recurrence from '../src/index.js'

describe('Recurrence', () => {

  describe('match', () => {

    it('daily', () => {
      let r = new Recurrence({
        start: '2016/06/22',
      })

      assert.equal(r.match('2016/06/21'), false)
      assert.equal(r.match('2016/06/22'), true)
      assert.equal(r.match('2016/06/23'), true)
    })

  })

})
