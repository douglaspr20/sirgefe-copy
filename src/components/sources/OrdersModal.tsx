import { getSourcesOrders } from '@graphql/queries';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import { API, graphqlOperation } from 'aws-amplify';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import NoData from '@components/NoData';
import Pagination from '@components/pagination';
import { formatDateDetails, formatMoneyWithDecimals } from '@utils/format';
import Link from 'next/link';

interface OrdersModalProps {
  setOpenModal: (data: any) => void;
  selectedSource: string;
  selectedDateValue: any;
  selectedOrdersCount: number | null;
  setActivePage: Dispatch<SetStateAction<number>>;
  activePage: number;
}

const OrdersModal: FC<OrdersModalProps> = ({
  selectedSource,
  selectedDateValue,
  selectedOrdersCount,
  setActivePage,
  activePage = 0,
}) => {
  const { selectedBusiness, userProfile } = useBusinessProfileContext();

  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      if (!selectedSource) return;
      setLoading(true);

      const response: any = await API.graphql(
        graphqlOperation(getSourcesOrders, {
          getSourcesOrdersInput: {
            business_id: selectedBusiness?.business_id,
            source: selectedSource,
            date_from: selectedDateValue?.startDate,
            date_to: selectedDateValue?.endDate,
            page: activePage + 1 || 1,
          },
        }),
      );

      if (response?.data?.getSourcesOrders?.error) {
        throw new Error(response.data.getSourcesOrders.error.message);
      }

      setOrders(response?.data?.getSourcesOrders?.data || []);
      setPageTotal(response?.data?.getSourcesOrders?.numberPages || 1);
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [selectedBusiness, selectedSource, activePage]);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between relative mb-[2px]">
          <h3 className="h3">
            {selectedOrdersCount} Order
            {Number(selectedOrdersCount) > 1 ? 's' : ''}
          </h3>

          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setActivePage(0)}
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>
        <p className="text-textTeriraryColor text-xs capitalize">
          {selectedSource}
        </p>
        <div className="max-h-full relative mt-4">
          {loading ? (
            <div className="flex items-center justify-center bg-white w-[776px] h-[550px] border-[1px] border-extraLightColor rounded-lg ">
              <div className="inline-flex items-center justify-center flex-col">
                <div className="relative w-[58px] h-[58px] flex justify-center items-center ">
                  <div className="absolute top-0 left-0 right-0 bottom-0">
                    <Image
                      className="animate-spin"
                      src={'/images/spinner.png'}
                      width={58}
                      height={58}
                      alt="spinner"
                    />
                  </div>
                  <Image
                    src={'/images/bolt-sm.svg'}
                    width={32}
                    height={32}
                    alt="spinner"
                  />
                </div>
                <div className="font-semibold text-primaryColor mt-3">
                  Updating Results
                </div>
              </div>
            </div>
          ) : (
            <div className="table-scroll border border-extraLightColor rounded-lg overflow-x-auto relative max-h-full">
              <table className="main-table w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                      Visitor
                    </th>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r-0 border-extraLightColor text-left">
                      Date & Time
                    </th>
                    <th className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left">
                      Total Conversion Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order?.order_id}>
                      <td className="px-2 py-4 text-darkGrade100 border-b border-r border-extraLightColor text-left">
                        <span>{order?.visitor_name}</span>
                        <Link
                          href={`/${selectedBusiness?.vanity_name}/visitors/${order?.visitor_id}/profile`}
                          className="text-sm text-darkGrade50 hover:text-darkGrade75 inline-flex items-center"
                          target="_blank"
                        >
                          <i className="icon-open"></i>
                        </Link>
                      </td>
                      <td className="px-2 py-4 text-darkGrade100 border-b border-r border-extraLightColor text-left">
                        {formatDateDetails(order?.created as string)}
                      </td>
                      <td className="px-2 py-4 text-darkGrade100 border-b border-r border-extraLightColor text-left">
                        {formatMoneyWithDecimals(
                          order?.conversion_value ?? 0,
                          selectedBusiness?.currency as string,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!orders.length && !loading && <NoData />}
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-center pt-4">
            <Pagination
              currentPage={activePage}
              onChangeCurrentPage={setActivePage}
              numberPages={pageTotal}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersModal;
