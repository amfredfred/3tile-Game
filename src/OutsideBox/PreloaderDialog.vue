<template>
        <div class="preloader">
            <div class="loader"></div>
            <div class="loading-text">Loading...</div>
        </div>
</template>

<script setup lang="ts">

</script>

<style scoped >
.preloader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: var(--container-bg);
    width: 100vw;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    /* Adjust height as needed */
}

.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    /* Loader color */
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
}

.loading-text {
    font-size: 18px;
    color: #555;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
