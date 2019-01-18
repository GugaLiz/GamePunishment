
const app = getApp();
var Bmob = require('../../utils/dist/Bmob-1.6.7.min.js');
var query = null;
// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleName:'惩罚',
    title: "暂无内容",
    checkboxItems: [
    ],
    isData: false,
    selectItems: [],

    showAddModal: true,
    newItemName: '',
    defaultVal: '',

    type:'',

    showPswModal: true,
    psw:'',
    defaultPsw:'',

  },

  checkPsw: function (e) {
    this.setData({
      psw: e.detail.value
    })
  },

  delcancel: function () {
    this.setData({
      showPswModal: true,
      defaultPsw: ''
    })
  },

  delconfirm: function () {
    var me = this;
    var items = me.data.checkboxItems;
    var type = me.data.type;
    me.setData({
      showPswModal: true,
    });
    var enterPsw = me.data.psw;
    if (enterPsw == "20190101") {
      
      wx.showLoading({
        title: '正在删除',
      });
      if(type == "del"){
        for (var i = 0, lenI = items.length; i < lenI; i++) {
          var item = items[i];
          if (item.checked) {
            query.destroy(item.objectId).then(res => {
            }).catch(err => {
              console.log(err);
              wx.hideLoading();
            })
          }
        }
      }else if(type == 'delAll'){
        query.limit(items.length)
        query.find().then(todos => {

          todos.destroyAll().then(res => {
            // 成功批量修改
            me.setData({
              checkboxItems: [],
            });
          }).catch(err => {
            console.log(err);
            wx.hideLoading();
          });
        })
      }
      me.onShow();
      wx.hideLoading();
    } else {
      wx.showModal({
        title: '错误：请重新输入正确密钥',
        showCancel: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    var titleName = me.data.titleName;
    if(options.btn){
      if (options.btn) {
        if (options.btn == "画画") {
          query = Bmob.Query("drawlist");
          titleName = '画画';

        } else if (options.btn == "动作") {
          query = Bmob.Query("actionlist");
          titleName = '动作'
        } else if (options.btn == "惩罚") {
          query = Bmob.Query("penaltieslist");
          titleName = '惩罚'
        } else if (options.btn == "addName"){
          query = Bmob.Query("namelist");
          titleName = '名字';
        }
      }
    }
    query.find().then(res => {
      if (res.length > 0) {
        this.setData({
          checkboxItems: res,
          title: "现有内容",
          isData: true,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
          titleName: titleName
        })

      } else {
        this.setData({
          checkboxItems:[],
          title: "暂无内容",
          isData: false,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
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
          title: "现有内容",
          isData: true,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',         
        })

      } else {
        this.setData({
          checkboxItems: [],
          title: "暂无内容",
          isData: false,
          defaultVal: '',
          showAddModal: true,
          newItemName: '',
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
    var titleName = me.data.titleName;
    wx.showModal({
      title: '删除选中',
      content: "是否删除选中？",
      cancelText: "否",
      success: function (res) {
        if (res.confirm) {
          if (titleName == "惩罚"){
            me.setData({
              showPswModal: false,
              type: 'del'
            })

          }else{
            wx.showLoading({
              title: '正在删除',
            });
            var items = me.data.checkboxItems;
            for (var i = 0, lenI = items.length; i < lenI; i++) {
              var item = items[i];
              if (item.checked) {
                query.destroy(item.objectId).then(res => {
                 
                }).catch(err => {
                  console.log(err)
                })
              }
            }
            me.setData({
              checkboxItems: items
            });
            me.onShow();
            wx.hideLoading();

          }
          
          
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
          if(titleName == "惩罚"){
            me.setData({
              showPswModal: false,
              type: 'delAll'
            });

          }else{
            wx.showLoading({
              title: '正在删除',
            });
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


            me.onShow();
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
      showAddModal: true,
    });
    
    var checkboxItems = this.data.checkboxItems;
    //加loading
    wx.showLoading({
      title: '正在添加',
    });

    query.set("content", this.data.newItemName)
    query.save().then(res => {
      me.onShow();
      wx.hideLoading();
    }).catch(err => {
      me.onShow();
      wx.hideLoading();
    })
  },

  setItemName: function (e) {
    this.setData({
      newItemName: e.detail.value
    })
  }
})