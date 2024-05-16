<script>
export default {
  props: {
    post: Object,
  },
};
</script>

<template>
  <UCard class="item flex mb-2 h-full max-h-[300px]">
    <div class="item-text">
      <p>userId: {{ post?.userId }}</p>
    </div>
    <div class="item-text">
      <p>id: {{ post?.id }}</p>
    </div>
    <div class="item-text">
      <p>title: {{ post?.title }}</p>
    </div>
    <div class="item-text">
      <p>body: {{ post?.body }}</p>
    </div>
  </UCard>
</template>

<style lang="scss" scoped>
.item {

    &-text{
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

</style>
