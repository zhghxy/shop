<template>
  <div id="app" @touchstart="ontouchstart"
                @touchmove="ontouchmove"
                @touchend="ontouchend">
    <!--img src="./assets/logo.png">
    <router-view/-->
    <header :class="{ 'search-hide': hide }">
      <div class='search' >
        <input type='text' placeholder="想吃什么搜一搜" />
        <i class='iconfont icon-search'>&#xe6cc;</i>
      </div>
      <img src='./assets/logo.png' :style=" hide?{}:{ display:'none'}">
    </header>

    <div class='content' :class="{ looking: lookMenu}">
      <!--商店标题-->
      <div class='shop-header'>
        <h3>鲜芋仙（XX店）</h3>
      </div>
      <!--商家推荐-->
      <div class='recommend'>
        <h4>商家推荐</h4>
        <ul>
          <li><img src="./assets/1.jpg" alt=""><i class='iconfont iconfont-add'>&#xe734;</i></li>
          <li><img src="./assets/2.jpg" alt=""><i class='iconfont iconfont-add'>&#xe734;</i></li>
          <li><img src="./assets/3.jpg" alt=""><i class='iconfont iconfont-add'>&#xe734;</i></li>
        </ul>
      </div>
      <div class='menu' >
        <nav >
          <router-link 
            v-for="(item,index) in selection"
             :key="index"
             :to="item.path">
             {{item.title}}
          </router-link>
        </nav>
        <router-view></router-view>
      </div>
    </div>
    <footer>
      <div class='count'>
        <a href="javascript:void(0)" @click='lookList=!lookList'>
          <i class='iconfont' >&#xe659;</i>
        </a>
        <span>未选购商品</span>
        <ul class='buy-list' :class="{'show-list' :lookList }" v-if='buyList.length>0'>
          <li v-for='item in buyList'
              :key='item.name'>
              <span class='item-name'>{{item.name}}</span>
              <span class='item-count'>{{item.count}}</span>
              <span class='item-price'>{{item.price}}</span>
          </li>
        </ul>
      </div>
      <button type='submit'>结算</button>
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
    },
    ontouchmove: function(e){
      if(this.touched){
        const dis=e.targetTouches[0].pageY-this.startY;
        if(document.documentElement.scrollTop>300){
          this.lookMenu=true;
        }else if(dis<0){
          this.lookMenu=false;
        }
        if(dis<0&&this.hide){
          this.hide=false;
        }else if(dis>0&&(!this.hide)&&document.documentElement.scrollTop<150){
          this.hide=true;
        }
      }
    },
    ontouchend: function(){
      this.touched=false;
    }
  },
  computed:{
     buyList(){
       return this.$store.getters.getItems;
     }
  },
  data(){
    return {
      touched: false,
      hide: true,
      startY: 0,
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
