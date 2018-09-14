import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        items:[/*{
            name: 'first',
            count: 1,
            price: 0
        }*/]
    },
    getters:{
        count: state=>{
            if(state.items.length>0){
                return state.items.reduce((previousValue,currentValue)=>{
                    return previousValue+currentValue.count;
                },0);
            }else{
                return 0;
            }
        },
        addUp (state) {
            if(state.items.length>0){
                return state.items.reduce((previousValue,currentValue)=>{
                    return previousValue+currentValue.count*currentValue.price;
                },0);
            }else{
                return 0;
            }
        },
        getItems: state=> state.items
    },
    mutations:{
        addItem (state,newItem) {
            const obj = state.items.find(element => element.name === newItem.name);
            if(obj === undefined){
                state.items.push({
                    count: newItem.count,
                    price: newItem.price,
                    name: newItem.name
                })
            }else{
                obj.count++;
            }
        },
        removeItem (state,newItem) {
            const obj = state.items.find(element=> element.name===newItem.name);
            const index = state.items.findIndex(obj);
            obj.count--;
            if(obj.count===0){
                state.items.splice(index,1);
                console.log(state.getters.getItems);
            }
        }
    }
})