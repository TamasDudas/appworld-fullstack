import Form from "./components/Form";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Hi
          </h1>

          {/* Form középen */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
              <Form isLogin={true} />
            </div>
          </div>

          {/* Itt jöhetnek majd más komponensek */}
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
