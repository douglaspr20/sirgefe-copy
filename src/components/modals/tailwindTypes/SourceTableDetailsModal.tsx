import React, { FC, useEffect, useRef, useState } from 'react';
import Pagination from '@components/pagination';
import { getBusinessSourcesDetailsById } from '@graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import * as Sentry from '@sentry/nextjs';

import NoData from '@components/NoData';
import { SourcesBusiness } from 'API';
import { FieldSourcesSortType } from '@interfaces/source';
import { ValidTypeSort } from '@interfaces/sort';
import { sourcDetailsColumns } from '@utils/adjustableColumns';
import { handleMouseDown } from '@utils/handeResizeColumns';
import Link from 'next/link';
import { generateSourceName } from '@utils/source';
import TableLoading from '@components/loader/TableLoading';

interface Props {
  business_id: string;
  date_from: string;
  date_to: string;
  source: SourcesBusiness | null;
  shopify_store_domain: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SourceTableDetailsModal: FC<Props> = ({
  business_id,
  date_from,
  date_to,
  source,
  shopify_store_domain,
  currentPage,
  setCurrentPage,
}) => {
  const source_name = source?.source || '';
  const numberPagesRef = useRef<number>(1);
  const activeSort = useRef<FieldSourcesSortType | null>('unique_visitor');

  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<SourcesBusiness[]>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const [typesSorts, setTypeSorts] = useState<
    Record<FieldSourcesSortType | string, string | ValidTypeSort>
  >({
    source: '',
    referer: '',
    clicks_count: '',
    unique_visitor: 'desc',
    purchases_count: '',
    created: '',
    _id: '',
  });

  const handleSort = async (
    key: FieldSourcesSortType,
    value: ValidTypeSort,
  ) => {
    try {
      activeSort.current = key;

      setTypeSorts({
        ...typesSorts,
        [key]: value,
      });
    } catch (error: any) {
      Sentry.captureException(error);
    }
  };

  const handleResize = (columnIndex: number, newWidth: number) => {
    const newColumnWidths = [...columnWidths];

    newColumnWidths[columnIndex] = newWidth;

    setColumnWidths(newColumnWidths);
  };

  useEffect(() => {
    const fetchSourcesDetails = async () => {
      if (!source) {
        return;
      }

      try {
        setLoading(true);
        const fieldSort = activeSort?.current as FieldSourcesSortType;

        const response: any = await API.graphql(
          graphqlOperation(getBusinessSourcesDetailsById, {
            getBusinessSourcesDetailsByIdInput: {
              business_id,
              date_from,
              date_to,
              source_name,
              ...(typesSorts[fieldSort] && {
                sort: {
                  field: fieldSort,
                  sort: typesSorts[fieldSort],
                },
              }),
              numberOfPage: currentPage + 1,
            },
          }),
        );

        if (response.data?.getBusinessSourcesDetailsById?.error) {
          throw new Error(
            response.data?.getBusinessSourcesDetailsById.error?.message,
          );
        }

        setSources(response.data?.getBusinessSourcesDetailsById.data);
        numberPagesRef.current =
          response.data.getBusinessSourcesDetailsById.numberPages;
      } catch (e) {
        setSources([]);
        Sentry.captureException(e);
      } finally {
        setLoading(false);
      }
    };

    if (source_name !== '') {
      fetchSourcesDetails();
    }
  }, [business_id, date_from, date_to, source_name, currentPage, typesSorts]);

  const sourceName = generateSourceName(source?.source, shopify_store_domain);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between relative mb-[2px]">
          <h3 className="h3">{source?.unique_visitor} Visitors</h3>
          <button
            type="button"
            className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-dismiss-circle"></i>
          </button>
        </div>
        <p className="text-textTeriraryColor text-xs capitalize">
          Source: {sourceName}
        </p>
        <div className="max-h-full relative mt-4">
          {loading ? (
            <TableLoading />
          ) : (
            <>
              <div className="table-scroll border border-extraLightColor rounded-lg overflow-x-auto relative max-h-full">
                <table className="main-table w-full min-w-[600px]">
                  <thead>
                    <tr>
                      {sourcDetailsColumns.map((column, i) => (
                        <th
                          key={i}
                          style={{
                            width:
                              columnWidths[i] > column.width
                                ? columnWidths[i]
                                : column.width,
                            zIndex: 'unset',
                          }}
                          className="px-2 py-4 text-darkGrade100 font-semibold bg-layoutQuarteryColor border-b border-r border-extraLightColor text-left select-none"
                          onMouseDown={(e) =>
                            handleMouseDown(e, i, columnWidths, handleResize)
                          }
                        >
                          <div className="flex items-center">
                            <span> {column.name}</span>

                            {column.typeSort && (
                              <button
                                className={`sort-button duration-300 ${
                                  typesSorts[
                                    column.typeSort as FieldSourcesSortType
                                  ] === 'desc'
                                    ? 'rotate-180'
                                    : ''
                                }`}
                                onClick={() =>
                                  handleSort(
                                    column.typeSort as FieldSourcesSortType,
                                    typesSorts[
                                      column.typeSort as FieldSourcesSortType
                                    ] !== 'asc'
                                      ? 'asc'
                                      : 'desc',
                                  )
                                }
                                disabled={loading}
                              >
                                <i className="icon-arrow-sort"></i>
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sources?.map((source) => (
                      <tr key={`${source.source} ${source.referer}`}>
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          <span className="inline-flex items-center trucate-text">
                            {source.referer && (
                              <Link
                                href={source.referer}
                                title={source.referer}
                                aria-label={source.referer}
                                target="_blank"
                              >
                                {source.referer}
                              </Link>
                            )}
                          </span>
                        </td>
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          {source.unique_visitor}
                        </td>
                        <td className="text-textSecondaryColor px-2 py-3 border-b border-r border-extraLightColor last:border-r-0">
                          {source.purchases_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {(!sources.length || sources.length === 0) && <NoData />}
              </div>
              <div className="flex items-center justify-center pt-4">
                <Pagination
                  currentPage={currentPage}
                  onChangeCurrentPage={setCurrentPage}
                  numberPages={numberPagesRef.current}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SourceTableDetailsModal;
