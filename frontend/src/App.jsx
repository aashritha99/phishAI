import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import URLChecker from "./pages/URLChecker";
import EmailChecker from "./pages/EmailChecker";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Simple Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="font-bold text-lg">PhishAI</h1>
            <div className="space-x-4">
              <Link to="/">Home</Link>
              <Link to="/url-checker">URL Checker</Link>
              <Link to="/email-checker">Email Checker</Link>
              <Link to="/history">History</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/url-checker" element={<URLChecker />} />
            <Route path="/email-checker" element={<EmailChecker />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
          © {new Date().getFullYear()} PhishGuard. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
