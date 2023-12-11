import React from "react";

const InvoicesTableHeader = () => {
  return (
    <div className="table-header-group text-darkGrade100 font-semibold">
      <div className="table-row">
        <div className="table-cell text-left border-b border-extraLightColor border-r bg-layoutQuarteryColor px-2 py-2.5">
          Invoice #
        </div>
        <div className="table-cell text-left border-b border-extraLightColor border-r bg-layoutQuarteryColor px-2 py-2.5">
          Date
        </div>
        <div className="table-cell text-left min-w-[120px] border-b border-extraLightColor border-r bg-layoutQuarteryColor px-2 py-2.5">
          Total
        </div>
        <div className="table-cell text-left min-w-[120px] border-b border-extraLightColor bg-layoutQuarteryColor px-2 py-2.5">
          Status
        </div>
      </div>
    </div>
  );
};

export default InvoicesTableHeader;
