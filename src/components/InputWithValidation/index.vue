<template>
  <div class="root">
    <div class="form">
      <input
        v-model="titleText"
        :placeholder="placeholder"
        type="text"
      >
      <button
        type="button"
        @click="onSubmit"
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
import { validateText } from '@/utils/validator';

export default {
    props: {
        placeholder: String,
        validationRules: Object,
    },
    data: function () {
        return {
            titleText: '',
            validationMessage: '',
        };
    },
    methods: {
        onSubmit () {
            const { isValid, errorMessage } = validateText(this.validationRules, this.titleText);
            if (!isValid) {
                this.validationMessage = errorMessage;
                return;
            }
            this.$emit('onSubmit', this.titleText);
            this.titleText = '';
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

        input {
            width: 100%;
            border: 1px solid #eee;
            border-radius: 10px 0 0 10px;
            padding: 5px 15px;
            font-size: 1em;
        }

        button {
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
