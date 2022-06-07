<template>
  <div class="foot">
    <div class="foot_part">
      <img src="@/assets/images/ic-logo.png" width="240" height="60" />
      <div>
        <div class="icon_box">
          <a href="https://twitter.com/IC1101World">
            <img src="@/assets/images/twitter.png" width="57" height="57" />
          </a>
          <a href="https://t.me/+fHeuhSba6zlmNjg9">
            <img src="@/assets/images/telegram.png" width="57" height="57" />
          </a>
          <a href="https://discord.gg/metaoccult">
            <img src="@/assets/images/discord.png" width="57" height="57" />
          </a>
          <a href="https://github.com/173799761/ic1101">
            <img src="@/assets/images/gitHub.png" width="57" height="57" />
          </a>
        </div>
        <div class="join_text">Join the coommunity</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot",
  components: {},
  data() {
    return {
      emailVal: "",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.foot_part {
  padding: 0 19%;
  display: flex;
  justify-content: space-between;
  background-color: #080b0f;
  height: 235px;
  align-items: center;
}

.icon_box {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.join_text {
  margin-top: 8px;
  width: 300px;
  text-align: right;
  font-size: 15px;
}

@media screen and (max-width: 500px) {
}
</style>
