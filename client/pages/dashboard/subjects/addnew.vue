<template>
    <div class="bg-light">
        <dashDefault/>
    </div>
</template>

<script>
import dashDefault from '../../../components/dashboard'

export default {
    middleware:['authen', 'master'],
    components:{
        dashDefault
    }
}
</script>

<style scoped>

</style>