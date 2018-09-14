import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const STORAGE_KEY = 'my-vuejs-todolist';

const todoStorage = {
  fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

const todoStore = new Vuex.Store({
  strict: true,
  state: {
    todos: todoStorage.fetch()
  },
  mutations: {
    addTodo(state, title) {
      const sanitizedTitle = title && title.trim();

      if (!sanitizedTitle) return;

      const date = new Date();

      state.todos.push({
        id: date.getTime(),
        title: sanitizedTitle,
        completed: false
      });

      todoStorage.save(state.todos);
    },
    deleteTodo(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
      todoStorage.save(state.todos);
    },
    updateTodo(state, { todo, changes }) {
      const key = state.todos.indexOf(todo);
      const updated = Object.assign({}, todo, changes);

      Vue.set(state.todos, key, updated);
      todoStorage.save(state.todos);
    },
    saveTodos(state, todos) {
      state.todos = todos;
      todoStorage.save(todos);
    }
  },
  actions: {},
  getters: {
    // length: state => state.todos.length
    all: state => state.todos,
    completed: state => state.todos.filter(todo => todo.completed),
    incomplete: state => state.todos.filter(todo => !todo.completed)
  }
});

export default todoStore;
