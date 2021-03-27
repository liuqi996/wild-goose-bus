// pages/countryside_bus/countryside_bus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    ne:[],
    entry:'/images/zhankai.png',
  },

  changeToggle(e) {
    var that=this;
    const { ne } = this.data
    const { index } = e.currentTarget.dataset
    this.setData({
      [`ne[${index}].isShow`]: !ne[index].isShow,
      isShow:!that.data.ne[index].isShow,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const db = wx.cloud.database();
    db.collection('cxgj').orderBy('line', 'asc').get({
      success: res => {
        console.log(res.data)   
        this.setData({
          ne: res.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  clickLine: function (e) {
    var that = this;
    var indexs = e.currentTarget.dataset.index
    var ne = this.data.ne
    ne[indexs].show = !ne[indexs].show ||false
    that.setData({
      ne: ne
    })
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