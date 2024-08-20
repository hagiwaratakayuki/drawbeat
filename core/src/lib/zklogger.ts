
//仮
//最初にフックした処理が、event.targetのdatasetにnonsを設定
//初期値nonseの証明を作成
//チェーン上の証明を作成
//コネクト証明を作成

import { Field, SelfProof, ZkProgram, verify } from 'o1js';

const Logger = ZkProgram({
    name: 'add-example',
    publicInput: Field,

    methods: {
        init: {
            privateInputs: [],

            async method(state: Field) {
                state.assertEquals(Field(0));
            },
        },

        log: {
            privateInputs: [SelfProof],
            async method(

                earlierProof: SelfProof<Field, void>,

            ) {
                earlierProof.verify();

            },
        },


    },
});

export async function getVarifacationKey() {
    const { verificationKey } = await Logger.compile();
    return verificationKey
}
getVarifacationKey().then(console.log)
export class ZKLogger {
    proof: typeof SelfProof

    async init() {
        await getVarifacationKey();
        this.proof = await Logger.init(Field(0))
    }
    async log() {
        this.proof = await Logger.log(this.proof)
    }
    json() {
        return this.proof.toString()
    }
}