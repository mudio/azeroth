'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Azeroth - Constants enumerating the HTTP status codes.
 *
 * All status codes defined in RFC1945 (HTTP/1.0, RFC2616 (HTTP/1.1),
 * RFC2518 (WebDAV), RFC6585 (Additional HTTP Status Codes), and
 * RFC7538 (Permanent Redirect) are supported.
 *
 * Based on the org.apache.commons.httpclient.HttpStatus Java API.
 *
 * @file httpcode.js
 * @author mudio(job.mudio@gmail.com)
 */

let Http100 = exports.Http100 = class Http100 extends Error {
    get HttpCode() {
        return 100;
    }

    get HttpMessage() {
        return 'Continue';
    }
};
let Http101 = exports.Http101 = class Http101 extends Error {
    get HttpCode() {
        return 101;
    }

    get HttpMessage() {
        return 'Switching Protocols';
    }
};
let Http102 = exports.Http102 = class Http102 extends Error {
    get HttpCode() {
        return 102;
    }

    get HttpMessage() {
        return 'Processing';
    }
};
let Http200 = exports.Http200 = class Http200 extends Error {
    get HttpCode() {
        return 200;
    }

    get HttpMessage() {
        return 'OK';
    }
};
let Http201 = exports.Http201 = class Http201 extends Error {
    get HttpCode() {
        return 201;
    }

    get HttpMessage() {
        return 'Created';
    }
};
let Http202 = exports.Http202 = class Http202 extends Error {
    get HttpCode() {
        return 202;
    }

    get HttpMessage() {
        return 'Accepted';
    }
};
let Http203 = exports.Http203 = class Http203 extends Error {
    get HttpCode() {
        return 203;
    }

    get HttpMessage() {
        return 'Non Authoritative Information';
    }
};
let Http204 = exports.Http204 = class Http204 extends Error {
    get HttpCode() {
        return 204;
    }

    get HttpMessage() {
        return 'No Content';
    }
};
let Http205 = exports.Http205 = class Http205 extends Error {
    get HttpCode() {
        return 205;
    }

    get HttpMessage() {
        return 'Reset Content';
    }
};
let Http206 = exports.Http206 = class Http206 extends Error {
    get HttpCode() {
        return 206;
    }

    get HttpMessage() {
        return 'Partial Content';
    }
};
let Http207 = exports.Http207 = class Http207 extends Error {
    get HttpCode() {
        return 207;
    }

    get HttpMessage() {
        return 'Multi-Status';
    }
};
let Http300 = exports.Http300 = class Http300 extends Error {
    get HttpCode() {
        return 300;
    }

    get HttpMessage() {
        return 'Multiple Choices';
    }
};
let Http301 = exports.Http301 = class Http301 extends Error {
    get HttpCode() {
        return 301;
    }

    get HttpMessage() {
        return 'Moved Permanently';
    }
};
let Http302 = exports.Http302 = class Http302 extends Error {
    constructor(location = '/') {
        super('Moved Temporarily');

        this.location = location;
    }

    get HttpCode() {
        return 302;
    }

    get HttpMessage() {
        return 'Moved Temporarily';
    }
};
let Http303 = exports.Http303 = class Http303 extends Error {
    get HttpCode() {
        return 303;
    }

    get HttpMessage() {
        return 'See Other';
    }
};
let Http304 = exports.Http304 = class Http304 extends Error {
    get HttpCode() {
        return 304;
    }

    get HttpMessage() {
        return 'Not Modified';
    }
};
let Http305 = exports.Http305 = class Http305 extends Error {
    get HttpCode() {
        return 305;
    }

    get HttpMessage() {
        return 'Use Proxy';
    }
};
let Http307 = exports.Http307 = class Http307 extends Error {
    get HttpCode() {
        return 307;
    }

    get HttpMessage() {
        return 'Temporary Redirect';
    }
};
let Http308 = exports.Http308 = class Http308 extends Error {
    get HttpCode() {
        return 308;
    }

    get HttpMessage() {
        return 'Permanent Redirect';
    }
};
let Http400 = exports.Http400 = class Http400 extends Error {
    get HttpCode() {
        return 400;
    }

    get HttpMessage() {
        return 'Bad Request';
    }
};
let Http401 = exports.Http401 = class Http401 extends Error {
    get HttpCode() {
        return 401;
    }

    get HttpMessage() {
        return 'Unauthorized';
    }
};
let Http402 = exports.Http402 = class Http402 extends Error {
    get HttpCode() {
        return 402;
    }

    get HttpMessage() {
        return 'Payment Required';
    }
};
let Http403 = exports.Http403 = class Http403 extends Error {
    get HttpCode() {
        return 403;
    }

    get HttpMessage() {
        return 'Forbidden';
    }
};
let Http404 = exports.Http404 = class Http404 extends Error {
    get HttpCode() {
        return 404;
    }

    get HttpMessage() {
        return 'Not Found';
    }
};
let Http405 = exports.Http405 = class Http405 extends Error {
    get HttpCode() {
        return 405;
    }

    get HttpMessage() {
        return 'Method Not Allowed';
    }
};
let Http406 = exports.Http406 = class Http406 extends Error {
    get HttpCode() {
        return 406;
    }

    get HttpMessage() {
        return 'Not Acceptable';
    }
};
let Http407 = exports.Http407 = class Http407 extends Error {
    get HttpCode() {
        return 407;
    }

    get HttpMessage() {
        return 'Proxy Authentication Required';
    }
};
let Http408 = exports.Http408 = class Http408 extends Error {
    get HttpCode() {
        return 408;
    }

    get HttpMessage() {
        return 'Request Timeout';
    }
};
let Http409 = exports.Http409 = class Http409 extends Error {
    get HttpCode() {
        return 409;
    }

    get HttpMessage() {
        return 'Conflict';
    }
};
let Http410 = exports.Http410 = class Http410 extends Error {
    get HttpCode() {
        return 410;
    }

    get HttpMessage() {
        return 'Gone';
    }
};
let Http411 = exports.Http411 = class Http411 extends Error {
    get HttpCode() {
        return 411;
    }

    get HttpMessage() {
        return 'Length Required';
    }
};
let Http412 = exports.Http412 = class Http412 extends Error {
    get HttpCode() {
        return 412;
    }

    get HttpMessage() {
        return 'Precondition Failed';
    }
};
let Http413 = exports.Http413 = class Http413 extends Error {
    get HttpCode() {
        return 413;
    }

    get HttpMessage() {
        return 'Request Entity Too Large';
    }
};
let Http414 = exports.Http414 = class Http414 extends Error {
    get HttpCode() {
        return 414;
    }

    get HttpMessage() {
        return 'Request-URI Too Long';
    }
};
let Http415 = exports.Http415 = class Http415 extends Error {
    get HttpCode() {
        return 415;
    }

    get HttpMessage() {
        return 'Unsupported Media Type';
    }
};
let Http416 = exports.Http416 = class Http416 extends Error {
    get HttpCode() {
        return 416;
    }

    get HttpMessage() {
        return 'Requested Range Not Satisfiable';
    }
};
let Http417 = exports.Http417 = class Http417 extends Error {
    get HttpCode() {
        return 417;
    }

    get HttpMessage() {
        return 'Expectation Failed';
    }
};
let Http419 = exports.Http419 = class Http419 extends Error {
    get HttpCode() {
        return 419;
    }

    get HttpMessage() {
        return 'Insufficient Space on Resource';
    }
};
let Http420 = exports.Http420 = class Http420 extends Error {
    get HttpCode() {
        return 420;
    }

    get HttpMessage() {
        return 'Method Failure';
    }
};
let Http422 = exports.Http422 = class Http422 extends Error {
    get HttpCode() {
        return 422;
    }

    get HttpMessage() {
        return 'Unprocessable Entity';
    }
};
let Http423 = exports.Http423 = class Http423 extends Error {
    get HttpCode() {
        return 423;
    }

    get HttpMessage() {
        return 'Locked';
    }
};
let Http424 = exports.Http424 = class Http424 extends Error {
    get HttpCode() {
        return 424;
    }

    get HttpMessage() {
        return 'Failed Dependency';
    }
};
let Http428 = exports.Http428 = class Http428 extends Error {
    get HttpCode() {
        return 428;
    }

    get HttpMessage() {
        return 'Precondition Required';
    }
};
let Http429 = exports.Http429 = class Http429 extends Error {
    get HttpCode() {
        return 429;
    }

    get HttpMessage() {
        return 'Too Many Requests';
    }
};
let Http431 = exports.Http431 = class Http431 extends Error {
    get HttpCode() {
        return 431;
    }

    get HttpMessage() {
        return 'Request Header Fields Too Large';
    }
};
let Http500 = exports.Http500 = class Http500 extends Error {
    get HttpCode() {
        return 500;
    }

    get HttpMessage() {
        return 'Server Error';
    }
};
let Http501 = exports.Http501 = class Http501 extends Error {
    get HttpCode() {
        return 501;
    }

    get HttpMessage() {
        return 'Not Implemented';
    }
};
let Http502 = exports.Http502 = class Http502 extends Error {
    get HttpCode() {
        return 502;
    }

    get HttpMessage() {
        return 'Bad Gateway';
    }
};
let Http503 = exports.Http503 = class Http503 extends Error {
    get HttpCode() {
        return 503;
    }

    get HttpMessage() {
        return 'Service Unavailable';
    }
};
let Http504 = exports.Http504 = class Http504 extends Error {
    get HttpCode() {
        return 504;
    }

    get HttpMessage() {
        return 'Gateway Timeout';
    }
};
let Http505 = exports.Http505 = class Http505 extends Error {
    get HttpCode() {
        return 505;
    }

    get HttpMessage() {
        return 'HTTP Version Not Supported';
    }
};
let Http507 = exports.Http507 = class Http507 extends Error {
    get HttpCode() {
        return 507;
    }

    get HttpMessage() {
        return 'Insufficient Storage';
    }
};
let Http511 = exports.Http511 = class Http511 extends Error {
    get HttpCode() {
        return 511;
    }

    get HttpMessage() {
        return 'Network Authentication Required';
    }
};