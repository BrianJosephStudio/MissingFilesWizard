<template>
    <div class="container" :data-page="Pages.MAIN">
        <button @click="extendScript.relinkMissingFiles">
            Relink
        </button>
    </div>
</template>

<script setup lang="ts">
import { Pages } from "../../types/Pages.d"
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
// import { onMounted } from "vue/dist/vue.js";

const extendScript = new ExtendScriptAPI()

</script>
<style lang="scss"></style>