<template>
    <div class="header-menu">
        <FgButton type="flat" size="small">+ Запись</FgButton>
        <HeaderProfile />
    </div>
</template>

<script lang="ts" setup>
import { FgButton } from '@galimovdev/fg-ui';
import HeaderProfile from '@/components/Layout/Header/HeaderProfile.vue';
</script>

<style lang="scss">
.header-menu {
    display: flex;
    align-items: center;
    gap: 16px;
}
</style>
