"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModel from "../hooks/useRegisterModel";
import useLoginModel from "../hooks/useLoginModel";
import Model from "./Model";
import Heading from "../Heading";
import Inputs from "../inputs/Inputs";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";



const LoginModel = () => {
  const router = useRouter();

  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
  } =useForm<FieldValues>({
    defaultValues: {
        email: '',
        password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModel.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }

    })
  }

  const toggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
  }, [loginModel, registerModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title="Welcome back"
          subtitle="Login to your account"
        />
        <Inputs 
          id='email'
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Inputs 
          id='password'
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-center 
            gap-2"
        >
          <div>
            First time using Airbnb?
          </div>
          <div
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Model 
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModel