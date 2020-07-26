<template>
  <InputWithValidation
    :validation-rules="validationRules"
    placeholder="add todo"
    @onSubmit="onSubmit"
  />
</template>

<script>
import { TITLE_CREATOR_RULES } from '@/constants/validationRules';
import InputWithValidation from '@/components/InputWithValidation';
import { addTodoAction } from '@/vuex/modules/note';

export default {
    components: {
        InputWithValidation
    },
    props: {
        noteId: String,
    },
    data: function () {
        return {
            titleText: '',
            validationRules: TITLE_CREATOR_RULES,
        };
    },
    methods: {
        onSubmit (text) {
            this.$store.dispatch(addTodoAction, { noteId: this.noteId, text });
        }
    }
};
</script>
