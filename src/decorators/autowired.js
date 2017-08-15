/**
 * Azeroth - Decorators - Autowired
 *
 * @file Autowired.js
 * @author mudio(job.mudio@gmail.com)
 */

import {AutowiredKeys} from '../types';

export default (...services) => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Autowired` only support classType');
    }

    Constructor[AutowiredKeys] = services;

    return Constructor;
};
