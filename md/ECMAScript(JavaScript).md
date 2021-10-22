1、ECMAScript(JavaScript)概述
	（1）定义
		通常看做JavaScript的标准化规范，实际上JavaScript是ECMAScript的扩展语言，ECMAScript只提供了最基本的语法
	（2）版本
		es是通过发布时间来定义版本的，所以2015年发布的就成了es6

2、es6
	（1）版本区别
		1）相比es5.1的变化比较大
			1、解决原有语法上的一些问题或者不足
			2、对原有语法进行增强
			3、全新的对象、全新的方法、全新的功能
			4、全新的数据类型和数据结构
		2）自此，标准命名规则发生变化
		3）async函数是es2017中制定的标准，所以有些人会把2015年以后发布的es统称为es6
		
3、es2015的准备工作
	（1）nodemon
		文件修改后会自动更新启动项目，运行方法yarn run v1.19.1

4、let与块级作用域
	在2015前，只有俩种作用域，一个是全局作用域，另一个是函数作用域，在2015之后新增了块级作用域。
	（1）定义
		‘｛｝’花括号包裹起来的作用域就是块级作用域
	（2）用途
		以前是没有块级作用域的，所以在复杂的代码中，'{}'花括号中的代码也是会被打印出来的，这是不安全，也是不利的。
	
5、const 恒量/常量
	（1）定义
		在let的基础上多了个“只读”，声明过后就不能再修改了。
	（2）用法
		最佳实践：不用var,主用const,配合let
		
6、数组的解构
	（1）介绍
		不通过索引获取数组中的元素
	（2）示例
		const arr = [100, 200, 300]
		const[foo, bar, baz] = arr
		console.log(foo, bar, baz)
		
		//如果只想获取第三个
		const[, , baz] = arr//前俩个不声明，但是要用逗号进行占位，表示有3个元素
		console.log(baz)
	
		//如果想从某一个解构成员，取到后边所有的解构成员为止
		const[foo, ...rest] = arr
		console.log(rest)
		
		//如果解构成员数大于被解构的元素数，那么超出的解构成员就是未定义的
		const[foo, bar, baz, more] = arr
		console.log(foo)
		
		//给解构成员设置默认值
		const[foo, bar, baz = 123, more = 'default balue'] = arr
		console.log(more)
		
7、对象的解构
	（1）介绍
		不同于数组解构，对象解构是按照对象里的name获取的
	（2）示例
		const obj = {name:'zce', age:18}
		const {name} = obj
		console.log(name)
		
		//重命名解构成员，当出现解构成员名称和变量名称重名的时候
		const name = 'tom'
		const {name:objName = 'jack'} = obj
		console.log(name)
		
		//解构一些方法，达到重命名效果，减少代码量
		const {log} = console
		log{'foo'}
		log{'bar'}
		
8、模版字符串
	（1）介绍
		可以直接在代码里输入换行符，不用</br>
	（2）示例
		//换行字符串
		const str = 'hello es2015,
		
		this is a \'string\''
		console.log(str)
		
		//拼接字符串
		const name = 'tom'
		const msg = 'hey, ${name} --- ${1 + 2} --- ${Math.r}'//这里的${name}就是获取上边的name变量的值
		console.log(msg)
		
9、模版字符串标签函数
	（1）介绍
		有些字符串模版里要用到函数方法
	（2）示例
		const name = 'tom'
		const gender = true
		
		function myTagFunc(strings, name, gender){//这里的name，gender会获取到${name}和${gender},strings会获取其他的字符串
			console.log(strings, name, gender)
			return '123'
		}
		
		const result = myTagFunc'hey, ${name} is a ${gender}'
		
		console.log(result)
		
10、字符串扩展方法
	（1）常用方法
		1）includes()
		2）startsWith()
		3）endsWith()
	（2）示例
		const message = 'Error: foo is not defined.'
		
		console.log(
			message.startsWith('Error')//开头是否包含了
			message.endsWith('.')//结尾是否包含了
			message.includes('foo')//中间是否包含了
		)
		
