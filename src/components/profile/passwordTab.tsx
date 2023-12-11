import { useRef, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Auth } from 'aws-amplify';
import TailwindModal from '@components/modals/TailwindModal';
import { Message } from '@components/modals/tailwindTypes';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { LoadingButton } from '@components/LoadingButton';

// components

type Inputs = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const passwrodSchema = z
  .object({
    currentPassword: z.string().min(8, 'Password must be atleast 8 characters'),
    password: z.string().min(8, 'Password must be atleast 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be atleast 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

const PasswordTab: React.FunctionComponent = () => {
  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(passwrodSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.changePassword(user, data.currentPassword, data.password);

      setDialogOptions({
        message: 'Password updated successfully',
        type: 'success',
      });

      reset();
    } catch (error: any) {
      setDialogOptions({
        message: error?.message,
        type: 'error',
      });
    } finally {
      dismissModalButtonRef.current?.click();
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="tabs-profileFill"
        role="tabpanel"
        aria-labelledby="tabs-profile-tabFill"
      >
        <div className="p-4">
          <h5 className="h5 mb-3">Change Password</h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-3">
              <label className="form-label" htmlFor="password">
                Current Passsword *
              </label>
              <div>
                <input
                  className="input"
                  placeholder="Enter Current Password"
                  type="password"
                  id="currentPassword"
                  autoComplete="current"
                  {...register('currentPassword')}
                />
                {errors.currentPassword && (
                  <small className="text-warningColor">
                    {errors.currentPassword?.message}
                  </small>
                )}
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-x-4 mb-3">
              <div className="flex flex-col">
                <label className="form-label" htmlFor="newPassword">
                  New Password*
                </label>
                <div>
                  <input
                    className="input"
                    placeholder="New Password"
                    type="password"
                    id="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <small className="text-warningColor">
                      {errors.password?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm New Password*
                </label>
                <div>
                  <input
                    className="input"
                    placeholder="Confirm New Password"
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <small className="text-warningColor">
                      {errors.confirmPassword?.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              {!loading ? (
                <button type="submit" className="btn" disabled={loading}>
                  Save
                </button>
              ) : (
                <div className="flex justify-end">
                  <LoadingButton text="Updating" />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <TailwindModal id="passwordMessageModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#passwordMessageModal"
        ref={dismissModalButtonRef}
      />
    </>
  );
};

export default PasswordTab;
