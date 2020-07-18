<template>
  <div class="root">
    <div class="form">
      <input
        v-model="todoText"
        class="addTodoInput"
        placeholder="todo name"
        type="text"
      >
      <button
        class="buttonAddTodo"
        type="button"
        @click="addTodo"
      >
        add
      </button>
    </div>
    <span
      v-if="validationMessage"
      class="errorMessage"
    >
      {{ `* ${validationMessage}` }}
    </span>
  </div>
</template>

<script>
import { TODO_CREATOR_RULES } from '@/constants/validationRules';
import { validateText } from '@/utils/validator';

export default {
    props: {
        noteId: String,
    },
    data: function () {
        return {
            todoText: '',
            validationMessage: '',
        };
    },
    methods: {
        addTodo () {
            const { isValid, errorMessage } = validateText(TODO_CREATOR_RULES, this.todoText);
            if (!isValid) {
                this.validationMessage = errorMessage;
                return;
            }
            this.$store.commit('addTodo', { noteId: this.noteId, text: this.todoText });
            this.todoText = '';
            this.validationMessage = '';
        },
    }
};
</script>

<style lang="scss" scoped>
    .root {
        display: flex;
        flex-direction: column;
        margin: 25px 0;
    }

    .form {
        display: flex;
        box-shadow: 1px 1px 3px #eeeeee55;
        border-radius: 10px;

        &:focus-within {
            box-shadow: 1px 1px 3px #eef;
        }

        .addTodoInput {
            width: 100%;
            border: 1px solid #eee;
            border-radius: 10px 0 0 10px;
            padding: 5px 15px;
            font-size: 1em;
        }

        .buttonAddTodo {
            width: 150px;
            flex-shrink: 1;
            border: 1px solid #eee;
            border-radius: 0 10px 10px 0;
            transition: .3s;

            &:hover {
                background-color: #f5f5f5;
            }
        }
    }

    .errorMessage {
        color: #ff0000;
        text-align: left;
        margin-top: 5px;
        margin-left: 10px;
        font-size: .75em;
    }
</style>
