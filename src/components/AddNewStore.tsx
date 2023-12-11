import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addNewStoreSchema } from '@interfaces/formsSchema';
import { addNewStoreSchemaValidation } from 'utils';
import { useRouter } from 'next/router';
import Spinner from '@components/Spinner';

const AddNewStore = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<addNewStoreSchema>({
    resolver: zodResolver(addNewStoreSchemaValidation),
    defaultValues: {},
  });

  const updateSaveBusiness = async (data: addNewStoreSchema) => {
    setIsUpdating(true);

    try {
      const oldPathname = router.pathname;
      let shopUrl: string = data.shop_url.replace(/^https?:\/\//, '');
      router.push(`/api/s/login?shop=${shopUrl}`);
      setTimeout(() => {
        if (router.pathname === oldPathname) {
          setIsUpdating(false);
        }
      }, 4000);
    } catch (error: any) {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(updateSaveBusiness)}>
        <div className="widget-container p-4 mb-6">
          <div className="flex mb-4">
            <div className="w-full">
              <label className="form-label" htmlFor="buisnesName">
                Add New Store
              </label>
              <div>
                <Controller
                  control={control}
                  name="shop_url"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      className="input"
                      placeholder={'Enter Shop Url'}
                      type="text"
                      id="buisnesName"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  defaultValue=""
                />
              </div>
            </div>
          </div>
          {errors.shop_url && (
            <p className="text-warningColor text-xs">
              {errors.shop_url.message}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn flex !bg-primaryColor"
              disabled={isUpdating}
            >
              Install App
              {isUpdating && <Spinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewStore;
