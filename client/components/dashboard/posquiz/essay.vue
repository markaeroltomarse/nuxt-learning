<template>
  <div >
        <div class="bg-light rounded border shadow-sm p-2 mb-2">
            <p><strong>Question {{question.number}}</strong></p>
            <div class="row">
                <div class="col ">
                    <small>Enter questions <span class="text-danger">*</span></small> 
                    <textarea @blur="isComplete" cols="30" rows="3" class="form-control" v-model="data.question">

                    </textarea>
                </div>
                
                <div class="col ">
                    <small>Description </small> 
                    <textarea @blur="isComplete" cols="30" rows="3" class="form-control" v-model="data.message">
                        
                    </textarea>
                </div>
            </div>



            <p class="text-center mt-2"><span class="text-link">Essay</span></p>
            <div class="">
                <small>Essay required word length: </small> 
                <input @blur="isComplete" type="number" class="form-control text-center" v-model="data.requiredLength">
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name:'Essay',
    props:{
        question:Object
    },

    data(){
        return {
            data:{
                type:'essay',
                question:'',
                requiredLength:'',
                message:''
            }
        }
    },

    methods:{
        isComplete(){
            if(this.data.question != '' & this.data.requiredLength != ''){
                return this.$store.commit('SUCCESS_OVERVIEW', {num:this.question.number, data:this.data})
            }

            return this.$store.commit('INC_OVERVIEW', this.question.number)
        }
    }
}
</script>

<style>

</style>