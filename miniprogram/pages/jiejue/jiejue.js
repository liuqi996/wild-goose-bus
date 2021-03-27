// pages/jiejue/jiejue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  open_setting:function(){
    wx.showModal({
      title: '温馨提示',
      content: '即将打开位置小程序位置权限设置页面，请将[位置信息]的权限更改为[仅在使用小程序期间]',
      showCancel: true,
      cancelText:'以后再说',
      confirmText:'去设置',
      confirmColor:"#0575E6",
      cancelColor:"#8E8E8E",
      // confirmColor:"#96c93d",
      // cancelColor:"#b20a2c",
      success(res) {
        res.confirm && wx.openSetting();
        res.cancel && console.log("用户拒绝了去更改位置设置")
      },
    });
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