<template>
  <button
    class="button" :class="{ 'is--disabled': disabled }"
    @click="$emit('clicked', $event)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.button {
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  opacity: 0.75;
  padding: 0;
  transform: all 0.2s ease-in-out;

  svg {
    display: block;

    path {
      fill: #da2f04;
    }
  }

  &:hover {
    opacity: 1;

    svg path {
      fill: #c41a04;
    }
  }

  &.is--disabled {
    cursor: not-allowed;
    opacity: 0.4;
    pointer-events: none;
  }
}
</style>
