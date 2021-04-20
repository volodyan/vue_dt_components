<template>
  <div class="LeftContent">
    <div class="Treeoutbox">
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="TreeNodeRank"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              Append
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              Delete
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
let TreeNodeRank = 1000;
export default {
  name: "LeftContent",
  data() {
    const data = [
      {
        TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
        TreeNodeCode: "SCXT",
        TreeNodeParentGuid: "",
        TreeNodeName: "水厂系统",
        TreeNodeRank: 1,
        TreeNodeTypeCode: "SCXT",
        TreeNodeTypeName: "水厂系统",
        Children: [
           {
            TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
            TreeNodeCode: "SCXT",
            TreeNodeParentGuid: "",
            TreeNodeName: "添加",
            TreeNodeRank: 1233,
            TreeNodeTypeCode: "SCXT",
            TreeNodeTypeName: "水厂系统",
            Children: [],
          },
          {
            TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
            TreeNodeCode: "SCXT",
            TreeNodeParentGuid: "",
            TreeNodeName: "水厂系统",
            TreeNodeRank: 11,
            TreeNodeTypeCode: "SCXT",
            TreeNodeTypeName: "水厂系统",
            Children: [
              {
                TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
                TreeNodeCode: "SCXT",
                TreeNodeParentGuid: "",
                TreeNodeName: "水厂系统",
                TreeNodeRank: 111,
                TreeNodeTypeCode: "SCXT",
                TreeNodeTypeName: "水厂系统",
                Children: [],
              },
              {
                TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
                TreeNodeCode: "SCXT",
                TreeNodeParentGuid: "",
                TreeNodeName: "数据属性",
                TreeNodeRank: 112,
                TreeNodeTypeCode: "SCXT",
                TreeNodeTypeName: "水厂系统",
                Children: [],
              },
              {
                TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
                TreeNodeCode: "SCXT",
                TreeNodeParentGuid: "",
                TreeNodeName: "基本属性",
                TreeNodeRank: 113,
                TreeNodeTypeCode: "SCXT",
                TreeNodeTypeName: "水厂系统",
                Children: [],
              },
              {
                TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
                TreeNodeCode: "SCXT",
                TreeNodeParentGuid: "",
                TreeNodeName: "KPI属性",
                TreeNodeRank: 114,
                TreeNodeTypeCode: "SCXT",
                TreeNodeTypeName: "水厂系统",
                Children: [],
              },
            ],
          },
          {
            TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
            TreeNodeCode: "SCXT",
            TreeNodeParentGuid: "",
            TreeNodeName: "数据属性",
            TreeNodeRank: 12,
            TreeNodeTypeCode: "SCXT",
            TreeNodeTypeName: "水厂系统",
            Children: [],
          },
          {
            TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
            TreeNodeCode: "SCXT",
            TreeNodeParentGuid: "",
            TreeNodeName: "基本属性",
            TreeNodeRank: 13,
            TreeNodeTypeCode: "SCXT",
            TreeNodeTypeName: "水厂系统",
            Children: [],
          },
          {
            TreeNodeGuid: "842768BA-19A0-4342-BC0D-72F5D9AC40FE",
            TreeNodeCode: "SCXT",
            TreeNodeParentGuid: "",
            TreeNodeName: "KPI属性",
            TreeNodeRank: 14,
            TreeNodeTypeCode: "SCXT",
            TreeNodeTypeName: "水厂系统",
            Children: [],
          },
        ],
      },
     
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      defaultProps: {
        children: "Children",
        label: "TreeNodeName",
      },
    };
  },

  methods: {
    append(data) {
      const newChild = {
        TreeNodeRank: TreeNodeRank++,
        TreeNodeName: "testtest",
        Children: [],
      };
      if (!data.Children) {
        this.$set(data, "Children", []);
      }
      data.Children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const Children = parent.data.Children || parent.data;
      const index = Children.findIndex(
        (d) => d.TreeNodeRank === data.TreeNodeRank
      );
      Children.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.LeftContent {
  width: 100%;
  .Treeoutbox {
    width: 100%;
    height: vh(969);
    overflow: auto;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>