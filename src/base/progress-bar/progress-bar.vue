<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created(){
      this.touch = {}
    },
    methods: {
      progressTouchStart(e){
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        //已经播放了的宽度
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return
        }
        //手指移动的长度
        const deltaX = e.touches[0].pageX - this.touch.startX
        //最后的偏移值最大就是进度条的总宽度
        const offsetWidth =Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + deltaX)) 
        this._offset(offsetWidth)
      },
      progressTouchEnd(e){
        this.touch.initiated = false
        this._triggerPercent()
      },
      //点击进度条歌曲快进到相应的位置
      progressClick(e){
        this._offset(e.offsetX)
        this._triggerPercent()
      },
      //改变歌曲的播放时间
      _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        //将这个函数派发出去，用player来监听
        this.$emit('percentChange',percent)
      },
      //设置进度条宽度
      _offset(offsetWidth){
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
      percent(newPercent){
        if(newPercent >= 0 && !this.touch.initiated){
        //进度条的总长度
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          //用获取到的比例乘以总长度就是进度条移动的宽度
          const offsetWidth = newPercent * barWidth
          //设置进度条宽度
           this._offset(offsetWidth)
        }
      }
    }
  }
   
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
