vue 渐进式js框架,只注重视图层,结合HTML+CSS+JS,易用,有很好的生态系统,体积小,速度快,优化到位
虚拟dom
改变内容
    插值表达式
    函数调用
    虚拟dom和diff算法 //TODO
改变样式
    内部引用:
    给html元素的class属性绑定vue中的属性值 样式的动态绑定
    computed 返回多个键值对
    双向绑定 改变vue中的属性
    多个数组表示
    内嵌引入:
    style设置
    computed

MVVM模式的实现 双向数据绑定
视图与数据之间的连接

cdn 内容分发网络 在全世界各地建立内容分发服务器 中心服务器
引入工程内的 引入外部网络提供的js文件

官方cdn
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

dom listeners 监听器 model
dom bindings 绑定 view
不允许数据和视图直接通信 viewModel是内置一个观察者observer
观察者观察两个维度 观察视图变化 通知数据 观察数据变化 通知试图
MVVM通过VM实现双向数据绑定

AngularJS ReactJS 微信小程序

移动有限 模块化 虚拟dom
开源 社区活跃度高 生态环境好
组件化 独立可交互区域

html:(被vue绑定)
插值表达式
<div id="app">
{{data}}
</div>
js:
可以理解为json格式的对象,多个键值对
el:id选择器选择一个元素
data:数据
<script>
new Vue({
el:'#app'
});
</script>

插值表达式
{{数组 [, , , ,][0]}}
{{json对象}}
{{方法名称()}}
{{data名称}}
不能写在html的标签中

v-model 双向数据绑定
v-on => @ 事件的绑定 @click @mouseover @keyup 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。
v-bind =>: 属性的绑定
v-once 该标签中的插值表达式只获取一次数据
v-html
v-text

获取数据
event.target.value
this.

事件 获取事件 v-on @
事件的参数传递
    设参 传参 接参
事件修饰符
    @事件类型
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>

不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>

计算属性 computed 将计算的结果缓存 提高效率
监控属性 watched newValue oldValue

样式的动态绑定
 <div v-bind:class="{red:temp}" class="myDiv"  @click="changeColor"></div>
 data:{
             temp:false
         }
 给html元素的class属性绑定vue中的属性值 样式的动态绑定
     computed 返回多个键值对
     双向绑定 改变vue中的属性
     多个组合用数组:class="[...,...]"

json对象的键不能有-

普通的js操作
将HTML转变为dom树
找到元素
修改DOM树上的节点

Vue核心 高效
虚拟dom和diff算法
直接修改虚拟DOM
diff算法计算出区别,只修改区别

分支语句
v-if
v-else
v-else-if

v-show display 效率更高

template
    配合v-if 多个元素一起出现或消失 v-show无响应

循环语句
v-for vue中循环的关键字
    (a,i) in args :key='i'
    值,键
    (v,k,i) in student
    值,键,索引

vue实例(对象)
实例属性 .$
ref 相当于id ref=
this.$refs[" "]
vue动态绑定 mount 页面的元素和vue对象
v2.$mount("#app")

vue组件
注册
    全局注册 Vue.component("组件名",{vue对象})
        在被vue绑定了的html元素中才能使用组件
        vue对象实例属性有所区别,必须套根元素<div></div>
        data:function(){
        return{
        键值对: ,}
        }
    本地注册
            const model2={
                template:"<div><button type='button' @click='btnFn()'>点我2</button> </div>",
                methods:{
                    btnFn:function () {
                        alert("")
                    }
                }
                  new Vue({
                        el:"#app",
                        components:{
                            "model2":model2
                        }
                    })

生命周期
    钩子函数
    1. 初始化时间和生命周期 init events&lifecycle
    2. beforeCreate
        实例初始化之后，
        数据观测 (data observer) (event/watcher)之前
    3. 初始化注入 init injections & reactivity
    4. created
        在实例创建完成后
        在这一步，实例已完成以下的配置：
        数据观测 (data observer)，
        property 和方法的运算，
        watch/event 事件回调
        然而，挂载阶段还没开始，$el property 目前尚不可用。
    5. 有没有 el?
        没有就调用 vm.$mount(el) 挂载模板
        有el 有没有template?
            编译模板
            没有 Compile el's outerHTML as template
            有 Compile template into render function
            把data对象里面的数据和vue语法声明的模板编译成浏览器可读的HTML
    6. beforeMount
        将编译完成的HTML挂载到对应虚拟dom时触发
        在挂载开始之前被调用：
        相关的render函数首次被调用。
        该钩子在服务器端渲染期间不被调用。
        此时页面并没有内容
    7. 将编译好的HTML替换掉el属性所指向的dom
    8. mounted
        实例被挂载后调用,即编译好的HTML挂载到页面完成后执行,
        一般会进行数据的初始化,
        在整个实例中只执行一次
        如果根实例挂载到了一个文档内的元素上，
        当 mounted 被调用时 vm.$el 也在文档内。
        mounted 不会保证所有的子组件也都一起被挂载。
        如果你希望等到整个视图都渲染完毕，
        可以在 mounted 内部使用 vm.$nextTick：
            mounted: function () {
                this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
                })
            }
        tip:(该钩子在服务器端渲染期间不被调用)
    9. 实时监控数据变化并随之更新DOM
    10. 当数据更新
        beforeUpdate
        数据更新时调用，发生在虚拟 DOM 打补丁之前。
        这里适合在更新之前访问现有的 DOM，
        比如手动移除已添加的事件监听器。
        该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
        updated
        由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
        当这个钩子被调用时，组件 DOM 已经更新，
        所以你现在可以执行依赖于 DOM 的操作。
        然而在大多数情况下，你应该避免在此期间更改状态。
        如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
        注意 updated 不会保证所有的子组件也都一起被重绘。
        如果你希望等到整个视图都重绘完毕，
        可以在 updated 里使用 vm.$nextTick：
            updated: function () {
                this.$nextTick(function () {
                    // Code that will run only after the
                    // entire view has been re-rendered
                })
            }
        该钩子在服务器端渲染期间不被调用。
    11. beforeDestroy
       实例销毁之前调用。在这一步，实例仍然完全可用。
       该钩子在服务器端渲染期间不被调用。
    12.
       destroyed
       实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
       该钩子在服务器端渲染期间不被调用。

