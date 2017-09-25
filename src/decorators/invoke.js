/**
 * Azeroth - Decorators - Invoke
 *
 * @file Invoke.js
 * @author mudio(job.mudio@gmail.com)
 */

import {ServiceKeys} from '../types';

export default (...services) => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Invoke` only support classType');
    }

    Constructor[ServiceKeys] = services;

    return Constructor;
};
