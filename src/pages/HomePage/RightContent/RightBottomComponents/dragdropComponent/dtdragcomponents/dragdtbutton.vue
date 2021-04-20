
<template>
  <div class="block">
   <el-button type="primary" @click="one($event), two($event)">主要按钮</el-button>
   <input v-model="input" @keyup.enter="submit" />
<div v-for="(value, name) in myObject" :key="name">
  {{ name }}: {{ value }}
</div>
  </div>
</template>
<script>
export default {
  name: "dragdtbutton",
  data() {
    return {
      input: "",
         myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2020-03-22'
      }
    };
  },
  methods:{
     one(event) {
    // 第一个事件处理器逻辑...
    console.log("第一个事件处理器逻辑...")
  },
  two(event) {
   // 第二个事件处理器逻辑...
   console.log("第二个事件处理器逻辑...")
  },
  submit(){
     console.log("回车事件处理器逻辑...")
  }
  }
};
</script>
<style lang="scss" scoped>
</style>
