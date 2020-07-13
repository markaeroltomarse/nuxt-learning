<template>
    <div class="bg-light pt-3">
        <dashDefault/>
        <section class="documentBody px-0 bg-white text-secondary" data-aos="zoom-in">
            <div data-aos="fade-in" v-if="spinner" class="text-center"  style="padding:10% 27%;">
                Please wait..
                <v-progress-linear
                    color="teal"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
            </div>
            <form data-aos="fade-down" v-else @submit.prevent="newsubjectSubmit">
                <h4 class="bg-info px-3 py-1 text-white"><strong>{{course.name}}</strong> - 
                <span class="text-light">New subject in {{semester}} semester</span></h4>

                <div class="newsub-panel">
                    <div class="p-3">
                        <small><strong>Subject code:</strong></small>
                        <input v-model="code" type="text" class="form-control" required>

                        <small><strong>Subject name:</strong></small>
                        <input v-model="name" type="text" class="form-control" required>

                        <small><strong>Subject units:</strong></small>
                        <input v-model="units" type="number" class="form-control" required>

                        
                        <v-row>
                            <v-col>
                                <small><strong>Subject year:</strong></small>
                                <select v-model="year" class="form-control" >
                                    <option selected :value="{val:''}">Select year</option>
                                    <option  :value="{val:'2020 - 2021'}">2020 - 2021</option>
                                    <option  :value="{val:'2021 - 2022'}">2021 - 2022</option>
                                </select>
                            </v-col>
                            <v-col>
                                <small><strong>Student year:</strong></small>
                                <v-text-field
                                    solo
                                    dense
                                    v-model="studentyear"
                                    readonly
                                >

                                </v-text-field>
                            </v-col>
                        </v-row>

                        <small><strong>Description:</strong></small>
                        <textarea v-model="desc" class="form-control" cols="30" rows="5"></textarea>

                        <input ref="subfile" type="file" hidden @change="changeImg" >

                        <small>Subject image:</small>
                        <div @click="openFile" :style="{backgroundImage:`url('${selectedImgBg}')`}" class="subjectimg border rounded w-100 text-center">
                            <small :class="selectedImg == null ? '' : 'text-danger'">{{selectdImgtxt}}</small>
                        </div>
                    </div>
                    <div class="p-3 text-center">
                        <img width="100%" src="../../../../assets/undraw/createsub.png" alt="">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, quas.</p>
                    </div>
                </div>
                <div class="text-center bg-light py-5" >
                    <button  class="btn btn-info" @click="newsubjectSubmit">SUBMIT</button><br>
                    <small  class="text-secondary">{{course.name}} - FIRST SEMESTER </small>
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
            studentyear:this.$route.query.y,


            selectedImg:null,
            selectdImgtxt:'Choose Image +',
            selectedImgBg:'',
        }
    },
    async asyncData({$axios, params, store, redirect}){
        store.dispatch('SET_USER')
        
        try{
            let course = await $axios.post('/api/teacher/master/course', {courseID:params.id})
            if(course.data.error) return alert(course.data.error)
            console.log(course.data.data)
            return {course:course.data.data}
        }catch(err){
            alert(err)
        }
    },
    beforeMount(){
        if(this.validateStudentYear() == 0) return this.$router.replace({path:`/dashboard/curriculum/${this.$route.params.id}`})
    },
    methods:{
        openFile(){
            if(this.selectedImg != null){
                this.selectedImg = null
                this.selectdImgtxt = 'Choose Image +'
                return this.selectedImgBg = ''
            }

            this.selectdImgtxt = 'Remove this image - '
            
            return this.$refs.subfile.click()
        },
        changeImg(event){
            
            try{
                let allowedimg = ['jpeg', 'jpg', 'png', 'gif']
                if(!allowedimg.includes(event.target.files[0].name.split('.').pop())) return this.selectdImgtxt = 'File in not an image'
                if(event.target.files[0].size > 600000) return this.selectdImgtxt = 'Image size is too big!'
                
                this.selectedImg = event.target.files[0]
                this.selectedImgBg = URL.createObjectURL(event.target.files[0])
            }catch(err){
                console.log(err)
            }
        },
        async newsubjectSubmit(){
            
           
            this.spinner = true
            if(this.code == '' | this.name == '' | this.units == '' | this.year.val == '' | this.validateStudentYear() == 0){
                this.spinner = false
                return this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'danger',
                    icon:'fa-exclamation-circle',
                    msg:'Please complete the fields'
                })
            }

            if(this.selectedImg == null){
                this.selectdImgtxt = 'Please select an image'; 
                return this.spinner = false
            }
            
            
            // newsubimg.append('newsubimg', {course:this.courseID, sem:this.semester, code: this.code, name:this.name, units:this.units, year:this.year.val, desc:this.desc})
            let newsubimg = new FormData()
            newsubimg.append('newsubimg', this.selectedImg)
            
            return await this.$axios.post('/api/teacher/singleupload?dest=subjectimg&fileref=newsubimg', newsubimg)
            .then(async res => {
                let subinfos = await this.$axios.post('/api/teacher/course/subject/newsubject/', {course:this.courseID, sem:this.semester, code: this.code, name:this.name, units:this.units, year:this.year.val, desc:this.desc, studentyear:this.studentyear, subimg:res.data.imagetoken})
                this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'success',
                    icon:'fa-exclamation-circle',
                    msg:subinfos.data.msg
                })
                this.spinner = false
            })
            .catch(err => console.log(err))
            
        },

        validateStudentYear(){
            let y = this.$route.query.y
            return (y == '1' | y == '2' | y == '3' | y == '4' )
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
