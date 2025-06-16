import Link from 'next/link';

export default function AuthPage({ type }: { type: 'login' | 'signup' }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {type === 'login' ? 'Login to Homiese' : 'Sign Up for Homiese'}
        </h2>
        <form>
          {type === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="John Doe" required />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded-lg" placeholder="example@email.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border rounded-lg" placeholder="••••••••" required />
          </div>
          {type === 'signup' && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" className="w-full p-2 border rounded-lg" placeholder="••••••••" required />
            </div>
          )}
          {type === 'login' && (
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
            </div>
          )}
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {type === 'login' ? (
            <>Don&#39;t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link></>
          ) : (
            <>Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
