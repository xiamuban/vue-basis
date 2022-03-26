<template>
    <div style="text-align: center;">
        <div style="margin-top: 0px;height: 100%">
            <el-carousel indicator-position="outside" :interval="2000" height="820px">
                <el-carousel-item v-for="item in imgSrc" :key="item.url">
                    <div style="width: 100%;height: 100%;">
                        <img style="width: 100%;height:100%;" :src="item.url" />
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                imgSrc: [
                    {url: require('/src/assets/1.jpg')},
                    {url: require('/src/assets/2.jpg')},
                    {url: require('/src/assets/3.jpg')},
                    {url: require('/src/assets/4.jpg')},
                    {url: require('/src/assets/5.jpg')},
                    {url: require('/src/assets/6.jpg')},
                    {url: require('/src/assets/7.jpg')}],
            }
        }
    }
</script>

<style>
    .el-carousel__item div {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        margin: 0;
    }
</style>