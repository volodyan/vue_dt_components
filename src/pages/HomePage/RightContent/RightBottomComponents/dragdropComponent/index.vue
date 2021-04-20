<template>
  <div class="dragdropComponent_outbox">
    <div class="dragdropComponent_inbox">
      <div class="dragdrop_leftPart">
        <div class="listoutbox">
          <div
            draggable="true"
            v-for="(item, index) in lists"
            :key="index"
            class="itembox"
            :id="'mytest' + index"
            :class="{ Activeitembox: NowIndex === index }"
            @click="ItemClick(item, index)"
            @mousedown="mousedownfun($event, item, index)"
            @dragstart="dragstartfun($event, item, index)"
          >
            {{ item }}
          </div>
          <!--  :id="'mytest'+index" -->
        </div>
      </div>
      <div
        class="dragdrop_rightPart"
        @dragenter="dragenterfun($event)"
        @dragover="dragoverfun($event)"
        @dragleave="dragleavefun($event)"
        @drop="dropfun($event)"
        ref="mySavebox"
        id="mySaveboxid"
      >
      
      </div>
    </div>
  </div>
</template>
<script>
import {
  createcomponents,
  removecomponents,
} from "@/utils/createcomponents.js";
const _import = require("@/utils/importcomponentsjs/_import_" + process.env.NODE_ENV); //获取组件的方法
import dragdttable from './dtdragcomponents/dragdttable'
import dragdtinput from './dtdragcomponents/dragdtinput'
import dragdtimg from './dtdragcomponents/dragdtimg'
import dragdtfrom from './dtdragcomponents/dragdtfrom'
import dragdtDatePicker from './dtdragcomponents/dragdtDatePicker'
import dragdtbutton from './dtdragcomponents/dragdtbutton'
export default {
  name: "dragdropComponent",
  components:{
    dragdttable,
    dragdtinput,
    dragdtimg,
    dragdtfrom,
    dragdtDatePicker,
    dragdtbutton
  },
  data() {
    return {
      lists: ["dragdttable", "dragdtinput", "dragdtimg", "dragdtfrom","dragdtDatePicker","dragdtbutton"],
      NowIndex: 0,
    };
  },
  methods: {
    ItemClick(item, index) {
      this.NowIndex = index;
      this.createcomponentsFun(_import(item),"mySaveboxid")
    },
    //兼容IE8-浏览器
    mousedownfun(e, item, index) {
      //let mytarget=this.$refs[`mytest${index}`]
      let mytarget = document.getElementById(`mytest${index}`);
      console.log("mytarget", mytarget);
      if (mytarget.dragDrop) {
        mytarget.dragDrop();
      }
    },
    dragstartfun(e, item, index) {
      e = e || window.event;
      //兼容firefox浏览器
      console.log("开始拖拽", e.target);
      //e.dataTransfer.setData("text", e.target.id);
       e.dataTransfer.setData("text", item);
      e.dataTransfer.effectAllowed = "all";
    },
    dragenterfun(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },

    dragoverfun(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      e.dataTransfer.dropEffect = "copy";
    },

    dragleavefun(e) {
      e = e || window.event;
    },
    dropfun(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      console.log("拖放", e);

      let data = e.dataTransfer.getData("text");
      console.log("拖放---data", data,e.target.id);
    
      // let mySavebox = this.$refs.mySavebox;
      // mySavebox.innerHTML = `cloneNodedata.outerHTML-----${data}`;
      this.createcomponentsFun(_import(data),e.target.id)
    },
     createcomponentsFun(myComponent,id) {
      console.log("myComponent,id", myComponent,id);
      // 创建组件，并挂载到指定元素上
      removecomponents(myComponent, {
        DomId: "mySaveboxid",
      });
      createcomponents(myComponent, {
        message: `${Math.random() * 100}`,
        DomId: "mySaveboxid",
        refData: "",
        IsShowdialogComponentStyle: `position:absolute;transform:translate(${0}px,${0}px)`,
      });
    },

  },
};
</script>
<style lang="scss" scoped>
.dragdropComponent_outbox {
  width: 100%;
  .dragdropComponent_inbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: calc(100% - 20px);
    height: 360px;
    margin: 10px;

    .dragdrop_leftPart {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: calc(100% / 2 - 10px);
      height: 360px;
      border: 1px dashed #ccc;
      .listoutbox {
        width: calc(30% - 40px);
        .itembox {
          padding: 5px 10px;
          border: 1px solid #ccc;
          margin-bottom: 5px;
          cursor: pointer;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .Activeitembox {
          background: chocolate;
          border: 1px dashed #ccc;
        }
      }
    }
    .dragdrop_rightPart {
      width: calc(100% / 2 - 10px);
      height: 360px;
      border: 1px dashed #ccc;
      overflow: auto;
    }
  }
}
</style>