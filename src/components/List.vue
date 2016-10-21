<template>
    <div class="d">
        <div>this is the List.vue component</div>
        <div class="e">the list length is : {{list.length}}</div>
        <div>
            <div class="btn" @click="replaceList">click to replace list after 1s </div>
            <div class="btn" @click="addItem">click to add item</div>
        </div>
        <ul>
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    import {mapState, mapMutations,mapActions} from "vuex";
    export default {
        computed: mapState(["count", "list"]),
        methods:{
                ...mapMutations(["addItem"]),
                ...mapActions(["replaceList"])
        }
    }
</script>
<style scoped>
    .btn {
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        background: rosybrown;
        margin: 10px;
    }
    .e {
        background: lightsalmon;
        margin: 10px;
    }
    .d {
        margin: 10px;
        background: lightcoral;
    }
</style>

