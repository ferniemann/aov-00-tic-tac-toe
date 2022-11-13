<script setup>
import { ref } from 'vue'
import game from './composables/game'
const { create2DArray, checkWinningCombo } = game()

const FIELD_SIZE = 3
const FIELD_ARRAY = create2DArray(FIELD_SIZE)
const GAME_FIELD = ref(FIELD_ARRAY)

const players = {
  one: 'x',
  two: 'o',
}
const endMessage = ref('')
const currentPlayer = ref(players.one)
const moves = ref(0)

function makeMove(row, column) {
  if (GAME_FIELD.value[row][column].length > 0 || endMessage.value) {
    return
  }

  GAME_FIELD.value[row][column] = currentPlayer.value
  moves.value++

  if (checkWinningCombo(GAME_FIELD.value)) {
    endGame('win', currentPlayer.value)
    return
  } else if (moves.value === 9) {
    endGame('draw')
    return
  }

  if (currentPlayer.value === players.one) {
    currentPlayer.value = players.two
  } else {
    currentPlayer.value = players.one
  }
}

function endGame(result, player) {
  if (result === 'win') {
    endMessage.value = `${result.toUpperCase()}! ${player.toUpperCase()} won!`
  } else {
    endMessage.value = `It's a ${result.toUpperCase()}!`
  }
}

function reloadPage() {
  window.location.href = '/'
}
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="game">
      <div
        class="row"
        v-for="(row, rowIndex) of GAME_FIELD"
        :key="rowIndex"
        :style="`grid-template-columns: repeat(${FIELD_SIZE}, 1fr)`"
      >
        <div
          class="field"
          v-for="(field, fieldIndex) of row"
          :key="rowIndex.toString() + fieldIndex"
          @click="makeMove(rowIndex, fieldIndex)"
        >
          <span class="move">{{ field }}</span>
        </div>
      </div>
      <div class="end-screen bg-green text-gray-dark p-3 text-center" v-if="endMessage">
        <p>{{ endMessage }}</p>
        <button @click="reloadPage()">Restart Game</button>
      </div>
    </div>
  </div>
</template>

<style>
.game {
  background-color: black;

  width: min(500px, 100%);

  display: grid;
  gap: 2px;

  position: relative;
}
.row {
  display: grid;
  gap: 2px;
}

.field {
  background-color: white;

  aspect-ratio: 1;

  position: relative;
}

.move {
  font-size: 15vmin;

  margin: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.end-screen {
  position: absolute;
  inset-inline: 0;
  top: -150px;
}
</style>
