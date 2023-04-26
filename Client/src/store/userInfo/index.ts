import { Module } from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'
import { IRootState, IUserInfo } from '~/types'

export const UserInfo: Module<IUserInfo, IRootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
