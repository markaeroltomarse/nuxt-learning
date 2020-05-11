<template>
   <section class="mx-5">
       <h1>Videos that in dot VUE</h1>
       <div class="">
           <div class="d-inline-block thumbnail shadow rounded p-2 border mr-2" style="width:10%;" v-for="video in $store.state.videos" :key="video.id">
               <div class="img-thumbnail  py-5 " :style="{backgroundImage: `url('https://www.vtracrobotics.com/wp-content/uploads/2018/07/video-thumbnail.jpg')`}">

               </div>
               
               <nuxt-link :to="'/videos/'+video.id">{{video.title}}</nuxt-link>
           </div>
       </div>
       
   </section>
</template>

<script>
export default {
    head:{
        title:'Uploaded Vidoes'
    },
    middleware:['authen'],
    name:'Videos',
    async asyncData({$axios, store}){
        let res = await $axios.get('https://jsonplaceholder.typicode.com/todos')

        let videos = res.data

        store.commit('SET_VIDEOS', res.data)


        return {
            videos
        }
    }
}
</script>

<style>

</style>