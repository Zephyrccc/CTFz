import { MutationTree } from "vuex"
import { IChallengeInfoState, TYPES, ITagItem } from "@/types"


export const mutations: MutationTree<IChallengeInfoState> = {
    [TYPES.UPDATE_TAG_LIST]: (state, tagList: ITagItem[]) => {
        let map: Map<number, string> = new Map();
        for (let item of tagList) {
            map.set(item.id, item.value);
        }
        state.tagList = map
    },
}