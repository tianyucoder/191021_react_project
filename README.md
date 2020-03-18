### day01
		1. 创建脚手架，随后精简。
		2. 引入了antd，按需引入，自定义主题。
		3. 引入了react-router-dom，搭建一级路由。
		4. login静态页面(无antd)
		5. 引入antd的Form组件
		6. 用户名的声明式校验
		7. 密码的自定义验证

### day02 
			redux技术，请切换到仓库的redux分支进行查看。

### day03
			1.收集表单数据
			2.脚手架中配置代理解决跨域
			3.使用axios请求拦截器转换post请求json编码参数
			4.使用axios响应拦截器统一处理错误
			5.统一管理项目ajax请求

### day04
			1.搭建了项目的redux环境
			2.用redux保存用户的信息(如果登录成功了)
			3.处理了刷新页面，用户名丢失的问题 --- local
			4.login与admin权限控制
			5.Admin页面布局（使用antd的Layout组件）
			6.Header的静态布局
			7.screenfull库操作全屏
			8.Header组件与redux的交互
			9.Header组件退出登录
			10.dayjs格式化时间戳
			11.百度天气接口

### day05
			1.左侧导航的静态布局(上方的logo+文字+Menu组件)
			2.分析Menu组件的API，整体结构（<Item>、<SubMenu/>）
			3.根据菜单配置文件自动创建菜单(递归)
			4.完成刷新页面可以：自动选中、自动展开
				靠地址，用到了Menu组件的两个配置：selectedKeys、defaultOpenKeys
			5.处理重新登录后，不选中“首页”的问题：使用selectedKeys替换defaultSelectedKeys
			6.使用redux保存左侧所选菜单的标题、Header组件从redux中读取标题
			7.处理刷新页面Header组件展示的标题丢失问题，解决：编写getTitle方法，计算标题名
			8.处理重新登录后，依然残留之前保存的title问题：退出登录时清空redux里的title
			9.处理重新登录后，Header中展示“首页”的问题，解决：if(key === 'admin') key = 'home'
			10.token的工作原理及具体编码，备注：axios的请求拦截器，让所有请求都自动携带token

			
		