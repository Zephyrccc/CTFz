/**
 * @description    保存token
 * @param access   access_token
 * @param refresh  refresh_token
 */
export const saveToken = (access: string | null = null, refresh: string | null = null) => {
    access ? sessionStorage.setItem("access", access) : null
    refresh ? sessionStorage.setItem("refresh", refresh) : null
}
