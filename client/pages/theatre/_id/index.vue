<template>
    <div class="mx-5">
        <h4>{{video.title}}</h4>

        <div class="rounded shadow bg-secondary " style="padding:20% 0px;">

        </div>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title:'Watch | '+this.video.title
        }
    },
    async asyncData({$axios, params}){
        let res = await $axios.get('https://jsonplaceholder.typicode.com/todos/'+params.id)
        
        let video = res.data

        return {
            video
        }
    }
}
</script>

<style>

</style>