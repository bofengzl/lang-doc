---
outline: deep
---

# Vue2

讲解 Vue2 部分常用知识点，Git 使用方法

## watch 监听

---

```js
//基本的数据类型可以使用watch直接监听，复杂的数据类型 Object / Array 则需要深度监听
new Vue({
  el: '#app',
  data: {
    msg: '',
    sous: [{ name: 'jack' }]
  },
  watch: {
    // key是属于data对象的属性名 value:监视后的行为
    //newV :新值   oldV:旧值
    msg: function (newV, oldV) {
      console.log(newV, oldV)
    },
    //深度监视: Object / Array
    sous: {
      deep: true, //ture 深度监视
      handler: function (newV, oldV) {
        console.log(newV[0].name)
      }
    }
  }
})
```

> 更多 watch 的相关配置：https://www.cnblogs.com/whx123/p/12122732.html

## 计算属性（Computed）

---

```js
//getter方法  默认的
//html部分代码
;<div id="app">{{ reverseMsg }}</div>
//script部分代码
new Vue({
  el: '#app',
  data: {
    msg: 'hello world'
  },
  computed: {
    //computed 默认只有getter方法
    //计算属性的有点:能够产生缓存,如果值没有发生变化，则直接从缓存中区
    reverseMsg: function () {
      return this.msg.spit('').reverse().join('')
    }
  }
})
```

```js
//setter方法
//HTML部分
<div id="app">
    {{content}}
	<input v-model="content" @input="handleInput" />
<div>
//SCRIPT部分
 new Vue({
    el:'#app',
    data:{
        msg:''
    },
    methods:{
        handleInput(event){
           const {value} = event.target;
            this.content = value;
        }
    }
    computed:{
        //computed setter方法
        content:{
            set:function(newV){
        		console.log(newV)
                this.msg = newV
            },
            get:function(){
               return this.msg
            }
        }
    }
})
```

## 过滤器（Filters）

---

```js
//HTML部分
<div id="app">
     <h3>{{price | myPrice}}</h3>
     <h3>{{price | myPrice1('￥')}}</h3>
<h3>{{msg|myReverse}}</h3>
<div>
//script部分

//创建全局过滤器
 Vue.filter('myReverse',funciton(val){
     return val.split('').reverse().join('')
 })
new Vue({
    el:'#app',
    data:{
        price:10,
        msg:'hello 过滤器'
    },
    // 局部过滤器
    filters:{
        myPrice:function(price){
            return '$' + price
        },
        myPrice1:function(price,val){
            return val + price
        }
    }


})
```

## for .... of 循环遍历

---

> 参考网址 ①：https://blog.csdn.net/w390058785/article/details/80522383
>
> 参考网址 ②：https://www.cnblogs.com/m2maomao/p/7743143.html

## 组件之间的传值其他方式

---

```js
//html部分
<div>
    <!-- 3.使用组件 -->
	<App></App>
 </div>

//script部分
//provide,inject
//父组件 provide来提供变量，然后子组件中通过inject来注入变量无论组件嵌套多深，都不会影响
//Vue.component('',{})  全局注册组件
Vue.component('B',{
    data(){
        return{

        }
    },
    //inject
    inject:['msg'],
    created(){
        console.log(this.msg)
	},
    template:`
		<div>{{msg}}</div>
	`
})
Vue.component('A',{
    data(){
        return{

        }
    },
    created(){
        //this.$parent 可以直接获取到父组件data的值
        //this.$parent.$parent.....  可以获取到 父组件的父组件....的data值
        console.log(this.$parent.title)
        //this.$children 数组形式 可以获取到子组件的。。。。
        console.log(this.$children)
	},
    template:`
		<div>
			<B></B>
		</div>
	`
})
//1.创建组件
const App = {
  data(){
      return{
          title:'老爹'
      }
  },
   // provide  父组件给子组件
   provide(){
       return{
           msg:'老爹的数据'
       }
   },
    template:`
		<div>
			<A></A>
		</div>
	`
}
new Vue({
    el:'#app',
    data:{

    },
    //2.注册组件
    components:{
        App
    }

})
```

## 插槽（slot）

---

```js
//匿名插槽

Vue.component('MBtn', {
  template: `
		<button>
			<slot></slot>
		</botton>
	`
})
const App = {
  data() {
    return {
      title: '老爹'
    }
  },
  template: `
		<div>
			<MBtn>登入</MBtn>
			<MBtn>注册</MBtn>
		</div>
	`
}
new Vue({
  el: '#app',
  data: {},
  components: {
    App
  }
})
```

```js
//具名插槽: 只要匹配到slot标签中的name值 template中的内容就会插入到这个插槽中
Vue.component('MBtn', {
  template: `
		<button>
			<slot name='login'></slot>
			<slot name='submit'></slot>
			<slot name='register'></slot>
		</botton>
	`
})
const App = {
  data() {
    return {
      title: '老爹'
    }
  },
  template: `
		<div>
			<MBtn>
				<template v-slot:'login'>
					登入
				</template>
			</MBtn>
			<MBtn>
				<template v-slot:'submit'>
					提交
				</template>
			</MBtn>
			<MBtn>
				<template v-slot:'login'>
					注册
				</template>
			</MBtn>
		</div>
	`
}
new Vue({
  el: '#app',
  data: {},
  components: {
    App
  }
})
```

