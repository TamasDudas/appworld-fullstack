import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <h1>App</h1>
      </AuthProvider>
    </>
  );
}

export default App;
