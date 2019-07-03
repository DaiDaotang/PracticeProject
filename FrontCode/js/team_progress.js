// JavaScript source code
var max = 3
    , checked_tab_id = 0;

layui.use(['element', 'jquery'], function () {
    var $ = layui.jquery
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    //添加
    for (var i = 0; i < max; i++) {
        element.tabAdd('tabTeamProcess', {
            title: '第' + (i + 1) + '周' //用于演示
            , content: '<div class="layui-tab-item layui-show">你可以监听tab事件（阅读下文档就是了）</div>'
            , id: (i + 1) //实际使用一般是规定好的id，这里以时间戳模拟下
        })
    }

    //触发事件
    var active = {
        tabAddOneWeek: function () {
            //新增一个Tab项
            element.tabAdd('tabTeamProcess', {
                title: '第' + 1 + '周' //用于演示
                , content: '内容'
                , id: new Date().getSeconds //实际使用一般是规定好的id，这里以时间戳模拟下
            })

        }
        , tabDeleteThisWeek: function (othis) {
            element.tabDelete('tabTeamProcess', checked_tab_id); //删除被选中一栏
            //othis.addClass('layui-btn-disabled');
            console.log(checked_tab_id)
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    element.on('tab(tabTeamProcess)', function (data) {
        //console.log(this); //当前Tab标题所在的原始DOM元素
        //console.log(data.index); //得到当前Tab的所在下标
        //console.log(data.elem); //得到当前的Tab大容器

        console.log($(".layui-tab-title .layui-this").attr("lay-id"));

        checked_tab_id = data.index;
    });
});
