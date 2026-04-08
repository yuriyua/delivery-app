import apiClient from './client'

export interface LoginResponse {
    token: string
    user: {
        id: string
        email: string
        name: string
    }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', {
        email,
        password,
    })
    return response.data
}
