/**
 * Azeroth - Interface - Controller
 *
 * @file Controller.js
 * @author mudio(job.mudio@gmail.com)
 */

import {ControllerCategory} from '../types';

export default class IController {
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    static [ControllerCategory] = true;
}
