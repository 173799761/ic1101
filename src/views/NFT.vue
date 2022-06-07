<template>
  <div class="NFT">
    <div>
      <img src="@/assets/images/moon.png" class="comingImg" />
      <p class="p1">Coming Soon！</p>
      <p class="p2">More features will be released later…</p>
      <div class="goBtn" @click="gotoGamePage">
        Go to game page<img src="@/assets/images/go-icon.png" class="go_icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFT",
  components: {},
  data() {
    return {};
  },
  methods: {
      gotoGamePage(){
        this.$router.push('./')
      },
  },
  beforeDestroy() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.NFT {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 150px 0;
  margin-top: 90px;
  background: #1c2838;
}
.p1 {
  font-size: 24px;
  font-family: "Barlow";
  font-weight: normal;
  color: #ffffff;
  line-height: 24px;
  font-style: italic;
  margin: 40px 0 24px;
}
.p2 {
  font-size: 16px;
  font-family: "Barlow-light";
  font-weight: bold;
  color: #ffffff;
  line-height: 16px;
  background: linear-gradient(135deg, #03bfff 0%, #2d70f8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
}
.goBtn {
  width: 180px;
  height: 48px;
  background: linear-gradient(135deg, #03bfff 0%, #2d70f8 100%);
  border-radius: 4px;
  font-size: 16px;
  font-family: "Barlow";
  font-weight: bold;
  color: #1c2838;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
  margin: 50px auto 0;
  cursor: pointer;
}
</style>
