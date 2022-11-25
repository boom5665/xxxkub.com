<template>
    <div class="player-page">
        <div class="preview-header">{{ _movieObj.full_name }}</div>

        <b-aspect aspect="16:5" class="mb-2">
            <b-container>
                <b-row style="align-items: flex-start">
                    <b-col cols="12" lg="6" xl="4" class="dis-play bg-color nopaddding">
                        <div class="preview-container" style="display: flex; justify-content: center">
                            <div class="preview-poster">
                                <nuxt-img style="max-width: max-content; height: max-content" loading="lazy" format="webp" :src="_movieObj.picture" :alt="_movieObj.full_name" />
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12" lg="6" xl="8">
                        <div class="preview-url">
                            <b-aspect aspect="16:9" class="mb-2">
                                <div class="iframe-container">
                                    <iframe id="playervideo" :src="playerIframeUrl" allowfullscreen="allowfullscreen" style="width: 100%; height: 100%; border: 0px; overflow: hidden"></iframe>
                                    <AdsVideo :_adsArray="adsVideoList" v-model="isShowAds" v-if="adsVideoList.length > 0 && isShowAds" />
                                </div>
                            </b-aspect>
                            <div class="player-top-content">{{ _movieObj.year ? "ปีที่ฉาย : " + _movieObj.year : "" }} คะแนน : {{ _movieObj.ratescore }} / {{ _isAV ? 100 : 10 }}</div>
                            <div class="movie-description">
                                {{ _movieObj.description }}
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-aspect>

        <div class="d-flex align-items-center justify-content-between">
            <div class="sound-container">
                <div class="btn" v-if="_movieObj.player_link_main != '' && currentSound != 'Main'" @click="currentSound = 'Main'">ลิ้งค์หลัก ({{ _movieObj.sound_main }})</div>
                <div class="btn" v-if="_movieObj.player_link_backup1 != '' && currentSound != 'Backup1'" @click="currentSound = 'Backup1'">ลิ้งค์สำรอง 1 ({{ _movieObj.sound_backup1 }})</div>
                <div class="btn" v-if="_movieObj.player_link_backup2 != '' && currentSound != 'Backup2'" @click="currentSound = 'Backup2'">ลิ้งค์สำรอง 2 ({{ _movieObj.sound_backup2 }})</div>
            </div>
            <div class="btn tab-alert" @click="showReportPopup = true">แจ้งหนังเสีย</div>
        </div>
        <div class="custom-card-container mt-3" v-if="_type == 'series'">
            <div class="custom-card-header">ตอนอื่นๆ</div>
            <div class="custom-card-content">
                <div class="ep-list">
                    <nuxt-link :to="getEpLink(index + 1)" class="ep-row" :class="{ active: index + 1 == _ep }" v-for="(value, index) in epArray" :key="index" v-show="index + 1 != epArray.length">
                        EP {{ index + 1 }}
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="popup-container" id="request-popup" v-show="showReportPopup" @click.self="showReportPopup = false">
            <div class="popup-content">
                <div class="text-right"><b-icon-x-circle-fill class="popup-close-btn" @click="showReportPopup = false" /></div>
                <div class="tab-btn-list">
                    <div class="tab-btn active">แจ้งหนังเสีย</div>
                </div>
                <div class="tab-content-list">
                    <div class="tab-content">
                        <textarea id="request-detail" :maxlength="maxtext" class="popup-input" v-model="reportDetail" @keyup="isLetter"></textarea>
                        <div class="text-center">
                            <div class="submit-btn" @click="reportMovie()">ส่ง</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dis-between">
            <h2 class="list-title">หนังแนะนำ</h2>
        </div>
        <div class="">
            <swipercate />
        </div>
        <div class="">
            <swipercate />
        </div>
        <div class="">
            <swipercate />
        </div>
        <div class="loader-container fixed" v-show="showLoader">
            <nuxt-img format="webp" src="/loader.png" alt="loader" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        _id: {
            type: Number,
            required: true,
            default: 0,
        },
        _slug: {
            type: String,
            required: true,
            default: "",
        },
        _ep: {
            type: String,
            required: false,
            default: "",
        },
        _type: {
            type: String,
            required: false,
            default: "movie",
        },
        _movieObj: {
            type: Object,
            required: true,
        },
        _isAV: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            currentSound: "Main",
            playerIframeUrl: "",
            serieLinkMain: "",
            epArray: [],
            relateList: [],
            showReportPopup: false,
            reportDetail: "",
            adsVideoList: [],
            isShowAds: true,
            showLoader: false,
            maxtext: 50,
        };
    },
    computed: {
        previewUrl: function () {
            if (this._movieObj.preview) return "https://www.youtube.com/embed/" + this._movieObj.preview + "?controls=0&rel=0";
            return "";
        },
        catIdArray() {
            let cat = [];
            for (const key in this._movieObj.Category) {
                if (Object.hasOwnProperty.call(this._movieObj.Category, key)) {
                    const element = this._movieObj.Category[key];
                    cat.push(element.id);
                }
            }
            return cat;
        },
    },
    created() {
        this.setPlayerUrl();
        this.getAdsVideo();
        this.getRelateMovies();
    },
    mounted() {},
    watch: {
        currentSound() {
            const self = this;
            this.playerIframeUrl = "";
            setTimeout(() => {
                self.setPlayerUrl();
            }, 100);
        },
        reportDetail(val) {
            var tn = /w+[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            var tw = /^\s+|\s+$/gm;
            var tb = /^[\{\}:-=_|?&;$%@"<>()#^!\*+,]/;
            if (tn.test(val) == true || tw.test(val) == true || tb.test(val) == true) {
                this.reportDetail = "";
            }
        },
    },
    methods: {
        setPlayerUrl() {
            if (this._type == "series") {
                if (this.currentSound == "Main") this.epArray = this._movieObj.player_series_link_main.split("!!end!!");
                if (this.currentSound == "Backup1") this.epArray = this._movieObj.player_series_link_backup1.split("!!end!!");
                for (let index = 0; index < this.epArray.length; index++) {
                    const element = this.epArray[index];
                    if (index + 1 == this._ep) this.playerIframeUrl = "https://movie.aegistrex.com/api/player/" + element.split("}}")[1];
                }
            } else {
                if (this._isAV) {
                    this.playerIframeUrl = "https://movie.aegistrex.com/av/api/player/" + this._movieObj.player_link_main;
                } else {
                    if (this.currentSound == "Main") this.playerIframeUrl = "https://movie.aegistrex.com/api/player/" + this._movieObj.player_link_main;
                    if (this.currentSound == "Backup1") this.playerIframeUrl = "https://movie.aegistrex.com/api/player/" + this._movieObj.player_link_backup1;
                    if (this.currentSound == "Backup2") this.playerIframeUrl = "https://movie.aegistrex.com/api/player/" + this._movieObj.player_link_backup2;
                }
            }
        },
        getRelateMovies() {
            const self = this;
            this.$axios
                .$post("movie/listmoviesimilar", {
                    category: self.catIdArray,
                    perpage: 4,
                    page: 1,
                })
                .then(function (response) {
                    if (response.code == 200) {
                        self.relateList = response.result;
                    }
                });
        },
        getEpLink(ep) {
            return "/" + this._type + "/" + this._id + "/" + this._slug + "/" + ep;
        },
        reportMovie() {
            const detail = this.reportDetail;
            if (detail.trim() == "") {
                alert("กรุณากรอกข้อมูลให้ครบ");
                return;
            }
            const self = this;
            this.showLoader = true;
            let type_id = 0;
            if (this._isAV) type_id = 1;
            this.$axios
                .$post("requestbroken", {
                    productname: process.env.PRODUCTNAME,
                    movie_id: self._id,
                    movie_type: type_id,
                    reason: detail,
                })
                .then(function (response) {
                    self.showReportPopup = false;
                    self.showLoader = false;
                    self.reportDetail = "";
                    if (response.code == 200) {
                        alert("สำเร็จ");
                    }
                });
        },
        getAdsVideo() {
            const self = this;
            this.$axios.$get("list/ads-video").then(function (response) {
                if (response.code == 200) {
                    self.adsVideoList = response.result ? response.result : [];
                }
            });
        },
    },
};
</script>
