<template>
  <div>
    <div class="noteWrapper">
      <Note
        v-for="note in notes"
        :key="note.noteTitle"
        :note="note"
        :mode="mode"
        @deleteNote="deleteNote"
        @goToNote="goToNote"
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
            notes: this.$store.state.notesList,
            mode: NOTE_MODE.editNote,
        };
    },
    methods: {
        deleteNote (id) {
            this.notes = this.notes.filter(note => note.id !== id);
        } ,
        goToNote (id) {
            this.$router.push({ path: 'editNote', query: { id } });
        }
    },
};
</script>

<style lang="scss">
  .noteWrapper {
    width: 300px;
  }
</style>
