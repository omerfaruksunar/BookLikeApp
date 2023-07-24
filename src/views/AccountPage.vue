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

<script>
import AppHeader from '@/components/Shared/AppHeader.vue';
import SideBar from '@/components/Account/SideBar.vue';

export default {
    components : {
        AppHeader,
        SideBar,
    },
    data() {
        return {
            bookmarklist : [],
            }
        },
    // created() {
    //     // this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response => {
    //     // console.log("bookmark_list_response : >>", bookmark_list_response);
    //     // this.bookmarklist = bookmark_list_response?.data || []  ;
    // // });
    // },

    // mounted() {
    //     this.$socket.on("WELCOME_MESSAGE",this.WELCOME_MESSAGE);
    // },

    // methods: {
    //     // WELCOME_MESSAGE(data) {
    //     //     console.log(data);
    //     // },
    //     // SEND_MESSAGE(e){
    //     //     // console.log(e.target.value);
    //     //     this.$socket.emit("SEND_MESSAGE",e.target.value);
    //     // }
    // },




}
</script>