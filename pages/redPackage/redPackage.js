// pages/redPackage/redPackage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"请输入姓名进行抽红包",
    showNameModal:false,
    newUserName:'',
    defaultName:'',
    btnDisabled:false,
    redPackages:[1,3,4,5]

  },

  cancel: function () {
    this.setData({
      showAddModal: true,
      newUserName: '',
      defaultName: ''
    })
  },

  confirm: function () {
    this.setData({
      showAddModal: true,
      newUserName: '',
      defaultName: ''
    });

  },

  setUserName: function (e) {
    this.setData({
      newUserName: e.detail.value
    });
  },

  redPackageStart:function(){
    var name = this.data.newUserName;
    if (name === '') {
      wx.showModal({
        title: '请输入姓名',
        
        showCancel: false,
      })

    } else {
      var counts = this.data.redPackages;
      var index = Math.floor((Math.random() * counts.length));
      var num = counts[index];
      this.setData({
        title: name + ',恭喜领取' + num + '元红包',
        btnDisabled: true
      });
    }
    
    
  },
  clearnAll:function(){
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      title: "请输入姓名进行抽红包",
      newUserName: '',
      defaultName:'',
      btnDisabled: false
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