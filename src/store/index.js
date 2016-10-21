import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        list: [1, 23, 4, 5, 6, 7, 7, 8, 8],
        count: 1
    },
    actions: {
        replaceList: context=> {
            var t = [];
            let i = 0;
            while (i < 7) {
                t.push(Math.random());
                i++;
            }
            setTimeout(()=> {
                context.commit("replaceList", t);
            }, 1000);
        }
    },
    mutations: {
        replaceList: (state, payload)=> {
            console.log(state, payload)
            state.list = payload ;
        },
        addItem: state=> {
            state.list.push(Math.random());
        }
    },
    getters: {
        cc: state => {
            return state.count + "  hello!";
        }
    }
})
export default store
