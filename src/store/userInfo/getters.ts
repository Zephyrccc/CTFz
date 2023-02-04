import { GetterTree } from "vuex"
import { IRootState, IUserInfoState } from "@/types"

export const getters: GetterTree<IUserInfoState, IRootState> = {
    isLogin(state): Boolean {
        return state.id ? true : false;
    }
}