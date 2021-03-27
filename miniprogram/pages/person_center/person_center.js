// pages/person_center/person_center.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:null,
    tasks:[],
    isShow:true,
    canIuse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{},
    menu_list:[
      {
        img:"../../images/hycj.png",
        name:"衡阳城建",
        url:"../../pages/build/build"
      },
      {
        img:"../../images/gjkczd1.png",
        name:"充值点",
        url:"../../card/pages/recharge/recharge"
      },
      {
        img:"../../images/union.png",
        name:"联合线路",
        url:"../../pages/transport_union/transport_union"
      },
      {
        img:"../../images/cxgj.png",
        name:"城乡线路",
        url:"../../pages/countryside_bus/countryside_bus"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      statusBarHeight:app.globalData.statusBarHeight,
      navBarHeight:app.globalData.navBarHeight,
      statusNavBarHeight:app.globalData.statusNavBarHeight
    })
    var that=this;
    console.log("打印用户信息",app.globalData.userInfo)
    //进入页面后---获取本地存储是否有数据授权
    if(app.globalData.userInfo){
      this.setData({
        isShow:false,
        userInfo:app.globalData.userInfo
      })
    }
    else if (this.data.canIuse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          isShow: false,
        })
      }
    }
  },

  getUserInfo:function(e){
    console.log(e.detail)//userInfo登录人微信信息
    console.log("getUserInfo函数在调用")
    //存储全局变量
    app.globalData.userInfo = e.detail.userInfo;//存全局的账号信息
    //console.log(app.globalData.userInfo)
    // || app.globalData.userInfo.length==0
    if(app.globalData.userInfo==undefined){

    }
    else{
    this.setData({
      userInfo:e.detail.userInfo,
      isShow:false
    })
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