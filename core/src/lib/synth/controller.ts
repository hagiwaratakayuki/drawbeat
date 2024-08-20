import type { Voices } from "./voices";

export class Synth {
    _notes: number[]
    async init() {
        this._notes = []
        const cls = await _loadSynth()
        this._synth = new cls({ voices: 64 });

    }
    setVoice(index) {
        this._synth.send([0xc0, index]);
    }
    noteOn(note) {
        this._notes.push(note)
        this._synth.send([0x90, note, 100])
    }
    noteOff() {
        for (const note of this._notes) {
            this._synth.send([0x80, note, 0])

        }
        this._notes = []
    }


}




export async function getVoices() {
    const cls = await _loadSynth()
    const synth = new cls({ voices: 64 });
    const voices: Voices = []

    for (let index = 0; index < 128; ++index) {
        const name = synth.getTimbreName(0, index);
        voices.push({ index, name })
    }
    return voices
}
let _WebAudioTinySynth = null;
async function _loadSynth() {
    if (typeof window === 'undefined') {
        return
    }
    if (_WebAudioTinySynth === null) {
        const imported = await import("webaudio-tinysynth")
        _WebAudioTinySynth = imported.default
    }
    return _WebAudioTinySynth

}