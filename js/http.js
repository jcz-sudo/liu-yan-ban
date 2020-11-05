//封装promise
function http(url, type, data) {
	const promise = new Promise(function (resolve, reject) {
		// 监听状态函数
		function handle() {
			if (this.readyState !== 4) {
				return
			}
			if (this.status === 200) {
				resolve(client.responseText)
			} else {
				reject('请求出错')
			}
		}
		const client = new XMLHttpRequest()
		client.onreadystatechange = handle
		client.open(type, url)
		if (type == 'get') {
			client.send()
		} else {
			client.setRequestHeader(
				'Content-type',
				'application/x-www-form-urlencoded'
			)
			client.send(data)
		}
	})
	return promise
}
