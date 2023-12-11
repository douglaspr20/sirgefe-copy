import React, { FC } from 'react';
import dayjs from 'dayjs';
import { capitalizeWords } from '@modules/capitalizeWords';
import { InvoiceInfo } from '@interfaces/InvoiceInfo';

interface Invoice {
  created_at: string;
  customer_id: string;
  id: string;
  invoice_body: string;
  status: string;
  updated_at: string;
}

interface Props {
  invoice: Invoice;
}

const InvoicesRow: FC<Props> = ({ invoice }) => {
  const invoiceInfo: InvoiceInfo = JSON.parse(
    Buffer.from(invoice.invoice_body, 'base64').toString('ascii'),
  );

  return (
    <div className="table-row text-textSecondaryColor">
      <div className="table-cell px-2 py-2.5 border-b border-extraLightColor border-r">
        {invoiceInfo.number}
      </div>
      <div className="table-cell px-2 py-2.5 border-b border-extraLightColor border-r">
        {dayjs(invoice.updated_at).format('MMMM DD, YYYY HH:mm A')}
      </div>
      <div className="table-cell px-2 py-2.5 border-b border-extraLightColor border-r">
        ${invoiceInfo.total} ${invoiceInfo.currency.toUpperCase()}
      </div>
      <div className="table-cell px-2 py-2.5 border-b border-extraLightColor">
        <div className="inline-flex items-center justify-between w-full">
          <span className="ml-2 bg-greenBgColor text-xs text-greenDefault px-1 py-[2px] rounded">
            {capitalizeWords(invoice.status)}
          </span>
          <button className="text-base inline-flex text-darkGrade50 hover:text-darkGrade75">
            <i className="icon-arrow-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicesRow;
