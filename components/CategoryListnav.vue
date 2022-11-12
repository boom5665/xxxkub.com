<template>
    <div class="">
        <!-- <div class="category-header">หมวดหมู่</div> -->
        <!-- <ul class="category-list">
            <li class="category-single" v-for="(value, index) in types" :key="'type' + index">
                <nuxt-link :to="'/' + _type + '/type/' + value.name_slug">{{ value.name_th }}</nuxt-link>
            </li>
            <li class="category-single" v-for="(value, index) in categories" :key="'cate' + index">
                <nuxt-link :to="'/' + _type + '/category/' + value.name_slug">{{ value.name_th }}</nuxt-link>
            </li>
        </ul> -->

        <div class="" @mouseover="onOver" @mouseleave="onLeave">
            <font-awesome-icon icon="fa-solid fa-layer-group" style="position: relative; right: -12px; top: 1px" />
            <b-dropdown text="หมวดหมู่" id="dropdown-1" class="m-md-2 dropdown all">
                <b-dropdown-item :to="'/' + _type + '/category/' + value.name_slug" class="category-single drop-con" v-for="(value, index) in categories" :key="'cate' + index">
                    <span>{{ value.name_th }}</span>
                </b-dropdown-item>
            </b-dropdown>
        </div>
        <!-- <b-dropdown id="dropdown-1" text="หมวดหมู่" class="m-md-2 dropdown">
            <li class="category-single drop-con" v-for="(value, index) in categories" :key="'cate' + index">
                <nuxt-link :to="'/' + _type + '/category/' + value.name_slug" class="drop-a">{{ value.name_th }}</nuxt-link>
            </li>
        </b-dropdown> -->
    </div>
</template>

<script>
export default {
    props: {
        _type: {
            type: String,
            required: false,
            default: "av",
        },
    },
    data() {
        return {
            categories: [],
            types: [],
        };
    },
    created() {
        this.getType();
        this.getCategory();
    },
    methods: {
        async getType() {
            const data = await this.$axios.$get(this._type + "/listtype");
            if (data.code == 200) this.types = data.result;
        },
        async getCategory() {
            const data = await this.$axios.$get(this._type + "/listcate");
            if (data.code == 200) this.categories = data.result;
        },
        onOver() {
            this.$refs.dropdown = true;
        },
        onLeave() {
            this.$refs.dropdown = false;
        },
    },
};
</script>

<style lang="scss">
.btn {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.2s;
    font-weight: 500;
    background-color: transparent;
    padding: 0px;
    border-radius: 9px;
    cursor: pointer;
    border: none;
    &:active,
    &:hover {
        color: rgb(246, 186, 181);
        background-color: transparent;
        border: transparent;
    }
}
.dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0em solid;
    border-right: 0.3em solid transparent !important;
    border-bottom: 0;
    border-left: 0.3em solid transparent !important;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
    color: rgb(246, 186, 181);
    background-color: transparent !important;
    border-color: transparent !important;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
    box-shadow: none !important;
}
</style>
