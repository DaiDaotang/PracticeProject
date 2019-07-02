// JavaScript source code
layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer;

    //表单初始赋值
    form.val('diary_form', {
        "search_diary_input": ""
        , "search_diary_data": ""
    })

    //监听搜索
    form.on('submit(search_diary_btn)', function (data) {
        console.log(data.field);
        //layer.msg(JSON.stringify(data.field));
        return false;
    });
});

//laydate区
layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#search_diary_data'
    });
});

//flow区
layui.use('flow', function () {
    var flow = layui.flow
        , $ = layui.jquery;

    flow.load({
        elem: '#diary_flow' //流加载容器
        , done: function (page, next) { //执行下一页的回调

            //模拟数据插入
            setTimeout(function () {
                var lis = [];
                for (var i = 0; i < 8; i++) {
                    lis.push('<li><div style="width:auto; height: 200px; margin: 20px; background-color:#d4dadb; border-radius: 20px;"><p>' + ((page - 1) * 8 + i + 1) + '</p></div></li>')
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 10); //假设总页数为 10
            }, 300);
        }
    });
});