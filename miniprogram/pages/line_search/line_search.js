// pages/line_search/line_search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canGetLocation: true,
    lists: [],
    lists_nums:0,
    fu:0,
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

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
  },

  tap() {
   
  },

  tapMove() {
  
  },

  sousuo:function(e){
    this.setData({
      searchvalue: e.detail.value
    })
    this.setData({
      lists_nums:0,
      fu:0,
    })
    this.search();
  },

  search: function () {
    this.setData({
      lists_nums:0,
      fu:0,
    })
    this.setData({'lists':[]})
    var that = this
    let key = that.data.searchvalue;
    if (key===undefined){
      wx.showToast({
        title: '您还未输入线路号哦！',
        icon:'none'
      })
    }else{
      console.log("查询的内容", key)
      const db = wx.cloud.database();
      const _ = db.command
      db.collection('line_all').where(_.or([{
        line: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        line_detail: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        line_small: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        stop: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        station: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        fanxiang: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        company: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
    ]))
    .orderBy('line', 'asc')
    .get({
      success: res => {
        console.log(res)
        that.setData({
          lists: res.data
        })
        that.gaoliang()
      },
      fail: err => {
        console.log(err)
      }
    })
  }
  },

  getHilightStrArray(str,key){
    return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
  },

  line:function(e){
    let line = e.currentTarget.dataset.line;
    console.log(line)
    wx.navigateTo({
      url: '../bus_line/bus_line?line='+ line
    })
  },

  gaoliang:function(){
    let that=this;
    var searchResultList = []
    if(that.data.lists){
      for(var i=0;i<that.data.lists.length;i++){
      	let obj={line:that.data.lists[i].line};
      	//高亮字符串数组
      	obj.searchArray=that.getHilightStrArray(that.data.lists[i].line,that.data.searchvalue)
      	searchResultList.push(obj)
      } 
    }
    that.setData({
      searchResultList:searchResultList
    })
    console.log(searchResultList)
  },

  more: function () {
    var that = this
    let key = that.data.searchvalue;
    const db = wx.cloud.database();
    const _ = db.command
    let x = this.data.lists_nums + 20
    console.log(x)
    let old_data = this.data.lists
    db.collection('line_all').skip(x)
    .where(_.or([{
      line: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      line_detail: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      line_small: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      stop: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      station: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      fanxiang: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      company: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    ]))
    .orderBy('line', 'asc')
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
        lists: old_data.concat(res.data),
        lists_nums: x,
      })
      this.gaoliang()
        console.log(res.data)}
    })
    .catch(err => {
      console.error(err)
    })
    cnsole.log('circle 下一页');
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