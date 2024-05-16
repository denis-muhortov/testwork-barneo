<script setup lang="ts">
import { useRouter } from "vue-router";
const route = useRoute();
const { pending, data: post } = useLazyFetch(
  `https://jsonplaceholder.typicode.com/posts/${route.params.id}`
);
</script>
<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="app_grid">
            <div class="w-full h-full" v-if="pending">
                <USkeleton class="flex items-center space-x-4 h-[250px] max-h-[250px]"/>
            </div>
            <UCard v-else class="item flex my-16 w-full h-fit">
                <p>
                <span class="font-bold"> userId: </span>
                {{ post?.userId }}
                </p>
                <p>
                <span class="font-bold"> id: </span>
                {{ post?.id }}
                </p>
                <p>
                <span class="font-bold"> title: </span>
                {{ post?.title }}
                </p>
                <p>
                <span class="font-bold"> body: </span>
                {{ post?.body }}
                </p>
            </UCard>
        </div>
    </div>
</template>
