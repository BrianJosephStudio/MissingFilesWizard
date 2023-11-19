<template>
    <div class="header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.86 30.24" class="logo">
            <path class="cls-1"
                d="m21.86,8.94v7.1c0,.07-.02.14-.05.19l-2.56,4.62c-.16.29-.58.27-.72-.03l-1.76-3.92c-.05-.12-.05-.25.02-.36l4.33-7.8c.2-.36.75-.22.75.19Z" />
            <path class="cls-1"
                d="m18.02.4v7.1c0,.07-.02.14-.05.19l-2.56,4.62c-.16.29-.58.27-.72-.03l-1.76-3.92c-.05-.12-.05-.25.02-.36L17.27.21c.2-.36.75-.22.75.19Z" />
            <path class="cls-1"
                d="m5.46,20.53v7.8c0,.42-.57.56-.76.18L.04,19.24c-.03-.06-.04-.12-.04-.18v-7.44c0-.42.56-.56.76-.19l4.65,8.91c.03.06.05.12.05.19Z" />
            <path class="cls-1"
                d="m19.67,25.28c-.9,1.65-2.03,3.69-2.62,4.76-.16.29-.59.27-.72-.04l-1.68-4.01-.1-.24-2.43-5.79c-.13-.32-.58-.33-.73-.02l-4.3,8.57c-.19.38-.76.24-.76-.18v-7.8c0-.06.02-.13.05-.19l5.57-10.66c.16-.3.59-.28.72.02l4.47,9.93h0s.36.81.36.81l2.18,4.84h0Z" />
        </svg>

        <h1>MF Wizard</h1>
    </div>
</template>

<script setup lang="ts">
</script>
<style scoped lang="scss">
@import '@root/src/style.scss';

.header {
    @include header-backgroundColor;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4rem;
    gap: 0.4rem;

    h1 {
        margin: 0;
        font-family: 'Comfortaa', sans-serif;
        // font-family: 'Quicksand', sans-serif;
    }

    .logo {
        margin-bottom: 0.6rem;
        fill: white;
        height: 2rem;
    }
}
</style>