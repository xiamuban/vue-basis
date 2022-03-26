<template>
    <div>
        <div style="width: 100%;">
            <el-row :gutter="0">
                <el-col style="padding: 20px;" :span="8" v-for="(item,index) in news.T1348647853363" :key="index">
                    <el-card :body-style="{ padding: '0px' }" style="width: 580px;height: 260px">
                        <div style="text-align: center;margin-top: 10px">
                            <span style="font-weight: bold;font-size: 18px;">{{item.title}}</span><br/>
                            <span style="font-size: 12px">来源: {{item.source}}</span><br/>
                        </div>
                        <div>
                            <div class="demo-image__placeholder">
                                <div class="image">
                                    <el-image :src="item.imgsrc"></el-image>
                                </div>
                            </div>
                            <el-card style="width: 66%;margin-left: 185px;margin-top: -150px;font-size: 14px;line-height: 22px;">
                                {{item.digest}}
                            </el-card>
                        </div>

                        <div style="padding: 14px;">
                            <div class="bottom clearfix">
                                <time class="time">{{item.lmodify}}</time>
                                <el-button type="text" class="button" @click="show(item.url)" v-show="item.url != ''">
                                    阅读全文
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    // import moment from 'moment';
    export default {
        data() {
            return {
                news: {},
                currentDate: ""
            }
        },
        created() { //组件一加载自动触发的方法
            this.getData()
        },
        methods: {
            //获取数据
            getData() {
                let path = 'https://bird.ioliu.cn/v1?url=http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html';
                axios.get(path).then((res) => {
                    this.news = res.data;
                });
                // var date = new Date();
                // var time = moment(date).format("YYYY-MM-DD HH:mm:ss")
                // this.currentDate = time;
            },
            show(url) {
                window.location.href = url;
            }
        }
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 10px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 160px;
        height: 140px;
        border-radius: 5px;
        padding: 15px 0 0 15px;
        margin-top: 10px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>