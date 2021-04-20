<template>
  <div class="addDialog">
    <!-- :title="title" -->
    <el-dialog :visible="dialogVisible" width="368px" top="15">
      <div class="mainoutbox">
        <div class="contentoutbox">
          <div class="titleoutbox">
            <div class="titleoutbox_left">
              <div class="titleName">{{ title }}</div>
            </div>
            <div class="titleoutbox_right" @click="closedialogfun">×</div>
          </div>
          <div class="bottomcontentoutbox">
            <div class="formDiv">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="70px"
                class="demo-ruleForm"
              >
                <el-form-item label="代码：" prop="TreeNodeCode">
                  <el-input v-model="ruleForm.TreeNodeCode"></el-input>
                </el-form-item>
                <el-form-item label="名字：" prop="TreeNodeName">
                  <el-input v-model="ruleForm.TreeNodeName"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >{{title}}</el-button
                  >
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AxiosUrl from "@/middleware/services/AxiosUrl";
import { mapGetters } from "vuex";
import Bus from "@/utils/bus.js";

export default {
  name: "addDialog",

  data() {
    return {
      dialogVisible: false,
      title: "添加节点",
      ruleForm: {
        TreeNodeCode: "",
        TreeNodeName: "",
      },
      rules: {
        TreeNodeCode: [
          { required: true, message: "请输入代码", trigger: "blur" },
        ],
        TreeNodeName: [
          { required: true, message: "请填写名字", trigger: "blur" },
        ],
      },
      nodedata:{}
    };
  },
  computed: {
    ...mapGetters({
      GetPressurePointData: "rcddModule/GetPressurePointData",
    }),
  },
  mounted() {
    Bus.$on("TabfunToaddDialog",(data,e)=>{
      this.nodedata=data
      this.openDialog(data,e)
    })
  },
  methods: {
    openDialog(data,title) {
      this.title=title
       this.nodedata=data
       this.ruleForm= {
        TreeNodeCode: "",
        TreeNodeName: "",
      },
      this.dialogVisible = true;
    },
    closedialogfun() {
        this.ruleForm= {
        TreeNodeCode: "",
        TreeNodeName: "",
      },
      this.dialogVisible = false;
    },
    backclick() {
        this.ruleForm= {
        TreeNodeCode: "",
        TreeNodeName: "",
      },
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        Bus.$emit("AddTreeNodeTo",this.nodedata,this.ruleForm,this.title)
        this.closedialogfun()
        
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.addDialog {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  .el-dialog__wrapper {
    position: fixed;
    top: 15%;
  }
  /deep/ .el-dialog__header {
    padding: 0px;
    background: #f5f5f6;
    // background: red;
  }
  /deep/ .el-dialog__title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(110, 123, 139, 1);
  }
  /deep/ .el-dialog__headerbtn {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 0px;
  }
  /deep/ .el-dialog__body {
    padding: 0px 0px;
  }
  /deep/ .el-dialog {
    margin: 0 auto 0px !important;
  }
  .mainoutbox {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    margin-top: 5vh;
    .contentoutbox {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      width: 100%;
      .titleoutbox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 42px;

        border-bottom: 1px solid #d8e0e6;
        box-sizing: border-box;
        .titleoutbox_left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          margin-left: 20px;
          .titleName {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(11, 10, 15, 1);
            text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.2);
            margin-right: 20px;
          }
        }
        .titleoutbox_right {
          font-size: 22px !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #6e7b8b;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .bottomcontentoutbox {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        .formDiv{
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
