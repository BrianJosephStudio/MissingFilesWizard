<template>
    <div class="container" :data-page="Pages.MAIN">
        <div class="settingsGrid">
            <h2>Get Missing Files in</h2>
            <Dropdown :Id="'missingFilesPool'" :Name="'missingFilesPool'" :Options="missingFilesPool"></Dropdown>
            <h2>Search for matching files in</h2>
            <Dropdown :Id="'searchPool'" :Name="'searchPool'" :Options="searchPool"></Dropdown>
            <h2>Relink Method</h2>
            <Dropdown :Id="'relinkMethod'" :Name="'relinkMethod'" :Options="relinkMethod"></Dropdown>
            <div class="cbContainer">
                <label for="ignoreFileExt">Ignore File Extension</label>
                <input id="ignoreFileExt" type="checkbox" @change="event => ignoreFileExtListener(event)">
            </div>
            <div class="cbContainer">
                <label for="perfectMatch">Perfect match</label>
                <input id="perfectMatch" type="checkbox" checked @change="event => perfectMatchListener(event)">
            </div>
        </div>
        <div class="searchPathContainer">
            <input ref="searchPath" id="searchPath" class="searchPath" type="text"
                @change="event => searchPathListener(event)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="folderIcon">
                <path class="cls-1"
                    d="m6.35,2.35v1.46H1.24c-.29,0-.52.23-.52.52v-1.98c0-.2.16-.35.35-.35h4.93c.19,0,.35.15.35.35Z" />
                <path class="cls-1"
                    d="m15.28,4.65v8.52c0,.28-.23.51-.52.51H1.24c-.29,0-.52-.23-.52-.51V4.65c0-.29.23-.52.52-.52h13.52c.29,0,.52.23.52.52Z" />
            </svg>
        </div>
        <div class="buttons">
            <button class="findFilesButton" @click="extendScript.relinkMissingFiles">
                Find Files
            </button>
            <button class="unlinkButton" @click="extendScript.unlinkFiles">
                Unlink Files
            </button>
            <!-- <button @click="printSettings">
                Print Settings
            </button> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { Pages } from "../../types/Pages.d"
import Dropdown from "@components/DropDown.vue"
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import AppSettings from "@classes/AppSettings.class";
import { missingFilesPool, searchPool, relinkMethod } from "../../types/Settings.d"
import { onMounted, ref } from "vue";
import { homedir } from "os";

const extendScript = new ExtendScriptAPI()
const appSettings = new AppSettings()
const searchPath = ref(null)

const ignoreFileExtListener = async (event: Event): Promise<void> => {
    const checkedStatus = (event.currentTarget! as HTMLInputElement).checked
    appSettings.changeSetting({ ignoreFileExtensions: checkedStatus })
}

const perfectMatchListener = async (event: Event): Promise<void> => {
    const checkedStatus = (event.currentTarget! as HTMLInputElement).checked
    appSettings.changeSetting({ perfectMatch: checkedStatus })
}

const searchPathListener = async (event: Event): Promise<void> => {
    const target = event.currentTarget as HTMLInputElement
    const value = target!.value
    appSettings.changeSetting({
        searchPath: value
    })
}

onMounted(() => {
    // (searchPath.value! as HTMLInputElement).value = homedir()
    (searchPath.value! as HTMLInputElement).value = "C:/Users/Brian/"
})

</script>
<style lang="scss">
.settingsGrid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    width: 100%;
    grid-gap: 0.6rem;

    h2 {
        text-align: right;
        flex-grow: 1;
    }

    .cbContainer {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

}

.searchPathContainer {
    display: flex;
    gap: 0.6rem;
    width: 100%;
    align-items: center;

    .searchPath {
        font-family: 'Quicksand', sans-serif;
        background-color: hsl(0, 0%, 82%);
        outline: none;
        border: none;
        height: 1.3rem;
        color: black;
        padding: 0.3rem;
        font-size: 0.9rem;
        width: 100%;
        flex-grow: 1;
    }

    .folderIcon {
        fill: hsl(158, 46%, 57%);
        height: 2rem;
        cursor: pointer;
    }

}

.buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    button {
        width: 100%;
        font-family: 'Comfortaa', sans-serif;
    }

    .findFilesButton {
        height: 3.4rem;
    }

    .unlinkButton {
        height: 2.3rem;
        padding: 0;
    }
}
</style>