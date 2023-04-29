

# node中数据库操作

## 1.安装MySQL模块

MySQL模块是托管于npm上的第三方模块。它提供了在node.js项目中连接和操作MySQL数据库的能力。如果我们想要在项目中使用它，必须将MySQL模块安装为项目依赖包。

```javascript
//将MySQL模块安装为项目依赖包
npm install mysql
```

## 2.导入MySQL模块

```javascript
const mysql = require("mysql");
```

## 3.与MySQL数据库建立连接

```javascript
//与MySQL数据库建立连接
const database = mysql.createConnection({
  //MySQL的IP地址
  host: "127.0.0.1",
  //登录数据库的用户名
  user: "root",
  //登录时的密码
  password: "yydssyh123",
  //指定要操纵的是哪一个数据库
  database: "my_db_01",
});
```

## 4.测试MySQL模块是否正常工作

```javascript
//首先测试MySQL模块是否能正常工作
database.query("select 1", (err, results) => {
  //如果报错，说明工作异常
  if (err) {
    //返回错误信息
    return console.log(err.message);
  }
  //如果没报错，则执行以下代码
  //如果打印出了 [RowDataPacket {'1' : 1}] 说明MySQL模块工作正常，并且已经与数据库建立连接
  console.log(results);
});
```

## 5.对MySQL数据库上的数据进行查询

```javascript
//对my_db_01数据库中的users表进行数据的查询
const sqlStr1 = "select * from users";
//调用database.query() 函数指定要执行的SQL语句，并通过回调函数拿到结果
database.query(sqlStr, (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  //如果执行的是查询语句（select） 则执行的结果(results)是数组
  console.log(results);
});
```

## 6.对MySQL数据库上的数据进行插入

```javascript
//对my_db_01数据库中的users表进行数据的插入
const user = { username: "Tom", password: "1595994587" };
//指定要执行的SQL语句
//SQL语句中英文的? 表示占位符
const sqlStr2 = "insert into users (username,password) values (? ,?)";
database.query(sqlStr2, [user.username, user.password], (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  //如果执行的是插入语句(inert into)，则results返回的结果是一个对象
  //而results对象中有一个affectedRows 属性，用来判断数据是否插入成功
  if (results.affectedRows === 1) {
    console.log("数据插入成功");
  }
});
```

> 在向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过一下便捷方式进行数据的插入

```javascript
//数据插入的简便写法
const user = { username: "Amy", password: "7724" };
//定义要执行的SQL语句字符串
//英文的 ? 表示占位符
const sqlStr3 = "insert into users set ?";
//调用database.query()函数,执行SQL的插入语句，并返回结果
//直接将user对象当作占位符 ? 的值
database.query(sqlStr3, user, (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  //由于是查询语句，所以results返回的是一个对象
  if (results.affectedRows === 1) {
    console.log("利用简便写法，将数据插入成功");
  }
});
```

## 7.对MySQL数据库上的数据进行更新

```javascript
const user = {id:7,username:'aaaa',password:'666'};
//定义SQL的更新语句字符串
const sqlStr4 = 'uodate users set username=?,password=? where id=?';
database.query(sqlStr4,[user.username,user.password,user.id],(err,results) => {
  if(err) {
    return console.log(err.message);
  }
  if(results.affectedRows === 1) {
    console.log("数据更新成功");
  }
})
```

>更新表数据时，如果数据对象的每个属性和数据表的字段**一一对应**，则可以通过如下方式快速更新表数据：

```javascript
//更新旧数据
const user = { id: "1", username: "aaaa", password: "666" };
//定义SQL的更新语句字符串
const sqlStr5 = "update users set ? where id=?";
//执行SQL语句
database.query(sqlStr4, [user, user.id], (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  //更新语句update 返回的results也是一个对象
  if (results.affectedRows === 1) {
    console.log("数据更新成功");
  }
});
```

## 8.对MySQL数据库上的数据进行删除

```javascript
//删除id = 5 的用户
const sqlStr6 = "delete from users where id=?";
database.query(sqlStr5, 5, (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  if (results.affectedRows === 1) {
    console.log("id为5 的数据删除成功");
  }
});
```

## 9.标记删除法

> 使用delete语句时，会把数据从表中真正的删除，为了保险起见最好还是使用标记删除法。

```javascript
//标记删除法
const sqlStr6 = "update users set status=? where id=?";
database.query(sqlStr6, [1, 6], (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  if (results.affectedRows === 1) {
    console.log("标记清除成功");
  }
});
```

