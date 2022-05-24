(() => {
    interface IProperties {
        [key: string]: number;
    }

    const properties: IProperties = {
        spaceDiametr: 32,
        dotDiameter: 14,
        wavelength: 100,
        velocity: .02,
        direction: 1,
        displacement: 1
    };

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let w: number = (canvas.width = innerWidth);
    let h: number = (canvas.height = innerHeight);

    let dotsList: any;

    canvas.style.background = "rgb(17, 17, 23, 1)";
    document.querySelector("body")?.appendChild(canvas);

    window.addEventListener('resize', () => {
        w = (canvas.width = innerWidth);
        h = (canvas.height = innerHeight);
        init()
    })

    class Dot {
        radius: number = properties.dotDiameter / 2
        scale: number = getDistance(this.x, this.y) / properties.wavelength

        constructor(
            public x: number,
            public y: number,
            public num: number,
        ) {
        }

        update(): void {
            this.resize()
            this.draw()
        }

        resize(): void {
            this.scale = this.scale - properties.velocity * properties.direction
        }

        draw(): void {
            let s: number = (1 - Math.abs(Math.sin(this.scale)))
            let o: number = (1 - s) * 255;
            let r: number = this.radius * s
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = `rgb(255, ${o}, ${o}, ${s})`;
            ctx.fill();
        }
    }

    const init = (): void => {
        dotsList = [];

        const dotsCountX: number = (w / properties.spaceDiametr) | 0;
        const dotsCountY: number = (h / properties.spaceDiametr) | 0;

        const startX: number = (properties.spaceDiametr + w - dotsCountX * properties.spaceDiametr) / 2;
        const startY: number = (properties.spaceDiametr + h - dotsCountY * properties.spaceDiametr) / 2;

        let displacement: number = properties.spaceDiametr / 4 * properties.displacement;

        for (let j = 0; j < dotsCountY; j++) {
            displacement = -displacement;
            let y: number = startY + j * properties.spaceDiametr;
            for (let i = 0; i < dotsCountX; i++) {
                let x: number = startX + i * properties.spaceDiametr + displacement;
                dotsList.push(new Dot(x, y, j + i));
            }
        }
    };
    const loop = (): void => {
        ctx.clearRect(0, 0, w, h);

        for (let a in dotsList) {
            dotsList[a].update();
        }

        requestAnimationFrame(loop);
    };
    const getDistance = (x: number, y: number): number => {
        let dx = w / 2 - x;
        let dy = h / 2 - y;
        return Math.sqrt((dx * dx) + (dy * dy));
    };

    init();
    loop();
})();
