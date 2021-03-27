// pages/bus_line/bus_line.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [ ],
    fileIds:[ ],
    currentId: null,
  },

  tel:function(e){
    let tel=e.currentTarget.dataset.tel;
    //console.log(tel)
    //let phone=toString(tel)Number(countyid)
    let phone=tel.toString()
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  goto: function(e){
    let zhandian = e.currentTarget.dataset.zhandian;
    wx.navigateTo({
      url: '../tongzhan/tongzhan?zhandian='+ zhandian
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
      success(res) {},
      fail: function (err) {
        console.log(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let line = options.line;
    if(line){
      this.setData({
        line
      })
    };
    wx.showLoading({
      title: '努力查找中...',
      mask: true,
    })
    setTimeout(function(){
      wx.hideLoading()
    },100)
    this.setData({'lists':[]})
    var that = this
    let key = that.data.line;
    console.log("查询的内容", key)
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('line_all').where(_.or([{
      line_detail: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      line: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      line_new: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    ])).get({
      success: res => {
        console.log(res)
        that.setData({
          lists: res.data,
        })
      },
      fail: err => {
        console.log(err)
      }
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
    // this.onPullDownRefresh()
    wx.setNavigationBarTitle({
      title:this.data.line
    })
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
    setTimeout(function(){
      //setInterval(function(){
      wx.stopPullDownRefresh() 
      wx.showToast({
        title: '刷新成功！',
        icon:'none'
      })
    },3000);
    // this.onLoad()
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