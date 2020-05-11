<template>
    <div class="bg-light pt-3">
        <dashDefault/>
        <section class="documentBody px-0 bg-white text-secondary" data-aos="zoom-in">
            <div v-if="spinner" class="text-center"  >
                <div class="spinner-border text-info mx-auto" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <form v-else @submit.prevent="newsubjectSubmit">
                <h4 class="bg-info px-3 py-1 text-white"><strong>BSIT</strong> - 
                <span class="text-light">New subject in {{semester}} semester</span></h4>

                <div class="newsub-panel">
                    <div class="p-3">
                        <small><strong>Subject code:</strong></small>
                        <input v-model="code" type="text" class="form-control" required>

                        <small><strong>Subject name:</strong></small>
                        <input v-model="name" type="text" class="form-control" required>

                        <small><strong>Subject units:</strong></small>
                        <input v-model="units" type="number" class="form-control" required>

                        <small><strong>Subject year:</strong></small>
                        <select v-model="year" class="form-control" >
                            <option selected :value="{val:''}">Select year</option>
                            <option  :value="{val:'2020 - 2021'}">2020 - 2021</option>
                            <option  :value="{val:'2021 - 2022'}">2021 - 2022</option>
                        </select>

                        <small><strong>Description:</strong></small>
                        <textarea v-model="desc" class="form-control" cols="30" rows="5"></textarea>

                        <input ref="subfile" type="file" hidden @change="changeImg" >

                        <small>Subject image:</small>
                        <div @click="openFile" :style="{backgroundImage:`url('${selectedImgBg}')`}" class="subjectimg border rounded w-100 text-center">
                            <small :class="selectedImg == null ? '' : 'text-danger'">{{selectdImgtxt == null ? selectdImgtxt : 'Remove this image'}}</small>
                        </div>
                    </div>
                    <div class="p-3 text-center">
                        <img width="100%" src="../../../../assets/undraw/createsub.png" alt="">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, quas.</p>
                    </div>
                </div>
                <div class="text-center py-5 bg-light">
                    <button class="btn btn-info" @click="newsubjectSubmit">SUBMIT</button><br>
                    <small class="text-secondary">BSIT - FIRST SEMESTER </small>
                </div>
            </form>
            
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
            spinner:false,

            semester:this.$route.query.semester,
            courseID:this.$route.params.id,

            code:'',
            name:'',
            units:'',
            year:{
                val:''
            },
            desc:'',


            selectedImg:null,
            selectdImgtxt:'Choose Image +',
            selectedImgBg:'',
        }
    },
    async asyncData({store}){
        store.dispatch('SET_USER')
    },
    methods:{
        openFile(){
            if(this.selectedImg != null){
                this.selectedImg = null
                this.selectdImgtxt = ''
                return this.selectedImgBg = ''
            }
            
            return this.$refs.subfile.click()
        },
        changeImg(event){
            console.log(event.target.files[0])
            
            try{
                let allowedimg = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
                if(!allowedimg.includes('image/'+event.target.files[0].name.split('.').pop())) return this.selectdImgtxt = 'File in not an image'
                if(event.target.files[0].size > 600000) return this.selectdImgtxt = 'Image size is too big!'
                
                this.selectedImg = event.target.files[0]
                this.selectedImgBg = URL.createObjectURL(event.target.files[0])
            }catch(err){
                console.log(err)
            }
        },
        async newsubjectSubmit(){
            this.spinner = true
            if(this.code == '' | this.name == '' | this.units == '' | this.year.val == ''){
                this.spinner = false
                return this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'danger',
                    icon:'fa-exclamation-circle',
                    msg:'Please complete the fields'
                })
            }

            if(this.selectedImg == null) return this.selectdImgtxt = 'Please select an image'; this.spinner = false

            let newsubimg = new FormData()
            newsubimg.append('newsubimg', this.selectedImg)
            
            try{

                // let subimgres = await this.$axios.post('/api/teacher/singleupaload', newsubimg)
                let subinfos = await this.$axios.post('/api/teacher/course/subject/newsubject', {subdata:{course:this.courseID, sem:this.semester, code: this.code, name:this.name, units:this.units, year:this.year.val, desc:this.desc}, newsubimg})

                this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'success',
                    icon:'fa-exclamation-circle',
                    msg:subinfos.data.msg
                })
                return this.spinner = false
            }catch(err){
                this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'danger',
                    icon:'fa-exclamation-circle',
                    msg:err
                })
            }
            
        }
    }
}
</script>

<style scoped>
.newsub-panel{
    display:grid;
    grid-template-columns:1.5fr 1fr;
}

.subjectimg{
    background-position:center;
    background-size:100% 100%;
    padding:20% 0px;
    transition:0.2s;
    cursor:pointer;
}

.subjectimg:hover{
    transition:0.2s;
    background-color:teal;
    color:white;
}


</style>
