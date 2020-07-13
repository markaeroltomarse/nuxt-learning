<template>
  <div class="container bg-light">
    


    <div v-if="error.statusCode === 404" class=" p-2 text-center img-404" >
        
        <div style="margin:5% 20%; text-align:center;">
          <nuxt-link to="/"><h4>Back to home page</h4></nuxt-link>
          <img src="../assets/undraw/404.png" width="100%" alt="">
         </div>
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
        margin:5% 10%;
    }
</style>
