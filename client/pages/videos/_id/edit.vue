<template>
    <div class="mx-5">
        <h4>Edit Video {{ $route.params.id}}</h4>

        <strong>Suggested Title</strong>
        <div class="p-2 shadow">
            <div class="d-inline-block bg-light rounded p-2 rounded border mr-1 mb-1" >
                {{titlesedit.title}} <span style="float:right; cursor:pointer;" class="ml-3">X</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: 'Edit - '+ this.titlesedit.id 
        }
    },
    async asyncData({$axios, params}){
        let res = await $axios.get('https://jsonplaceholder.typicode.com/todos/'+params.id) 
        
        console.log(res)
        
        let titlesedit = res.data

        return {
            titlesedit
        }
    }
}
</script>

<style>

</style>