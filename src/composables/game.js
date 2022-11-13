export default function () {
  function create2DArray(size) {
    const outerArr = []

    for (let i = 0; i < size; i++) {
      const innerArr = []

      for (let j = 0; j < size; j++) {
        innerArr.push('')
      }

      outerArr.push(innerArr)
    }

    return outerArr
  }

  function isWin(fields) {
    return fields.replaceAll('x', '').length === 0 || fields.replaceAll('o', '').length === 0
  }

  function checkWinningCombo(gameField) {
    /* Check row */
    for (let rowIndex = 0; rowIndex < gameField.length; rowIndex++) {
      const row = gameField[rowIndex].join('')
      if (row.length === gameField.length) {
        return isWin(row)
      }
    }

    // /* Check column */
    const column = Array(gameField.length).fill('')
    for (let rowIndex = 0; rowIndex < gameField.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < gameField.length; columnIndex++) {
        column[columnIndex] += gameField[rowIndex][columnIndex]

        const currentColumn = column[columnIndex]
        console.log(currentColumn)
        if (currentColumn.length === gameField.length) {
          return isWin(currentColumn)
        }
      }
    }

    /* Check diagonals */
    const diagonals = ['', '']
    for (let i = 0, j = gameField.length - 1; i < gameField.length, j >= 0; i++, j--) {
      diagonals[0] += gameField[i][i]
      diagonals[1] += gameField[i][j]

      for (let combination of diagonals) {
        if (combination.length === gameField.length) {
          return isWin(combination)
        }
      }
    }
  }

  return { create2DArray, checkWinningCombo }
}
