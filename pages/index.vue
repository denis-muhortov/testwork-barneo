<script setup lang="ts">
import { useRouter } from "vue-router";
import { type Post, type User } from "../interface/interface";
const store = useAppStore();
const router = useRouter();

const page: Ref<number> = ref(store.pagination.page);
const limit: number = store.pagination.limit;
const users: Ref<User[]> = ref([]);
const userName: Ref<string> = ref("");
const userNames: Ref<string[]> = ref([]);
let isLoading: Ref<boolean> = ref(false);

async function getUsers() {
  try {
    isLoading.value = true;

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    users.value = await response.json();

    userNames.value = users.value.map((item: User) => {
      return item["name"];
    });
    userNames.value.unshift("Не выбрано");
    userName.value = "Не выбрано";
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
getUsers();

async function getUserPosts(userName: Ref<string>) {
  if (userName.value === "Не выбрано" || userName.value === "")
    return getPosts();
  try {
    isLoading.value = true;
    let user: User | undefined = users.value.find((user: User) => {
      return user.name === userName.value;
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user?.id}`
    );
    store.posts = await response.json();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function getPosts() {
  try {
    isLoading.value = true;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=20&_start=${
        (page.value - 1) * limit
      }`
    );
    store.posts = await response.json();
    store.pagination.page = page.value;

    userName.value = "Не выбрано";
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
getPosts();

function openPost(post: Post) {
  router.push({ path: `posts/${post.id}` });
}

watch(
  page,
  async () => {
    getPosts();
  },
  { immediate: true }
);
watch(
  userName,
  async () => {
    getUserPosts(userName);
  },
  { immediate: true }
);
</script>

<template>
  <div class="screen">
    <div class="app_grid">
      <div class="flex w-full h-full flex-col justify-between items-center">
        <div
          class="flex flex-col w-full justify-between items-center sm:flex-row"
        >
          <USelect
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search..."
            v-model="userName"
            :options="userNames"
            class="mb-5 sm:mb-0"
          />
          <UPagination
            :prev-button="{
              icon: 'i-heroicons-arrow-small-left-20-solid',
              label: 'Назад',
              color: 'gray',
            }"
            :next-button="{
              icon: 'i-heroicons-arrow-small-right-20-solid',
              trailing: true,
              label: 'Вперед',
              color: 'gray',
            }"
            v-model="page"
            size="md"
            :page-count="5"
            :total="25"
          />
        </div>

        <div class="container" v-if="isLoading">
          <USkeleton
            class="flex items-center space-x-4 h-[250px] max-h-[250px]"
            v-for="i in 20"
            :key="i"
          />
        </div>
        <div class="container" v-else>
          <div v-for="post in store.posts" :key="post.id">
            <thePost :post="post" @click="openPost(post)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.screen {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.container {
  width: 100%;
  min-height: calc(100vh - 100px);
  height: calc(100vh - 100px);
  padding: 20px;
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
}
@media screen and (max-width: 1480px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1050px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 800px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
