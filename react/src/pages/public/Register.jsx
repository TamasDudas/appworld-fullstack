import Form from "../../components/Form";

export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Regisztráció</h1>
        <Form isLogin={false} />
      </div>
    </div>
  );
}
