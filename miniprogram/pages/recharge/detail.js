// pages/recharge/detail.js
//let plugin = requirePlugin('routePlan');
const util = require('../../file/version');
let key = 'KWZBZ-4FORX-ZVR4R-7TPIR-GI5V2-EUBLI'
let referer = '雁城巴士助手';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xs:false,
    show:true,
    shows:true,
    isDisabled: false,
		dialogShow: false,          link:'https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html'
  },

  XCX:function(){
    let latitude=this.data.latitude;
    let longitude=this.data.longitude;
    let name=this.data.title;
    let endPoint = JSON.stringify({//终点
      'name':name,
      'latitude':Number(latitude),
      'longitude':Number(longitude)
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  yd:function(){
    this.setData({
      xs:true
    })
    var sh = this.data.show;
    var shs = this.data.shows;
    this.setData({
      show: !sh,
      shows:!shs
    })
  },

  intoMap:function(){
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    let latitude=this.data.latitude;
    let longitude=this.data.longitude;
    let name=this.data.title;
    let address=this.data.address;
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      name:name,
      address:address,
    })
  },

  getLocation: function(e) {
    var that = this
    wx.getLocation( {
      type: 'gcj02',
      success: function( res ) {
        console.log( res )
        that.setData( {
          longitudedq: res.longitude,
          latitudedq: res.latitude
        })
        const distance_new=that.getDistance(res.latitude,res.longitude,that.data.recharge_latitude,that.data.recharge_longitude);
        console.log('distance_new',distance_new);
      }
    })
  },

  // //获取当前位置
  // dingwei:function(){
  //   wx.getLocation({
  //     type: 'gcj02',
  //     success: (res) => {
  //       console.log('当前位置:', res)
  //       // this.setData({
  //       //   user_latitude: res.latitude,
  //       //   user_longitude: res.longitude
  //       // })
  //       const distance_new=this.getDistance(res.latitude,res.longitude,this.data.recharge_latitude,this.data.recharge_longitude);
  //       console.log('distance_new',distance_new);
  //     }
  //   })
  // },

  getDistance(lat1, lng1, lat2, lng2) {
    //let lat2=this.data.recharge_latitude;
    //let lng2=this.data.recharge_longitude;
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(1) + 'km' //保留两位小数
    //console.log('经纬度计算的距离:' + s)
    this.setData({
      jl:s
    })
    console.log("距离",this.data.jl)
    return s
  },

  // 计算距离函数
  Rad(d) {
    //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log(options)
    that.getLocation()
    that.setData({
      title:options.title,
      address:options.name,
      latitude:options.latitude,
      longitude:options.longitude,
      recharge_latitude:options.latitude,
      recharge_longitude:options.longitude
    })
    that.setData({
      markers:[
        {
          id:1,
          latitude:options.latitudedq,
          longitude:options.longitudedq,
          title:"我",
          iconPath: '../../images/relocation.png',
          width: 40,
          height: 40,
        },
        {
          id:2,
          latitude:options.latitude,
          longitude:options.longitude,
          title:options.title,
          address:options.name,
          iconPath: '../../images/gjkczd1.png',
          width: 34,
          height: 34,
          callout: {
            content:options.title,
            padding: 10,
            display: 'ALWAYS',
            textAlign: 'center'
          }
        }
      ],
      polyline:[{
        points:[{
          latitude:options.latitudedq,
          longitude:options.longitudedq
        },
        {
          latitude:options.latitude,
          longitude:options.longitude,
        }
      ],
      width:6,
      style:3,
      color:'#87CEFA',
      arrowLine:true
    }],
    points:[{
      latitude:options.latitudedq,
      longitude:options.longitudedq
    },
    {
      latitude:options.latitude,
      longitude:options.longitude,
    }
  ]
    })
		setTimeout(() => {
      const mapCtx = wx.createMapContext('map', this);
			mapCtx.includePoints({
				points: this.data.points,
				padding: [36, 36, 10, 36]
    });
    console.log("刷新着")
    },1000);
    setTimeout(() => {
      this.movecar()
    },1000);
    // that.dingwei()
  },

  movecar () {
		const version = wx.getSystemInfoSync().SDKVersion;

		if (util.compareVersion(version, '2.13.0') < 0) {
			wx.showToast({
				title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
				icon: 'none'
			});
			return;
		}
		const mapCtx = wx.createMapContext('map', this);
		if (this.data.isDisabled) {
			return;
		}
		this.setData({
			isDisabled: true
		});
		this.timer = setTimeout(() => {
			this.setData({
				isDisabled: false
			});
		},10000);
		mapCtx.moveAlong({
			markerId: 1,
			path: this.data.polyline[0].points,
      duration: 10000,
      autoRotate:false
			//autoRotate: true
		});

	},

  onRunApi (){
		const mapCtx = wx.createMapContext('map', this);
			mapCtx.includePoints({
				points: this.data.polyline.points,
				padding: [36, 36, 10, 36]
    });
    console.log("刷新着")
		setTimeout(() => {
    },1000);
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