// pages/redPackagesDetail/redPackagesDetail.js
var Bmob = require("../../utils/dist/Bmob-1.6.7.min.js");
var query = Bmob.Query("result");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    if(options.userName){
      query.equalTo("userName", "==", options.userName);
      query.find().then(res => {
        //res.map((item) => (item.updatedAt = (item.updatedAt.split(' ')[1])));
        me.setData({
          details: res
        })
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