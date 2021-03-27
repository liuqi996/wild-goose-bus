// pages/bus_stop/bus_stop.js
//const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1:[ ],
    showLoading:true,
    dialogShow: false,
    setting: {
			scale: 16,
    },
    ne:[ ],
    sx:'yo',
    top_z: "80vh",
  },

  touch:function(){
    // let that =this,
    if(this.data.sx == 'yo'){
      this.setData({
        // top_z:"50vh",
        top_z:"20vh",
        sx:'ko'
      })
    }
    else{
      this.setData({
        top_z:"80vh",
        sx:'yo'
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.lat)
    //console.log("本站台公交线路",options.all_line)
    var all_line = JSON.parse(options.all_line)
    wx.showLoading({
      title: '正在加载中',
    })
    // let that=this;
    setTimeout(function(){
      // that.setData({
      //   showLoading:false
      // })
      wx.hideLoading({
        success: (res) => {},
      })
     },1000);
    this.setData({
      latitude:options.lat,
      longitude:options.lng,
      name:options.name,
      all_line:all_line,
      //all_line:options.all_line,
      points:[{
        latitude:options.lat,
        longitude:options.lng
      }],
      markers: [{
        id: 1,
        latitude:options.lat,
        longitude:options.lng,
        width: 34,
        height: 34,
        title:options.name,
        iconPath: '../../images/station.png',
        //address:'',
        callout: {
          content:options.name,
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      }],
    })
    setTimeout(() => {
      const mapCtx = wx.createMapContext('map', this);
      // mapCtx.includePoints({
			// 	points: this.data.points,
			// 	padding: [100, 50, 100, 50]
      // });
			// mapCtx.includePoints({
			// 	points: this.data.points,
			// 	padding: [36, 36, 10, 36]
      // });
      console.log("获取po后重新设置视野")
    },1000);
    // this.data.all_line.forEach((item,i_item)=>{
    this.data.all_line.forEach((item,index)=>{
      console.log("逐一显示",item)
      let key = item;
      let that = this;
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
            index:res.data,
          })
          console.log(index,that.data.index)
          Array.prototype.push.apply(that.data.arr1, that.data.index);
        },
        fail: err => {
          console.log(err)
        }
      })
    })
    setTimeout(()=>{
      this.setData({
        arr1:this.data.arr1
      })
      console.log("arr1",this.data.arr1)
    },1000)
  },

  bianse:function(e){
    // this.setData({
    //   bh_color:"red"
    // })
    var that=this;
    const { arr1 }=this.data;
    console.log("arr1",arr1)
    const { idx } = e.currentTarget.dataset;
    console.log("cc",idx)
    // const { cc } = e.currentTarget.dataset;
    // console.log("cc",cc)
    const { xinindex } = e.currentTarget.dataset;
    console.log("xinindex",xinindex)
    const zz = arr1[xinindex];
    console.log(zz)
    console.log([`arr1[${xinindex}].stop[${idx}].bianse`])
    this.setData({
      [`arr1[${xinindex}].stop[${idx}].bianse`]:"red",
      bianse:!that.data.arr1[xinindex].stop[idx].bianse,
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