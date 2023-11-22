# Vue2

讲解Vue2部分常用知识点，Git使用方法
## watch 监听

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
