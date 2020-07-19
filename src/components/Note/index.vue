<template>
  <div class="note">
    <div class="noteTitle">
      <EditableText
        :value="note.noteTitle"
        :validation-rule="noteTitleValidationRule"
        @updateValue="updateTitleText"
      />
    </div>
    <ul class="todoList">
      <TodoItem
        v-for="(todoItem, index) in $options.filters.limitTodoItems(note.todoList, todoListItemsLimit)"
        :key="`todoItem-${index}-${todoItem.text}`"
        :note-id="note.id"
        :todo-item="todoItem"
        :item-number="index + 1"
        :mode="mode"
        @toggleDoneStatus="toggleDoneStatus"
        @removeItem="removeItem"
      />
    </ul>
    <span
      v-if="mode===noteModes.editNote && note.todoList.length > todoListItemsLimit"
      class="markIsFullList"
    >
      list shortened
    </span>
    <div
      v-if="mode===noteModes.editNote"
      class="controls"
    >
      <button
        class="editButton"
        @click="goToNote(note.id)"
      >
        <img
          alt="edit"
          :src="editIcon"
        >
      </button>
      <button
        class="deleteButton"
        @click="removeNote(note.id)"
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
import { TITLE_CREATOR_RULES } from '@/constants/validationRules';
import NOTE_MODE from '@/constants/noteMode';

import TodoItem from '@/components/TodoItem';
import EditableText from '@/components/EditableText';

import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/xIcon.svg';

export default {
    components: {
        TodoItem,
        EditableText,
    },
    filters: {
        limitTodoItems (todoItemsList, limit) {
            if (Number.isInteger(limit)) {
                return todoItemsList.slice(0, limit);
            }
            return todoItemsList;
        }
    },
    props: {
        note: {
            type: Object,
            default () {
                return {};
            }
        },
        todoListItemsLimit: {
            type: [ Number, Boolean ],
            default () {
                return false;
            }
        },
        mode: String,
    },
    data () {
        return {
            noteTitleValidationRule: TITLE_CREATOR_RULES,
            noteModes: NOTE_MODE,
            editIcon,
            deleteIcon,
        };
    },
    methods: {
        updateTitleText (noteTitle) {
            this.$store.commit('updateNoteTitle', { noteId: this.note.id, noteTitle });
        },
        toggleDoneStatus (id) {
            this.$store.commit('toggleDoneStatus', { noteId: this.note.id, todoId: id });
        },
        removeItem (id) {
            this.$store.commit('removeTodoItem', { noteId: this.note.id, todoId: id });
        },
        removeNote (id) {
            this.$store.commit('removeNote', { noteId: id });
        } ,
        goToNote (id) {
            this.$router.push({ path: 'editNote', query: { id } });
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
    border: 1px solid #eee;
    border-radius: 15px;
    box-shadow: 1px 1px 3px #00000011;

    .noteTitle {
      display: flex;
      margin-top: 0;

      .editableText {
        width: 100%;
        font-weight: bold;
        font-size: 1em;
        text-align: center;
      }

      .editableInput {
        margin: 0 10px;
        width: 100%;
        border: none;
        border-radius: 5px;
        box-shadow: inset 0 0 3px #4499FF;
        font-weight: bold;
        font-size: 1em;
        text-align: center;
      }
    }

    .markIsFullList {
      font-size: .7em;
      font-style: italic;
      color: #49F;
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
