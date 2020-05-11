<template>
  <div class="container">
    


    <div v-if="error.statusCode === 404" class=" p-2 text-center img-404" >
        <img src="../assets/undraw/404.png" alt="" width="100%">

        <h4 class="text-center" > 
            <nuxt-link to="/"><strong class=" text-info" style="text-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);">Back to home page</strong></nuxt-link> 
        </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>

<style scoped>
    .img-404{
        margin:10% 25%;
    }
</style>
