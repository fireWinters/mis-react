1、TypeScript课程概述
	（1）介绍
		解决了JavaScript类型系统的问题，大大提高代码的可靠程度，主要讨论JavaScript自由类型系统的问题
		1）强类型与弱类型
		2）静态类型与动态类型
		3）JavaScript自有类型系统的问题
		4）Flow静态类型检查方案
		5）TypeScript语言规范与基本应用
		
2、类型系统
	（1）强类型与弱类型（类型安全）
		1）强类型：语言层面限制函数的实参类型必须与形参类型相同
			class Main {
				static void foo(int num){//这里的形参是int类型的
					System.out.println(num);
				}
				
				public static void main(String[] args){
					Main.foo(100);//这里就得是int类型的
					Main.foo('100');//这里是string类型的就不可以
					Main.foo(Integer.parseInt)
				}
			}
		2）弱类型：语言层面不会限制实参的类型
			function foo(num){
				console.log(num)
			}
			//下面几种调用入参类型都可以，不会报错
			foo(100)
			foo('100')
			foo(parseInt('100'))
		3）总结
			强类型语言中不允许任意的隐式类型转换，弱类型语言则允许任意的数据隐式类型转换
			变量类型允许随时改变的特点，不是强弱类型的差异
	（2）静态类型与动态类型（类型检查）
		1）静态类型
			一个变量声明时它的类型就是明确的，声明过后，它的类型就不允许再修改了
		2）动态类型
			运行阶段才能够明确变量类型，而且变量的类型可以随时发生变化
			var foo = 100//声明的时候没有规定变量类型
			foo = 'bar'//使用的时候，存储的数据是有类型的
			console.log(foo)
			
3、JavaScript类型系统特征
	（1）介绍
		没有特定类型，什么类型都可以【任性】，缺失了类型系统的可靠性【不靠谱】，早期的JavaScript应用简单，且不用编译
		所以是弱类型/动态类型，大规模应用下，这种【优势】就变成短板了。
		
4、弱类型的问题		
	（1）示例
		1）不运行不会发现问题
			const obj = {}
		
			obj.foo()//这里没有这个方法，但是这么写不报错，只有在运行阶段才会发现问题
		
			//如下调用就会报错
			setTimeout(() => {
				obj.foo()
			},10000)
		
		2）类型不明确，函数功能会发生改变
			function sum(a, b){
				return a + b
			}
		
			console.log(sum(100, 100))
			console.log(sum(100, '100'))//这里就不是计算了，返回的是俩个数据的拼接结果
	
		3）对对象索引器错误的用法
			const obj = {}
		
			obj[true] = 100//如果是强类型的这里的索引就不能用true
		
			console.log(obj['true'])
			
5、强类型的优势
	（1）介绍
		1）错误更早暴露
		2）代码更智能，编码更准确
		3）重构更牢靠
		4）减少不必要的类型判断
		
6、Flow
	（1）介绍
		JavaScript的类型检查器，只是一个小工具，不用所有变量都添加类型注解，根据自己需求添加就行
	（2）示例
		function sum(a: number, b: number){//这里的: number是类型注解
			return a + b
		}
		
		sum(100, 50)//这个不会
		sum('100', '50')//这个会报错
		
7、Flow快速上手
	（1）安装
		yarn init
		yarn add flow-bin
	（2）引用
		在代码最开始的地方添加//@flow，如果使用了这个flow就不用编辑器的代码检测工具了

8、Flow编译移除【类型注解】
	（1）介绍
		有Flow注解的代码不能通过node.js编译，因为他不是JavaScript的编码格式，所以这里要移除掉他，
	（2）示例
		yarn add flow-remove-type
		yarn flow-remove-type src -d dist//转换后的目录放在d盘的dist文件夹当中
		
		//babel安装
			1）yarn add @babel/core @babel/cli @babel/preset-flow
			2）增加一个配置文件.babelrc，里面添加{"presets": ["@babel/preset-flow"]}
			3）yarn balel src -d dist
			
9、开发工具插件
	（1）介绍
		为了在开发工具中更好的体验Flow，安装一个插件Flow Language Support
		
