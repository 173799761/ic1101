<template>
  <div class="Recruit">
    <div class="banner_div">
      <div class="every_part_cont">
        <h1>The first 100</h1>
        <h1>distinguished IC1101 users</h1>
        <!-- <div class="btn_flashSale"></div> -->
        <h4>05/30/2022 18:00 - 06/30/2022 08:00</h4>
      </div>
    </div>
    <div class="main_box">
      <div class="sides_box">
        <ul>
          <li
            class="sides_item"
            v-for="(item, index) in leftSidesList"
            :key="index"
          >
            <img :src="item.imgsrc" />
            <div :class="index < 4 ? 'sides_mask1' : 'sides_mask2'"></div>
          </li>
        </ul>
      </div>
      <div class="won_box">
        <div class="swiper_part">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide
              class="swiper-slide"
              v-for="(item, index) in leftSidesList"
              :key="index"
            >
              <div class="defi_box">
                <div class="box2_di_img">
                  <div class="won_title" style="margin-top: 28px;">The top 100 will be won</div>
                  <div class="won_title">{{item.title}}</div>
                  <img class="chooseImg" :src="item.imgsrc1" />
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="first_box" v-if="status == 1">
        <div class="steps_box">
          <div class="applic_steps_box">
            <div class="applic_top_box">
              <div class="applic_img"></div>
              <div class="applic_img2"></div>
            </div>
            <div style="margin-top: 20px">
              <ul>
                <li
                  class="step_item_box"
                  v-for="(item, index) in stepsList"
                  :key="index"
                >
                  <p class="font16">Step{{ item.step }}:</p>
                  <div class="step_min_box">
                    <p class="font20">{{ item.title }}</p>
                    <div class="img_box" @click="onClickFinish(item.step)">
                      <img
                        v-if="item.isSucc"
                        src="@/assets/images/done.png"
                        width="32"
                        height="32"
                      />
                      <img v-else src="@/assets/images/recruit/carryOut.png" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="isFinishTask"
            class="btn_apply"
            @click="onClickApply"
          ></div>
          <div v-else class="btn_apply2"></div>
        </div>
      </div>
      <div class="second_box" v-else>
        <div class="list_box">
          <p class="list_title">Included in the email</p>
          <ul class="list">
            <li v-for="(item, index) in includedList" :key="index">
              <p :style="{ color: item.isMy ? '#f6c108' : '#fff' }">
                {{ setFormerEmail(item.email) }}
              </p>
            </li>
          </ul>
          <div class="page_box">
            <div class="button-prev prev" @click="onClickPrev"></div>
            <div class="page_info">{{ curPage + 1 }}/{{ totalSize }}</div>
            <div class="button-next next" @click="onClickNext"></div>
          </div>
        </div>
      </div>
      <div class="sides_box">
        <ul>
          <li
            class="sides_item"
            v-for="(item, index) in leftSidesList"
            :key="index"
          >
            <img :src="item.imgsrc" />
            <div :class="index < 4 ? 'sides_mask1' : 'sides_mask2'"></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="info_box">
      <div class="info_text">
        After all the above tasks are completed, the rewards will be sent to
        your wallet, and rewards such as IC tokens will be credited to your
        account after they are released. Please pay attention to your email.
      </div>
    </div>

    <div v-if="isShowEmailModel" class="binding_email_model">
      <img
        class="close_btn"
        src="@/assets/images/close.png"
        @click="onClickCloseModel"
      />
      <div class="binding_box">
        <p class="p_bind_email">Enter your email address</p>
        <div v-if="bindingEmailStep == 1" class="bind_input_email_box">
          <p class="input_title">Email:</p>
          <input class="input_box" type="email" v-model="email" />
        </div>
        <div v-else>
          <div class="bind_email_code_box">
            <p class="input_title">Verification code:</p>
            <input class="input_box2" type="text" v-model="inputEmailCode" />
            <p class="resend_text" @click="onClickResend">{{ resendText }}</p>
          </div>
          <div class="verificat_code">
            Verification code has been sent to the email：{{ email }}
          </div>
        </div>
        <div class="btn_binding" @click="onClickBing">
          {{ emailButtonText }}
        </div>
      </div>
    </div>

    <div class="pop_tip_div" v-if="popTipshow">
      <p>{{ popmsg }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import hello from "hellojs/dist/hello.all.js";
export default {
  name: "Recruit",
  components: {},
  computed: {
    //获取state里面的listName对象
    ...mapState(["hasLogin", "userInfo"]),
  },
  data() {
    return {
      network: "twitter",

      status: 1, //1：报名阶段  2：公布结果
      isFinishTask: false,

      leftSidesList: [
        {
          imgsrc: require("@/assets/images/recruit/icon1.png"),
          imgsrc1: require("@/assets/images/recruit/icon1_1.png"),
          title: 'Regular passport',
          lock: true,
        },
        {
          imgsrc: require("@/assets/images/recruit/icon2.png"),
          imgsrc1: require("@/assets/images/recruit/icon2_1.png"),
          title: 'First batch of users to experience IC1101',
          lock: false,
        },
        {
          imgsrc: require("@/assets/images/recruit/icon3.png"),
          imgsrc1: require("@/assets/images/recruit/icon3_1.png"),
          title: 'Unique accessories (Character Equipment)',
          lock: false,
        },
        {
          imgsrc: require("@/assets/images/recruit/icon4.png"),
          imgsrc1: require("@/assets/images/recruit/icon4_1.png"),
          title: 'IC Coin 10000',
          lock: false,
        },
        {
          imgsrc: require("@/assets/images/recruit/icon5.png"),
          imgsrc1: require("@/assets/images/recruit/icon5_1.png"),
          title: 'Golden Passport (Premium users)',
          lock: false,
        },
        {
          imgsrc: require("@/assets/images/recruit/icon6.png"),
          imgsrc1: require("@/assets/images/recruit/icon6_1.png"),
          title: 'IC Coin 50000 (Premium users)',
          lock: false,
        },
      ],

      swiperOption: {
        observe: true,
        observeParents: true,
        initialSlide: 0,
        slidesPerGroup: 1,
        slidesPerView: 1,
        slideToClickedSlide: true,
        centeredSlides: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          // nextEl: ".swiper-button-next.next",
          // prevEl: ".swiper-button-prev.prev",
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        //开启无限循环模式
        loop: true,
        on: {
          tap: () => {
            let swiper = this.$refs.mySwiper.$el.swiper;
            let i = swiper.realIndex;
          },
        },
      },

      chooseSides: {
        imgsrc: require("@/assets/images/recruit/icon1.png"),
        imgsrc1: require("@/assets/images/recruit/icon1_1.png"),
        title: 'Regular passport',
        lock: true,
      },

      stepsList: [
        {
          step: 1,
          title: "Connect your Wallet",
          isSucc: false,
        },
        {
          step: 2,
          title: "Link to Twitter",
          isSucc: false,
        },
        {
          step: 3,
          title: "Over 1000 Twitter Followers",
          isSucc: false,
        },
        {
          step: 4,
          title: "Share Tweets",
          isSucc: false,
        },
        {
          step: 5,
          title: "Click Like of our Tweet.",
          isSucc: false,
        },
        {
          step: 6,
          title: "Enter your email address",
          isSucc: false,
        },
      ],

      includedList: [],

      curPage: 0,
      totalSize: 5,

      popTipshow: false,
      popmsg: "",

      email: "", //已经保存的邮箱
      isShowEmailModel: false, //展示绑定邮箱
      emailButtonText: "OK", //"The Binding"  "OK",
      bindingEmailStep: 1, //绑定邮箱的第几步  共两步
      inputEmailCode: "", //输入的邮箱验证码
      resendText: "To resend", //重新发送文字
      resendNum: 60, //重新发送时间
    };
  },
  methods: {
    ...mapMutations(["login", "setUserInfo", "getUserInfo"]),

    getUserTop100() {
      let param = {
        curIdx: this.curPage,
        pageSize: 20,
      };
      this.$api.userTop100(param).then((res) => {
        if (res.code == 0) {
          this.totalSize = Math.floor((res.totalAmount - 1) / 20) + 1;
          this.includedList = [];
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i];
            let club = {
              email: item.mail,
              isMy: item.mail == this.userInfo.mail ? true : false,
            };
            this.includedList.push(club);
          }
        }
      });
    },

    //任务列表
    getUserTasks() {
      if (this.hasLogin != "true") {
        return;
      }
      let param = {
        userName: this.userInfo.userName,
      };
      this.$api.userTasks(param).then((res) => {
        let isAll = 0;
        if (res.code == 0) {
          let tasks = res.data;
          for (let i = 0; i < tasks.length; i++) {
            let item = tasks[i];
            if (item.status == 1) {
              isAll++;
            }
            this.stepsList[item.taskId - 1].isSucc =
              item.status == 1 ? true : false;
          }
          if (isAll >= 6) {
            this.isFinishTask = true;
          }
        }
      });
    },

    taskClaim(taskId) {
      if (this.hasLogin != "true") {
        this.popmsg = "Please connect your Wallet first.";
        this.popTipshowfunc();
        return;
      }
      let param = {
        userName: this.userInfo.userName,
        taskId,
      };
      this.$api.taskClaim(param).then(() => {
        this.getUserTasks();
      });
    },

    onClickApply() {
      if (this.hasLogin != "true") {
        return;
      }
      let param = {
        userName: this.userInfo.userName,
      };
      this.$api.userApply(param);
    },

    getInfo() {
      this.$api.icStatus().then((res) => {
        if (res.code == 0) {
          if (res.data == 0) {
            this.status = 1;
            this.getUserTasks();
          } else {
            this.status = 2;
            this.getUserTop100();
          }
        }
      });
    },

    setUserSave(saveType, saveData) {
      let param = {
        userName: this.userInfo.userName,
        saveType,
        saveData,
      };
      this.$api.userSave(param);
    },

    setFormerEmail(email) {
      let ref = /(.{1}).+(.{2}@.+)/g;
      return email.replace(ref, "$1******$2");
    },

    popTipshowfunc() {
      let $this = this;
      this.popTipshow = true;
      setTimeout(function () {
        $this.popTipshow = false;
      }, 3000);
    },

    onClickPrev() {
      if (this.curPage <= 0) {
        return;
      }
      this.curPage -= 1;
    },
    onClickNext() {
      if (this.curPage >= this.totalSize - 1) {
        return;
      }
      this.curPage += 1;
    },

    onClickFinish(step) {
      switch (step) {
        case 1:
          this.connectWall();
          break;
        case 2:
          this.bindingTW();
          break;
        case 3:
          this.validatTW();
          break;
        case 4:
          this.travelTW();
          break;
        case 5:
          this.overLikeTW();
          break;
        case 6:
          this.bindingEmail();
          break;
      }
    },

    onClickCloseModel() {
      this.isShowEmailModel = false;
    },

    //连接钱包
    connectWall() {
      if (this.hasLogin != "true") {
        window.dispatchEvent(new Event("connectWall"));
      }
    },

    /**
     * 绑定邮箱
     */
    bindingEmail() {
      this.isShowEmailModel = true;
      this.emailButtonText = "OK";
      this.bindingEmailStep = 1;
    },

    /**
     * 绑定邮箱
     */
    onClickBing() {
      let self = this;
      if (this.bindingEmailStep == 1) {
        if (this.email.match(/^\w+@\w+\.\w+$/i)) {
          // this.bindingEmailStep = 2;
          // this.emailButtonText = "OK";
          // this.resendNum = 60;
          // this.codeCountdown();
          // this.stepsList[5].isSucc = true;
          this.taskClaim(6);
          this.setUserSave(1, this.email);
          this.onClickCloseModel();
        } else {
          self.popmsg = "Email Format Error！";
          self.popTipshowfunc();
        }
      } else {
        // if (this.inputEmailCode.match(/^\d{6}$/)) {
        //   console.log("########", this.inputEmailCode);
        // } else {
        //   self.popmsg = "验证码格式错误！";
        //   self.popTipshowfunc();
        // }
      }
    },

    /**
     * 邮箱验证码重新发送
     */
    onClickResend() {
      if (this.resendNum <= 0) {
        this.resendNum = 60;
        this.codeCountdown();
      }
    },

    codeCountdown() {
      if (this.resendNum > 0) {
        setTimeout(() => {
          this.resendNum -= 1;
          this.resendText = "To resend  (" + this.resendNum + "s)";
          this.codeCountdown();
        }, 1000);
      } else {
        this.resendText = "To resend";
      }
    },

    twws() {
      hello.init(
        {
          twitter: "ypgNOeEJ1qiJMuY00OyH2kYOu",
        },
        {
          // redirect_uri: "http://localhost:5000/",
          redirect_uri: "http://120.92.132.192:9832/ic1101/",
        }
      );
    },

    /**
     * 绑定Twitter
     */
    bindingTW() {
      let self = this;
      let auth = null; //hello.getAuthResponse(this.network);
      if (auth == null) {
        hello(this.network).login();
        // Listen to signin requests
        hello.on("auth.login", function (r) {
          // Get Profile
          hello(r.network)
            .api("/me")
            .then((res) => {
              console.log("me=============", res);
              // self.stepsList[1].isSucc = true;
              self.popmsg = "success";
              self.popTipshowfunc();
              self.taskClaim(2);
              self.setUserSave(2, res.screen_name);
            });
        });
      } else {
        // this.stepsList[1].isSucc = true;
        // self.popmsg = "has login";
        // self.popTipshowfunc();
      }
    },
    /**
     * 验证twitt粉丝
     */
    validatTW() {
      let self = this;
      if (this.stepsList[2].isSucc != true) {
        let auth = hello.getAuthResponse(this.network);
        if (auth) {
          hello(this.network)
            .api("/me/following", "get")
            .then((res) => {
              let num = res.data.length;
              if (num < 1000) {
                self.popmsg = "fail";
                self.popTipshowfunc();
              } else {
                self.taskClaim(3);
                // self.stepsList[2].isSucc = true;
              }
              console.log("following=============", res, num);
            });
        } else {
          self.popmsg = "Please link to Twitter first.";
          self.popTipshowfunc();
        }
      }
    },
    /**
     * 分享twitt
     */
    travelTW() {
      let self = this;
      if (this.stepsList[3].isSucc != true) {
        let auth = hello.getAuthResponse(this.network);
        if (auth) {
          let data = { message: "test", link: "", picture: "" };
          hello(this.network)
            .api("/me/share", "post", data)
            .then((res) => {
              console.log("post share=============", res);
              self.popmsg = "success";
              self.popTipshowfunc();
              // self.stepsList[3].isSucc = true;
              self.taskClaim(4);
            });
        } else {
          self.popmsg = "Please link to Twitter first.";
          self.popTipshowfunc();
        }
      }
    },

    //点赞
    overLikeTW() {
      let self = this;
      if (this.stepsList[4].isSucc != true) {
        let auth = hello.getAuthResponse(this.network);
        if (auth) {
          let data = { id: "1521776822739890177" };
          hello(this.network)
            .api("/me/like", "post", data)
            .then((res) => {
              window.console.log("like=============", res);
              if (res.errors) {
                if (res.errors[0].code == 139) {
                  // self.stepsList[4].isSucc = true;
                  self.taskClaim(5);
                }
                self.popmsg = res.errors[0].message;
                self.popTipshowfunc();
              } else {
                // self.stepsList[4].isSucc = true;
                self.taskClaim(5);
                self.popmsg = "success";
                self.popTipshowfunc();
              }
            });
        } else {
          self.popmsg = "Please link to Twitter first.";
          self.popTipshowfunc();
        }
      }
    },
  },

  mounted() {
    this.twws();
    // this.getUserTasks();
    this.getInfo();
    window.addEventListener("connectWallSuccess", () => {
      this.stepsList[0].isSucc = true;
    });
  },
};
</script>
<style lang="less" scoped>
.Recruit {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background: #000;
}

