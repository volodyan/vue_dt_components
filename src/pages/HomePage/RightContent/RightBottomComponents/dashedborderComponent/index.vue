<template>
  <div class="dashedborderComponent_outbox">
    <div
      class="dashedborderComponent_inbox"
      :ref="refData"
      :style="IsShowdialogComponentStyle"
    >
      <section class="drop-zone">
           {{ message }}
        <!-- the dashing stuff is just for the border animation -->
        <span class="dashing"><i></i></span>
        <span class="dashing"><i></i></span>
        <span class="dashing"><i></i></span>
        <span class="dashing"><i></i></span>
      </section>

     
    </div>
  </div>
</template>
<script>
export default {
  name: "dashedborderComponent",
  props: ["message", "DomId", "refData", "IsShowdialogComponentStyle"],
};
</script>
<style lang="scss" scoped>
.dashedborderComponent_outbox {
  width: 100%;
  .dashedborderComponent_inbox {
    width: 100%;
    .drop-zone {
      position: relative;
      width: 300px;
      height: 300px;
      overflow: hidden;
      background: #878787;
      color: white;
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
    }
    .drop-zone {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drop-zone .dashing {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: -20px;
    }
    .drop-zone .dashing:nth-of-type(1) {
      transform: rotate(0deg);
    }
    .drop-zone .dashing:nth-of-type(2) {
      transform: rotate(90deg);
    }
    .drop-zone .dashing:nth-of-type(3) {
      transform: rotate(180deg);
    }
    .drop-zone .dashing:nth-of-type(4) {
      transform: rotate(270deg);
    }
    .drop-zone .dashing i {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      border-bottom: 2px dashed;
      animation: slideDash 5.5s infinite linear;
    }
    @keyframes slideDash {
      from {
        transform: translateX(-50%);
      }
      to {
        transform: translateX(0%);
      }
    }
    .drag-vehicle h2::before {
      content: "\2190";
    }

    .vehicles img {
      visibility: visible;
      opacity: 1;
    }

    .vehicles img.hide {
      visibility: hidden;
      opacity: 0;
    }

    /* media queries */
    @media screen and (max-width: 48em) {
      .container {
        flex-direction: column;
      }
    }

  
  }
}
</style>