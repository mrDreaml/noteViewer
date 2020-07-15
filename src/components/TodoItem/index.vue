<template>
  <li :class="['todoItem', { completed: todoItem.isDone}]">
    <div class="noteControls">
      <div
        v-if="mode===noteModes.editTodoList"
        class="checkBoxWrapper"
      >
        <CheckBox
          :is-selected="todoItem.isDone"
          @on-change="toggleDoneStatus"
        />
      </div>
      <strong class="noteIndex">
        {{ `${itemNumber}.` }}
      </strong>
    </div>
    <span class="noteText">
      {{ todoItem.text }}
    </span>
    <div
      v-if="mode===noteModes.editTodoList"
      class="noteControls"
    >
      <button
        class="deleteBtn"
        @click="$emit('removeItem', todoItem.id)"
      >
        &times;
      </button>
    </div>
  </li>
</template>

<script>
import NOTE_MODE from '@/constants/noteMode';
import CheckBox from '@/components/Checkbox';

export default {
    components: {
        CheckBox,
    },
    props: {
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
            noteModes: NOTE_MODE,
        };
    },
    methods: {
        toggleDoneStatus () {
            this.$emit('toggleDoneStatus', this.todoItem.id);
        }
    }
};
</script>

<style lang="scss">
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

    .noteText {
        width: 100%;
        padding: 0 15px;
        text-align: left;
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

.deleteBtn {
    background: none;
    border: 0;
    border-radius: 50%;
    font-size: 1.2em;
    padding: 0;
    width: 18px;
    height: 18px;

    &:hover {
      color: #f00;
    }

    &:focus {
        outline: none;
    }
}
</style>
