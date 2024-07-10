<template>
    <div class="cell" :class="cell.player" @click="$emit('click')"></div>
</template>

<script>
export default {
    props: ['cell']
};
</script>

<style>
.cell {
    width: 50px;
    height: 50px;
    border: thick solid #0d5e5e;
    background: #a09999;
    border-radius: 50px;
    cursor: pointer;
}

.cell.red {
    background-color: red;
}

.cell.yellow {
    background-color: yellow;
}
</style>
