
<template>
 <div class="block">
    <span class="demonstration">月</span>
    <el-date-picker
      v-model="value2"
      type="month"
      placeholder="选择月">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "dragdtDatePicker",
  data() {
    return {
      value2: "",
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
