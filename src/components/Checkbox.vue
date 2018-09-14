<template>
  <label class="checkbox" :class="{ 'is--disabled': disabled }" @click="$emit('changed', $event)">
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="checked">
    <span
      class="checkbox__shape"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"/>
      </svg>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    checked: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 36
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  &__input {
    display: none;

    &:checked + .checkbox__shape {
      border-color: rgb(103, 179, 16);
      background: rgb(103, 179, 16);

      svg {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  &__shape {
    display: block;
    // align-items: center;
    justify-content: center;

    border-radius: 100%;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
      display: block;
      opacity: 0;
      width: 50%;
      margin: 8px auto 0 auto;
      transform: scale(0.1);
      transition: transform 0.2s ease-in-out;

      path {
        fill: #fff;
      }
    }

    &:hover {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .is--disabled & {
      cursor: not-allowed;
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
</style>
