<template>
  <div>
    <div class="noteWrapper">
      <Note
        v-for="note in notes"
        :key="note.noteTitle"
        :todo-list-items-limit="todoListItemsLimit"
        :note="note"
        :mode="mode"
      />
    </div>
  </div>
</template>

<script>
import Note from '@/components/Note';
import NOTE_MODE from '@/constants/noteMode';

export default {
    name: 'AllNotes',
    components: {
        Note,
    },
    data () {
        return {
            mode: NOTE_MODE.editNote,
            todoListItemsLimit: 5,
        };
    },
    computed: {
        notes () {
            return this.$store.getters.getNotesList();
        }
    },
};
</script>

<style lang="scss" scoped>
  .noteWrapper {
    width: 300px;
  }
</style>
