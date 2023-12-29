<template>
  <div class="container" :data-page="page">
    <div class="settingsGrid">
      <h2>Get Missing Files in</h2>
      <Dropdown
        :Id="'missingFilesPool'"
        :Name="'missingFilesPool'"
        :Options="dropdownOptions.missingFilesPool"
        :Selected="selectedMissingPool"
      >
      </Dropdown>
      <h2>Search for matching files in</h2>
      <Dropdown
        :Id="'searchPool'"
        :Name="'searchPool'"
        :Options="dropdownOptions.searchPool"
        :Selected="selectedSearchPool"
      ></Dropdown>
      <div class="cbContainer">
        <label for="ignoreFileExt">Ignore File Extension</label>
        <input
          ref="ignoreFileExtensionCheckbox"
          id="ignoreFileExt"
          type="checkbox"
          @change="ignoreFileExtListener"
        />
      </div>
      <div class="cbContainer">
        <label for="ignoreCasing">Ignore Casing</label>
        <input
          ref="ignoreCasingCheckbox"
          id="ignoreCasing"
          type="checkbox"
          checked
          @change="ignoreCasingListener"
        />
      </div>
      <div class="cbContainer">
        <label for="consolidate">Consolidate Duplicates</label>
        <input
          ref="consolidateCheckbox"
          id="consolidate"
          type="checkbox"
          checked
          @change="consolidateListener"
        />
      </div>
      <div class="maxDepthContainer">
        <label for="maxDepth">Search Depth</label>
        <input
          ref="maxDepthInput"
          class="maxDepth"
          type="text"
          name="maxDepth"
          id="maxDepthInput"
          @change="filterMaxDepthInput"
        />
      </div>
    </div>
    <div class="searchPathContainer">
      <input
        ref="searchPathInput"
        id="searchPath"
        class="searchPath"
        type="text"
        @change="searchPathListener"
      />
      <div class="folderIconHolder" @click="openDialog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="folderIcon"
          width="20"
          height="20"
          viewBox="0 0 16 16"
        >
          <path
            class="cls-1"
            d="m6.35,2.35v1.46H1.24c-.29,0-.52.23-.52.52v-1.98c0-.2.16-.35.35-.35h4.93c.19,0,.35.15.35.35Z"
          />
          <path
            class="cls-1"
            d="m15.28,4.65v8.52c0,.28-.23.51-.52.51H1.24c-.29,0-.52-.23-.52-.51V4.65c0-.29.23-.52.52-.52h13.52c.29,0,.52.23.52.52Z"
          />
        </svg>
      </div>
    </div>
    <div class="buttons">
      <button class="findFilesButton" @click="searchFiles">Find Files</button>
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
import { Pages } from "@root/types/Pages.d";
import Dropdown from "@components/DropDown.vue";
import ExtendScriptAPI from "@classes/ExtendScriptAPI.class";
import SearchJob from "@classes/SearchJob.class";
import AppSettings from "@classes/AppSettings.class";
import { dropdownOptions } from "@utils/SettingConstants";
import { onMounted, ref } from "vue";
import { Settings } from "@root/types/Settings.d";
// import { homedir } from "@mocks/os-mock"// !DEBUGMODE
import { homedir } from "os" //-- Production Import

const extendScript = new ExtendScriptAPI();

let selectedMissingPool = ref(dropdownOptions.missingFilesPool[0]);
let selectedSearchPool = ref(dropdownOptions.searchPool[0]);

const ignoreFileExtensionCheckbox = ref(null);
const ignoreCasingCheckbox = ref(null);
const consolidateCheckbox = ref(null);
const searchPathInput = ref(null);
const maxDepthInput = ref(null);

const page = Pages.MAIN;

const searchFiles = async () => {
  const searchJob = new SearchJob();
  searchJob.start();
};

const openDialog = async (event: MouseEvent) => {
  if (event.altKey) {
    extendScript.setProjectPath();
    return;
  }
  extendScript.openDialog();
};

const ignoreFileExtListener = async (event: Event): Promise<void> => {
  const checkedStatus = (event.currentTarget! as HTMLInputElement).checked;
  AppSettings.changeSetting({ ignoreFileExtensions: checkedStatus });
};

