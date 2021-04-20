<template>
  <div class="mousedragpage_Outbox" ref="mousedragpageOutbox">
    <div class="mydragdiv" @mousedown="move">
      <!--绑定按下事件-->
      {{ positionX }}
      {{ positionY }}
    </div>
  </div>
</template>
<script>
export default {
  name: "mousedragpage",
  data() {
    return {
      positionX: 0,
      positionY: 0,
    };
  },

  methods: {
    move(e) {
      let odiv = e.target; //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;
        //获取父元素的信息
        let FdivData = this.$refs.mousedragpageOutbox.getBoundingClientRect();
        console.log("FdivData", FdivData);
        //获取元素的信息
        let odivData = odiv.getBoundingClientRect();
        console.log("odivData", odivData);
        console.log("top", top);
        //判断是否超过父元素区域
        if (top < 0) {
          top = 0;
        } else if (top > FdivData.height - odivData.height) {
          top = FdivData.height - odivData.height;
        }
        if (left < 0) {
          left = 0;
        } else if (left > FdivData.width - odivData.width) {
          left = FdivData.width - odivData.width;
        }
        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.mousedragpage_Outbox {
  width: calc(100% - 20px);
  height: 360px;
  margin: 10px;
  border: 1px dashed red;
  position: relative;
  .mydragdiv {
    position: relative; /*定位*/
    top: 10px;
    left: 10px;
    width: 200px;
    height: 200px;
    background: #666; /*设置一下背景*/
    cursor: move;
  }
}
</style>