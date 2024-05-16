<script setup lang="ts">
import { useRouter } from "vue-router";
import type { FormError, FormSubmitEvent } from "#ui/types";

const route = useRoute();
const { pending, data: post } = useLazyFetch(
  `https://jsonplaceholder.typicode.com/posts/${route.params.id}`
);

const isOpen = ref(false);
const isLoading = ref(false);

const state = reactive({
  title: post.value?.title,
  body: post.value?.body,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.title) errors.push({ path: "title", message: "Required" });
  if (!state.body) errors.push({ path: "body", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    isLoading.value = true;
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${route.params.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
          "API-Key": "secret",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    isOpen.value = false;
    isLoading.value = false;
  }
}
</script>
<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="app_grid">
      <Transition name="page" mode="out-in">
        <div class="w-full h-full" v-if="pending">
          <USkeleton
            class="flex items-center space-x-4 h-[250px] max-h-[250px]"
          />
        </div>
        <div v-else class="flex flex-col">
          <UCard class="item flex my-16 w-full h-fit">
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
          <UButton @click="isOpen = true" label="Редактировать" class="w-fit" />
          <Teleport to="body">
            <UModal v-model="isOpen">
              <div class="p-4">
                <UForm
                  :validate="validate"
                  :state="state"
                  class="space-y-4"
                  @submit="onSubmit"
                >
                  <UFormGroup label="title" name="title">
                    <UInput v-model="state.title" />
                  </UFormGroup>

                  <UFormGroup label="body" name="body">
                    <UInput v-model="state.body" />
                  </UFormGroup>

                  <UButton :loading="isLoading" type="submit">
                    Отправить
                  </UButton>
                </UForm>
              </div>
            </UModal>
          </Teleport>
        </div>
      </Transition>
    </div>
  </div>
</template>
