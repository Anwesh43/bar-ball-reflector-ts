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