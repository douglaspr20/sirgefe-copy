'use client';

import {
  updateBusinessByBusinessIdNew,
  updateBusinessLogoNew,
} from '@graphql/mutations';
import { generateUploadUrlNew } from '@graphql/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBusinessSchema } from '@interfaces/formsSchema';
import { useBoundStore } from '@store/index';
import { createBusinessSchemaValidation } from '@utils/schemaValidations';
import { API } from 'aws-amplify';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Message from '_components/modals/tailwindTypes/Message';
import Image from 'next/image';
import Spinner from '_components/Spinner';
import TailwindModal from '_components/modals/TailwindModal';
import { executeGraphqlOperation } from '_utils/executeGraphqlOperation';
import {
  GenerateUploadUrlNewQueryVariables,
  GenerateUploadUrlResponse,
  UpdateBusinessByBusinessIdNewMutationVariables,
  UpdateBusinessLogoNewMutationVariables,
  UpdateBusinessLogoNewResponse,
} from 'API';

const UpdateBusinessForm = () => {
  const {
    isLoading,
    selectedBusiness,
    businessList,
    dialogOptions,
    setSelectedBusiness,
    setIsUpdating,
    setDialogOptions,
    setBusinessList,
  } = useBoundStore.getState();

  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    selectedBusiness?.logo || null,
  );

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<createBusinessSchema>({
    resolver: zodResolver(createBusinessSchemaValidation),
    defaultValues: {
      businessName: selectedBusiness?.name,
    },
  });

  const updateSaveBusiness = async (data: createBusinessSchema) => {
    setIsUpdating(true);

    try {
      let newbusiness;

      const responseUpdateBusiness = await executeGraphqlOperation<
        UpdateBusinessByBusinessIdNewMutationVariables,
        any
      >(API, updateBusinessByBusinessIdNew, {
        setBusinessesInput: {
          business_id: selectedBusiness?.id as string,
          business_name: data.businessName,
        },
      });

      debugger;

      if (responseUpdateBusiness?.error) {
        throw new Error(responseUpdateBusiness.error.message);
      }

      newbusiness = responseUpdateBusiness?.data;

      const newBusinessId = newbusiness?.business_id;

      if (newBusinessId && data.businessPhoto) {
        const responseGenerateUploadUrl = await executeGraphqlOperation<
          GenerateUploadUrlNewQueryVariables,
          GenerateUploadUrlResponse
        >(API, generateUploadUrlNew, {
          generateUploadUrlInput: {
            business_id: newBusinessId,
            content_type: data.businessPhoto.content_type,
            extension_type: data.businessPhoto.extension_type,
          },
        });

        if (responseGenerateUploadUrl?.error) {
          throw new Error(responseGenerateUploadUrl.error.message || '');
        }

        if (
          !responseGenerateUploadUrl?.data ||
          !responseGenerateUploadUrl?.data.upload_url ||
          !responseGenerateUploadUrl?.data.url
        ) {
          throw new Error('No data found');
        }

        const { upload_url, url } = responseGenerateUploadUrl?.data;

        await fetch(upload_url, {
          method: 'PUT',
          headers: {
            'Content-Type': data.businessPhoto.content_type,
          },
          body: data.businessPhoto.file,
        });

        const responseUpdateBusinessLogo = await executeGraphqlOperation<
          UpdateBusinessLogoNewMutationVariables,
          UpdateBusinessLogoNewResponse
        >(API, updateBusinessLogoNew, {
          updateBusinessLogoInput: {
            business_id: newBusinessId,
            file_url: url,
          },
        });

        if (responseUpdateBusinessLogo.error) {
          throw new Error(responseUpdateBusinessLogo.error.message || '');
        }

        newbusiness = responseUpdateBusinessLogo.data;
      }

      setSelectedBusiness(newbusiness);

      setDialogOptions({
        type: 'success',
        message: 'Business updated',
      });
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setIsUpdating(false);
      dismissModalButtonRef.current?.click();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(updateSaveBusiness)}>
        <div className="widget-container p-4 mb-6">
          <div className="flex mb-4">
            <div className="mt-2 flex shrink-0 mr-3">
              <Controller
                control={control}
                name="businessPhoto"
                rules={{ required: true }}
                render={() => (
                  <>
                    <input
                      type="file"
                      id="business-photo"
                      hidden
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        if (e.target.files) {
                          const objectUrl = URL.createObjectURL(
                            e.target.files[0],
                          );

                          const fileType = e.target.files[0].type;

                          const indexSlash = fileType.indexOf('/');

                          setValue('businessPhoto', {
                            file: e.target.files[0],
                            extension_type: e.target.files[0].type.substring(
                              indexSlash + 1,
                              fileType.length,
                            ),
                            content_type: fileType,
                          });

                          setBusinessList([
                            {
                              ...businessList[0],
                              logo: objectUrl,
                            },
                          ]);

                          setPreviewImage(objectUrl);
                        }
                      }}
                    />

                    {previewImage ? (
                      <div className="edit-image relative flex items-center justify-center border w-14 h-14 rounded-full border-borderLightColor bg-greyLight overflow-hidden">
                        <Image
                          src={previewImage}
                          width={100}
                          height={100}
                          alt=""
                        />
                        <label
                          className="edit-image__btn"
                          htmlFor="business-photo"
                        >
                          <i className="icon-edit-fill text-white"></i>
                        </label>
                      </div>
                    ) : (
                      <label
                        className="flex items-center justify-center border w-14 h-14 rounded-full border-borderLightColor bg-greyLight text-darkGrade50 hover:text-darkGrade75"
                        data-bs-toggle="popover"
                        data-bs-placement="top"
                        data-bs-trigger="hover focus"
                        data-bs-content="Upload a photo"
                        htmlFor="business-photo"
                      >
                        <i className="icon-image-add text-2xl"></i>
                      </label>
                    )}
                  </>
                )}
              />
            </div>
            <div className="w-full">
              <label className="form-label" htmlFor="buisnesName">
                Business Name
              </label>
              <div>
                <Controller
                  control={control}
                  name="businessName"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      className="input"
                      placeholder={selectedBusiness?.name}
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
          {errors.businessName && (
            <p className="text-warningColor text-xs">
              {errors.businessName.message}
            </p>
          )}
          {errors.businessPhoto?.file && (
            <p className="text-warningColor text-xs">
              {errors.businessPhoto?.file?.message as string}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn flex !bg-primaryColor"
              disabled={isLoading}
            >
              Save
              {isLoading && <Spinner />}
            </button>
          </div>
        </div>
      </form>

      {/* <TailwindModal id="deactivateModal">
        <DeactivateBusiness
          deactivateBussines={handleDeactivateBusiness}
          isDeactivating={isDeactivating}
        />
      </TailwindModal> */}

      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>
      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={dismissModalButtonRef}
      />
    </>
  );
};

export default UpdateBusinessForm;
