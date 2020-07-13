<template>
  <div >
        <div :class="duedated ? 'duedated' :'' +'bg-light rounded border shadow-sm p-2 mb-2' " >
            <p><strong>Question {{numberFilt()}} </strong></p>
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
                        <textarea required  :disabled="duedated" :readonly="!editable" @blur="isComplete" cols="30" rows="3" class="form-control" v-model="data.question">

                        </textarea>
                    </div>
                    
                    <div class="col ">
                        <small>Description <span class="text-danger">*</span></small> 
                        <textarea :disabled="duedated" :readonly="!editable" @blur="isComplete" cols="30" rows="3" class="form-control" v-model="data.message">
                            
                        </textarea>
                    </div>
                </div>


                
                <p class="text-center mt-2"><span class="text-link">Essay</span></p>
                <div class="">
                    <small>Essay required word length: </small> 
                    <input required :disabled="duedated" :readonly="!editable" @blur="isComplete" type="number" class="form-control text-center" v-model="data.requiredLength">
                </div>
                <div class="text-right  py-1" v-if="updateBtn">
                    <v-btn @click="updateQuestion" small color="teal" class="text-white">
                        UPDATE
                    </v-btn>
                </div>
            </form>
        </div> 
    </div>
</template>

<script>


export default {
    middleware:['authen'],
    name:'Essay',
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
                type:'essay',
                question:'',
                requiredLength:'',
                message:'',
                _id:'',
            },
            updateBtn:false,
            spinner:false,
        }
    },

    methods:{
        
        isComplete(){
            
            if(this.data.question != '' & this.data.requiredLength != '' ){
                if(this.update) return 
                
                return this.$store.commit('SUCCESS_OVERVIEW', {num:this.one_question.number, data:this.data})
            }
            return this.$store.commit('INC_OVERVIEW', this.one_question.number)
        },
        numberFilt(){
            try{
                if(this.update) return this.number

                return this.one_question.number
            }catch(err){
                return err
            }
        },
        updateQuestion(){
            this.spinner = true
            
            return this.$axios.post('/api/teacher/subject/quiz/updatequestion', {quizID:this.quizID, question:this.data})
            .then(res => {
            
                
                this.data = JSON.parse(JSON.stringify(res.data.filter(d => d._id == this.one_question._id)[0]))

                
                this.spinner = false
                this.updateBtn = false
                this.$emit('refresQuizes')
            })
            .catch(err => console.log(err))
        },


        watchInputs(){
            //FOR UPDATES
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

<style scoped>
.duedated{
   cursor: not-allowed;
   pointer-events: all !important;
}
</style>