/**
 * Azeroth - 日志记录器
 *
 * @file logger.js
 * @author mudio(job.mudio@gmail.com)
 */

import logger from 'debug';

if (process.env.NODE_ENV === 'development') {
    logger.log = console.log.bind(console); // eslint-disable-line no-console
}

export const debug = logger('Azeroth:Debug');
export const info = logger('Azeroth:Info');
export const warn = logger('Azeroth:Warn');
export const error = logger('Azeroth:Error');
