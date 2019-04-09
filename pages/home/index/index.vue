<template>
    <view class="main">
        <view class="warning"><image class="warning-img" mode="aspectFit" :src="wraningIconPath"></image></view>
        <view class="warning-txt"><text>您还未添加任何交易商品，请先添加交易商品！</text></view>
        <view class="warning-btn"><button type="primary" plain="true" size="mini">添加交易商品</button></view>
    </view>
</template>

<script>
    import {getQysettingData} from '@/common/api/demo/classify.js'
export default {
    data() {
        return {};
    },
    methods:{
       async getQysettingDataAction(){
           let res = await getQysettingData()
           console.log('getQysettingDataAction',res)
       }
    },
    mounted() {
    	this.getQysettingDataAction()
    },
    computed: {
        wraningIconPath: function() {
            return this.$CDN('/icon_warning_min.png');
            // return 'http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image/icon_warning_min.png'
        }
    }
};
</script>

<style scoped lang="less">
.warning {
    width: 28upx;
    margin: auto;
    padding-top: 250upx;
    &-img {
        width: 28upx;
        height: 28upx;
    }
    &-txt {
        margin: 30upx 0;
        font-size: 28upx;
        text-align: center;
    }
    &-btn {
        margin-top: 150upx;
        text-align: center;
    }
}
</style>
