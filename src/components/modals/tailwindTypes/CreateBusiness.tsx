import React, { FC, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBusinessSchemaValidation } from 'utils';
import Spinner from '@components/Spinner';
import { createBusinessSchema } from '@interfaces/formsSchema';
import { usePopper } from 'react-popper';
import Popover from '@components/Popover';
import Image from 'next/image';

interface Props {
  onSubmit: (data: createBusinessSchema) => void;
  isSending?: boolean;
}

const CreateBusiness: FC<Props> = ({ onSubmit, isSending }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [displayPopover, setDisplayPopover] = useState<boolean>(false);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-40, 0],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top'],
        },
      },
    ],
    placement: 'top',
  });

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<createBusinessSchema>({
    resolver: zodResolver(createBusinessSchemaValidation),
  });

  useEffect(() => {
    if (isSending) {
      setPreviewImage(null);
      reset();
    }
  }, [isSending, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-3">
          <h3 className="h3">Create business</h3>
          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>

        <div className="modal-body relative px-4 pb-4">
          <div className="flex">
            <div className="flex shrink-0 mr-3">
              <Controller
                control={control}
                name="businessPhoto"
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

                          setPreviewImage(objectUrl);
                        }
                      }}
                    />

                    {previewImage ? (
                      <div className="edit-image relative flex items-center justify-center border w-14 h-14 rounded-full border-borderLightColor bg-greyLight overflow-hidden">
                        <Image src={previewImage} fill alt="" />
                        <label
                          className="edit-image__btn"
                          htmlFor="business-photo"
                        >
                          <i className="icon-edit-fill text-white"></i>
                        </label>
                      </div>
                    ) : (
                      <>
                        <label
                          ref={setReferenceElement}
                          className="flex items-center justify-center border w-14 h-14 rounded-full border-borderLightColor bg-greyLight text-darkGrade50 hover:text-darkGrade75"
                          data-bs-toggle="popover"
                          data-bs-placement="top"
                          data-bs-trigger="hover focus"
                          data-bs-content="Upload a photo"
                          htmlFor="business-photo"
                          onMouseEnter={() => setDisplayPopover(true)}
                          onMouseLeave={() => setDisplayPopover(false)}
                        >
                          <div
                            ref={setPopperElement}
                            className={`popover ${
                              displayPopover ? 'visible' : 'visually-hidden'
                            }`}
                            style={styles.popper}
                            {...attributes.popper}
                          >
                            <Popover content="Upload a photo" />
                          </div>
                          <i className="icon-image-add text-2xl"></i>
                        </label>
                      </>
                    )}
                  </>
                )}
              />
            </div>
            <div className="w-full">
              <label className="form-label" htmlFor="buisnesName">
                Business name *
              </label>
              <div>
                <Controller
                  control={control}
                  name="businessName"
                  render={({ field: { onChange, value } }) => (
                    <input
                      className={`
                      input
                      ${errors.businessName && 'error'}
                      `}
                      placeholder="Enter the business name"
                      type="text"
                      id="buisnesName"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              {errors.businessName && (
                <span className="text-warningColor text-xs">
                  {errors.businessName?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end py-4 mx-4 border-t border-extraLightColor">
          <button
            type="submit"
            className="btn ml-3 flex items-center !bg-primaryColor"
            disabled={isSending}
          >
            Create business
            {isSending && <Spinner />}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateBusiness;
