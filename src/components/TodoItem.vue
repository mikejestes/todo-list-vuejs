<template>
  <div class="todo">
    <div class="todo__toggle">
      <Checkbox
        :checked="todo.completed"
        :disabled="editing"
        @changed="toggleCompleted"
      />
    </div>
    <div class="todo__title">
      <span v-if="!editing" @dblclick="startEdit">
        {{ todo.title }}
      </span>
      <span v-else>
        <input
          class="todo__input"
          type="text"
          ref="todoTitleInput"
          v-model="newTitle"
          :autofocus="editing"
          @keyup.enter="updateTitle"
          @keyup.esc="cancelEdit"
          @blur="cancelEdit">
      </span>
    </div>
    <div class="todo__remove">
      <DeleteButton
        :disabled="editing"
        @clicked="$store.commit('deleteTodo', todo)"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox';
import DeleteButton from '@/components/DeleteButton';

export default {
  name: 'TodoItem',
  props: ['todo'],
  components: {
    Checkbox,
    DeleteButton
  },
  data() {
    return {
      editing: false,
      newTitle: ''
    };
  },
  methods: {
    startEdit() {
      this.newTitle = this.todo.title;
      this.editing = true;

      this.$nextTick(function() {
        this.$refs.todoTitleInput.focus();
      });
    },
    cancelEdit() {
      this.editing = false;
    },
    toggleCompleted() {
      this.$store.commit('updateTodo', {
        todo: this.todo,
        changes: {
          completed: !this.todo.completed
        }
      });
    },
    updateTitle() {
      this.$store.commit('updateTodo', {
        todo: this.todo,
        changes: {
          title: this.newTitle.trim()
        }
      });

      this.editing = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.todo {
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 10px 14px;
  text-align: left;

  &__toggle,
  &__remove {
    flex: 0 0 auto;
  }
  &__title {
    cursor: pointer;
    flex: 1;
    padding: 0 20px;
  }

  &__input {
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    display: block;
    font-size: 16px;
    width: 100%;
  }
}
</style>
