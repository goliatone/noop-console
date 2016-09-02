/*
 * Null Console
 * https://github.com/goliatone/noop-console
 *
 * Copyright (c) 2016 goliatone
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Shim console, make sure that if no console
 * available calls do not generate errors.
 * @return {Object} Console shim.
 */
var noopConsole = function() {
    var empty = {},
        con = {},
        noop = function() {},
        properties = 'memory'.split(','),
        methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
            'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
            'table,time,timeEnd,timeStamp,trace,warn').split(','),
        prop,
        method;

    while (method = methods.pop()){
        con[method] = noop;
    }

    while (prop = properties.pop()) {
        con[prop] = empty;
    }

    return con;
};


/**
 * Exports module
 */
module.exports = noopConsole;
