var IE = (function () {
    "use strict";

    var returnValue, isTheBrowser,
        actualVersion,
        jscriptMap, jscriptVersion;

    isTheBrowser = false;
    jscriptMap = {
        "5.5": "5.5",
        "5.6": "6",
        "5.7": "7",
        "5.8": "8",
        "9": "9",
        "10": "10"
    };
    jscriptVersion = new Function("/*@cc_on return @_jscript_version; @*/")();

    if (jscriptVersion !== undefined) {
        isTheBrowser = true;
        actualVersion = jscriptMap[jscriptVersion];
    }

    returnValue = {
        isTheBrowser: isTheBrowser,
        actualVersion: actualVersion
    };

    return returnValue;
}());

export default IE;
