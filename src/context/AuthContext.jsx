import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const activeUser = localStorage.getItem('activeUser')
    if (activeUser) setUser(JSON.parse(activeUser))
  }, [])

  const getStoredUsers = () => JSON.parse(localStorage.getItem('registeredUsers')) || []

  // Register
  const register = async (userData) => {
    await new Promise((res) => setTimeout(res, 600))
    const users = getStoredUsers()
    
    if (users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, message: 'Email is already registered' }
    }

    const newUser = { id: Date.now().toString(), ...userData }
    users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    const { password, ...sessionUser } = newUser
    setUser(sessionUser)
    localStorage.setItem('activeUser', JSON.stringify(sessionUser))

    return { success: true }
  }

  // Login
  const login = async ({ email, password }) => {
    await new Promise((res) => setTimeout(res, 600))
    const users = getStoredUsers()
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' }
    }

    const { password: _, ...sessionUser } = foundUser
    setUser(sessionUser)
    localStorage.setItem('activeUser', JSON.stringify(sessionUser))

    return { success: true }
  }

  // Forgot Password
  const forgotPassword = async (email) => {
    await new Promise((res) => setTimeout(res, 600))
    const users = getStoredUsers()
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!foundUser) {
      return { success: false, message: 'No account found with this email' }
    }

    return { success: true, message: 'Password reset link sent to your email (Mocked)' }
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('activeUser')
  }

  return (
    <AuthContext.Provider value={{ user, register, login, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)