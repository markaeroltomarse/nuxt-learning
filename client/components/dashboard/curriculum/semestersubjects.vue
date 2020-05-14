<template>
    <div>
        <carousel speed="300" :per-page="4" class="px-3 w-100 bg-light" paginationColor="turquoise" paginationActiveColor="teal">
            <slide

                
                v-for="subject in subjects" 
                :key="subject._id"
                data-aos="flip-up"
                
                class="hoverSub my-3 mr-1"
                
                data-index="0"
                data-name="MySlideName"
                
                :mouse-drag="true"

                @slideclick="directToSub(subject._id)">
                <div>
                    <img class="rounded-top" src="../../../assets/subjectsimage/pexels-photo-160107.jpeg" width="100%" alt="">
                </div>

                <div class="p-2">
                    <strong style="font-size:13px;">{{subject.name}}</strong><br>
                    <small class="text-secondary">by DIT. Fahad</small>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
import {Carousel, Slide } from 'vue-carousel'

export default {
    name:'semesterSubjects',
    data(){
        return {
            courseID:this.$route.params.id
        }
    },
    props:{
        subjects:Array
    },
    components:{
        Carousel, Slide
    },
    methods:{
        directToSub(ref){
            alert(ref)
            return this.$router.replace({path:`/dashboard/curriculum/${this.courseID}/subject?ref=${ref}`})
        }
    },

    created(){
       
    }
}
</script>

<style scoped>
.hoverSub{
    transition:0.2s;
    cursor:pointer;
    border-radius:5px;
}

.hoverSub:hover{
    transition:0.2s;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.1);
    background-color:white;
    color:teal;
}
</style>