```js
//作用域插槽
//使用场景：不影响当前组件的情况下 新增需求

把数据绑定在插槽上
 <slot v-bind:user="user">
    {{ user.lastName }}
 </slot>

在应用时  使用插槽带的值
<current-user>
  <template v-slot="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

## 生命周期

> 参考网址：https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA
>
> 相关 API：https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90

## 异步组件

```js
//分离出去Test组件  用js文件保存
//Test.js 文件
exprot default{
	data(){
        retutn{
          msg:'test组件[异步加载组件]'
        }
    },
    template:`
	<h3>{{msg}}</h3>
`
}

//主页面
//注意 <script></script> 改成 <script type="module"></script>
//script内容
const App={
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        asyncload(){
            this.isShow = !this.isShow
        }
    },
    components:{
        // './Test.js' 文件路径
        //工厂函数
        Test()=>import('./Test.js)
    },
    template:`
		<div>
			<button @click="asyncload">
				加载Test
			</botton>
			<Test v-if='isShow'></Test>
		</div>
	`
}
new Vue({
    el:'#app',
    data:{

    },
    components:{
        App
    }

})
```

> 异步加载：点击 "加载 Test" 才加载 Test.js 文件 否则不加载

## ref 使用

---

```js
//引入Test组件
import Test from './Test'

const App = {
  data() {
    return {}
  },
  //挂在
  mounted() {
    //1.如果给标签添加ref，获取的就是真实的DOM节点
    //2.如果给的是组件加ref,获取的是当前子组件对象
    console.log(this.$refs.btn)
    console.log(this.$refs.test)
    // 进入页面 自动获取焦点
    this.$refs.input.focus()
  },
  methods: {},
  components: {
    Test
  },
  template: `
		<div>
			<button ref="btn">加载Test</button>
			<Test ref="test"></Test>
			<input type="text" ref="input" />
		</div>
	`
}
new Vue({
  el: '#app',
  data: {},
  components: {
    App
  }
})
```

> ref 的更多用法：https://www.cnblogs.com/goloving/p/9404099.html

## nextTick 使用

```js
//html
//script部分
const vm = new Vue({
  el: 'app',
  data: {
    message: '小姐姐'
  }
})
vm.message = 'new Message'
//页面虽然更新 但是获取不到
console.log(vm.$el.textContent)
//使用this.$nextTick() 在下一次获取,即可获取
Vue.nextTick(() => {
  console.log(vm.$el.textContent)
})
```

> nextTick:为了数据变化之后等待 vue 完成更新 DOM,可以在数据变化之后立即使用 Vue.nextTick 在当前回调函数中获取最新的 DOM

## 对象检测变更$set()

---

```js
//vue 不能检测对象属性的添加删除
new Vue({
    el:'app',
    data:{
        user:{}
    },
    methods:{
      handlerAdd(){
         //添加不上去的
         this.user.age =20
         //需要使用 Vue.$set(object,key,value)添加响应式属性  就会渲染出来
         this.$set(this.user,'age',20)
        // 添加多个响应式属性  可以用es6里面的Object,assign()
         this.user = Object.assign({},this.user,{
             age:20,
             phone:'1123123123',
             ....
         })
      }
    },
    created(){
        setTimeout(()=>{
          this.user ={
              name:'小姐姐'
          }
        },2000)
    }
})
```

## mixin 混入

---

```js
//html部分
;<div>{{ msg }}</div>
//scrpit 部分
const myMixin = {
  data() {
    return {
      msg: '123'
    }
  },
  created() {
    this.sayHello()
  },
  methods: {
    sayHello() {
      conosle.log('hellow mixin')
    }
  }
}
//mixin 来分发Vue组件中的可复用功能
new Vue({
  el: 'app',
  data: {
    title: '小姐细'
  },
  mixins: [myMixin]
})
```

> vue-cli(2,0x)使用：https://blog.csdn.net/m0_38134431/article/details/83783463

### vue 其他知识

---

## 动态绑定 ref

```js
//index 变量
<div :ref="`content${index}`"></div>

