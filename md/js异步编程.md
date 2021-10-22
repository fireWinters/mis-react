1、概述
	（1）js采用单线程的原因
		早期是为了在浏览器上运行代码，对dom层进行操作，所以只能进行单线程操作
	（2）定义
		js执行环境中负责执行代码的线程只有一个
		1）优点
			更安全更简单
		2）缺点
			遇到耗时的任务，需要等待，会出现假死状态
		3）执行模式
			同步模式，异步模式

2、同步模式
	（1）定义
		会按照升序执行，也就是从上到下的顺序排队开始执行
	（2）举例
		//这个会被执行
		console.log('global begin')
		//声明函数不会被执行
		function bar(){
			console.log('bar task')
		}
		//这里同理
		function foo(){
			console.log('foo task')
			bar()
		}
		//这里调用函数就会开始执行
		foo()
		
		console.log('global end')
	（3）总结
		js在执行引擎中，维护了一个正在工作的工作表，记录正在做的工作，所有工作结束后会清空执行表
		
3、异步模式
	（1）功能
		为了能同时处理大量耗时任务，遇到耗时任务，js开启后就会继续执行后边的方法
	（2）缺点
		代码执行顺序混乱	
![](/img/bVcT1YN)
    如上图，console是打印结果，call stack是执行栈，web apis是内部api，queue是消息队列，event loop是事件监听器
    
   ![](/img/bVcT1ZZ)
   
    当遇到setTimeout这个api的时候，会放到web apis里去单独执行
 ![](/img/bVcT11D)
    当api中的方法执行完毕后，会放queue到消息队列中
   
  ![](/img/bVcT12I)
    当消息队列里有新的待办事项后，event loop会监听到，并把消息队列里的第一个方法，放到执行栈中进行执行
	
4、回调函数
	（1）定义
		回调函数可以理解为一件你想要做的事情，由调用者定义，交给执行者执行的函数

5、promise
	（1）为了规范异步程序的调用，设置的一个对象，用来去标识一个异步任务的成功或者失败
		1）成功：fulfilled -> onfulfilled
		2) 失败：rejected -> onrejected

6、promis基本用法
	（1）示例
		const promise = new Promise(function(resolve,reject)){
			//这里用于"兑现"承诺
			resolve(100)//承诺达成
			
			reject(new Error('promise rejected'))//承诺失败
		}
		
		proise.then(function (value){
			console.log('resolved',value)
		},function(error){
			console.log('rejected',error)
		})
		
7、promis使用案例
	（1）例子
		//promis方式的ajax
		function ajax(url){
			return new Promise(function(resolve,reject){
				var xhr = new XMLHttpRequest()
				xhr.open('GET',url)
				xhr.responseType = 'json'
				xhr.onload = function(){//这里是state状态为4的时候调用
					if(this.status == 200){
						resolve(this.response)
					}else{
						reject(new Error(this.statusText))
					}
				}
				xhr.send()
			})
		}
		
		//这里调用的路径是自己定义的以json文件
		ajax('/api/users.json').then(function(res){
			console.log(res)
		},function(error){
			console.log(error)
		})
		
8、promise常见误区
	（1）本质
		定义的异步任务结束后所需要执行的任务，通过.then方法调用，通常有俩种，一种成功的onFulfilled,一种失败的onRejected
	（2）错误用法
		如果有多个连续调用，会形成嵌套使用promis的情况
		ajax('/api/users.json').then(function(url){
			ajax(url.users).then(function(users){
				
			})
		})
	（3）正确方法是用到promis then方法链式调用的特点，尽量保证异步操作的扁平化
	
9、promise链式调用
	（1）为什使用链式调用
		var promise = ajax('/api/users.json')
		
		var promise2 = promise.then(function onFulfilled(value){
			console.log('onFulfilled', value)
		},function onRejected(error){
			console.log('onRejected', error)
		})
	
		console.log(promise2 == promise)
		//这里会打印出false因为then方法是从新new了一个promise对象,并不是用this
	
	（2）示例
		ajax('/api/users.json')
			.then(function(value){
				console.log(1111)
				return ajax('/api/urls.json')
			})//这里的then其实调用的是上一个then返回的promise对象
			.then(function(value){
				console.log(1111)
				console.log(value)
				return ajax('/api/urls.json')
			})
			.then(function(value){
				console.log(333)
				return ajax('/api/urls.json')
			})
			.then(function(value){
				console.log(444)
				return 'foo'
			})
	（3）总结
		1）promise对象的then方法会返回一个全新的promise对象
		2）后面的then方法就是在为上一个then返回的promise注册回调
		3）前面的then方法中回调函数的返回值会作为后面then方法回调参数
		4）如果毁掉中返回的promise,那么后面的then方法回调会等待它的结束
		
