<template>
    <div>
        <b-container>
            <Header />
            <Banner />
            <!-- <div class="text-center">
                <h2 class="web-title"><font-awesome-icon icon="fa-solid fa-film" style="color: #F6BAB5;"/> {{ SEOTitle }}</h2>
                <h3 class="web-slogan">{{ slogan }}</h3>
            </div>
            <swiper /> -->
        </b-container>
        <div class="full-category-line">
            <nuxt-link to="/" class="cat-btn active">หนังยอดนิยม</nuxt-link>
            <nuxt-link to="/av/category/office-girls" class="cat-btn">ชุดออฟฟิศ</nuxt-link>
            <nuxt-link to="/av/category/reality" class="cat-btn">เรียลลิตี้</nuxt-link>
            <nuxt-link to="/av/category/rough" class="cat-btn">บังคับขัดขืน</nuxt-link>
            <nuxt-link to="/av/category/school-girls" class="cat-btn">ชุดนักเรียน</nuxt-link>
            <nuxt-link to="/av/category/slave" class="cat-btn">ทรมาน</nuxt-link>
        </div>
        <b-container>
            <b-row>
                <b-col cols="12" md="3" lg="2">
                    <div class="d-none d-sm-block">
                        <CategoryList />
                    </div>
                </b-col>
                <b-col cols="12" md="6" lg="8">
                    <Nuxt />
                </b-col>
                <b-col cols="12" md="3" lg="2">
                    <div class="d-none d-sm-block">
                        <MovieListcat />
                    </div>
                </b-col>
            </b-row>
            <div class="footer-text">
                <div class="footer-title">{{ slogan }}</div>
                <div class="footer-content" v-html="descriptionFooter"></div>
            </div>
        </b-container>
        <Footer />
        <div class="footer-ads-container" v-show="showAds" v-if="adsBottom.length > 0">
            <div class="inner-container">
                <a class="ads-image" :href="value.url" target="_blank" v-for="(value, index) in adsBottom" :key="index" @click="updateAdsImageClick(value)">
                    <nuxt-img :src="value.picture" :alt="value.name" />
                </a>
                <div class="close-ads" @click="showAds = false">X</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    head() {
        return {
            // title: this.SEOTitle,
            // meta: [
            //     {
            //         hid: "description",
            //         name: "description",
            //         content: this.SEODescription.replace("{{category}}", "dfdfdfdffdfdf"),
            //     },
            //     {
            //         name: "keywords",
            //         content: ["ดูหนัง", "ดูหนังออนไลน์", "ดูซีรี่ย์"],
            //     },
            //     {
            //         property: "og:title",
            //         name: "og:title",
            //         content: this.SEOTitle,
            //     },
            //     {
            //         property: "og:description",
            //         name: "og:description",
            //         content: this.SEODescription.replace("{{category}}", "dfdfdfdffdfdf") || "mugquwas open graph meta description",
            //     },
            //     {
            //         property: "og:url",
            //         name: "og:url",
            //         content: "https://www.xxxkub",
            //     },
            //     {
            //         property: "og:site_name",
            //         name: "og:site_name",
            //         content: "xxxkub",
            //     },
            //     {
            //         property: "og:image",
            //         name: "og:image",
            //         content: this.logo,
            //     },
            // ],
            // link: [{ rel: "icon", type: "image/x-icon", href: this.icon }],
        };
    },
    data() {
        return {
            menuType: [],
            menuCategory: [],
            menuYear: [],
            showAds: true,
        };
    },
    created() {
        this.getMenuMovies();
    },
    computed: {
        ...mapState({
            descriptionFooter: (state) => state.descriptionFooter,
            logo: (state) => state.logo,
            icon: (state) => state.icon,
            slogan: (state) => state.slogan,
            SEOTitle: (state) => state.SEOTitle,
            SEODescription: (state) => state.SEODescription,
            adsBottom: (state) => state.adsBottom,
        }),
    },
    mounted() {

    },
    methods: {
        async getMenuMovies() {
            const data = await this.$axios.$get("movie/listtypeandcate");
            if (data.code == 200) {
                this.menuType = data.result.Listdata_type;
                this.menuCategory = data.result.Listdata_cate;
            }
        },
    },
};
</script>
