import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Đăng nhập thành công!");
      navigate("/home");
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9ebee] px-4">
      <div className="bg-white border border-gray-300 rounded-xl shadow-md w-full max-w-md p-8">
        <h2 className="text-4xl font-bold text-center text-[#1877f2] mb-6">
          Đăng nhập
        </h2>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Hãy đăng nhập để tiếp tục sử dụng
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm text-center p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2] text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2] text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-3 rounded text-sm transition duration-300"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/forgot" className="text-sm text-[#1877f2] hover:underline">
            Quên mật khẩu?
          </a>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-center">
          <a
            href="/register"
            className="inline-block bg-[#42b72a] hover:bg-[#36a420] text-white py-2 px-5 rounded font-semibold text-sm transition"
          >
            Tạo tài khoản mới
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
