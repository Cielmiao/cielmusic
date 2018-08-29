<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data(){
      return {
        dots: [],
        //表示当前第几页
        currentPageIndex: 0
      }
    },
    props: {
    //循环播放
      loop:{
        type: Boolean,
        default: true
      },
    //自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    //定时
    interval: {
      type: Number,
      default: 4000
      }
    },

    mounted(){
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();

        //自动播放
        if(this.autoPlay){
          this._play();
        }
      },20),
    

    //当页面发生改变时，会重新计算它的宽度
      window.addEventListener('resize',()=>{
        if(!this.slider){
            return
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      })


    },

    methods: {
      _setSliderWidth(isResize){
        this.children = this.$refs.sliderGroup.children;

       let width = 0;
       let sliderWidth = this.$refs.slider.clientWidth;
       //循环每个子元素，为它们添加一个样式
       for(let i=0;i<this.children.length;i++){
        let child = this.children[i];
        //调用添加class的函数，为每个元素都添加这个class
        addClass(child,'slider-item');

        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
       };

       if(this.loop && !isResize){
          width += 2*sliderWidth;
       };

       this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots(){
        this.dots = new Array(this.children.length)
      },

      _initSlider(){
        this.slider = new BScroll(this.$refs.slider, {
           scrollX: true,
           eventPassthrough: 'vertical',
           momentum: false,
           snap: {
             loop: this.loop,
             threshold: 0.3,
             speed: 400
           }
          })

          this.slider.on('scrollEnd',()=>{
          //pageIndex  滚动结束之后的当前图片索引值
            let pageIndex = this.slider.getCurrentPage().pageX;
            this.currentPageIndex = pageIndex;

            if(this.autoPlay){
                clearTimeout(this.timer);
                this._play();
            }
          })
      },

      _play(){
        let pageIndex = this.currentPageIndex + 1;

        this.timer = setTimeout(()=>{
        //图片循环播放
          this.slider.next();
        },this.interval)
        

      }
    },

    destroyed(){
      clearTimeout(this.timer);
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>