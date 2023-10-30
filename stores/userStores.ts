import { defineStore } from 'pinia'

interface User {
    email: String
    name: String
    type: String
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '' as String,
        user: {} as User
    }),
    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    },
    actions: {
        setToken(token: String) {
            this.token = token
        },
        setUser(user: User) {
            this.user = user
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
})