<template>
    <div class="container" :data-page="Pages.MAIN">
        <div class="settingsGrid">
            <h2>Get Missing Files in</h2>
            <Dropdown :Id="'myId1'" :Name="'myName1'" :Options="['Oye', 'mi', 'amor']"></Dropdown>
            <h2>Search for matching files in</h2>
            <Dropdown :Id="'myId2'" :Name="'myName2'" :Options="['no', 'me', 'digas']"></Dropdown>
            <h2>Relink Method</h2>
            <Dropdown :Id="'myId3'" :Name="'myName3'" :Options="['que', 'no', 'coño']"></Dropdown>
            <div>
                <label for="">Ignore File Extension</label>
                <input type="checkbox">
            </div>
            <div>
                <label for="">Perfect match</label>
                <input type="checkbox">
            </div>
            <input type="text" value="C:/Users/">
            <div></div>
        </div>

        <button @click="extendScript.relinkMissingFiles">
            Find Files
        </button>
        <button @click="extendScript.unlinkFiles">
            Unlink Files
        </button>
        <button @click="printSettings">
            Print Settings
        </button>
    </div>
</template>

<script setup lang="ts">
import { Pages } from "../../types/Pages.d"
import Dropdown from "@components/DropDown.vue"
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import AppSettings from "@classes/AppSettings.class";
// import { onMounted } from "vue/dist/vue.js";

const extendScript = new ExtendScriptAPI()
const appSettings = new AppSettings()

const printSettings = async (): Promise<void> => {
    const settings = await appSettings.fetchSettings()
    console.log(settings)
}

</script>
<style lang="scss">
.settingsGrid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    width: 100%;
    gap: 0.3rem;
    // background-color: blue;

    h2 {
        // background-color: red;
        text-align: right;
        flex-grow: 1;
    }
}
</style>