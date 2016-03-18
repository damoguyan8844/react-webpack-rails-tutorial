
export default {
   loadLocaleData: function (locale){
       function flattenMessages(nestedMessages, prefix = '') {
           return Object.keys(nestedMessages).reduce((messages, key) => {
               let value       = nestedMessages[key];
               let prefixedKey = prefix ? `${prefix}.${key}` : key;

               if (typeof value === 'string') {
                   messages[prefixedKey] = value;
               } else {
                   Object.assign(messages, flattenMessages(value, prefixedKey));
               }

               return messages;
           }, {});
       }
       return new Promise(resolve =>{
            switch(locale){
                case 'zh-CN':
                    require.ensure([],require=>{
                        var data = require('../i18n/zh-cn.lang.js')
                        resolve(flattenMessages(data.lang));
                    },'zh-CN')
                    break;
                case 'zh-TW':
                    require.ensure([],require=>{
                        var data = require('../i18n/zh-tw.lang.js')
                        resolve(flattenMessages(data.lang));
                    },'zh-TW')
                    break;
                default:
                    require.ensure([],require=>{
                        var data = require('../i18n/en-us.lang.js')
                        resolve(flattenMessages(data.lang));
                    },'en-us')
            }

        })
    }


}