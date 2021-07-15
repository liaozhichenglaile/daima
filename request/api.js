import fun from './fun.js'

/**
 * @param {Object} data sessionkey
 */
export function sessionkey(data) {
	return fun('/user/session_key', data, 'POST')
}
/**
 * @param {Object} data 用户信息
 */
export function userinfo(data) {
	return fun('/user/me', data, 'GET')
}
/**
 * @param {Object} data 默认登录
 */
export function login(data) {
	return fun('/user/mini_login', data, 'POST')
}
/**
 * @param {Object} data 绑定手机
 */
export function bindtel(data) {
	return fun('/user/bind_tel', data, 'POST')
}
/**
 * @param {Object} data 艺人列表
 */
export function starlist(data) {
	return fun('/artist/list', data, 'GET')
}
/**
 * @param {Object} data 艺人详情
 */
export function starinfo(data) {
	return fun('/artist/detail', data, 'GET')
}
/**
 * @param {Object} data 艺人提交资料
 */
export function starsub(data) {
	return fun('/artist/save', data, 'POST')
}

/**
 * @param {Object} data 艺人关注列表
 */
export function starfollowlist(data) {
	return fun('/artist/follow/list', data, 'GET')
}

/**
 * @param {Object} data 艺人关注
 */
export function starfollow(data) {
	return fun('/artist/follow', data, 'POST')
}
/**
 * @param {Object} data 艺人取消关注
 */
export function notfollow(data) {
	return fun('/artist/follow/delete', data, 'POST')
}
/**
 * @param {Object} data 作品列表
 */
export function workslist(data) {
	return fun('/artist/dynamic/list', data, 'GET')
}
/**
 * @param {Object} data 艺人预约列表
 */
export function orderlist(data) {
	return fun('/artist/appointment/list', data, 'GET')
}

/**
 * @param {Object} data 艺人预约
 */
export function starorder(data) {
	return fun('/artist/appointment/save', data, 'POST')
}

/**
 * @param {Object} data 商家预约列表
 */
export function businessorder(data) {
	return fun('/appointment/list', data, 'GET')
}
/**
 * @param {Object} data 商家预约提交
 */
export function businessub(data) {
	return fun('/appointment/save', data, 'POST')
}
/**
 * @param {Object} data 作品提交
 */
export function worksub(data) {
	return fun('/artist/dynamic/save', data, 'POST')
}
/**
 * @param {Object} data 标签类型
 */
export function types(data) {
	return fun('/system/dictionary/list', data, 'GET')
}

/**
 * @param {Object} data 轮播图
 */
export function banner(data) {
	return fun('/system/banner/list', data, 'GET')
}

/**
 * @param {Object} data 首页推荐
 */
export function nominate(data) {
	return fun('/artist/recommend', data, 'GET')
}
