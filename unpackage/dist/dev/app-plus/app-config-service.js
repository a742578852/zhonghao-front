
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/safe/safe","pages/tongji/tongji","pages/personal/personal","pages/fxgk/fxgk","pages/fxgk/addFxgk","pages/fxgk/updateFxgk","pages/zuoye/zuoye","pages/zuoye/donghuo","pages/zuoye/dongtu","pages/zuoye/duanlu","pages/zuoye/mangbanchoudu","pages/zuoye/linshiyongdian","pages/zuoye/denggao","pages/zuoye/dianzhuang","pages/zuoye/shouxiankongjian","pages/zuoye/addDongHuo","pages/zuoye/addDongTu","pages/zuoye/addDuanLu","pages/zuoye/addMangBan","pages/zuoye/addLinshiyongdian","pages/zuoye/addDengGao","pages/zuoye/addDiangZhuang","pages/zuoye/addShouXian","pages/zuoye/updataDongHuo","pages/zuoye/updataDongTu","pages/zuoye/updataDuanLu","pages/zuoye/updataMangBan","pages/zuoye/updataLinshiyongdian","pages/zuoye/updataDengGao","pages/zuoye/updataDianZhuang","pages/zuoye/updataShouXian","pages/yhzg/yhzg","pages/yhzg/addYhzg","pages/yhzg/updataYhzg","pages/swsb/swsb","pages/swsb/addSanwei","pages/swsb/updataSanwei","pages/zuoye/dangrizuoye","pages/yhzg/yhzgz","pages/yhzg/chaoqi","pages/zhongdawxy/ydqt","pages/zhongdawxy/krqt","pages/zhongdawxy/ywjc","pages/zhongdawxy/wdjc","pages/zhongdawxy/yljc","pages/news/news","pages/news/addNews","pages/news/updataNews","pages/caoZuoGuiCheng/caoZuoGuiCheng","pages/caoZuoGuiCheng/addGuiCheng","pages/caoZuoGuiCheng/updataGuiCheng","pages/yljh/yljh","pages/yljh/addJh","pages/yljh/updataJljh","pages/pxzl/pxzl","pages/pxzl/addPxzl","pages/pxzl/updataPxzl","pages/azw/azw","pages/azw/addAzw","pages/azw/updataAzw","pages/fxyp/fxyp","pages/fxyp/banZuYanPan","pages/fxyp/addBanzu","pages/fxyp/updataBanzu","pages/fxyp/cheJianYanPan","pages/fxyp/updataChejian","pages/fxyp/gongSiYanPan","pages/fxyp/updataGongSi","pages/waittask/waitTask","pages/waittask/danger/dangerDetail","pages/waittask/webview","pages/zuobiao/map","pages/fxyp/addCj","pages/fxyp/addGs","pages/news/gonggao","pages/news/updataGg","pages/tongji/tongji","pages/grrw/grrw","pages/grrw/updataGrrw","pages/grrw/allRw","pages/shouqian/shouqian","pages/grrw/fpRw","pages/grrw/updataFpRw","pages/yhzg/yhfj","pages/yhzg/sjyh","pages/yhzg/bgsyh","pages/zuobiao/map1","pages/zuobiao/donghuoMap","pages/zuobiao/dongtuMap","pages/zuobiao/duanluMap","pages/zuobiao/mangbanMap","pages/zuobiao/yongdianMap","pages/zuobiao/diaozhuangMap","pages/zuobiao/shouxianMap","pages/zuobiao/yinhuanMap","pages/rwTj/rwTj"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/sy.png","selectedIconPath":"static/sy.png"},{"pagePath":"pages/safe/safe","text":"安全应用","iconPath":"static/aqyy.png","selectedIconPath":"static/aqyy.png"},{"pagePath":"pages/tongji/tongji","text":"统计","iconPath":"static/tj.png","selectedIconPath":"static/tj.png"},{"pagePath":"pages/personal/personal","text":"个人中心","iconPath":"static/grzx.png","selectedIconPath":"static/grzx.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"中浩化工","compilerVersion":"3.2.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":" 唐山中浩化工有限公司"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"titleNView":{"autoBackButton":false}}},{"path":"/pages/safe/safe","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"安全应用","enablePullDownRefresh":false}},{"path":"/pages/tongji/tongji","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/personal/personal","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false}},{"path":"/pages/fxgk/fxgk","meta":{},"window":{"navigationBarTitleText":"风险管控","enablePullDownRefresh":true,"onReachBottomDistance":50}},{"path":"/pages/fxgk/addFxgk","meta":{},"window":{"navigationBarTitleText":"新增风险管控","enablePullDownRefresh":false}},{"path":"/pages/fxgk/updateFxgk","meta":{},"window":{"navigationBarTitleText":"查看/修改管控信息","enablePullDownRefresh":false}},{"path":"/pages/zuoye/zuoye","meta":{},"window":{"navigationBarTitleText":"作业证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/donghuo","meta":{},"window":{"navigationBarTitleText":"动火作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/dongtu","meta":{},"window":{"navigationBarTitleText":"动土作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/duanlu","meta":{},"window":{"navigationBarTitleText":"断路作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/mangbanchoudu","meta":{},"window":{"navigationBarTitleText":"盲板抽堵作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/linshiyongdian","meta":{},"window":{"navigationBarTitleText":"临时用电作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/denggao","meta":{},"window":{"navigationBarTitleText":"登高作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/dianzhuang","meta":{},"window":{"navigationBarTitleText":"吊装作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/shouxiankongjian","meta":{},"window":{"navigationBarTitleText":"受限空间作业","enablePullDownRefresh":true}},{"path":"/pages/zuoye/addDongHuo","meta":{},"window":{"navigationBarTitleText":"新增动火作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addDongTu","meta":{},"window":{"navigationBarTitleText":"新增动土作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addDuanLu","meta":{},"window":{"navigationBarTitleText":"新增断路作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addMangBan","meta":{},"window":{"navigationBarTitleText":"新增盲板抽堵作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addLinshiyongdian","meta":{},"window":{"navigationBarTitleText":"新增临时用电作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addDengGao","meta":{},"window":{"navigationBarTitleText":"新增登高作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addDiangZhuang","meta":{},"window":{"navigationBarTitleText":"新增吊装作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/addShouXian","meta":{},"window":{"navigationBarTitleText":"新增受限空间作业","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataDongHuo","meta":{},"window":{"navigationBarTitleText":"查看/修改动火证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataDongTu","meta":{},"window":{"navigationBarTitleText":"查看/修改动土证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataDuanLu","meta":{},"window":{"navigationBarTitleText":"查看/修改断路证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataMangBan","meta":{},"window":{"navigationBarTitleText":"查看/修改盲板抽堵证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataLinshiyongdian","meta":{},"window":{"navigationBarTitleText":"查看/修改临时用电证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataDengGao","meta":{},"window":{"navigationBarTitleText":"查看/修改登高证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataDianZhuang","meta":{},"window":{"navigationBarTitleText":"查看/修改吊装证","enablePullDownRefresh":false}},{"path":"/pages/zuoye/updataShouXian","meta":{},"window":{"navigationBarTitleText":"查看/修改受限空间证","enablePullDownRefresh":false}},{"path":"/pages/yhzg/yhzg","meta":{},"window":{"navigationBarTitleText":"政府检查问题","enablePullDownRefresh":true}},{"path":"/pages/yhzg/addYhzg","meta":{},"window":{"navigationBarTitleText":"新增隐患整改","enablePullDownRefresh":false}},{"path":"/pages/yhzg/updataYhzg","meta":{},"window":{"navigationBarTitleText":"查看/修改隐患","enablePullDownRefresh":false}},{"path":"/pages/swsb/swsb","meta":{},"window":{"navigationBarTitleText":"三违上报","enablePullDownRefresh":true}},{"path":"/pages/swsb/addSanwei","meta":{},"window":{"navigationBarTitleText":"新增三违上报","enablePullDownRefresh":false}},{"path":"/pages/swsb/updataSanwei","meta":{},"window":{"navigationBarTitleText":"查看/修改三违上报","enablePullDownRefresh":false}},{"path":"/pages/zuoye/dangrizuoye","meta":{},"window":{"navigationBarTitleText":"当日作业证","enablePullDownRefresh":false}},{"path":"/pages/yhzg/yhzgz","meta":{},"window":{"navigationBarTitleText":"隐患整改中","enablePullDownRefresh":false}},{"path":"/pages/yhzg/chaoqi","meta":{},"window":{"navigationBarTitleText":"超期未整改","enablePullDownRefresh":false}},{"path":"/pages/zhongdawxy/ydqt","meta":{},"window":{"navigationBarTitleText":"有毒气体","enablePullDownRefresh":false}},{"path":"/pages/zhongdawxy/krqt","meta":{},"window":{"navigationBarTitleText":"可燃气体","enablePullDownRefresh":false}},{"path":"/pages/zhongdawxy/ywjc","meta":{},"window":{"navigationBarTitleText":"液位监控","enablePullDownRefresh":false}},{"path":"/pages/zhongdawxy/wdjc","meta":{},"window":{"navigationBarTitleText":"温度监控","enablePullDownRefresh":false}},{"path":"/pages/zhongdawxy/yljc","meta":{},"window":{"navigationBarTitleText":"压力监控","enablePullDownRefresh":false}},{"path":"/pages/news/news","meta":{},"window":{"navigationBarTitleText":"安全新闻","enablePullDownRefresh":false}},{"path":"/pages/news/addNews","meta":{},"window":{"navigationBarTitleText":"新增安全新闻","enablePullDownRefresh":false}},{"path":"/pages/news/updataNews","meta":{},"window":{"navigationBarTitleText":"查看安全新闻","enablePullDownRefresh":false}},{"path":"/pages/caoZuoGuiCheng/caoZuoGuiCheng","meta":{},"window":{"navigationBarTitleText":"操作规程","enablePullDownRefresh":true}},{"path":"/pages/caoZuoGuiCheng/addGuiCheng","meta":{},"window":{"navigationBarTitleText":"新增操作规程","enablePullDownRefresh":false}},{"path":"/pages/caoZuoGuiCheng/updataGuiCheng","meta":{},"window":{"navigationBarTitleText":"查看/修改操作规程","enablePullDownRefresh":false}},{"path":"/pages/yljh/yljh","meta":{},"window":{"navigationBarTitleText":"演练计划","enablePullDownRefresh":true}},{"path":"/pages/yljh/addJh","meta":{},"window":{"navigationBarTitleText":"新增演练计划","enablePullDownRefresh":false}},{"path":"/pages/yljh/updataJljh","meta":{},"window":{"navigationBarTitleText":"查看/修改演练计划","enablePullDownRefresh":false}},{"path":"/pages/pxzl/pxzl","meta":{},"window":{"navigationBarTitleText":"培训资料","enablePullDownRefresh":true}},{"path":"/pages/pxzl/addPxzl","meta":{},"window":{"navigationBarTitleText":"新增培训资料","enablePullDownRefresh":false}},{"path":"/pages/pxzl/updataPxzl","meta":{},"window":{"navigationBarTitleText":"查看培训资料","enablePullDownRefresh":false}},{"path":"/pages/azw/azw","meta":{},"window":{"navigationBarTitleText":"安字文","enablePullDownRefresh":false}},{"path":"/pages/azw/addAzw","meta":{},"window":{"navigationBarTitleText":"新增安字文","enablePullDownRefresh":false}},{"path":"/pages/azw/updataAzw","meta":{},"window":{"navigationBarTitleText":"查看安字文","enablePullDownRefresh":false}},{"path":"/pages/fxyp/fxyp","meta":{},"window":{"navigationBarTitleText":"风险研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/banZuYanPan","meta":{},"window":{"navigationBarTitleText":"班组级风险研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/addBanzu","meta":{},"window":{"navigationBarTitleText":"新增班组研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/updataBanzu","meta":{},"window":{"navigationBarTitleText":"查看/修改班组研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/cheJianYanPan","meta":{},"window":{"navigationBarTitleText":"车间级研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/updataChejian","meta":{},"window":{"navigationBarTitleText":"查看/修改车间研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/gongSiYanPan","meta":{},"window":{"navigationBarTitleText":"公司研判","enablePullDownRefresh":false}},{"path":"/pages/fxyp/updataGongSi","meta":{},"window":{"navigationBarTitleText":"查看/修改公司研判","enablePullDownRefresh":false}},{"path":"/pages/waittask/waitTask","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/waittask/danger/dangerDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/waittask/webview","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/map","meta":{"isNVue":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/fxyp/addCj","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/fxyp/addGs","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/news/gonggao","meta":{},"window":{"navigationBarTitleText":"公告列表","enablePullDownRefresh":false}},{"path":"/pages/news/updataGg","meta":{},"window":{"navigationBarTitleText":"公告详情","enablePullDownRefresh":false}},{"path":"/pages/grrw/grrw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/grrw/updataGrrw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/grrw/allRw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/shouqian/shouqian","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/grrw/fpRw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/grrw/updataFpRw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/yhzg/yhfj","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/yhzg/sjyh","meta":{},"window":{"navigationBarTitleText":"上级公司检查","enablePullDownRefresh":true}},{"path":"/pages/yhzg/bgsyh","meta":{},"window":{"navigationBarTitleText":"本公司检查","enablePullDownRefresh":true}},{"path":"/pages/zuobiao/map1","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/donghuoMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/dongtuMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/duanluMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/mangbanMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/yongdianMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/diaozhuangMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/shouxianMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/zuobiao/yinhuanMap","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/rwTj/rwTj","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