.banner_div {
  width: 100%;
  height: 424px;
  background: url(../assets/images/recruit/bg.png) no-repeat center;
}

.banner_div h1 {
  text-transform: uppercase;
  margin-bottom: 30px;
  line-height: 1em;
}
.banner_div h4 {
  font-weight: 20;
  text-transform: uppercase;
  line-height: 1em;
}

.every_part_cont {
  width: 100%;
  max-width: 1440px;
  padding: 6.25vw 20px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner_div .every_part_cont {
  padding: 157px 20px;
}

.btn_flashSale {
  width: 310px;
  height: 109px;
  background: url(../assets/images/recruit/btn_flashSale.png) no-repeat center;
  cursor: pointer;
}

.main_box {
  height: 870px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.first_box {
  display: flex;
  width: 502px;
}

.second_box {
  width: 502px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 28px;
  margin-right: 28px;
}

.list_box {
  width: 500px;
  min-height: 600px;
  margin-top: 80px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid;
  border-image: linear-gradient(
      134deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    )
    1 1;
  backdrop-filter: blur(6px);
}

.list_title {
  margin-top: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #f6c108;
  font-family: "Barlow-Bold";
}

.list {
  margin-top: 20px;
  width: 500px;
  min-height: 312px;
  overflow: hidden;
  zoom: 1;
}
.list li {
  float: left;
  width: 250px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: "Barlow-Bold";
}

.page_box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.page_info {
  width: 96px;
  // line-height: 36px;
}

.button-prev {
  display: flex;
  width: 28px;
  height: 20px;
  // color: #fff;
  // background: linear-gradient(270deg, rgba(16, 27, 38, 0) 0%, #101b26 100%);
  // align-items: center;
  // justify-content: center;
}

.button-prev:hover {
  // background: linear-gradient(270deg, rgba(16, 27, 38, 0) 0%, #39597c 100%);
}

.button-prev:after {
  width: 28px;
  height: 20px;
  content: "";
  background: url(../assets/images/left.png) no-repeat center;
  background-size: 28px 20px;
}

.button-next {
  display: flex;
  width: 28px;
  height: 20px;
  // color: #fff;
  // background: linear-gradient(90deg, rgba(16, 27, 38, 0) 0%, #101b26 100%);
  // align-items: center;
  // justify-content: center;
}

.button-next:hover {
  // background: linear-gradient(90deg, rgba(16, 27, 38, 0) 0%, #39597c 100%);
}

.button-next:after {
  width: 28px;
  height: 20px;
  content: "";
  background: url(../assets/images/right.png) no-repeat center;
  background-size: 28px 20px;
}

.sides_box {
  width: 124px;
  height: 676px;
  background: url(../assets/images/recruit/sides_bg.png) no-repeat center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sides_item {
  // cursor: pointer;
  width: 94px;
  height: 71px;
  margin-bottom: 8px;
  position: relative;
}

.sides_mask1 {
  top: 0;
  width: 94px;
  height: 71px;
  z-index: 666;
  background: url(../assets/images/recruit/sides_1.png) no-repeat center;
  position: absolute;
}


.sides_mask2 {
  top: 0;
  width: 94px;
  height: 71px;
  z-index: 666;
  background: url(../assets/images/recruit/sides_2.png) no-repeat center;
  position: absolute;
}

.sides_mask3 {
  top: 0;
  width: 94px;
  height: 71px;
  z-index: 666;
  background-color: #131313;
  opacity: 0.5;
  position: absolute;
}


.won_box {
  margin-left: 28px;
  margin-top: 70px;
  width: 642px;
  height: 609px;
  background: url(../assets/images/recruit/won_bg.png) no-repeat center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.won_title {
  font-size: 28px;
  font-weight: bold;
}

.chooseImg{
  margin-top: -30px;
  width: 494px;
  height: 521px;
}

.steps_box {
  margin-left: 28px;
  margin-right: 28px;

  width: 446px;
  display: flex;
  flex-direction: column;
}

.applic_steps_box {
  margin-top: 120px;
  width: 447px;
  height: 548px;
  background: url(../assets/images/recruit/steps_bg.png) no-repeat center;
}

.applic_top_box {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.applic_img {
  width: 380px;
  height: 49px;
  background: url(../assets/images/recruit/applic_img1.png) no-repeat center;
  background-size: 380px 49px;
}

.applic_img2 {
  width: 109px;
  height: 24px;
  background: url(../assets/images/recruit/applic_img2.png) no-repeat center;
  background-size: 109px 24px;
}

.step_item_box {
  width: 431px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: 16px;
  font-weight: normal;
}

.step_min_box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.img_box {
  width: 84px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn_apply {
  width: 446px;
  height: 125px;
  margin-top: -20px;
  background: url(../assets/images/recruit/btn_applyNow.png) no-repeat center;
}

.btn_apply2 {
  width: 446px;
  height: 125px;
  margin-top: -20px;
  background: url(../assets/images/recruit/btn_applyNow1.png) no-repeat center;
}

.info_box {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.info_text {
  width: 981px;
  font-size: 13px;
  font-weight: lighter;
}

/* 邮箱绑定 */

.binding_email_model {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /*水平居中*/
  width: 640px;
  height: 360px;
  background-color: rgba(0, 0, 0, 0.56);
  backdrop-filter: blur(18px);
  z-index: 1000;
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

.binding_box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.p_bind_email {
  font-size: 30px;
  font-weight: bold;
  font-family: "Barlow";
  color: #f6c108;
}

.bind_input_email_box {
  margin-top: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 92px;
}

.bind_email_code_box {
  margin-top: 50px;
  display: flex;
  align-items: center;
}

.verificat_code {
  margin-top: 30px;
  font-size: 16px;
  font-family: "Barlow";
  color: #fff;
  max-width: 600px;
  margin-bottom: 46px;
}

.input_title {
  font-weight: 300;
  color: #fff;
  font-size: 18px;
  font-family: "Barlow";
  margin-right: 10px;
}

.resend_text {
  font-weight: bold;
  color: #08adf6;
  font-size: 16px;
  font-family: "Barlow";
  margin-left: 10px;
  cursor: pointer;
}

.input_box {
  width: 250px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);

  color: #fff;
  font-size: 24px;
  font-family: "Barlow";
  font-weight: bold;
  line-height: 60px;
  padding: 0 8px;
}

.input_box2 {
  width: 200px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);

  color: #fff;
  font-size: 24px;
  font-family: "Barlow";
  font-weight: bold;
  line-height: 60px;
  padding: 0 8px;
}

.btn_binding {
  width: 150px;
  height: 48px;
  background-color: #f6c108;
  border-radius: 4px;
  line-height: 48px;
  color: #000;
  font-size: 20px;
  font-family: "Barlow";
  font-weight: bold;
  cursor: pointer;
}

.close_btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

//////////////////////////////////

/* pop弹窗 */
.pop_tip_div {
  position: fixed;
  top: 50%;
  left: 5%;
  margin-top: -26px;
  width: 90%;
  min-height: 50px;
  color: #ffffff;
  font-size: 20px;
  font-family: "Barlow";
  font-weight: normal;
  color: #ffffff;
  font-style: italic;
  line-height: 20px;
  line-height: 1.2em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.pop_tip_div p {
  max-width: 100%;
  background: #0cacff;
  border: 1px solid #0cacff;
  box-shadow: 0 0 10px #0055ad inset, 0 0 30px #0055ad;
  border-radius: 8px;
  padding: 15px 50px;
}

////////////////swiper///////////////

.swiper_part {
  width: 100%;
  // width: 1253px;
  // margin: 20px 0;
  position: relative;
}
.swiper_part/deep/ .swiper-container {
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.8);
}
.swiper_part/deep/ .swiper-button-prev,
.swiper_part/deep/ .swiper-button-ne xt {
  width: 46px;
  height: 106px;
  color: #fff;
  background: linear-gradient(90deg, rgba(16, 27, 38, 0) 0%, #101b26 100%);
  // margin-top: 0px;
  z-index: 3;
}
.swiper_part/deep/ .swiper-button-prev {
  background: linear-gradient(270deg, rgba(16, 27, 38, 0) 0%, #101b26 100%);
  left: -48px;
}
.swiper_part/deep/ .swiper-button-prev:hover {
  background: linear-gradient(270deg, rgba(16, 27, 38, 0) 0%, #39597c 100%);
}
.swiper_part/deep/ .swiper-button-next:hover {
  background: linear-gradient(90deg, rgba(16, 27, 38, 0) 0%, #39597c 100%);
}
.swiper_part/deep/ .swiper-container-rtl .swiper-button-next,
.swiper_part/deep/ .swiper-container-rtl .swiper-button-next1 {
  left: -48px;
}
.swiper_part/deep/ .swiper-button-next,
.swiper_part/deep/ .swiper-container-rtl .swiper-button-prev {
  right: -48px;
}
.swiper_part/deep/ .swiper-button-prev:after {
  width: 40px;
  height: 40px;
  content: "";
  background: url(../assets/images/left-arrow.png) no-repeat center;
  background-size: 40px 40px;
}
.swiper_part/deep/ .swiper-button-next:after {
  width: 40px;
  height: 40px;
  content: "";
  background: url(../assets/images/right-arrow.png) no-repeat center;
  background-size: 40px 40px;
}
.swiper_part/deep/ .swiper-pagination,
.swiper_part/deep/ .swiper-pagination1 {
  margin-top: -20px;
  position: absolute;
  width: 100%;
  // padding: 15px 0;
  text-align: center;
  .swiper-pagination-bullet {
    cursor: pointer;
    width: 11px;
    height: 11px;
    margin: 0 2px;
    background: url(../assets/images/swiper-pagination1.png) no-repeat center;
  }
  .swiper-pagination-bullet-active {
    width: 11px;
    height: 11px;
    background: url(../assets/images/swiper-pagination2.png) no-repeat center;
  }
}
</style>
