<template>
  <div v-if="this.$store.state.dashboard.postquiz.overviewNumbers.length > 0" data-aos="fade-left" class="overview bg-white shadow rounded">
      <div :class="`bg-${num.status} ${num.status == 'success' ? 'shadow border' : '' }`" v-for="num in this.$store.state.dashboard.postquiz.overviewNumbers" :key="num.number">
          {{num.number}}
      </div>
  </div>
</template>

<script>
export default {
    name:'Overview',
    props:{
        overviewNumbers:[Object]
    }
}
</script>

<style scoped>
.overview{
    position:fixed;
    width:17%;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding:1em;
    top:4%;
    right:4%;
    z-index:30;
    grid-gap:1em;
}

.overview > div{
    border-radius:50%;
    padding:5px;
    text-align: center;
    color:white;
    
}
</style>