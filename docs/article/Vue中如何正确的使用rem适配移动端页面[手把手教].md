# Vue中如何正确的使用rem适配移动端页面[手把手教]
## rem介绍
rem（font size of the root element）是指相对于根元素的字体大小的单位

## 使用方法
```css
/*浏览器中html font-size默认值为16px,1rem=16px*/
#div{
  width: 3rem; /*48px*/
  height: 3rem; /*48px*/
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/0b7d2e8f8b99434494ea3706a20ba12d.png#pic_center)
因此只要计算html的font-size rem能等比例适配所有分辨率屏幕 [(rem的俩种计算方式JS与CSS)](https://blog.csdn.net/qq_30378295/article/details/115427533)

## 进入主题
- 计算尺寸参照的标准尺寸 750px
- rem布局换算1rem=100px，设计图上100px=1rem来表示

```css
html {
    font-size: calc(100vw / 7.5);
    // or
    font-size: 13.33333vw;
}
```
###### 步骤如下(css版)

```javascript
// 创建项目跳过
vue create project-name
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/18768f03b6cc4a0eaef66d0c2016d5a5.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMzc4Mjk1,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7c119de828994ccda7acc957839be4cc.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMzc4Mjk1,size_16,color_FFFFFF,t_70#pic_center)


预览下 噔噔~~
![在这里插入图片描述](https://img-blog.csdnimg.cn/524ba8c1d09c4c31b72441f067db28a0.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMzc4Mjk1,size_16,color_FFFFFF,t_70#pic_center)
更加直观iphone5，6，6 plus
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b3e7c30aa424c11ad75ef8cd483695a.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMzc4Mjk1,size_16,color_FFFFFF,t_70#pic_center)

## 使用工具px转换rem
在开发中不会直接写rem单位，设计稿上的是px所以需要px转换rem，[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
### Install
```javascript
npm install postcss postcss-pxtorem --save-dev
```

## PostCSS 示例配置
postcss.config.js中加入在此配置，也可以在基础上根据项目需求进行修改。
```javascript
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // html不需要转换
            selectorBlackList:['html'],
            rootValue: 100,
            propList: ['*']
        },
    },
};
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/472c3649c85c412e89e756676cb10a23.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwMzc4Mjk1,size_16,color_FFFFFF,t_70#pic_center)

## 最后的最后
- 使用css calc()计算rem替代JS计算，并且一行代码实现
- 推荐用css方式，JS在移动端手机性能低的情况有几率会导致重绘