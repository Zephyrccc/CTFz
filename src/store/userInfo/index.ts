import { Module } from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'
import { IRootState,IUserInfoState } from '@/types'



export const UserInfo: Module<IUserInfoState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};