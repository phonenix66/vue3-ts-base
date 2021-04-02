<template>
    <div>
        <div>
            <p>home.page</p>
            <p>{{ state1 }}</p>
            <button @click="add1">增加</button>

            <p>{{ state2 }}</p>
            <button @click="add2">增加</button>
        </div>

        <div class="bili-banner"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';

const Home = defineComponent({
    created() {
        // console.log('routerList', this.$route);
        // console.log(this);
    },
    setup() {
        // ref toref 同一个对象的问题
        const obj = {
            count: 3
        };
        const state1 = ref(obj.count);
        const state2 = toRef(obj, 'count');
        function add1() {
            state1.value++;
            console.log('原始值：', obj);
            // 对原始值做一份拷贝
            console.log('响应式数据对象：', state1);
        }
        function add2() {
            state2.value++;
            console.log('原始值：', obj);
            console.log('响应式数据对象：', state2);
        }
        return { state1, state2, add1, add2 };
    },
    methods: {
        hello() {
            console.log('hahha');
            return 'nihao';
        }
    }
});

export default Home;
</script>

<style scoped lang="less">
.hello {
    color: red;
    font-size: 20px;
    &-test {
        color: #ff0000;
    }
}
</style>
