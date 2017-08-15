/**
 * azeroth - 日志记录器
 *
 * @file logger.js
 * @author mudio(job.mudio@gmail.com)
 */

import logger from 'debug';

if (process.env.NODE_ENV === 'development') {
    logger.log = console.log.bind(console); // eslint-disable-line no-console
}

export const debug = logger('azeroth:debug');
export const info = logger('azeroth:info');
export const warn = logger('azeroth:warn');
export const error = logger('azeroth:error');