10、类型推断
	（1）介绍
		根据代码当中的使用情况去推断当前编码的类型
	（2）示例
		//类型推断
		//@flow
		
		function square(n){
			return n * n
		}
		
		square(100)
		square('100')//这里会报错，因为推断这个字符串的100，不能进行square方法里的乘法运算
		
11、类型注解
	（1）示例
		//对变量注解
		//@flow
		function square(n: number){
			return n * n
		}
		
		let num: number = 100
		
		//对函数注解
		function foo(): number{
			return 100//这里只能返回数字类型
		}
		
12、原始类型
	（1）介绍
		//字符串类型
		1）const a: string = 'foobar'
		
		//数字类型
		2）const b: number = Infinity // NaN // 100
		
		//布尔类型
		3）const c: boolean = false // true
		
		//null
		4）const d: null = null
		
		//undefiend
		5）const e: void = undefined//未定义要用void
		
		//Symbol
		6）const f: symbol = Symbol()
		
13、数组类型
	（1）示例
		/*
		 * 数组类型
		 * @flow
		 */
		
		const arr1: Array<number> = [1, 2, 3]//这里表示全部由数字组成的数组
		
		const arr2: number[] = [1, 2, 3]
		
		//元祖
		const foo: [string, number] = ['foo', 100]//返回固定长度的数组，就叫做元祖，并且元素类型要与赋值的一样
		
14、对象类型
	（1）示例
		/*
		 * 对象类型
		 * @flow
		 */
	
		const obj1: {foo: string, bar: number} = {foo: 'string', bar: 100}
	
		const obj2: {foo?: string, bar: number} = {bar: 100}//这里foo?带问号的属性就是可有可无的
	
		const obj3 = {[string]: string} = {}//“[]”方括号里的是键，“:”这后边的是值
		obj3.key1 = 'value1'
		obj3.key2 = 100
	
15、函数的类型
	（1）示例
		/*
		 * 函数类型
		 * @flow
		 */
	
		function foo(callback: (string, number) => void){//入参类型，一个是字符串，一个是数字，返回结果是void说明没有返回值
			callback('string', 100)
		}
		
		foo(function(str, n){
			/* str => string
			n => number */
		})
	
16、特殊类型
	（1）示例
		/*
		 * 特殊类型
		 * @flow
		 */
	
		const a: 'foo' = 'foo'//这种规定了a的类型是字符串foo,那么选别的就会报错
		
		//联合用法
		const type: 'success' | 'warning' | 'danger' = 'success'//这里就是自变量类型，只能从这三个里边选一个
		
		//别名用法
		type StringOrNumber = string | number
		const b: StringOrNumber = 'string' //100
		
		//mybe类型
		const gender: ?number = undefined//这里的?number，就是可以是数字类型，也可以是未定
		const gender: number | null | void = undefined//对上边类型的分解
	
17、Mixed Any
	（1）示例
		/*
		 * Mixed Any
		 * @flow
		 */
		
		//string | number | boolean | ...，这个mixed代表全部类型
		function passMixed(value: mixed){
			valou.substr(1)//这里会报错，因为这里的value是数字类型，不能使用字符串类型的substr()方法
		}
		
		passMixed('string')
		passMixed(100)
		
		//Any和Mixed一样，只不是Any是弱类型的
		function passAny(value: any){
			valou.substr(1)//这里不会报错，所以是any是弱类型的
		}
		
		passAny('string')
		passAny(100)
		
	（2）总结
		尽量不要使用any，除非是为了兼容老代码，因为老代码都是弱类型的
		
18、类型小结
	（1）介绍
		1）官方api
			https://flow.org/en/docs/types/
		2）第三方api
			https://www.saltycrane.com/cheat-sheets/flow-type/latest/
			
19、Flow运行环境api
	（1）介绍
		https://github.com/facebook/flow/blob/master/lib/core.js
		https://github.com/facebook/flow/blob/master/lib/dom.js
		https://github.com/facebook/flow/blob/master/lib/bom.js
		https://github.com/facebook/flow/blob/master/lib/cssom.js
		https://github.com/facebook/flow/blob/master/lib/node.js