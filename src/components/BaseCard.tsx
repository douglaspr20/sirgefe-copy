

import React, {FC} from 'react'
type Props ={
    children: React.ReactNode
}
const BaseCard: FC<Props> = ({children}) => {
  return (
   <>
    <div className="widget-container p-5 flex flex-col justify-between">
        {children}
    </div>
   </>
  );
};

export default BaseCard;


