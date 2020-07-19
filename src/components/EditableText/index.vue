<template>
  <span
    v-if="!isEditMode"
    class="editableText"
    @dblclick="toggleEditText"
  >
    {{ value }}
  </span>
  <input
    v-else
    ref="inputEditText"
    v-model="inputEditText"
    class="editableInput"
    type="text"
    @keydown="onKeyDown"
  >
</template>

<script>
import { validateText } from '@/utils/validator';

export default {
    props: {
        value: String,
        validationRule: {
            type: Object,
            default () {
                return {};
            }
        },
    },
    data: function () {
        return {
            isEditMode: false,
            inputEditText: this.value,
        };
    },
    updated () {
        this.$nextTick(function () {
            this.isEditMode && this.$refs.inputEditText && this.$refs.inputEditText.focus();
        });
    },
    methods: {
        updateTodoText () {
            const { isValid, errorMessage } = validateText(this.validationRule, this.inputEditText);
            if (isValid) {
                this.$emit('updateValue', this.inputEditText);
                this.toggleEditMode();
            } else {
                console.warn(`validation failed: ${errorMessage}`);
                this.resetTodoText();
            }
        },
        resetTodoText () {
            this.inputEditText = this.value;
            this.toggleEditMode();
        },
        onKeyDown (event) {
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
        },
        toggleEditMode () {
            this.isEditMode = !this.isEditMode;
        }
    }
};
</script>
