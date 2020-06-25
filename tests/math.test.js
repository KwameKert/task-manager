const {add}  = require('../playground/async-await')

test('First test', async()=>{

    const sum = await add(3, 4);
    expect(sum).toBe(7)
})