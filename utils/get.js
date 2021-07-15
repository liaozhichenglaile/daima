import {sessionkey,login,bindtel} from '@/request/api.js';
export function getbasickey(params) {
	return new Promise((resolve, reject) => {
				login(params).then((succ) => {
					resolve(succ)
				}).catch(Error => {
					reject(Error)
				})
	})
}
export function bindtelkey(encrypted_data, iv) {
	return new Promise((resolve, reject) => {
		uni.login({
			success(res) {
				bindtel({
					encrypted_data,
					iv,
					code: res.code
				}).then((succ) => {
					resolve(succ)
				}).catch(Error => {
					reject(Error)
				})
			}
		})
	})
}
