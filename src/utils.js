/**
 * Azeroth - utils
 *
 * @file utils.js
 * @author mudio(job.mudio@gmail.com)
 */

import _ from 'lodash';

/**
 * 标准化参数
 *
 * @param {Array<String> | Array<Array<String>>} args
 * @return Array<Array<String>>
 */
export const normalizeArgs = (...args) => _.map(args, (item) => {
    if (_.isString(item)) {
        return [item];
    }

    return item;
});

export const isHttpError = err => _.isError(err) && ('HttpCode' in err);

export const isNullValue = v => _.isUndefined(v) || _.isNull(v);
