<template>
  <span
    v-if="!isEditMode"
    class="editableText"
    @dblclick="toggleEditText"
  >
    {{ value | cutValue(cutTextValue) }}
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
import { makeShortValue } from '@/utils/shortValue';

export default {
    filters: {
        cutValue (value, length) {
            return length !== -1 ? makeShortValue(value, length) : value;
        },
    },
    props: {
        isEditAvailable: Boolean,
        cutTextValue: Number,
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
        toggleEditMode () {
            this.isEditMode = !this.isEditMode;
        },
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
            if (this.isEditAvailable) {
                if (this.isEditMode) {
                    this.updateTodoText();
                } else {
                    this.resetTodoText();
                }
            }
        },
    }
};
</script>
