// 初始化游戏精灵  作为游戏开始得入口
import { ResourceLoader } from './js/base/ResourceLoader.js'
import { BackGround } from './js/runtime/BackGround.js';
import { DataStore } from './js/base/DataStore.js';
import { Director } from './js/Director.js';
import { Land } from './js/runtime/Land.js';
import { Birds } from './js/player/Birds.js';
import { StartButton } from './js/player/StartButton.js';
import { Score } from './js/player/Score.js';

export class Main {
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {

        // 游戏开始结束的状态
        this.director.isGameOver = false;

        // 初始化精灵
        this.dataStore
            .put('birds', Birds)
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('startButton', StartButton)
            .put('score', Score);

        // 注册点击事件
        this.registerEvent();

        // 游戏运行之前就要创建好铅笔
        this.director.createPencil();

        // 给导演说可以开始了
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {
            //屏蔽掉JS的事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });
    }
}