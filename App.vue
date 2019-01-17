<template>
  <div id="app" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend">
    
    <!--下滑出现搜索框-->
    <header :class="{ 'search-hide': hide }">
      <div class='search'>
        <input type='text' placeholder="想吃什么搜一搜" />
        <i class='iconfont icon-search'>&#xe6cc;</i>
      </div>
      <img src='./assets/logo.png' :style=" hide?{}:{ display:'none'}">
    </header>

    <div class='content'>
      <!--商店标题-->
      <div class='shop-header'>
        <h3>鲜芋仙（XX店）</h3>
      </div>
      <!--商家推荐-->
      <div class='recommend' ref='rec'>
        <h4>商家推荐</h4>
        <ul>
          <li><img src="./assets/1.jpg" alt=""><i class='iconfont iconfont-add'>&#xe734;</i></li>
          <li><img src="./assets/2.jpg" alt=""><i class='iconfont iconfont-add'>&#xe734;</i></li>
          <li><img src="./assets/3.jpg" alt=""><i class='iconfont iconfont-add'>&#xe734;</i></li>
        </ul>
      </div>
      <div class='menu' :class="{ looking: lookMenu}">
        <nav>
          <router-link v-for="(item,index) in selection" :key="index" :to="item.path">
            {{item.title}}
          </router-link>
        </nav>
        <router-view></router-view>
      </div>
    </div>

    <!--查看购物车和结算区域-->
    <footer>
      <div class='count'>
        <a href="javascript:void(0)" @click='lookList=!lookList'>
          <i class='iconfont'>&#xe659;</i>
        </a>
        <span>{{buyList.length>0?"已选"+totalCount+"件":"未选购商品"}}</span>
        <ul class='buy-list' :class="{'show-list' :lookList }" v-if='buyList.length>0'>
          <li v-for='item in buyList' :key='item.name'>
            <span class='item-name'>{{item.name}}</span>
            <a href="javascript:void(0)" @click="mydelete(item)"><i class='iconfont iconfont-sub'>&#xe63d;</i></a>
            <span class='item-count'>{{item.count}}</span>
            <a href="javascript:void(0)" @click='myadd(item)'><i class='iconfont iconfont-add2'>&#xe64e;</i></a>
            <span class='item-price'>{{item.price*item.count}}</span>
          </li>
        </ul>
      </div>
      <button type='submit'>{{(buyList.length>0?totalPrice:"")+"结算"}}</button>
    </footer>
  </div>
</template>

<script>
  export default {
  name: 'App',
  created(){
    console.log(this.$store)
  },
  methods: {
    onscroll: function(e){
      e.preventDefault();
    },
    ontouchstart: function(e){
      
      this.touched=true;
      this.startY=e.targetTouches[0].pageY;
      this.startX=e.targetTouches[0].pageX;
      this.top=document.documentElement.scrollTop;
    },
    ontouchmove: function(e){
      const rem=parseInt(document.documentElement.style.fontSize.slice(0,-2));
      const doc=document.documentElement;
    //  if(this.touched&&!this.$refs.rec.contains(e.targetTouches[0].target)){
      if(this.touched){
        const dis=e.targetTouches[0].screenY-this.startY;
        const cro=e.targetTouches[0].screenX-this.startX;
        console.log('r '+dis+' c '+cro);
        /*菜单栏固定*/
        if(doc.scrollTop>15.67*rem){
          this.lookMenu=true;
        }else {
          this.lookMenu=false;
        }
        
       

        //上拉出现搜索框
        if(Math.abs(cro)<10){
          if(dis<-2&&this.hide){
            this.hide=false;
          }else if(dis>2&&(!this.hide)&&doc.scrollTop<150){
            this.hide=true;
          }
          
        }
          this.startY=e.targetTouches[0].screenY;
          this.startX=e.targetTouches[0].screenX;
      }
    },
    ontouchend: function(){
      this.touched=false;
    },
    mydelete:function(item){
      this.$store.commit({
        type:'removeItem',
        name: item.name
      })
    },
    myadd:function(item){
     
      this.$store.commit({
        type:'addItem',
        name:item.name
      })
    }
  },
  computed:{
     buyList(){
       return this.$store.getters.getItems;
     },
     totalCount(){
        return this.buyList.reduce((a,b)=> {return a+b.count},0);
     },
     totalPrice(){
       return this.buyList.reduce((a,b)=>a+b.count*b.price,0);
     },
  },
  data(){
    return {
      touched: false,
      hide: true,
      startY: 0,
      startX:0,
      lookMenu: false,
      lookList: false,
      selection: [
        {
          title: '热销',
          path: '/hot'
        },
        {
          title: '手工芋圆',
          path: '/first'
        },
        {
          title: '滑嫩仙草',
          path: '/second'
        },
        {
          title: '布丁系列',
          path: '/buding'
        },
        {
          title: '清凉冰品',
          path: '/bing'
        },
        {
          title: '茶品系列',
          path: '/tea'
        },
        {
          title: '招牌点心',
          path: '/dessert'
        }
      ]
    }
  }
}
</script>

<style src='./app.scss' lang='scss' type='text/css'></style>
