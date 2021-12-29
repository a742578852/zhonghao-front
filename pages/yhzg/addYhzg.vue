<template>
	<view>
		<u-popup v-model="bmChoiseShow" mode="center" width="90%" height="75%" border-radius="14">
			<view class="cu-form-group" @click="bmChoise=true" style="margin-bottom: 20rpx;">
				<view class="title">选择部门:</view>
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
				<text>已选择人员</text>
			</view>
			<view class="bms">
				<view class="bmrys" v-for="(item,index) in xzry" >
					<u-tag :text="item" mode="light"  closeable  @close="tagClick(item)" />
				</view>
			</view>
				<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 30rpx;" @click="tianjia">确定</button>
			
			
		</u-popup>
		
		<u-calendar v-model="show" :mode="mode" @change="change" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show1" :mode="mode" @change="change1" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show2" :mode="mode" @change="change2" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show3" :mode="mode" @change="change3" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show4" :mode="mode" @change="change4" max-date="2030-01-01"></u-calendar>
		<u-calendar v-model="show5" :mode="mode" @change="change5" max-date="2030-01-01"></u-calendar>
		<view class="cu-form-group align-start">
			<view class="title">隐患问题:</view>
			<textarea maxlength="-1"  v-model='dataList.bhgys'></textarea>
		</view>
		<view class="cu-form-group" @click="getZb">
			<view class="title">获取坐标:</view>
			<input name="input" placeholder="点击获取坐标" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">发起人:</view>
			<input name="input" v-model="dataList.authorname" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">隐患等级:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayYhdj" class="item2" style="">
				<view class="uni-input" style="">{{arrayYhdj[index]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查层级:</view>
			<picker @change="bindPickerChange1" :value="index1" :range="arrayjccj" class="item2" style="">
				<view class="uni-input" style="">{{arrayjccj[index1]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查类型:</view>
			<picker @change="bindPickerChange2" :value="index2" :range="arrayjclx" class="item2" style="">
				<view class="uni-input" style="">{{arrayjclx[index2]}}</view>
			</picker>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">责任部门:</view>
			<picker @change="bindPickerChange3" :value="index3" :range="arrayzrbm" class="item2" style="">
				<view class="uni-input" style="">{{arrayzrbm[index3]}}</view>
			</picker>
		</view> -->
		
		<view class="cu-form-group" @click="bmshow=true">
			<view class="title">责任部门:</view>
			<view class="uni-input" style="">{{dataList.zrbmmc}}</view>
			<u-select v-model="bmshow" mode="mutil-column-auto" :list="arrayBz" @confirm="confirm"></u-select>
		</view>
		<view class="cu-form-group" @click="bmshow1=true">
			<view class="title">检查单位:</view>
			<view class="uni-input" style="">{{dataList.jcdwmc}}</view>
			<u-select v-model="bmshow1" mode="mutil-column-auto" :list="arrayBz" @confirm="jcdw"></u-select>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">检查单位:</view>
			<picker @change="bindPickerChange4" :value="index4" :range="arrayjcdw" class="item2" style="">
				<view class="uni-input" style="">{{arrayjcdw[index4]}}</view>
			</picker>
		</view> -->
		<view class="cu-form-group" @click="chooseImage">
			<view class="title">整改前照片:</view>
			<view>点击上传</view>
		</view>
		<view class="cu-form-group" @click="bmChoiseShow = true">
			<view class="title">检查人:</view>
			<input name="input" v-model="dataList.jcry" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查日期:</view>
			<input name="input" v-model="dataList.yhxxjcrq" disabled="" @click="show = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">检查区域:</view>
			<picker @change="bindPickerChange5" :value="index5" :range="arrayArea1" class="item2" >
				<view class="uni-input" style="width: 100%;height: 60rpx;">{{arrayArea1[index5]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查详细区域:</view>
			<picker @change="bindPickerChange6" :value="index6" :range="arrayArea2" class="item2" style="">
				<view class="uni-input" style="width: 100%;height: 60rpx;">{{arrayArea2[index6]}}</view>
			</picker>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>组织整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改措施:</view>
			<textarea maxlength="-1"  v-model='dataList.yhzgqk'></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title"><span class='star'>*</span>整改期限:</view>
			<input name="input" v-model="dataList.zzzgzgqx" disabled="" @click="show1 = true"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报人:</view>
			<input name="input" v-model="dataList.zzzgtbr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填报日期:</view>
			<input name="input" v-model="dataList.zzzgtxrq" disabled="" ></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改情况:</view>
			<textarea maxlength="-1"  v-model='dataList.yzqk' disabled=""></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">整改人:</view>
			<input name="input" v-model="dataList.zgr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改完成日期:</view>
			<input name="input" v-model="dataList.zgwcrq" disabled="" ></input>
		</view>
		<view class="cu-form-group">
			<view class="title">治理资金(元):</view>
			<input name="input" v-model="dataList.zlzj" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.zgrtxrq" disabled="" ></input>
		</view>
		<view class="cu-form-group" @click="chooseImage1">
			<view class="title">整改后照片:</view>
			<image :src="imgUrl1" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题验证</text>
		</view>
		<view class="cu-form-group">
			<view class="title">原因分析:</view>
			<picker @change="bindPickerChange7" :value="index7" :range="arrayYy" class="item2" style="" disabled="">
				<view class="uni-input" style="">{{arrayYy[index7]}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">验证人:</view>
			<input name="input" v-model="dataList.yzr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.yzrtxrq" disabled="" ></input>
		</view>
		<view class="cu-form-group" @click="chooseImage2">
			<view class="title">验证照片:</view>
			<image :src="imgUrl2" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">验证情况:</view>
			<textarea maxlength="-1"  v-model='dataList.wtyzzgqk' disabled=""></textarea>
		</view>
		<button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="addYh">确定</button>
	</view>
</template>

<script>
	import commonUrl from '../../util/util.js'
	export default {
		data() {
			return {
				grrwRwList:[],
				rw:'',
				ids:'',
				showTag:true,
				bmobj:[],//部门对象
				bmry:[],//部门人员
				xzry:[],//已选择人员
				bmid:'',
				bumen:'',
				bmChoiseShow:false,
				bmChoise:false,
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
				did:'29148AF2448A43118C5A78D101FB3EFB',
				index:0,
				index1:0,
				index2:0,
				index3:0,
				index4:0,
				index5:-1,
				index6:-1,
				index7:-1,
				arrayYhdj:['一般隐患','重大隐患'],
				arrayjccj:['班组级','部门级','公司级'],
				arrayjclx:['日常检查','综合性检查','专业性检查','季节性检查','重大活动及节假日前检查','事故类比检查','上级公司检查','政府执法检查','重大危险源检查'],
				arrayzrbm:['安全部','财务部'],
				arrayjcdw:['安全部','财务部'],
				arrayArea1:[],
				arrayArea2:[],
				arrayBz:[],
				arrayYy:['人','物','料','法','环'],
				bh:'',
				mapList:{
					docid:'',
					appid:'630903BBB975486BBE509F4FFFBC6DB3',
					lat:'',
					lng:'',
					todaytip:'隐患整改: ',
					todaytipurl:'',
					dj:1
				},
				lcobj:{
					docid:'',
					docuuid:'',
					flowid:'75285ED6ABFB4D6FAEF011C2CACEBD38',
					title:'隐患整改流程',
					prenodeid:'系统',
					prenodename:'开始',
					preuserid:'系统ID',
					preusername:'系统',
					operatename:'送拟稿',
					nownodeid:'rect6',
					nownodename:'填报隐患',
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
					authororgname:'',
					createtime:'',
					zgdbh:'',
					bgsjcwt:'',//本公司
					sjgsjcwt:'',//上级公司
					zfjjcwt:'',//政府
					lastmodifiedtime:'',
					appname:'整改通知流程',
					pribeanname:'com.ruoyi.aqgl.jcyzg.models.Zgtz',
					bhgys:'',//隐患问题
					yhdj:'一般隐患',//隐患等级
					jccj:'班组级',//检查层级
					jclx:'日常检查',//检查类型
					jcdwmc:'',//检查单位
					zrbmmc:'',//责任部门
					jcry:'',//检查人
					zywzdw:'',//检查区域
					zywzqymc:'',//详细区域
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
					
					wtyzyyfx:'',//原因分析
					yzr:'',//验证人
					yzrtxrq:'',//验证填写日期
					wtyzzgqk:'',//验证情况
				}
			}
		},
		onBackPress(event) {
			if (event.from === 'navigateBack') {
				return false;
			}
			uni.navigateTo({
				url:'./yhfj'
			})
			return true;
		},
		async onShow() {
			this.getBh()
			this.rw = ''
			this.ids = ''
			//个人任务
			this.rw = uni.getStorageSync('rw')
			
			//隐患级别
			this.ids = uni.getStorageSync('jcjb')
			this.dataList.docid = this.guid2()
			//从缓存获取所有部门
			this.arrayBz = uni.getStorageSync('arrayBz')
			
			//从缓存获取所有一级区域
			this.arrayArea1 = uni.getStorageSync('arrayArea')
			this.getArea2()//获取二级区域
			
			
			let date = new Date()
			let year = date.getFullYear();
			let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
			let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
			var time = year+ '-' + M + '-' + D
			this.dataList.yhxxjcrq = time
			var admin = uni.getStorageSync('admin')
			// console.log(admin);
			this.dataList.jcdwmc = admin.deptName
			this.dataList.authorname = admin.userName
			this.dataList.authorid = admin.userId
			this.dataList.authororgid = admin.deptId
			this.dataList.authororgname = admin.deptName
			
			
			//选择地图后的回显
			if(uni.getStorageSync('index') !='' && uni.getStorageSync('index') !=null){
				this.index = uni.getStorageSync('index')
			}
			uni.removeStorageSync('index')
			if(uni.getStorageSync('index1') !='' && uni.getStorageSync('index1') !=null){
				this.index1 = uni.getStorageSync('index1')
			}
			uni.removeStorageSync('index1')
			if(uni.getStorageSync('bhgys') !='' && uni.getStorageSync('bhgys') !=null){
				this.dataList.bhgys = uni.getStorageSync('bhgys')
			}
			uni.removeStorageSync('bhgys')
			if(uni.getStorageSync('zrbmmc') !='' && uni.getStorageSync('zrbmmc') !=null){
				this.dataList.zrbmmc = uni.getStorageSync('zrbmmc')
			}
			uni.removeStorageSync('zrbmmc')
			if(uni.getStorageSync('yhxxjcrq') !='' && uni.getStorageSync('yhxxjcrq') !=null){
				this.dataList.yhxxjcrq = uni.getStorageSync('yhxxjcrq')
			}
			uni.removeStorageSync('yhxxjcrq')
			if(uni.getStorageSync('index2') !='' && uni.getStorageSync('index2') !=null){
				this.index2 = uni.getStorageSync('index2')
			}
			uni.removeStorageSync('index2')
			if(uni.getStorageSync('jcdwmc') !='' && uni.getStorageSync('jcdwmc') !=null){
				this.dataList.jcdwmc = uni.getStorageSync('jcdwmc')
			}
			uni.removeStorageSync('jcdwmc')
			if(uni.getStorageSync('index5') !='' && uni.getStorageSync('index5') !=null){
				this.index5 = uni.getStorageSync('index5')
			}
			uni.removeStorageSync('index5')
			if(uni.getStorageSync('index6') !='' && uni.getStorageSync('index6') !=null){
				this.index6 = uni.getStorageSync('index6')
			}
			uni.removeStorageSync('index6')
			if(uni.getStorageSync('jcry') !='' && uni.getStorageSync('jcry') !=null){
				this.dataList.jcry = uni.getStorageSync('jcry')
			}
			uni.removeStorageSync('jcry')
			if(uni.getStorageSync('yhzgqk') !='' && uni.getStorageSync('yhzgqk') !=null){
				this.dataList.yhzgqk = uni.getStorageSync('yhzgqk')
			}
			uni.removeStorageSync('yhzgqk')
			if(uni.getStorageSync('zzzgzgqx') !='' && uni.getStorageSync('zzzgzgqx') !=null){
				this.dataList.zzzgzgqx = uni.getStorageSync('zzzgzgqx')
			}
			uni.removeStorageSync('zzzgzgqx')
		},
		onLoad(option) {
			
			
			
				// this.mapList.lng = option.lng
				// this.mapList.lat = option.lat
				if(parseFloat(option.lat) > 39.253756){
					
						this.mapList.lng = (parseFloat(option.lng) - 0.001)
						this.mapList.lat = (parseFloat(option.lat) - 0.0012)
					
				}else{
					if(parseFloat(option.lng) < 119.054741){
						this.mapList.lng = parseFloat(option.lng) + 0.00004
						this.mapList.lat = (parseFloat(option.lat) - 0.0016)
					}else{
						this.mapList.lng = option.lng
						this.mapList.lat = option.lat
					}
				}
				console.log(option.lng);
				console.log(option.lat);
			
			
			
			// if(this.ids == 2){
			// 	this.dataList.zfjcwt = '政府检查问题'
			// 	this.dataList.bgsjcwt = ''
			// 	this.dataList.sjgsjcwt = ''
			// }
			// if(this.ids == 0){
			// 	this.dataList.zfjcwt = ''
			// 	this.dataList.bgsjcwt = '本公司检查问题'
			// 	this.dataList.sjgsjcwt = ''
			// }
			// if(this.ids == 1){
			// 	this.dataList.zfjcwt = ''
			// 	this.dataList.bgsjcwt = ''
			// 	this.dataList.sjgsjcwt = '上级公司检查问题'
			// }
			// console.log(this.ids);
		},
		methods: { 
			//获取坐标
			getZb(){
				uni.setStorageSync('index',this.index)
				uni.setStorageSync('index1',this.index1)
				uni.setStorageSync('index5',this.index5)
				uni.setStorageSync('bhgys',this.dataList.bhgys)
				uni.setStorageSync('zrbmmc',this.dataList.zrbmmc)
				uni.setStorageSync('yhxxjcrq',this.dataList.yhxxjcrq)
				uni.setStorageSync('index2',this.index2)
				uni.setStorageSync('index6',this.index6)
				uni.setStorageSync('jcdwmc',this.dataList.jcdwmc)
				uni.setStorageSync('jcry',this.dataList.jcry)
				uni.setStorageSync('yhzgqk',this.dataList.yhzgqk)
				uni.setStorageSync('zzzgzgqx',this.dataList.zzzgzgqx)
				uni.navigateTo({
					url:'../zuobiao/yinhuanMap'
				})
			},
			//删除选择人员
			tagClick(item){
				// console.log(item);
				for(var i=0;i<this.xzry.length;i++){
					if(this.xzry[i] == item){
						this.xzry.splice(i,1)
					}
				}
			},
			//添加人员
			addRy(item){
				this.xzry.push(item)
				console.log(this.xzry);
			},
			tianjia(){
				this.dataList.jcry = ''
				console.log(this.xzry);
				this.bmChoiseShow = false
				for(var i=0;i<this.xzry.length;i++){
					this.dataList.jcry += this.xzry[i]+';'
				}
			},
			//获取二级区域
			async getArea2(){
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
				console.log(JSON.stringify(res));
				if (res.data.code == 200) {
					this.bmobj = res.data.data
					
					for(var i=0;i<this.bmobj.length;i++){
						this.bmry.push(this.bmobj[i].userName)
					}
					
				}
			},
			//获取隐患编号
			async getBh(){
				
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/getDangerList',
				})
				
				if (res.data.code == 200) {
					// console.log(res.data.data[0].zgdbh);
					// this.bh = res.data.data[0].zgdbh.substring(11)
					//循环查找非空的编号
					for(var i=0;i<res.data.data.length;i++){
						if(res.data.data[i].zgdbh.substring(11)!='NaN' && res.data.data[i].zgdbh.substring(11)!=NaN && res.data.data[i].zgdbh.substring(11)!=null && res.data.data[i].zgdbh.substring(11)!=''){
							this.bh = res.data.data[i].zgdbh.substring(11)
							console.log(this.bh);
							break
						}
					}
					
				}
			},
			//添加隐患
			async addYh(){
				this.getBh()
				if(this.mapList.lat != null && this.mapList.lng != null && this.dataList.bhgys !='' && this.dataList.zrbmmc !='' && this.dataList.jcry !='' && this.dataList.zywzdw !=null && this.dataList.zywzqymc !='' && this.dataList.yhzgqk !='' && this.dataList.zzzgzgqx != ''){
				
				if(this.ids == 2){
					this.mapList.todaytipurl = '/common/list/844B0BA811C8461485E5D37EF770D94B/C79849CF70C1464883C25F610813B19E'
					this.dataList.zfjcwt = '政府检查问题'
					this.dataList.bgsjcwt = ''
					this.dataList.sjgsjcwt = ''
				}
				if(this.ids == 0){
					this.mapList.todaytipurl = '/common/list/4E327BC1FB9A4B97AA8F446D042B462C/E45FFBBEC8C94B3CA3D453389AFD83C6'
					this.dataList.zfjcwt = ''
					this.dataList.bgsjcwt = '本公司检查问题'
					this.dataList.sjgsjcwt = ''
				}
				if(this.ids == 1){
					this.mapList.todaytipurl = '/common/list/6FFB686C1C834FF9A1EE44A119A89C1B/4E214C5D499940598D9A68FB4E42D838'
					this.dataList.zfjcwt = ''
					this.dataList.bgsjcwt = ''
					this.dataList.sjgsjcwt = '上级公司检查问题'
				}
				
				if(this.rw == 1){
					this.mapList.todaytipurl = '/common/list/4E327BC1FB9A4B97AA8F446D042B462C/E45FFBBEC8C94B3CA3D453389AFD83C6'
					this.dataList.zfjcwt = ''
					this.dataList.bgsjcwt = '本公司检查问题'
					this.dataList.sjgsjcwt = ''
				}
				
				let date = new Date()
				let year = date.getFullYear();
				 var bhs = parseInt(this.bh)+1
				 
				if(bhs<1000){
					this.dataList.zgdbh = 'YHZGD-'+year+'-'+'0'+bhs
				}else{
					this.dataList.zgdbh = 'YHZGD-'+year+'-'+bhs
				}
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/insertDanger',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.dataList)
					
				})
				if(res.data.code == 200){
					this.addLc()
					if(this.rw == 1){
						// uni.navigateBack({
						// 	delta:3
						// });
						uni.navigateTo({
							url:'../grrw/updataGrrw'
						})
					}
					if(this.ids == 0){
						uni.navigateTo({
							url:'./bgsyh'
						})
					}
					if(this.ids == 1){
						uni.navigateTo({
							url:'./sjyh'
						})
					}
					if(this.ids == 2){
						uni.navigateTo({
							url:'./yhzg'
						})
					}
					uni.removeStorageSync('rw')
					uni.removeStorageSync('jcjb')
					// uni.navigateTo({
					// 	url:'./yhzg'
					// })
				}
				this.mapList.todaytip += this.dataList.bhgys
				//添加坐标
				this.mapList.docid = this.guid2()
				const ress = await this.$myRequest({
					method: 'POST',
					url: 'api/other/insertMap',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data: JSON.stringify(this.mapList)
					
				})
				}else{
					uni.showToast({
						title:'请完整填写'
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
			//添加流程
			async addLc(){
				var admin = uni.getStorageSync('admin')
				this.lcobj.nowuserid = admin.userId
				this.lcobj.nowusername = admin.userName
				this.lcobj.docid = this.guid2()
				this.lcobj.docuuid = this.dataList.docid
				this.lcobj.gettime = this.getCurrentTime()
				this.lcobj.sendtime = this.getCurrentTime()
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
				if(res.data.code == 200){
					console.log('流程添加成功');
				}
			},
			//上传整改前照片
			chooseImage() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: commonUrl.url1+'/api/other/uploadFile', //仅为示例，非真实的接口地址
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
					count: 1,
					success: res => {
						this.imgUrl1 = res.tempFilePaths[0]
					}
				})
			},
			//上传验证照片
			chooseImage2() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl2 = res.tempFilePaths[0]
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
			// bindPickerChange3(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index3 = e.detail.value
			// 	this.dataList.zrbmmc = this.arrayzrbm[this.index3]
			// },
			confirm(e){
				this.dataList.zrbmmc = e[e.length-1].label
				// this.bmid = e[e.length-1].extra
			},
			jcdw(i){
				console.log(JSON.stringify(i));
				this.dataList.jcdwmc = i[i.length-1].label
				console.log(i[i.length-1].label);
				// this.bmid = e[e.length-1].extra
			},
			bmconfirm(e){
				this.bumen = e[e.length-1].label
				this.bmid = e[0].extra
				this.getByMid()
			},
			// bindPickerChange4(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index4 = e.detail.value
			// 	this.dataList.jcdwmc = this.arrayjcdw[this.index4]
			// },
			bindPickerChange5(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index5 = e.detail.value
				this.dataList.zywzdw = this.arrayArea1[this.index5]
				var areas = uni.getStorageSync('areas')
				for(var i=0;i<areas.length;i++){
					if(this.dataList.zywzdw == areas[i].dw){
						this.did = areas[i].docid
						break
					}
				}
				this.getArea2()
			},
			// jcqy(e){
			// 	console.log(JSON.stringify(e));
			// 	this.dataList.zywzdw = e[e.length-1].label
			// 	// this.bmid = e[e.length-1].extra
			// },
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
</style>
