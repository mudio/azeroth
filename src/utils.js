/**
 * Azeroth - utils
 *
 * @file utils.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

export const isHttpError = err => _.isError(err) && ('HttpCode' in err);

export const isNullValue = v => _.isUndefined(v) || _.isNull(v);
