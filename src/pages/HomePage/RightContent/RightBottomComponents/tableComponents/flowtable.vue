<template>
  <div>
    <el-table :data="TableData" border stripe>
      <el-table-column
        v-for="info in HeaderData"
        :key="info.key"
        :property="info.key"
        :label="info.label"
      >
        <template slot-scope="scope">
          {{ scope.row[scope.column.property] }}
        </template>
      </el-table-column>
      <el-table-column label="启用状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.ifUse"> </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "flowtable",
  data() {
    return {
      HeaderData: [
        {
          label: "编码",
          key: "code",
        },
        {
          label: "名称",
          key: "name",
        },
        {
          label: "权限描述",
          key: "description",
        },
      ],
      TableData: [
        {
          id: 221,
          code: "01",
          name: "nvarchar(50)",
          description: "FactoryCode",
          ifUse: "0",
        },
        {
          id: 222,
          code: "02",
          name: "nvarchar(50)",
          description: "FactoryCode",
          ifUse: "0",
        },
        {
          id: 223,
          code: "03",
          name: "nvarchar(50)",
          description: "FactoryCode",
          ifUse: "0",
        },
        {
          id: 224,
          code: "04",
          name: "nvarchar(50)",
          description: "FactoryCode",
          ifUse: "0",
        },
        {
          id: 225,
          code: "05",
          name: "nvarchar(50)",
          description: "FactoryCode",
          ifUse: "0",
        },
      ],
    };
  },
};
</script>