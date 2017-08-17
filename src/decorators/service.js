/**
 * Azeroth - Decorators - Service
 *
 * @file Service.js
 * @author mudio(job.mudio@gmail.com)
 */

import {ServiceCategory} from '../types';
import {registerService} from '../context';

export default serviceName => (Constructor, name) => {
    if (name) {
        throw new Error('Decorator `Middleware` only support classType');
    }

    Constructor[ServiceCategory] = serviceName;

    registerService(Constructor);

    return Constructor;
};
