<template>
  <div class="root">
    <div class="noteCreatorWrapper">
      <NoteCreator />
    </div>
    <div class="wrapper">
      <div
        v-for="note in notes"
        :key="note.id"
        class="noteWrapper"
      >
        <Note
          :todo-list-items-limit="todoListItemsLimit"
          :note="note"
          :mode="mode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NOTE_MODE from '@/constants/noteMode';

import Note from '@/components/Note';
import NoteCreator from '@/components/NoteCreator';

export default {
    name: 'AllNotes',
    components: {
        Note,
        NoteCreator,
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
  .root {
    display: flex;
    flex-direction: column;
  }

  .noteCreatorWrapper {
    width: 700px;
    margin: auto;
  }

  @media screen and (max-width: 700px) {
    .noteCreatorWrapper {
      width: 350px;
    }
  }

  @media screen and (max-width: 670px) {
    .wrapper {
      flex-direction: column;
      flex-wrap: nowrap!important;

      .noteWrapper {
        margin: auto;
        width: 100%;
      }
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .noteWrapper {
    display: flex;
    margin: 5px 7px;
    width: 300px;
  }
</style>
