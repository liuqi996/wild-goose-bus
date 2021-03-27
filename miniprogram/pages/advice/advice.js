// pages/advice/advice.js
var util = require('../../file/full_time.js')
var common = require('../../file/full_time_ch.js')
let ymd = require('../../file/ymd.js')
let randomLen=5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:'',
    xinDate:'',
    date:'',
    problem_kind:"",
    // problem_kind:"新增功能",
    problem_list: [
      {name: '新增功能', checked: 'true'},
      {name: '逻辑错误'},
      {name: '加载错误'},
      {name: 'UI优化'}
    ],
    // problem_list: [
    //   {value: 'menu', name: '新增功能', checked: 'true'},
    //   {value: 'logic', name: '逻辑错误'},
    //   {value: 'load', name: '加载错误'},
    //   {value: 'ui', name: 'UI优化'}
    // ],
    form_kind:[
      {name:"线路错误反馈"},
      {name:"程序开发建议"},
      {name:"其他问题"}
    ],
    height: 20,
    TabCur: 0,
    scrollLeft:0,
    array: ['[选择地区]','衡阳市', '城际','南岳区','衡阳县', '衡南县', '衡山县','衡东县','祁东县','常宁市','耒阳市'],
    objectArray: [
      {
        id: 0,
        name: '衡阳市'
      },
      {
        id: 1,
        name: '城际'
      },
      {
        id: 2,
        name: '南岳区'
      },
      {
        id: 3,
        name: '衡阳县'
      },
      {
        id: 4,
        name: '衡南县'
      },
      {
        id: 5,
        name: '衡山县'
      },
      {
        id: 6,
        name: '衡东县'
      },
      {
        id: 7,
        name: '祁东县'
      },
      {
        id: 8,
        name: '常宁市'
      },
      {
        id: 9,
        name: '耒阳市'
      }
    ],
    index: 0,
  },

  formSubmit(e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.line_advice)

    if(e.detail.value.county=="[选择地区]"){
      wx.showToast({
        title: '请填写线路所属地区',
        duration: 2000,
        icon:'none'
      })
    }
    else if(e.detail.value.line_number==""){
      wx.showToast({
        title: '请填写有错误的线路号',
        duration: 2000,
        icon:'none'
      })
    }
    else if(e.detail.value.line_advice==""){
      wx.showToast({
        title: '请填写错误描述',
        duration: 2000,
        icon:'none'
      })
    }
    else{
      var line_submit_ymd_date = ymd.formatTime(new Date());
      //var line_str = line_ymd_date;
      // let line_cymd=line_str.replace(/[^0-9]/gi, "")
      let new_line_submit_ymd_date=line_submit_ymd_date.replace(/[^0-9]/gi, "")
      console.log("年月日数字",line_submit_ymd_date.replace(/[^0-9]/gi, ""));
      // var line_no4 = "";
      // for (var i = 0; i < randomLen; i++)
      // {
      //   line_no4 += Math.floor(Math.random() * 10);
      // }
      // line_no4 = line_cymd + "-" + line_no4;
      // console.log("年月日数字+5位数",line_no4)
      // this.setData({
      //   line_no4:line_no4
      // })
      var line_submit_five_number = "";
      var new_line_submit_five_number = "";
      for (var i = 0; i < randomLen; i++)
      {
        line_submit_five_number += Math.floor(Math.random() * 10);
      }
      console.log(line_submit_five_number)
      new_line_submit_five_number = new_line_submit_ymd_date + "-" + line_submit_five_number;
      console.log("年月日数字+5位数",new_line_submit_five_number)
      this.setData({
        submit_time: util.formatTime(new Date())
      });
      let county=e.detail.value.county;
      var line_number = e.detail.value.line_number;
      var line_advice = e.detail.value.line_advice;
      var advice_number=that.data.no4;
      const db = wx.cloud.database();
      db.collection("line_advice").add({
        data:{
          _id:advice_number,
          county:county,
          line_number:line_number,
          line_advice:line_advice,
          ad_number:advice_number,
          submit_number:new_line_submit_five_number,
          open_time:that.data.full_time,
          submit_time:that.data.submit_time
        }
      }).then(res=>{
        console.log('提交成功！感谢您的支持！',res)
        wx.showLoading({
          title: '正在提交中…',
          //duration:2000
        })
        setTimeout(() => {
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '建议提交成功！',
                icon: 'success',
                duration: 3000
              })
            },
          })
        }, 1500);
        setTimeout(() => {
          that.onShow()
          setTimeout(() => {
            that.clear()
          }, 1000);
        }, 2000);
        // that.clear()
      })
    }
  },

  program_formsubmit(e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var problem_kind = that.data.problem_kind;
    //console.log(e.detail.value.program_advice)
    //console.log(e.detail.value.problem_kind)
    // if(e.detail.value.problem_kind==""){
    if(problem_kind==""){
      wx.showToast({
        title: '请填写问题类型',
        duration: 2000,
        icon:'none'
      })
    }
    else if(e.detail.value.problem_advice==""){
      wx.showToast({
        title: '请填写您的建议或意见',
        duration: 2000,
        icon:'none'
      })
    }
    else{
      // let problem_kind = e.detail.value.problem_kind;
      var problem_advice = e.detail.value.problem_advice;
      var advice_number=that.data.no4;
      const db = wx.cloud.database();
      db.collection("problem_advice").add({
        data:{
          _id:advice_number,
          problem_kind:problem_kind,
          problem_advice:problem_advice,
          ad_number:advice_number,
          open_time:that.data.full_time,
        }
      }).then(res=>{
        //console.log('提交成功！感谢您的支持！',res)
        wx.showToast({
          title: '已提交，感谢支持！♥',
          icon: 'none',
          // title: '反馈成功！',
          // icon: 'success',
          duration: 3000
        })
        setTimeout(() => {
          that.onShow()
          setTimeout(() => {
            that.clear_pro()
          }, 1000);
        }, 2000);
        // that.clear()
      })
    }
  },

  other_formsubmit(e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //console.log(e.detail.value.program_advice)
    //console.log(e.detail.value.problem_kind)
    if(e.detail.value.other_advice==""){
      wx.showToast({
        title: '建议不能为空',
        duration: 2000,
        icon:'none'
      })
    }
    else{
      var other_advice = e.detail.value.other_advice;
      var advice_number=that.data.no4;
      const db = wx.cloud.database();
      db.collection("other_advice").add({
        data:{
          _id:advice_number,
          other_advice:other_advice,
          ad_number:advice_number,
          open_time:that.data.full_time,
        }
      }).then(res=>{
        //console.log('提交成功！感谢您的支持！',res)
        wx.showToast({
          title: '已提交，感谢支持！♥',
          icon: 'none',
          // icon: 'success',
          duration: 3000
        })
        setTimeout(() => {
          that.onShow()
          setTimeout(() => {
            that.clear_oth()
          }, 1000);
        }, 2000);
      })
    }
  },

  clear:function(){
    this.setData({
      index:0,
      line_number:"",
      line_advice:""
    })
    console.log("重置表单")
  },

  clear_pro:function(){
    this.setData({
      problem_kind:"新增功能",
      problem_advice:"",
    })
    console.log("重置表单")
  },

  clear_oth:function(){
    this.setData({
      other_advice:"",
    })
    console.log("重置表单")
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      index: 0
    })
  },

  program_formreset(e){
    this.setData({
      problem_kind:"",
      program_advice:""
    })
  },

  other_formreset(e){
    this.setData({
      other_advice:""
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // const problem_list = this.data.problem_list
    // for (let i = 0, len = problem_list.length; i < len; ++i) {
    //   problem_list[i].checked = problem_list[i].value === e.detail.value
    // }
    // this.setData({
    //   problem_list
    //   // problem_kind:problem_list
    // })
    // console.log(this.data.problem_list)
    // console.log(this.data.problem_kind)
    this.setData({
      problem_kind:e.detail.value
    })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    console.log(this.data.TabCur)
    var ymd_date = ymd.formatTime(new Date());
    // this.setData({
    //   full_time: util.formatTime(new Date())
    // });
    // this.setData({
    //   ymd_date: util.formatTime(new Date())
    // });
    var str1 = ymd_date;
    let cymd=str1.replace(/[^0-9]/gi, "")
    console.log("年月日数字",str1.replace(/[^0-9]/gi, ""));
    var no4 = "";
    for (var i = 0; i < randomLen; i++)
    {
      no4 += Math.floor(Math.random() * 10);
    }
    no4 = cymd + "-" + no4;
    console.log("年月日数字+5位数",no4)
    this.setData({
      no4:no4,
      full_time: util.formatTime(new Date())
    })
  },

  swiperChange: function (e) {
    console.log(e);
    this.setData({
      TabCur: e.detail.current,
    })
    var ymd_date = ymd.formatTime(new Date());
    // this.setData({
    //   ymd_date: util.formatTime(new Date())
    // });
    var str1 = ymd_date;
    let cymd=str1.replace(/[^0-9]/gi, "")
    console.log("年月日数字",str1.replace(/[^0-9]/gi, ""));
    var no4 = "";
    for (var i = 0; i < randomLen; i++)
    {
      no4 += Math.floor(Math.random() * 10);
    }
    no4 = cymd + "-" + no4;
    console.log("年月日数字+5位数",no4)
    this.setData({
      no4:no4,
      full_time: util.formatTime(new Date())
    })
  },

  bindPickerChange: function(e) {
    console.log('picker地区发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },

  upImg(){
    var xinDate = util.formatTime(new Date());
    this.setData({
      xinDate: util.formatTime(new Date())
    });
    var str = xinDate;
    let ctime=str.replace(/[^0-9]/gi, "")
    console.log(str.replace(/[^0-9]/gi, ""));
    
    //random_no = ctime + "-" + random_no;
    let nowDate= common.formatDate(new Date())
    this.setData({
      nowDate: common.formatDate(new Date())
    });
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res);
        wx.cloud.uploadFile({
          cloudPath:'test/' + that.data.no4+'/'+ctime+'.jpg',
          // cloudPath:'test/' + Math.floor(Math.random()*1000000)+'.jpg',
          filePath:res.tempFilePaths[0],
          success(res){
            console.log("成功并打印flieId",res);
          }
        })
      }
    })
  },

  chooseImage: function () { 
    var that = this; 
    console.log('aaaaaaaaaaaaaaaaaaaa')
    wx.cloud.uploadFile({
      cloudPath:'test/'+ Math.floor(Math.random()*1000000),
      filePath:res.tempFilePaths[0],
      success(res){
        console.log("成功",res);
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({ 
    current: current, 
    urls: this.data.imageList 
    }) 
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
    var ymd_date = ymd.formatTime(new Date());
    // this.setData({
    //   ymd_date: util.formatTime(new Date())
    // });
    var str1 = ymd_date;
    let cymd=str1.replace(/[^0-9]/gi, "")
    console.log("年月日数字",str1.replace(/[^0-9]/gi, ""));
    var no4 = "";
    for (var i = 0; i < randomLen; i++)
    {
      no4 += Math.floor(Math.random() * 10);
    }
    no4 = cymd + "-" + no4;
    console.log("年月日数字+5位数",no4)
    this.setData({
      no4:no4,
      full_time: util.formatTime(new Date())
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