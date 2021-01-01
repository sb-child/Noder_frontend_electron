$(() => {
    // electron and jquery
    const { remote } = require("electron");
    window.$ = window.jQuery = require("jquery");
    thiswd = remote.getCurrentWindow();
    thiswd.resizable = true;
    remote.app._io_connect1("127.0.0.1", 37321, (a, b) => {
        $(".n_bottombar").text(
            "status:" + a + ", " + remote.app._io_conn_target_info()
        );
        console.log([a, b]);
    });

    $(".n_sidebar").resizable({
        handles: "e",
        maxWidth: 500,
        minWidth: 50,
        resize: function (event, ui) {
            // console.log([event, ui]);
            // $("#middle").width(
            //     $("#content").width() - ui.size.width - $("#right").width()
            // );
        },
    });
    $(".n_topbar_area").resizable({
        handles: "s",
        maxHeight: 300,
        minHeight: 60,
        resize: function (event, ui) {
            // console.log([event, ui]);
            // $("#middle").width(
            //     $("#content").width() - ui.size.width - $("#right").width()
            // );
        },
    });
    return;
    var myscroll1 = $("#my_top_scroll1");
    var mytopbar = $("#my_top_bar");
    var myscroll1block = $("#my_top_scroll1_block");
    var myscroll1target = document.getElementById("my_top_scroll1_target");
    window.onresize = () => {
        s1max = myscroll1target.scrollWidth;
        s1 = myscroll1target.scrollLeft;
        s1width = $(myscroll1target).innerWidth();
        s1barwidth = myscroll1.innerWidth();
        console.log(s1max);
        if (s1max == 0) {
            jq_replace_class(
                myscroll1,
                "my_file_bar_scroll_show",
                "my_file_bar_scroll_hide"
            );
        } else {
            jq_replace_class(
                myscroll1,
                "my_file_bar_scroll_hide",
                "my_file_bar_scroll_show"
            );
            _temp_barwidth = ((s1width - s1max) / s1width) * s1barwidth;
            _temp_barwidth = _temp_barwidth <= 20 ? 20 : _temp_barwidth;
            myscroll1block.css("width", _temp_barwidth.toString() + "px");
            _temp1 = s1width - _temp_barwidth + 147;
            myscroll1block.css(
                "margin-left",
                ((s1 / s1max) * _temp1).toString() + "px"
            );
        }
    };
    window.onresize();
    $(myscroll1target).on("scroll", () => {
        window.onresize();
    });
    myscroll1.on("mousemove", (e) => {
        if (e.originalEvent.buttons == 1) {
            // console.log(e);
            s1max = myscroll1target.scrollWidth;
            s1width = $(myscroll1target).innerWidth() + s1max;
            s1barwidth = myscroll1.innerWidth();
            s1topbarwidth = mytopbar.innerWidth() - 151;
            _r = (e.originalEvent.layerX / s1barwidth) * s1max;
            // movementX
            console.log(s1width, s1topbarwidth);
            myscroll1target.scrollLeft = _r;
        }
    });
    myscroll1.on("click", (e) => {
        console.log(e.originalEvent.buttons);
        if (e.originalEvent.buttons == 4) {
            s1max = myscroll1target.scrollWidth;
            s1width = $(myscroll1target).innerWidth() + s1max;
            s1barwidth = myscroll1.innerWidth();
            s1topbarwidth = mytopbar.innerWidth() - 151;
            _r = (e.originalEvent.layerX / s1barwidth) * s1max;
            console.log(s1width, s1topbarwidth);
            myscroll1target.scrollLeft = _r;
        }
    });
});
