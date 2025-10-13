import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <h1 className="text-3xl font-bold underline">App</h1>
      </AuthProvider>
    </>
  );
}

export default App;
