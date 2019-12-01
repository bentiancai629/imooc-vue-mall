<template>
  <div class="hello">
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <p><span>{{ num }}</span></p>
  </div>
</template>

<script>
export default {
  props: ["num"], //从父组件传递num值进来
  data () {
    return {
      num: 0,
    }
  },
  methods: {
    increment() {
      //子组件传父组件
      this.$emit("incre");
    },
    decrement() {
      this.$emit("decre");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
