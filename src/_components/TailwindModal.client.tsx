'use client';
import { useRouter } from 'next/navigation';
import React, { FC, ReactNode, useRef, useEffect, Dispatch } from 'react';
import { SetStateAction } from 'react';

interface Props {
  id: string;
  children: ReactNode;
  showDialog?: boolean;
  setShowDialog?: Dispatch<SetStateAction<boolean>>;
  styleDialog?: React.CSSProperties;
  handleCloseUpdate?: () => void | undefined;
}

const TailwindModal: FC<Props> = ({
  id,
  children,
  showDialog,
  setShowDialog,
  styleDialog,
  handleCloseUpdate = undefined,
}) => {
  const hiddenButtonRef = useRef<HTMLButtonElement | null>(null);

  const modalRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const modal = modalRef.current as HTMLDivElement;

    /**
     * The modal is built with pure tailwind css.
     * So we are using an observer to listen when the modal has been closed by clicking on close icon or clicking outside the modal.
     */
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const classList = (mutation.target as any).classList;

          if (!classList.contains('show')) {
            if (setShowDialog) {
              setShowDialog(false);
              if (handleCloseUpdate) {
                handleCloseUpdate();
              }
            }
          }
        }
      });
    });

    observer.observe(modal, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [setShowDialog]);

  useEffect(() => {
    if (showDialog) {
      hiddenButtonRef.current?.click();

      if (setShowDialog) {
        setShowDialog(false);
      }
    }
  }, [showDialog, setShowDialog]);

  useEffect(() => {
    const modalBackground = document.querySelector(
      '.modal-backdrop.fade.show',
    ) as HTMLElement;

    if (modalBackground) {
      modalBackground.remove();
    }
  }, []);
  return (
    <div
      ref={modalRef}
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id={id}
      tabIndex={-1}
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
        style={styleDialog || {}}
      >
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          {children}

          <button
            className="btn"
            style={{ display: 'none' }}
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target={`#${id}`}
            ref={hiddenButtonRef}
          />
        </div>
      </div>
    </div>
  );
};

export default TailwindModal;
