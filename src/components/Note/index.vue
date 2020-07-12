<template>
  <div class="note">
    <h2 class="noteTitle">
      {{ noteTitle }}
    </h2>
    <ul class="todoList">
      <TodoItem
        v-for="(todoItem, index) in todoList"
        :key="`todoItem-${index}-${todoItem.text}`"
        :todo-item="todoItem"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

export default {
    components: {
        TodoItem,
    },
    data () {
        return {
            noteTitle: 'note title',
            todoList: [
                { text: 'some text 1', isDone: false },
                { text: 'some text 2', isDone: false },
                { text: 'some text 3', isDone: false },
            ],
        };
    },
    methods: {
        toggleDoneStatus () {
            console.log('emit');
            this.isSelected = !this.isSelected;
        },
    }
};
</script>

<style lang="scss" scoped>
  .note {
    width: 100%;
    height: 100%;

    .noteTitle {
      font-size: 1.2em;
    }
  }
</style>
