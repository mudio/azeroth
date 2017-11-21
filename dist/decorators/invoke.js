'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../types');

exports.default = (...services) => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Invoke` only support classType');
    }

    Constructor[_types.ServiceKeys] = services;

    return Constructor;
}; /**
    * Azeroth - Decorators - Invoke
    *
    * @file Invoke.js
    * @author mudio(job.mudio@gmail.com)
    */