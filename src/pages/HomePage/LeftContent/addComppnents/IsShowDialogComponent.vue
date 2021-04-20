<template>
  <div class="IsShowDialogComponent">
    <div class="mainoutbox">
      <div class="contentoutbox">
        <div class="TabOutbox">
          <div
            v-for="(item, index) in TabRooms"
            :key="index"
            class="itembox"
            :class="{ activeItembox: NowIndex === index }"
            @click.stop="Tabfun(item, index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AxiosUrl from "@/middleware/services/AxiosUrl";
import { mapGetters } from "vuex";
import Bus from "@/utils/bus.js";

export default {
  name: "IsShowDialogComponent",
  data() {
    return {
      TabRooms: ["编辑", "删除"],
      NowIndex: 0,
    };
  },
  props:["Editdata"],
  methods: {
    Tabfun(item, index) {
      this.NowIndex = index;
      if (item === "编辑") {
        Bus.$emit("TabfunToaddDialog",this.Editdata,"修改节点");
      }else if (item === "删除"){
        Bus.$emit("DelTreeNodeTo",this.Editdata)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.IsShowDialogComponent {
  cursor: pointer;
  .mainoutbox {
    width: 160px;
    background: #fff;

    .contentoutbox {
      width: 100%;
      border: 1px solid #cfd6db;

      box-sizing: border-box;
      .TabOutbox {
        width: 100%;
        margin: 2px 0;
        .itembox {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: calc(100% - 4px);
          height: 30px;
          margin-left: 2px;
          border-bottom: 1px solid #cfd6db;
          box-sizing: border-box;
          font-size: 14px;
          &:hover {
            background: #327c86;
            color: #fff;
          }
          &:last-child {
            border-bottom: none;
          }
        }
        .activeItembox {
          // background: #327c86;
          // color: #fff;
        }
      }
    }
  }
}
</style>
