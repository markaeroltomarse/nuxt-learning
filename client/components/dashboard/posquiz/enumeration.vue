<template>
    <div >
        <div class="bg-light rounded border shadow-sm p-2 mb-2" >
            <p>
                <strong>Question {{question.number}} </strong> 
            </p>
            <div class="row">
                <div class="col ">
                    <small>Enter questions <span class="text-danger">*</span></small> 
                    <textarea  @blur="isComplete" cols="30" rows="3" class="form-control" v-model="data.question" >
                        
                    </textarea>
                </div>
                
                <div class="col ">
                    <small>Description </small> 
                    <textarea cols="30" rows="3" class="form-control" v-model="data.message">

                    </textarea>
                </div>
            </div>

            <p class="text-center mt-2"><span class="text-link">Enumeration</span></p>
            <input @blur="isComplete" type="text" class="form-control border border-success" placeholder="Enter correct answer" v-model="data.answer">

           
        </div> 
    </div>
</template>

<script>
export default {
    name:'Enumaration',
    props:{
        question:Object
    },
    data(){
        return {
            status:'danger',
            data:{
                type:'enum',
                question:'',
                message:'',
                answer:''
            }
        }
    },
    methods:{
        isComplete(){
            if(this.data.question != '' & this.data.answer != ''){
                
                return this.$store.commit('SUCCESS_OVERVIEW', {num:this.question.number, data:this.data})
            }

            return this.$store.commit('INC_OVERVIEW', this.question.number)
        }
    },
    computed:{
        status(){
            return 'badge-'+this.status
        }
    }
}
</script>

<style scoped>

</style>