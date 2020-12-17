function set_board_pos() {
    var bd = document.getElementById("table_right");
    var w = bd.clientWidth;
    var h = bd.clientHeight;
    // ["connect_diag"].forEach((element) => {
    //     var tb = document.getElementById(element);
    //     var w1 = tb.clientWidth;
    //     var h1 = tb.clientHeight;
    //     $("#" + element).css("top", 10);
    //     $("#" + element).css("left", 10);
    //     // $("#" + element).css("bottom", h1 - 20);
    //     // $("#" + element).css("right", w1 - 20);
    // });
    const { remote } = require("electron");
    thiswd = remote.getCurrentWindow();
    // var w = innerWidth;
    // var h = innerHeight;
    thiswd.setSize(w, h);
}
function set_diag_title(t) {
    $("#diag_title").text(t);
}
function set_diag_text(t) {
    $("#diag_text").html(t);
}
function set_diag_status(t) {
    switch (t) {
        case "show":
            jq_replace_class($("#conn_diag"), "diag_hide", "diag_show");
            break;
        case "hide":
            jq_replace_class($("#conn_diag"), "diag_show", "diag_hide");
            break;
        default:
            break;
    }
}
function connect_to_server(ip, port) {
    timeout_timer = -1;
    try {
        var ws = new WebSocket("ws://" + ip + ":" + port + "/greeter");
    } catch (error) {
        set_diag_title("连接失败");
        set_diag_text("请检查输入是否有误.");
        setTimeout(() => {
            set_diag_status("hide");
        }, 2000);
        if (timeout_timer != -1) clearTimeout(timeout_timer);
        return 1;
    }
    timeout_timer = setTimeout(() => {
        if (ws.readyState == 1) return;
        set_diag_title("连接超时");
        set_diag_text("请检查输入是否有误.");
        setTimeout(() => {
            set_diag_status("hide");
        }, 2000);
    }, 1000);

    ws.onopen = function () {
        set_diag_title("连接成功");
        set_diag_text("等待分配用户...");
        send = JSON.stringify({ cmd: "get_user" });
        ws.send(send);
    };

    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        re_json = JSON.parse(received_msg);
        if (re_json["code"] == "ok") {
            set_diag_title("用户已分配, 进入工作区...");
            set_diag_text(
                "用户名:" +
                    re_json["data"][1] +
                    "<br/>用户id:" +
                    re_json["data"][0] +
                    "<br/>服务端id:" +
                    re_json["s_id"]
            );
            setTimeout(() => {
                set_diag_status("hide");
                window.location.href = "workspace.html";
            }, 1000);
        }
        if (timeout_timer != -1) clearTimeout(timeout_timer);
        ws.close();
    };

    ws.onclose = function () {};
    ws.onerror = (ev) => {
        set_diag_title("连接失败");
        set_diag_text("websocket连接出错.");
        setTimeout(() => {
            set_diag_status("hide");
        }, 2000);
        if (timeout_timer != -1) clearTimeout(timeout_timer);
    };
}
$(function () {
    return;
    // --- import and config ---
    var elementResizeDetectorMaker = require("element-resize-detector");
    const { remote } = require("electron");
    if (__lang_defined != true) {
        throw Error("language.js is not imported.");
    }
    var erd = elementResizeDetectorMaker({
        strategy: "scroll",
    });
    thiswd = remote.getCurrentWindow();
    var _resize_event = function () {
        thiswd.resizable = true;
        set_board_pos();
        thiswd.resizable = false;
    };
    _resize_event();
    erd.listenTo(document.getElementById("table_right"), function (element) {
        _resize_event();
    });
    // --- END import and config ---
    // --- special settings ---
    // $("input").css("background", "rgb(34, 34, 34)");
    // $("input").css("color", "rgb(226, 226, 226)");
    // --- END special settings ---
    // --- language settings ---
    // _lang_SetLang("en_US");
    _lang_SetLang("zh_CN");
    var _temp1 = [
        _lang_GetLang("login_connect"),
        _lang_GetLang("login_to-collect"),
        _lang_GetLang("login_collects"),
        _lang_GetLang("login_clear-table"),
    ];
    [
        [_temp1[0], "btn-success", "connect_btn"],
        [_temp1[1], "btn-info", "add_collect_btn"],
        [_temp1[2], "btn-default", "collects_btn"],
        [_temp1[3], "btn-danger", "clear_btn"],
    ].forEach((element) => {
        $("#btns_1").html(
            $("#btns_1").html() +
                '<button type="button" ' +
                'class="btn btn-default btn-primary _btn_group_1 ' +
                element[1] +
                '"' +
                'id="' +
                element[2] +
                '">' +
                element[0] +
                "</button>"
        );
    });
    delete _temp1;
    $("#_lang_srv-hostname").text(_lang_GetLang("login_srv-hostname"));
    $("#_lang_srv-port").text(_lang_GetLang("login_srv-port"));
    $("#inp_server_ip").prop(
        "placeholder",
        _lang_GetLang("login_input-srv-ip")
    );
    $("#inp_server_port").prop(
        "placeholder",
        _lang_GetLang("login_input-srv-port")
    );
    // --- END language settings ---
    // --- events ---
    $("._btn_group_1").on("click", (jq) => {
        $("._btn_group_1").prop("disabled", true);
        switch (jq.target.id) {
            case "connect_btn":
                // set_diag_status("show");
                // set_diag_title("连接中...");
                // c_ip = $("#inp_server_ip").val();
                // c_port = $("#inp_server_port").val();
                // set_diag_text("连接到 " + c_ip + ":" + c_port);
                // connect_to_server(c_ip, c_port);
                break;
            case "clear_btn":
                $("#inp_server_ip").val("");
                $("#inp_server_port").val("");
                break;
            default:
                break;
        }
    });
    // --- END events ---
});
