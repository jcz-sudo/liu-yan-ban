window.onload = function () {
	// http('http://127.0.0.1:3000/list', 'get').then(res=>{
	// 	console.log(res)
	// })
	const m = new Map()
	//选择器封装
	var $ = function (name) {
		return document.querySelector(name)
	}
	//提交
	$('.submit').onclick = function () {
		let _name = $('.name').value,
			_message = $('.message').value
		if (!_name || !_message) return
		//使用正则规定昵称必须包含中文
		let reg = /[\u4e00-\u9fa5]+/
		if (_name.match(reg)) {
			let params = `name=${_name}&message=${_message}`
			http('http://127.0.0.1:3000/comment', 'post', params).then(
				(res) => {
					http('http://127.0.0.1:3000/list', 'get').then((res) => {
						let arrList = JSON.parse(res)
						listShow(arrList)
					})
				}
			)
		} else {
			alert('昵称必须包含中文')
		}
	}
	//展示
	let listShow = function (arrList) {
		let str = ''
		for (let item of arrList) {
			str += `<li class="list-group-item">${item.name}
                        <span>说：</span>${item.message}
                    </li> `
		}
		$('.messageList').innerHTML = str
	}
}
