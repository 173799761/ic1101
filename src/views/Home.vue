<template>
  <div class="home">
    <div class="banner_div">
      <div class="every_part_cont">
        <h1>AN NFT METAVERSE</h1>
        <h1>CHAIN GAME</h1>
        <h2>INTEGRATING GAMIFIED DEFI AND CASUAL SLG</h2>
        <div class="btn_confirm" @click="gotoRecruit"></div>
      </div>
    </div>
    <div class="main_box">
      <div class="swiper_part">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide
            class="swiper-slide"
            v-for="(item, index) in game_data"
            :key="index"
          >
            <div class="defi_box">
              <div class="box2_di_img">
                <img class="defi_img1" :src="item.imgsrc" />
                <img class="defi_img2" src="@/assets/images/line.png" />
              </div>
              <div class="defi_info_box">
                <div>
                  <p class="defi_info_title">{{ item.title }}</p>
                  <div v-for="(infoItem, index2) in item.info" :key="index2">
                    <p class="defi_info_text">{{ infoItem }}</p>
                  </div>
                </div>
                <div class="swiper_line"></div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <!-- <div class="swiper-button-prev prev"></div>
        <div class="swiper-button-next next"></div> -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="passport_box">
        <div class="passport_box2">
          <div style="margin-top: 370px">
            <div class="title_box">
              <p>Passport</p>
              <div class="bracketLine"></div>
            </div>
          </div>

          <div class="passport_card_box">
            <div
              class="passport_card_item"
              v-for="(item, index) in passportOverList"
              :key="index"
            >
              <div class="ppbk"></div>
              <img class="ppimg" :src="item.imgsrc" />
              <img class="ppname" :src="item.imgnamesrc" />
              <!-- <div class="ppname"></div> -->
            </div>
          </div>
        </div>

        <div class="passport_box3">
          <div class="btn_preorder"></div>
          <div class="passport_info">
            <p>
              A total of 8 dimensions such as race, gender and occupation of the
              hero NFT determine that each NFT has a unique appearance.
            </p>
            <p>These NFTs follow the ERC721 standard.</p>
          </div>
        </div>
      </div>
      <div class="roadMap_box">
        <div style="margin-top: -200px;">
          <div class="title_box">
            <p>Roadmap</p>
            <div class="bracketLine"></div>
          </div>
        </div>
        <div class="roadMap_main">
          <div class="roadMap_left_box">
            <div class="rml_text_box">
              <p class="rml_title">
                {{ roadMapList[chooseRoadMapQ - 1].title }}
              </p>
              <p style="margin-top: 38px">
                {{ roadMapList[chooseRoadMapQ - 1].info }}
              </p>
            </div>
          </div>
          <div class="roadMap_right_box">
            <ul>
              <li v-for="(item, index) in roadMapList" :key="index">
                <div
                  :class="
                    chooseRoadMapQ - 1 == index
                      ? 'rmr_quarter_active'
                      : 'rmr_quarter'
                  "
                  @click="quarterClick(item, index)"
                >
                  {{ item.quarter }}
                </div>
              </li>
            </ul>
            <div class="RemSoteSensiRng">
              <div id="rmr_img" class="rmr_img"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="team_box">
        <div style="margin-top: -20px">
          <div class="title_box">
            <p>Team</p>
            <div class="bracketLine"></div>
          </div>
        </div>
        <div class="teamList_box">
          <ul class="clearfix">
            <li v-for="(item, index) in teamList" :key="index">
              <div class="img_part">
                <img :src="item.imgUrl" />
                <div class="team_text">
                  <p class="team_name">{{ item.name }}</p>
                  <p class="team_desc">{{ item.desc }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="partner_box">
        <div style="margin-top: 100px">
          <div class="title_box">
            <p>Partner</p>
            <div class="bracketLine"></div>
          </div>
        </div>
        <div class="partner_logo"></div>
      </div>
    </div>
  </div>
</template>

<script>
var getElementById = function (objId) {
  return "string" == typeof objId ? document.getElementById(objId) : objId;
};
export default {
  name: "Home",
  components: {},
  data() {
    return {
      game_data: [
        {
          imgsrc: require("@/assets/images/img1.png"),
          title: "Gamification Defi",
          info: [
            "Liquidity mining, lending, staking various defi Lego",
            "combinations.Lower the threshold in a gamified way. Multi-chain aggregation",
            "players maximize revenue.",
          ],
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
            // let swiper = this.$refs.mySwiper.$el.swiper;
            // let i = swiper.realIndex;
          },
        },
      },

      passportOverList: [
        {
          id: 1,
          imgsrc: require("@/assets/images/passport1.png"),
          imgnamesrc: require("@/assets/images/regular.png"),
        },
        {
          id: 2,
          imgsrc: require("@/assets/images/passport2.png"),
          imgnamesrc: require("@/assets/images/Golden.png"),
        },
        {
          id: 3,
          imgsrc: require("@/assets/images/passport3.png"),
          imgnamesrc: require("@/assets/images/BlackGolden.png"),
        },
        {
          id: 4,
          imgsrc: require("@/assets/images/passport4.png"),
          imgnamesrc: require("@/assets/images/Diamond.png"),
        },
      ],

      chooseRoadMapQ: 3, //选择的第几个

      roadMapList: [
        {
          id: 1,
          title: "Frame building",
          info: "The basic construction of the Metaverse City is completed, and the digital people live in the Metaverse City.",
          quarter: "Feb-Apr 2022",
        },
        {
          id: 2,
          title: "Pre-Launch",
          info: "Interactive functions are available",
          quarter: "May 2022",
        },
        {
          id: 3,
          title: "Launch V1.0",
          info: ` Its first batch of passports are released in limited quantities and NFT is used in the Metaverse.
Recruit IC101 100 experience officials，and open the user beta version to implement basic functions and social display options；Enhances the platform's development plan；
`,
          quarter: "June 2022",
        },
        {
          id: 4,
          title: "Launch V1.5",
          info: `Pre-sale of NFT metahuman; 
Public Sale (IDO) begins.100 lucky participants from all over the world get to experience the metaverse. 
Improvements to the NFT store, increased channels for users to upload and sell NFT themselves, and IDO on the exchange; 
After tests of the new version, more maps will become available for players to engage in diverse activities.
`,
          quarter: "July-Aug 2022",
        },
        {
          id: 5,
          title: "Launch V2.0",
          info: `Improve the charging function and optimize the version efficiency;
Open a new map and survival game mode; introduce commercial IP for market promotion
`,
          quarter: "Sep-Oct 2022",
        },
        {
          id: 6,
          title: "Launch V2.5",
          info: `Enhance the commercial value of the platform by improving the interior of various commercial centers and introducing commercial IP;
Launch the official version, and update and improve version functions in real time based on user feedback
`,
          quarter: "Nov-Dec 2022",
        },
        {
          id: 7,
          title: "Launch V3.0",
          info: `Iterations of subsequent versions
Develop a UGC game editor to encourage users to create content
Continue to design and develop new content according to the needs of the market and users to ensure long-term and stable project development.
`,
          quarter: "Jan  2023",
        },
      ],

      teamList: [
        {
          name: "Vince",
          desc: "Founder",
          imgUrl: require("@/assets/images/avatar/Vince.png"),
        },
        {
          name: "Glen",
          desc: "Chief Technology Officer",
          imgUrl: require("@/assets/images/avatar/Glen.png"),
        },
        {
          name: "Victor",
          desc: "Engineer",
          imgUrl: require("@/assets/images/avatar/Victor.png"),
        },
        {
          name: "Glooby",
          desc: "Producer",
          imgUrl: require("@/assets/images/avatar/Glooby.png"),
        },
        {
          name: "Joe",
          desc: "Communications",
          imgUrl: require("@/assets/images/avatar/Joe.png"),
        },
        {
          name: "Daniel",
          desc: "Operating",
          imgUrl: require("@/assets/images/avatar/Daniel.png"),
        },
        {
          name: "Jose",
          desc: "Marketing Manager",
          imgUrl: require("@/assets/images/avatar/Jose.png"),
        },
        {
          name: "Cing",
          desc: "Marketing Manager",
          imgUrl: require("@/assets/images/avatar/Cing.png"),
        },
        {
          name: "Richard",
          desc: "Product Advisor",
          imgUrl: require("@/assets/images/avatar/Richard.png"),
        },
        {
          name: "Nancy",
          desc: "Project Manager",
          imgUrl: require("@/assets/images/avatar/Nancy.png"),
        },
        {
          name: "Emma",
          desc: "Project Manager",
          imgUrl: require("@/assets/images/avatar/Emma.png"),
        },
        {
          name: "Peter",
          desc: "Art Director",
          imgUrl: require("@/assets/images/avatar/Peter.png"),
        },
        {
          name: "Always",
          desc: "Lead Artist",
          imgUrl: require("@/assets/images/avatar/Always.png"),
        },
        {
          name: "Jim Lee",
          desc: "Technical",
          imgUrl: require("@/assets/images/avatar/JimLee.png"),
        },
        {
          name: "Leon",
          desc: "Technical",
          imgUrl: require("@/assets/images/avatar/Leon.png"),
        },
      ],
    };
  },

  computed: {},

  methods: {
    gotoRecruit() {
      this.$router.push({
        path: "/recruit",
      });
    },
    onClickConfirm() {},

    quarterClick(obj, index) {
      if (this.chooseRoadMapQ != index + 1) {
        this.chooseRoadMapQ = index + 1;
        this.setrmrImgHeight();
      }
    },
    setrmrImgHeight() {
      let imgdiv = getElementById("rmr_img");
      if (imgdiv) {
        imgdiv.style.marginTop = (this.chooseRoadMapQ - 1) * 100 - 10 + "px";
      }
    },
    setChooseRoadMapQ() {
      let timeD = new Date();
      let y = timeD.getFullYear();
      let m = timeD.getMonth() + 1;
      if (y == 2022) {
        switch (m) {
          case 2:
          case 3:
          case 4:
            this.chooseRoadMapQ = 1;
            break;
          case 5:
            this.chooseRoadMapQ = 2;
            break;
          case 6:
            this.chooseRoadMapQ = 3;
            break;
          case 7:
          case 8:
            this.chooseRoadMapQ = 4;
            break;
          case 9:
          case 10:
            this.chooseRoadMapQ = 5;
            break;
          case 11:
          case 12:
            this.chooseRoadMapQ = 6;
            break;
        }
      } else {
        this.chooseRoadMapQ = 7;
      }
    },
  },

  mounted() {
    this.setChooseRoadMapQ();
    this.setrmrImgHeight();
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

.banner_div {
  width: 100%;
  height: 1080px;
  background: url(../assets/images/banner.png) no-repeat center;
}

.banner_div h1 {
  text-transform: uppercase;
  margin-bottom: 30px;
  line-height: 1em;
}
.banner_div h2 {
  font-weight: 100;
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
  padding: 473px 20px;
}

.btn_confirm {
  width: 1048px;
  height: 293px;
  background: url(../assets/images/btn_confirm.png) no-repeat center;
  cursor: pointer;
}

.main_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1920px;
  background-color: #000;
  align-items: center;
}

.title_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 58px;
  font-weight: bold;
}

