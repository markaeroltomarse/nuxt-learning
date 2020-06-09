<template>
    <div>
        <div class="shadow-sm rounded border p-2 bg-light mb-2">
            <p><strong>Question {{question.number}}</strong></p>
            
            <div class="row">
                <div class="col ">
                    <small>Enter questions <span class="text-danger">*</span></small> 
                    <textarea :readonly="editable" @blur="isComplete" v-model="data.question" cols="30" rows="3" class="form-control">

                    </textarea>
                </div>

                <div class="col ">
                    <small>Description </small> 
                    <textarea :readonly="editable" @blur="isComplete" v-model="data.message" cols="30" rows="3" class="form-control">

                    </textarea>
                </div>
            </div>
            <p class="text-center mt-2"><span class="text-link">MULTIPLE CHOICE</span></p>
            <div class="pb-3">
                <input @blur="isComplete" v-model="data.correct" type="text" class="form-control border border-success" placeholder="Enter correct answer">
                <div class="row  mt-3">
                    <div class="col">
                        <input :readonly="editable" @blur="isComplete" v-model="data.wrong1" type="text" class="form-control border border-danger" placeholder="Enter wrong answer">
                    </div>
                    <div class="col">
                        <input :readonly="editable" @blur="isComplete" v-model="data.wrong2" type="text" class="form-control border border-danger" placeholder="Enter wrong answer">
                    </div>
                    <div class="col">
                        <input :readonly="editable" @blur="isComplete" v-model="data.wrong3" type="text" class="form-control border border-danger" placeholder="Enter wrong answer">
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name:'Multiple',
    props:{
        question:Object,
        editable:false,
    },

    data(){
        return {
            data:{
                type:'multi',
                question:'',
                message:'',
                correct:'',
                wrong1:'',
                wrong2:'',
                wrong3:''
            }
        }
    },

    methods:{
        isComplete(){
            if(this.data.question != '' & this.data.correct != '' & this.data.wrong1 != '' &  this.data.wrong2 != '' & this.data.wrong3 != ''){
                return this.$store.commit('SUCCESS_OVERVIEW', {num:this.question.number, data:this.data})
            }

            return this.$store.commit('INC_OVERVIEW', this.question.number)
        }
    }
}
</script>

<style>

</style>