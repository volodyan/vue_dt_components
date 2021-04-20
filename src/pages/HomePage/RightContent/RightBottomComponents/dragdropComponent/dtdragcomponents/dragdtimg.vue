
<template>

  <div class="block">
    <span class="demonstration">默认</span>
    <el-image :src="src"></el-image>
  </div>
</template>
<script>
export default {
  name: "dragdtimg",
  data() {
    return {
     src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    };
  },
  
};
</script>
<style lang="scss" scoped>

</style>
