<template>
    <div>
        <el-container>
            <el-header>
                <div>
                    <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handle">
                        <el-menu-item style="margin-left: 750px;" index="1" route="/index"><i
                                class="el-icon-price-tag"></i>首页
                        </el-menu-item>
                        <el-menu-item index="2" route="/news"><i class="el-icon-chat-line-square"></i>新闻</el-menu-item>
                        <el-menu-item index="3" route="/movie"><i class="el-icon-film"></i>电影</el-menu-item>
                        <el-menu-item index="4" route="/music"><i class="el-icon-headset"></i>音乐</el-menu-item>
                    </el-menu>
                </div>
            </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
        </el-container>


    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                activeIndex: '1',
                students:{},
            }
        },
        //实现跨域
        created() {
            // axios方式实现跨域
            axios.post("/first/query").then(res=>{
                this.students = res.data;
                console.log(res.responseData);
            })
        },
        methods: {
            handle(key){
                this.activeIndex = key;
            }
        }
    }
</script>

<style>
    .app ul {
        list-style: none;
        height: 80px;
        background-color: #409EFF;
    }

    .app ul li {
        display: inline-block;
        width: 200px;
        line-height: 80px;
        text-align: center;
    }

    .app ul li a {
        display: inline-block;
        width: 100%;
        color: #fff;
        text-decoration: none;
    }

    .app ul .active {
        background-color: #909399;
    }
</style>
