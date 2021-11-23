<template>
	<view>
		<!-- <u-calendar v-model="show" :mode="mode" @change="change"></u-calendar> -->
		<view class="cu-form-group">
			<view class="title">标题:</view>
			<input name="input" v-model="dataList.bt" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">所属类别:</view>
			<input name="input" v-model="dataList.sslb" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">上传人:</view>
			<input name="input" v-model="dataList.scr" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">上传时间:</view>
			<input name="input" v-model="dataList.scsj"  disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关键字:</view>
			<input name="input" v-model="dataList.gjz" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">文件类型:</view>
			<picker @change="bindPickerChange" :value="index" :range="arrayLx" class="item2" style="" disabled="">
				<view class="uni-input" style="">{{dataList.wjlx}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">教程简介:</view>
			<input name="input" v-model="dataList.jcjj" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">视频播放:</view>
			<input name="input" v-model="spbf" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChanges" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view> -->
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">确定</button> -->
	</view>
</template>

<script>
	import commonUrl from '../../util/util.js'
	export default {
		data() {
			return {
				fj:[],
				fjs:[],
				fjindex:0,
				index:0,
				show:false,
				mode:'date',
				scsj:'',
				bt:'',
				lb:'',
				scr:'',
				gjz:'',
				jcjj:'',
				spbf:'',
				fj:'',
				arrayLx:['文档','视频','语音','其他'],
				dataList:[]
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		async onShow() {
			this.fj = []
			this.fjs = []
			//获取附件列表
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getFile',
				data:{docid:this.dataList.docid}
			})
			console.log(JSON.stringify(res));
			for(var i = 0;i<res.data.data.length;i++){
				
					this.fj.push(res.data.data[i].sfilename)
					this.fjs.push(res.data.data[i])
					
				
			}
		},
		methods: {
			// change(e){
			// 	console.log(e.result);
			// 	this.scsj = e.result
			// },
			bindPickerChanges: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = commonUrl.url2+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						//#ifdef APP-PLUS
						plus.runtime.openURL(path);
						//#endif
						//#ifdef H5
						window.open(path);
						//#endif
						
			        },
		}
	}
</script>

<style>

</style>
