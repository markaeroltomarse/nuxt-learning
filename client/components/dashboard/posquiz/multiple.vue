<template>
    <div>
        <div class="shadow-sm rounded border p-2 bg-light mb-2">
            <p><strong>Question {{numberFilt()}}</strong></p>
            <div v-if="spinner" class="text-center p-5">
                <v-progress-circular
                indeterminate
                color="teal"
                
                ></v-progress-circular>
                <small><strong>Please wait...</strong></small>
            </div>
            <form @submit.prevent="updateQuestion" v-else>
                <div class="row">
                    <div class="col ">
                        <small>Enter questions <span class="text-danger">*</span></small> 
                        <textarea required :disabled="duedated" :readonly="!editable" @blur="isComplete" v-model="data.question" cols="30" rows="3" class="form-control">

                        </textarea>
                    </div>

                    <div class="col ">
                        <small>Description <span class="text-danger">*</span> </small> 
                        <textarea :disabled="duedated" :readonly="!editable" @blur="isComplete" v-model="data.message" cols="30" rows="3" class="form-control">

                        </textarea>
                    </div>
                </div>
                <p class="text-center mt-2"><span class="text-link">MULTIPLE CHOICE</span></p>
                <div class="pb-3">
                    <input v :disabled="duedated" :readonly="!editable" @blur="isComplete" v-model="data.correct" type="text" class="form-control border border-success" placeholder="Enter correct answer *">
                    <div class="row  mt-3">
                        <div class="col">
                            <input required :disabled="duedated" :readonly="!editable" @blur="isComplete" v-model="data.wrong1" type="text" class="form-control border border-danger" placeholder="Enter wrong answer *">
                        </div>
                        <div class="col">
                            <input required :disabled="duedated" :readonly="!editable" @blur="isComplete" v-model="data.wrong2" type="text" class="form-control border border-danger" placeholder="Enter wrong answer *">
                        </div>
                        <div class="col">
                            <input required :disabled="duedated" :readonly="!editable" @blur="isComplete" v-model="data.wrong3" type="text" class="form-control border border-danger" placeholder="Enter wrong answer *">
                        </div>
                    </div>
                </div>
                <div class="text-right  py-1" v-if="updateBtn">
                    <v-btn type="submit" @click="updateQuestion" small color="teal" class="text-white">
                        UPDATE
                    </v-btn>
                </div>
            </form>

            
        </div> 
    </div>
</template>

<script>
export default {
    name:'Multiple',
    props:{
        one_question:{
            type:Object,
            default:null,
        },
        number:Number,
        quizID:String,

        //UPDATE PROPERSTIES
        editable:{
            type:Boolean,
            default:false,
        },
        update:{
            type:Boolean,
            default:false,
        },
        duedated:{
            type:Boolean,
            default:false
        },
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
            },
            updateBtn:false,
            spinner:false,
        }
    },

    methods:{
        isComplete(){
            
            
            if(this.data.question != '' & this.data.correct != '' & this.data.wrong1 != '' &  this.data.wrong2 != '' & this.data.wrong3 != ''){
                if(this.update) return 
                
                return this.$store.commit('SUCCESS_OVERVIEW', {num:this.one_question.number, data:this.data})
            }
            return this.$store.commit('INC_OVERVIEW', this.one_question.number)
        },
        numberFilt(){
            if(this.update) return this.number

            return this.one_question.number
        },
        updateQuestion(){
            this.spinner = true
            
            return this.$axios.post('/api/teacher/subject/quiz/updatequestion', {quizID:this.quizID, question:this.data})
            .then(res => {
                
                
                
                this.data = JSON.parse(JSON.stringify(res.data.filter(d => d._id == this.one_question._id)[0]))

                console.table(this.data)
                this.spinner = false
                this.updateBtn = false
                this.$emit('refresQuizes')
            })
            .catch(err => console.log(err))
        },

        watchInputs(){
            
            Object.keys(this.data).forEach(key => {
                if(key == '_id') return 
                
                this.$watch(
                    `data.${key}`, //what you want to watch
                    (newVal, oldVal) => {
                        //execute your code here
                        
                        if(this.update){
                            
                            return this.updateBtn = !(newVal.toLowerCase() == oldVal.toLowerCase())
                        }
                    }
                )
            })
            
        },
    },

    created(){
        if(this.update == false & this.editable) return

        this.data = JSON.parse(JSON.stringify(this.one_question))
        this.watchInputs()
    }
}
</script>

<style>

</style>