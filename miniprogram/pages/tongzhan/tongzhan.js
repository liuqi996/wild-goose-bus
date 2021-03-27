// pages/tongzhan/tongzhan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载let zhandian = options.zhandian;
   */
  onLoad: function (options) {
    let zhandian = options.zhandian;
    /*let zhandian=options.fxzhandian;
    /*let zhandian = that.data.fxzhandian;*/
    console.log(options)
    if(zhandian){
      this.setData({
        zhandian
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
       let key = that.data.zhandian;
       console.log("查询的内容", key)
       const db = wx.cloud.database();
       const _ = db.command
       db.collection('bus-line').where(_.or([{
         stop: db.RegExp({
           regexp: '.*' + key,
           options: 'i',
         })
       },
       ])).get({
         success: res => {
           console.log(res)
           that.setData({
             lists: res.data
           })
         },
         fail: err => {
           console.log(err)
         }
       })
},
goto: function(e){
  let line = e.currentTarget.dataset.line;
  console.log(e.currentTarget.dataset); // 打印出来试试
  wx.navigateTo({
    url: '../xianlutu/xianlutu?line='+ line
  })
},

goto1: function(e){
  let zhandian = e.currentTarget.dataset.zhandian;
  console.log(e.currentTarget.dataset); // 打印出来试试
  wx.navigateTo({
    url: '../tongzhan/tongzhan?zhandian='+ zhandian
  })
},

chwl: function () {
  /*wx: wx.showLoading({
    title: '努力查找中...',
    mask: true,
  })
  setTimeout(function(){
    wx.hideLoading()
  },400)*/
  this.setData({'chwllists':[]})
     var that = this
     let key = that.data.zhandian;
     console.log("查询的内容", key)
     const db = wx.cloud.database();
     const _ = db.command
     db.collection('fun').where(_.or([{
       zhandian: db.RegExp({
         regexp: '.*' + key,
         options: 'i',
       })
     },
     ])).get({
       success: res => {
         console.log(res)
         that.setData({
           chwllists: res.data
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
    wx.setNavigationBarTitle({
      title:this.data.zhandian
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