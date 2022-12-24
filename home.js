new Vue({
    el: "#appHome",
    data() {
        return {
            // 用户名调用位置 start
            loginUser: sessionStorage.getItem("uname"),
            // 用户名调用位置 end
            // 页面导航定位 start
            windowIde: "1",
            // 页面导航定位 end
            imgUrl: [
                "./images/1.jpg",
                "./images/2.jpg",
                "./images/3.jpg",
                "./images/4.jpg",
                "./images/5.jpg"
            ]
        }
    },
    methods: {
        // 弹窗方法 start
        loginSces() {
            let that = this;
            this.$notify({
                title: '登录成功',
                dangerouslyUseHTMLString: true,
                message: '欢迎用户：' + that.loginUser + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<input type='button' value='退出' />",
                duration: 0,
                type: 'success'
            });
        },
        // 弹窗方法 end
        // 导航点击方法 start
        handleClick(res) {
            let that = this;
            that.windowIde = res.index;
        }
        // 导航点击方法 end
    },
    created() {
        let that = this;
        if (that.loginUser == '' || that.loginUser == ' ' || that.loginUser == null) {
            alert("请返回登录");
            window.location.href = "./login.html";
        } else {
            that.loginSces();
        }
    },
})