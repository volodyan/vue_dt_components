<template>
  <div class="pdf-container">
    <aside style="margin-top:15px;">
      Here we use window.print() to implement the feature of downloading PDF.
    </aside>
    <router-link target="_blank" to="/pdf/download">
      <el-button type="primary">
        Click to download PDF
      </el-button>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
  .pdf-container{
    border: 1px dashed #333;
    margin: 10px;
    padding: 5px;
  }
</style>

