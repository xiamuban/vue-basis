<template>
    <div style="width: 100%;height: 100%">
        <div class="wrap">
            <div class="play_wrap" id="player" style="height: 600px">
                <div class="search_bar">
                    <img src="https://i.loli.net/2021/08/05/JYi5lvUfj3XFahM.png" alt=""/>
                    <!-- 搜索歌曲 -->
                    <input type="text" placeholder="搜索" autocomplete="off" v-model='query' @click="show"
                           @keyup.enter="searchMusic"/>

                    <el-aside class="box-card" width="360px" v-show="visible">
                        <el-scrollbar class="page-scroll">
                            <div style="padding: 10px 0 0 10px">
                                <label style="font-size: 15px;">热搜榜</label>
                            </div>
                            <div v-for="(item,index) in hotTop.data" :key="index" class="text item hover">
                                <div style="height: 40px;margin: 0 auto;" class="content" @click="queryMusic(item.searchWord)">
                                    <el-row :gutter="20">
                                        <el-col style="width: 10%">
                                            <div style="width: 40px;">
                                                <label :class="{red:index < 3}" style="padding: 0 15px 0px 15px;font-size: 16px">{{index
                                                    + 1}}</label>
                                            </div>
                                        </el-col>

                                        <el-col style="width: 80%">
                                            <div style="width: 100%">
                                                <label>{{item.searchWord}} </label>
                                                <label style="font-size: 12px;color: #E6A23C">{{item.score}}</label>
                                            </div>
                                        </el-col>

                                        <el-col style="width: 100%;">
                                            <div class="">
                                                <div style="text-align: left;margin-left: 36px;font-size: 12px;color: #999999">
                                                    {{item.content}}
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-scrollbar>
                    </el-aside>

                </div>
                <div class="center_con">
                    <!-- 搜索歌曲列表 -->
                    <div class='song_wrapper' ref='song_wrapper'>
                        <ul class="song_list">
                            <li v-for="(item,index) in musicList" :key="index">
                                <!-- 点击放歌 -->
                                <a href="javascript:;" @click='playMusic(item.id,index)'></a>
                                <b>{{item.name}}</b>
                                <span>
                                <i @click="playMv(item.mvid)" v-if="item.mvid!=0"></i>
                                </span>
                            </li>
                        </ul>
                        <img src="https://i.loli.net/2020/03/23/dor23bhZtIvK17X.png" class="switch_btn" alt="">
                    </div>
                    <!-- 歌曲信息区 -->
                    <div class="player_con" :class="{playing:isPlay}">
                        <img src="https://i.loli.net/2020/03/23/gZHko2WlpJNcGPv.png" class="play_bar"/>
                        <!-- 黑胶碟片 -->
                        <img src="https://i.loli.net/2020/03/23/hQPuH4gNRx7XayI.png" class="disc autoRotate"/>
                        <img :src="coverUrl==''?'http://p2.music.126.net/JO7EOi6GF8qeYOhCem4e8g==/109951165835781941.jpg?param=177y177':coverUrl"
                             class="cover autoRotate"/>
                    </div>
                    <!-- 热门评论区 -->
                    <div class="comment_wrapper" ref='comment_wrapper'>
                        <h5 class='title'>热门评论</h5>
                        <div class='comment_list'>
                            <dl v-for="(item,index) in hotComments" :key="index">
                                <dt>
                                    <img :src="item.user.avatarUrl" alt=""/>
                                </dt>
                                <dd class="name">{{item.user.nickname}}</dd>
                                <dd class="detail">
                                    {{item.content}}
                                </dd>
                            </dl>
                        </div>
                        <img src="https://i.loli.net/2020/03/23/dor23bhZtIvK17X.png" class="right_line">
                    </div>
                </div>

                <div class="audio_con">

                    <img style="width: 34px;height: 34px;margin-right: 20px;margin-left: 8px;" :src="imgPre"
                         @click="preSong">
                    <img style="width: 34px;height: 34px;" :src="imgSrc" :title="imgTitle" @click="change">
                    <img style="width: 34px;height: 34px;margin-left: 20px;" :src="imgNext" @click="nextSong">

                    <div style="position: absolute;width: 20px;height: 20px;
                    z-index: 50;margin-left: 162px;
                    margin-top: -30px;background-color:#f1f3f4 ">
                    </div>
                    <audio ref='audio' :src="musicUrl" controls autoplay class="myaudio" @ended="nextSong"></audio>
                </div>
                <!--歌曲MV-->
                <div class="video_con" v-show="showVideo">
                    <video ref='video' :src="mvUrl" controls="controls"></video>
                    <div class="mask" @click="closeMv"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    axios.defaults.baseURL = 'https://bird.ioliu.cn/v1?url=https://autumnfish.cn';

    export default {
        name: "Music",
        data() {
            return {
                visible: false,
                //热搜榜
                hotTop: [],
                // 搜索关键字
                query: 'IU',
                // 歌曲列表
                musicList: [],
                // 歌曲url
                musicUrl: '',
                // 是否正在播放
                isPlay: false,
                // 歌曲热门评论
                hotComments: [],
                // 歌曲封面地址
                coverUrl: '',
                // 显示视频播放
                showVideo: false,
                // mv地址
                mvUrl: '',
                //当前播放音乐的下标
                musicIndex: 0,
                //图片位置
                imgSrc: require('/src/assets/play.png'),
                imgPlay: require('/src/assets/play.png'),
                imgPause: require('/src/assets/pause.png'),
                imgPre: require('/src/assets/pre.png'),
                imgNext: require('/src/assets/next.png'),
                imgTitle: '播放',
            }
        },
        created() {
            this.searchMusic();
        },
        // 方法
        methods: {
            queryMusic(search){
              this.query = search;
              this.visible = false;
              this.searchMusic();
            },
            show() {
                this.visible = !this.visible;
                // let path = 'https://bird.ioliu.cn/v1?url=https://autumnfish.cn';
                // let path = 'https://autumnfish.cn';
                if(this.visible){
                    axios.get('/search/hot/detail').then(response => {
                        // 保存内容
                        this.hotTop = response.data;
                    });
                }
            },
            // 搜索歌曲
            searchMusic() {
                if (this.query == 0) {
                    return
                }
                axios.get('/search?keywords=' + this.query).then(response => {
                    // 保存内容
                    this.musicList = response.data.result.songs;
                });
                this.visible = false;
                // 清空搜索
                // this.query = ''
            },

            // 播放歌曲
            playMusic(musicId, index) {
                // 获取歌曲url
                axios.get('/song/url?id=' + musicId).then(response => {
                    // 保存歌曲url地址
                    this.musicUrl = response.data.data[0].url;
                    this.musicIndex = index;
                    this.isPlay = true;
                    if (this.isPlay) {
                        this.imgSrc = this.imgPause;
                        this.imgTitle = '暂停';
                    }
                });
                // 获取歌曲热门评论
                axios.get('/comment/hot?type=0&id=' + musicId).then(response => {
                    // 保存热门评论
                    this.hotComments = response.data.hotComments

                });
                // 获取歌曲封面
                axios.get('/song/detail?ids=' + musicId).then(response => {
                    // console.log(response)
                    // 设置封面
                    this.coverUrl = response.data.songs[0].al.picUrl
                });
                //播放音量
                this.$refs.audio.volume = 0.2;
            },

            //音乐播放
            play() {
                this.isPlay = true;
                // 清空mv的信息
                this.mvUrl = '';
                if (this.isPlay) {
                    this.imgSrc = this.imgPause;
                    this.imgTitle = '暂停';
                }

            },

            //音乐暂停
            pause() {
                this.isPlay = false;
                if (!this.isPlay) {
                    this.imgSrc = this.imgPlay;
                    this.imgTitle = '播放';
                }
            },

            //播放暂停装换
            change() {
                const audio = this.$refs.audio;
                if (this.isPlay) {
                    audio.pause();
                    this.pause();
                } else {
                    audio.play();
                    this.play();
                }
            },

            // 播放mv
            playMv(vid) {
                if (vid) {
                    this.showVideo = true;
                    // 获取mv信息
                    axios.get('/mv/url?id=' + vid).then(response => {
                        // console.log(response)
                        // 暂停歌曲播放
                        this.$refs.audio.pause();
                        // 获取mv地址
                        this.mvUrl = response.data.data.url
                    });
                    this.pause();
                    this.$refs.video.volume = 0.2;
                }
            },

            // 关闭mv界面
            closeMv() {
                this.showVideo = false;
                this.$refs.video.pause()
            },
            //下一首
            nextSong() {
                this.musicIndex++;
                this.playMusic(this.musicList[this.musicIndex].id, this.musicIndex);
            },
            //上一首
            preSong() {
                let len = this.musicList.length;
                if (this.musicIndex < len && this.musicIndex > 0)
                    this.musicIndex--;
                this.playMusic(this.musicList[this.musicIndex].id, this.musicIndex);
            },
        }
    }
</script>

<!-- 样式 -->
<style src="./main.css" scoped></style>

