<template>
  <div class="RightTopdragdropComponent_outbox">
    <div
      class="RightTopdragdropComponent_inbox"
      :ref="refData"
      :style="IsShowdialogComponentStyle"
    >
      <div
        class="dragdrop_leftPart"
        id="div1"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <div
          draggable="true"
          @dragstart="drag($event)"
          :id="'drag'+index"
          v-for="(item,index) in LinkArray"
          :key="index"
        >
         {{index+1}}.{{ item.LinkLable}}
        </div>
      </div>
      <div
        class="dragdrop_rightPart"
        id="div2"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RightTopdragdropComponent",
  data(){
    return{
      LinkArray:[
        {
          LinkLable:"vue动态创建组件的方法解析",
          LinkData:"https://blog.csdn.net/qq_15009739/article/details/107928668"
        }, {
          LinkLable:"vue 动态创建组件的两种方法",
          LinkData:"https://www.jb51.net/article/203289.htm"
        }, {
          LinkLable:"HTML 拖放 API",
          LinkData:"https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API"
        }, {
          LinkLable:"html5中的拖拽功能",
          LinkData:"https://www.cnblogs.com/zengsf/p/11076479.html"
        }, {
          LinkLable:"基于Vue实现拖拽效果",
          LinkData:"https://www.jb51.net/article/138986.htm"
        }, {
          LinkLable:"基于Vue实现拖拽功能",
          LinkData:"https://www.jb51.net/article/138909.htm"
        }, {
          LinkLable:"js获取元素宽高的几种方法",
          LinkData:"https://www.cnblogs.com/deepdarkdeveloper/p/12059122.html"
        }, {
          LinkLable:"Vue中重新渲染组件的方法总结",
          LinkData:"https://www.jianshu.com/p/58a0f285cabe"
        },
      ]
    }
  },
  props: ["message", "DomId", "refData", "IsShowdialogComponentStyle"],
  methods: {
    allowDrop(ev) {
      ev.preventDefault();
       ev.dataTransfer.dropEffect = "copy";
       
    },

    drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
       ev.dataTransfer.dropEffect = "copy";
    },

    drop(ev) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "copy";
      var data = ev.dataTransfer.getData("Text");
      ev.target.appendChild(document.getElementById(data));
    },
  },
};
</script>
<style lang="scss" scoped>
.RightTopdragdropComponent_outbox {
  width: 100%;
  .RightTopdragdropComponent_inbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: calc(100% - 20px);
    height: 360px;
    margin: 10px;

    .dragdrop_leftPart {
      width: calc(100% / 2 - 10px);
      height: 360px;
      border: 1px dashed #ccc;
    }
    .dragdrop_rightPart {
      width: calc(100% / 2 - 10px);
      height: 360px;
      border: 1px dashed #ccc;
    }
  }
}
</style>