const MinecraftUtils = { // eslint-disable-line no-unused-vars
  minecraftVersionToNumberArray: function (version) {
    let numbers = version.split('.')
    if (numbers.length < 3) {
      for (let i = 0; i < 3 - numbers.length; ++i) {
        numbers.push(0)
      }
    }

    return numbers.map(number => parseInt(number))
  },
  minecraftVersionsToNumbers: function (numbers) {
    // initial numbers : 1.10, 1.7.9, 1.11.2 ( 1.7.9 < 1.10 < 1.11.2 )
    //          result : 1100,  1079, 1112   (  1079 < 1100 < 1112 )

    // handle string arrays
    if (Array.isArray(numbers) && numbers.length > 0 && typeof (numbers[0]) === 'string') {
      let tmp = []

      for (let i = 0; i < numbers.length; ++i) {
        tmp.push(this.minecraftVersionToNumberArray(numbers[i]))
      }

      numbers = tmp
    }

    let result = []

    // looking for max numbers count
    let maxNumbersCount = -1
    for (let i = 0; i < numbers.length; ++i) {
      if (numbers[i].length > maxNumbersCount) { maxNumbersCount = numbers[i].length }

      result.push('0') // we need this number to have a number to parse at the end
    }

    for (let a = 0; a < maxNumbersCount; ++a) {
      // if it' the first number, we just add it to the end
      if (a === 0) {
        for (let i = 0; i < numbers.length; ++i) {
          result[i] += String(numbers[i][a])
        }
      } else {
        // else we need to add additional zeros equals to the difference of letters with max number
        // 0, 20, 600 -> 000, 020, 600

        // first we find the maxDigits for this number
        let maxDigits = -1
        for (let i = 0; i < numbers.length; ++i) {
          if (String(numbers[i][a] || '').length > maxDigits) {
            maxDigits = String(numbers[i][a] || '').length
          }
        }

        // then for each nuber we add the difference of zeros
        for (let i = 0; i < numbers.length; ++i) {
          for (let b = 0; b < maxDigits - String(numbers[i][a] || '').length; ++b) {
            result[i] += '0'
          }

          // finally we push the number
          result[i] += String(numbers[i][a] || '')
        }
      }
    }

    return result.map(number => parseInt(number))
  }
}
