const express =require("express")
const app = express();
const multer = require("multer")//用于文件上传

const port = 8080

//开放跨域请求
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    else next();
});
app.use(express.json())//?引入JSON用于前后端交互(注意位置之前出过错)
//当客户端发送带有 JSON 格式数据的 POST 请求时，该中间件会将请求体中的 JSON 数据解析成 JavaScript 对象，并将其作为 req.body 对象的属性，以供后续的路由处理程序使用。
const update = multer({
    dest: "./public/upload/temp"
})//上传目录
app.use(update.any())//接收任何文件格式上传

app.use("/test",require("./routers/TestRouter"))//"/test"，表示所有以 "/test" 开头的请求都会进入这个中间件处理程序，/test/test//* TestRouter被视为一个程序
app.use("/admin",require("./routers/AdminRouter"))
app.use("/category",require("./routers/CategoryRouter"))
app.use("/blog",require("./routers/BlogRouter"))
app.use("/upload",require("./routers/UploadRouter"))

//客户端发送
app.get("/",(req,res)=>{ 
    res.send("原神，启动");
})
//服务端相应
app.listen(port,()=>{
    console.log(`服务器已启动，监听端口: http://localhost:${port}/`);
})