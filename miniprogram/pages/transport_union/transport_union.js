// pages/transport_union/transport_union.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list_nums:0,
    fu:0,
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },

  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    var countyid=e.currentTarget.dataset.countyid;
    this.setData({
      tihuoWay: name,
      select: false,
      countyid:countyid,
      fu:0,
      list_nums:0,
      searchvalue:'',
      list:[]
    })
    this.sousuo()
  },

  search:function(e){
    this.setData({
      searchvalue: e.detail.value,
      list_nums:0,
      fu:0,
      list:[]
    })
    this.linesearch();
  },

  linesearch: function () {
    this.setData({
      list_nums:0,
      fu:0,
      list:[]
    })
    let countyid=this.data.countyid;
    this.setData({'list':[]})
    var that = this;
    let key = that.data.searchvalue;

    if (key===undefined){
      wx.showToast({
        title: '您还未输入线路号哦！',
        icon:'none'
      })
    }
    else{
      const db = wx.cloud.database();
      const _ = db.command
      if(that.data.countyid=='hy'){
        db.collection('union-line').where(
          _.or([{
            countylineid: db.RegExp({
              regexp: '.*' + key,
              options: 'i',
            })
          }])
        ).get({
          success: res => {
            that.setData({
              list: res.data
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      }
      else{
        db.collection('union-line').where(
        _.and([
          {
            countylineid: db.RegExp({
              regexp: '.*' + key,
              options: 'i',
            })
          },
          {
            county_id:Number(countyid)
          }
        ])
      ).get({
        success: res => {
          console.log(res)
          that.setData({
            list: res.data
          })
        },
        fail: err => {
          console.log(err)
        }
        })
      }
    }
  },

  sousuo:function(e){
    let countyid=this.data.countyid;
    console.log(countyid)
    this.setData({
      fu:0
    })
    const db = wx.cloud.database();
    let that=this;
    db.collection('union-line').where({
    county_id:Number(countyid)
    })
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          list:res.data
        })
      }
    })
  },
  
  more: function () {
    let countyid=this.data.countyid;
    console.log(countyid)
    console.log(this.data.countyid)
    const db = wx.cloud.database();
    const _ = db.command
    let x = this.data.list_nums + 20
    console.log(x)
    let old_data = this.data.list
    if(this.data.countyid=='hy'){
      db.collection('union-line').skip(x)
      .get()
      .then(res => {
        if(res.data==null || res.data==0 || res.data==" "){
          console.log("为空")
          this.setData({
            fu:1
          })
          wx.showToast({
            title: '没有更多匹配公交线路了哦！',
            icon:"none"
          })
        }
        else{
        this.setData({
          list: old_data.concat(res.data),
          list_nums: x
        })
        console.log(res.data)}
      })
      .catch(err => {
        console.error(err)
      })
      console.log('circle 下一页');
    }
    else{
      db.collection('union-line').skip(x)
      .where({
        county_id:Number(countyid)
      })
      .get()
      .then(res => {
        if(res.data==null || res.data==0 || res.data==" "){
          console.log("为空")
          this.setData({
            fu:1
          })
          wx.showToast({
            title: '亲，没有更多匹配公交线路了哦！',
            icon:"none"
          })
        }
        else{
          this.setData({
            list: old_data.concat(res.data),
            list_nums: x
          })
          console.log(res.data)
        }
      })
      .catch(err => {
        console.error(err)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tihuoWay: '全衡阳',
      select: false,
      countyid:'hy'
    }) 
    let that=this;
    const db = wx.cloud.database();
    db.collection('union-line')
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          list:res.data
        })
      }
    })
  },

  quanhengyang:function(e){
    var name = e.currentTarget.dataset.name;
    var countyid=e.currentTarget.dataset.countyid;
    this.setData({
      tihuoWay: name,
      select: false,
      countyid:countyid,
      fu:0,
      list_nums:0
    })
    let that=this;
    const db = wx.cloud.database();
    db.collection('union-line')
    .get({
      success: function(res){
        console.log(res.data)
        that.setData({
          list:res.data
        })
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
    if(this.data.fu==0){
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})