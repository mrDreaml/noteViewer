<template>
  <div class="modalWrapper">
    <ModalContent @answer="answer" />
  </div>
</template>

<script>
import DeleteModal from './components/deleteModal';
import { closeModal } from '@/vuex/modules/modal';

const ModalContent = DeleteModal;
export default {
    components: {
        ModalContent,
    },
    methods: {
        answer (value) {
            const answer = this.$store.getters.getModalAnswerData(value);
            if (answer) {
                const [ actionType, payload ] = answer;
                this.$store.dispatch(actionType, payload);
            }
            this.$store.commit(closeModal);
        }
    }
};
</script>

<style lang="scss" scoped>
    .modalWrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        z-index: 1000;
        background-color: #00000011;
    }
</style>
