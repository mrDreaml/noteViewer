<template>
  <button
    :class="['checkBox', {selected: isSelected}]"
    @click="$emit('on-change')"
  >
    <img
      v-if="isSelected"
      class="flagDone"
      :src="doneIcon"
    >
  </button>
</template>

<script>
import doneIcon from '@/assets/icons/doneIcon.svg';

export default {
    props: {
        isSelected: Boolean,
    },
    data () {
        return {
            doneIcon
        };
    },
};
</script>

<style lang="scss" scoped>
    .checkBox {
        width: 100%;
        height: 100%;
        display: flex;
        border: none;
        background: #eeeeeecc;
        padding: 0;
        border-radius: 5px;

        &.selected {
            background-color: #cfc;
            border-radius: 50%;

            &:hover {
                background-color: #afa;
            }
        }

        &:focus {
            outline: none;
        }
    }

    .flagDone {
        margin: auto;
        width: 50%;
        height: 50%;
        color: #42b983;
    }
</style>
