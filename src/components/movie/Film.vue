<template>
    <div style="width: 100%;overflow-x: hidden">
        <div style="text-align: center;margin: 0 auto">
            <router-link style="text-decoration: none;color: #409EFF;" to="/movie">正在热映</router-link>
            <router-link style="text-decoration: none;color: #409EFF;margin-left: 20px" to="/movie/film">即将上映</router-link>
        </div>
        <el-row :gutter="100" style="margin-left: 8%">
            <el-col style="width: 25%;padding: 20px" :span="2" v-for="(item,index) in movies.coming" :key="index">
                <el-card :body-style="{ padding: '0px' }" style="width: 60%;height: 400px">
                    <div>
                        <div style="margin-top: 5px;text-align: center;position: relative;color: #409EFF;line-height: 25px">
                            <span >{{item.nm}}</span><br/>
                            <time class="time">{{item.rt}}</time>
                        </div>

                        <div style="margin: 0 auto;text-align: center;">
                            <div class="image block" >
                                <el-image :src="showImg(item.img)" @click="show(item.id)"></el-image>
                            </div>
                        </div>
                        <div>
                            <div style="padding: 14px;">
                                <div style="text-align: center;font-size: 16px;margin: 0 auto">
                                    <span style="color: #F7BA2A;margin-top: -10px;">{{item.wish}}人想看</span>
                                </div>
                                <br/>
                                <div class="bottom clearfix">
                                    <time class="time" v-if="item.showInfo !== '' && item.showInfo !== null">{{item.showInfo}}</time><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                movies: {},
            }
        },
        created() { //组件一加载自动触发的方法
            this.getData()
        },
        methods: {
            //获取数据
            getData() {
                let path = 'https://bird.ioliu.cn/v1?url=https://m.maoyan.com/ajax/comingList?ci=10&token=&limit=12';
                axios.get(path).then((res) => {
                    this.movies = res.data;
                });
            },
            showImg(url){
                return url.replace("w.h/","");
            },
            show(id) {
                window.location.href = 'https://maoyan.com/films/' + id;
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
        text-align: center;
        margin-top: -20px;
    }

    .button {
        padding: 0;
    }

    .image {
        width: 180px;
        border-radius: 5px;
        vertical-align: middle;
        margin: 0 auto;
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