//获取ref
this.$refs[`content${index}`]
```

## vue3.0

### 全局安装 vue-cli3.0 脚手架

---

> 卸载： 如果安装了旧版本的 vue-cli(1x 或 2x),需要先卸载：npm uninstall vue-cli -g
>
> 安装：npm install -g @vue/cli
>
> 查看版本号： vue -v,出现版本号 即安装成功
>
> 3.0 对 2.0 版本的桥接：npm install -g@vue/cli-init

### 安装淘宝镜像 cnpm(非必装，网络慢情况可安装)

> npm install -g cnpm --registry=https://registry.npm.taobao.org

### Git 基础命令

::: tip 学习地址
https://git-scm.com/book/zh/v2
:::

::: details 命令

- 基础

```shell
拷贝项目：git clone <仓库地址>
拷贝指定分支： git clone -b < 指定分支>  <仓库地址>
创建分支：git branch <name>
创建并进入分支：git checkout -b <name>
分支建立好了情况下切换：git checkout <name>
查看状态：git status
添加所有文件： git add .
提交 ： git commit -m '这里是提交的描述'
拉取：git pull
推送： git push
查看分支：git branch --list
查看分支（包含远程分支）：git branch -a
```

- 分支管理

```shell
master：主分支，一般不会在此分支开发项目
dev:  开发分支。一般在此分支上开发
版本分支：建立在dev分支下
```

- feature-VueAdmin-V1.0.0-20190919：分支完整名称

```shell
feature：描述当前分支类型（需求）
vueAdmin:项目名称
V1.0.0：版本号
20190919：创建分支时间
```

- BUG 分支:建立在当前版本分支下

```shell
bug-101241-20191020：bug完整名称
bug：类型(bug)
101241：bug的ID
20191020：建立分支日期
```

:::

### Git 拉取完整步骤

::: details 命令

- 方式一

```shell
打开Git Bash
在Git Bash 中输入 git init 进行初始化
与远程代码仓库建立连接：git remote add origin 代码仓库地址
将远程分支拉到本地：git fetch origin dev（dev即分支名）
创建本地分支：git checkout -b LocalDev origin/dev (LocalDev 为本地分支名，dev为远程分支名)
根据分支的变化，感觉这条指令可能是创建并切换到该分支
最后一步将远程分支拉取到本地：git pull origin dev（dev为远程分支名）

其他方式：https://www.jianshu.com/p/856ce249ed78
```
:::

## vue3.0 项目构建

---

```js
//1.构建项目
vue create vue-admin

//注意  如果出现无法加载C:/...文件，因为再次系统上禁止运行脚本
//解决方法
//第一步: 用管理员身份打开: Windows PowerShell
//第二部: 执行：set-ExecutionPolicy RemoteSigned  选择Y或者A,回车即可

```

## vue3.0 与 vue2.0 区别

---

<img src="C:\Users\氧气萌主\AppData\Roaming\Typora\typora-user-images\image-20210305154026329.png" alt="image-20210305154026329" style="zoom: 200%;" />

> 1.  去除了 static、config、bulid
> 2.  新增了 public
> 3.  自动依赖 node modules
> 4.  默认配置 webpack 通过 vue.config.js 修改
> 5.  vue inspect 可查看 webpack 默认配置
> 6.  内置了 vue-cli-service serve 服务
> 7.  浏览器打开图形界面 vue ui 查看
> 8.  vue.config.js 配置手册：[https://cli.vuejs.org/zh/config/]

## vue.config.js 常规配置

```js
const path = require('path')
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: config => {
    //symbol 引入图标配置
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        include: ['./src/icons']
      })
  },
  configureWebpack: config => {
    config.resolve = {
      // 配置解析别名
      extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
      alias: {
        vue: 'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components')
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      //scss 引入主入口文件
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
    // requireModuleExtension: false
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      [process.env.VUE_APP_API]: {
        target: 'http://www.web-jshtml.cn/productapi/token', //API服务器的地址  http://www.web-jshtml.cn/api
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API]: '' // es5
          // [`^${process.env.VUE_APP_API}`]: '' //es6
        }
      }
    },
    overlay: {
      // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    before: app => {}
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}
```

## vue3.0 最新进展，composition API

---

> 依赖：npm install @vue/compition-api --save
>
> main.js:
>
> import VueCompostitionApi from '@vue/composition-api';
>
> Vue.use(VueCompostitionApi);

### 新特新

> 讲解网址：https://www.bilibili.com/video/BV1zJ411g7Fx?p=7

```js

/*
**setup函数
**新的vue组件选项，用于组件中使用Composition API的入口
*/
export default{
    context.attrs
    context.slots
    context.parent
    context.root
    context.emit
    context.refs
    ....
}
/*
**Reactive函数(数组,对象类型，声明单一对象时使用)
**取得一个对象并返回原始对象的响应数据处理
*/
const obj = reactive({count:0})
/*
**ref(声明基础数据类型变量时使用)
**内部值并返回一个响应性且可变的ref对象。ref对象具有，value指向内部值得单一属性
*/
const number = ref(0);
//获取值得方式:number.value
/*
**isRef和toRefs
**检查一个对象是否是ref对象
*/
const unwrapped = isRef(foo)?foo.value :foo;
--------
function user(){
    const pos =reactive({
        x:0,
        y:0
    });
    return toRefs(pos)
}
const {x,y} = user()
//toRefs将reactive对象转换为普通对象，保证对选哪个解构和拓展运算符 “不会丢失” 原有的响应式对象的响应
.......
```

## 拓展

```
