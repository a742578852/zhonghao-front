<template>
	<view>
		<!-- <u-calendar v-model="show" :mode="mode" @change="change"></u-calendar> -->
		<view class="cu-form-group">
			<view class="title">文件号:</view>
			<input name="input" v-model="dataList.wjh" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">文件:</view>
			<input name="input" v-model="dataList.wj" disabled=""></input>
		</view>
		<view class="cu-form-group">
			<view class="title">印发日期:</view>
			<input name="input" v-model="dataList.yfrq" disabled="" ></input>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">备注:</view>
			<textarea maxlength="-1"  v-model='dataList.bz' disabled=""></textarea>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view> -->
		<view class="cu-form-group">
			<view class="title">附件列表:</view>
			<picker  @change="bindPickerChanges" :value="fjindex" :range="fj">
				<view class="uni-input">{{fj[fjindex]}}</view>
			</picker>
		</view>
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
				show:false,
				mode:'date',
				wjh:'',
				wj:'',
				yfrq:'',
				bz:'',
				dataList:[],
				docid:''
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			console.log(this.dataList.docid);
			// this.docid = this.dataList.docid
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
			change(e){
				console.log(e.result);
				this.yfrq = e.result
			},
			bindPickerChanges: function(e) {
			            console.log('picker发送选择改变，携带值为1111', e.target.value)
			            this.fjindex = e.target.value
						console.log(this.fjindex);
						var path = commonUrl.url2+this.fjs[this.fjindex].filepath+this.fjs[this.fjindex].attachmentid
						console.log(path);
						//#ifdef APP-PLUS
						// plus.runtime.openURL(path);
						uni.downloadFile({ //通过uniapp的api下载下来
						   　　　　　　url: path,
						         success: function (res) {
						   　　　　　　var filePath = res.tempFilePath;
						       　uni.openDocument({
						       　filePath: filePath,
						       　success: function (FileRes) {
						       　console.log('打开文档成功');
						   　　　　　　}
						       });
						   　　　　}
						   　　});
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