activated
被 keep-alive 缓存的组件激活时调用。
该钩子在服务器端渲染期间不被调用。
构建组件 - keep-alive
动态组件 - keep-alive
deactivated
被 keep-alive 缓存的组件停用时调用。
该钩子在服务器端渲染期间不被调用。
构建组件 - keep-alive
动态组件 - keep-alive
errorCaptured
2.5.0+ 新增
类型：(err: Error, vm: Component, info: string) => ?boolean
当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
你可以在此钩子中修改组件的状态。因此在捕获错误时，在模板或渲染函数中有一个条件判断来绕过其它内容就很重要；不然该组件可能会进入一个无限的渲染循环。
错误传播规则
默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一分析服务的地方进行汇报。
如果一个组件的继承或父级从属链路中存在多个 errorCaptured 钩子，则它们将会被相同错误逐个唤起。
如果此 errorCaptured 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 config.errorHandler。
一个 errorCaptured 钩子能够返回 false 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 errorCaptured 钩子和全局的 config.errorHandler。

vue cli脚手架
node.js js在服务端 node -v npm install vue-cli -g 全局安装
mkdir vue-pay
cd vue-pay
vue list  列出官方提供的骨架
vue init webpack vue-pay

项目结构 
index.html 无论有多复杂 都是那么多行
main.js 导入App.vue组件 绑定vue
App.vue 以.vue为扩展名的内容(文件)实际上就是一个Vue对象 
    Vue插件
Vue文件的组成部分
全局注册 
本地注册 
各组件的参数传递
父传子 :title="msg" props
子传父 @           $emit

vue发送ajax请求
vue是视图层框架 不需要ajax的通信功能 防止污染
npm install --save axios vue-axios
npm install vue bootstrap-vue bootstrap
npm i element-ui -S
npm install babel-plugin-component -D
npm install axios --save-dev

跨域问题
浏览器进行ajax请求 浏览器对js的安全限制 
同源策略 域名 协议 端口 完全相同
    CORS 跨资源共享 W3C标准 发出AJAX请求 
        配置spring-mvc.xml
    JSONP
    Nginx反向代理

路由 
在数据通信时,选择通信的路线->在vue中的路由实现其他组件的相互切换
交换机通过路由 交换机只能在同一个网段内
路由模块 路由视图 路由跳转 
1. 路由模块与依赖的安装
npm install vue-router -s
npm install
2. 设计路由界面npm
3. 创建静态路由表
    /src/router.js
4. 在main.js中使用路由模块以及注册路由表
        把router实例放入vue实例中
5. 创建路由链接和路由视图 

路由之间的参数传递
设参 通过路由表 /:id 设置的参数 
    起始vue
    <router-link to="路径/id"></router-link>
传参

接参
    $route.params.mid
    在目标vue中
    data(){
        return {
        id: this.$route.params.id
        }
    }
    <router-link :to="{name:'proInfo',params:{id:1}}">商品信息</router-link>
        <router-link to="{/proInfo/1">商品信息</router-link>
        /proInfo/:id
路由之间的跳转 
    1.<router-link to="路径"></router-link>
    2.标签里面写 :index="路径"
    3.js this.$router.push("路径")
    
嵌套路由 子路由 
    静态路由表里配置
    使用

路由重定向 
    redirect:'/proInfo/0'
路由钩子函数
export default {
name: "ProInfo",
  beforeRouteEnter:(to,from,next)=>{
  console.log("准备进入商品信息页");
  next(
    console.log("进入到目标页面之后调用的函数")
  );
  },
  beforeRouteLeave:(to,from,next)=>{
    console.log("准备离开商品信息页");
    next(
      console.log("离开后")
    );
  }
}
   
vue中组件样式表的作用范围
    当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。
   
资源的打包

开发一个vue项目标准的步骤 
    1)vue-cli拉取项目骨架
    2)安装依赖
    3)npm run dev 开发者模式 各种修改都有实时效果 由vue-cli进行打包发布
    4)开发结束后 手动部署在自己的服务器上npm run build
                        .dist/build.js

Mock数据
    easyMock
    
vue-element-admin
https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84
dashboard 控制台