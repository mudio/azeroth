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

export class Http100 extends Error {
    get HttpCode() {
        return 100;
    }

    get HttpMessage() {
        return 'Continue';
    }
}

export class Http101 extends Error {
    get HttpCode() {
        return 101;
    }

    get HttpMessage() {
        return 'Switching Protocols';
    }
}

export class Http102 extends Error {
    get HttpCode() {
        return 102;
    }

    get HttpMessage() {
        return 'Processing';
    }
}

export class Http200 extends Error {
    get HttpCode() {
        return 200;
    }

    get HttpMessage() {
        return 'OK';
    }
}

export class Http201 extends Error {
    get HttpCode() {
        return 201;
    }

    get HttpMessage() {
        return 'Created';
    }
}

export class Http202 extends Error {
    get HttpCode() {
        return 202;
    }

    get HttpMessage() {
        return 'Accepted';
    }
}

export class Http203 extends Error {
    get HttpCode() {
        return 203;
    }

    get HttpMessage() {
        return 'Non Authoritative Information';
    }
}

export class Http204 extends Error {
    get HttpCode() {
        return 204;
    }

    get HttpMessage() {
        return 'No Content';
    }
}

export class Http205 extends Error {
    get HttpCode() {
        return 205;
    }

    get HttpMessage() {
        return 'Reset Content';
    }
}

export class Http206 extends Error {
    get HttpCode() {
        return 206;
    }

    get HttpMessage() {
        return 'Partial Content';
    }
}

export class Http207 extends Error {
    get HttpCode() {
        return 207;
    }

    get HttpMessage() {
        return 'Multi-Status';
    }
}

export class Http300 extends Error {
    get HttpCode() {
        return 300;
    }

    get HttpMessage() {
        return 'Multiple Choices';
    }
}

export class Http301 extends Error {
    get HttpCode() {
        return 301;
    }

    get HttpMessage() {
        return 'Moved Permanently';
    }
}

export class Http302 extends Error {
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
}

export class Http303 extends Error {
    get HttpCode() {
        return 303;
    }

    get HttpMessage() {
        return 'See Other';
    }
}

export class Http304 extends Error {
    get HttpCode() {
        return 304;
    }

    get HttpMessage() {
        return 'Not Modified';
    }
}

export class Http305 extends Error {
    get HttpCode() {
        return 305;
    }

    get HttpMessage() {
        return 'Use Proxy';
    }
}

export class Http307 extends Error {
    get HttpCode() {
        return 307;
    }

    get HttpMessage() {
        return 'Temporary Redirect';
    }
}

export class Http308 extends Error {
    get HttpCode() {
        return 308;
    }

    get HttpMessage() {
        return 'Permanent Redirect';
    }
}

export class Http400 extends Error {
    get HttpCode() {
        return 400;
    }

    get HttpMessage() {
        return 'Bad Request';
    }
}

export class Http401 extends Error {
    get HttpCode() {
        return 401;
    }

    get HttpMessage() {
        return 'Unauthorized';
    }
}

export class Http402 extends Error {
    get HttpCode() {
        return 402;
    }

    get HttpMessage() {
        return 'Payment Required';
    }
}

export class Http403 extends Error {
    get HttpCode() {
        return 403;
    }

    get HttpMessage() {
        return 'Forbidden';
    }
}

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
        return 'Method Not Allowed';
    }
}

export class Http406 extends Error {
    get HttpCode() {
        return 406;
    }

    get HttpMessage() {
        return 'Not Acceptable';
    }
}

export class Http407 extends Error {
    get HttpCode() {
        return 407;
    }

    get HttpMessage() {
        return 'Proxy Authentication Required';
    }
}

export class Http408 extends Error {
    get HttpCode() {
        return 408;
    }

    get HttpMessage() {
        return 'Request Timeout';
    }
}

export class Http409 extends Error {
    get HttpCode() {
        return 409;
    }

    get HttpMessage() {
        return 'Conflict';
    }
}

export class Http410 extends Error {
    get HttpCode() {
        return 410;
    }

    get HttpMessage() {
        return 'Gone';
    }
}

export class Http411 extends Error {
    get HttpCode() {
        return 411;
    }

    get HttpMessage() {
        return 'Length Required';
    }
}

export class Http412 extends Error {
    get HttpCode() {
        return 412;
    }

    get HttpMessage() {
        return 'Precondition Failed';
    }
}

export class Http413 extends Error {
    get HttpCode() {
        return 413;
    }

    get HttpMessage() {
        return 'Request Entity Too Large';
    }
}

export class Http414 extends Error {
    get HttpCode() {
        return 414;
    }

    get HttpMessage() {
        return 'Request-URI Too Long';
    }
}

export class Http415 extends Error {
    get HttpCode() {
        return 415;
    }

    get HttpMessage() {
        return 'Unsupported Media Type';
    }
}

export class Http416 extends Error {
    get HttpCode() {
        return 416;
    }

    get HttpMessage() {
        return 'Requested Range Not Satisfiable';
    }
}

export class Http417 extends Error {
    get HttpCode() {
        return 417;
    }

    get HttpMessage() {
        return 'Expectation Failed';
    }
}

export class Http419 extends Error {
    get HttpCode() {
        return 419;
    }

    get HttpMessage() {
        return 'Insufficient Space on Resource';
    }
}

export class Http420 extends Error {
    get HttpCode() {
        return 420;
    }

    get HttpMessage() {
        return 'Method Failure';
    }
}

export class Http422 extends Error {
    get HttpCode() {
        return 422;
    }

    get HttpMessage() {
        return 'Unprocessable Entity';
    }
}

export class Http423 extends Error {
    get HttpCode() {
        return 423;
    }

    get HttpMessage() {
        return 'Locked';
    }
}

export class Http424 extends Error {
    get HttpCode() {
        return 424;
    }

    get HttpMessage() {
        return 'Failed Dependency';
    }
}

export class Http428 extends Error {
    get HttpCode() {
        return 428;
    }

    get HttpMessage() {
        return 'Precondition Required';
    }
}

export class Http429 extends Error {
    get HttpCode() {
        return 429;
    }

    get HttpMessage() {
        return 'Too Many Requests';
    }
}

export class Http431 extends Error {
    get HttpCode() {
        return 431;
    }

    get HttpMessage() {
        return 'Request Header Fields Too Large';
    }
}

export class Http500 extends Error {
    get HttpCode() {
        return 500;
    }

    get HttpMessage() {
        return 'Server Error';
    }
}

export class Http501 extends Error {
    get HttpCode() {
        return 501;
    }

    get HttpMessage() {
        return 'Not Implemented';
    }
}

export class Http502 extends Error {
    get HttpCode() {
        return 502;
    }

    get HttpMessage() {
        return 'Bad Gateway';
    }
}

export class Http503 extends Error {
    get HttpCode() {
        return 503;
    }

    get HttpMessage() {
        return 'Service Unavailable';
    }
}

export class Http504 extends Error {
    get HttpCode() {
        return 504;
    }

    get HttpMessage() {
        return 'Gateway Timeout';
    }
}

export class Http505 extends Error {
    get HttpCode() {
        return 505;
    }

    get HttpMessage() {
        return 'HTTP Version Not Supported';
    }
}

export class Http507 extends Error {
    get HttpCode() {
        return 507;
    }

    get HttpMessage() {
        return 'Insufficient Storage';
    }
}

export class Http511 extends Error {
    get HttpCode() {
        return 511;
    }

    get HttpMessage() {
        return 'Network Authentication Required';
    }
}

