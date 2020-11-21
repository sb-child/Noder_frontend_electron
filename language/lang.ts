var jsonFile = require("jsonfile");
var fs = require("fs");

export function getLangNames() {
    var reg = new RegExp("([a-z]{2}_[A-Z]{2})(\\.json)", "g");
    var pa = fs.readdirSync(__dirname);
    var ret: Array<string> = [];
    pa.forEach(function (ele: string, _index: number) {
        var info = fs.statSync(__dirname + "/" + ele);
        if (!info.isDirectory()) {
            var _a = reg.exec(ele)
            if (_a !== null && _a.length == 3) {
                var r = RegExp.$1
                // console.log(r);
                ret.push(r);
            }
        }
    });
    return ret;
}

export class Lang {
    lang_dict: Object;
    constructor(lang_name: string) {
        var reg = new RegExp("[a-z]{2}_[A-Z]{2}", "g");
        if (reg.test(lang_name)) {
            try {
                this.lang_dict = Object(
                    jsonFile.readFileSync(__dirname + "/" + lang_name + ".json")
                );
            } catch (error) {
                console.warn(error);
                this.lang_dict = Object();
            }
        } else {
            console.warn("Failed to read lang file.");
            this.lang_dict = Object();
        }
    }
    getLang(LangIndex: string): string {
        return String(this.lang_dict[LangIndex]);
    }
}
// getLangNames();

// var a = jsonFile.readFileSync("zh_CN.json");
// console.log(a);
// var ln = new Lang("zh_CN")
// console.log(ln.lang_dict)
// console.log(ln.getLang("1"));
