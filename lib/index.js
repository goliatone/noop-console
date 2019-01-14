'use strict';

const PROPS = 'memory'.split(',');

const METHODS = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
    'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
    'table,time,timeEnd,timeStamp,trace,warn').split(',');

/**
 * Shim console, make sure that if no console
 * available calls do not generate errors.
 * @return {Object} Console shim.
 */
const noopConsole = function(con = {}) {

    let empty = {},
        noop = function() {},
        properties = PROPS.concat(),
        methods = METHODS.concat(),
        prop,
        method;

    while (method = methods.pop()) {
        if (con[method]) {
            con['_' + method + '_'] = con[method];
        }
        con[method] = noop;
    }

    while (prop = properties.pop()) {
        if (con[prop]) {
            con['_' + prop + '_'] = con[prop];
        }
        con[prop] = empty;
    }

    const notConsole = typeof con.log !== 'function';

    con._restore = function() {
        if (notConsole) return;

        properties = PROPS.concat();
        methods = METHODS.concat();

        while (method = methods.pop()) {
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

const logger = function(con = {}) {

    let methods = METHODS.concat(),
        method;

    while (method = methods.pop()) {
        con[method] = (function(m) {
            return function() {
                console[m].apply(null, arguments);
            };
        })(method);
    }

    return con;
};

/**
 * Exports module
 */
module.exports = noopConsole;

/**
 * Exports empty logger;
 */
module.exports.logger = logger;