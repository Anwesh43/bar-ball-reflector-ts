const w : number = window.innerWidth
const h : number = window.innerHeight
const parts : number = 3 
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90 
const delay : number = 20 
const colors : Array<string> = [
    "#f44336",
    "#9C27B0",
    "#0D47A1",
    "#33691E",
    "#BF360C"
]
const backColor : string = "#bdbdbd"
const barFactor : number = 5.9 
const rFactor : number = 15.9 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }
    
    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.divideScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawBarBallReflector(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sff2 : number = ScaleUtil.sinify(sf2)
        const size : number = w / barFactor 
        const r : number = Math.min(w, h) / rFactor 
        context.save()
        DrawingUtil.drawCircle(
            context, 
            r + (w - 2 * r) * sf2,
            r + (h - 3 * r) * sff2,
            r * sf1 
        )
        context.fillRect(
            w - size * sf1 - (w / 2 - size / 2) * sff2,
            h - r, 
            size * sf1, 
            r  
        )
        context.restore()
    }

    static drawBBRNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.fillStyle = colors[i]
        DrawingUtil.drawBarBallReflector(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }
}