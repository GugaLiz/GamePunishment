// pages/redPackage/redPackage.js
var Bmob = require("../../utils/dist/Bmob-1.6.7.min.js");
var query = Bmob.Query("packetlist");
const nameQuery = Bmob.Query("namelist");
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
    redPackages:[],
    names:[],
    nameIndex: 0,

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

  bindNameChange:function(e){
    var names = this.data.names;
    this.setData({
      nameIndex: e.detail.value,
      
    });
  },

  redPackageStart:function(){
    var me = this;
    var names = this.data.names;
    var nameIndex = this.data.nameIndex;
    var name = names[nameIndex];
    if (names && names.length > 0 ) {
      if (name === ''){
        wx.showModal({
          title: '请选择姓名',

          showCancel: false,
        })
      }else{
        //查询红包设置
        var counts = this.data.counts;

        if (counts && counts.length > 0) {
          var index = Math.floor((Math.random() * counts.length));
          var money = counts[index];
          //数据插入result表
          var resultTab = Bmob.Query("result");
          resultTab.set("userName", name)
          resultTab.set("money", parseFloat(money))
          resultTab.save().then(res => {
            this.setData({
              title: name + ',恭喜领取' + money + '元红包',
              btnDisabled: true
            });
          }).catch(err => {
            console.info(err);

          })

          //packetlist更新
          var obj = query.equalTo("money", "==", money);
          query.find().then(res => {
            if (res[0]) {
              var num = res[0].num - 1;
              if (num === 0) {
                query.destroy(res[0].objectId).then(res => {
                }).catch(err => {
                  console.log(err)
                })
              } else {
                query.get(res[0].objectId).then(res => {
                  res.set('num', parseInt(num))
                  res.save()
                }).catch(err => {
                  console.log(err)
                })
              }
            } else {
              wx.showModal({
                title: '暂无红包可抽啦，请先设置红包',

                showCancel: false,
              })
            }
          });
        } else {
          wx.showModal({
            title: '暂无红包可抽啦，请先设置红包',

            showCancel: false,
          })
        }

        // query.find().then(res => {       
        //   if (res.length > 0) {
        //     var counts = [];
        //     for (var i = 0; i < res.length; i++) {
        //       var it = res[i];
        //       if (it.money && it.num) {
        //         for(var j =0;j<it.num;j++){
        //           counts.push(it.money);
        //         }

        //       }
        //     }


        //   }else{

        //   }
        // });

        //过2秒恢复抽奖按钮
        setTimeout(function () {
          me.setData({
            btnDisabled: false
          })
        }, 2000);

      }
     

    } else {
     wx.showModal({
       title: '请先添加名字',

       showCancel: false,
     })
      
    }
    
    
  },
  clearnAll:function(){
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var me = this;
    var counts = [];
    var names = [];
    query.find().then(res => {
      if (res.length > 0) {    
        for (var i = 0; i < res.length; i++) {
          var it = res[i];
          if (it.money && it.num) {
            for (var j = 0; j < it.num; j++) {
              counts.push(it.money);
            }

          }
        }
        me.setData({
          title: "请选择姓名进行抽红包",
         // newUserName: '',
          defaultName: '',
          btnDisabled: false,
          counts: counts,
         
        });

      }else{
        me.setData({
          title: "请选择姓名进行抽红包",
          // newUserName: '',
          defaultName: '',
          btnDisabled: false,
          counts: [],

        });
      }
    });

    nameQuery.find().then(res => {
      if (res.length > 0) {

        res.map((item) => { names.push(item.content); });
        me.setData({
          names: names,
          nameIndex: 0,
        });
      }else{
        me.setData({
          names: [],
          nameIndex: 0,
        });
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
    var me = this;
    var counts = [];
    var names = [];
    query.find().then(res => {   
      if (res.length > 0) {    
        for (var i = 0; i < res.length; i++) {
          var it = res[i];
          if (it.money && it.num) {
            for (var j = 0; j < it.num; j++) {
              counts.push(it.money);
            }

          }
        } 
        me.setData({
          title: "请选择姓名进行抽红包",
          counts:counts
        })  ;
      }else{
        me.setData({
          title: "请选择姓名进行抽红包",
          counts:[]
        });
      }
    });


    
    nameQuery.find().then(res => {
      if (res.length > 0) {
        res.map((item) => { names.push(item.content); });
        me.setData({
          names: names,
          nameIndex: 0,
        });
      }else{
        me.setData({
          names: [],
          nameIndex: 0,
        });

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