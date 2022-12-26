Vue.filter('dateformat', function (time) {
    var dataStr = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    return dataStr
})
// 全局过滤器，数字保留1位小数
// Vue.filter('numfix1', num => parseFloat(num).toFixed(1))

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
            },
            // 修改密码变量 end

            // 添加的商品信息 start
            addGood: { id: '', addname: '', addfort: '', addage: '' },
            // 添加的商品信息 end

            // 表格中商品信息 start
            list: [
                { id: 1, name: '蒙牛牛奶', age: 2, sex: '男', fort: "财务" },
                { id: 2, name: '恰恰瓜子', age: 2, sex: '女', fort: "后勤" },
                { id: 3, name: '恰恰瓜子', age: 2, sex: '女', fort: "生产" },
                { id: 4, name: '恰恰瓜子', age: 2, sex: '男', fort: "餐饮" }
            ],
            // 表格中商品信息 end

            // 下一个id
            nextIda: 5,
            // 每页可以显示的数据数量
            pagesizes: [5, 10],
            // 每页显示的具体的数据数量
            pagesize: 5,
            // 当前是第几页
            currentPage: 1,
            // 修改模块状态 true显示，false隐藏
            dialogFormVisible: false,
            // 修改的商品信息
            editGood: { id: '', ediname: '', ediage: '', edisex: '', edifort: '' },
            // 修改的id
            editIda: 0,
            formLabelWidth: '120px'
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
        // 添加商品
        add() {
            console.log("点击添加");
            this.list.push(
                {
                    id: this.nextIda,
                    name: this.addGood.addname,
                    age: this.addGood.addage,
                    sex: '男',
                    fort: this.addGood.addfort
                }
            );
            this.nextIda++;
            // 页面输入框清空
            this.addGood.addname = '';
            this.addGood.addfort = '';
            this.addGood.addage = '';
        },
        // 清空输入框
        clearinput() {
            this.addGood.addname = '';
            this.addGood.addfort = '';
            this.addGood.addage = '';
        },
        // 删除商品
        del(id) {
            this.list = this.list.filter((item) => item.id != id)
        },
        // handleSizeChange
        handleSizeChange(val) {
            this.pagesize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 修改商品信息  row：当前行的数据，id:修改商品的序号
        edit(row, id) {
            // 记录当前修改商品的序号
            this.editIda = id;

            // 记录数据 
            this.editGood.id = row.id;
            this.editGood.ediname = row.name;
            this.editGood.ediage = row.age;
            this.editGood.edisex = row.sex;
            this.editGood.edifort = row.fort;

            // 显示窗口
            this.dialogFormVisible = true;
        },
        // 点击确定修改数组中的商品信息
        editDo() {
            // 找到id对应数据的下标
            var update_index = -1;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == this.editIda) {
                    update_index = i;
                    break;
                }
            }
            // 修改update_index对应的商品信息
            this.list[update_index].name = this.editGood.ediname;
            this.list[update_index].age = this.editGood.ediage;
            this.list[update_index].sex = this.editGood.edisex;
            this.list[update_index].fort = this.editGood.edifort;

            // 关闭dialog
            this.dialogFormVisible = false;
        }
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