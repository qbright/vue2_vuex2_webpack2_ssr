<template>
    <div id="app">
        <div class="c">
            this is the App.vue Component
            <div @click="testClick" class="a"> Click me! Change the 'a' Value</div>
            <div class="b"> the 'a' value is {{a}}</div>
            <list></list>
        </div>

    </div>
</template>
<script>
    import list from "./components/List.vue";

    export default {
        data (){
            return {
                a: 11
            }
        },
        methods: {
            testClick(){
                this.a = Math.random();
            }
        },
        components: {
            list
        }
    }
</script>
<style lang=css scoped>

    .a {
        background: blue;
        margin-bottom: 10px;
        color: white;
        cursor: pointer;
    }
    .b {
        background: red;
        margin-bottom: 10px;
    }
    .c{
        background:lightblue;
    }

</style>
