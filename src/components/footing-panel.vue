<template>

    <nav class="nav-bar">
        <div class="nav-inner">
            <span class="pi pi-home "></span>
            <span class="pi pi-home "></span>
            <span class="pi pi-home "></span>
            <span class="pi pi-home "></span>
            <!-- <account-name /> -->
            <!-- <account-name /> -->
        </div>
    </nav>
</template>

<script setup lang="ts">
</script>


<style scoped>
.nav-inner {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .6rem;
    flex-grow: 1;
    border-radius: 5px;
}

.nav-bar {
    padding: .6rem;
    padding-top: 0;
    background: rgb(0, 0, 0);
    user-select: none;
    pointer-events: none;
}

.nav-inner {
    padding: 10px;
}

span.pi {
    font-size: 2em;
}
</style>
