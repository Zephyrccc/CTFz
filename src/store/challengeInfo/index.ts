import { Module } from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'
import { IRootState, IChallengeInfoState } from '@/types'



export const ChallengeInfo: Module<IChallengeInfoState, IRootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};