.bracketLine{
  width: 477px;
  height: 60px;
  background: url(../assets/images/bracketLine.png) no-repeat center;
}

.defi_box {
  display: flex;
  width: 1253px;
  margin-top: 100px;
}

.box2_di_img {
  width: 639px;
  height: 354px;
  background: url(../assets/images/box2.png) no-repeat center;
}

.defi_img1 {
  margin-top: 16px;
  width: 577px;
  height: 313px;
}

.defi_img2 {
  margin-top: -50px;
  margin-left: -40px;
  width: 633px;
  height: 80px;
}

.defi_info_box {
  height: 354px;
  max-width: 557px;
  text-align: left;
  margin-left: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.defi_info_title {
  font-weight: bold;
  font-size: 58px;
  margin-bottom: 56px;
}

.defi_info_text {
  font-size: 15px;
  font-weight: normal;
  line-height: 28px;
}

.swiper_line {
  width: 575px;
  height: 57px;
  margin-left: -55px;
  background: url(../assets/images/s_line.png) no-repeat center;
}

.passport_box {
  width: 2554px;
  height: 1360px;
  margin-left: 500px;
  background: url(../assets/images/bg.png) no-repeat center;
  margin-top: -188px;
  justify-content: center;
  align-items: center;
}

.swiper_part {
  width: 1253px;
  margin: 20px 0;
  position: relative;
}
.swiper_part/deep/ .swiper-container {
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.8);
}
.swiper_part/deep/ .swiper-button-prev,
.swiper_part/deep/ .swiper-button-next {
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
  position: absolute;
  width: 100%;
  padding: 15px 0;
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

.passport_box2 {
  margin-left: -500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.passport_card_box {
  display: flex;
  // width: 1620px;
}

.passport_card_item {
  width: 276px;
  margin-right: 50px;
  position: relative;
}

.passport_card_item:hover .ppbk {
  opacity: 1;
  animation: fadenum 2s infinite linear alternate-reverse;
}

.passport_card_item:hover .ppname {
  opacity: 1;
}

.passport_card_item:hover .ppimg {
  left: 0px;
  top: 70px;
  width: 276px;
  height: 410px;
}

.ppbk {
  width: 624px;
  height: 657px;
  left: -180px;
  position: absolute;
  z-index: 777;
  opacity: 0;
  background: url(../assets/images/ppbk.png) no-repeat center;
}

@keyframes fadenum {
  /*设置内容由显示变为隐藏*/

  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.ppimg {
  position: absolute;
  z-index: 888;
  left: 27px;
  top: 111px;
  width: 222px;
  height: 328px;
}

.ppname {
  position: absolute;
  left: 0;
  z-index: 999;
  opacity: 0;
  width: 276px;
  height: 657px;
  // background: url(../assets/images/ppname.png) no-repeat center;
}

.passport_box3 {
  margin-left: -500px;
  margin-top: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn_preorder {
  margin-top: -20px;
  width: 250px;
  height: 70px;
  background: url(../assets/images/btn_preorder.png) no-repeat center;
  cursor: pointer;
}

.passport_info {
  margin-top: 66px;
  font-size: 15px;
  line-height: 20px;
}

.roadMap_box {
  display: flex;
  flex-direction: column;
  width: 1974px;
  height: 1021px;
  background: url(../assets/images/basemap.png) no-repeat center;
  margin-top: 150px;
  justify-content: center;
  align-items: center;
}

.roadMap_main {
  display: flex;
}

.roadMap_left_box {
  margin-top: 70px;
  margin-left: -88px;
  width: 703px;
  height: 769px;
  background: url(../assets/images/robot.png) no-repeat center;
}

.rml_text_box {
  font-size: 28px;
  text-align: left;
  margin-left: 90px;
  margin-top: 50px;
}

.rml_title {
  font-size: 40px;
  font-weight: bold;
}

.roadMap_right_box {
  margin-top: 100px;
  margin-left: 220px;
  display: flex;
  justify-content: center;
}

.RemSoteSensiRng {
  margin-left: 102px;
  width: 5px;
  height: 720px;
  background-color: #fff;
  border-radius: 5px;
}

.rmr_img {
  width: 184px;
  height: 168px;
  margin-left: -92px;
  background: url(../assets/images/icons-02-02.png) no-repeat center;
}

.rmr_quarter {
  margin-top: 50px;
  margin-bottom: 50px;
  word-spacing: 30px;
  font-size: 40px;
  font-weight: bold;
  opacity: 0.31;
  cursor: pointer;
}

.rmr_quarter_active {
  margin-top: 50px;
  margin-bottom: 50px;
  // width: 154px;
  word-spacing: 30px;
  font-size: 40px;
  font-weight: bold;
  opacity: 1;
  cursor: pointer;
}

.img_part {
  width: 235px;
  height: 101px;
  background: url(../assets/images/team-di.png) no-repeat center;
  display: flex;
}

.img_part img {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin-left: 13px;
  margin-top: 2px;
}

.team_box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.team_text {
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.team_name {
  max-width: 150px;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team_desc {
  max-width: 150px;
  font-size: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

.teamList_box {
  margin-top: 60px;
  max-width: 1250px;
  justify-content: center;
  ul {
    margin-left: -12px;
  }
  ul li {
    float: left;
    overflow: hidden;
    position: relative;
    width: 235px;
    height: 101px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.8);
    margin-left: 12px;
    margin-bottom: 12px;
  }
}

.partner_box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.partner_logo {
  margin-top: 80px;
  width: 1200px;
  height: 263px;
  background: url(../assets/images/partner-logo.png) no-repeat center;
}

@media screen and (max-width: 500px) {
}
</style>
