export default function HeaderGuest() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow z-50">
      <div className="w-full px-0 py-4 flex justify-between items-center">
        {/* Logo */}
        <img
          src="/img/logo.png" 
          alt="Logo SIPMAS"
          className="w-24 ml-15"
        />

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 pr-4">
          <a
            href="#tentang"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Tentang
          </a>
          <a
            href="#fitur"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Fitur
          </a>
          <a
            href="#testimoni"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Testimoni
          </a>
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Register
          </a>
        </nav>
      </div>
    </header>
  );
}
