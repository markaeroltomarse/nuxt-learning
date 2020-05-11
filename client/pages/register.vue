<template>
    <div class="mx-5">
        <div class="rounded shadow p-5 border border-info" style="margin:10% 30%;" data-aos="fade-up">
            <h4>Register</h4>
            <form >
                <small>Name: </small>
                <input type="text" ref="name" class="form-control" required>

                <small>Email: </small>
                <input type="email" class="form-control" required>

                <small>password: </small>
                <input type="password" class="form-control" required>

                <div class="text-right py-3">
                    <button class="btn btn-info btn-sm">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$nextTick(() => this.$refs.name.focus())
    }
}
</script>

<style>

</style>