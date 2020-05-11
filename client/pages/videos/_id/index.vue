<template>
    <div class="mx-5 py-2">
        <h4><strong>Title</strong></h4>
        <h1>{{video.title}} </h1>
        <nuxt-link :to="`${video.id}/edit`"><button class="btn btn-primary">Edit</button></nuxt-link>
        <nuxt-link :to="'/theatre/'+video.id"><button class="btn btn-outline-dark ">Watch</button> </nuxt-link>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title:`${this.video.id} - ${this.video.title}`
        }
    },
    async fetch({$axios, params, store}){
        let res = await $axios.get('https://jsonplaceholder.typicode.com/todos/'+params.id)

        let video = res.data


        store.commit('SET_CURRENT_VIDEO', res.data)
    },

    computed:{
        video(){
            return this.$store.state.currentVideo
        }
    }
    

}
</script>

<style>

</style>