/**
 * Azeroth - Decorators - Header
 *
 * @file header.js
 * @author mudio(job.mudio@gmail.com)
 */

import {HeaderKeys} from '../types';

export default (key, value) => (Constructor, name) => {
    let target = Constructor;

    if (name) {
        target = Constructor[name];
    }

    if (HeaderKeys in target) {
        target[HeaderKeys][key] = value;
    } else {
        target[HeaderKeys] = {[key]: value};
    }

    return Constructor;
};
