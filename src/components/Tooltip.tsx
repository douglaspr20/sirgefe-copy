import React from 'react';
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';

type Props = {
  title?: string;
  styleProps?: any;
  content?: string;
  anchorId: string;
  className?: string;
  place?: PlacesType;
};

const styles = {
  zIndex: 200,
  backgroundColor: '#fff',
  height: 'fit-content',
  padding: 10,
  margin: '2px 0',
  border: ' 1px solid #ebeff3',
  boxShadow: '0px 4px 16px rgba(31, 58, 90, 0.15)',
  borderRadius: '6px',
  maxWidth: 650,
  textAlign: 'center',
};

const Tooltip: React.FunctionComponent<Props> = ({
  title,
  content,
  anchorId,
  styleProps,
  className,
  place = 'bottom',
}) => {
  const htmlContent = React.useMemo(() => {
    return `
    <h6 style="color: #5F666D; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">${title}</h6>
          
    <div style="text-align: center;">
        <span style="color: #5F666D; font-size: 0.875rem; font-weight: 400;">${content}</span>
    </div>`;
  }, [title, content]);

  return (
    <>
      {content ? (
        <>
          <ReactTooltip
            anchorId={anchorId}
            place={place}
            opacity={1}
            html={htmlContent}
            style={{ ...(styles as object), ...styleProps }}
          />
        </>
      ) : (
        <ReactTooltip
          anchorId={anchorId}
          place={place}
          content={title}
          className={className}
          opacity={1}
          style={{
            ...(styles as object),
            ...styleProps,
            color: '#5F666D',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        />
      )}
    </>
  );
};

export default Tooltip;
