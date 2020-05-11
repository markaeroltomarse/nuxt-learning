<template>
    <div class="bg-light pt-3">
        <dashDefault/>
        <section class="documentBody px-0 bg-white text-secondary" data-aos="zoom-in">
            <h4 class="bg-info px-3 py-1 text-white"><strong>BSIT</strong> - 
            <span class="text-light">New subject in {{semester}} semester</span></h4>

            <div class="newsub-panel">
                <div class="p-3">
                    <form @submit.prevent="newsubjectSubmit">
                        <small><strong>Subject code:</strong></small>
                        <input type="text" class="form-control" >

                        <small><strong>Subject name:</strong></small>
                        <input type="text" class="form-control" >

                        <small><strong>Subject unit:</strong></small>
                        <input type="number" class="form-control" >

                        <small><strong>Subject year:</strong></small>
                        <select class="form-control">
                            <option selected :value="{val:'default'}">Select year</option>
                            <option  :value="{val:'2020 - 2021'}">2020 - 2021</option>
                            <option  :value="{val:'2021 - 2022'}">2021 - 2022</option>
                        </select>

                        <small><strong>Description:</strong></small>
                        <textarea class="form-control" cols="30" rows="5"></textarea>
                    </form>
                </div>
                <div class="p-3 text-center">
                    <img width="100%" src="../../../../assets/undraw/createsub.png" alt="">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, quas.</p>
                </div>
            </div>

            <div class="text-center py-5 bg-light">
                <button class="btn btn-info">SUBMIT</button><br>
                <small class="text-secondary">BSIT - FIRST SEMESTER </small>
            </div>
            
        </section>
    </div>
</template>

<script>

import dashDefault from '../../../../components/dashboard'

export default {
    middleware:['authen', 'master'],
    components:{
        dashDefault
    },
    data(){
        return {
            semester:this.$route.query.semester,
            courseID:this.$route.params.id
        }
    },
    async asyncData({store}){
        store.dispatch('SET_USER')
    }
}
</script>

<style scoped>
.newsub-panel{
    display:grid;
    grid-template-columns:1.5fr 1fr;
}


</style>
