# generator-veronica

> [Yeoman](http://yeoman.io) 生成器，用于搭建 veronica 项目脚手架


## Getting Started

首先应确保安装了 `yo` 脚手架工具

```
npm install -g yo
```

从源码库中获取项目 generator-veronica，获取完毕后，
由于该项目没有在 npm 中注册，因此你需要在 generator-veronica 目录下使用以下命令，以便在后续执行命令时能够链接到本地路径：

```
npm link
```

可以创建一个文件夹，例如 `hello-veronica`，在该目录中，执行

```
yo veronica
```

这将创建基本的项目结构，并下载依赖包，至此项目搭建完毕

### 创建页面部件

在你放置部件的某个目录下，例如 `widgets` 目录，使用如下命令，将创建页面部件的模板

```
yo veronica:widget [widget name]
```

例子：

```
yo veronica:widget "hello-veronica"
```


## License

MIT
