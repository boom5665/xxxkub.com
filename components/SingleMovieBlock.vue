<template>
    <nuxt-link :to="getPlayUrl(_obj)" class="single-movie-block">
        <div class="poster-container">
            <nuxt-img class="poster" :loading="_fetchMode" :src="_obj.picture" height="220" :alt="_obj.full_name" />
             <div class="rating" v-show="_obj.ratescore">{{ score ? score : _obj.ratescore }}</div>
            <div class="poster-overlay">
                <!-- <b-icon-play-circle class="poster-play" /> -->
                <a class="card__play">
                    <nuxt-img class="img-arrow" format="webp" src="/arrow.png" alt="loader" />
                </a>
            </div>
        </div>
        <div class="title">{{ _obj.full_name }}</div>
        <div class="d-flex align-items-center">
            <!-- <div class="resolution">{{ _obj.quality }}</div> -->
            <div class="sound flex-grow-1" v-show="_obj.sound_main">เสียง : {{ _obj.sound_main }}</div>
            <div class="view"><b-icon-eye class="view-icon" /> {{ _obj.view }}</div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        _obj: {
            type: Object,
            required: true,
        },
        _fetchMode: {
            type: String,
            required: false,
            default: "lazy",
        },
    },
    data() {
        return {
            score: "",
        };
    },
    mounted() {
        this.getfixscore();
    }, 

    methods: {
        getfixscore() {
            this.score = Number.parseFloat(this._obj.ratescore).toFixed(0);
        },
    },
};
</script>

<style>
</style>
