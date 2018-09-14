<template>
    <li class='item'>
        <img :src='source'>
        <div class='introduce'>
            <h4>{{name}}</h4>
            <p>{{detail}}</p>
            <p>{{price}}</p>
            <a href='javascript:void(0)' @click='onclick'>
                <i class='iconfont iconfont-add'>&#xe734;</i>
            </a>
        </div>
    </li>
</template>

<script>
export default {
    name: 'Item',
    props:[
        'source',
        'name',
        'detail',
        'price'
    ],
    methods:{
        onclick(){
            this.$store.commit('addItem',{
                name:this.name,
                price:this.price,
                count:1
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.item{
    height:7rem;
    padding:1rem;
    img{
        width:5rem;
        height:5rem;
        float:left;
        display:block;
    }
    .introduce{
        position: relative;
        width:7rem;
        float:right;
        text-align:start;
        h4{
            margin-top:0;
        }
        p:nth-child(2){
            font-size:0.8rem;
            color:#999;
        }
        p:nth-child(3){
            font-size:1.2rem;
            color:rgb(236, 79, 31);
            display:inline;
        }
        a{
            position: absolute;
            right:0;
            bottom:0;
        }
    }
}
</style>

