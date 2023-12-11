'use client';

import React, { FC, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { useRouter, useParams } from 'next/navigation';
import Head from 'next/head';
import { API, graphqlOperation } from 'aws-amplify';
import { changePassword } from '@graphql/mutations';
import Image from 'next/image';
import { z } from 'zod';
import { passwordChangeSchemaValidation } from '@utils/schemaValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import TailwindModal from '@components/modals/TailwindModal';
import successIcon from '@images/success-icon.svg';
import { LoadingButton } from '@components/LoadingButton';

type PasswordChangeSchema = z.infer<typeof passwordChangeSchemaValidation>;

interface Props {
  isValid: boolean;
}

const ResetPasswordApp: FC<Props> = ({ isValid }) => {
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<PasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchemaValidation),
  });

  const password = useRef<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { ref, ...rest } = register('confirmPassword');
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  password.current = watch('password', '');

  const sendChangePasswordRequest = async (
    two_factor_id: string,
    password: string,
  ) => {
    try {
      setChangingPassword(true);
      const response: any = await API.graphql({
        ...graphqlOperation(changePassword, {
          changePasswordInput: {
            two_factor_id,
            password,
          },
        }),
        authMode: 'API_KEY',
      });

      if (response.data?.error?.message) {
        throw new Error(response.data.error.message);
      }

      if (response.data?.changePassword.error?.code) {
        throw new Error(response.data?.changePassword.error.message);
      }

      setShowDialog(true);
    } catch (error) {
      Sentry.captureException(error);
      if (error instanceof Error) {
        setError('confirmPassword', { message: error.message });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const onSubmit: SubmitHandler<PasswordChangeSchema> = async (data, e) => {
    e?.preventDefault();

    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'The passwords do not match' });
      return;
    }

    const two_factor_id = params?.token as string;

    await sendChangePasswordRequest(two_factor_id, password);
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

  return !isValid ? (
    <>
      <div className="flex flex-col grow p-4 pt-20 overflow-y-auto">
        <div className="max-w-lg mx-auto w-full ">
          <div className="p-4 shadow-lg rounded-md">
            <div className="flex flex-col justify-center items-center">
              <svg
                className="relative top-2 right-10"
                width="42"
                height="43"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ zIndex: 10 }}
              >
                <circle
                  cx="21.0006"
                  cy="21.5"
                  r="21"
                  fill="url(#paint0_linear_718_57336)"
                  style={{ zIndex: 1 }}
                />
                <path
                  d="M18.5007 15.6665C18.9609 15.6665 19.334 16.0396 19.334 16.4998C19.334 16.9272 19.0123 17.2794 18.5979 17.3276L18.5007 17.3332L16.834 17.3332C15.4533 17.3332 14.334 18.4525 14.334 19.8332C14.334 21.1646 15.3748 22.2529 16.6871 22.3289L16.834 22.3332L18.5007 22.3332C18.9609 22.3332 19.334 22.7063 19.334 23.1665C19.334 23.5939 19.0123 23.9461 18.5979 23.9942L18.5007 23.9998L16.834 23.9998C14.5328 23.9998 12.6674 22.1344 12.6674 19.8332C12.6674 17.5925 14.4359 15.765 16.6533 15.6704L16.834 15.6665L18.5007 15.6665ZM25.1674 15.6665C27.4685 15.6665 29.334 17.532 29.334 19.8332C29.334 20.5316 29.1622 21.1898 28.8585 21.768C28.4176 21.4328 27.9237 21.1638 27.3917 20.9755C27.5679 20.6331 27.6674 20.2447 27.6674 19.8332C27.6674 18.5018 26.6266 17.4135 25.3143 17.3374L25.1674 17.3332L23.5007 17.3332C23.0405 17.3332 22.6674 16.9601 22.6674 16.4998C22.6674 16.0725 22.9891 15.7202 23.4035 15.6721L23.5007 15.6665L25.1674 15.6665ZM16.834 18.9998L25.1674 18.9998C25.6276 18.9998 26.0007 19.3729 26.0007 19.8332C26.0007 20.2605 25.679 20.6128 25.2645 20.6609L25.1674 20.6665L16.834 20.6665C16.3738 20.6665 16.0007 20.2934 16.0007 19.8332C16.0007 19.4058 16.3224 19.0536 16.7368 19.0054L16.834 18.9998ZM30.1674 26.0832C30.1674 28.6145 28.1153 30.6665 25.584 30.6665C23.0527 30.6665 21.0007 28.6145 21.0007 26.0832C21.0007 23.5519 23.0527 21.4998 25.584 21.4998C28.1153 21.4998 30.1674 23.5519 30.1674 26.0832ZM24.212 24.1219C24.0493 23.9592 23.7854 23.9592 23.6227 24.1219C23.46 24.2846 23.46 24.5484 23.6227 24.7111L24.9948 26.0832L23.6227 27.4552C23.46 27.6179 23.46 27.8817 23.6227 28.0445C23.7854 28.2072 24.0493 28.2072 24.212 28.0445L25.584 26.6724L26.9561 28.0445C27.1188 28.2072 27.3826 28.2072 27.5453 28.0445C27.708 27.8817 27.708 27.6179 27.5453 27.4552L26.1733 26.0832L27.5453 24.7111C27.708 24.5484 27.708 24.2846 27.5453 24.1219C27.3826 23.9592 27.1188 23.9592 26.9561 24.1219L25.584 25.4939L24.212 24.1219Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_718_57336"
                    x1="42.0006"
                    y1="0.5"
                    x2="0.000610352"
                    y2="42.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00E5FF" />
                    <stop offset="1" stop-color="#2FCCDE" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                className="relative top-[-30px]"
                width="80"
                height="81"
                viewBox="0 0 80 81"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M74.8787 1.37919C76.0502 0.207604 77.9497 0.207585 79.1213 1.37915C80.2929 2.55071 80.2929 4.4502 79.1213 5.62179L63.1472 21.5963C69.8235 27.8044 74 36.6647 74 46.5005C74 65.2782 58.7777 80.5005 40 80.5005C30.1645 80.5005 21.3044 76.3242 15.0963 69.6481L5.12223 79.6224C3.95067 80.794 2.05117 80.794 0.879586 79.6224C-0.291991 78.4509 -0.292014 76.5514 0.879548 75.3798L74.8787 1.37919ZM37.5342 47.2097C38.076 47.9898 38.9783 48.5005 40 48.5005C41.5188 48.5005 42.774 47.3718 42.9726 45.9075L43 45.5005L43 41.7439L37.5342 47.2097ZM37 27.5005L37 30.7731L8.48639 59.2873C6.88314 55.34 6 51.0234 6 46.5005C6.00001 27.7228 21.2223 12.5005 40 12.5005C44.5227 12.5005 48.8391 13.3835 52.7862 14.9866L42.2532 25.5198C41.7035 24.8948 40.8978 24.5005 40 24.5005C38.4812 24.5005 37.226 25.6291 37.0274 27.0934L37 27.5005ZM11.3183 12.9908L10.9932 13.2374L6.39696 17.2374C5.14712 18.3251 5.01568 20.2201 6.10338 21.4699C7.10043 22.6156 8.77579 22.8215 10.0108 22.0101L10.3358 21.7635L14.9321 17.7635C16.1819 16.6758 16.3134 14.7808 15.2257 13.531C14.2286 12.3853 12.5533 12.1794 11.3183 12.9908ZM31 2.50046C29.3432 2.50046 28 3.8436 28 5.50046C28 7.01924 29.1286 8.27442 30.5929 8.47307L31 8.50046L49 8.50046C50.6569 8.50046 52 7.15731 52 5.50046C52 3.98168 50.8714 2.7265 49.4071 2.52785L49 2.50046L31 2.50046Z"
                  fill="#E4EAEE"
                />
              </svg>
            </div>

            <h4 className="h4 mb-4 flex flex-col justify-center items-center">
              Reset password link expired or invalid
            </h4>
            <div className="flex flex-col mb-4 justify-center items-center">
              <label
                className="form-label text-[#5F666D] font-normal"
                htmlFor="newPassword"
              >
                We can resend the mail or you can try later
              </label>
            </div>

            <div className="flex justify-center gap-x-3.5">
              <button
                className="content-center w-[119px]  text-primaryColor border-[#EBEFF3] border-2 rounded-md"
                onClick={() => router.push('/login')}
              >
                Try later
              </button>
              <button
                className="btn content-center"
                onClick={() => router.push('/forgot')}
              >
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col grow p-4 pt-20 overflow-y-auto">
          <div className="max-w-lg mx-auto w-full">
            <div className="widget-container p-4">
              <h4 className="h4 mb-4">Create new password</h4>
              <div className="flex flex-col mb-4">
                <label className="form-label" htmlFor="newPassword">
                  Create new password*
                </label>
                <div className="relative">
                  <input
                    className="input i-righ"
                    placeholder="Create password"
                    type="password"
                    id="newPassword"
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="text-warningColor text-xs">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm new password*
                </label>
                <div className="relative">
                  <input
                    className={`input i-righ ${
                      errors.confirmPassword && 'error'
                    }`}
                    placeholder="Confirm password"
                    type="password"
                    id="confirmPassword"
                    {...rest}
                    onChange={(e) => e.target.value === password.current || ''}
                    ref={(e) => {
                      ref(e);
                      passwordRef.current = e;
                    }}
                  />
                  <button
                    className="absolute right-2 top-3 inline-flex text-base items-center justify-center text-darkGrade50 hover:text-darkGrade75"
                    onClick={togglePassword}
                  >
                    <i className="icon-eye"></i>
                  </button>
                  {errors.confirmPassword && (
                    <span className="text-warningColor text-xs mt-1 pr-28 absolute left-0 top-full">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                {/*I dont think we want this, but it was in the html so I just commented it out for now, perhaps we do */}
                {/* <div className="flex justify-end mt-1">
                    <a href="#" className="link text-xs">
                      Forgot password?
                    </a>
                  </div> */}
              </div>

              {!changingPassword ? (
                <div className="flex justify-end py-1">
                  <button className="btn">Reset password</button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <LoadingButton text="Changing Password..." />
                </div>
              )}
            </div>

            {/*I dont think we want this, but it was in the html so I just commented it out for now, perhaps we do */}
            {/* <div className="text-center text-textSecondaryColor mt-3">
                Don’t have an account{" "}
                <a
                  href="#"
                  className="text-primaryColor hover:text-primaryColorHover"
                >
                  Create account
                </a>
              </div> */}
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
            <h4>Password updated successfully</h4>
            <p className="text-textSecondaryColor text-center mb-4">
              Your password has been updated successfully, please login using
              your new credentials
            </p>
            <div className="flex justify-center">
              <button
                className="btn w-72 text-center"
                data-bs-dismiss="modal"
                onClick={() => {
                  router.push('/login');
                }}
              >
                Take me to login
              </button>
            </div>
          </div>
        </div>
      </TailwindModal>
    </>
  );
};

export default ResetPasswordApp;
