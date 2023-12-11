'use client';
import React, { useRef, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginSchemaValidation } from 'utils/schemaValidations';
import Link from 'next/link';
import { LoadingButton } from '_components/LoadingButton';
import fetchCurrentUserDetails from 'api/fetchCurrentUserDetails';
import { setUserSession } from '@graphql/mutations';
import * as Sentry from '@sentry/nextjs';
import awsConfig from '@graphql/aws-config';
import { useBoundStore } from '@store/index';
import { Amplify } from 'aws-amplify';
import { saveBusinessVanityNameInCookie } from 'app/action';

Amplify.configure({
  ...awsConfig,
  ssr: true,
});

type LoginSchema = z.infer<typeof loginSchemaValidation>;

const LoginApp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchemaValidation),
  });

  const { ref, ...rest } = register('password');
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const { triggerFetch } = useBoundStore((state) => state);

  const authenticate = async (email: string, password: string) => {
    setSigningIn(true);
    try {
      API.configure(awsConfig);
      await Auth.signOut();
      await Auth.signIn(email, password);
      saveUserSession();

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const redirect_url = params.get('redirect');

      const userDetails = await fetchCurrentUserDetails({
        Auth,
        API,
      });

      if (userDetails?.businessListData[0]?.id)
        triggerFetch(`${userDetails?.businessListData[0]?.id}`, false);

      localStorage.setItem('openSidebar', JSON.stringify(true));

      await saveBusinessVanityNameInCookie(
        userDetails.businessListData[0]?.vanity_name as string,
      );

      if (redirect_url) {
        router.push(`${redirect_url}`);
      } else {
        router.push(`/`);
      }
    } catch (error) {
      setError('password', { message: 'Wrong password. Try again or reset' });
    } finally {
      setSigningIn(false);
    }
  };

  const saveUserSession = async () => {
    try {
      await API.graphql(graphqlOperation(setUserSession));
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    }
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    await authenticate(data.email, data.password);
  };

  const togglePassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current?.type === 'password' ? 'text' : 'password';
    }
  };

  return (
    <>
      <div className="flex flex-col grow p-4 pt-20 overflow-y-auto">
        <div className="max-w-lg mx-auto w-full">
          <div className="p-4 shadow-lg rounded-md">
            <h4 className="h4 mb-4">Login</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              <label className="form-label " htmlFor="email">
                Email*
              </label>
              <input
                className={`input i-righ ${errors.email && 'error'} mb-4`}
                placeholder="Enter Email Address"
                type="email"
                id="email"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-warningColor text-xs absolute left-0 top-[63px]">
                  {errors.email?.message}
                </span>
              )}

              <label className="form-label relative" htmlFor="email">
                Password*
              </label>

              <input
                className={`input i-righ ${errors.password && 'error'}`}
                placeholder="Enter Password"
                type="password"
                id="password"
                {...rest}
                ref={(e) => {
                  ref(e);
                  passwordRef.current = e;
                }}
              />

              <button
                className="absolute mt-[13px] right-[10px] inline-flex text-base items-center justify-center text-darkGrade50 hover:text-darkGrade75"
                role="button"
                type="button"
                onClick={togglePassword}
              >
                <i className="icon-eye"></i>
              </button>

              <div className="flex items-start mt-1">
                {errors.password && (
                  <span className="text-warningColor text-xs">
                    {errors.password?.message}
                  </span>
                )}

                <div className="ml-auto w-[110px] ">
                  <Link href="/forgot" className="link text-xs">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                {!signingIn ? (
                  <button className="btn">Login</button>
                ) : (
                  <LoadingButton text="Signing In..." />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginApp;
