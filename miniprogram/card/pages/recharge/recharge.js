// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    markers:[
      {
        id:1,
        latitude:26.90061,
        longitude:112.606715,
        joinCluster:true,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"客服中心充值点（公交集团有限公司点）",
        address:'衡阳市石鼓区环城北路38号',
        tel:"0734-8217127",
        callout: {
          content:'客服中心',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:2,
        latitude:26.896617,
        longitude:112.614435,
        joinCluster:true,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"解放路点（解放大道点、五福庵巷口点）",
        address:'衡阳市石鼓区解放大道河边工行大厦左侧五福庵巷口',
        callout: {
          content:'解放路点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:3,
        latitude:26.903729,
        longitude:112.600925,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"船山路点（船山大道附一对面步步高超市点）",
        address:'衡阳市石鼓区船山大道步步高超市（附一医院对面）',
        joinCluster:true,
        callout: {
          content:'船山路点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:4,
        latitude:26.894077,
        longitude:112.597803,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"步行街点（石化广场点）",
        address:'衡阳市蒸湘区衡阳商业步行街（石化广场）（原汽车西站）',
        joinCluster:true,
        callout: {
          content:'步行街点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:5,
        latitude:26.919038,
        longitude:112.61879,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"五一市场点",
        address:'衡阳市石鼓区128路起点站旁',
        joinCluster:true,
        callout: {
          content:'五一市场点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:6,
        latitude:26.895377,
        longitude:112.708397,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"衡阳东站点（衡阳高铁站）",
        address:'衡阳市珠晖区衡阳东高铁站',
        joinCluster:true,
        //26.895423,112.709072
        callout: {
          content:'衡阳东站点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:7,
        latitude:26.889177,
        longitude:112.629422,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"衡阳火车站点（衡阳站）",
        address:'衡阳市珠晖区衡阳火车站146路公交站台旁',
        joinCluster:true,
        callout: {
          content:'衡阳火车站点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:8,
        latitude:26.829375,
        longitude:112.648836,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"白沙洲汽车站点（白沙洲点）",
        address:'衡阳市雁峰区白沙洲汽车南站公交站台旁',
        joinCluster:true,
        callout: {
          content:'白沙洲点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:9,
        latitude: 26.907814,
        longitude:112.580378,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"中心汽车站点",
        address:'衡阳市蒸湘区船山大道88号中心汽车站公交站台旁',
        joinCluster:true,
        callout: {
          content:'中心汽车站点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:10,
        latitude: 26.892564,
        longitude:112.566744,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"步步高广场点（华新步步高点）",
        address:'衡阳市蒸湘区解放大道步步高广场步步高超市入口旁',
        joinCluster:true,
        callout: {
          content:'华新步步高点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id:11,
        latitude: 26.973898,
        longitude:112.357359,
        width: 34,
        height: 34,
        iconPath: '../../images/gjkczd1.png',
        title:"蒸阳车站点（衡阳县点）",
        tel:"0734-2850901",
        address:'衡阳县西渡镇城西大道8号蒸阳车站',
        joinCluster:true,
        callout: {
          content:'蒸阳车站点',
          padding: 10,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      }
    ],
    points: [{
      latitude:26.90061,
      longitude:112.606715,
		},{
			latitude:26.896617,
      longitude:112.614435,
		},{
      latitude:26.903729,
      longitude:112.600925,
    },{
      latitude:26.894077,
      longitude:112.597803,
    },{
      latitude:26.919038,
      longitude:112.61879,
    },{
      latitude:26.895377,
      longitude:112.708397,
    },{
      latitude:26.889177,
      longitude:112.629422,
    },{
      latitude:26.829375,
      longitude:112.648836,
    },{
      latitude: 26.907814,
      longitude:112.580378,
    },{
      latitude: 26.892564,
      longitude:112.566744,
    },{
      latitude: 26.973898,
      longitude:112.357359,
    }],
    location:{
      latitude:26.894932,
      longitude:112.601334,
    },
    distance:[],
  },

  markerCluster() {
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: true,
      gridSize: 100,
      zoomOnClick: true,
      success: (res) => {
        console.log(res)
      },
      complete: (res) => {
        console.log(res)
      },
    })
  },

  tips:function(){
    wx.showModal({
      title: '温馨提示',
      content: '本页面所显示的充值点及其位置来源于网络，为大致位置，仅供参考，请谨慎参考，不能保证所有充值点正常营业。',
      showCancel:false,
      confirmText:"我知道了"
    })
  },

  xianshi:function(e){
    console.log(e)
    console.log(e.detail.markerId)
    var cc=e.detail.markerId;
    let that = this;
    let name=that.data.markers.find(item=>{
      return item.id==cc
    })
    console.log(name)
    wx.showModal({
      title:name.title,
      content:'地址:'+name.address,
      showCancel: true,
      cancelText:'返回',
      confirmText:'查看详情',
      confirmColor:"#0575E6",
      cancelColor:"#8E8E8E",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../recharge/detail?name='+name.address+"&id="+cc+'&title='+name.title+"&latitude="+name.latitude+"&longitude="+name.longitude+'&latitudedq='+that.data.dqlat+'&longitudedq='+that.data.dqlng,
          });
        }
        res.cancel && console.log("用户拒绝了去更改位置设置")
      },
    })
    
  },

  detail:function(e){
    let cc=e.currentTarget.dataset.id;
    // var cc = e.detail.currenttarget.id;
    // console.log(e)
    // console.log(e.detail.markerId)
    // var cc=e.detail.markerId;
    let that = this;
    let name=that.data.markers.find(item=>{
      return item.id==cc
    })
    console.log(name)
    // wx.showModal({
    //   title:name.title,
    //   content:'地址:'+name.address,
    //   showCancel: true,
    //   cancelText:'返回',
    //   confirmText:'查看详情',
    //   confirmColor:"#0575E6",
    //   cancelColor:"#8E8E8E",
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
          wx.navigateTo({
            url: '../recharge/detail?name='+name.address+"&id="+cc+'&title='+name.title+"&latitude="+name.latitude+"&longitude="+name.longitude+'&latitudedq='+that.data.dqlat+'&longitudedq='+that.data.dqlng,
          });
    //     }
    //     res.cancel && console.log("用户拒绝了去更改位置设置")
    //   },
    // })
    
  },

  getLocation: function(e) {
    var that = this
    wx.getLocation( {
      type: 'gcj02',
      success: function( res ) {
        console.log( res )
        that.setData( {
          hasLocation: true,
          // location: {
          //   longitude: res.longitude,
          //   latitude: res.latitude
          // },
          dqlng: res.longitude,
          dqlat: res.latitude
        })
        //that.getAddress(res.latitude, res.longitude)
      }
    })
  },

  onRunApi (){
		const mapCtx = wx.createMapContext('map', this);
			mapCtx.includePoints({
				points: this.data.points,
				padding: [36, 36, 10, 36]
    });
    console.log("刷新着")
		setTimeout(() => {
    },1000);
  },

  getjwd:function(){
    //this.data.markers[1]
    let lat1=this.data.dqlat;
    let lng1=this.data.dqlng;
    var keyArr = []
    this.data.markers.forEach(item =>{
      let lat2 = item.latitude;
      let lng2 = item.longitude;
      let title = item.title;
      const distance_new=this.getDistance(lat1,lng1,lat2,lng2);
      //console.log(title,distance_new)
      keyArr.push(distance_new)
      return keyArr
    })
    console.log("距离数组",keyArr)
    var newkeyArr = keyArr.flatMap(item => [{ distance:item}])
    console.log("格式化后的距离数组",newkeyArr)
    // var newkeyArr = keyArr.flatMap(item => [{ distance: item }])
    // console.log(newkeyArr)

    // var d = new Array()
    // for(var i=0;i<this.data.markers.length;i++){
    //   d.push([this.data.markers[i],newkeyArr[i]]);
    // }
    // console.log(d)
    // var c = keyArr
    // c.forEach(item => {
    //   item.km = item
    // })
    // keyArr.forEach((value, index) => {
    //   value['km'] = item
    // })
    // console.log(c)
    // var d = new Array()
    // for(var i=0;i<this.data.markers.length;i++){
    //   d.push([this.data.markers[i],keyArr[i]]);
    // }
    // console.log(d)
    // var z = [{ qq: "128km" }, { qq: "127km" }, { qq: "125km" }, { qq: "128km" }, { qq: "127km" }, { qq: "125km" }, { qq: "128km" }, { qq: "127km" }, { qq: "125km" }, { qq: "128km" }, { qq: "127km" },]
    // var m = new Array()
    // for (var i = 0; i < this.data.markers.length; i++) {
    //   m.push([this.data.markers[i], z[i]]);
    // }
    // console.log(m)
    // var arr3 = this.data.markers.concat(z);
    // console.log("arr3",arr3)
    // var k= k.zip(this.data.markers,z);
    // console.log(k)
    // let newObj = [];
    // Object.assign(newObj, this.data.markers, z);
    // console.log("newObj",newObj)
    // z.push.apply(z, this.data.markers);
    // console.log(z)
    // this.data.markers.forEach(item => {
    //   item.km == item
    //   // if (item.km == null || item.name == '') {
    //   //   item._disabled = false
    //   // } else if (item.name !== null) {
    //   //   item._disabled = true
    //   // }
    // })
    this.setData({
      meter:keyArr
    })

    // function compare(1) {//property:根据什么属性排序
    //   return function (a, b) {
    //     var value1 = a[1];
    //     var value2 = b[1];
    //     /*
    //     * value2 - value1; ——> 降序
    //     * value1 - value2; ——> 升序
    //     */
    //     return value1 - value2;//升序排序
    //   }
    // }

    // // 打印排序后的数组
    // console.log(d.sort(compare('1')))
  },

  getDistance(lat1, lng1, lat2, lng2) {
    // let lat1=this.data.latitude;
    // let lng1=this.data.longitude;
    //let lat2 = latitude;
    //let lng2 = longitude;
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    //s = s.toFixed(1) + 'km' //保留1位小数
    s = s.toFixed(2) + 'km' //保留两位小数
    //console.log('经纬度计算的距离:' + s)
    this.setData({
      jl: s
    })
    //console.log(this.data.jl)
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
    this.mapCtx = wx.createMapContext('map')
    this.markerCluster()
    this.getLocation()
    this.onRunApi ()
    setTimeout(() => {
      this.getjwd()
    }, 1000);
    setTimeout(() => {
      this.getjwd()
    }, 10000);
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