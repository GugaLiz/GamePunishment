
const app = getApp()
// pages/setting/setting.js
var Bmob = require("../../utils/dist/Bmob-1.6.7.min.js");
var query = Bmob.Query("result");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counts:[]
  },

  clearAll:function(){
    var me = this;
    var d = this.data.counts;
    var l = d.length;
    query.limit(l)
    query.find().then(todos => {

      todos.destroyAll().then(res => {
        // 成功批量修改
       // console.log(res, 'ok')
        me.onLoad();
      }).catch(err => {
        console.log(err)
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    query.statTo("sum", "money");
    query.statTo("groupby", "userName");
    query.find().then(res => {
      me.setData({
        counts:res
      })
     
    });
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
    query.statTo("sum", "money");
    query.statTo("groupby", "userName");
    query.find().then(res => {
      me.setData({
        counts: res
      })

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

  },

  
})