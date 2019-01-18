
const app = getApp();
// pages/setting/setting.js
var Bmob = require('../../utils/dist/Bmob-1.6.7.min.js');
const query = Bmob.Query("packetlist");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "暂无红包设置",
    checkboxItems: [

    ],
    isData: false,
    selectItems: [],

    showAddModal: true,
    newItemName: 0.00,
    newItemNum:0,
    defaultVal:'',
    
    isLoading:true,

    icon2: '../../images/haobao.png',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    query.find().then(res => {
      if (res.length > 0) {
        this.setData({
          checkboxItems: res,
          title: "现有红包设置",
          isData: true,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
          isLoading:true
        })

      } else {
        this.setData({
          checkboxItems: [],
          title: "暂无红包设置",
          isData: false,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
          isLoading: true
        })
      }

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
    query.find().then(res => {
      if (res.length > 0) {
        this.setData({
          checkboxItems: res,
          title: "现有红包设置",
          isData: true,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
          isLoading: true
        })

      } else {
        this.setData({
          checkboxItems: [],
          title: "暂无红包设置",
          isData: false,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
          isLoading: true
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
          wx.showLoading({
            title: '正在删除',
          });
          var items = me.data.checkboxItems;
          for (var i = 0, lenI = items.length; i < lenI; i++) {
            var item = items[i];
            if (item.checked) {
              query.destroy(item.objectId).then(res => {
                me.onLoad();
              }).catch(err => {
                console.log(err)
              })
            }
          }
          me.setData({
            checkboxItems: items
          });
          me.onLoad();
          wx.hideLoading();
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
          if (res.confirm) {  
            wx.showLoading({
              title: '正在删除',
            })   ;      
            // 单词最多删除50条
            query.limit(checkboxItems.length)
            query.find().then(todos => {

              todos.destroyAll().then(res => {
                // 成功批量修改
                me.setData({
                  checkboxItems: [],
                });
              }).catch(err => {
                console.log(err)
              });
            })


            me.onLoad();
            wx.hideLoading();
          }
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
    var me = this;
    me.setData({
      showAddModal:true
    })

    if (this.data.newItemName === 0 || this.data.newItemNum === 0) {
      wx.showModal({
        title: '不能输入空值',
        showCancel: false,
      })
    } else {
      var checkboxItems = this.data.checkboxItems;
      wx.showLoading({
        title: '正在添加',
      });
      //查找是否红包金额已存在
      var hsId = null;
      query.equalTo("money", "==", parseFloat(this.data.newItemName));
      query.find().then(res => {
        if(res[0]){
          var num = parseInt(res[0].num) + parseInt( me.data.newItemNum);
          query.get(res[0].objectId).then(res => {
            res.set('num', parseInt(num))
            res.save();
           // me.onLoad();
            me.onShow();
            wx.hideLoading();
          }).catch(err => {
            console.log(err);
            wx.hideLoading();

          })
        }else{
          query.set("money", parseFloat(me.data.newItemName))
          query.set("num", parseInt(me.data.newItemNum))
          query.set("value", checkboxItems.length + 1)
          query.save().then(res => {
            me.onShow();
            wx.hideLoading();
          }).catch(err => {
            console.info(err);
           // me.onLoad();
            me.onShow();
            wx.hideLoading();
          })

        }
      });
      
    }
   

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