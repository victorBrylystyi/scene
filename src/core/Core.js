
class Core {
    constructor(name = ''){
        this.name = name;
        this.appConfig = {
            fps: 60,
            dT: 0,
            tPrev: window.performance.now(),
            speed: 0.001,
            fi: 0,
        };
    }
    init(){}
    render(){}
}

export { Core };