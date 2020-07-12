<template>
  <li class="todoItem">
    <div class="noteControls">
      <div class="checkBoxWrapper">
        <CheckBox
          :is-selected="isSelected"
          @on-change="toggleDoneStatus"
        />
      </div>
      <strong class="noteIndex">
        1.
      </strong>
    </div>
    <span class="noteText">
      {{ todoItem.text }}
    </span>
    <div class="noteControls">
      <button class="deleteBtn">
        &times;
      </button>
    </div>
  </li>
</template>

<script>
import CheckBox from '@/components/Checkbox';

export default {
    components: {
        CheckBox,
    },
    props: {
        todoItem: {
            type: Object,
            default () {
                return [];
            },
        },
    },
    methods: {
        toggleDoneStatus () {

        }
    }
};
</script>

<style lang="scss">
.todoItem {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;

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
        background: #eee;
    }

    &:focus {
        outline: none;
    }
}
</style>
