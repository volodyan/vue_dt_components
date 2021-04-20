<template>
  <div class="HomePage">
    <div class="leftoutbox leftoutbox_drag">
      <LeftContent />
    </div>
    <div class="HomePageMyDrag_resize nav_Bg_Color MyDragBox_resize" title="收缩侧边栏">⋮</div>
    <div class="rightoutbox Border_left rightoutbox_drag">
      <RightContent />
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import LeftContent from "./LeftContent/index";
import RightContent from "./RightContent/index";

export default {
  name: "HomePage",
  components: {
    LeftContent,
    RightContent,
  },
  computed: {
    ...mapGetters({
      ComponentsData: "HomePageModule/ComponentsData",
     
    }),
  },
  mounted() {
    this.dragControllerDiv();
    this.getTimeNowStausfun();
  
  },
  methods: {
    //初始化、定时5分钟刷新数据
    getTimeNowStausfun() {
   
      this.NowStaustimerH = setInterval(() => {}, 300000);
      this.$once("hook:beforeDestroy", () => {
        console.log("清除定时器NowStaustimerH");
        window.clearInterval(this.NowStaustimerH);
        this.NowStaustimerH = null;
      });
    },
    
   
    //降雨量曲线数据----/api/PipeNetWorkDiagonse/RainRealData
    RainRealData(LevelRealChartData, GetLevelsInfo) {
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "PipeNetWorkDiagonse/RainRealData",
          JSON.stringify({
            Time: this.GetDatePickerValue + "-01 00:00:00",
            Id: "",
          }),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("降雨量曲线数据", res);
          Bus.$emit(
            "RainRealDataTo",
            res.data.Response,
            GetLevelsInfo,
            LevelRealChartData
          );
        })
        .catch((error) => {});
    },
    dragControllerDiv() {
      var MyDragBox_resize = document.getElementsByClassName("MyDragBox_resize");
      var leftoutbox_drag = document.getElementsByClassName("leftoutbox_drag");
      var mid = document.getElementsByClassName("rightoutbox_drag");
      var MyMapBox = document.getElementsByClassName("HomePage");
      for (let i = 0; i < MyDragBox_resize.length; i++) {
        // 鼠标按下事件
        MyDragBox_resize[i].onmousedown = function (e) {
          //颜色改变提醒
          MyDragBox_resize[i].style.background = "#327c86";
          var startX = e.clientX;
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            MyDragBox_resize[i].left = startX;
            var endX = e.clientX;
            var moveLen = MyDragBox_resize[i].left + (endX - startX); // （endx-startx）=移动的距离。MyDragBox_resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = MyMapBox[i].clientWidth - MyDragBox_resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            if (moveLen < 242) moveLen = 242; // 左边区域的最小宽度为32px
            if (moveLen > maxT - 1250) moveLen = maxT - 1250; //右边区域最小宽度为150px
            MyDragBox_resize[i].style.left = moveLen; // 设置左侧区域的宽度
            for (let j = 0; j < leftoutbox_drag.length; j++) {
              leftoutbox_drag[j].style.width =
                (moveLen / document.body.clientWidth) * 100 + "vw";
              mid[j].style.width =
                ((MyMapBox[i].clientWidth - moveLen) /
                  document.body.clientWidth -
                  0.008) *
                  100 +
                "vw";
            }
          };
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            //颜色恢复
            MyDragBox_resize[i].style.background = "#d6d6d6";
            document.onmousemove = null;
            document.onmouseup = null;
            MyDragBox_resize[i].releaseCapture &&
              MyDragBox_resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          MyDragBox_resize[i].setCapture && MyDragBox_resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
  },
};
</script>
<style lang="scss" soped>
.HomePage {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  position: relative;
  .leftoutbox {
    width: vw(350);
    height: vh(969);
  }
  .HomePageMyDrag_resize {
    cursor: col-resize;
    position: relative;
    top: vh(450);
    border-radius: 5px;
    width: 0.6%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-size: cover;
    background-position: center;
    font-size: 16px;
    color: white;
    left: 6px;
    z-index: 1;
    /*拖拽区鼠标悬停样式*/
    &:hover {
      color: #444444;
    }
  }
  .rightoutbox {
    width: vw(1570);
    height: vh(969);
  }
}
</style>