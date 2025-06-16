export default function HeaderGuest() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700">SIPMAS</h1>
      <nav className="space-x-4">
        <a href="#tentang" className="text-gray-600 hover:text-blue-600">Tentang</a>
        <a href="#fitur" className="text-gray-600 hover:text-blue-600">Fitur</a>
        <a href="#testimoni" className="text-gray-600 hover:text-blue-600">Testimoni</a>
        <a href="/login" className="text-sm font-semibold text-blue-600 hover:underline">Login</a>
        <a href="/register" className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Register</a>
      </nav>
    </header>
  );
}
