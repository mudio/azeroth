/**
 * Azeroth - error
 *
 * @file error.js
 * @author mudio(job.mudio@gmail.com)
 */

export class Http404 extends Error {
    get HttpCode() {
        return 404;
    }

    get HttpMessage() {
        return 'Not Found';
    }
}

export class Http405 extends Error {
    get HttpCode() {
        return 405;
    }

    get HttpMessage() {
        return 'Access Deny';
    }
}

export class Http500 extends Error {
    get HttpCode() {
        return 500;
    }

    get HttpMessage() {
        return 'Bad Request';
    }
}
