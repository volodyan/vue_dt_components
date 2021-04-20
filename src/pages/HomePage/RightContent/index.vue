<template>
  <div class="RightContent RightContent_resize">
    <div class="RightContent_top Border_bottom RightContent_top_resize">
      <div class="RightContent_top_Components">
        <div class="DT_button">
          <el-button type="primary" @click="createcomponentsFun"
            >动态组件</el-button
          >
        </div>
        <div class="DT_ComponentsOutbox" id="my_DT_Components_box"></div>
      </div>
    </div>
    <div class="RightContent_DragIcon_resize">...</div>
    <div class="RightContent_bottom RightContent_bottom_resize">
      <DragDialogDemo/>
      <pdfpage/>
      <dropzone/>
       <mousedragpage/>
      <dragdropComponent/>
      <toptable/>
      <flowtable />
      <dashedborderComponent/>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import debounce from "@/utils/debounce.js";
import flowtable from "./RightBottomComponents/tableComponents/flowtable";
import toptable from "./RightBottomComponents/tableComponents/toptable";
import dragdropComponent from './RightBottomComponents/dragdropComponent/index';
import mousedragpage from './RightBottomComponents/mousedragpage/index';
import dashedborderComponent from "./RightBottomComponents/dashedborderComponent/index";
import RightTopdragdropComponent from './RightTopComponents/RightTopdragdropComponent/index';
import DragDialogDemo from './RightBottomComponents/Eldialog/drag-dialog'
import pdfpage from './RightBottomComponents/pdf/index'
import dropzone from './RightBottomComponents/upload/dropzone'
import {
  createcomponents,
  removecomponents,
} from "@/utils/createcomponents.js";
export default {
  name: "RightContent",
  components: {
    flowtable,
    toptable,
    dashedborderComponent,
    dragdropComponent,
    mousedragpage,
    RightTopdragdropComponent,
    DragDialogDemo,
    pdfpage,
    dropzone
  },
  mounted() {
    this.dragControllerDivHeight();
  },
  methods: {
    createcomponentsFun() {
      // 创建组件，并挂载到指定元素上
      removecomponents(RightTopdragdropComponent, {
        DomId: "my_DT_Components_box",
      });
      createcomponents(RightTopdragdropComponent, {
        message: `${Math.random() * 100}`,
        DomId: "my_DT_Components_box",
        refData: "dialogComponents",
        IsShowdialogComponentStyle: `position:absolute;transform:translate(${0}px,${0}px)`,
      });
    },

    Tabroomfun() {
      debounce(() => {
        Bus.$emit("TabroomsComponentfunTo");
      }, 1000);
    },
    dragControllerDivHeight() {
      var RightContent_DragIcon_resize = document.getElementsByClassName(
        "RightContent_DragIcon_resize"
      );
      var RightContent_top_resize = document.getElementsByClassName(
        "RightContent_top_resize"
      );
      var RightContent_bottom_resize = document.getElementsByClassName(
        "RightContent_bottom_resize"
      );
      var RightContent_resize = document.getElementsByClassName(
        "RightContent_resize"
      );
      for (let i = 0; i < RightContent_DragIcon_resize.length; i++) {
        // 鼠标按下事件
        RightContent_DragIcon_resize[i].onmousedown = function (e) {
          //颜色改变提醒
          RightContent_DragIcon_resize[i].style.background = "#327c86";
          var startY = e.clientY;
          // 鼠标拖动事件
          // console.log("startY",startY)
          // console.log("e",e)
          document.onmousemove = function (e) {
            RightContent_DragIcon_resize[i].top = startY;
            var endY = e.clientY;
            // console.log("endY",endY)
            var moveLen = RightContent_DragIcon_resize[i].top + (endY - startY);
            var maYT =
              RightContent_resize[i].clientHeight -
              RightContent_DragIcon_resize[i].offsetHeight;
            console.log("maYT", maYT);
            if (moveLen < 166) moveLen = 166;
            if (moveLen > maYT - 166) moveLen = maYT - 166;
            RightContent_DragIcon_resize[i].style.top = moveLen;
            for (let j = 0; j < RightContent_top_resize.length; j++) {
              RightContent_top_resize[j].style.height =
                (moveLen / document.body.clientHeight) * 100 + "vh";
              RightContent_bottom_resize[j].style.height =
                ((RightContent_resize[i].clientHeight - moveLen) /
                  document.body.clientHeight -
                  0.008) *
                  100 +
                "vh";
            }
          };
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            //颜色恢复
            RightContent_DragIcon_resize[i].style.background = "#d6d6d6";
            document.onmousemove = null;
            document.onmouseup = null;
            RightContent_DragIcon_resize[i].releaseCapture &&
              RightContent_DragIcon_resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          RightContent_DragIcon_resize[i].setCapture &&
            RightContent_DragIcon_resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.RightContent {
  width: 100%;
  height: vh(969);
  overflow: hidden;
  position: relative;
  .RightContent_top {
    width: 100%;
    height: vh(468.5);
    overflow: auto;
    .RightContent_top_Components {
      width: 100%;
      //height: vh(968.5);
      .DT_button{
        width: 100%;
        padding: 10px;
      }
      .DT_ComponentsOutbox{
        width: 100%;
        
      }
    }
  }
  .RightContent_DragIcon_resize {
    cursor: s-resize;
    position: relative;
    top: vh(-5);
    border-radius: 5px;
    width: 50px;
    height: 10px;
    line-height: 0px;
    text-align: center;
    font-size: 16px;
    color: white;
    background: #b6c2ca;
    left: 50%;
    z-index: 9;
    /*拖拽区鼠标悬停样式*/
    &:hover {
      color: #fff;
    }
  }
  .RightContent_bottom {
    width: 100%;
    height: vh(484.5);
    overflow: auto;
  }
}
</style>