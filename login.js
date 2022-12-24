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
        resubmitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    sessionStorage.setItem("uname", that.ruleForm.name);
                    sessionStorage.setItem("upassword", that.ruleForm.password);
                    that.locPage = '0';
                    document.title = '登录';
                } else {
                    return false;
                }
            });
        },
        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (that.ruleForm.password == that.ruleForm.repassword) {
                        let uname = sessionStorage.getItem("uname");
                        let upassword = sessionStorage.getItem("upassword");
                        if (uname == '' || uname == ' ' || uname == null ||
                            upassword == '' || upassword == ' ' || upassword == null) {
                            alert('无账号');
                        } else {
                            alert('登录');
                        }
                        // window.location.href = "./home.html";
                    } else {
                        console.log('NO');
                        return false;
                    }
                } else {
                    console.log('NO');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    beforeCreate() {
        sessionStorage.removeItem("uname");
        sessionStorage.removeItem("upassword");
    }
})