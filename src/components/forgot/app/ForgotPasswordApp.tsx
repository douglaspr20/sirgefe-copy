'use client';
import React, { useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { passwordResetSchemaValidation } from '@utils/schemaValidations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';
import TailwindModal from '@components/modals/TailwindModal';
import Head from 'next/head';
import successIcon from '@images/success-icon.svg';
import { API, graphqlOperation } from 'aws-amplify';
import { passwordResetLink } from '@graphql/mutations';
import { LoadingButton } from '@components/LoadingButton';

type PasswordResetSchema = z.infer<typeof passwordResetSchemaValidation>;

function ForgotPasswordApp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchemaValidation),
  });
  const [showDialog, setShowDialog] = useState(false);
  const { ref, ...rest } = register('email');
  const emailRef = useRef<HTMLInputElement | null>(null);
  const pwresetButtonRef = useRef<HTMLButtonElement | null>(null);
  const [sendingLink, setSendingLink] = useState(false);

  const sendPasswordResetLink = async (email: string) => {
    try {
      setSendingLink(true);
      const response: any = await API.graphql({
        ...graphqlOperation(passwordResetLink, {
          passwordResetInput: {
            email,
          },
        }),
        authMode: 'API_KEY',
      });

      if (response.data?.error?.message) {
        throw new Error(response.data.error.message);
      }

      setShowDialog(true);
    } catch (error) {
      Sentry.captureException(error);
      setError('email', { message: 'Email not found, please try again' });
    } finally {
      setSendingLink(false);
    }
  };

  const onSubmit: SubmitHandler<PasswordResetSchema> = async (data) => {
    await sendPasswordResetLink(data.email);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col grow p-4 pt-20 overflow-y-auto">
          <div className="max-w-lg mx-auto w-full">
            <div className="p-4 shadow-lg rounded-md">
              <h4 className="h4 mb-1">Reset password</h4>
              <p className="pb-4 mb-4 text-textTeriraryColor border-extraLightColor border-b">
                Enter your email below to reset your password. We will send a
                reset link to your email.
              </p>
              <div className="flex flex-col mb-4">
                <label className="form-label" htmlFor="email">
                  Email*
                </label>
                <div className="relative">
                  <input
                    className="input"
                    placeholder="Enter Email Address"
                    type="email"
                    id="email"
                    {...rest}
                    ref={(e) => {
                      ref(e);
                      emailRef.current = e;
                    }}
                  />

                  {errors.email && (
                    <span className="text-warningColor text-xs mt-1 pr-28 absolute left-0 top-full">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>
              {!sendingLink ? (
                <div className="flex justify-end">
                  <button className="btn content-end" ref={pwresetButtonRef}>
                    Reset password
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <LoadingButton text="Sending email..." />
                </div>
              )}
            </div>
            <div className="text-center text-textSecondaryColor mt-3">
              <Link
                href="login"
                className="text-primaryColor hover:text-primaryColorHover"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </form>
      <TailwindModal
        id="successModal"
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      >
        <div className="p-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-1">
              <Image src={successIcon} alt="" width={28} height={28} />
            </div>
            <h4>Reset link sent</h4>
            <p className="text-textSecondaryColor text-center mb-4">
              Follow the link in your email and create a new password
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="btn w-72 text-center"
                data-bs-dismiss="modal"
              >
                Got it
              </a>
            </div>
          </div>
        </div>
      </TailwindModal>
    </>
  );
}

export default ForgotPasswordApp;
