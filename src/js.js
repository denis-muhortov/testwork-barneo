import { useRouter } from "vue-router";
const store = useAppStore();
const router = useRouter();

const page = ref(store.pagination.page);
const limit = ref(store.pagination.limit);
const users = ref([]);
const userName = ref("");
const userNames = ref([]);
let isLoading = ref(false);

/**
 * Запрашивает юзеров
 * @returns Имена пользователей
 */
async function getUsers() {
  try {
    isLoading.value = true;

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    users.value = await response.json();

    userNames.value = users.value.map((item) => {
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

/**
 * Запрашивает пост пользователя
 * @param {Ref<string>} userName - Имя пользователя
 * @returns Пост пользователя
 */
async function getUserPosts(userName) {
  if (userName.value === "Не выбрано" || userName.value === "")
    return getPosts();
  try {
    isLoading.value = true;
    let user = users.value.find((user) => {
      return user.name === userName.value;
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user?.id}&_limit=${
        limit.value
      }&_start=${(page.value - 1) * limit.value}`
    );
    store.posts = await response.json();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

/**
 * Запрашивает посты
 * @returns Все посты
 */
async function getPosts() {
  try {
    isLoading.value = true;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${
        limit.value
      }&_start=${(page.value - 1) * limit.value}`
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

/**
 * Открывает пост пользователя
 * @param {Post} post - выбраный пост
 */
function openPost(post) {
  router.push({ path: `posts/${post.id}` });
}