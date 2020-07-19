<template>
  <li :class="['todoItem', { completed: todoItem.isDone}]">
    <div class="noteControls">
      <div
        v-if="mode===noteModes.editTodoList"
        class="checkBoxWrapper"
      >
        <CheckBox
          :is-selected="todoItem.isDone"
          @on-change="$emit('toggleDoneStatus', todoItem.id)"
        />
      </div>
      <strong class="noteIndex">
        {{ `${itemNumber}.` }}
      </strong>
    </div>
    <div class="todoEditableTextWrapper">
      <EditableText
        ref="editableTextTodo"
        :value="todoItem.text"
        :validation-rule="todoTextValidationRule"
        :is-edit-available="mode===noteModes.editTodoList"
        :cut-text-value="mode===noteModes.editTodoList ? -1 : 25"
        @updateValue="updateTodoText"
      />
    </div>
    <div
      v-if="mode===noteModes.editTodoList"
      class="noteControls"
    >
      <button
        class="editButton"
        @click="toggleTodoTextEditMode"
      >
        <img
          :src="editIcon"
          alt="edit"
        >
      </button>
      <button
        class="deleteBtn"
        @click="$emit('removeItem', todoItem.id)"
      >
        <img
          :src="deleteIcon"
          alt="delete"
        >
      </button>
    </div>
  </li>
</template>

<script>
import { TODO_CREATOR_RULES } from '@/constants/validationRules';
import NOTE_MODE from '@/constants/noteMode';

import EditableText from '@/components/EditableText';
import CheckBox from '@/components/Checkbox';

import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/xIcon.svg';

export default {
    components: {
        CheckBox,
        EditableText,
    },
    props: {
        noteId: String,
        mode: {
            type: String,
            default: '',
        },
        itemNumber: {
            type: Number,
            default: 1,
        },
        todoItem: {
            type: Object,
            default () {
                return [];
            },
        },
    },
    data () {
        return {
            todoTextValidationRule: TODO_CREATOR_RULES,
            noteModes: NOTE_MODE,
            editIcon,
            deleteIcon,
        };
    },
    methods: {
        updateTodoText (text) {
            this.$store.commit('updateTodoItemText',
                { noteId: this.noteId, todoId: this.todoItem.id, text }
            );
        },
        toggleTodoTextEditMode () {
            this.$refs.editableTextTodo.toggleEditText();
        },
    }
};
</script>

<style lang="scss" scoped>
.todoItem {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin: 3px 0;
    border-bottom: 1px solid #eee;

  &.completed {
    color: #3c3;
    .editableText {
      text-decoration-line: line-through;
    }
  }

  .todoEditableTextWrapper {
    width: 100%;
    display: flex;
    .editableText, .editableInput {
      width: 100%;
      padding: 0 15px;
    }

    .editableText {
      text-align: left;
    }

    .editableInput {
      margin: 0 10px;
      border-radius: 5px;
      font-size: 1em;
      border: none;
      box-shadow: inset 0 0 3px #4499FF;

    }
  }

    .noteControls {
        flex-shrink: 0;
        display: flex;
    }
}


.checkBoxWrapper {
    width: 20px;
    height: 20px;
}

.noteIndex {
    margin-left: 10px;
}

.deleteBtn, .editButton {
  background: none;
  border: 0;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 0;
  margin: 0 5px;
}

.deleteBtn {
    font-size: 1.2em;

    &:hover {
      background-color: #ff000033;
    }

    &:focus {
        outline: none;
    }
}

  .editButton {
    padding: 0 3px;

    &:hover {
      background-color: #ffffee;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
