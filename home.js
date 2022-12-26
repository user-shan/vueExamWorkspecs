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
            // 系统首页跑马灯链接 start
            imgUrl: [
                "./images/1.jpg",
                "./images/2.jpg",
                "./images/3.jpg",
                "./images/4.jpg",
                "./images/5.jpg"
            ],
            // 系统首页跑马灯链接 end
            // 修改密码变量 start
            xgmmRuleForm: {
                name: sessionStorage.getItem("uname"),
                password: '',
                newpassword: '',
                repassword: ''
            },
            xgmmRules: {
                password: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
                newpassword: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            }
            // 修改密码变量 end
        }
    },
    methods: {
        // 弹窗方法 start
        loginSces() {
            let that = this;
            this.$notify({
                title: '登录成功',
                dangerouslyUseHTMLString: true,
                message: '欢迎用户：' + that.loginUser + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<input id='tcBut' type='button' value='退出' onclick='clearBut()' />",
                duration: 0,
                type: 'success'
            });
        },
        // 弹窗方法 end
        // 导航点击方法 start
        handleClick(res) {
            let that = this;
            that.windowIde = res.index;
        },
        // 导航点击方法 end
        // 修改密码点击事件 start
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                let that = this;
                if (valid) {
                    if (that.xgmmRuleForm.password == sessionStorage.getItem("upassword")) {
                        if (that.xgmmRuleForm.newpassword == that.xgmmRuleForm.repassword) {
                            sessionStorage.removeItem("upassword");
                            sessionStorage.setItem("upassword", that.xgmmRuleForm.newpassword);
                            window.location.href = "./login.html";
                        } else {
                            alert("请确保两次密码相同");
                        }
                    } else {
                        alert("原密码错误");
                        return false;
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 修改密码点击事件 end
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

// 引用推出事件 start
function clearBut() {
    sessionStorage.removeItem("uname");
    sessionStorage.removeItem("upassword");
    window.location.href = "./login.html";
}
// 引用推出事件 end