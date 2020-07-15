<template>
  <div class="note">
    <h2 class="noteTitle">
      {{ note.noteTitle }}
    </h2>
    <ul class="todoList">
      <TodoItem
        v-for="(todoItem, index) in note.todoList"
        :key="`todoItem-${index}-${todoItem.text}`"
        :todo-item="todoItem"
        :item-number="index + 1"
        :mode="note.mode"
        @toggleDoneStatus="toggleDoneStatus"
        @removeItem="removeItem"
      />
    </ul>
    <div
      v-if="mode===noteModes.editNote"
      class="controls"
    >
      <button
        class="editButton"
        @click="$emit('goToNote', note.id)"
      >
        <img
          alt="edit"
          :src="editIcon"
        >
      </button>
      <button
        class="deleteButton"
        @click="$emit('deleteNote', note.id)"
      >
        <img
          alt="delete"
          :src="deleteIcon"
        >
      </button>
    </div>
  </div>
</template>

<script>
import NOTE_MODE from '@/constants/noteMode';
import TodoItem from '@/components/TodoItem';

import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/xIcon.svg';

export default {
    components: {
        TodoItem,
    },
    props: {
        note: {
            type: Object,
            default () {
                return {};
            }
        },
        mode: String,
    },
    data () {
        return {
            editIcon,
            deleteIcon,
            noteModes: NOTE_MODE,
        };
    },
    methods: {
        toggleDoneStatus (id) {
            const currentItem = this.todoList.find(todoListItem => todoListItem.id === id);
            currentItem.isDone = !currentItem.isDone;
        },
        removeItem (id) {
            this.todoList = this.todoList.filter(todoListItem => todoListItem.id !== id);
        }
    }
};
</script>

<style lang="scss" scoped>
  .note {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 0;
    border-radius: 15px;
    box-shadow: 1px 1px 3px #dddddd;

    .noteTitle {
      margin-top: 0;
      font-size: 1em;
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin-top: 5px;
    & button {
      border: none;
      border-radius: 15px;
      width: 100px;
      margin: 4px 6px;
      background-color: transparent;
      transition: .5s;
      img {
        width: 15px;
        height: 15px;
      }
    }
    .editButton {
      border: 1px solid #00ff0033;
      &:hover {
        background-color: #aaffaa33;
      }
    }

    .deleteButton {
      border: 1px solid #ff000033;
      &:hover {
        background-color: #ffaaaa33;
      }
    }
  }
</style>
