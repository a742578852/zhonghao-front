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
		
		
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<u-calendar v-model="show1" :mode="mode" @change="change1"></u-calendar>
		<u-calendar v-model="show2" :mode="mode" @change="change2"></u-calendar>
		<u-calendar v-model="show3" :mode="mode" @change="change3"></u-calendar>
		<u-calendar v-model="show4" :mode="mode" @change="change4"></u-calendar>
		<u-calendar v-model="show5" :mode="mode" @change="change5"></u-calendar>
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
			<image :src="imgUrl" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
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
				<view class="uni-input" style="">{{dataList.zywzdw}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">检查详细区域:</view>
			<picker @change="bindPickerChange6" :value="index6" :range="arrayArea2" class="item2" style="" :disabled="up">
				<view class="uni-input" style="">{{dataList.zywzqymc}}</view>
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
			<input name="input" v-model="dataList.zzzgtxrq" disabled="" @click="show3 = true"></input>
		</view>
		<view class="" style="width: 98%;background-color: #ffffd7;display: flex;align-items: center;justify-content: space-around;margin-left: 1%;color: red;border-radius: 10rpx;">
			<text>问题整改</text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">整改情况:</view>
			<textarea maxlength="-1"  v-model='dataList.wtyzzgqk' :disabled="up1"></textarea>
		</view>
		<view class="cu-form-group">
			<view class="title">整改人:</view>
			<input name="input" v-model="dataList.zgr"  :disabled="up1"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">整改完成日期:</view>
			<input name="input" v-model="dataList.zgwcrq" disabled="" @click="zgwcdrq"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">治理资金(元):</view>
			<input name="input" v-model="dataList.zlzj"  :disabled="up1"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">填写日期:</view>
			<input name="input" v-model="dataList.zgrtxrq" disabled="" @click="zgtxrq"></input>
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
			<picker @change="bindPickerChange7" :value="index7" :range="arrayYy" class="item2" style="" :disabled="up2">
				<view class="uni-input" style="">{{dataList.wtyzyyfx}}</view>
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
			<image :src="imgUrl2" style="width: 80upx;height: 80upx;margin-left: 280upx;"></image>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">验证情况:</view>
			<textarea maxlength="-1"  v-model='dataList.yzqk' :disabled="up"></textarea>
		</view>
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="updataYh">确定</button> -->
		<view class="" style="display: flex;justify-content: space-around;margin-top: 30rpx;margin-bottom: 30rpx;">
			<button type="primary" size="mini"  @click="xiugai">修改</button>
			<button type="primary" size="mini"  @click="bmChoiseShow = true" :disabled="lz">流转</button>
			<button type="primary" size="mini"  @click="rizhi = true">日志</button>
			<button type="primary" size="mini"  @click="updataYh">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lz:true,//流转按钮
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
					wtyzzgqk:'',//整改情况
					
					wtyzyyfx:'人',//原因分析
					yzr:'',//验证人
					yzrtxrq:'',//验证填写日期
					yzqk:'',//验证情况
				}
			}
			
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			this.yinhuaId = JSON.parse(option.items).docid
			this.lcobj.docuuid = JSON.parse(option.items).docid
			this.lcobj.docid = this.guid2()
			// this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		async onShow() {
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
			this.dataList.zzzgtbr = this.username
			this.dataList.yzr = this.username
		},
		methods: {
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
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.rizhis = res.data.data
						this.dqlcclr = this.rizhis[this.rizhis.length-1].nowusername
						
						this.dqlc = this.rizhis[this.rizhis.length-1].nownodename
						this.lcobj.nownodename = this.dqlc
						this.lcobj.prenodeid = this.rizhis[this.rizhis.length-1].nownodeid
						this.lcobj.prenodename = this.rizhis[this.rizhis.length-1].nowusername
						this.lcobj.preuserid = this.rizhis[this.rizhis.length-1].preuserid
						this.lcobj.nowusername = this.username
						this.lcobj.operatename = this.rizhis[this.rizhis.length-1].operatename
						this.lcobj.nownodeid = this.rizhis[this.rizhis.length-1].nownodeid
						//当前节点处理人是不是当前登录人
						if(this.username == this.dqlcclr){
							this.lz = false
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
			//流转
			tianjia(){
				if(this.xzry == ''|| this.xzry == null){
					uni.showToast({
						title: '请选择流转人'
					})
				}else{
					this.lcobj.nowusername = this.xzry
					this.lcobj.gettime = this.getCurrentTime()
					this.lcobj.sendtime = this.getCurrentTime()
					this.addLc()
				}
				this.bmChoiseShow = false
				
				
			},
			//添加流程
			async addLc(){
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
					console.log('流程添加成功');
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
			//查看隐患
			async updataYh(){
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
					this.dataList.zzzgtbr = 
					uni.navigateTo({
						url:'./yhzg'
					})
				}
			},
			//上传整改前照片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgUrl = res.tempFilePaths[0]
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
			bmconfirm(e){
				this.bumen = e[e.length-1].label
				this.bmid = e[0].extra
				this.getByMid()
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
