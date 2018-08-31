//获取到types中的值
import * as types from './mutation-types'

const mautations = {
	[types.SET_SINGER](state,singer){
		state.singer = singer
	}
}

export default mautations
