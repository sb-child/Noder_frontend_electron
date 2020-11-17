function set_board_pos() {
    var bd = document.getElementById("bg");
    var w = bd.clientWidth;
    var h = bd.clientHeight;
    ["table_right", "connect_diag"].forEach((element) => {
        var tb = document.getElementById(element);
        var w1 = tb.clientWidth;
        var h1 = tb.clientHeight;
        $("#" + element).css("top", h / 2 - h1 / 2);
        $("#" + element).css("left", w / 2 - w1 / 2);
    });
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
    set_board_pos();
    window.onresize = () => {
        set_board_pos();
    };
    var timer = setInterval(() => {
        set_board_pos();
    }, 200);
    $("#connect_btn").on("click", () => {
        set_diag_status("show");
        set_diag_title("连接中...");
        c_ip = $("#inp_server_ip").val();
        c_port = $("#inp_server_port").val();
        set_diag_text("连接到 " + c_ip + ":" + c_port);
        connect_to_server(c_ip, c_port);
    });
    $("#clear_btn").on("click", () => {
        $("#inp_server_ip").val("");
        $("#inp_server_port").val("");
    });
});
