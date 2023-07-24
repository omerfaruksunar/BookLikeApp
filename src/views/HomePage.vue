<template>
    <AppHeader></AppHeader>
    <div class="flex flex-row">
        <SideBar @category-changed="updateBookmarkList"/>
        
        <IndexPage v-if="bookmarklist.length > 0 " :items="bookmarklist"/>
        <div v-else>Bookmark bulunmamaktadır.</div>

    </div>
</template>
<script>
import SideBar from "@/components/Home/SideBar"
export default {
    
  components : {
    SideBar
  },
  data() {
    return {
      bookmarklist : []
    }
  },
  
  mounted() {
    this.$socket.on("NEW_BOOKMARK_ADDED", (bookmark) =>{
      this.bookmarklist.push(bookmark)
    });
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
        this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response => {
        console.log("bookmark_list_response : >>", bookmark_list_response);
        this.bookmarklist = bookmark_list_response?.data || []  ;
      });
      //! bookmark olarak eklediklerimizi cekmek için user_bookmarks üzerinden çekelim
        this.$appAxios.get("/user_bookmarks/?_expand=bookmark&_expand=user").then(user_bookmark_response => {
        this.$store.commit("setBookmarks",user_bookmark_response?.data);
      });
      //! like olarak eklediklerimizi cekmek için user_likes üzerinden çekelim
      this.$appAxios.get("/user_likes/?_expand=bookmark&_expand=user").then(user_like_response => {
        this.$store.commit("setLikes",user_like_response?.data);
      });
    },
    updateBookmarkList(categoryId){
      const url =categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`
      this.$appAxios.get(url).then(bookmark_list_response => {
      console.log("bookmark_list_response : >>", bookmark_list_response);
      this.bookmarklist = bookmark_list_response?.data || []  ;
    });

    
  }
  },
};
</script>