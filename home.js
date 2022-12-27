Vue.filter('dateformat', function (time) {
    var dataStr = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    return dataStr
})
Vue.filter('dateformate', function (time) {
    var dataStr = dayjs(time).format("YYYY-MM-DD");
    return dataStr
})
// 全局过滤器，数字保留1位小数
Vue.filter('numfix1', num => parseFloat(num).toFixed(1))

var app = new Vue({
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
            addGoods: { id: '', addname: '', addfort: '', addage: '' },
            // 添加的商品信息 end

            // 表格中商品信息 start
            lists: [
                { id: 1, name: '123', age: 2, sex: '男', fort: "财务" },
                { id: 2, name: '321', age: 2, sex: '女', fort: "后勤" },
                { id: 3, name: '132', age: 2, sex: '女', fort: "生产" },
                { id: 4, name: '312', age: 2, sex: '男', fort: "餐饮" }
            ],
            // 表格中商品信息 end

            // aabcd
            // 下一个id
            nextIda: 5,
            // 每页可以显示的数据数量
            pagesizesss: [5, 10],
            // 每页显示的具体的数据数量
            pagesizess: 5,
            // 当前是第几页
            currentPagesss: 1,
            // 修改模块状态 true显示，false隐藏
            dialogFormVisibles: false,
            // 修改的商品信息
            editGoods: { id: '', ediname: '', ediage: '', edisex: '', edifort: '' },
            // 修改的id
            editIda: 0,
            // 添加的商品信息
            addGood: { id: '', code: '', brand: '', price: '', num: 0, birth: '', purchase: new Date() },
            // 表格中商品信息
            list: [
                { id: 1, code: '1001', brand: '1', price: 4.5, num: 2, birth: '2021-09-03 13:23:09', purchase: "2021-11-18 13:23:09" },
                { id: 2, code: '2001', brand: '2', price: 12.5, num: 2, birth: '2021-09-03 13:23:09', purchase: "2021-11-18 13:23:09" },
                { id: 3, code: '1008', brand: '3', price: 10.3, num: 2, birth: '2021-07-03 13:23:09', purchase: "2021-11-18 13:23:09" },
                { id: 4, code: '1021', brand: '4', price: 3.5, num: 2, birth: '2021-09-03 13:23:09', purchase: "2021-11-18 13:23:09" }
            ],
            // 下一个id
            nextId: 5,
            // 每页可以显示的数据数量
            pagesizes: [5, 10],
            // 每页显示的具体的数据数量
            pagesize: 5,
            // 当前是第几页
            currentPage: 1,
            // 修改模块状态 true显示，false隐藏
            dialogFormVisible: false,
            // 修改的商品信息
            editGood: { id: '', code: '', brand: '', price: '', birth: '' },
            // 修改的id
            editId: 0,
            formLabelWidth: '120px',
            yhxx: {
                yhxxName: sessionStorage.getItem('uname'),
                yhxxEmal: '',
                yhxxTel: '',
                yhxxCreTim: sessionStorage.getItem('onDate'),
                yhxxLoTim: sessionStorage.getItem('uDate'),
                yhxxLoip: window.returnCitySN.cip
            },
            showXg: true
        }
    },
    methods: {
        crePeo() {
            let that = this;
            that.showXg = false;
        },
        savPeo() {
            let that = this;
            that.showXg = true;
        },
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
        adds() {
            this.lists.push(
                {
                    id: this.nextIda,
                    name: this.addGoods.addname,
                    age: this.addGoods.addage,
                    sex: '男',
                    fort: this.addGoods.addfort
                }
            );
            this.nextIda++;
            // 页面输入框清空
            this.addGoods.addname = '';
            this.addGoods.addfort = '';
            this.addGoods.addage = '';
        },
        // 清空输入框
        clearinputs() {
            this.addGoods.addname = '';
            this.addGoods.addfort = '';
            this.addGoods.addage = '';
        },
        // 删除商品
        dels(id) {
            this.lists = this.lists.filter((item) => item.id != id)
        },
        // handleSizeChange
        handleSizeChange(val) {
            this.pagesizess = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 修改商品信息  row：当前行的数据，id:修改商品的序号
        edits(row, id) {
            // 记录当前修改商品的序号
            this.editIda = id;

            // 记录数据 
            this.editGoods.id = row.id;
            this.editGoods.ediname = row.name;
            this.editGoods.ediage = row.age;
            this.editGoods.edisex = row.sex;
            this.editGoods.edifort = row.fort;

            // 显示窗口
            this.dialogFormVisibles = true;
        },
        // 点击确定修改数组中的商品信息
        editDos() {
            // 找到id对应数据的下标
            var update_index = -1;
            for (var i = 0; i < this.lists.length; i++) {
                if (this.lists[i].id == this.editIda) {
                    update_index = i;
                    break;
                }
            }
            // 修改update_index对应的商品信息
            this.lists[update_index].name = this.editGoods.ediname;
            this.lists[update_index].age = this.editGoods.ediage;
            this.lists[update_index].sex = this.editGoods.edisex;
            this.lists[update_index].fort = this.editGoods.edifort;

            // 关闭dialog
            this.dialogFormVisibles = false;
        }, // 添加商品


        add() {
            this.list.push(
                {
                    id: this.nextId, code: this.addGood.code,
                    brand: this.addGood.brand, price: this.addGood.price,
                    num: this.addGood.num, birth: this.addGood.birth,
                    purchase: this.addGood.purchase
                }
            );
            this.nextId++;
            // 页面输入框清空
            this.addGood.code = '';
            this.addGood.brand = '';
            this.addGood.price = '';
        },
        // 清空输入框
        clearinput() {
            this.addGood.code = '';
            this.addGood.brand = '';
            this.addGood.price = '';
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
            this.editId = id;

            // 记录数据
            this.editGood.id = row.id;
            this.editGood.code = row.code;
            this.editGood.brand = row.brand;
            this.editGood.price = row.price;
            this.editGood.birth = row.birth;

            // 显示窗口
            this.dialogFormVisible = true;
        },
        // 点击确定修改数组中的商品信息
        editDo() {
            // 找到id对应数据的下标
            var update_index = -1;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == this.editId) {
                    update_index = i;
                    break;
                }
            }
            // 修改update_index对应的商品信息
            this.list[update_index].code = this.editGood.code;
            this.list[update_index].brand = this.editGood.brand;
            this.list[update_index].price = this.editGood.price;
            this.list[update_index].birth = this.editGood.birth;

            // 关闭dialog
            this.dialogFormVisible = false;
        }
    },
    // 计算属性
    computed: {
        //reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
        // 总价
        totalPrice() {
            return this.list.reduce((total, item) => { return total += item.num * item.price }, 0)
        },
        // 总数量
        totalCount() {
            return this.list.reduce((total, item) => { return total += item.num }, 0)
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

function openecrt() {
    var myChart1 = echarts.init(document.getElementById("myChart1"), 'shine');
    var option1 = {
        title: {
            text: '部门平均工资AAA'
        },
        legend: {},
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '平均工资',
                data: [10000, 2000, 9210, 11456, 11330, 11031, 3130],
                type: 'bar'
            }
        ]
    };
    myChart1.setOption(option1);



    var myChart2 = echarts.init(document.getElementById("myChart2"), 'shine');
    var option2 = {
        legend: {},
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
            type: 'value'
        }, tooltip: {
            trigger: 'axis',
            showContent: false
        },
        series: [
            {
                name: '平均工资',
                data: [10000, 2000, 9210, 11456, 11330, 11031, 3130],
                type: 'line'
            }
        ]
    };
    myChart2.setOption(option2);

}