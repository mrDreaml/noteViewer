<template>
  <div class="app">
    <Modal v-if="isOpenedModal" />
    <header>
      <div class="logoWrapper">
        <img
          class="logo"
          alt="noteViewer"
          :src="logoImg"
        >
      </div>
      <nav class="links">
        <router-link
          v-for="link in mainLinks"
          :key="link.name"
          :to="link.path"
        >
          {{ link.name }}
        </router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import * as R from 'ramda';
import logoImg from '@/assets/logo.png';
import pages from '@/constants/pages';

import Modal from '@/components/Modal';
import { rollBack, rollBackToFuture } from '@/vuex/modules/history';

export default {
    components: {
        Modal,
    },
    data () {
        return {
            logoImg,
            mainLinks: pages.filter(R.prop('isVisibleAtHeader')),
        };
    },
    computed: {
        isOpenedModal () {
            return this.$store.state.modal.isOpened;
        }
    },
    created () {
        document.addEventListener('keydown', this.globalKeyHandler);
    },
    beforeDestroy () {
        window.removeEventListener('keydown', this.globalKeyHandler);
    },
    methods: {
        globalKeyHandler (event) {
            if (event.ctrlKey && event.shiftKey && event.keyCode === 90) {
                this.$store.dispatch(`history/${rollBackToFuture}`);
            } else if (event.ctrlKey && event.keyCode === 90) {
                this.$store.dispatch(`history/${rollBack}`);
            }
        },
    },
};
</script>

<style lang="scss">
  *:focus {
    outline: none;
  }
body, html {
  margin: 0;
  padding: 0;
}

ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  flex-shrink: 0;
  background-color: #fff;
  height: 40px;
  justify-content: flex-start;
}


.logoWrapper {
  display: flex;
  align-items: center;
  margin: 0 15px;
  width: fit-content;
  .logo {
    width: 30px;
    height: 30px;
  }
}

.links {
  display: flex;
  a {
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &:hover {
      background: #eee;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
