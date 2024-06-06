<template>

    <nav class="nav-bar">
        <div class="nav-inner">
            <v-progress-linear style="border-radius: 50px;" color="light-blue" height="10" model-value="100"
                striped></v-progress-linear>
            <div class="white-bar"></div>
            <!-- <span class="pi pi-home "></span>
            <span class="pi pi-home "></span>
            <span class="pi pi-home "></span>
            <span class="pi pi-home "></span> -->
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
    justify-content: center;
    gap: 2rem;
    border-radius: 5px;

}

.white-bar {
    width: 60%;
    border-radius: 50px;
    background: white;
    height: 10px;
}

.nav-bar {
    padding-top: 0;
    user-select: none;
    pointer-events: none;
    width: 100%;
    margin-top: auto;
}

.nav-inner {
    padding: 10px;
}

span.pi {
    font-size: 2em;
}
</style>
