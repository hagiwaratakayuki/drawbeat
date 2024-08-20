let WIDTH_PER_MESURE = 60;
let _BPM = 120;
let DEFAULT_CUT = 16
export function setBPM(BPM) {
    _BPM = BPM;
}
export function setWidthPerMesure(widthPerMesure) {
    WIDTH_PER_MESURE = widthPerMesure
}
export function time2Pix(timeDiff) {

    return (timeDiff / 1000) * (WIDTH_PER_MESURE / 4) * (_BPM / 60)

}
export function pix2time(pix) {
    const beatCount = pix / (WIDTH_PER_MESURE / 4)
    const perBeatTime = 60 / _BPM
    return beatCount * perBeatTime * 1000



}
export function pix2timeReguraized(pix, cut = 16) {
    const time = pix2time(pix);
    return timeReguraise(time, cut)


}
export function timeReguraise(time, cut = 16) {
    const timestep = (60 / _BPM) / (cut / 4) * 1000
    return Math.floor(time / timestep) * timestep

}
export function y2note(y, key = 60) {
    return Math.floor((1 - y) / (1 / 12)) + key
}