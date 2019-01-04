
const app = getApp()
// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "暂无惩罚内容",
    items: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    checkboxItems: [
      { count:2.5, num:1, value: '0' },
      { count: 0.1, num:2, value: '1' }
    ],
    isData: false,
    selectItems: [],

    showAddModal: true,
    newItemName: 0.00,
    newItemNum:0,
    defaultVal:'',

    icon2: '../../images/haobao.png',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.checkboxItems.length > 0) {
      this.setData({
        title: "现有红包设置",
        isData: true
      })
    } else {
      this.setData({
        title: "暂无红包设置",
        isData: false
      })
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

  },

  checkboxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  delete: function () {
    var me = this;
    wx.showModal({
      title: '删除选中',
      content: "是否删除选中？",
      cancelText: "否",
      success: function (res) {
        if (res.confirm) {
          var items = me.data.checkboxItems;
          for (var i = 0, lenI = items.length; i < lenI; i++) {
            var item = items[i];
            if (item.checked) {
              items.splice(i, 1);
            }
          }
          me.setData({
            checkboxItems: items
          });
          me.onLoad();
        }
      }
    })
  },

  deleteAll: function () {
    var me = this;
    var checkboxItems = this.data.checkboxItems;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = true;
    }

    this.setData({
      checkboxItems: checkboxItems
    });
    wx.showModal({
      title: '删除全部',
      content: "是否全部删除？",
      cancelText: "否",
      success: function (res) {
        if (res.confirm) {
          me.setData({
            checkboxItems: [],
          });
          me.onLoad();
        }
      }
    })
  },

  addItem: function () {
    var me = this;
    this.setData({
      showAddModal: !me.data.showAddModal
    })
  },

  cancel: function () {
    this.setData({
      showAddModal: true,
      newItemName: '',
      defaultVal: ''
    })
  },

  confirm: function () {
    var checkboxItems = this.data.checkboxItems;
    checkboxItems.push({ count: this.data.newItemName, num: this.data.newItemNum, value: checkboxItems + 1 });
    this.setData({
      showAddModal: true,
      checkboxItems: checkboxItems,
      newItemName: '',
      defaultVal: '',
      title: "现有红包设置",
      isData: true
    });

  },

  setItemCount: function (e) {
    this.setData({
      newItemName: e.detail.value
    })
  },

  setItemNum:function(e){
    this.setData({
      newItemNum: e.detail.value
    })
  }
})