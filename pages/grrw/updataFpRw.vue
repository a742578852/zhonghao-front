<template>
	<view>
		<u-popup v-model="bmChoiseShow" mode="center" width="90%" height="75%" border-radius="14">
			<view class="cu-form-group" @click="bmChoise=true" style="margin-bottom: 20rpx;">
				<view class="title">选择巡检人部门:</view>
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
				<text>已选择巡检人</text>
			</view>
			<view class="bms">
				<view class="bmrys" v-for="(item,index) in xzry" >
					<u-tag :text="item" mode="light"  closeable  @close="tagClick(item)" />
				</view>
			</view>
			<!-- <view class="bms">
				<u-tag :text="dataList.xjr" mode="light"  closeable  @close="tagClick()" />
			</view> -->
				<button type="primary" size="mini" style="width: 50%;margin-left: 25%;margin-top: 30rpx;" @click="tianjia">确定</button>
			
			
		</u-popup>
		
		
		<view class="cu-form-group">
			<view class="title">巡检名称:</view>
			<input name="input" v-model="dataList.xcmc" ></input>
		</view>
		<view class="cu-form-group" @click="bmChoiseShow = true">
			<view class="title">巡检人:</view>
			<input name="input" v-model="dataList.xjr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">巡检周期:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayZq" class="item2" style="">
				<view class="uni-input" style="width: 80%;border: solid 1rpx #c7c5c3;text-align: center;border-radius: 10rpx;">{{arrayZq[index]}}</view>
				
			</picker>
			<input type="text" :value="dataList.pccs" style="width: 10%;border: solid 1rpx #c7c5c3;text-align: center;border-radius: 10rpx;"/>&nbsp 次
			
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true" >
			<view class="content" style="background-color: #bbfeff;font-size: 35rpx;">
				<view class="content-item" style="width: 8%;margin-left: -180rpx;">
					<text>序号</text>
				</view>
				<view class="content-item">
					<text>检查内容</text>
				</view>
				
			</view>
			<view class="content" v-for="(item,index) in rwList">
				<view class="content-item" style="width: 18%;">
					<text>{{index+1}}</text>
				</view>
				<view class="content-item">
					<text>{{item.xjnr}}</text>
				</view>
				
			</view>
		</scroll-view>
		<button type="primary" size="mini" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;margin-left: 25%;" @click="zhipai">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				bmChoiseShow:false,
				bumen:'',
				arrayBz:'',
				bmChoise:false,
				bmry:[],
				xzry:[],
				xjridArray:[],
				bmobj:[],
				arrayJcnr:[],
				arrayZq:['天','周','月','季度','年'],
				dataList:{
					docid:'',
					appid:'DF194980E6EC47DBAE2D85B8CAE54660',
					pribeanname:'com.ruoyi.aqgl.yhpczl.models.AqYhpczlGrxjrw',
					appname:'隐患排查治理-日常巡查',
					createtime:'',
					lastmodifiedtime:'',
					authorid:'',
					authorname:'',
					xcmc:'',
					xjr:'',
					xjrid:'',
					pcpl:'',
					pccs:'',
				},
				rwList:[],
				docid:''
			}
		},
		onShow() {
			
			this.getByMid()
			//获取所有部门
			this.arrayBz = uni.getStorageSync('arrayBz')
			this.getRwList()
			var admin = uni.getStorageSync('admin')
			this.dataList.authorid = admin.userId
			this.dataList.userName = admin.userName
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			console.log(option.items);
			this.dataList.xcmc = this.dataList.xcmc
			this.dataList.xjr = this.dataList.xjr
			this.xzry = this.dataList.xjr.split(';')
			this.xjridArray = this.dataList.xjrid.split(';')
			// this.xzry.push(this.dataList.xjr)
			// this.dataList.docid = JSON.parse(option.items).docid
			this.docid = JSON.parse(option.items).docid
			
		},
		methods: {
			
			//指派任务
			async zhipai(){
				this.dataList.xjr = ''
				this.dataList.appid = 'DF194980E6EC47DBAE2D85B8CAE54660'
				for(var j=0;j<this.xzry.length;j++){
					this.dataList.xjr = this.xzry[j]
					this.dataList.xjrid = this.xjridArray[j]
				console.log(this.dataList.xjr);
				//获取当前时间
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let h = date.getHours()
				let m = date.getMinutes()
				let s = date.getSeconds()
				if(month < 10){
					month = '0' + month;
				}
				if(day < 10){
					day = '0' + day;
				}
				if(h < 10){
					h = '0' + h;
				}
				if(m < 10){
					m = '0' + m;
				}
				if(s < 10){
					s = '0' + s;
				}
				var time = year+'-' + month+'-' + day +' '+h+':'+m+':'+s
				this.dataList.createtime = time
				this.dataList.lastmodifiedtime = time
				this.dataList.docid = this.guid2()
				for(var i=0;i<this.bmobj.length;i++){
					if(this.bmobj[i].userName == this.dataList.xjr){
						this.dataList.xjrid = this.bmobj[i].userId
						
					}
				}
				
				var token = uni.getStorageSync('token')
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/insertTask',
					header:{
						'content-type': 'application/json;charset=utf-8',
						'token': token
					},
					data:JSON.stringify(this.dataList)
					
				})
				
				if (res.data.code == 200) {
					uni.navigateTo({
						url:'fpRw'
					})
				}
				for(var i=0;i<this.rwList.length;i++){
					this.rwList[i].docid = this.guid2()
					this.rwList[i].xjjg = 1
					this.rwList[i].pdocid = this.dataList.docid
					var time = year+'-' + month+'-' + day
					this.rwList[i].createtime = time
					const ress = await this.$myRequest({
						method: 'POST',
						url: 'api/danger/insertInspect',
						header:{
							'content-type': 'application/json;charset=utf-8',
							'token': token
						},
						data:JSON.stringify(this.rwList[i])
					})
					 
					
				}
				}
			},
			//生成uuid
			guid2() {
			    function S4() {
			        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			    }
			    return (S4() + S4() +  S4() +  S4() +  S4() +  S4() + S4() + S4());
			},
			//获取任务列表
			async getRwList(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/danger/getInspect',
					data:{
						pdocid:this.docid
					}
				})
				
				if (res.data.code == 200) {
					this.rwList = res.data.data
					// console.log(JSON.stringify(this.bmobj));
					
				}
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
			//删除选择人员
			tagClick(item){
				for(var i=0;i<this.xzry.length;i++){
					if(this.xzry[i] == item){
						this.xzry.splice(i,1)
					}
				}
				// this.dataList.xjr = ''
			},
			//添加人员
			addRy(item){
				this.xzry.push(item)
				// this.dataList.xjr = ''
				// this.dataList.xjr = item
			},
			tianjia(){
				this.dataList.xjr = ''
				console.log(this.xzry);
				this.bmChoiseShow = false
				for(var i=0;i<this.xzry.length;i++){
					this.dataList.xjr += this.xzry[i]+';'
				}
			},
			bmconfirm(e){
				this.bumen = e[e.length-1].label
				this.bmid = e[0].extra
				this.getByMid()
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e)
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.detail.value
				this.dataList.pcpl = this.arrayZq[this.index]
			},
		}
	}
</script>

<style lang="scss">
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
			width: 120%;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			padding-top: 10rpx;
			background-color: #f3feff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.content-item {
				
				display: flex;
				justify-content: space-around;
				align-items: center;
				white-space: pre-wrap;
	
			}
		}
	}
</style>