10、Promise异常处理
	//promis方式的ajax
	function ajax(url){
		return new Promise(function(resolve,reject){
			var xhr = new XMLHttpRequest()
			xhr.open('GET',url)
			xhr.responseType = 'json'
			xhr.onload = function(){//这里是state状态为4的时候调用
				if(this.status == 200){
					resolve(this.response)
				}else{
					reject(new Error(this.statusText))
				}
			}
			xhr.send()
		})
	}
	
	//这里调用的路径是自己定义的以json文件
	ajax('/api/users.json').then(function onFulfilled(value){
		console.log('onFulfilled',value)
	},function onRejected(error){
		console.log('onRejected',error)
	})
	
	//这里的catch方法就是then方法的别名	
	ajax('/api/users.json').then(function onFulfilled(value){
		console.log('onFulfilled',value)
	}
	.catch(function onRejected(error){
		console.log('onRejected',error)
	})	
	
	//catch方法和then方法都可以捕获Promise里的异常
	（1）catch捕获的异常
			是上一个then方法里的Promise,这个Promise是个新的，并不是一开始的那个。
		但是,因为是在同一个Promise链条里，所以第一个Promis的异常也会被一直传递下去
	（2）then方法捕获的异常
		只会捕获最开始的那个Promise里的异常，第二Promise里的异常不会被捕获。
	（3）例子
		ajax('/api/users.json').then(function onFulfilled(value){
			console.log('onFulfilled',value)
			return ajax('/error-url')//在第二个Promise里的异常
		},function onRejected(error){
			console.log('onRejected',error)
		})	
	（4）总结
		在代码中明确捕获每一个可能的异常
		
11、Promise静态方法
	//promis方式的ajax
	function ajax(url){
		return new Promise(function(resolve,reject){
			var xhr = new XMLHttpRequest()
			xhr.open('GET',url)
			xhr.responseType = 'json'
			xhr.onload = function(){//这里是state状态为4的时候调用
				if(this.status == 200){
					resolve(this.response)
				}else{
					reject(new Error(this.statusText))
				}
			}
			xhr.send()
		})
	}
	（1）Promise.resolve()方法
		
		//可以把参数转换成Promise对象
		Promise.resovle('foo')
			.then(function (value){
				console.log(value)//这里打印出来的就是'foo'
			})
		
		//Promise.resovle()相当于下面的方法
		new Promise(function (resolve, reject){
			resolve('foo')
		})
		
		//如果这个参数是Promise
		var promise = ajax('/api/users.json')
		var promise2 = Promise.resolve(promise)
		console.log(promise === promise2)//它会返回这个对象本身
		
		//如果这个参数是对象
		Promise.resolve({
			then: function(onFulfilled, onRejected){
				onFulfilled('foo')
			}
		})
		.then(function (value) {
			console.log(value)//这里也能拿到上边的then对象里的值
		})
		//这里带有then方法的对象，实现了一个thenable的接口，它是一个可以被then的对象
		这是之前还没有原生的Promise对象的时候，使用第三方的对象
		
	（2）Promise.reject()方法
		//无论参数是什么都是成为这个方法失败的原因
		Promise.reject('anything')
			.catch(function (error){
				console.log(error)
			})
			
12、Promise并行执行
	（1）Promise.all()方法
		//等待所有任务结束后才会执行
		ajax('/api/urls.json')
			.then(value => {
				const urls = Object.values(value)//这里把获取到的json文件中的值转换成数组
				const tasks = urls.map(url => ajax(url))//用map方法循环数组去调用ajax方法
				return Promise.all(tasks)//all方法把所有的tasks封装成一个Promise方法
			})
			.then(values => {
				console.log(values)//这里就能打印出上一个Promise的方法
			})
		
	（2）Promise.race()方法
		//只会等待第一个结束的任务
		const request = ajax('/api/posts.json')
		const timeout = new Promise((reslve, reject) => {
			setTimeout(() => reject(new Error('timeout')), 500)
		})
		
		//这里数组里有俩个方法，一个request,一个timeout
		Promise.race([
			request,
			timeout
		])
		.then(value => {
			console.log(value)
		})
		.catch(error => {//这里会因为超时抛出异常
			console.log(error)
		})
		
13、Promise执行时序/宏任务 vs 微任务
		（1）宏任务
			回调队列中的任务称之为[宏任务]，宏任务执行过程中可以临时加上一些额外需求，这些额外任务可以选择作为新的宏任务进到队列中排队
		（2）微任务
			直接在当前任务结束过后立即执行，Promise的回调会作为微任务执行，为了提高整体的响应能力，目前绝大数异步调用都是作为宏任务执行
			Promise和MutationObserver,还有node.js里的process.nextTick都是微任务
		（3）例子
			console.log('global start')
			
			setTimeout(() => {
				console.log('setTimeout')
			},0)
			
			Promise.resolve()
				.then(() => {
					console.log('promise')
				})
				.then(() => {
					console.log('promise 2')
				}).then(() => {
					console.log('promise 3')
				})
				
			console.log('global end')	
		（4）打印结果
			global start
			global end
			promise
			promise 2
			promise 3
			setTimeout
			
14、Generator异步方案（上）
	//生成器函数回顾
	function * foo(){
		console.log('start')
		
		try{
			const res = yield 'foo'
			console.log(res)
		}catch(e){
			console.log(e)
		}
	}
	
	//这里只是声明了函数
	const generator = foo()
	
	//这里进行了调用
	const result = generator.next()
	console.log(result)
	
	//调用foo函数的异常
	generator.throw(new Error('Genterator error'))
	
15、Generator异步方案（中）	
	//promis方式的ajax
	function ajax(url){
		return new Promise(function(resolve,reject){
			var xhr = new XMLHttpRequest()
			xhr.open('GET',url)
			xhr.responseType = 'json'
			xhr.onload = function(){//这里是state状态为4的时候调用
				if(this.status == 200){
					resolve(this.response)
				}else{
					reject(new Error(this.statusText))
				}
			}
			xhr.send()
		})
	}
	
	//生成器函数
	function * main (){
		const users = yield ajax('/api/users.json')//这里获得的是promis对象
		console.log(users)
		
		const posts = yield ajax('/api/posts.json')
		console.log(posts)
	}
	
	//声明
	const g = main()
	
	//调用
	const result = g.next()
	
	//这里是promis对象，所以就可以调用.then方法
	result.value.then(data => {//这个个data就是他里边的
		g.next(data)//这里继续调用生成器函数，就会让人感觉是同步的一样
	})
	
	//如果有多个yield
	result.value.then(data => {
		const result2 = g.next(data)
		
		if(result2.done) return
		
		result2.value.then(data => {
			const result3 = g.next(data)
			
			if(result3.done) return
			
			result3.value.then(){
				g.next(data)
			}
			
		})
	})
	
16、Generator异步方案（下）	
	//递归执行Generator函数
	//生成器函数
	function * main (){
		try{
			const users = yield ajax('/api/users.json')//这里获得的是promis对象
			console.log(users)
			
			const posts = yield ajax('/api/posts.json')
			console.log(posts)
		} catch (e){
			console.log(e)
		}
	}
	
	//生成器函数的执行器
	function co (generator) {
		const g = main()
		
		function handleResult (result){
			if(result.done) return //生成器函数结束
			result.value.then(data => {
				handleResult(g.next(data))
			}, error => {
				g.throw(error)
			})
		}
		handleResult(g.next())
	}
	
	co(main)//这种类似的方法，在https://github.com/tj/co中已经有了
	
17、Async/Await语法糖
	//语言层面的异步编程标准
	（1）示例
	async function main (){
		try{
			const users = await ajax('/api/users.json')
			console.log(users)
			
			const posts = await ajax('/api/posts.json')
			console.log(posts)
		} catch (e){
			console.log(e)
		}
	}
	
	const promise = main()
	
	promise.then(() => {
		console.log('all completed')
	})
	
	（2）总结
	async和generator生成器函数的区别，await代替yield,不要生成器执行函数co，
	返回的是Promise对象更加利于对整体代码的控制，await只能出现在async函数内部
	