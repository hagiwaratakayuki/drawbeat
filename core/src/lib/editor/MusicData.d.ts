export declare type Point = { x: number, y: number }

export declare type MelodyLine = {
    color: string
    points: Point[]
}
export declare type MelodyLines = MelodyLine[]

export declare type Beat = {
    start: number
    end: number
}

export declare type Beats = Beat[];