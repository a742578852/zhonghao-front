<template>
	<view>
		<view>
			<view style="text-align: center;font-size: 40rpx;margin-top: 25rpx;">隐患整改率统计</view>
			<view>
				<view class="cu-form-group">
					<view class="title"><span style="color:red;"></span>查询日期</view>
					<picker mode="date" start="2019-09" end="2030-09" fields="month" v-model:value="date" @change="bindDateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view class="qiun-charts">
					<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
				</view>

			</view>

			<view style="text-align: center;font-size: 40rpx;margin-top: 25rpx;">隐患所在区域统计</view>
			<view>
				<view class="qiun-charts">
					<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
				</view>
			</view>
			<view style="text-align: center;font-size: 40rpx;margin-top: 25rpx;">隐患类别统计</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
			</view>


		</view>


	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	var canvaRing=null;
	var canvaColumn = null;
	export default {

		data() {
			return {
				date: '2020-12',
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				canvaColumn: {}


			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
				this.getServerData()
			},
			async getHuan() {


				const res = await this.$myRequest({
					url: '/api/stac/getDangerByClass',

					method: 'POST'
				})
				let Ring={series:[]};
				Ring.series=res.data.data
				
				_self.showRing("canvasRing",Ring);

			},
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					// title: {
					// 	name: '70%',
					// 	color: '#7cb5ec',
					// 	fontSize: 25 * _self.pixelRatio,
					// 	offsetY: -20 * _self.pixelRatio,
					// },
					// subtitle: {
					// 	name: '收益率',
					// 	color: '#666666',
					// 	fontSize: 15 * _self.pixelRatio,
					// 	offsetY: 30 * _self.pixelRatio,
					// },
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 40 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			async getServerData() {

				const res = await this.$myRequest({
					url: '/api/stac/getDangerStacByComrate',
					data: {
						year: this.date
					},
					method: 'POST'
				})
				var data = res.data.data
				var ser = [{
						"name": "整改中",
						"data": data.completeingCount
					},
					{
						"name": "按期整改",
						"data": data.completeCount
					}, {
						"name": "超期未整改",
						"data": data.noCompleteCount
					}
				]

				let Pie = {
					series: []
				};
				Pie.series = ser

				_self.showPie("canvasPie", Pie)
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data: {},
				// 	success: function(res) {

				// 		console.log(res.data.data)
				// 		let Pie = {
				// 			series: []
				// 		};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		Pie.series = res.data.data.Pie.series;
				// 		_self.showPie("canvasPie", Pie);
				// 	},
				// 	fail: () => {
				// 		_self.tips = "网络错误，小程序端请检查合法域名";
				// 	},
				// });
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			async getZhu() {
				const res = await this.$myRequest({
					url: '/api/stac/getDangerByArea',

					method: 'POST'
				})
				var data = res.data.data
				let Column = data
				_self.showColumn("canvasColumn", Column);
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					fontSize: 5,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},


		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
			this.getZhu()
			this.getHuan()
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
