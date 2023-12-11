import { useCallback, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { shopifyStepSchema } from '@interfaces/formsSchema';
import { Business, User } from '@sirge-io/sirge-types';
import { shopifyStepSchemaValidation } from '@utils/schemaValidations';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { usePopper } from 'react-popper';
import { API, graphqlOperation } from 'aws-amplify';
import {
  updateBusinessByBusinessIdNew,
  updateBusinessLogoNew,
} from '@graphql/mutations';
import { generateUploadUrlNew } from '@graphql/queries';
import Message, {
  ValidTypeMessages,
} from '@components/modals/tailwindTypes/Message';
import Popover from '@components/Popover';
import { QuickFlowStep } from '@components/quick-setup/app/QuickSetup';
import TailwindModal from '@components/modals/TailwindModal';
import { useBoundStore } from '@store/index';
import { BusinessProfile } from '@interfaces/business';
import { UserPrisma } from 'API';

type Props = {
  businessProfile: BusinessProfile;
  userProfile: UserPrisma;
  setCurrentStep: (value: QuickFlowStep) => void;
};

const UpdateShopifyAccount: React.FunctionComponent<Props> = ({
  userProfile,
  setCurrentStep,
}) => {
  const { setIsUpdating, setMainButtonAction, selectedBusiness } =
    useBoundStore((state) => state);

  const [previewImage, setPreviewImage] = useState<string | null>(
    selectedBusiness?.logo || null,
  );

  const showModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: 'Business updated',
  });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<shopifyStepSchema>({
    resolver: zodResolver(shopifyStepSchemaValidation),
    defaultValues: {
      businessName: selectedBusiness?.name,
    },
  });

  const updateSaveBusiness = useCallback(
    async (data: shopifyStepSchema) => {
      setIsUpdating(true);

      try {
        let newbusiness;

        const responseUpdateBusiness: any = await API.graphql(
          graphqlOperation(updateBusinessByBusinessIdNew, {
            setBusinessesInput: {
              business_id: selectedBusiness?.id,
              business_name: data.businessName,
            },
          }),
        );

        if (responseUpdateBusiness.data?.updateBusinessByBusinessIdNew?.error) {
          throw new Error(
            responseUpdateBusiness.data?.updateBusinessByBusinessIdNew?.error.message,
          );
        }

        newbusiness =
          responseUpdateBusiness.data?.updateBusinessByBusinessIdNew?.data;

        const newBusinessId = newbusiness?.business_id;

        if (newBusinessId && data.businessPhoto) {
          const responseGenerateUploadUrl: any = await API.graphql(
            graphqlOperation(generateUploadUrlNew, {
              generateUploadUrlInput: {
                business_id: newBusinessId,
                content_type: data.businessPhoto.content_type,
                extension_type: data.businessPhoto.extension_type,
              },
            }),
          );

          if (responseGenerateUploadUrl.data?.generateUploadUrlNew?.error) {
            throw new Error(
              responseGenerateUploadUrl.data?.generateUploadUrlNew?.error.message,
            );
          }

          const { upload_url, url } =
            responseGenerateUploadUrl?.data?.generateUploadUrlNew?.data;

          await fetch(upload_url, {
            method: 'PUT',
            headers: {
              'Content-Type': data.businessPhoto.content_type,
            },
            body: data.businessPhoto.file,
          });

          const responseUpdateBusinessLogo: any = await API.graphql(
            graphqlOperation(updateBusinessLogoNew, {
              updateBusinessLogoInput: {
                business_id: newBusinessId,
                file_url: url,
              },
            }),
          );

          if (responseUpdateBusinessLogo.data?.updateBusinessLogoNew?.error) {
            throw new Error(
              responseUpdateBusinessLogo.data?.updateBusinessLogoNew?.error.message,
            );
          }

          newbusiness =
            responseUpdateBusinessLogo.data?.updateBusinessLogoNew?.data;
        }

        setIsUpdating(false);
        setCurrentStep('Integrations and ad accounts');
      } catch (error: any) {
        setDialogOptions({
          type: 'error',
          message: error.message || 'Something went wrong',
        });

        showModalButtonRef.current?.click();
        setIsUpdating(false);
      }
    },
    [selectedBusiness?.id, setCurrentStep, setIsUpdating],
  );

  useEffect(() => {
    setMainButtonAction({
      callback: handleSubmit(updateSaveBusiness),
    });
  }, [handleSubmit, setMainButtonAction, updateSaveBusiness]);

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(updateSaveBusiness)}>
        <div className="mt-5">
          <div className="widget-container mb-5 px-4 pt-5 pb-3 !rounded-2xl border border-borderLightColor">
            <div className="px-5">
              <div
                className={`flex items-center justify-between border-b border-extraLightColor py-3`}
              >
                <div className="flex items-center">
                  <Image
                    src="/images/shopify.svg"
                    width={28}
                    height={28}
                    alt="shopify"
                  />
                  <span className="ml-2 text-sm font-medium">
                    {selectedBusiness?.name}
                  </span>

                  {selectedBusiness?.status === 'active' ? (
                    <span className=" tag-small green ml-2">Connected</span>
                  ) : (
                    <span className=" tag-small red ml-1.5">Not connected</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 mb-6">
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
                                extension_type:
                                  e.target.files[0].type.substring(
                                    indexSlash + 1,
                                    fileType.length,
                                  ),
                                content_type: fileType,
                              });

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
                <div className="w-full flex flex-col border border-extraLightColor px-3 py-2 rounded-xl">
                  <label
                    className="text-textSecondaryColor form-label"
                    htmlFor="lastName"
                  >
                    Business name
                  </label>
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name="businessName"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <input
                          className="text-[16px] border-none outline-none w-full"
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

              <div
                className="w-full flex flex-col border border-extraLightColor px-3 py-2 rounded-xl"
                onMouseEnter={() => setDisplayPopover(true)}
                onMouseLeave={() => setDisplayPopover(false)}
              >
                <label
                  className="text-textSecondaryColor form-label"
                  htmlFor="lastName"
                >
                  Email
                </label>
                <span className="text-textTeriraryColor truncate text-[16px] ">
                  {userProfile?.email}
                </span>
              </div>

              <div
                className="grid w-full grid-cols-2 gap-x-4 mt-4 cursor-pointer relative"
                onMouseEnter={() => setDisplayPopover(true)}
                onMouseLeave={() => setDisplayPopover(false)}
                ref={setReferenceElement}
              >
                <div className="flex flex-col border border-extraLightColor px-3 py-2 rounded-xl">
                  <label
                    className="text-textSecondaryColor form-label"
                    htmlFor="timeZone"
                  >
                    Time zone
                  </label>

                  <span className="text-textTeriraryColor truncate text-[16px] ">
                    {selectedBusiness?.store?.timezone}
                  </span>
                </div>
                <div className="flex flex-col border border-extraLightColor px-3 py-2 rounded-xl">
                  <label
                    className="text-textSecondaryColor form-label"
                    htmlFor="currency"
                  >
                    Currency
                  </label>

                  <span className="text-textTeriraryColor text-[16px] ">
                    {selectedBusiness?.store?.currency}
                  </span>
                </div>

                <div
                  ref={setPopperElement}
                  className={`${
                    displayPopover
                      ? 'popover visible'
                      : 'popover visually-hidden'
                  }`}
                  style={{
                    ...styles.popper,
                    width: '100%',
                    maxWidth: '100%',
                    // left: 0,
                    // transform: '0',
                  }}
                  {...attributes.popper}
                >
                  <Popover
                    title={'Email, Time zone and Currency not editable'}
                    content={`This data we get from your Shopify store to make data consistent across platforms`}
                    customClassPopoverBody={{ padding: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <TailwindModal id="successModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#successModal"
        ref={showModalButtonRef}
      />
    </>
  );
};

export default UpdateShopifyAccount;
