var toolbar_items = [];
var _last_menu_cmds = [];
var bar_menu_index = -1;
/**
 *
 * @param {array} a
 */
function set_tbar_items(a) {
    toolbar_items = [];
    a.forEach((element, i) => {
        $("#menu_bar_items").html(
            $("#menu_bar_items").html() +
                '<div class="menu_bar_item" id="menu_bar_item_' +
                i +
                '">' +
                element +
                "</div>"
        );
        toolbar_items.push([element, i]);
    });
}
function tbar_menu_items_click(nbar, index) {
    // console.log([nbar, index]);
    switch (bar_menu_index) {
        case 0:
            switch (index) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    const ele = require("electron");
                    ele.app.quit();
                    break;

                default:
                    break;
            }
            break;

        default:
            break;
    }
}
function set_tbar_menu_items(a) {
    if (!a.equals(_last_menu_cmds)) {
        _last_menu_cmds = cloneArr(a);
    } else {
        return;
    }
    count = a.length; // % 2 == 0 ? a.length : a.length + 1;
    $("#menu_bar_menu").html("");
    for (let index = 0; index < count; index++) {
        // if (index + 1 > a.length) {
        //     break;
        // }
        $("#menu_bar_menu").html(
            $("#menu_bar_menu").html() +
                ('<div class="menu_cell menu_cell_' +
                    (index % 2 == 0 ? "left" : "right") +
                    '" id="menu_cell_id_' +
                    index +
                    '"><dl><dt><span class="glyphicon ' +
                    a[index][2] +
                    '"></span> ' +
                    a[index][0] +
                    "</dt><dd>" +
                    a[index][1] +
                    "</dd></dl></div>")
        );
    }
    for (let index = 0; index < count; index++) {
        // console.log("#menu_cell_id_" + index);
        $("#menu_cell_id_" + index).on("click", (jq) => {
            tbar_menu_items_click(bar_menu_index, index);
        });
    }
}
function set_tbar_mask_status(t) {
    switch (t) {
        case "show":
            jq_replace_class(
                $("#menu_bar_menu_mask"),
                "menu_bar_menu_hide",
                ""
            );
            break;
        case "hide":
            jq_replace_class(
                $("#menu_bar_menu_mask"),
                "",
                "menu_bar_menu_hide"
            );
            break;
        default:
            break;
    }
}
function update_menu() {
    m = $("#menu_bar_menu");
    toolbar_items.forEach((e) => {
        ee = $("#menu_bar_item_" + e[1]);
        if (e[1] == bar_menu_index) {
            ee.addClass("menu_bar_item_active");
        } else {
            ee.removeClass("menu_bar_item_active");
        }
    });
    if (bar_menu_index != -1) {
        if (bar_menu_index + 1 > toolbar_items.length) {
            bar_menu_index = -1;
            return;
        }
        set_tbar_menu_items(ui_toolbar_menu_cmds[bar_menu_index]);
        var bd = $("#bg")[0];
        var w = bd.clientWidth;
        // left = $("#menu_bar_item_" + bar_menu_index)[0].offsetLeft;
        // width = m[0].offsetWidth;
        // if (width + left + 5 > w) {
        //     m.css("left", w - width - 5);
        // } else {
        //     m.css("left", left);
        // }
        // m.css("top", 30);
        jq_replace_class(m, "menu_bar_menu_hide", "");
        set_tbar_mask_status("show");
    } else {
        jq_replace_class(m, "", "menu_bar_menu_hide");
        set_tbar_mask_status("hide");
    }
}
$(() => {
    set_tbar_items(ui_toolbar_items);
    update_menu();
    var timer = setInterval(() => {
        update_menu();
    }, 200);
    _bar_close_time = 0;
    _bar_autoclose = false;
    var timer1 = setInterval(() => {
        if (!_bar_autoclose) {
            return;
        }
        if (_bar_close_time > 0) {
            _bar_close_time -= 1;
        } else {
            if (bar_menu_index != -1) {
                bar_menu_index = -1;
                _bar_autoclose = false;
            }
        }
    }, 100);
    $(".menu_bar_item").on("click mouseover", (jq) => {
        index = /menu_bar_item_([0-9]+)/.exec(jq.target.id)[1];
        index = Number(index);
        switch (jq.type) {
            case "click":
                bar_menu_index = bar_menu_index == -1 ? index : -1;
                update_menu();
                _bar_autoclose = false;
                break;
            case "mouseover":
                if (bar_menu_index != -1) {
                    bar_menu_index = index;
                    update_menu();
                    _bar_autoclose = false;
                }
                break;
            default:
                break;
        }
    });

    $("#menu_bar_menu").on("mouseover", (jq) => {
        _bar_autoclose = false;
    });
    $("#menu_bar_menu").on("mouseleave", (jq) => {
        _bar_close_time = 5;
        _bar_autoclose = true;
    });
    $("#menu_bar_menu_mask").on("click", (e) => {
        e.preventDefault();
        bar_menu_index = -1;
        update_menu();
        _bar_autoclose = false;
        set_tbar_mask_status("hide");
    });
});
