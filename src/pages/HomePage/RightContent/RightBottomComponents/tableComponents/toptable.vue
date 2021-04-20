<template>
  <div class="toptable_outbox">
    <div
      class="toptable_inbox"
      :ref="refData"
      :style="IsShowdialogComponentStyle"
    >
      {{ message }}
      <el-table :data="TableData" border stripe>
        <el-table-column
          v-for="info in HeaderData"
          :key="info.key"
          :property="info.key"
          :label="info.label"
        >
          <template slot-scope="scope">
            <div
              :class="
                scope.column.property === 'columnName' ? '' : 'scopeElInput'
              "
            >
              <span v-if="scope.column.property === 'columnName'">{{
                scope.row[scope.column.property]
              }}</span>
              <el-input
                v-else
                v-model="scope.row[scope.column.property]"
                placeholder="请输入内容"
                @input="Inputfun(scope.column.property)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "toptable",
  data() {
    return {
      HeaderData: [
        {
          label: "列名",
          key: "columnName",
        },
        {
          label: "数据类型",
          key: "DataType",
        },
        {
          label: "代码",
          key: "Code",
        },
        {
          label: "控件类型",
          key: "ControlType",
        },
      ],
      TableData: [
        {
          columnName: "编码",
          DataType: "",
          Code: "",
          ControlType: "",
        },
        {
          columnName: "区域范围",
          DataType: "",
          Code: "",
          ControlType: "",
        },
        {
          columnName: "中心坐标",
          DataType: "",
          Code: "",
          ControlType: "",
        },
        {
          columnName: "所属组织",
          DataType: "",
          Code: "",
          ControlType: "",
        },
        {
          columnName: "标高",
          DataType: "",
          Code: "",
          ControlType: "",
        },
      ],
    };
  },
  props: ["message", "DomId", "refData", "IsShowdialogComponentStyle"],
  methods: {
    Inputfun(val) {
      if (val === "ControlType") {
        console.log("val", val);
        if (
          !!this.TableData[this.TableData.length - 1].DataType &&
          !!this.TableData[this.TableData.length - 1].Code
        ) {
          this.TableData.push({
            columnName: "",
            DataType: "",
            Code: "",
            ControlType: "",
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.toptable_outbox {
  width: 100%;
  position: relative;
  .toptable_inbox {
    width: 100%;

    .scopeElInput {
      width: 100%;
      //background: #c8ced3;
    }
  }
}
</style>