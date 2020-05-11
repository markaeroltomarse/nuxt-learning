<template>
    <div class="documentBody bg-white" data-aos="fade-up">
        <h4><strong>Posted quiz</strong></h4>

        <p>{{$store.state.dashboard.data}}</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .documentBody{
        margin-top:1%;
        min-height:100vh;
        margin:0px 20%;
        border:1px solid rgba(0,0,0,0.03);
        box-shadow:0px 10px 20px 0px rgba(0,0,0,0.3);
        padding:1em 2em;
    }

    .documentBody:hover{
        transition:0.2s;
        box-shadow:0px 10px 10px 0px rgba(0,0,0,0.3);
    }
</style>