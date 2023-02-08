import { MutationTree } from "vuex"
import { IChallengeInfoState, TYPES, ITagItem } from "@/types"


export const mutations: MutationTree<IChallengeInfoState> = {
    [TYPES.UPDATE_TAG_LIST]: (state, tagList: ITagItem[]) => {
        state.tagList = tagList
    },
}