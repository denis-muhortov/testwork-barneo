<script setup lang="ts">
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const page = ref(1);
    const limit = ref(20);
    const users = ref({})
    const userName = ref('')
    const usersName = ref([])

    const dataPosts = ref(null);
    let isLoading = ref(false);

    async function getUsers() {
        try {
            isLoading.value = true;

            const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
            users.value = await response.json();

            usersName.value = users.value.map(function(item) { return item["name"]; });
            usersName.value.unshift('Не выбрано')
            userName.value = 'Не выбрано'
        } catch (error) {
            console.log(error)   
        } finally {
            isLoading.value = false
        }
    }
    getUsers()

    async function getUserPosts(userName) {
        try {
            isLoading.value = true;

            if (userName.value === 'Не выбрано' || userName.value === '') return
            let user = users.value.find((user)=> {return user.name === userName.value})

            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            dataPosts.value = await response.json()

        } catch (error) {
            console.log(error)   
        } finally {
            isLoading.value = false
        }
    }

    async function getPosts() {
        try {
            isLoading.value = true;

            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=20&_start=${(page.value-1)*limit.value}`)
            dataPosts.value = await response.json()

            userName.value = 'Не выбрано'
        } catch (error) {
            console.log(error)   
        } finally {
            isLoading.value = false
        }
    }
    getPosts()


    function openPost(post){
        //router.push(`posts/${post.id}`)
        router.push({ path: `posts/${post.id}`})
    }


    watch(
        page,
        async () => {getPosts()},
        { immediate: true }
    )
    watch(
        userName,
        async () => {getUserPosts(userName)},
        { immediate: true }
    )
</script>

<template>
    <div class="screen">
        <div class="app_grid">
            <div class="flex w-full h-full flex-col justify-between items-center">
                <div class="flex w-full justify-between items-center">
                    <USelect
                        icon="i-heroicons-magnifying-glass-20-solid"
                        placeholder="Search..."
                        v-model="userName" 
                        :options="usersName" 
                    />
                    <UPagination 
                        :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Назад', color: 'gray' }"
                        :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Вперед', color: 'gray' }"
                        v-model="page" 
                        size="md"
                        :page-count="5" 
                        :total="25" 
                    />
                </div>
                <div class="container" v-if="isLoading">
                    <USkeleton class="flex items-center space-x-4 h-[250px] max-h-[250px]" v-for="i in 20" :key="i"/>
                </div>
                <div class="container" v-else>
                    <div v-for="post in dataPosts" :key="post.id">
                        <thePost :post="post" @click="openPost(post)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.screen{
    width: 100%;
    height: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.container{
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
</style>