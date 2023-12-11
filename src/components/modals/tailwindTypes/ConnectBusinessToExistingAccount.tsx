import { Auth, API, graphqlOperation } from 'aws-amplify';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginSchemaValidation } from 'utils/schemaValidations';
import Link from 'next/link';
import Head from 'next/head';
import { LoadingButton } from '@components/LoadingButton';
import fetchCurrentUserDetails from 'api/fetchCurrentUserDetails';
import { userDetailsStore } from '@utils/zustand';
import awsConfig from '@graphql/aws-config';
import { checkShopifyLogin, setUserSession } from '@graphql/mutations';
import * as Sentry from '@sentry/nextjs';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import TailwindModal from '@components/modals/TailwindModal';
import { useBoundStore } from '@store/index';

type LoginSchema = z.infer<typeof loginSchemaValidation>;

const ConnectBusinessToExistingAccount = () => {
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
  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'error',
    message: '',
  });

  const authenticate = async (email: string, password: string) => {
    try {
      API.configure(awsConfig);
      setSigningIn(true);
      await Auth.signOut();
      await Auth.signIn(email, password);
      saveUserSession();

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const redirect_url = params.get('redirect');
      const shop = params.get('shop');

      if (shop) {
        const response: any = await API.graphql(
          graphqlOperation(checkShopifyLogin, {
            checkShopifyLoginInput: {
              shopify_store_url: shop,
            },
          }),
        );

        if (response.data?.checkShopifyLogin?.error) {
          throw new Error(response.data?.checkShopifyLogin?.error?.message);
        }
        if (!response.data?.checkShopifyLogin?.data) {
          setDialogOptions({
            type: 'error',
            message: 'The Shopify store cannot be connected to your account!',
          });
          dismissModalButtonRef.current?.click();
          return;
        }
      }
      const userDetails = await fetchCurrentUserDetails({
        Auth,
        API,
      });

      useBoundStore.setState(userDetails);

      let defaultBusiness = userDetails?.businessListData?.[0];
      // TODO Revert it back once we have default business id in DB
      // userDetails?.businessListData?.find(
      //   (item) =>
      //     item?.id ===
      //     userDetails?.userProfileData?.default_business_id,
      // ) ?? userDetails?.businessListData?.[0];

      if (redirect_url) {
        if (shop) {
          router.push(
            `${redirect_url}?user=${userDetails?.userProfileData?.id}`,
          );
          return;
        }
        router.push(`${redirect_url}`);
      } else {
        router.push(`/${defaultBusiness?.vanity_name}/home`);
      }
    } catch (error) {
      setError('password', { message: 'Wrong password. Try again or reset' });
    } finally {
      setSigningIn(false);
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

  const saveUserSession = async () => {
    try {
      await API.graphql(graphqlOperation(setUserSession));
    } catch (error) {
      Sentry.captureException(new Error(error as any));
    }
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow p-4 overflow-y-auto">
            <div className="max-w-lg mx-auto w-full">
              <h4 className="h4 text-center capitalize mb-2">
                You already have an account with the given email address
              </h4>

              <p className=" font-medium text-textTeriraryColor mb-4">
                Would you like to connect your new store to the existing
                account?
              </p>

              {/* <h4 className="h4 mb-4">Login</h4> */}
              <div className="flex flex-col mb-3">
                <label className="form-label" htmlFor="email">
                  Email*
                </label>
                <div>
                  <input
                    className={`input i-righ ${errors.email && 'error'}`}
                    placeholder="Enter Email Address"
                    type="email"
                    id="email"
                    {...register('email')}
                  />

                  {errors.email && (
                    <span className="text-warningColor text-xs">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className="form-label" htmlFor="email">
                  Password*
                </label>
                <div className="relative">
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
                    className="absolute right-2 top-3 inline-flex text-base items-center justify-center text-darkGrade50 hover:text-darkGrade75"
                    role="button"
                    type="button"
                    onClick={togglePassword}
                  >
                    <i className="icon-eye"></i>
                  </button>

                  {errors.password && (
                    <span className="text-warningColor text-xs mt-1 pr-28 absolute left-0 top-full">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-end mt-1">
                  <Link href="/forgot" className="link text-xs">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              {!signingIn ? (
                <div className="flex justify-end">
                  <button className="btn">Login</button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <LoadingButton text="Signing In..." />
                </div>
              )}
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default ConnectBusinessToExistingAccount;
