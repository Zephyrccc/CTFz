import { MutationTree } from 'vuex'
import { IUserInfo, TYPES } from '~/types'

export const mutations: MutationTree<IUserInfo> = {
  [TYPES.UPDATE_USER_INFO]: (state, UserInfo: IUserInfo) => {
    state.id = UserInfo.id
    state.username = UserInfo.username
    state.solve_record = UserInfo.solve_record
    state.total_score = UserInfo.total_score
    state.describe = UserInfo.describe
    state.team = UserInfo.team
  },
  [TYPES.EMPTY_USER_INFO]: state => {
    state.id = null
    state.username = ''
    state.solve_record = []
    state.total_score = 0
    state.describe = ''
    state.team = null
  }
}
