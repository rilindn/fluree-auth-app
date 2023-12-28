'use client'

import RegisterForm from "../../../components/Forms/RegisterForm/RegisterForm"

export default function Register() {

  return (
    <section className="grid h-screen place-items-center bg-[#161b22]">
      <div className="page bg-red">
        <div className="signin flex flex-col justify-center items-center bg-[#0d1117] rounded-3xl">
          <div className="card px-8 py-5 min-w-[360px]">
            <div className="w-full flex justify-center items-center py-5">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Register to
                <span className="text-emerald-400"> ThoughtBank</span>
              </h2>
            </div>
            <RegisterForm/>
          </div>
          <span className="mb-4 text-sm">Dont have an account? 
            <a className="text-emerald-400" href="/auth/login"> Sign in</a>
          </span>
        </div>
      </div>
    </section>
  );
}