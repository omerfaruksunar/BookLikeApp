<template>
    <AppHeader></AppHeader>
    <div class="flex flex-row">
        <SideBar/>
        <!-- <div class="socket">
            <input type="text" @keydown.enter="SEND_MESSAGE">
        </div> -->
        <!-- <IndexPage v-if="bookmarklist.length > 0 " :items="bookmarklist"/>
        <div v-else>Bookmark bulunmamaktadır.</div> -->
    </div>
</template>

<script setup>
import AppHeader from '@/components/Shared/AppHeader.vue';
import SideBar from '@/components/Account/SideBar.vue';
import { ref,inject } from 'vue';
const appAxios = inject("appAxios");
const bookmarklist =ref([]);

appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response => {
        bookmarklist.value = bookmark_list_response?.data || []  ;
    });
</script>