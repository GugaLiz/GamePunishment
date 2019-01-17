// pages/pubnishment/pubnishment.js
var Bmob = require('../../utils/dist/Bmob-1.6.7.min.js');
var query = null;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    titleName: '',
    showPubnishment:'请按下方按钮就行抽取',
    checkboxItems: [
    ],
    
  },

  punishStart: function () {
    var me = this;
    var titleName = me.data.titleName;
    var checkboxItems = this.data.checkboxItems;
    if(checkboxItems.length > 0){
      var index = Math.floor((Math.random() * checkboxItems.length));
      var item = checkboxItems[index];
      this.setData({
        showPubnishment: item.content
      })
     

    }else{
      wx.showModal({
        title: '请先设置' + titleName,
        showCancel: false,
      })
      
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    var titleName = '';
    if (options.btn){
      if (options.btn == "draw"){
        
        query = Bmob.Query("drawlist");
        titleName = '画画';
      } else if (options.btn == "action"){
         query = Bmob.Query("actionlist");
        titleName = '动作';
       
      } else if (options.btn == "punish") {
        query = Bmob.Query("penaltieslist");
        titleName = '惩罚';
        
    }else{
        me.setData({
          checkboxItems: [],
        })
    }
    
      query.find().then(res => {
        if (res.length > 0) {
          me.setData({
            checkboxItems: res,
            titleName: titleName
          })

        }else{
          me.setData({
            checkboxItems: [],
            titleName: titleName
          })
        }

      });
  
    }

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
    var me = this;
    //const query = Bmob.Query("penaltieslist");
    query.find().then(res => {
      if (res.length > 0) {
        me.setData({
          checkboxItems: res
        })

      }else{
        me.setData({
          checkboxItems: []
        })
      }

    });
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