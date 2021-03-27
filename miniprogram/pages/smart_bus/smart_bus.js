// pages/smart_bus/smart_bus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menulist:[
      {
        img:"../../images/gjkczd1.png",
        name:"衡阳公交卡充值点",
        url:"../../pages/recharge/recharge"
      },
      {
        img:"../../images/union.png",
        name:"衡阳各县市区联合线路",
        url:"../../pages/transport_union/transport_union"
      }
    ],
    menulist1:[
      {
        img:"../../images/ccmm.png",
        name:"微信刷码乘车",
        bind:"ccm"
      },
      {
        img:"../../images/busdz.png",
        name:"公交实时到站",
        bind:"zsgj"
      },
      {
        img:"../../images/cxgj.png",
        name:"城乡公交线路",
        bind:"cxgj"
      }
    ]
  },

  recharge:function(){
    wx.navigateTo({
      url: '../../card/pages/recharge/recharge',
    })
  },

  ccm:function(){
    wx.navigateToMiniProgram({
      appId: 'wxbb58374cdce267a6',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {},
      fail: function (err) {
        console.log(err);
      }
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

  cxgj:function(){
    wx.navigateTo({
      url: '/pages/countryside_bus/countryside_bus',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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