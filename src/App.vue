<template>
  <div id="app">
   <m-header></m-header>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'

export default{
	components:{
		MHeader
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable.styl"
 
#app
  color: $color-theme 
</style>
