'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Login failed')
      } else {
        // localStorage'a kaydet
        localStorage.setItem('user_id', result.data.user.id)
        localStorage.setItem('access_token', result.data.session.access_token)

        // Yönlendirme
        window.location.href = '/dashboard' // Giriş sonrası gitmek istediğin sayfa
      }
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/rezerve.png')" }}
      />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 backdrop-blur-sm ">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all border border-white/20">
          
          {/* LOGIN */}
          <div className={`w-full md:w-1/2 p-8 transition-all duration-500 text-white ${isRegistering ? '-translate-x-full opacity-0' : 'opacity-100'}`}>
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>
              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
              <div className="mb-4 text-right text-sm">
                <a href="#" className="text-blue-300 hover:underline">Forgot Password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p className="mt-4 text-center text-sm">or login with</p>
            <div className="flex justify-center space-x-4 mt-2 text-white">
              <FontAwesomeIcon icon={faGoogle} className="text-xl cursor-pointer" />
              <FontAwesomeIcon icon={faFacebook} className="text-xl cursor-pointer" />
              <FontAwesomeIcon icon={faGithub} className="text-xl cursor-pointer" />
              <FontAwesomeIcon icon={faLinkedin} className="text-xl cursor-pointer" />
            </div>
          </div>

          {/* REGISTER */}
          <div className={`w-full md:w-1/2 p-8 transition-all duration-500 text-white ${isRegistering ? 'opacity-100' : 'translate-x-full opacity-0'}`}>
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form>
              <div className="mb-4">
                <input type="text" placeholder="Username" className="w-full px-4 py-3 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none" />
              </div>
              <div className="mb-4">
                <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">Register</button>
            </form>
            <p className="mt-4 text-center text-sm">or register with</p>
            <div className="flex justify-center space-x-4 mt-2 text-white">
              <FontAwesomeIcon icon={faGoogle} className="text-xl cursor-pointer" />
              <FontAwesomeIcon icon={faFacebook} className="text-xl cursor-pointer" />
              <FontAwesomeIcon icon={faGithub} className="text-xl cursor-pointer" />
              <FontAwesomeIcon icon={faLinkedin} className="text-xl cursor-pointer" />
            </div>
          </div>

          {/* TOGGLE BUTTON */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isRegistering ? 'Back to Login' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
