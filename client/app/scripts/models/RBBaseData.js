export default class RBBaseData {
    constructor(baseData,locale) {
        this.baseData = baseData;
        this.locale = locale;
    }
    get originData(){
        return this.baseData;
    }
    get data(){
        var langIndex = ({'en':0,'zh-CN':1,'zh-TW':2})[this.locale];
        for(var p in this.baseData){
            if(p != 'timestamp'){
                var entry = this.baseData[p];
                for(var i=0;i<entry.length;i++){
                    entry[i].label = entry[i].text[langIndex];
                }
            }
        }
        return this.baseData;
    }
    getByName(name){
        var langIndex = ({'en':0,'zh-CN':1,'zh-TW':2})[this.locale];
        var entry = this.baseData[name];
        if(entry && entry.length>0){
            for(var i=0;i<entry.length;i++){
                entry[i].label = entry[i].text[langIndex];
            }
            return entry;
        }
        return null;
    }
}