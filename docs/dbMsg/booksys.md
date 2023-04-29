# 图书管理


> **本系统使用的技术：**
>
> 1.  HTML  2.  CSS  3.  JavaScript  4.  最新版`Bootstrap 5 `前端开发框架   5.  最新版`jQuery v3.6.1 `的JavaScript框架6.Ajax

## 1.HTML的头部（head）部分

```html
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>图书管理(2.0)</title>
      <!-- 此处引入的是最新版`Bootstrap 5 `前端开发框架 -->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
     <!-- 此处引入的是最新版`jQuery v3.6.1 `的JavaScript框架 -->
    <script src="js/jQuery.min.js"></script>
</head>
```

[最新版`Bootstrap 5 `前端开发框架下载地址](https://v5.bootcss.com/)

[最新版`jQuery v3.6.1 `的JavaScript框架下载地址](https://code.jquery.com/jquery-3.6.1.min.js)

## 2.头部导航框架

```html
<!-- 头部框架Star -->
 <nav style="--bs-breadcrumb-divider: ''" aria-label="breadcrumb">
   <ol class="breadcrumb">
     <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
     <li class="breadcrumb-item active" aria-current="page">添加图书</li>
   </ol>
 </nav>
 <!-- 头部框架End  -->
```

## 3.表单头框架

```html
<!-- 表单框架Star -->
<form class="row row-cols-lg-auto g-3 align-items-center">
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormInputGroupUsername"
      >Bookname</label
    >
    <div class="input-group">
      <div class="input-group-text">书名</div>
      <input
        type="text"
        class="form-control"
        id="iptBookname"
        placeholder="请输入书名"
      />
    </div>
  </div>
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormInputGroupUsername"
      >Authername</label
    >
    <div class="input-group">
      <div class="input-group-text">作者</div>
      <input
        type="text"
        class="form-control"
        id="iptAuthor"
        placeholder="请输入作者"
      />
    </div>
  </div>
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormInputGroupUsername"
      >Publishername</label
    >
    <div class="input-group">
      <div class="input-group-text">出版社</div>
      <input
        type="text"
        class="form-control"
        id="iptPublisher"
        placeholder="请输入出版社"
      />
    </div>
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-primary" id="btnAdd">
      添加图书
    </button>
  </div>
</form>
<!-- 表单框架End -->
```

## 4.表格内容主体部分

```html
<!-- 内容部分Star -->
<table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">书名</th>
      <th scope="col">作者</th>
      <th scope="col">出版社</th>
      <th scope="col">操作</th>
    </tr>
  </thead>
  <tbody id="tb">
    <!-- <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
    </tr> -->
  </tbody>
</table>
<!-- 内容部分End -->
```

## 5.数据的渲染

```javascript
  function getBooklist() {
          //对服务器发出get请求
          $.get("http://www.liulongbin.top:3006/api/getbooks", function (res) {
            //res是个对象
            //这是一个载入成功的回调函数
            if (res.status != 200) {
              return alert("请求数据失败！");
            }
            //声名一个arr空数组
            let arr = [];
            //用jQuery对象的each（）方法遍历数组对象
            //每一次遍历得到的都是一个对象
            $.each(res.data, function (index, item) {
              //用数组当中的push()方法为空数组追加元素
              arr.push(
                `<tr><th scope="row">${item.id}</th><td>${item.bookname}</td><td>${item.author}</td><td>${item.publisher}</td><td><a href="javascript:;" class="del" data-id=${item.id}>删除</a></td></tr>`
                //注意模板字符串之间是没有回车换行的！！！！
              );
            });
        //利用jQuery对象当中的qppend()方法将数据动态添加到<tbody></tbody>中
       //append（）里面的参数应该是字符串（所以用数组的join("")方法将数组转换为字符串并用空格隔开），而且append可以识别标签
            $("#tb").empty().append(arr.join(""));
          });
        }
```

> `注意：`当用户一打开页面时就要渲染页面（数据），所以应首先调用数据渲染函数 `getBooklist()`  
>
> 渲染函数有函数提升，所以此处不用担心先调用后声名会报错的现象。

## 6.图书删除功能

```javascript
 //提供图书删除功能
 //因为数据是动态数据，给动态数据添加事件只能用事件委托
 //利用事件委托为删除的a链接添加点击事件
 $("tbody").on("click", ".del", function () {
   //这里的this 指向了a
   let aid = $(this).attr("data-id");
   //利用get()方法获取删除接口数据
   $.get(
     "http://www.liulongbin.top:3006/api/delbook",
     { id: aid },
     function (res) {
       //判断状态码是否删除成功
       if (res.status != 200) {
         return alert("抱歉吊毛，图书删除失败了~");
       }
       //删除结束后，重新渲染删除后的页面
       //注意：前三个id号由于没有给予用户权限，所以用户无法强制删除
       getBooklist();
     }
   );
 });
```

## 7.图书添加功能

```javascript
  //为用户给予图书添加功能
 $("#btnAdd").on("click", function () {
   //为了防止用户输入非法空格，使用 trim()是清除字符串的空格
   let bookname = $("#iptBookname").val().trim();
   let author = $("#iptAuthor").val().trim();
   let publisher = $("#iptPublisher").val().trim();
   //判断用户是否在文本框中是否输入的都是空格
   if (
     bookname.length <= 0 ||
     author.length <= 0 ||
     publisher.length <= 0
   ) {
     return alert("你个吊毛，请输入正确的图书信息！！");
   }
   //数据验证合法后，使用post（）方法提交更新的数据
   $.post(
     "http://www.liulongbin.top:3006/api/addbook",
     { bookname: bookname, author: author, publisher: publisher },
     function (res) {
       //判断状态码是否正确
       if (res.status != 201) {
         return alert("呀！出现问题了~~");
       }
       //添加完数据后重新渲染页面
       getBooklist();
       //渲染结束后清空输入框
       $("#iptBookname").val("");
       $("#iptAuthor").val("");
       $("#iptPublisher").val("");
     }
   );
 });
```

## 8.关于业务逻辑代码的使用说明

```javascript
//所有的业务逻辑代码一律放在jQuery的入口函数当中
$(function () {
  //业务逻辑代码块
});

//或者
$(document).ready(function () {
  //业务逻辑代码块
});
```

