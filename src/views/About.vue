<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import * as R from 'ramda';

export default {
    data () {
        const query = R.path([ 'history', 'current', 'query' ], this.$router);
        console.log('>>', query, this.$store.state);
        return {};
    }
};
</script>
