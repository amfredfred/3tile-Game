<template>
    <div class="board">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
            <Cell v-for="(cell, colIndex) in row" :key="colIndex" :cell="cell" @click="dropDisc(colIndex)" />
        </div>
        <div v-if="winner" class="winner">Winner: {{ winner }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Cell from '@/views/Games/Connect4/components/Connect4Cell.vue';

const board = ref(initializeBoard());
const currentPlayer = ref('red');
const winner = ref<any>(null);

function initializeBoard() {
    const rows = 4;
    const columns = 4;
    return Array.from({ length: rows }, () => Array(columns).fill({ player: null }));
}

function dropDisc(column: any) {
    if (winner.value) return;

    for (let row = board.value.length - 1; row >= 0; row--) {
        if (!board.value[row][column].player) {
            board.value[row][column] = { player: currentPlayer.value };
            if (checkWin(row, column)) {
                winner.value = currentPlayer.value;
            } else {
                console.log('HE:: WORLd', board.value.length - 1)
                currentPlayer.value = currentPlayer.value === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

function checkWin(row: any, col: any) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
    );
}

function checkDirection(row: any, col: any, rowDir: any, colDir: any) {
    let count = 0;
    const player = board.value[row][col].player;

    for (let i = -3; i <= 3; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;

        if (
            newRow >= 0 && newRow < board.value.length &&
            newCol >= 0 && newCol < board.value[0].length &&
            board.value[newRow][newCol].player === player
        ) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}


</script>

<style>
.board {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: max-content;
    height: max-content;
    background: rgb(1, 1, 1);
    padding: 1rem;
}

.row {
    display: flex;
}

.winner {
    margin-top: 20px;
    font-size: 24px;
    color: green;
}
</style>
