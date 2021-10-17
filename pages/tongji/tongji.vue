<template>
	<view class="Follows">
		
		<!-- 安全运行天数 -->
		<view style="background-image: url(../../static/bg.png);height: 400rpx;">
			<view style="text-align: center;padding-top:120rpx ;color: #FFFFFF;font-size: 80rpx;">{{day}}</view>
			<view style="text-align: center;margin-top: 5rpx;color: #FFFFFF;font-size: 40rpx;">安全运行天数</view>
		</view>

		<!--隐患统计  -->
		<view style="margin-top: 40rpx;">
			<text style="font-size: 40rpx;font-weight: 500;margin: 20rpx;">隐患统计</text>
			<view style="margin-top: 20rpx;">
				<u-line color="green" border-style="dashed"></u-line>
			</view>
			<view style="text-align: center;margin:20rpx ;font-size: 30rpx;">隐患整改率统计</view>
			<view>
				<view class="cu-form-group">
					<view class="title"><span style="color:red;"></span>查询日期</view>
					<picker mode="date" start="2019-09" end="2030-09" fields="month" v-model:value="date"
						@change="bindDateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view>
					<view class="charts-box">
						<qiun-data-charts type="pie" :chartData="chartData" background="none" />
					</view>
				</view>
			</view>

			<view style="text-align: center;margin:20rpx ;font-size: 30rpx;">部门上报隐患统计</view>
			<view>
				<view class="charts-box">
					<qiun-data-charts type="column" :chartData="chartData1" background="none" />
				</view>
			</view>

			<view style="text-align: center;margin:20rpx ;font-size: 30rpx;">区域隐患统计</view>
			<view>
				<view style="height: 800rpx;">
					<qiun-data-charts type="ring" :chartData="chartData2" background="none" />
				</view>
			</view>

		</view>
		<!-- 重大危险源 -->
		<view style="margin-top: 40rpx;" class="Follow-auto">
			<text style="font-size: 40rpx;font-weight: 500;margin: 20rpx;">重大危险源统计</text>
			<view style="margin-top: 20rpx;">
				<u-line color="green" border-style="dashed"></u-line>
			</view>
			
			<view style="width: 98%;height: 500rpx;display: flex;justify-content: space-around;flex-wrap: wrap;margin-top: 40rpx;margin-left: 1%;">
				<view style="width: 43%;height: 200rpx;background-color: #f33f58;border-radius: 20rpx;box-shadow: 6px 6px 5px #868686;">
					<view style="color: #FFFFFF;text-align: center;padding-top: 50rpx;font-size: 30rpx;">一级重大危险源:2</view>
					<view style="color: #FFFFFF;text-align: center;padding-top: 20rpx;">液氨罐区、原料及产品罐区</view>
				</view>
				<view style="width: 43%;height: 200rpx;background-color: #934ef6;border-radius: 20rpx;box-shadow: 6px 6px 5px #868686;">
					<view style="color: #FFFFFF;text-align: center;padding-top: 50rpx;font-size: 30rpx;">四级重大危险源:3</view>
					<view style="color: #FFFFFF;text-align: center;padding-top: 20rpx;">环己醇装置区、中间品罐区、聚甲醛中间罐区</view>
				</view>
				<view style="width: 43%;height: 200rpx;background-color: #5376ea;border-radius: 20rpx;box-shadow: 6px 6px 5px #868686;">
					<view style="color: #FFFFFF;text-align: center;padding-top: 50rpx;font-size: 30rpx;">重点监管危化品:4</view>
					<view style="color: #FFFFFF;text-align: center;padding-top: 20rpx;">甲醇、纯苯、液氨、氢气</view>
				</view>
				<view style="width: 43%;height: 200rpx;background-color: #ffc331;border-radius: 20rpx;box-shadow: 6px 6px 5px #868686;">
					<view style="color: #FFFFFF;text-align: center;padding-top: 50rpx;font-size: 30rpx;">重点监管工艺:2</view>
					<view style="color: #FFFFFF;text-align: center;padding-top: 20rpx;">氧化装置和加氢装置</view>
				</view>
			</view>
		</view>
		<!-- 八大作业证统计 -->
		<view style="margin-top: 40rpx;">
			<text style="font-size: 40rpx;font-weight: 500;margin: 20rpx;">八大作业证统计:</text>
			<view style="margin-top: 20rpx;">
				<u-line color="green" border-style="dashed"></u-line>
			</view>
			<view>
				<qiun-data-charts type="rose" :chartData="chartData3" background="none" />
				
			</view>
			</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				day: '',
				date: '2020-12',
				chartData: {
					"series": [{
						"data": [{
								"name": "整改中",
								"value": ''
							},
							{
								"name": "按期整改",
								"value": ''
							},
							{
								"name": "超期未整改",
								"value": ''
							},

						]
					}]
				},
				chartData1: {
					"categories": [
					
					],
					"series": [{
							"name": "隐患上报数",
							"data": [
							
							]
						}

					]
				},
				chartData2: {
					"series": [{
						"data": [
						]
					}]
				},
				chartData3:{
					 "series": [
					        {
					            "data": [
					                {
					                    "name": "动火作业证",
					                    "value": 0
					                },
					                {
					                    "name": "动土作业证",
					                    "value": 0
					                },
					                {
					                    "name": "断路作业证",
					                    "value": 0
					                },
					                {
					                    "name": "盲板抽堵作业证",
					                    "value": 0
					                },
					                {
					                    "name": "临时用电作业证",
					                    "value": 0
					                },
									{
									    "name": "高处作业证",
									    "value": 0
									},
									{
									    "name": "吊装作业证",
									    "value": 0
									},
									{
									    "name": "受限空间作业证",
									    "value": 0
									},
					            ]
					        }
					    ]
				}
			}
		},
		methods: {
			//跳转到页面固定位置
			but(){
				uni.createSelectorQuery().select('.Follow-auto').boundingClientRect(data=>{//目标位置的节点：类class或者id
				uni.createSelectorQuery().select(".Follows").boundingClientRect(res=>{//最外层盒子的节点：类class或者id
				uni.pageScrollTo({
				duration: 100,//过渡时间
				scrollTop:data.top+90 - res.top,//到达距离顶部的top值
				//scrollTop:data.top - res.top,//如果置顶
						})
					}).exec()
				}).exec();
			},

			bindDateChange: function(e) {
				this.date = e.target.value
			
				this.getServerData()
			},
			async getServerData(){
				const res = await this.$myRequest({
					method: 'POST',
					url: 'api/other/getYhTj',
					data:{date:this.date}
				})
			
				//整改中
				this.chartData.series[0].data[0].value = res.data.data.zgzCount
				//按期
				this.chartData.series[0].data[1].value = res.data.data.wcCount
				//未整改
				this.chartData.series[0].data[2].value = res.data.data.cqCount
			}
		},
		async onShow() {
			//获取触发锚点参数
			if(uni.getStorageSync('maodian') == 'maodian'){
				this.but()
				uni.removeStorageSync('maodian')
			}
			//获取当前月
			var myDate = new Date();
			var tYear = myDate.getFullYear();
			var tMonth = myDate.getMonth();
			
			var m = tMonth + 1;
			if (m.toString().length == 1) {
			m = "0" + m;
			}
			this.date = tYear +'-'+ m
			const res = await this.$myRequest({
				method: 'POST',
				url: 'api/other/getStac',
			})
			//赋值天数
			this.day = res.data.data.days
			//整改中
			this.chartData.series[0].data[0].value = res.data.data.zgzCount
			//按期
			this.chartData.series[0].data[1].value = res.data.data.wcCount
			//未整改
			this.chartData.series[0].data[2].value = res.data.data.cqCount
			
			//部门上报隐患
			var bm = []
			var num = []
			for(var i = 0;i<res.data.data.bmYhs.length;i++){
				bm.push(res.data.data.bmYhs[i].bmName)
				num.push(res.data.data.bmYhs[i].num)
			}
			this.chartData1.categories = bm
			this.chartData1.series[0].data = num
			//区域隐患
			this.chartData2.series[0].data = res.data.data.areaYhs
			//八大作业证
			
			this.chartData3.series[0].data[0].value = res.data.data.dhCount
			this.chartData3.series[0].data[1].value = res.data.data.dtCount
			this.chartData3.series[0].data[2].value = res.data.data.dlCount
			this.chartData3.series[0].data[3].value = res.data.data.mbCount
			this.chartData3.series[0].data[4].value = res.data.data.lsCount 
			this.chartData3.series[0].data[5].value = res.data.data.gcCount
			this.chartData3.series[0].data[6].value = res.data.data.dzCount
			this.chartData3.series[0].data[7].value = res.data.data.sxCount
		
		}
	}
</script>

<style>

</style>
