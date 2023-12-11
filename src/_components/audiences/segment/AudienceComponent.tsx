import Image from 'next/image';

import GoogleIcon from '@assets/img/google-ad-icon.svg';
import FacebookIcon from '@assets/img/facebook_orig.svg';
import TiktokIcon from '@assets/img/tiktok.svg';
import { useEffect, useState } from 'react';
import { IAudienceItem } from '@interfaces/audiences';

type Props = {
  title: string;
  desctiption: string;
  btnTitle: string;
  handleClick: (items: IAudienceItem[]) => void;
  audiences?: IAudienceItem[];
  handleSkip?: () => void;
  modalLoader: boolean;
};

const defaultItems = [
  {
    name: 'Tiktok',
    checked: false,
  },
  {
    name: 'Facebook',
    checked: false,
  },
  {
    name: 'Google',
    checked: false,
  },
];

const getIcon = (name: string) => {
  switch (name) {
    case 'Tiktok':
      return TiktokIcon;
    case 'Facebook':
      return FacebookIcon;
    default:
      return GoogleIcon;
  }
};

const AudienceComponent: React.FunctionComponent<Props> = ({
  title,
  desctiption,
  handleClick,
  btnTitle,
  audiences,
  handleSkip,
  modalLoader,
}) => {
  const [items, setItems] = useState<IAudienceItem[]>(
    JSON.parse(JSON.stringify(defaultItems)),
  );

  const onChange = (e: any) => {
    const { checked: value, name } = e.target;
    const temp = [...items];
    const ind = temp.findIndex((item) => item.name === name);
    if (ind > -1) {
      const item = temp[ind];
      item.checked = value;
      setItems(temp);
    }
  };

  useEffect(() => {
    if (audiences && audiences.length > 0) {
      const temp = JSON.parse(JSON.stringify(items));
      temp.map((t: IAudienceItem) => {
        let found = false;
        audiences.forEach((a) => {
          if (a.name.toLowerCase() === t.name.toLowerCase()) {
            t.checked = true;
            found = true;
          }
        });

        if (!found) {
          t.checked = false;
        }

        return t;
      });

      setItems(JSON.parse(JSON.stringify(temp)));
    } else {
      setItems(JSON.parse(JSON.stringify(defaultItems)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audiences]);

  return (
    <div className="p-5 bg-white">
      <div className="flex flex-col justify-center">
        <h4 className="">{title}</h4>
        <p className="mt-1 text-[#5F666D]">{desctiption}</p>

        <div className="mt-8">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center border border-extraLightColor rounded-md px-4 py-6 mb-4"
            >
              <input
                id="name"
                type="checkbox"
                className="w-4 h-4"
                checked={item.checked || false}
                name={item.name}
                onChange={onChange}
              />
              <Image
                src={getIcon(item.name)}
                width={24}
                height={24}
                alt={item.name}
                className="ml-2"
              />
              <span className="ml-1">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end mt-4 gap-3">
          <button
            className={`btn w-[152px] text-center light  items-center  px-4 rounded-md  `}
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              if (handleSkip) {
                handleSkip();
              }
            }}
          >
            Skip
          </button>

          <button
            type="button"
            className="btn w-[152px] text-center flex  justify-center  items-center px-4  "
            onClick={() => handleClick(items)}
          >
            {modalLoader ? (
              <Image
                className="animate-spin mr-2 color-[#ffffff]"
                src="/images/spinner-sm-white.svg"
                alt="refresh"
                width={20}
                height={20}
              />
            ) : (
              btnTitle
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudienceComponent;
