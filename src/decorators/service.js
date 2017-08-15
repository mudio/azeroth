/**
 * Azeroth - Decorators - Service
 *
 * @file Service.js
 * @author mudio(job.mudio@gmail.com)
 */

import {ServiceCategory} from '../types';

export default serviceName => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    Constructor[ServiceCategory] = serviceName;

    return Constructor;
};
