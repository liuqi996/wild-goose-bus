//app.js
App({
  onLaunch: function () {
    this.initcloud();
    this.getSystemInfo();
    this.panduan()
  },
  initcloud:function(){
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    //this.globalData = {}
  },
  panduan:function(){
    var that=this;
    wx.getSetting({
      success(res) {
        console.log(res.authSetting);
        if (res.authSetting['scope.userInfo']) {
          console.log('授权过信息');
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              that.globalData.userInfo = res.userInfo;
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('没有授权')
        }
      }
    })
  },
  getStorage:function(){
    let that = this;
    wx.getStorage({
      key: 'hasUserInfo',
      success (res) {
        console.log(res.data),
        that.globalData.hasUserInfo = res.data
      }
    })
  },
  getSystemInfo:function(){
    var that = this;
    wx.getSystemInfo({
      success (res) {
        that.globalData.statusBarHeight = res.statusBarHeight
      }
    })
    // 获取状态栏高度
    const { statusBarHeight } = wx.getSystemInfoSync();
    // 得到右上角菜单的位置尺
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const { top, height } = menuButtonObject;
    // 计算导航栏的高度 此高度基于右上角菜单在导航栏位置垂直居中计算得到
    const navBarHeight = height + (top - statusBarHeight) * 2;
    that.globalData.navBarHeight = navBarHeight;
    const statusNavBarHeight = statusBarHeight + navBarHeight;
    that.globalData.statusNavBarHeight = statusNavBarHeight;
  },
  globalData:{
    statusBarHeight:' ',
    statusNavBarHeight:' ',
    navBarHeight:' ',
    hasUserInfo:'',
    flag: 0 ,
    cityInfo: '',
    userInfo:null
  }
})
