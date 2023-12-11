import React, { useEffect, useRef, useState } from 'react';

// aws
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser, updateUserProfilePicture } from 'graphql/mutations';

import ReactGoogleAutocomplete from 'react-google-autocomplete';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import { useForm, SubmitHandler } from 'react-hook-form';
import { FileUpload } from 'utils/types';

import Image from 'next/image';
import { generateUploadUrl } from 'graphql/queries';
import { initialName } from '@utils/initialName';
import TailwindModal from '@components/modals/TailwindModal';
import { Message } from '@components/modals/tailwindTypes';
import { ValidTypeMessages } from '@components/modals/tailwindTypes/Message';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { LoadingButton } from '@components/LoadingButton';

type Inputs = {
  firstName: string;
  lastName: string;
  full_address: string;
  streetNumber: string;
  streetName: string;
  postalCode: string;
  country: string;
  currency: string;
  timezone: string;
  profile_photo: string;
};

type AddressAutoComplete = {
  long_name: string;
  short_name: string;
  types: string[];
};

export const ProfileTab: React.FunctionComponent = () => {
  const { userProfile, updateUserProfileInApp, selectedBusiness } =
    useBusinessProfileContext();

  const [dialogOptions, setDialogOptions] = useState<{
    type: ValidTypeMessages;
    message: string;
  }>({
    type: 'success',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const dismissModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const { register, handleSubmit, setValue, reset, getValues } =
    useForm<Inputs>({});

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const query = {
        first_name: data.firstName,
        last_name: data.lastName,
        full_address: data.full_address || userProfile?.full_address,
        street_number: data.streetNumber,
        street_name: data.streetName,
        postal_code: data.postalCode,
        business_id: selectedBusiness?.business_id,
      };

      const response: any = await API.graphql(
        graphqlOperation(updateUser, {
          updateUserInput: query,
        }),
      );

      if (data.profile_photo) {
        await API.graphql(
          graphqlOperation(updateUserProfilePicture, {
            updateUserProfilePictureInput: {
              file_url: data.profile_photo,
              business_id: selectedBusiness?.business_id,
            },
          }),
        );
      }

      const updateUserData = response.data.updateUser;

      if (updateUserData.error) {
        throw new Error(updateUserData.error.message);
      }

      updateUserProfileInApp({
        ...updateUserData.data,
        profile_photo: getValues('profile_photo') || userProfile?.profile_photo,
      });

      setDialogOptions({
        type: 'success',
        message: 'User Profile Updated',
      });
    } catch (error: any) {
      setDialogOptions({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
      dismissModalButtonRef.current?.click();
    }
  };

  /**
   * fill autocomplete address
   */
  const { placesService, placePredictions, getPlacePredictions } =
    usePlacesService({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      debounce: 2,
    });

  useEffect(() => {
    if (placePredictions.length) {
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails: {
          address_components: AddressAutoComplete[];
          formatted_address: string;
        }) => {
          const { streetName, country, streetNumber, postalCode } =
            getAddressTypes(placeDetails.address_components);

          setValue('streetName', streetName);
          setValue('country', country);
          setValue('streetNumber', streetNumber);
          setValue('postalCode', postalCode);
        },
      );
    } else {
      setTimeout(() => {
        getPlacePredictions({
          input: userProfile?.full_address,
        });
      }, 1000);
    }
  }, [placePredictions, placesService, userProfile]);

  /**
   * fill default values
   */
  useEffect(() => {
    if (!!userProfile) {
      reset({
        firstName: userProfile.first_name,
        lastName: userProfile.last_name,
        postalCode: userProfile.postal_code,
        currency: userProfile.currency || '',
        timezone: userProfile.timezone || '',
        country: userProfile.country_name || '',
      });
    }
  }, [reset, userProfile]);

  const generateUpload = async (photo: FileUpload) => {
    setLoading(true);
    const response: any = await API.graphql(
      graphqlOperation(generateUploadUrl, {
        generateUploadUrlInput: {
          content_type: photo.content_type,
          extension_type: photo.extension_type,
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const data = response.data.generateUploadUrl.data;

    /**
     * get file url
     */
    await fetch(data.upload_url, {
      method: 'PUT',
      headers: {
        'Content-Type': photo.content_type,
      },
      body: photo.file,
    });

    setValue('profile_photo', data.url);

    setLoading(false);
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="tabs-homeFill"
        role="tabpanel"
        aria-labelledby="tabs-home-tabFill"
      >
        <div className="p-4">
          <h5 className="h5 mb-3">Basic Information</h5>

          <form>
            <div className="flex mb-3">
              <div className=" mr-4 inline-flex  flex-shrink-0 rounded-full items-center justify-center">
                {userProfile?.profile_photo || !!profilePhoto ? (
                  <Image
                    src={profilePhoto || (userProfile?.profile_photo as string)}
                    alt="profile-photo"
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-blueLightColor text-primaryMidColor font-semibold uppercase w-14 h-14 inline-flex flex-shrink-0 rounded-full items-center justify-center">
                    <span>
                      {initialName(
                        `${userProfile?.first_name} ${userProfile?.last_name}`,
                      )}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="profile_photo_input cursor-pointer absolute opacity-0 w-10"
                  title="Edit profile photo"
                  onChange={(e) => {
                    if (e.target.files) {
                      const objectUrl = URL.createObjectURL(e.target.files[0]);
                      const fileType = e.target.files[0].type;
                      const indexSlash = fileType.indexOf('/');

                      const upload = {
                        file: e.target.files[0],
                        extension_type: e.target.files[0].type.substring(
                          indexSlash + 1,
                          fileType.length,
                        ),
                        content_type: fileType,
                      };

                      generateUpload(upload);
                      setProfilePhoto(objectUrl);
                    }
                  }}
                />
              </div>
              <div className="grid w-full grid-cols-2 gap-x-4">
                <div>
                  <label className="form-label" htmlFor="firstName">
                    First Name
                  </label>
                  <div>
                    <input
                      className="input"
                      placeholder="First Name"
                      type="text"
                      {...register('firstName')}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <div>
                    <input
                      className="input"
                      placeholder="Last Name"
                      type="text"
                      {...register('lastName')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mb-3">Address</h6>
            <div className="flex flex-col mb-3">
              <label className="form-label" htmlFor="address">
                Full Address
              </label>
              <div>
                <ReactGoogleAutocomplete
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                  onPlaceSelected={(place, inputRef) => {
                    const {
                      streetName,
                      streetNumber,
                      country,
                      postalCode,
                      fullAddress,
                    } = getRefinedAddressDetails(place);

                    setValue('streetName', streetName);
                    setValue('streetNumber', streetNumber);
                    setValue('country', country);
                    setValue('postalCode', postalCode);
                    setValue('full_address', fullAddress);
                  }}
                  options={{
                    fields: ['address_components', 'formatted_address'],
                    types: ['address'],
                  }}
                  placeholder=""
                  className="input bg-white"
                  defaultValue={userProfile?.full_address}
                />
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-x-4 mb-3">
              <div className="flex flex-col">
                <label className="form-label read-only" htmlFor="streetNumber">
                  Street Number
                </label>
                <div>
                  <input
                    className="input"
                    readOnly
                    type="text"
                    {...register('streetNumber')}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="form-label read-only" htmlFor="streetName">
                  Street Name
                </label>
                <div>
                  <input
                    className="input"
                    readOnly
                    type="text"
                    {...register('streetName')}
                  />
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-x-4 mb-3">
              <div className="flex flex-col">
                <label className="form-label read-only" htmlFor="postalCode">
                  Postal Code
                </label>
                <div>
                  <input
                    className="input"
                    readOnly
                    type="text"
                    {...register('postalCode')}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="form-label read-only" htmlFor="country">
                  Country
                </label>
                <div>
                  <input
                    className="input"
                    readOnly
                    type="text"
                    {...register('country')}
                  />
                </div>
              </div>
            </div>
            <h6 className="mb-3">Timezone & Currency</h6>
            <div className="grid w-full grid-cols-2 gap-x-4 mb-3">
              <div className="flex flex-col">
                <label className="form-label read-only" htmlFor="timeZone">
                  Time Zone
                </label>
                <div>
                  <input
                    className="input"
                    readOnly
                    type="text"
                    {...register('timezone')}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="form-label read-only" htmlFor="currency">
                  Currency
                </label>
                <div>
                  <input
                    className="input"
                    readOnly
                    type="text"
                    {...register('currency')}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              {!loading ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => onSubmit(getValues())}
                >
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

      <TailwindModal id="profileMessageModal">
        <Message title={dialogOptions.message} type={dialogOptions.type} />
      </TailwindModal>

      <button
        className="btn"
        style={{ display: 'none' }}
        data-bs-toggle="modal"
        data-bs-target="#profileMessageModal"
        ref={dismissModalButtonRef}
      />

      <style jsx>{`
        input[type=file], /* FF, IE7+, chrome (except button) */
       input[type=file]::-webkit-file-upload-button {
          /* chromes and blink button */
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

const getRefinedAddressDetails = (rawData: {
  address_components: AddressAutoComplete[];
  formatted_address: string;
}) => {
  const { streetName, country, streetNumber, postalCode } = getAddressTypes(
    rawData.address_components,
  );

  const locationData = {
    country,
    postalCode,
    streetName,
    streetNumber,
    fullAddress: rawData?.formatted_address,
  };

  return locationData;
};

const getAddressTypes = (address_components: AddressAutoComplete[]) => {
  let streetName = '';
  let streetNumber = '';
  let country = '';
  let postalCode = '';

  address_components.forEach((item: AddressAutoComplete) => {
    if (item.types.includes('route')) {
      streetName = item.long_name;
    }

    if (item.types.includes('street_number')) {
      streetNumber = item.long_name;
    }

    if (item.types.includes('country')) {
      country = item.long_name;
    }

    if (['postal_code_prefix', 'postal_code'].includes(item.types[0])) {
      postalCode = item.long_name;
    }
  });

  return {
    country,
    postalCode,
    streetName,
    streetNumber,
  };
};

export default ProfileTab;
