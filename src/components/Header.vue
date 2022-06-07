<template>
  <div class="header">
    <div class="top_nav">
      <div class="top_nav_cont">
        <a class="logo_a">
          <img src="@/assets/images/ic-logo.png" />
        </a>
        <div class="right_part">
          <nav id="header_nav">
            <ul class="clearfix">
              <li
                :key="item.id"
                v-for="(item, index) in headerList"
                :class="item.clicked ? 'clicked' : ''"
                @click="changePage(item)"
              >
                <router-link :to="{ name: item.name }" :key="index">
                  <span>{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="collect_wallet" v-if="address == 'Connect Wallet'" @click="connectWall">{{ address }}</div>
        <div class="collect_wallet2" v-else>{{ address }}</div>
      </div>
    </div>
    <div class="pop_tip_div" v-if="popTipshow">
      <p>{{ popmsg }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",
  components: {},
  computed: {
    //获取state里面的listName对象
    ...mapState(["hasLogin", "userInfo"]),
  },
  data() {
    return {
      showBubble: false,
      headerList: [
        { id: "1", name: "About", title: "About", clicked: false },
        { id: "2", name: "Games", title: "Games", clicked: true },
        { id: "3", name: "NFT", title: "NFT", clicked: false },
        { id: "4", name: "Token", title: "Token", clicked: false },
        { id: "5", name: "Miner", title: "Miner", clicked: false },
        { id: "6", name: "Whitepaper", title: "Whitepaper", clicked: false },
        { id: "7", name: "Main", title: "Main", clicked: false },
        { id: "8", name: "Recruit", title: "Recruit", clicked: false },
        
      ],
      popTipshow: false,
      popmsg: "",
      address: "Connect Wallet",
      taskList: [],
    };
  },
  methods: {
    ...mapMutations(["login", "setUserInfo", "getUserInfo"]),
    connectWall() {
      if (this.hasLogin != "true") {
        this.$plug.onButtonPress((res) => {
          this.login();
          this.setUserInfo(res.data);
          this.address = this.$utils.formAddress(this.userInfo.userName);
          window.dispatchEvent(new Event("connectWallSuccess"));
        });
      }
    },
    toggleBodyClass() {
      let e = document.querySelector("body");
      window.scrollY > 80
        ? e.classList.add("scrolladd")
        : e.classList.remove("scrolladd");
    },
    changePage(_i) {
      let $this = this;
      for (let i of $this.headerList) {
        i.clicked = false;
      }
      _i.clicked = true;
    },


  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.toggleBodyClass);
  },
  mounted() {
    let $this = this;
    if (this.hasLogin == "true") {
      this.getUserInfo();
      this.address = this.$utils.formAddress(this.userInfo.userName);
    }

    window.addEventListener("scroll", () => {
      $this.toggleBodyClass();
    });

    window.addEventListener("connectWall", () => {
      $this.connectWall();
    });

    // 监听  $emit触发后在此处接收传过来的参数
    this.$eventHub.$on("tabnav", (data) => {
      let _data = data;
      console.log(_data);
      for (let i of $this.headerList) {
        if (i.name == _data.name) {
          i.clicked = true;
        } else {
          i.clicked = false;
        }
      }
    });
  },
};
</script>
<style lang="less" scoped>
.top_nav {
  width: 100vw;
  height: 100px;
  background: none;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.2s ease;
  z-index: 1000;
  background: #181a21;
}
.top_nav_cont {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.2s ease;
  position: relative;
  font-family: "Barlow";
}
.logo_a {
  // cursor: pointer;
  height: calc(100% - 20px);
  transition: all 0.2s ease;
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
}
.logo_a img {
  width: 240px;
  height: 60px;
  transition: all 0.2s ease;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
.right_part {
  height: 51px;
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  padding-left: 260px;
  transition: all 0.2s ease;
}
#header_nav ul li {
  float: left;
}
nav#header_nav {
  display: flex;
}
#header_nav span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px calc(12.03704px + 0.92593vw);
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
#header_nav .special_li span {
  cursor: revert;
}
#header_nav ul li:not(.special_li).clicked span,
#header_nav ul li:not(.special_li):hover span {
  color: #6fe2ff;
}
.circle_div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 30px;
}
.circle_div_box {
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  margin-right: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.join_w {
  color: rgba(255, 255, 255, 0.6);
}
/* top header */
.scrolladd .top_nav {
  height: 80px;
  background: #000;
  .logo_a img {
    width: 180px;
    height: 45px;
  }
  .right_part {
    padding-left: 200px;
  }
}
.scrolladd .top_nav_cont {
  padding: 12px 20px;
}
.scrolladd .tool_bar ul li {
  padding: 0 13px;
}
.collect_wallet {
  width: 170px;
  height: 40px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  right: 150px;
  background: url(../assets/images/btn_di.png) no-repeat center;
  text-shadow: 3px 3px 3px 3px #0c95ff,
}

.collect_wallet2 {
  width: 170px;
  height: 40px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  right: 150px;
  background: url(../assets/images/btn_di.png) no-repeat center;
  text-shadow: 0 0 3px #0c95ff,
}

.collect_wallet:hover{
  filter: brightness(200%);
}

.collect_wallet:active {
  transform: scale(0.8);
  filter: brightness(160%);
}

@media screen and (max-width: 950px) {
  .top_nav {
    display: none;
  }
  .logo_a {
    position: static;
    margin-top: 40px;
    margin-bottom: 25px;
  }
}

.bubble_box {
  position: absolute;
  margin-left: -120px;
  top: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.triangle-up {
  // margin-right: 10px;
  width: 0;
  height: 10px;
  // border-left: 10px solid transparent;
  // border-right: 10px solid transparent;
  // border-bottom: 10px solid #181a21;
}

.task_box {
  width: 264px;
  padding: 0 12px;
  padding-bottom: 12px;
  height: auto;
  max-height: 282px;
  background-color: #181a21;
  border-radius: 4px;
  overflow-y: scroll;
}

.task_item_box {
  margin-top: 12px;
  height: 78px;
  background-color: #1c2838;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  border-radius: 4px;
}

.task_item_top {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.task_item_bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.task_item_name {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  font-family: "Barlow";
}

.task_reward_box {
  display: flex;
  margin-top: 8px;
  align-items: flex-end;
}

.task_reward {
  margin-left: 8px;
  color: #fff;
  font-size: 14px;
  font-family: "Barlow";
  font-weight: normal;
}

.task_button {
  color: #66c0f4;
  border: 1px solid #66c0f4;
  height: 30px;
  line-height: 30px;
  width: 84px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.task_button1 {
  background-color: #66c0f4;
  height: 26px;
  line-height: 26px;
  width: 84px;
  border-radius: 4px;
  color: #1c2838;
  font-weight: bold;
  font-size: 14px;
}

.task_button2 {
  background-color: #939bab;
  height: 30px;
  line-height: 30px;
  width: 84px;
  border-radius: 4px;
  color: #1c2838;
  font-weight: bold;
  font-size: 14px;
}

.task_btn_box {
  width: 40px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  font-family: "Barlow";
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  position: absolute;
  right: 200px;
}
.task_div_box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.task_title {
  margin-top: 8px;
}
</style>
