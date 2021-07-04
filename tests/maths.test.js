const { calculateTips, censiusToFahrenheit, fahrenheitToCensius } = require("../src/maths")

test('Should Calculate  total with tip', () => {
   const total = calculateTips(10, .3);

   expect(total).toBe(13)
})

// test('should calculate eith default tip', () => {
//   const total = calculateTips(10)
  
//   expect(total).toBe(12.5)
// })

test('should convert 32 fahrenheit to 0 C', () => {
   const fh = fahrenheitToCensius(32);

   expect(fh).toBe(0)
})

test('should convert 0 C to 32 fahrenheit', () => {
  const C = censiusToFahrenheit(0);

  expect(C).toBe(32)
})

// test('should add two numbers', (done) => {
//   add(2, 3).then((sum) => {
//     expect(sum).toBe(5)
//     done()
//   })
// })



