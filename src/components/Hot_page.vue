<template>
    <ul class='hot_page'>
        <Item 
            v-for="object in list" 
            v-bind="object"
            :key="object.name"/>
    </ul>

</template>

<script>
import Item from './Item.vue';

export default {
    name: 'Hot',
    data(){
        return{
            list: [
               {
                 name: '芋圆4号',
                 source: require('../assets/1.jpg'),
                 price: 23,
                 detail: '芋圆系列热品打底-红豆汤'
               },
               {
                 name: '芋圆1号',
                 source: require('../assets/2.jpg'),
                 price: 23,
                 detail: '芋圆系列热品打底-红豆汤'
               },
               {
                 name: '芋圆2号',
                 source: require('../assets/3.jpg'),
                 price: 23,
                 detail: '芋圆系列热品打底-红豆汤'
               },
               {
                 name: '芋圆3号',
                 source: require('../assets/4.jpg'),
                 price: 23,
                 detail: '芋圆系列热品打底-红豆汤'
               }

            ]
        }
    },
    components:{
        'Item':Item
    }
}
</script>

<style lang="scss" scoped>
ul{
    list-style-type: none;
    padding-left:0;
    overflow:scroll;
}
</style>
