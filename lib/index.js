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
var noopConsole = function(con) {
    con = con || {};

    var empty = {},
        noop = function() {},
        properties = 'memory'.split(','),
        methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
            'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
            'table,time,timeEnd,timeStamp,trace,warn').split(','),
        prop,
        method;

    while (method = methods.pop()){
        con['_' + method + '_'] = con[method];
        con[method] = noop;
    }

    while (prop = properties.pop()) {
        con['_' + prop + '_'] = con[prop];
        con[prop] = empty;
    }

    con._restore = function(){
        while (method = methods.pop()){
            con[method] = con['_' + method + '_'];
            delete con['_' + method + '_'];
        }

        while (prop = properties.pop()) {
            con[prop] = con['_' + prop + '_'];
            delete con['_' + prop + '_'];
        }
    };

    return con;
};


/**
 * Exports module
 */
module.exports = noopConsole;
