import React, {
  FC,
  Ref,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from 'react';

interface ActionsPopoverProps {
  tableRef: RefObject<HTMLDivElement>;
  triggerRef: RefObject<HTMLButtonElement>;
  ref: Ref<HTMLDivElement>;
  trackableCopy: any;
  setDeleteModalActive: (value: boolean) => void;
  setDeleteCopyOptions: (value: any) => void;
  setActiveActions: (value: number | null) => void;
  setEditLinkOptions: (value: any) => void;
  setLinkModalActive: (value: boolean) => void;
}

const ActionsPopover: FC<ActionsPopoverProps> = forwardRef(
  (
    {
      tableRef,
      triggerRef,
      trackableCopy,
      setDeleteModalActive,
      setDeleteCopyOptions,
      setActiveActions,
      setEditLinkOptions,
      setLinkModalActive,
    },
    ref,
  ) => {
    const [isAbove, setIsAbove] = useState(false);

    useEffect(() => {
      const element = triggerRef?.current;
      const tableElement = tableRef?.current;
      if (element && tableElement) {
        const rect = element.getBoundingClientRect();
        const tableRect = tableElement.getBoundingClientRect();
        const spaceBelow = tableRect.bottom - rect.bottom;
        if (spaceBelow < 80) {
          setIsAbove(true);
        } else {
          setIsAbove(false);
        }
      }
    }, [triggerRef]);

    return (
      <div
        // className="dropdown-menu -left-1 top-2 absolute bg-white widget-container rounded-lg border border-extraLightColor"
        className={`dropdown-menu absolute bg-white widget-container rounded-lg border border-extraLightColor ${
          isAbove ? 'bottom-full' : 'top-2'
        }`}
        id="dropdownFilterTableAll"
        style={{
          zIndex: 10000,
        }}
        ref={ref}
      >
        <div className="flex flex-col w-full h-full">
          <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b border-extraLightColor pl-0"
            role="tablist"
          >
            <li
              className="nav-item cursor-pointer hover:bg-greyLight w-full h-full pl-2 pr-32 py-2.5"
              role="presentation"
              key="edit"
              onClick={() => {
                setEditLinkOptions({
                  active: true,
                  id: trackableCopy.id,
                  short_code: trackableCopy.short_code,
                  name: trackableCopy.name,
                  destination_url: trackableCopy.destination_url,
                  description: trackableCopy.description,
                  position: trackableCopy.url_position,
                  type: trackableCopy.type,
                });
                setLinkModalActive(true);
                setActiveActions(null);
              }}
            >
              Edit
            </li>
            <li
              className="nav-item cursor-pointer hover:bg-greyLight text-warningColor w-full h-full pl-2 pr-32 py-2.5"
              role="presentation"
              key="delete"
              onClick={() => {
                setDeleteModalActive(true);
                setDeleteCopyOptions({
                  id: trackableCopy.id,
                  short_code: trackableCopy.short_code,
                });
                setActiveActions(null);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
    );
  },
);

export default ActionsPopover;
