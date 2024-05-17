<script>
import { useAppStore } from "./stores/store";
export default {
  data: () => ({
    store: useAppStore(),
  }),
};
</script>

<template>
  <div class="app">
    <main class="app-screen">
      <NuxtLayout>
        <NuxtLoadingIndicator
          color="white"
          :height="5"
          :throttle="0"
          :duration="1000"
        />
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>

<style lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &-screen {
    width: 100vw;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
.app_grid {
  width: 1440px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1480px) {
  .app_grid{
    width: 1024px;
  }
}
@media screen and (max-width: 1050px) {
  .app_grid{
    width: 768px;
  }
}
@media screen and (max-width: 800px) {
  .app_grid{
    width: 100%;
    padding: 0 20px;
  }
}
</style>
