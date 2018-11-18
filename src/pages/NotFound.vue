<template>
    <div class="container-fluid">
        <nav-bar></nav-bar>
        <div class="row">
            <b-alert class="col-12" variant="danger" show>La page que vous cherchez n'a pas été trouvé</b-alert>
        </div>
    </div>
</template>

<script>
import NavBar from "../layout/NavBar.vue";
export default {
    components: {
        NavBar
    }
}
</script>

