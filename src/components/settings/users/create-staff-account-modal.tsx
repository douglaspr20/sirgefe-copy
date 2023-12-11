import { useRef, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { createStaffAccount } from 'graphql/mutations';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { randomPassGenerator } from 'utils/randomPassGeneratos';

import { LoadingButton } from '@components/LoadingButton';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';

type StaffAccountModalProps = {
  refreshUsers: () => void;
  handleResponse: (response: {
    message: string;
    type: ValidTypeMessages;
  }) => void;
};
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const StaffSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name must contain at least 3 characters(s)'),
  lastName: z.string().min(3, 'Last name must contain at least 3 character(s)'),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 character(s)')
    .regex(/[A-Z]/, 'Password must contain uppercase character(s)')
    .regex(/[a-z]/, 'Password must contain lowercase character(s)')
    .regex(/[0-9]/, 'Password must contain numeric character(s)')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain special character(s)'),
});

const StaffAccountModal: React.FunctionComponent<StaffAccountModalProps> = ({
  refreshUsers,
  handleResponse,
}) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassowrd] = useState<boolean>(false);
  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const { selectedBusiness } = useBusinessProfileContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(StaffSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const query = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      business_id: selectedBusiness?.business_id,
    };

    const response: any = await API.graphql(
      graphqlOperation(createStaffAccount, {
        createStaffAccountInput: query,
      }),
    );

    const { message, error } = response.data?.createStaffAccount;

    if (!error) {
      refreshUsers();

      handleResponse({
        message,
        type: 'success',
      });
    } else {
      handleResponse({
        message: error.message,
        type: 'error',
      });
    }
    reset();

    dismissModalButtonRef.current?.click();

    setLoading(false);
  };

  const generateRandomPassword = () => {
    const randPassword = randomPassGenerator(1, 2, 3, 2);
    setValue('password', randPassword);
  };

  return (
    <>
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-1">
        <h3 className="h3">Create Staff Account</h3>
        <button
          type="button"
          className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => reset()}
        >
          <i className="icon-dismiss-circle"></i>
        </button>
      </div>
      <div className="modal-body relative px-4 pb-4">
        <p className="pb-4 mb-4 border-b text-textSecondaryColor border-extraLightColor">
          All Login Information Will Be Sent To The User’s Email Address
        </p>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid w-full grid-cols-2 gap-x-4 mb-3">
            <div>
              <label className="form-label" htmlFor="firstName">
                First Name*
              </label>
              <div>
                <input
                  className="input"
                  placeholder="Enter First Name"
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                />

                {errors.firstName && (
                  <small className="text-warningColor">
                    {errors.firstName?.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="lastName">
                Last Name*
              </label>
              <div>
                <input
                  className="input"
                  placeholder="Enter Last Name"
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <small className="text-warningColor">
                    {errors.lastName?.message}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label className="form-label">Email*</label>
            <div>
              <input
                className="input"
                placeholder="Enter Email Address"
                {...register('email')}
                autoComplete="new-password"
              />

              {errors.email && (
                <small className="text-warningColor">
                  {errors.email?.message}
                </small>
              )}
            </div>
          </div>
          <div className="flex flex-col mb-1">
            <label className="form-label">Password*</label>
            <div className="relative">
              <input
                className="input i-righ"
                id="password"
                placeholder="Create Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="new-password"
              />
              {errors.password && (
                <small className="text-warningColor">
                  {errors.password?.message}
                </small>
              )}
              <button
                type="button"
                className="absolute right-2 top-3 inline-flex text-base items-center justify-center text-darkGrade50 hover:text-darkGrade75"
                onClick={() => setShowPassowrd((prev) => !prev)}
              >
                <i className="icon-eye"></i>
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center font-medium justify-center mb-3 text-darkGrade50 hover:text-darkGrade75"
              onClick={() => generateRandomPassword()}
            >
              <i className="icon-key text-xl mr-1"></i>Generate Random Password
            </button>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-center py-4 mx-4 border-t border-extraLightColor">
            {!loading ? (
              <button
                type="submit"
                className="btn ml-3 inline-flex items-center mt-2"
              >
                <i className="icon-person-add text-xl mr-1"></i>Create Account
              </button>
            ) : (
              <div className="flex justify-end">
                <LoadingButton text="Updating" />
              </div>
            )}
          </div>
        </form>
      </div>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#createAccountModal"
        ref={dismissModalButtonRef}
      />
    </>
  );
};

export default StaffAccountModal;
