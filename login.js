new Vue({
    el: "#app",
    data() {
        return {
            locPage: '0',
            ruleForm: {
                name: '',
                password: '',
                repassword: ''
            },
            checkRules: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 点击切换窗口 start
        goLogon() {
            let that = this;
            that.locPage = '1';
            document.title = '注册';
        },
        goLogin() {
            let that = this;
            that.locPage = '0';
            document.title = '登录';
        },
        // 点击切换窗口 end
        // 注册点击事件 start
        resubmitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (that.ruleForm.repassword == that.ruleForm.password) {
                        sessionStorage.setItem("uname", that.ruleForm.name);
                        sessionStorage.setItem("upassword", that.ruleForm.password);
                        that.locPage = '0';
                        document.title = '登录';
                    } else {
                        alert("请确保两次密码相同");
                    }
                } else {
                    return false;
                }
            });
        },
        // 注册点击事件 end
        // 登录点击事件 start
        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (that.ruleForm.password ==
                        sessionStorage.getItem("upassword") &&
                        that.ruleForm.name ==
                        sessionStorage.getItem("uname")) {
                        window.location.href = "./home.html";
                    } else {
                        alert('账号或密码错误');
                        return false;
                    }
                } else {
                    return false;
                }
            });
        },
        // 登录点击事件 end
        // 重置按钮 start
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
        // 重置按钮 end
    }
})