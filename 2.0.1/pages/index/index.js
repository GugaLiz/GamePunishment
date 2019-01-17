//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    defaultVal:'',
    psw:'',
    showPswModal:true,
    type:''

    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  checkPsw:function(e){
    this.setData({
      psw: e.detail.value
    })
  },

  cancel: function () {
    this.setData({
      showPswModal: true,
      newItemName: '',
      defaultVal: ''
    })
  },

  confirm: function () {
    var me = this;

    me.setData({
      showPswModal: true,
    });

    var type = me.data.type;
    var enterPsw = me.data.psw;
    if(enterPsw == "20190101"){
      if(type == "item"){
        wx.navigateTo({
          url: '../itemBank/itemBank'
        })
      }else if(type == "package"){
        wx.navigateTo({
          url: '../redPackage/redPackage'
        });
      }else{
        wx.showModal({
          title: '操作错误',
          showCancel: false,
        })
      }
      
    }else{
      wx.showModal({
        title: '错误：请重新输入正确密钥',
        showCancel: false,
      })
    }
  },

  packageEnter:function(){
    var me = this;
    //验证
    me.setData({
      type:'package',
      showPswModal: false,
    });

  },

  pubnishmentEnter:function(){
    wx.navigateTo({
      url: '../pubnishment/pubnishment?btn=punish'
    })

  },

  itemBankEnter: function () {
    var me = this;
    me.setData({
      type:'item',
      showPswModal: false,
    });

    
  }
})
