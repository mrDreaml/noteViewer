<template>
  <div class="noteWrapper">
    <TodoCreator :note-id="note.id" />
    <Note
      :key="note.noteTitle"
      :note="note"
      :mode="mode"
    />
  </div>
</template>

<script>
import * as R from 'ramda';
import Note from '@/components/Note';
import TodoCreator from '@/components/TodoCreator';
import NOTE_MODE from '@/constants/noteMode';

export default {
    components: {
        Note,
        TodoCreator,
    },
    data () {
        const query = R.path([ 'history', 'current', 'query' ], this.$router);
        const id = R.prop('id', query);
        return {
            mode: NOTE_MODE.editTodoList,
            note: this.$store.getters.getNoteById(id),
        };
    }
};
</script>

<style lang="scss" scoped>
  .noteWrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 600px;
  }
</style>
