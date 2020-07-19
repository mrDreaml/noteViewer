<template>
  <div
    v-if="!isNoSelectedNote"
    class="noteWrapper"
  >
    <TodoCreator :note-id="note.id" />
    <Note
      :key="note.noteTitle"
      :note="note"
      :mode="mode"
    />
  </div>
  <div
    v-else
    class="noSelectedNote"
  >
    <span>please select note before</span>
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
        const data = { isNoSelectedNote: false, mode: NOTE_MODE.editTodoList, note: {} };
        if (id) {
            data.note = this.$store.getters.getNoteById(id);
        } else {
            data.isNoSelectedNote = true;
        }
        return data;
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

  .noSelectedNote {
    display: flex;
    width: 100%;
    span {
      margin: auto;
    }
  }
</style>
