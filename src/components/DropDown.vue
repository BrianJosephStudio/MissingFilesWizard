<template>
    <select class="select" :id="Id" :name="Name" @change="dropdownListener" :value="props.Selected">
        <option class="option" v-for="option of Options" :value="option">{{ option }}</option>
    </select>
</template>
<script setup lang="ts">
import { Settings } from "@root/types/Settings.d";
import AppSettings from "@classes/AppSettings.class";
import { onMounted } from "vue";

const selectedMissingPool = AppSettings.currentSettings.missingFilesPool
const selectedSearchPool = AppSettings.currentSettings.searchPool

const props = defineProps({
    Id: String,
    Name: String,
    Options: Array,
    Selected: String
})

const dropdownListener = async (event: Event): Promise<void> => {
    const target = event.currentTarget as HTMLSelectElement
    const value = target.selectedIndex
    const settings: Settings = {
        [target.name]: value
    }
    AppSettings.changeSetting(settings)
}

onMounted(async () => {

})
</script>

<style lang="scss">
@import '@root/src/style.scss';

.select {
    // font-family: 'Comfortaa', sans-serif;
    font-family: 'Quicksand', sans-serif;
    // background-color: hsl(158, 46%, 57%);
    @include dropdown-backgroundColor;
    @include input-color;
    border-radius: 0.3rem;
    border: none;
    outline: none;
    text-align: center;
    font-size: 0.8rem;
    cursor: pointer;
}
</style>