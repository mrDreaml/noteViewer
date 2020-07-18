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
    <span
      v-if="!isEditMode"
      class="noteText"
      @dblclick="toggleEditText"
    >
      {{ todoItem.text }}
    </span>
    <input
      v-else
      ref="inputEditText"
      v-model="inputEditText"
      class="noteInput"
      type="text"
      @keydown="editModeOnKeyDown"
    >
    <div
      v-if="mode===noteModes.editTodoList"
      class="noteControls"
    >
      <button
        class="editButton"
        @click="toggleEditText"
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
import { validateText } from '@/utils/validator';
import CheckBox from '@/components/Checkbox';

import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/xIcon.svg';

export default {
    components: {
        CheckBox,
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
            isEditMode: false,
            inputEditText: this.todoItem.text,
            noteModes: NOTE_MODE,
            editIcon,
            deleteIcon,
        };
    },
    updated () {
        this.$nextTick(function () {
            this.isEditMode && this.$refs.inputEditText && this.$refs.inputEditText.focus();
        });
    },
    methods: {
        updateTodoText () {
            const { isValid, errorMessage } = validateText(TODO_CREATOR_RULES, this.inputEditText);
            if (isValid) {
                this.$store.commit('updateTodoItemText',
                    { noteId: this.noteId, todoId: this.todoItem.id, text: this.inputEditText }
                );
                this.isEditMode = !this.isEditMode;
            } else {
                console.warn(`validation failed: ${errorMessage}`);
                this.resetTodoText();
            }
        },
        resetTodoText () {
            this.inputEditText = this.todoItem.text;
            this.isEditMode = !this.isEditMode;
        },
        editModeOnKeyDown (event) {
            switch (event.code) {
                case 'Escape': {
                    this.resetTodoText();
                    break;
                }
                case 'Enter': {
                    this.updateTodoText();
                    break;
                }
            }
        },
        toggleEditText () {
            if (this.isEditMode) {
                this.updateTodoText();
            } else {
                this.resetTodoText();
            }
        }
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
    .noteText {
      text-decoration-line: line-through;
    }
  }

  .noteText, .noteInput {
    width: 100%;
    padding: 0 15px;
  }

  .noteText {
      text-align: left;
  }

  .noteInput {
    margin: 0 10px;
    border-radius: 10px;
    font-size: 1em;
    border: none;
    box-shadow: inset 0 0 3px #4499FF;

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
