<template>
    <AppHeader></AppHeader>
    <div class="flex flex-row">
        <SideBar @category-changed="updateBookmarkList"/>
        
        <IndexPage v-if="bookmarkList.length > 0 " :items="bookmarkList"/>
        <div v-else>Bookmark bulunmamaktadır.</div>

    </div>
</template>
<script setup>
import SideBar from "@/components/Home/SideBar"
import { ref, onMounted, inject } from "vue";
import {useStore} from "vuex";
const bookmarkList = ref([]);
const appAxios = inject("appAxios");
const socket = inject("socket");
const store = useStore();


onMounted(() => {
  socket.on("NEW_BOOKMARK_ADDED", (bookmark) =>{
    bookmarkList.value.push(bookmark)
  });
});

const fetchData = () => {
        appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response => {
          bookmarkList.value = bookmark_list_response?.data || []  ;
      });
      //! bookmark olarak eklediklerimizi cekmek için user_bookmarks üzerinden çekelim
        appAxios.get("/user_bookmarks/?_expand=bookmark&_expand=user").then(user_bookmark_response => {
        store.commit("setBookmarks",user_bookmark_response?.data);
      });
      //! like olarak eklediklerimizi cekmek için user_likes üzerinden çekelim
      appAxios.get("/user_likes/?_expand=bookmark&_expand=user").then(user_like_response => {
        store.commit("setLikes",user_like_response?.data);
      });
    };
const updateBookmarkList = (categoryId) =>
{
      const url =categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`
      appAxios.get(url).then(bookmark_list_response => {
      console.log("bookmark_list_response : >>", bookmark_list_response);
      bookmarkList.value = bookmark_list_response?.data || []  ;
    });
  }

fetchData();
</script>