const ignoreCasingListener = async (event: Event): Promise<void> => {
  const checkedStatus = (event.currentTarget! as HTMLInputElement).checked;
  AppSettings.changeSetting({ ignoreCasing: checkedStatus });
};

const consolidateListener = async (event: Event): Promise<void> => {
  const checkedStatus = (event.currentTarget! as HTMLInputElement).checked;
  AppSettings.changeSetting({ consolidate: checkedStatus });
};

const searchPathListener = async (event: Event): Promise<void> => {
  const target = event.currentTarget as HTMLInputElement;
  const value = target!.value.replace(/\\/g, "/");
  AppSettings.changeSetting({
    searchPath: value,
  });
};

const filterMaxDepthInput = async (event: Event): Promise<void> => {
  const textInput: HTMLInputElement = event.currentTarget! as HTMLInputElement;
  const inputValue: string = textInput.value;

  const regex: RegExp = /^\d*$/;

  if (regex.test(inputValue)) {
    const newSettings: Settings = {
      maxDepth: parseInt(inputValue),
    };
    AppSettings.changeSetting(newSettings);
  } else {
    textInput.value = AppSettings.currentSettings.maxDepth!.toString();
  }
};

onMounted(async () => {
  await AppSettings.refreshSettings();
  const settings = AppSettings.currentSettings;

  selectedMissingPool.value =
    dropdownOptions.missingFilesPool[settings.missingFilesPool!];
  selectedSearchPool.value = dropdownOptions.searchPool[settings.searchPool!];

  (ignoreFileExtensionCheckbox.value! as HTMLInputElement).checked =
    settings.ignoreFileExtensions!;
  (ignoreCasingCheckbox.value! as HTMLInputElement).checked =
    settings.ignoreCasing!;
  (consolidateCheckbox.value! as HTMLInputElement).checked =
    settings.consolidate!;
  (maxDepthInput.value! as HTMLInputElement).value =
    settings.maxDepth!.toString();

  let currentPath: string | undefined = settings.searchPath;
  if (currentPath === "") {
    currentPath = homedir().replace(/\\/g, "/");
  }
  (searchPathInput.value! as HTMLInputElement).value = currentPath!;
});
</script>
<style lang="scss">
@import "@root/src/style.scss";

.settingsGrid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, 1.6rem);
  width: 100%;
  grid-gap: 0.6rem;

  h2 {
    text-align: right;
    // flex-grow: 1;
    margin: auto 0;
  }

  .cbContainer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
    text-align: right;
  }
}

.maxDepthContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;

  .maxDepth {
    @include input-backgroundColor;
    @include input-color;
    font-family: "Quicksand", sans-serif;
    outline: none;
    border: none;
    height: 0.8rem;
    padding: 0.3rem;
    font-size: 0.7rem;
    flex-grow: 1;
    width: 1rem;
    text-align: center;
    flex-grow: 0;
  }
}

.searchPathContainer {
  display: flex;
  gap: 0.4rem;
  width: 96%;
  align-items: center;

  .searchPath {
    @include input-backgroundColor;
    @include input-color;
    font-family: "Quicksand", sans-serif;
    outline: none;
    border: none;
    height: 0.8rem;
    padding: 0.3rem 1rem 0.3rem 0.3rem;
    font-size: 0.7rem;
    width: 100%;
    flex-grow: 10;
  }
  .folderIconHolder {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    
    .folderIcon {
      @include folderIcon-fill;
      cursor: pointer;
    }
  }
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  button {
    color: white;
    width: 100%;
    font-family: "Comfortaa", sans-serif;
    outline: none;
  }

  .findFilesButton {
    height: 2.4rem;
  }

  .unlinkButton {
    height: 1.6rem;
    padding: 0;
  }
}

@media (max-width: 276px) {
  .settingsGrid {
    // grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(3, 1.6rem);
    grid-gap: 1rem 0.6rem;

    h2{
      margin: 0;
    }
  }
}

@media (max-width: 190px) {
  .settingsGrid {
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(6, 1.6rem);
    grid-gap: 0.4rem;
    text-justify: flex-end;
    h2{
      margin-top: auto;
    }  
  }
}
</style>
