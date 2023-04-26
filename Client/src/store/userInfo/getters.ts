import { GetterTree } from 'vuex'
import { IRootState, IUserInfo } from '~/types'

type CaptainCheckFunction = (captainID: number) => boolean
type UserCheckFunction = (userID: number) => boolean

export const getters: GetterTree<IUserInfo, IRootState> = {
  isLogin(state): boolean {
    return state?.id ? true : false
  },
  haveTeam(state): boolean {
    if (state?.team === null) return false
    return true
  },
  isCaptain(state): CaptainCheckFunction {
    return function (captainID: number): boolean {
      if (state?.id === captainID) return true
      return false
    }
  },
  isUserSelf(state): UserCheckFunction {
    return function (userID: number): boolean {
      if (state?.id === userID) return true
      return false
    }
  }
}
