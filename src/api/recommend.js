//引用jsonp
import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getRecommend(){
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

	const data = Object.assign({},commonParams,{
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})

	return jsonp(url,data,options)
}

export function getDiscList(){
	const url = '/api/getDiscList';

	const data = Object.assign({},commonParams,{
		platform: 'yqq',
		picmid: 1,
		rnd: Math.random(),
		loginUin:0,
		hostUin:0,
		needNewCode:0,
		categoryId:10000000,
		sortId:5,
		sin:0,
		ein:29,
		//返回文件类型变为json
		format:'json'
		
	})
	return axios.get(url,{
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
