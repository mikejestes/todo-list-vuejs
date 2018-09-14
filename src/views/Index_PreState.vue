<template>
  <div class="todolist">
    <h3>Here's what you need... todo.</h3>
    <input
      class="todo__add"
      autofocus autocomplete="off"
      type="text"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @deleteTodo="$store.commit('deleteTodo', todo)"
    />
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

// localStorage persistence
// const STORAGE_KEY = 'my-vuejs-todolist';
// const todoStorage = {
//   fetch() {
//     const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//     todos.forEach((todo, index) => {
//       todo.id = index;
//     });
//     todoStorage.uid = todos.length;
//     return todos;
//   },
//   save(todos) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//   }
// };

export default {
  name: 'IndexView',
  components: {
    TodoItem
  },
  data() {
    return {
      // todos: todoStorage.fetch(),
      newTodo: ''
    };
  },
  computed: {
    todos() {
      console.log('computed todos', this.$store.state.todos);
      return this.$store.state.todos;
    }
  },
  methods: {
    addTodo() {
      this.$store.commit('addTodo', this.newTodo);

      this.newTodo = '';
    }
  }
  // watch todos change for localStorage persistence
  // watch: {
  //   todos: {
  //     handler(todos) {
  //       this.$store.commit('saveTodos', todos);
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todolist {
  margin: 0 auto;
  max-width: 400px;
}

.todo__add {
  display: block;
  font-size: 16px;
  padding: 10px;
  width: 100%;
}
</style>
