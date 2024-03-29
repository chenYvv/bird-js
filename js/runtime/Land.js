import { Sprite } from "../base/Sprite.js";
import { Director } from "../Director.js";

export class Land extends Sprite {

    constructor() {
        const image = Sprite.getImage('land');
        super(
            image,
            0, 0,
            image.width, image.height,
            0, window.innerHeight - image.height,
            image.width, image.height
        );
        // 地板水平变化坐标
        this.landX = 0;
        // 地板移动速度
        this.landSpeed = Director.getInstance().moveSpeed;
    }

    draw() {
        this.landX = this.landX + this.landSpeed;
        if ( this.landX > (this.img.width - window.innerWidth) ) {
            this.landX = 0;
        }
        super.draw(
            this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.landX,
            this.y,
            this.width,
            this.height
        );
    }
}