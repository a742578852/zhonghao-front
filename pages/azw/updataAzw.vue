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
		<view class="cu-form-group">
			<view class="title">附件:</view>
			<input name="input" v-model="fj" disabled=""></input>
		</view>
		<!-- <button type="primary" style="width: 50%;margin-top: 20rpx;margin-bottom: 20rpx;" @click="">确定</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				mode:'date',
				wjh:'',
				wj:'',
				yfrq:'',
				bz:'',
				fj:'',
				dataList:[]
			}
		},
		onLoad(option) {
			this.dataList = JSON.parse(option.items)
			
			this.dataList.createtime = this.dataList.createtime.substring(0,10)
		},
		methods: {
			change(e){
				console.log(e.result);
				this.yfrq = e.result
			},
		}
	}
</script>

<style>

</style>
