var PurpleMine = PurpleMine || {};

PurpleMine.isSelectorInCss = function(styleSheetName, selector)
{
    'use strict';

    var i, sheet, sheetIndex;

    if (!document.styleSheets) {
        return false;
    }

    for (i = 0; i < document.styleSheets.length; i++) {
        sheet = document.styleSheets[i];

        if (sheet.href.indexOf(styleSheetName) > -1) {
            sheetIndex = i;
            break;
        }
    }

    if (!sheetIndex) {
        return false;
    }

    sheet = document.styleSheets[sheetIndex];
    var rules = sheet.rules ? sheet.rules : sheet.cssRules;

    for (i = rules.length - 1; i >= 0; i--) {
        if (rules[i].selectorText === selector) {
            return true;
        }
    }

    return false;
};