11、参数默认值
	（1）介绍
		在以前给函数里的参数设置默认值的时候，需要给函数传递参数，如果没传递的话就会出现问题
	（2）示例
		//以前
		function foo(enable){
			//enable = enable || true//这里要判断是否是undefined
			enable = enable === undefined ? true
			console.log('foo invoked - enable:')
			console.log(enable)
		}
		
		foo(false)//这里如果传递false上边的函数就会报错
		
		//现在
		function foo(bar, enable = true){//这里的enable = true就是在设置默认值，并且这种设置默认值的参数一定要放到所有参数的最后
			console.log('foo invoked - enable:')
			console.log(enable)
		}
		
		foo(false)
		
12、剩余参数
	function foo(first, ...args){//这里的...args就代表接收所有剩余参数，并且只能写在参数的最后一个位置
		console.log(args)
	}
	
	foo(1, 2, 3, 4)
	
13、展开数组
	（1）介绍
		就是把数组里的所有元素分别打印出来
	（2）示例
		const arr = ['foo', 'bar', 'baz']
		
		//以前
		console.log(arr[0], arr[1], arr[2])
		
		//现在
		console.log(...arr)
		
14、箭头函数
	（1）示例
		const inc = (n, m) => n + 1//这里的箭头函数左边的是参数，右边的函数方法
		
		const inc = (n, m) => {//如果加了花括号就要手动return返回值
			console.log('inc invoked')
			return n + 1
		}
		
		console.log(inc(100))
		
15、箭头函数与this
	（1）介绍
		箭头函数不会改变this指向
		
	（2）示例
		const person = {
			name: 'tom',
			/* sayHi: function(){
				console.log('hi, my name is ${this.name}')//这里打印出来的是tom
			} */
			sayHi: () => {
				console.log('hi, my name is ${this.name}')//这里打印出来的是undefined，说明
			},
			sayHiAsync: function(){
				const _this = this//这里是为了处理拿不到对象的this，先把this存储到_this中
				setTimeout(function(){
					console.log(this.name)
				}, 1000)//这里的setTimeout把this.name变成全局对象上的了，拿不到当前作用域的name
				
				//使用箭头函数
				setTimeout(() => {
					console.log(this.name)
				}, 1000)
			}
		}
		
		person.sayHi()
		
16、对象字面量增强
	（1）示例
		const bar = '345'
		
		const obj = {
			foo：123，
			//bar: bar
			bar,//如果变量属性名称和对应的值一样，都是bar就可以省略
			/* method1: function(){
				console.log('method111')
			} */
			method1(){//对象里的方法可以这么写
				console.log('method111')
				console.log(this)//这里的this指向了obj内部
			}
		}
		
		//计算属性名，用一对方括号，包裹表达式，表达式的结果就是这个属性的属性名
		obj[Math.random()] = 123//这里是动态对对象里进行属性添加
		
		console.log(obj)
		obj.method1()
		
17、对象扩展方法
	（1）介绍
		将多个源对象中的属性复制到一个目标对象中，如果有相同的属性，源对象中的属性就会覆盖掉目标对象中的属性
	（2）示例
		const sourcel = {
			a: 123,
			b: 123
		}
		
		const target = {
			a: 456,
			c: 456
		}
		
		const result = Object.assign(target, sourcel)//第一个参数是目标对象，第二个参数是源对象
		
		console.log(target)
		console.log(target === target)
		
18、Object.is
	（1）介绍
		判断一些特殊的值是否相等
	（2）示例
		console.log{
			//0 == false
			//0 === false
			// +0 === -0
			// NaN === NaN
			Object.is(+0, -0)//es5为了处理上述注释的情况推出了这个is方法进行判断
		}
		
