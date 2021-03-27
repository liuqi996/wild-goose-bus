// pages/near_station/near_station.js
const amap_search = require('../../file/amap_search.js');
var QQMapWX = require('../../file/qqmap-wx-jssdk.js');
const globalData = getApp().globalData;
var qqmapsdk;
var app = getApp()
qqmapsdk = new QQMapWX({
  key: 'KWABZ-24IYD-C2N4H-P2566-OTK3Q-ZRBFP'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareshow: false,
    jiandi:0,
    weather: {},
    region:['湖南省','衡阳市'],
    now:'',
    canGetLocation: true,
    lists: [],
    lists_nums:0,
    fu:0,
    menulist:[
      {
        img:"../../images/busdz.png",
        name:"实时到站",
        bindtap:"zsgj"
      },
      {
        img:"../../images/gjkczd1.png",
        name:"充值点",
        bindtap:"card"
      },
      {
        img:"../../images/ccmm.png",
        name:"刷码乘车",
        bindtap:"ccm"
      },
      {
        img:"../../images/union.png",
        name:"联合线路",
        bindtap:"jtlh"
      }
    ],
    menulist2:[
      {
        img:"../../images/busdz.png",
        name:"城乡公交",
        bindtap:"cxgj"
      },
    ],
    shadeShow:false
  },

  handletouchmove (event) {
    let currentY = event.changedTouches[0].clientY
    if (currentY <= this.data.startY) {
      this.setData({
        jiandi:1,
        shareshow: true
      })
      console.log("下滑")
    } else {
      this.setData({
        jiandi:0,
        shareshow: false
      })
      console.log("上滑")
    }
  },

  //滑动开始事件
  handletouchstart: function (event) {
    this.data.startY = event.changedTouches[0].clientY
  },

  shadeShowClick(){
    this.setData({
      shadeShow: true
    })
  },

  getWeather:function(e){
    var that =this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.region[1],
        key:'801f6479056647ab8f07770afcce2278'
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          now:res.data.HeWeather6[0].now,
          tianqi:res.data.HeWeather6[0].now.cond_txt
        })
      }
    })
  },

  cxgj:function(){
    wx.navigateTo({
      url: '/pages/countryside/countryside',
    })
  },

  card:function(){
    wx.navigateTo({
      url: '/pages/card/card',
    })
  },

  zsgj:function(){
    wx.navigateToMiniProgram({
      appId: 'wxb9e506ed4f66afc4',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {},
      fail: function (err) {
        console.log(err);
      }
    })
  },

  ccm:function(){
    wx.navigateToMiniProgram({
      appId: 'wxbb58374cdce267a6',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  jtlh:function(){
    wx.navigateTo({
      url: '/pages/union/union',
    })
  },

  xianlutu:function(e){
    let line = e.currentTarget.dataset.line;
    console.log(line)
    wx.navigateTo({
      url: '../bus_line/bus_line?line='+ line
    })
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    let fu=this.data.fu;
    console.log(e)
    if(fu==0){
      this.more()
    }
    else{
      console.log("不可加载更多")
      wx.showToast({
        title: '没有更多匹配公交线路了哦！',
        icon:"none"
      })
    }
  },

  // scroll(e) {
  //   console.log(e)
  // },

  // scrollToTop() {
  // },

  // tap() {
   
  // },

  // tapMove() {
  
  // },

  nav:function(){
    wx.navigateTo({
      url: '../../pages/line_search/line_search',
    })
  },

  searchbusstation:function(){
    console.log("我在搜索")
    let that=this;
    qqmapsdk.search({
      keyword:'公交站',
      success: function (res) {
        let nearbusstation=res.data
        console.log("附近公交站",nearbusstation)
        var arr = nearbusstation;
        var station_list=arr.slice(1,5);
        that.setData({
          sousuo_status:"true",
          nearbusstation:nearbusstation,
          station_list:station_list
        })
        var str0 = that.data.nearbusstation[0].address;
        var m0 = str0.split(",");
        console.log(m0)
        var str1 = that.data.nearbusstation[1].address;
        var m1 = str1.split(",");
        console.log(m1)
        var str2 = that.data.nearbusstation[2].address;
        var m2 = str2.split(",");
        console.log(m2)
        var str3 = that.data.nearbusstation[3].address;
        var m3 = str3.split(",");
        console.log(m3)
        var str4 = that.data.nearbusstation[4].address;
        var m4 = str4.split(",");
        console.log(m4)
        that.setData({
          m0:m0,
          m1:m1,
          m2:m2,
          m3:m3,
          m4:m4,
          m:{
            m1:m1,
            m2:m2,
            m3:m3,
            m4
          }
        })
      },
      fail:function(res){
        console.log("搜索附近公交站台失败")
        that.setData({
          sousuo_status:"false"
        })
        wx.showToast({
          title: '获取[附近站点]有关信息失败，请确认您已经打开定位并允许小程序获取位置。',
          icon:"none",
          duration:3000
        })
      },
      complete: function (res) {
      }
    })
  },

  station_map:function(e){
    let lat = e.currentTarget.dataset.lat;
    let lng = e.currentTarget.dataset.lng;
    let name = e.currentTarget.dataset.staname;
    var all_line=JSON.stringify(e.currentTarget.dataset.all_line)
    wx.navigateTo({
      url: '../bus_stop/bus_stop?lat='+ lat+'&lng='+lng+'&name='+name+'&all_line='+all_line
    })
  },

  getMyLocation() {
    this.setData({
      myLocation: '正在定位中...'
    });
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log("我在定位")
        const longitude = res.longitude;
        const latitude = res.latitude;
        globalData.myLocation = { longitude, latitude };
        // 获取位置描述信息
        amap_search.getLocationDescription(longitude, latitude, (myCity, myLocation) => {
          globalData.myCity = myCity;
          this.setData({ myLocation });
        });
        // 获取周围站台列表
        amap_search.getAroundStation(longitude, latitude, (nearestStation) => {
          this.setData({ nearestStation});
        });
      },
      // 定位失败
      fail: () => {
        this.canGetLocation = false;
        wx.showModal({
          title: '提示',
          content: '获取位置失败，请打开手机位置服务并允许小程序获取你的地理位置^*^',
          showCancel:false,
          confirmText:'我知道了',
          success(res) {
            if (res.confirm) {}
            else{}
          },
        });
      },
    });
  },

  line:function(e){
    let line = e.currentTarget.dataset.line;
    console.log(line)
    wx.navigateTo({
      url: '../bus_line/bus_line?line='+ line
    })
  },

  tongzhan: function(e){
    let zhandian = e.currentTarget.dataset.zhandian;
    wx.navigateTo({
      url: '../tongzhan/tongzhan?zhandian='+ zhandian
    })
  },
  
  again:function(){
    this.searchbusstation()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
    this.searchbusstation()
    this.setData({
      statusBarHeight:app.globalData.statusBarHeight,
      navBarHeight:app.globalData.navBarHeight,
      statusNavBarHeight:app.globalData.statusNavBarHeight
    })
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
      success(res) {
        console.log(res)
      },
      fail(e) {
        console.log(e)
      }
    })
  },

  onShareTimeline(){
    return {
      title: '在衡阳，查县市区公交就用“雁城巴士助手”小程序！',
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
    // this.shadeShowClick()
    this.setData({
      shuaxin:"true"
    })
    let that = this;
    setTimeout(function(){
      that.setData({
        shuaxin:"false"
      })
      wx.stopPullDownRefresh() 
      wx.showToast({
        title: '刷新成功！',
        icon:'none'
      })
    },3000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})