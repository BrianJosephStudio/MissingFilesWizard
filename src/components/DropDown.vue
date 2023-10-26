<template>
    <select :id="Id" :name="Name">
        <option v-for="option of Options" :value="option">{{ option }}</option>
    </select>
</template>
<script setup lang="ts">

const props = defineProps({
    Id: String,
    Name: String,
    Options: Array
})
</script>