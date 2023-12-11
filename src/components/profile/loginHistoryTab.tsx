import { useBusinessProfileContext } from '@providers/businessProfileProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { useEffect, useState } from 'react';
import { formatDateTimezone } from '@utils/format';
import Image from 'next/image';
import { API, graphqlOperation } from 'aws-amplify';
import { getCurrentUserSessions } from '@graphql/queries';
import { UserSession } from 'API';

dayjs.extend(utc);
dayjs.extend(timezone);

const LoginHistoryTab: React.FunctionComponent = () => {
  const [openList, setOpenList] = useState<boolean>(false);
  const { userProfile, selectedBusiness } = useBusinessProfileContext();
  const [sessions, setSessions] = useState<UserSession[]>([]);

  const getSessions = async () => {
    const response: any = await API.graphql(
      graphqlOperation(getCurrentUserSessions, {
        getCurrentUserSessionsInput: {
          business_id: selectedBusiness?.business_id,
        },
      }),
    );

    const data = response.data.getCurrentUserSessions.data;

    if (data?.error || !data) {
      setSessions([]);

      return;
    }

    const userSessions = data
      .sort(
        (a: UserSession, b: UserSession) =>
          new Date(b.created_at as string).getTime() -
          new Date(a.created_at as string).getTime(),
      )
      .map((historyItem: any) => ({
        location: historyItem.location,
        created_at: historyItem.created_at,
      }));

    setSessions(userSessions);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div
      className="tab-pane fade"
      id="tabs-messagesFill"
      role="tabpanel"
      aria-labelledby="tabs-profile-tabFill"
    >
      <div className="p-4">
        <div className="w-full rounded border border-extraLightColor">
          <div className="grid grid-cols-2 border-b border-extraLightColor">
            <div className="px-2 py-[10px] border-r border-extraLightColor bg-layoutQuarteryColor font-semibold text-darkGrade100">
              Date And Time
            </div>
            <div className="px-2 py-[10px] bg-layoutQuarteryColor font-semibold text-darkGrade100">
              City
            </div>
          </div>

          {sessions
            .slice(0, openList && sessions.length > 5 ? 16 : 5)
            .map((item, i) => (
              <React.Fragment key={i}>
                <div className="grid grid-cols-2 border-b border-extraLightColor">
                  <div className="px-2 py-[10px] border-r border-extraLightColor">
                    <div>
                      <span>
                        {formatDateTimezone(
                          item.created_at as string,
                          selectedBusiness?.timezone,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 py-[10px]">{item.location}</div>
                </div>
              </React.Fragment>
            ))}
        </div>

        <div className="flex justify-center mt-5">
          {sessions.length > 5 && (
            <button
              className="inline-flex items-center justify-center text-darkGrade50 hover:text-darkGrade100 transition-colors"
              onClick={() => setOpenList((prev) => !prev)}
            >
              {openList ? (
                <span className="flex justify-center items-center">
                  <Image
                    className="mr-1"
                    src="/images/arrow-up.svg"
                    alt="plan gro icon"
                    width={14}
                    height={14}
                    style={{
                      opacity: '70%',
                    }}
                  />
                  View Less
                </span>
              ) : (
                <span className="flex justify-center items-center">
                  <Image
                    className="mr-1"
                    src="/images/arrow-down.svg"
                    alt="plan gro icon"
                    width={14}
                    height={14}
                    style={{
                      opacity: '70%',
                    }}
                  />
                  View All
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginHistoryTab;
