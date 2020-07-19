<template>
  <div class="shape">
    <span class="message">
      are you sure you want to delete?
    </span>
    <div class="controls">
      <button
        class="buttonNo"
        @click="$emit('answer', 'declined')"
      >
        No
      </button>
      <button
        class="buttonYes"
        @click="$emit('answer', 'approved')"
      >
        Yes
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .shape {
    margin: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: 1px 1px 7px #00000011;
  }

  .message {
    margin-top: 10px;
    font-size: 1em;
    font-weight: bold;
  }

  .controls {
    margin: 20px 0;

    button {
      border: none;
      border-radius: 15px;
      width: 100px;
      margin: 4px 6px;
      padding: 5px;
      background-color: transparent;
      transition: .5s;
    }
    .buttonYes {
      border: 1px solid #00ff0033;
      &:hover {
        background-color: #aaffaa33;
      }
    }

    .buttonNo {
      border: 1px solid #ff000033;
      &:hover {
        background-color: #ffaaaa33;
      }
    }
  }
</style>
