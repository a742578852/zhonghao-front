<template>
	<view>
		<u-popup v-model="bmChoiseShow" mode="center" width="90%" height="75%" border-radius="14">
			<view class="cu-form-group" @click="bmChoise=true" style="margin-bottom: 20rpx;">
				<view class="title">选择处理人部门:</view>
				<view class="uni-input" style="border-bottom: solid 1rpx #cfcfcf;width: 300rpx;">{{bumen}}</view>
				<u-select v-model="bmChoise" mode="mutil-column-auto" :list="arrayBz" @confirm="bmconfirm"></u-select>
			</view>
			<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;margin-bottom: 20rpx;">
				<text>部门人员</text>
			</view>
			<view class="bm">
				<view class="bmry" v-for="(item,index) in bmry">
					<text @click="addRy(item)">{{item}}</text>
				</view>
			</view>
			<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
				<text>已选择处理人人员</text>
			</view>
			<view class="bms">
				<u-tag :text="xzry" mode="light"  closeable  @close="tagClick()" />
				<!-- <view class="bmrys" v-for="(item,index) in xzry" >
					<u-tag :text="item" mode="light"  closeable  @close="tagClick(item)" />
				</view> -->
			</view>
				<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 30rpx;" @click="tianjia">确定</button>
			<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 30rpx;" @click="back">退回</button>
			
		</u-popup>
		
		<u-popup v-model="rizhi" mode="center" width="90%" height="75%" border-radius="14">
			<scroll-view class="scroll-view_H" scroll-x="true" >
				<view class="content" style="background-color: #bbfeff;font-size: 35rpx;">
					<view class="content-item" style="width: 20%;">
						<text>序号</text>
					</view>
					<view class="content-item">
						<text>派发时间</text>
					</view>
					<view class="content-item" style="width: 40%;">
						<text>派发人</text>
					</view>
					<view class="content-item">
						<text>上一节点</text>
					</view>
					<view class="content-item">
						<text>任务名称</text>
					</view>
					<view class="content-item">
						<text>下一节点</text>
					</view>
					<view class="content-item">
						<text>处理人</text>
					</view>
				</view>
				<view class="content" v-for="(item,index) in rizhis">
					<view class="content-item" style="width: 20%;">
						<text>{{index+1}}</text>
					</view>
					<view class="content-item">
						<text>{{item.gettime}}</text>
					</view>
					<view class="content-item" style="width: 40%;">
						<text>{{item.preusername}}</text>
					</view>
					<view class="content-item">
						<text>{{item.prenodename}}</text>
					</view>
					<view class="content-item">
						<text>{{item.operatename}}</text>
					</view>
					<view class="content-item">
						<text>{{item.nownodename}}</text>
					</view>
					<view class="content-item">
						<text>{{item.nowusername}}</text>
					</view>
				</view>
			</scroll-view>
			
		</u-popup>
		
		
		<u-calendar v-model="show" :mode="mode" @change="change"  max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show1" :mode="mode" @change="change1" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show2" :mode="mode" @change="change2" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show3" :mode="mode" @change="change3" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show4" :mode="mode" @change="change4" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show5" :mode="mode" @change="change5" max-date="2030-01-01"></u-calendar>
		
		<view class="cu-form-group align-start">
			<view class="title">隐患问题:</view>
			<textarea maxlength="-1"  v-model='dataList.bhgys' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">发起人:</view>
			<input name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">隐患等级:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayYhdj" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.yhdj}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查层级:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arrayjccj" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.jccj}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查类型:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayjclx" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.jclx}}</view>
			</picker>
		</view>
		<view class="cu-form-group" @click="bmshow=true" >
			<view class="title">责任部门:</view>
			<view class="uni-input" style="">{{dataList.zrbmmc}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm" ></u-select>
		</view>
		<view class="cu-form-group" @click="bmshow1=true">
			<view class="title">检查单位:</view>
			<view class="uni-input" style="">{{dataList.jcdwmc}}</view>
			<u-select v-model="bmshow1" mode="mutil-column-auto" :list="arrayBz" @confirm="jcdw"></u-select>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">责任部门:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayzrbm" class="item2" style="">
				<view class="uni-input" style="">{{dataList.zrbmmc}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查单位:</view>
			<picker @change="bindPickerChange4" :value="index4" :range="arrayjcdw" class="item2" style="">
				<view class="uni-input" style="">{{dataList.jcdwmc}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">整改前照片:</view>
			<view>点击上传</view>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChanges" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">附件预览:</view>
			<picker  @change="bindPickerChanges11" :value="fjindex" :range="arrayfjs" disabled="">
				<image :src="arrayfjs[fjindex]" mode=""></image>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查人:</view>
			<input name="input" v-model="dataList.jcry" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查日期:</view>
			<input name="input" v-model="dataList.yhxxjcrq" disabled="" @click="jcrq"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查区域:</view>
			<picker @change="bindPickerChange5" :value="index5" :range="arrayArea1" class="item2" style=""  :disabled="up">
				<view class="uni-input" style="width: 100%;height: 60rpx;">{{dataList.zywzdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查详细区域:</view>
			<picker @change="bindPickerChange6" :value="index6" :range="arrayArea2" class="item2" style="" :disabled="up">
				<view class="uni-input" style="width: 100%;height: 60rpx;">{{dataList.zywzqymc}}</view>
			</picker>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>组织整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改措施:</view>
			<textarea maxlength="-1"  v-model='dataList.yhzgqk' :disabled="up"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>整改期限:</view>
			<input name="input" v-model="dataList.zzzgzgqx" disabled="" @click="zgqx"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="dataList.zzzgtbr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报日期:</view>
			<input name="input" v-model="dataList.zzzgtxrq" disabled="" @click="zzzgtxrqshow" :disabled="up1"></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改情况:</view>
			<textarea maxlength="-1"  v-model='dataList.yzqk' :disabled="up1"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">整改人:</view>
			<input name="input" v-model="dataList.zgr"  :disabled="up1"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改完成日期:</view>
			<input name="input" v-model="dataList.zgwcrq" disabled="" @click="zgwcdrq" :disabled="up1"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">治理资金(元):</view>
			<input name="input" v-model="dataList.zlzj"  :disabled="up1"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.zgrtxrq" disabled="" @click="zgtxrq" :disabled="up1"></input>
		</view>
		<view class="cu-form-group" @click="chooseImage1">
			<view class="title">整改后照片:</view>
			<view>点击上传</view>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChanges1" :value="fjindex1" :range="fj1">
				<view class="uni-input">{{fj1[fjindex1]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">附件预览:</view>
			<picker  @change="bindPickerChanges12" :value="fjindex1" :range="arrayfjs1" disabled="">
				
				<image :src="arrayfjs1[fjindex1]" mode=""></image>
			</picker>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题验证</text>
		</view>
		<view class="cu-form-group">
			<view class="title">原因分析:</view>
			<picker @change="bindPickerChange7" :value="index7" :range="arrayYy" class="item2" style="" :disabled="up2">
				<view class="uni-input" style="width: 300rpx;height: 60rpx;">{{dataList.wtyzyyfx}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">验证人:</view>
			<input name="input" v-model="dataList.yzr"  disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.yzrtxrq" disabled="" @click="yztxrq"></input>
		</view>
		<view class="cu-form-group" @click="chooseImage2">
			<view class="title">验证照片:</view>
			<view>点击上传</view>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChanges2" :value="fjindex2" :range="fj2">
				<view class="uni-input">{{fj2[fjindex2]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">附件预览:</view>
			<picker  @change="bindPickerChanges22" :value="fjindex2" :range="arrayfjs2" disabled="">
				
				<image :src="arrayfjs2[fjindex2]" mode=""></image>
			</picker>
		</view>
		<view class="cu-form-group" @click="shouqian">
			<view class="title">手写签名:</view>
			<input name="input" placeholder="点击进行签名"  disabled=""></input>
		</view>
		<image :src="yhPath" mode=""></image>
		<view class="cu-form-group align-start">
			<view class="title">验证情况:</view>
			<textarea maxlength="-1"  v-model='dataList.wtyzzgqk' :disabled="up2"></textarea>
		</view>
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataYh">确定</button> -->
		<view class="" style="display: flex;justify-content: space-around;margin-top: 30rpx;margin-bottom: 30rpx;">
			<button type="primary" size="mini"  @click="xiugai">修改</button>
			<button type="primary" size="mini"  @click="lzShow" :disabled="lz">流转</button>
			<button type="primary" size="mini"  @click="rizhi = true">日志</button>
			<button type="primary" size="mini"  @click="isNull">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yhPath:'',//隐患手写签名地址
				fj:[],
				fjs:[],
				fjindex:0,
				fj1:[],
				fjs1:[],
				fjindex1:0,
				fj2:[],
				fjs2:[],
				fjindex2:0,
				lz:true,//流转按钮
				lzRole:false,//流转权限
				dqlc:'',//当前节点名称
				dqlcclr:'',//当前流程处理人
				yinhuaId:'',
				rizhi:false,
				rizhis:[],
				bmobj:[],//部门对象
				bmry:[],//部门人员
				xzry:'',//已选择人员
				bmChoiseShow:false,
				bmChoise:false,
				arrayBz:[],
				bumen:'',
				bmid:'',
				up:true,
				up1:true,
				up2:true,
				bmshow:false,
				bmshow1:false,
				mode:'date',
				show:false,
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				show5:false,
				imgUrl:'',
				imgUrl1:'',
				imgUrl2:'',
				username:'',//登录人
				index:0,
				index1:0,
				index2:0,
				index3:0,
				index4:0,
				index5:0,
				index6:0,
				index7:0,
				arrayYhdj:['一般隐患','重大隐患'],
				arrayjccj:['班组级','部门级','公司级'],
				arrayjclx:['日常检查','综合性检查','专业性检查','季节性检查','重大活动及节假日前检查','事故类比检查','上级公司检查','政府执法检查','重大危险源检查'],
				arrayzrbm:['安全部','财务部'],
				arrayjcdw:['安全部','财务部'],
				arrayBz:['安全部','财务部'],
				arrayArea1:[],
				arrayArea2:[],
				arrayfjs:[],
				arrayfjs1:[],
				arrayfjs2:[],
				areas:[],
				did:'',
				arrayYy:['人','物','料','法','环'],
				lcobj:{
					docid:'',
					docuuid:'',
					flowid:'75285ED6ABFB4D6FAEF011C2CACEBD38',
					title:'隐患整改流程',
					prenodeid:'',
					prenodename:'',
					preuserid:'',
					preusername:'',
					operatename:'',
					nownodeid:'',
					nownodename:'',
					nowuserid:'',
					nowusername:'',
					gettime:'',
					sendtime:'',
					lx:1,
					url:'E45FFBBEC8C94B3CA3D453389AFD83C6'
				},
				dataList:{
					docid:'',
					appid:'E45FFBBEC8C94B3CA3D453389AFD83C6',
					authorid:'',
					authorname:'',
					authororgid:'',
					authororgname:'生产部',
					createtime:'',
					lastmodifiedtime:'',
					appname:'整改通知流程',
					pribeanname:'com.ruoyi.aqgl.jcyzg.models.Zgtz',
					bhgys:'',//隐患问题
					yhdj:'一般隐患',//隐患等级
					jccj:'班组级',//检查层级
					jclx:'日常检查',//检查类型
					jcdwmc:'安全部',//检查单位
					zrbmmc:'安全部',//责任部门
					jcry:'',//检查人
					zywzdw:'安全部',//检查区域
					zywzqymc:'安全部',//详细区域
					yhxxjcrq:'',//检查日期
					
					zzzgtbr:'',//整改填报人
					zzzgtxrq:'',//整改填报日期
					zzzgzgqx:'',//整改期限
					yhzgqk:'',//整改措施
					
					zgwcrq:'',//整改完成日期
					zgr:'',//整改人
					zgrtxrq:'',//整改填写日期
					zlzj:'',//治理资金
					yzqk:'',//整改情况
					
					wtyzyyfx:'人',//原因分析
					yzr:'',//验证人
					yzrtxrq:'',//验证填写日期
					wtyzzgqk:'',//验证情况
				}
			}
			
		},
		onLoad(option) {
			console.log(JSON.parse(option.items).docid);
			var str = '+'
			var cTime = JSON.parse(option.items).createtime;
			if(cTime != '' && cTime != null){
				cTime = cTime.replace(' ','+')
			}
			 
			
			this.dataList.createtime = this.transformTimestamp(cTime)
			
			this.dataList = JSON.parse(option.items)
			console.log(this.dataList.wtyzyyfx);
			this.yhPath = 'http://124.70.192.154:7703/img'+this.dataList.autographImg
			
			
			this.yinhuaId = JSON.parse(option.items).docid
			
			this.lcobj.docuuid = JSON.parse(option.items).docid
			console.log(this.lcobj.docuuid);
			
			this.lcobj.docid = this.guid2()
			// this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		async onShow() {
			
			//获取隐患签名地址
			// this.yhPath = uni.getStorageSync('yhPath')
			// console.log(this.yhPath);
			this.getByMid()
			//获取日志
			this.getLog()
			//获取所有区域对象
			this.areas = uni.getStorageSync('areas')
			this.getArea2()
			//从缓存获取所有一级区域
			this.arrayArea1 = uni.getStorageSync('arrayArea')
			
			//获取所有部门
			this.arrayBz = uni.getStorageSync('arrayBz')
			//获取登录人
			this.username = uni.getStorageSync('admin').userName
			
			
			
			this.fj = []
			this.fj1 = []
			this.fj2 = []
			this.fjs = []
			this.fjs1 = []
			this.fjs2 = []
			//获取附件列表
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getFile',
				data:{docid:this.dataList.docid}
			})
			for(var i = 0;i<res.data.data.length;i++){
				
				if(res.data.data[i].attachtype == 'fileinput-yhzp'){
					this.fj.push(res.data.data[i].sfilename)
					this.fjs.push(res.data.data[i])
					this.arrayfjs.push('http://124.70.192.154:7703/img/'+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid)
					
				}
				if(res.data.data[i].attachtype == 'fileinput-zgzp'){
					this.fj1.push(res.data.data[i].sfilename)
					this.fjs1.push(res.data.data[i])
					this.arrayfjs1.push('http://124.70.192.154:7703/img/'+this.fjs1[this.fjindex1].filepath+this.fjs1[this.fjindex1].attachmentid)
				}
				if(res.data.data[i].attachtype == 'fileinput-yzzp'){
					this.fj2.push(res.data.data[i].sfilename)
					this.fjs2.push(res.data.data[i])
					this.arrayfjs2.push('http://124.70.192.154:7703/img/'+this.fjs2[this.fjindex2].filepath+this.fjs2[this.fjindex2].attachmentid)
				}
			}
			// this.fjs = res.data.data
		},
		methods: {
			//时间转换
			transformTimestamp(timestamp){
			    let a = new Date(timestamp).getTime();
			    const date = new Date(a);
			    const Y = date.getFullYear() + '-';
			    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			    const D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
			    const h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
			    const m = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes())+ ':' ;
			    const s = date.getSeconds(); // 秒
			    const dateString = Y + M + D + h + m + s;
			    // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
			    return dateString;
			},
			shouqian(){
				if(this.username == this.dqlcclr){
					uni.navigateTo({
						url:'../shouqian/shouqian?type=1&docid='+this.lcobj.docuuid
					})
				}
				
			},
			//生成uuid
			guid2() {
			    function S4() {
			        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			    }
			    return (S4() + S4() +  S4() +  S4() +  S4() +  S4() + S4() + S4());
			},
			//检查日期
			jcrq(){
				if(!this.up){
					this.show = true
					
				}
				
			},
			//整改期限
			zgqx(){
				if(!this.up){
					this.show1 = true
				}
				
			},
			zzzgtxrqshow(){
				if(!this.up1){
					this.show3 = true
				}
			},
			//整改完成日期
			zgwcdrq(){
				if(!this.up1){
					this.show2 = true
				}
			},
			//整改填写日期
			zgtxrq(){
				if(!this.up1){
					this.show4 = true
				}
			},
			//验证填写日期
			yztxrq(){
				if(!this.up2){
					this.show5 = true
				}
				
			},
			//获取日志信息
			async getLog(){
				const res = await this.$myRequest({
						method: 'POST',
						url: 'api/flow/getFlowNode',
						data:{
							pdocid :this.yinhuaId
						}
					})
					
					if (res.data.code == 200) {
						this.rizhis = res.data.data
						// console.log(JSON.stringify(this.rizhis));
						this.dqlcclr = this.rizhis[this.rizhis.length-1].nowusername
						
						this.dqlc = this.rizhis[this.rizhis.length-1].nownodename
						var roles = uni.getStorageSync('roles')
						for(var i=0;i<roles.length;i++){
							
							if( roles[i].roleId == 10){
								this.lzRole = true
								
							}
						}
						//当前节点处理人是不是当前登录人
						
						if(this.username == this.dqlcclr){
							this.lz = false
							if(this.dqlc == '填报隐患'){
								this.up = false
							}
							if(this.dqlc == '问题整改'){
								this.dataList.zzzgtbr = this.username
								this.up1 = false
							}
							if(this.dqlc == '问题验证'){
								this.dataList.yzr = this.username
								this.up2 = false
							}
						}
					}
				
			},
			//修改按钮
			xiugai(){
				//当前节点处理人是不是当前登录人
				if(this.username == this.dqlcclr){
					if(this.dqlc == '填报隐患'){
						this.up = false
					}
					if(this.dqlc == '问题整改'){
						this.up1 = false
					}
					if(this.dqlc == '问题验证'){
						this.up2 = false
					}
				}
			},
			//删除选择人员
			tagClick(){
				
				this.xzry = ''
			},
			//添加人员
			addRy(item){
				this.xzry = []
				this.xzry = item
			},
			//流程结束不在流转
			lzShow(){
				if(this.rizhis[this.rizhis.length-1].operatename == '办结'){
					
					uni.showToast({
						title: '流程已结束'
					})
				}else{
					this.bmChoiseShow = true
				}
				
			},
			//流转
			tianjia(){
				
				if(this.xzry == ''|| this.xzry == null){
					uni.showToast({
						title: '请选择流转人'
					})
				}else{
					if(this.rizhis[this.rizhis.length-1].operatename == '办结'){
						
						uni.showToast({
							title: '流程已结束'
						})
					}else{
						console.log(this.xzry);
						this.lcobj.nowusername = this.xzry
						this.lcobj.gettime = this.getCurrentTime()
						this.lcobj.sendtime = this.getCurrentTime()
						for(var i=0;i<this.bmobj.length;i++){
							if(this.bmobj[i].userName == this.xzry){
								this.lcobj.nowuserid = this.bmobj[i].userId
							}
						}
						this.addLc()
					}
					
					
				}
				this.bmChoiseShow = false
			},
			//退回上一级
			async back(){
				this.xzry = ''
				if(this.rizhis[this.rizhis.length-1].nownodename == '填报隐患' || this.rizhis[this.rizhis.length-1].nownodename == '结束' || this.rizhis[this.rizhis.length-1].operatename == '送拟稿' || this.rizhis[this.rizhis.length-1].operatename == '办结'){
					uni.showToast({
						title: '当前节点不可退回'
					})
				}else{
					this.lcobj.docid = this.guid2()
					this.lcobj.docuuid = this.rizhis[this.rizhis.length-2].docuuid
					this.lcobj.nowuserid = this.rizhis[this.rizhis.length-2].nowuserid
					this.lcobj.nowusername = this.rizhis[this.rizhis.length-2].nowusername
					this.lcobj.preusername = this.username
					// for(var i=0;i<this.bmobj.length;i++){
					// 	if(this.bmobj[i].userName == this.xzry){
					// 		this.lcobj.preuserid = this.bmobj[i].userId
					// 	}
					// }
					this.lcobj.prenodeid = this.rizhis[this.rizhis.length-2].prenodeid
					this.lcobj.nownodename = this.rizhis[this.rizhis.length-2].nownodename
					this.lcobj.operatename = this.rizhis[this.rizhis.length-2].operatename
					this.lcobj.gettime = this.getCurrentTime()
					this.lcobj.sendtime = this.getCurrentTime()
					// this.addLc()
					var token = uni.getStorageSync('token')
					const res = await this.$myRequest({
						method: 'POST',
						url: 'api/flow/addFlow',
						header:{
							'content-type': 'application/json;charset=utf-8',
							'token': token
						},
						data:JSON.stringify(this.lcobj)
					})
					console.log(res);
					if(res.data.code == 200){
						uni.showToast({
							title:'操作成功'
						})
						uni.navigateBack()
						// uni.navigateTo({
						// 	url:'yhzg'
						// })
					}
				}
			},
			//添加流程
			async addLc(){
				if(this.rizhis[this.rizhis.length-1].nownodename == '填报隐患'){
					this.lcobj.nownodename = '问题整改'
				}
				if(this.rizhis[this.rizhis.length-1].nownodename == '问题整改'){
					this.lcobj.nownodename = '问题验证'
				}
				if(this.rizhis[this.rizhis.length-1].nownodename == '问题验证'){
					this.lcobj.nownodename = '结束'
				}
				
				this.lcobj.prenodeid = this.rizhis[this.rizhis.length-1].nownodeid
				this.lcobj.prenodename = this.rizhis[this.rizhis.length-1].nownodename
				this.lcobj.preuserid = this.rizhis[this.rizhis.length-1].preuserid
				// this.lcobj.nowusername = this.username
				this.lcobj.preusername = this.rizhis[this.rizhis.length-1].nowusername
				this.lcobj.operatename = this.rizhis[this.rizhis.length-1].operatename
				this.lcobj.nownodeid = this.rizhis[this.rizhis.length-1].nownodeid
				if(this.rizhis[this.rizhis.length-1].operatename == '送拟稿'){
					this.lcobj.operatename = '送 问题整改'
				}
				if(this.rizhis[this.rizhis.length-1].operatename == '送 问题整改'){
					this.lcobj.operatename = '送 问题验证'
				}
				if(this.rizhis[this.rizhis.length-1].operatename == '送 问题验证'){
					this.lcobj.operatename = '办结'
				}
				
				
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/flow/addFlow',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data:JSON.stringify(this.lcobj)
				})
				console.log(res);
				if(res.data.code == 200){
					uni.showToast({
						title:'操作成功'
					})
					uni.navigateBack()
					// uni.navigateTo({
					// 	url:'yhzg'
					// })
				}
			},
			//获取当前时间
			getCurrentTime() {
			
			    let date = new Date()
				let year = date.getFullYear();
			    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
			    let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
			    let hours = date.getHours()
			    let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
			    let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
			    date = year+ '-' + M + '-' + D + ' ' + hours + ':' + minutes + ':' + seconds
			    return date
			
			},
			//根据部门ID查询人员
			async getByMid(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getUserByDeptId',
					data:{
						deptId :this.bmid
					}
				})
				
				if (res.data.code == 200) {
					this.bmobj = res.data.data
					// console.log(JSON.stringify(this.bmobj));
					for(var i=0;i<this.bmobj.length;i++){
						this.bmry.push(this.bmobj[i].userName)
						
					}
					
					
				}
			},
			//获取二级区域
			async getArea2(){
				for(var i=0;i<this.areas.length;i++){
					if(this.dataList.zywzdw == this.areas[i].dw){
						this.did = this.areas[i].docid
						break
					}
				}
				const area = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getTwoArea',
					data:{
						docid:this.did
					}
				})
				if(area.data.code==200){
					this.arrayArea2 = []
					for(var i=0;i<area.data.data.length;i++){
						this.arrayArea2.push(area.data.data[i].qymc+'---'+area.data.data[i].zrr)
					}
					// this.dataList.zywzqymc = this.arrayArea2[0]
				}
			},
			//字段不为空
			isNull(){
				if(this.rizhis[this.rizhis.length-1].nownodename == '问题整改'){
					if(this.dataList.zgwcrq !='' && this.dataList.zgr !='' && this.dataList.zgrtxrq !='' && this.dataList.zlzj !='' && this.dataList.yzqk !=''){
						this.updataYh()
					}else{
						uni.showToast({
							title:'请完整填写'
						})
					}
				}else if(this.rizhis[this.rizhis.length-1].nownodename == '问题验证'){
					if(this.dataList.wtyzyyfx !='' && this.dataList.yzr !='' && this.dataList.yzrtxrq !='' && this.dataList.wtyzzgqk !=''){
						this.updataYh()
					}else{
						uni.showToast({
							title:'请完整填写'
						})
					}
				}else{
					this.updataYh()
				}
			},
			//查看隐患
			async updataYh(){
				console.log(this.dataList.wtyzyyfx);
				var token = uni.getStorageSync('token')
				
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/updateDanger',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				
				if(res.data.code == 200){
					// this.dataList.zzzgtbr = 
					uni.showToast({
						title:'保存成功'
					})
				}
				if(this.rizhis[this.rizhis.length-1].nownodename == '问题验证'){
					this.lcobj.nowusername = this.username
					this.lcobj.gettime = this.getCurrentTime()
					this.lcobj.sendtime = this.getCurrentTime()
					for(var i=0;i<this.bmobj.length;i++){
						if(this.bmobj[i].userName == this.xzry){
							this.lcobj.nowuserid = this.bmobj[i].userId
						}
					}
					this.addLc()
				}
			},
			//上传整改前照片
			chooseImage() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://124.70.192.154:7702/api/other/uploadFile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'files',
							formData: {
								'docid': this.dataList.docid,
								'appid': this.dataList.appid,
								'type': 'fileinput-yhzp'
							},
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				})
			},
			//上传整改后照片
			chooseImage1() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://124.70.192.154:7702/api/other/uploadFile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'files',
							formData: {
								'docid': this.dataList.docid,
								'appid': this.dataList.appid,
								'type': 'fileinput-zgzp'
							},
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				})
			},
			bmconfirm(e){
				this.bumen = e[e.length-1].label
				this.bmid = e[0].extra
				this.getByMid()
			},
			//上传验证照片
			chooseImage2() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths[0]);
						uni.uploadFile({
							url: 'http://124.70.192.154:7702/api/other/uploadFile', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'files',
							formData: {
								'docid': this.dataList.docid,
								'appid': this.dataList.appid,
								'type': 'fileinput-yzzp'
							},
							header: {
								'token': uni.getStorageSync("token")
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				})
			},
			change(e){
				console.log(e.result);
				this.dataList.yhxxjcrq = e.result
			},
			change1(e){
				console.log(e.result);
				this.dataList.zzzgzgqx = e.result
			},
			change2(e){
				console.log(e.result);
				this.dataList.zgwcrq = e.result
			},
			change3(e){
				console.log(e.result);
				this.dataList.zzzgtxrq = e.result
			},
			change4(e){
				console.log(e.result);
				this.dataList.zgrtxrq = e.result
			},
			change5(e){
				console.log(e.result);
				this.dataList.yzrtxrq = e.result
			},
			bindPickerChanges: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = 'http://124.70.192.154:7703/img/'+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						//#ifdef APP-PLUS
						plus.runtime.openURL(path);
						//#endif
						//#ifdef H5
						window.open(path);
						//#endif
						
			        },
					bindPickerChanges1: function(e) {
					            console.log('picker发送选择改变，携带值为1111', e.target.value)
					            this.fjindex1 = e.target.value
								console.log(this.fjindex);
								var path = 'http://124.70.192.154:7703/img/'+this.fjs1[this.fjindex1].filepath+this.fjs1[this.fjindex1].attachmentid
								console.log(path);
								//#ifdef APP-PLUS
								plus.runtime.openURL(path);
								//#endif
								//#ifdef H5
								window.open(path);
								//#endif
								
					        },
							bindPickerChanges2: function(e) {
							            console.log('picker发送选择改变，携带值为1111', e.target.value)
							            this.fjindex2 = e.target.value
										console.log(this.fjindex);
										var path = 'http://124.70.192.154:7703/img/'+this.fjs2[this.fjindex2].filepath+this.fjs2[this.fjindex2].attachmentid
										console.log(path);
										//#ifdef APP-PLUS
										plus.runtime.openURL(path);
										//#endif
										//#ifdef H5
										window.open(path);
										//#endif
										
							        },
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.yhdj = this.arrayYhdj[this.index]
			},
			bindPickerChange1(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.detail.value
				this.dataList.jccj = this.arrayjccj[this.index1]
			},
			bindPickerChange2(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.detail.value
				this.dataList.jclx = this.arrayjclx[this.index2]
			},
			bindPickerChanges11(){
				
			},
			bindPickerChanges12(){
				
			},
			bindPickerChanges22(){
				
			},
			confirm(e){
				console.log(JSON.stringify(e));
				this.dataList.zrbmmc = e[e.length-1].label
				console.log(e[e.length-1].label);
				// this.bmid = e[e.length-1].extra
			},
			jcdw(i){
				console.log(JSON.stringify(i));
				this.dataList.jcdwmc = i[i.length-1].label
				console.log(i[i.length-1].label);
				// this.bmid = e[e.length-1].extra
			},
			// bindPickerChange3(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index3 = e.detail.value
			// 	this.dataList.zrbmmc = this.arrayzrbm[this.index3]
			// },
			// bindPickerChange4(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index4 = e.detail.value
			// 	this.dataList.jcdwmc = this.arrayjcdw[this.index4]
			// },
			bindPickerChange5(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index5 = e.detail.value
				this.dataList.zywzdw = this.arrayArea1[this.index5]
				this.getArea2()
			},
			bindPickerChange6(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index6 = e.detail.value
				this.dataList.zywzqymc = this.arrayArea2[this.index6]
			},
			bindPickerChange7(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index7 = e.detail.value
				this.dataList.wtyzyyfx = this.arrayYy[this.index7]
			},
		}
	}
</script>

<style lang="scss">
	.star {
		color: red;
	}
	.bm {
		width: 98%;
		display: flex;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		border-bottom: 2rpx solid #747474;
		.bmry {
			margin-bottom: 20rpx;
			width: 15%;
			height: 30rpx;
			line-height: 30rpx;
		}
	}
	.bms {
		width: 98%;
		display: flex;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		
		.bmrys {
			margin-bottom: 20rpx;
			width: 24%;
			height: 30rpx;
			line-height: 30rpx;
	}
	
	}
	.scroll-view_H {
		// white-space: nowrap;
		.content {
			width: 170%;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			padding-top: 10rpx;
			background-color: #f3feff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.content-item {
				width: 40%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				white-space: pre-wrap;
	
			}
		}
	}
</style>
