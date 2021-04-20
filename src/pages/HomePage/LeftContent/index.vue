<template>
  <div class="LeftContent">
    <div class="filterTextInputbox">
      <div class="inputbox">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search">
        </el-input>
      </div>
    </div>
    <div class="Treeoutbox" ref="IsShowDialogComponent">
      <el-tree
        :data="data"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :icon-class="'MySetIconClass'"
        :indent="22"
        @node-click="Eltree_NodeClickfun"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
        node-key="Sequence"
        :highlight-current="isShowGaoliang"
        ref="deptTree"
        :filter-node-method="filterNode"
        ><!-- Sequence -->
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
          @click="nodeClickfun($event, node, data)"
          @contextmenu.prevent="nodeContextmenu($event, node, data)"
        >
          <span
            class="iconfont icon-add-list iconfontboxAdd"
            v-if="node.label === 'Add'"
          ></span>
          <span class="iconfont icon-guanli iconfontbox" v-else></span>
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <addDialog ref="addDialog" />
    <IsShowDialogComponent
      v-if="IsShowaddDialogComponents"
      class="addDialogComponents"
      :style="addDialogComponentsStyle"
      :Editdata="Editdata"
    />
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import addDialog from "./addComppnents/addDialog";
import IsShowDialogComponent from "./addComppnents/IsShowDialogComponent";
import { Loading, Message } from "element-ui";
export default {
  name: "LeftContent",
  components: {
    addDialog,
    IsShowDialogComponent,
  },
  data() {
  
    return {
      data: [], 
      defaultProps: {
        children: "Children",
        label: "TreeNodeName",
      },
      IsShowaddDialogComponents: false,
      addDialogComponentsStyle: {
        top: "",
        left: "",
      },
      isShowGaoliang: false,
      Editdata: {},
      filterText: "",
    };
  },
  mounted() {
    //
    this.GettreeData();
    window.addEventListener("click", this.otherClose);
    Bus.$on("TabfunToaddDialog", (e) => {
      this.IsShowaddDialogComponents = false;
    });
    Bus.$on("AddTreeNodeTo", (nodedata, ruleForm, title) => {
      console.log("nodedata,ruleForm", nodedata, ruleForm, title);
      let obj = {
        TreeNodeGuid: nodedata.TreeNodeGuid,
        TreeNodeCode: ruleForm.TreeNodeCode,
        TreeNodeParentGuid: nodedata.TreeNodeParentGuid,
        TreeNodeName: ruleForm.TreeNodeName,
        Children: nodedata.Children,
      };
      if (title === "添加节点") {
        this.AddTreeNode(obj);
      } else {
        this.UpdateTreeNode(obj);
      }
      //
    });
    Bus.$on("DelTreeNodeTo", (nodedata) => {
      let obj = {
        TreeNodeGuid: nodedata.TreeNodeGuid,
      };
      this.IsShowaddDialogComponents = false;
      this.DelTreeNode(obj);
    });
  },
  beforeDestroy() {
    /* 组件销毁的时候要移除侦听器 */
    window.removeEventListener("click", this.otherClose);
  },
  watch: {
    filterText(val) {
      this.$refs.deptTree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      //return data.TreeNodeName.indexOf(value) !== -1;
      return data.TreeNodeName.toLowerCase().includes(value.toLowerCase());
    },
    nodeClickfun(event, node, data) {
      console.log("event,node, data", event, node, data);
      this.IsShowaddDialogComponents = false;
      this.$nextTick(() => {
        // 使树筛选时选中的节点高亮显示
        this.isShowGaoliang = true;
        this.$refs.deptTree.setCurrentKey(data.Sequence);
      });
      if (data.TreeNodeName === "Add") {
        this.$refs.addDialog.openDialog(data, "添加节点");
      }
    },
    nodeContextmenu(event, node, data) {
      console.log("nodeContextmenu---event,node, data", event, node, data);
      if (
        data.TreeNodeName !== "Add" &&
        data.TreeNodeName !== "KPI属性" &&
        data.TreeNodeName !== "数据属性" &&
        data.TreeNodeName !== "基本属性"
      ) {
        this.Editdata = data;
        this.addDialogComponentsStyle = {
          top: `${event.y + 10}px`,
          left: `${event.x}px`,
        };
        this.IsShowaddDialogComponents = true;
        this.$nextTick(() => {
          // 使树筛选时选中的节点高亮显示
          this.isShowGaoliang = true;
          this.$refs.deptTree.setCurrentKey(data.Sequence);
        });
      }
    },
    otherClose(e) {
      if (!this.$refs.IsShowDialogComponent.contains(e.target))
        this.IsShowaddDialogComponents = false;
    },
    Eltree_NodeClickfun() {
      this.IsShowaddDialogComponents = false;
    },
    nodeExpand() {
      this.IsShowaddDialogComponents = false;
    },
    nodeCollapse() {
      this.IsShowaddDialogComponents = false;
    },
    GettreeData() {
      this.$axios
        .post(AxiosUrl.baseUrlPath + "TreeNode/GeTreeData")
        .then((res) => {
          console.log("treeData", res);
          this.data = res.data.Response;
        })
        .catch((error) => {});
    },
    AddTreeNode(obj) {
      console.log("AddTreeNode---入参", obj);
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "TreeNode/AddTreeNode",
          JSON.stringify(obj),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("AddTreeNode", res);
          this.GettreeData();
          this.$message({
            type: "success",
            message: res.data.Message,
            center: true,
            duration: 5000,
            customClass: "MyMesageStyle",
            showClose: true,
          });
        })
        .catch((error) => {});
    },
    UpdateTreeNode(obj) {
      console.log("UpdateTreeNode---入参", obj);
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "TreeNode/UpdateTreeNode",
          JSON.stringify(obj),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("UpdateTreeNode", res);
          this.GettreeData();
            this.$message({
            type: "success",
            message: res.data.Message,
            center: true,
            duration: 5000,
            customClass: "MyMesageStyle",
            showClose: true,
          });
        })
        .catch((error) => {});
    },
    DelTreeNode(obj) {
      console.log(" DelTreeNode---入参", obj);
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "TreeNode/DelTreeNode",
          JSON.stringify(obj),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("DelTreeNode", res);
          this.GettreeData();
            this.$message({
            type: "success",
            message: res.data.Message,
            center: true,
            duration: 5000,
            customClass: "MyMesageStyle",
            showClose: true,
          });
        })
        .catch((error) => {});
    },
  },
};
</script>
<style lang="scss">
.MyMesageStyle {
  min-width: 220px;
}
</style>
<style lang="scss" scoped>
.LeftContent {
  width: 100%;
  overflow-x: hidden;
  .filterTextInputbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(90);
    .inputbox {
      width: calc(100% - 40px);
    }
  }
  .Treeoutbox {
    width: 100%;
    height: vh(879);
    overflow: auto;
    margin-left: 15px;

    /deep/
      .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      background-color: #327c86;
      color: #fff;
    }
    /deep/ .el-tree-node__content:hover {
      background-color: #327c86;
      color: #fff;
    }
    /deep/ .MySetIconClass {
      font-size: 14px;
      &:before {
        display: inline-block;
        content: "";
        background: url("../../../assets/img/add.png") no-repeat;
        background-size: 19px 24px;
        width: 19px;
        height: 20px;
      }
    }
    /deep/ .MySetIconClass.expanded {
      font-size: 26px;
      &:before {
        display: inline-block;
        content: "";
        background: url("../../../assets/img/del.png") no-repeat;
        background-size: 19px 24px;
        width: 19px;
        height: 20px;
      }
    }
    /deep/ .el-tree-node__expand-icon.expanded {
      transform: rotate(0deg) !important;
    }
    /deep/ .MySetIconClass.is-leaf {
      display: none;
      content: "";
    }
    .custom-tree-node {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 30px;
      font-size: 14px;
      padding-right: 15px;
      .iconfontbox {
        margin-right: 5px;
        font-size: 14px;
      }
      .iconfontboxAdd {
        margin-right: 5px;
        font-size: 20px;
      }
    }
  }
  .addDialogComponents {
    position: fixed;
    z-index: 999;
    pointer-events: auto;
  }
}
</style>