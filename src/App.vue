<script setup lang="ts">
import { RouterView, } from 'vue-router'
import { useMainStore } from '@/stores/mainstore';
import { onMounted } from 'vue';
import Toast from 'primevue/toast';

const _store = useMainStore()

onMounted(() => {


  ((window as any).Telegram) = {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: 6033850568
        } as any
      } as any
    }
  } as any


  _store.setUser({
    first_name: 'dev fred fred',
    username: 'userdev',
    id: 6033850568
  })

})

</script>

<template>
  <div class="main-container">
    <div class="contents-wrapper">
      <div style=''>
        <RouterView />
      </div>
    </div>
    <Toast />
  </div>
</template>


<style scoped>
.main-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  width: 498px;
  max-width: 100dvw;
  overflow: hidden;
  flex-wrap: wrap;
  margin-inline: auto;
  background: black;
  /* border-radius: 20px 20px 0 0; */
}


.contents-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden auto;
}
</style>