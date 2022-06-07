import api from '@/utils/api'
const utils = {
    /**
     * 游戏列表
     */
    gameNameList: [],
    _stringToArray(string) {
        // 用于判断emoji的正则们
        var rsAstralRange = '\\ud800-\\udfff';
        var rsZWJ = '\\u200d';
        var rsVarRange = '\\ufe0e\\ufe0f';
        var rsComboMarksRange = '\\u0300-\\u036f';
        var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
        var rsComboSymbolsRange = '\\u20d0-\\u20ff';
        var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
        var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

        var rsFitz = '\\ud83c[\\udffb-\\udfff]';
        var rsOptVar = '[' + rsVarRange + ']?';
        var rsCombo = '[' + rsComboRange + ']';
        var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
        var reOptMod = rsModifier + '?';
        var rsAstral = '[' + rsAstralRange + ']';
        var rsNonAstral = '[^' + rsAstralRange + ']';
        var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
        var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
        var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
        var rsSeq = rsOptVar + reOptMod + rsOptJoin;
        var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
        var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

        var hasUnicode = function (val) {
            return reHasUnicode.test(val);
        };

        var unicodeToArray = function (val) {
            return val.match(reUnicode) || [];
        };

        var asciiToArray = function (val) {
            val = val + '';
            return val.split('');
        };


        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    },

    formAddress(name) {
        let limit = 3;
        var nameArray = this._stringToArray(name);
        var fStr
        var str = '';
        var length = nameArray.length;
        fStr = '' + nameArray[0] + nameArray[1] + nameArray[2] + nameArray[3] + nameArray[4];
        if (length > limit) {
            for (let i = 0; i < length; i++) {
                if (i >= length - limit) {
                    str += nameArray[i];
                }
            }
            str = fStr + '...' + str;
        } else {
            str = name;
        }
        return str;
    },

    setGameNameList(){
        if(this.gameNameList.length<=0){
            api.icGames().then(res=> {
                // 执行某些操作
                if(res.code == 0){
                    this.gameNameList = res.data;
                }
            })
        }
    },

    /**
     * 根据游戏type获得游戏名
     * @param {*} type 
     * @returns 
     */
    getGameName(type) {
        let gameName = "";
        if(this.gameNameList.length<=0){
            return '';
        }else{
            for (const key in this.gameNameList) {
                if (Object.hasOwnProperty.call(this.gameNameList, key)) {
                    const element = this.gameNameList[key];
                    if(type == element.id){
                        gameName = element.name;
                    }
                }
            }
        }
        return gameName;
    },

}
export default utils;