/**
 * Created by sergey on 26.03.17.
 */
import {Object} from './Object';

export default class Ball extends Object{
    constructor(str) {
        super(str);
        this.state = 0;
    }
}
