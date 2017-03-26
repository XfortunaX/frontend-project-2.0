/**
 * Created by sergey on 26.03.17.
 */
import {Object} from './Object';

export default class Platform extends Object{

    getPosBall(ballSize) {
        return {
            x: this.image.x + this.image.width / 2 - ballSize.width / 2,
            y: this.image.y + ballSize.height
        };
    }

}

