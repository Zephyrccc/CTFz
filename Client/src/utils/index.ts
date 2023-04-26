/**
 * @description    保存token
 * @param access   access_token
 * @param refresh  refresh_token
 */
export const saveToken = (
    access: string | null = null,
    refresh: string | null = null
) => {
    access ? localStorage.setItem('access_token', access) : null
    refresh ? localStorage.setItem('refresh_token', refresh) : null
}
