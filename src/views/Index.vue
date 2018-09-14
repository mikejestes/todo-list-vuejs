<template>
  <div class="todolist">
    <h1><span v-if="incompleteCount">{{ incompleteCount }} </span>TODO's</h1>
    <!-- <span class="counter" v-if="incompleteCount">{{ incompleteCount }}</span> -->
    <div class="filters">
      <label class=filter__label v-for="filter in filters" :key="filter">
        <input
          class="filter__input"
          type="radio"
          :value="filter"
          v-model="currentFilter">
        <span class="filter__text">{{ filter }}</span>
      </label>
      <a href="#clear" @click.prevent="clearCompleted">Clear Completed</a>
    </div>

    <input
      class="todo__add"
      autofocus autocomplete="off"
      type="text"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo">

    <div class="todos--empty" v-if="!todos.length">
      There are none!
    </div>
    <div class="todos" v-else>
      <transition-group name="list" tag="div">
        <TodoItem
          class="todo"
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

export default {
  name: 'IndexView',
  components: {
    TodoItem
  },
  data() {
    return {
      currentFilter: 'all',
      filters: ['all', 'completed', 'incomplete'],
      newTodo: ''
    };
  },
  computed: {
    todos() {
      return this.$store.getters[this.currentFilter];
    },
    incompleteCount() {
      return this.$store.getters.incomplete.length;
    }
  },
  methods: {
    addTodo() {
      this.$store.commit('addTodo', this.newTodo);
      this.newTodo = '';
    },
    clearCompleted() {
      this.$store.commit('saveTodos', this.$store.getters.incomplete);
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 40px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 1);
}

.todolist {
  margin: 0 auto;
  max-width: 400px;
}

.counter {
  background: red;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
}

.todo__add {
  display: block;
  font-size: 16px;
  padding: 10px;
  width: 100%;
}

.todo {
  padding: 10px 0;
}
.todo + .todo {
  border-top: 1px solid #ccc;
}

.filters {
  margin-bottom: 10px;
}
.filter {
  &__label {
    cursor: pointer;
  }
  &__input {
    display: none;

    &:checked + .filter__text {
      border-color: green;
      background: green;
      color: #fff;
    }
  }

  &__text {
    border: 1px solid #999;
    border-radius: 3px;
    display: inline-block;
    font-size: 14px;
    padding: 4px 8px;

    &:hover {
      border-color: #666;
    }
  }
}

.list-item {
  opacity: 1;
  transform: translateY(0);
  // display: inline-block;
  // margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

// .list-enter-active,
// .list-leave-active {
//   position: absolute;
// }
</style>
