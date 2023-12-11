import React from 'react';

interface Props {
  title?: string;
  content?: string;
  customClassPopoverBody?: React.CSSProperties;
  customClassPopoverTitle?: React.CSSProperties;
}

const Popover = (props: Props) => {
  const { title, content, customClassPopoverBody, customClassPopoverTitle } =
    props;
  return (
    <div className={`fade show bs-popover-top`}>
      <div className="popover-body" style={customClassPopoverBody || {}}>
        {title && (
          <h5
            className="mb-1 font-semibold text-textSecondaryColor w-full"
            style={customClassPopoverTitle || {}}
          >
            {title}
          </h5>
        )}
        {content && (
          <p
            className="font-ight text-textSecondaryColor"
            style={{ fontSize: 15 }}
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default Popover;
