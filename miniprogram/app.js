App({

  data:{
    accountInfo: {},
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    var that = this
    that.init()
  },

  init: function(){
    var that = this
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        that.globalData.openid = res.result.openid,
          this.data.accountInfo = db.collection('Account').where({
          _openid: that.globalData.openid
          })
        this.data.accountInfo.get({
          success(res) {
            console.log(res)
            var user_id = res.data[0].user_id
            var user_type = res.data[0].type
            that.globalData.user_type = res.data[0].type
            console.log(user_type)
            if (user_type == 0) {
              db.collection('Students').doc(user_id).get({
                success(res) {
                  console.log(res)
                  that.globalData.idInfo = res.data
                  that.globalData.imagePath = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + that.globalData.idInfo._id + '/my-image.jpg',
                    console.log(that.globalData.idInfo)
                  wx.redirectTo({
                    url: '../studentHome/studentHome'
                  })
                }
              })
            }
            else if (user_type == 1) {
              db.collection('Teachers').doc(user_id).get({
                success(res) {
                  that.globalData.idInfo = res.data
                  that.globalData.imagePath = 'cloud://wechat-bbcf1c.7765-wechat-bbcf1c/' + that.globalData.idInfo._id + '/my-image.jpg',
                    console.log(that.globalData.idInfo)
                  wx.redirectTo({
                    url: '../teacherHome/teacherHome'
                  })
                }
              })
            }
          }
        })
        this.data.accountInfo.count({
          success(res) {
            var checkID = res.total
            if (checkID == 0) {
              wx.redirectTo({
                url: '../firstTime/firstTime'
              })
            }
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  editTabBar2: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },


  globalData: {
    userInfo: null,
    pop: 2,
    num: 0,
    idInfo: {},
    openid: '',
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/studentHome/studentHome",
          "text": "首页",
          "iconPath": "/images/console-entrance.png",
          "selectedIconPath": "/images/console-entrance.png",
          "clas": "menu-item",
          "selectedColor": "#4665f9",
          active: true
        },
        {
          "pagePath": "/pages/studentHome/studentTimetable/studentTimetable",
          "text": "课程",
          "iconPath": "/images/console-entrance.png",
          "selectedIconPath": "/images/console-entrance.png",
          "selectedColor": "#4665f9",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/studentHome/studentClass/studentClass",
          "text": "班级",
          "iconPath": "/images/console-entrance.png",
          "selectedIconPath": "/images/console-entrance.png",
          "selectedColor": "#4665f9",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBar2: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/teacherHome/teacherHome",
          "text": "首页",
          "iconPath": "/images/console-entrance.png",
          "selectedIconPath": "/images/console-entrance.png",
          "clas": "menu-item2",
          "selectedColor": "#4665f9",
          active: true
        },
        {
          "pagePath": "/pages/teacherHome/teacherTimetable/teacherTimetable",
          "text": "课程",
          "iconPath": "/images/console-entrance.png",
          "selectedIconPath": "/images/console-entrance.png",
          "selectedColor": "#4665f9",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/teacherHome/teacherClass/teacherClass",
          "text": "班级",
          "iconPath": "/images/console-entrance.png",
          "selectedIconPath": "/images/console-entrance.png",
          "selectedColor": "#4665f9",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    }
  }
})
