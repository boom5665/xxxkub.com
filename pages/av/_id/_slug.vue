<template>
    <client-only>
        <Player _type="av" :_id="_id" :_slug="_slug" :_movieObj="movieObj" :_isAV="true" />
    </client-only>
</template>

<script>
import { mapState } from "vuex";
export default {
    layout: "playAV",
    name: "avSlug",
    async asyncData({ params, $axios }) {
        const res = await $axios.$post("av/detailmovie", {
            movie_id: parseInt(params.id),
        });
        const movieObj = res.result[0];
        return { movieObj };
    },
    head() {
        return {
            titleTemplate: (titleChunk) => {
                return titleChunk ? this.movieObj.full_name + ` | ${titleChunk}  ` : this.movieObj.full_name;
            },
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content:  this.movieObj.description,
                },
                {
                    name: "keywords",
                    content: ["ดูหนัง", "ดูหนังออนไลน์", "ดูซีรี่ย์"],
                },
                {
                    property: "og:title",
                    name: "og:title",
                    content: this.SEOTitle,
                },
                {
                    property: "og:description",
                    name: "og:description",
                    content: this.movieObj.description || "mugquwas open graph meta description",
                },
                {
                    property: "og:url",
                    name: "og:url",
                    content: "https://www.xxxkub",
                },
                {
                    property: "og:site_name",
                    name: "og:site_name",
                    content: "xxxkub",
                },
                {
                    property: "og:image",
                    name: "og:image",
                    content: this.logo,
                },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: this.icon }],
        };
    },
    computed: {
        _id() {
            return parseInt(this.$route.params.id);
        },
        _slug() {
            return this.$route.params.slug;
        },
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
        this.playCount();
    },
    methods: {
        playCount() {
            const self = this;
            this.$axios.$post("clipsclicker", {
                movie_id: self._id,
                movie_type: 1,
            });
        },
    },
};
</script>
