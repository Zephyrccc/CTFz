import { createStore } from "vuex"
import { UserInfo } from "./userInfo"
import { ChallengeInfo } from "./challengeInfo"

export default createStore({
  modules: {
    UserInfo,
    ChallengeInfo
  }
})