<template>
    <FgPopover
        alignment="bottomRight"
        class="header-profile"
        :content-padding="0"
        :content-border-radius="12"
        content-overflow="hidden"
    >
        <template #relative>
            <div class="header-profile__button">
                <FgAvatar color="primary">Kirill Galimov</FgAvatar>
                <SvgIcon :width="16">
                    <IconChevron />
                </SvgIcon>
            </div>
        </template>

        <template #content>
            <ul class="header-profile-dropdown">
                <li class="header-profile-dropdown__item">
                    <SvgIcon>
                        <IconUser />
                    </SvgIcon>
                    Профиль
                </li>
                <li class="header-profile-dropdown__item">
                    <SvgIcon>
                        <IconExit />
                    </SvgIcon>
                    Выйти
                </li>
            </ul>
        </template>
    </FgPopover>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue';
import IconChevron from '@/icons/IconChevron.vue';
import IconUser from '@/icons/IconUser.vue';
import IconExit from '@/icons/IconExit.vue';

import { FgAvatar, FgPopover } from '@galimovdev/fg-ui';
</script>

<style lang="scss">
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/typography.scss';

.header-profile {
    &__button {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }
}

.header-profile-dropdown {
    min-width: 180px;
    overflow: hidden;

    &__item {
        @extend .text-body-s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        user-select: none;
        cursor: pointer;

        &:hover {
            background-color: getColor('base-02');
        }
    }
}
</style>