19、Proxy
	（1）介绍
		用来监听对象属性的读写
	（2）示例
		const person = {
			name: 'zce',
			age: 20
		}
		
		const personProxy = new Proxy(person, {
			/* 
			 * get方法监视属性的访问
			 * target代理的目标对象，这里代理的是person这个对象
			 * property外部访问的属性名，比如对象里的name
			 */
			get(target, property){
				/* console.log(target, property)
				return 100 */
				return property in target ? target[property] : 'default'//这里判断下如果访问的属性在代理目标对象里，那么就返回这个属性，不在就返回默认值
			},
			/* 
			 * set方法监视属性设置的过程
			 * target代理目标对象
			 * property外部访问的属性名
			 * value要赋的值
			 */
			set(target, property, value){
				if(property === 'age'){//这里判断如果属性是年龄
					throw new TypeError('${balue}' is not an int')//不是数字类型的话就抛出异常
				}
				target[property] = value//存储
				console.log(target, property, value)
			}
		})
		
		console.log(personProxy.name)
		
20、Proxy 对比 Object.defineProperty()
	（1）介绍
		defineProperty只能监视属性的读写，Proxy能监视更多操作
		Proxy是以非侵入的方式监管了对象的读写
		1）get：读取某个属性
		2）set：写入某个属性
		3）has：in操作符
		4）deleteProperty：delete操作符
		5）getPrototypyeOf：Object.getPrototypyeOf()
		6）setPrototypyeOf：Object.PrototypyeOf()
		7）isExtensible：Object.isExtensible()
		8）preventExtensions：Object.preventExtensions()
		9）getOwnPropertyDescriptor：Object.getOwnPropertyDescriptor()
		10）defineProperty：Object.defineProperty()
		11）ownKeys：Object.getOwnPropertyNames()、Object.getOwmPropertySymbols()
		12）apply：调用一个函数
		13）construct：用new调用一个函数
		
	（2）示例
		//对数组的监视
		const list = []
		
		const listProxy = new Proxy(list, {
			set(target, property, value){
				console.log('set', property, value)
				target[property] = value
				return true//表示成功
			}
		})
		
		listProxy.push(100)

21、Reflect
	（1）介绍
		它属于静态类，不能new Reflect()去调用，只能调用静态类中的静态方法Reflect.get(),Reflect内部封装了一系列对对象的底层操作。
		Reflect成员方法就是Proxy处理对象的默认实现,最大的意义就是提供了统一的一套操作api的方法
	（2）示例
		const obj = {
			foo: '123',
			bar: '456'
		}
		
		const proxy = new Proxy(obj, {
			get(target, property){
				console.log('watch logic~')
				return Reflect.get(target, property)
			}
		})
		
		console.log(proxy.foo)
		
22、Promise
	（1）介绍
		在JavaScript异步编程课程中详细分析了
		
23、class类
	（1）示例
		class Person{
			constructor(name){//声明个构造函数
				this.name = name
			}
			
			say(){
				console.log('hi, my name is ${this.name}')
			}
		}
		
		const p = new Person('tom')
		p.say()
		
24、静态成员
	（1）介绍
		一般分为实例方法和静态方法，实例方法通过构造这个实例的对象去调用，静态方法直接通过类型本身去调用
		es2015中新增添加静态成员的static的关键词
	（2）示例
		class Person{
			constructor(name){//声明个构造函数
				this.name = name
			}
			
			say(){
				console.log('hi, my name is ${this.name}')
			}
			
			static create(name){
				return new Person(name)
			}
		}
		
		const tom = Person.create('tom')//静态方法调用直接用类调用其中的静态方法就行
		tom.say()
		
25、类的继承
	class Person{
		constructor(name){
			this.name = name
		}
		
		say(){
			console.log('hi, my name is ${this.name}')
		}
	}
	
	//用extends继承类
	class Student extends Person{
		constructor(name, number){
			super(name)//这里的super是继承父类的name，就是和上边的赋值方式一样
			this.number = number
		}
		
		hello(){
			super.say()//这里是继承父类的say方法，就是和上边的方法调用方式一样
			console.log('my school number is ${this.number}')
		}
	}
	
	const s = new Student('jack', '100')
	
	s.hello()
	
26、Set数据结构
	（1）示例
		const s = new Set()
		
		//set方法可以链式调用
		s.add(1).add(2).add(3).add(4)
		console.log(s)
		
		//可以for循环
		s.forEach(i => console.log(1))
		for(let i of s){
			console.log(i)
		}
		
		//查看数量
		console.log(s.size)
		
		//看是否包含
		console.log(s.has(100))
		
		//删除
		console.log(s.delete(3))
		
		//清除
		s.clear()
		console.log(s)
		
		//数组去重复
		const arr = [1, 2, 1, 3, 4, 1]
		
		const result = Arrary.from(new Set(arr))
		const result = [...new Set(arr)]
		
		console.log(result)
		
27、Map数据结构
	const obj = {}
	obj[true] = 'value'
	obj[123] = 'value'
	obj[{a: 1}] = 'value'
	
	console.log(Object.keys(obj))//这里会打印出['123', 'true', '[object Object]'],所以在对象里的数组设置键值对的形式不可以
	
	const m = new Map()
	const tom = {name: 'tom'}//设置name为tom的属性
	m.set(tom, 90)//给name为tom的属性赋值为90
	console.log(m)
	console.log(m.get(tom))//通过get获取tom的值
	
	//也可以用上边26的那些Set方法
	
28、Symbol
	（1）介绍
		以前同一个项目，可能引用俩个js里边的变量可能有一样的，为了区分会在同样名称的变量前边增加对应js文件的别名
		例如a.js的name,就叫a_js,b.js的name，就叫b_name,这种做法只是规避了问题，并没有解决问题，所以为了解决问题
		才会出现Symbol这个变量类型，标识唯一的。
		
	（2）示例
		//a.js的
		const name = Symbol()//声明一个私有变量
		const person = {//声明一个对象
			[name] : 'zce',
			say(){
				console.log(this[name])
			}
		}
		
		//b.js的
		person.say()//b.js里不能调用a.js里的私有变量，只能调用say()方法
		
29、Symbol补充
	（1）示例
		const s1 = Symbol.for('foo')
		const s2 = Symbol.for('foo')
		console.log(s1 === s2)//Symbol默认把入参处理成字符串
		
		//默认把入参处理成字符串
		console.log(
			Symbol.for(true) === Symbol.for('true')//这里会把前边的true变成字符串的true
		)
	
	    //内置api
		console.log(Symbol.iterator)
		console.log(Symbol.hasInstance)
		
		//自定义标签
		const obj = {
			[Synbol.toStringTag]: 'XObject'
		}
		console.log(obj.toString())//这里打印的toString就是obj里的toStringTag标签
		
		//不能被for循环拿到属性
		for(var key in obj){
			console.log(key)
		}
		
		console.log(Object.keys(obj))
		console.log(JSON.stringify(obj))//这里能拿到值，但是就会忽略掉Symbol属性
		
		//通过getOwnPropertySymbols获取属性
		console.log(Object.getOwnPropertySymbols(obj))
		
30、for...of循环
	（1）介绍
		1）for：遍历普通数组
		2）for...in：遍历键值对
		这些遍历方法都有局限性，所以出现了for of方法作为遍历所有数据的统一方法
	（2）示例
		//for...of循环
		const arr = [100, 200, 300, 400]
		for(const item of arr){
			console.log(item)//这里能直接打印元素
		}
		
		arr.forEach(item => {
			console.log(item)
		})
		
		//可以break
		for(const item of arr){
			console.log(item)
			if(item > 100){
				break
			}
		}
		
		//在forEach()中不能终止遍历，some()和every()可以通过返回true终止遍历
		
		//遍历Set
		const s = new Set(['foo', 'bar'])
	
		for(const item of s){
			console.log(item)
		}
		
		//遍历map
		const m = new Map()
		m.set('foo', '123')
		m.set('bar', '345')
		
		for(const [key, value] of m){//这里的[key, value]解构语法是替换了item
			console.log(key, value)//这里遍历出来的是键值对
		}
		
31、可迭代接口
	（1）介绍
		通过for...of我们发现它只能遍历一些数组，不能遍历全部类型数据，比如遍历对象就会报错
		所以es2015提供了Iterable接口，实现Iterable接口就是for...of的前提。
	（2）示例
		const arr = ['foo', 'bar', 'baz']
		//调用这个方法，会看到内部有个next()方法
		arr[Symbol.iterator]()
		//调用next()方法
		iterator.next()
		返回的是：{value: "foo", done: false}，这里的done表示这个数据是否被遍历完了。
		
32、实现可迭代接口
	（1）示例
		const obj = {//自定义对象，实现了可迭代接口，Iterable
			[Symbol.iterator]: function (){
				return {//iterator
					next: function(){//迭代接口结果：IterationResult
						value: 'zce',//当前被迭代到的数据
						done: true//迭代有没有结束
					}
				}
			}
		}
		
		//正确的
		const obj1 = {
			store: ['foo', 'bar', 'baz']
			
			[Symbol.iterator]: function(){
				let index = 0
				const self = this
				
				return{
					next: function(){
						const result = {
							value: self.store[index],
							done: index >= self.store.length
						}
						index++
						return result
					}
				}
			}
		}
		
		for(const item of obj){
			console.log('循环体', item)
		}
		
		
33、迭代器模式
	（1）示例
		//俩个人开发的代码有耦合，需要循环处理数据
		
		//我的代码
		const todos = {
			life: ['吃饭'，'睡觉', '打豆豆']，
			learn: ['语文', '数学', '外语'],
			work: ['喝茶']
			
			each: function(callback){
				const all = [].concat(this.life, this.learn, this.work)
				for(const item of all){
					callback(item)
				}
			},
			[Symbol.iterator]: function(){
				const all = [...this.life, ...this.learn, ...this.work]
				let index = 0
				return {
					next: function(){
						return{
							value: all[index],
							done: index++ >= all.length
						}
					}
				}
			}
		}
		
		//你的代码
		/* for(const item of todos.life){
			console.log(item)
		} */
		
		todos.each(function(item)){
			console.log(item)
		}
		
		conssole.log('---------------------')
		
		for(const item of todos){
			console.log(item)
		}
		
34、生成器Generator
	（1）介绍
		为了能够在复杂的异步代码中，避免异编程中回调嵌套过深的问题，提供更好的异步编程解决方案
		
	（2）示例
		function = foo(){
			console.log('zce')
			return 100
		}
		
		const result = foo()//这里没有打印zce
		console.log(result)
		//这里也没有打印100，会打印出一个Object[Generator]{},并且Generator里边也是有next方法的
		//所以对result执行下next()方法
		console.log(result.next())//这样就能打印出想要的结果了
		
		//generator正确用法
		function = foo(){
			console.log('1111')
			yield 100
			console.log('2222')
			yield 200
			console.log('3333')
			yield 300
		}
		
		const generator = foo()
		console.log(generator.next())
		
		
35、生成器应用
	（1）示例
		function = createIdMaker(){
			let id = 1
			while (true){
				yield id++
			}
		}
		
		const idMaker = createIdMaker()//生成一个生成器
		console.log(idMaker.next().value)
		
36、ES Modeules
	（1）介绍
		语言层面的模块化标准
		
37、ES2016
	（1）介绍
		仅包含俩个小功能
		1）includes
			const arr = ['foo', 1, NaN, false]
			console.log(arr.indexOf('foo'))//以前是通过indexOf来判断
			console.log(arr.includes('foo'))//现在可以通过这个方法来判断，返回true就是存在
			
		2）指数运算符	
			console.log(Math.pow(2, 10))//2是底数，10是指数
			console.log(2 ** 10)//2是底数，10是指数
			
38、ES2017
	（1）示例
		const obj = {
			foo: 'value1',
			bar: 'value2'
		}
		
		1）values：返回对象当中所有值
			console.log(Object.values(obj))
			
		2）entries：返回对象当中的键值对
			console.log(Object.entries(obj))
			for(const [key, value] of Object.entries(obj)){
				console.log(key, value)
			}
			console.log(new Map(Object.entries(obj)))//把对象转换成Map形式
			
		3）getOwnPropertyDescriptors：复制对象包括其中的属性
			const p1 = {
				firstName: 'Lei',
				lastName: 'Wang',
				get fullName(){
					return this.firstName + '' + this.lastName
				}
			}
			
			console.log(p1.fullName)//这里打印的是Lei Wang
			
			const p2 = Object.assign({}, p1)//这里是把p1复制给p2
			p2.firstName = 'zce'
			console.log(p2)//这里打印的时候，还是打印的Lei Wang，因为他把fullName当成普通的属性了
			
			//所以这里使用getOwnPropertyDescriptors
			const descriptors = Object.getOwnPropertyDescriptors(p1)
			console.log(descriptors)
			
			//这里把之前获取到的对象赋值给新的对象
			const p2 = Object.defineProperties({}, descriptors)
			p2.firstName = 'zce'
			console.log(p2.fullName)
			
		4）padStart和padEnd：给字符串开头或结尾添加占位符一类的东西
			const books = {
				html: 5,
				css: 16,
				javascript: 128
			}
			
			for(const [name, couunt] of Object.entries(books)){
				console.log('${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}')
			}

		
			
			
			
			
		
		