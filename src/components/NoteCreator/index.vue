<template>
  <InputWithValidation
    :validation-rules="validationRules"
    placeholder="add note"
    @onSubmit="onSubmit"
  />
</template>

<script>
import { TITLE_CREATOR_RULES } from '@/constants/validationRules';
import InputWithValidation from '@/components/InputWithValidation';

export default {
    components: {
        InputWithValidation
    },
    data: function () {
        return {
            titleText: '',
            validationRules: TITLE_CREATOR_RULES,
        };
    },
    methods: {
        onSubmit (value) {
            this.$store.commit('addNote', { noteTitle: value });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
