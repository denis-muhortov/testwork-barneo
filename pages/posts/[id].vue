<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import type { Post } from "~/interface/interface";

const state = reactive({
  title: '' as string,
  body: '' as string,
});

const route = useRoute();
const { pending, data: post } = useLazyFetch<Post>(
  `https://jsonplaceholder.typicode.com/posts/${route.params.id}`,{
    onResponse({ request, response, options }) {
      state.title = response._data?.title;
      state.body = response._data?.body;
  },
  }
);

const isOpen: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

/**
 * Валидация формы
 * @param {any} state - Объект формы
 * @returns Ошибка если не соответствует правилу валидации
 */
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.title) errors.push({ path: "title", message: "Required" });
  if (!state.body) errors.push({ path: "body", message: "Required" });
  return errors;
};

/**
 * Отправка формы
 */
async function onSubmit() {
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
    </div>
  </div>
</template>
