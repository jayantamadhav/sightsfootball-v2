import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Loader from "../../components/Loader";
import Spinner from "../../components/Spinner";
import { btnPurple } from "../../public/styles/styles";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [btnLoading, setBtnLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res.ok) router.push("/admin");
      else setError("Wrong credentials, please try again");
    } catch (err) {
      setError(err);
    }
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center h-screen">
      <div className="login-container drop-shadow-md rounded-md">
        <form
          className="bg-midnight w-full"
          onSubmit={(e: React.SyntheticEvent) => {
            setBtnLoading(true), handleSubmit(e);
          }}
        >
          <div className="bg-midnight py-5 text-3xl text flex justify-center font-medium text-purple-300">
            SightsFootball
          </div>
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{error}</span>
            </div>
          )}
          <div>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mt-5">
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className={btnPurple} disabled={btnLoading}>
            Login {btnLoading && <Spinner />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
