import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginResponse {
  token: string;
  permissions: string[];
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("Response", response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "permissions",
        JSON.stringify(response.data.permissions)
      );
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://d100mj7v0l85u5.cloudfront.net/s3fs-public/blog/los-10-equipos-medicos-mas-importantes-en-los-hospitales.png)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-blue-600 to-sky-400 opacity-70 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
            <div className="self-start hidden lg:flex flex-col text-white font-serif">
              <h1 className="mb-3 font-bold text-5xl ">
                Hola ? Bienvenido a Unimedica{" "}
              </h1>
              <p className="pr-3">
                Equipamos el futuro de la medicina: Soluciones integrales para
                clínicas, policlínicas, instituciones consultorios, hospitales y
                laboratorios.
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100">
              {/*Logo*/}

              <div className="flex justify-center mb-4">
                <a className="btn btn-ghost text-xl">
                  <img
                    src="/LOGO UNIMEDICA 2024.png"
                    alt="Logo"
                    className="w-32 h-auto"
                  />
                </a>
              </div>
              {/*Fin Logo*/}
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Iniciar Sesión
                </h3>
                <p className="text-gray-500">Porfavor ingrese su cuenta.</p>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="space-y-5 font-serif">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      className="w-full text-base px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600"
                      type="email"
                      placeholder="mail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    {/* 
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                      />
                      <label
                        aria-disabled
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-800"
                      >
                        Recordarme
                      </label>
                    </div>
                    */}
                    {/** 
                    <div className="text-sm">
                      <a
                        href="#"
                        className="text-blue-400 hover:text-green-500 disabled:shadow-none"
                      >
                        Olvidaste tu contraseña?
                      </a>
                    </div>
                    */}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2025
                  <a
                    href="https://unimedica.com.pe/"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Unimedica"
                    className="text-green hover:text-blue-500 "
                  >
                    {" "}Unimedica
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
