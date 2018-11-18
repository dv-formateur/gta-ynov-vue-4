<template>
    <div class="container-fluid">
        <nav-bar></nav-bar>
        <div class="row">
            <b-alert class="col-12" variant="danger" show>L'accès à cette page est interdit</b-alert>
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

