<template>
    <select class="select" :id="Id" :name="Name" @change="event => dropdownListener(event)">
        <option class="option" v-for="option of Options" :value="option">{{ option }}</option>
    </select>
</template>
<script setup lang="ts">
import { Settings } from "@root/types/Settings.d";
import AppSettings from "@classes/AppSettings.class";
import config from "@root/config";

const appSettings = new AppSettings()

const props = defineProps({
    Id: String,
    Name: String,
    Options: Array,
})

const dropdownListener = async (event: Event): Promise<void> => {
    const target = event.currentTarget as HTMLSelectElement
    const value = target.selectedIndex
    const settings: Settings = {
        [target.name]: value
    }
    appSettings.changeSetting(settings)
}
</script>

<style lang="scss">
.select {
    // font-family: 'Comfortaa', sans-serif;
    font-family: 'Quicksand', sans-serif;
    text-align: center;
    background-color: hsl(158, 46%, 57%);
    // border-radius: 0.3rem;
    border: none;
    outline: none;
    font-size: 1rem;
    cursor: pointer;

    .option {

        &:hover {
            background-color: hsl(330, 45%, 72%);
        }
    }
}
</style>