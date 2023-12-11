import { LoadingButton } from '@components/LoadingButton';
import { GoogleAdAccount } from './GoogleConnection';

type TiktokAd = {
  advertiser_id: string;
  advertiser_name: string;
};

type FacebookAd = {
  id: string;
  name: string;
};

type AdsModalProps = {
  title: string;
  type: string;
  facebookAds?: FacebookAd[];
  tiktokAds?: TiktokAd[];
  googleAds?: GoogleAdAccount[];
  selectedAd: string;
  isSending: boolean;
  loadingAds: boolean;
  setSelectedAd: (value: string) => void;
  connectTiktokAdAccount?: () => void;
  connectFacebookAdAccount?: () => void;
  connectGoogleAdAccount?: () => void;
};

const AdAccountModal: React.FunctionComponent<AdsModalProps> = ({
  title,
  type,
  facebookAds,
  tiktokAds,
  googleAds,
  setSelectedAd,
  isSending,
  loadingAds,
  selectedAd,
  connectTiktokAdAccount,
  connectFacebookAdAccount,
  connectGoogleAdAccount,
}) => {
  return (
    <>
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-5 pb-1">
        <h3 className="h3">{`Select ${title} account`}</h3>
        <button
          type="button"
          className="inline-flex text-darkGrade50 hover:text-darkGrade75 text-2xl"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="icon-dismiss-circle"></i>
        </button>
      </div>
      <div className="modal-body relative px-6 pb-4">
        <div className="grid w-full gap-x-5 mt-2 mb-3">
          <div>
            <label className="form-label" htmlFor="firstName">
              Ad Account
            </label>
            <div>
              {type === 'fb' && (
                <select
                  className="select light"
                  onChange={(e) => setSelectedAd(e.target.value)}
                  value={selectedAd}
                >
                  {facebookAds &&
                    facebookAds.map((ad) => (
                      <option key={ad.id} value={ad.id}>
                        {`${ad.name} - ${ad.id}`}
                      </option>
                    ))}
                </select>
              )}

              {type === 'tiktok' && (
                <select
                  className="select light"
                  onChange={(e) => setSelectedAd(e.target.value)}
                  value={selectedAd}
                >
                  {tiktokAds &&
                    tiktokAds.map((ad) => (
                      <option key={ad.advertiser_id} value={ad.advertiser_id}>
                        {ad.advertiser_name}
                      </option>
                    ))}
                </select>
              )}

              {type === 'google' && (
                <select
                  className="select light"
                  onChange={(e) => setSelectedAd(e.target.value)}
                  value={loadingAds ? 'loading' : selectedAd}
                  disabled={loadingAds}
                >
                  {googleAds && !loadingAds ? (
                    googleAds.map((ad, i) => (
                      <option key={i} value={ad.id}>
                        {`${ad.name} - ${ad.id}`}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="loading">Loading Ad Accounts</option>
                    </>
                  )}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end py-4">
          <button
            type="button"
            className="btn light ml-3"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Cancel
          </button>

          <button
            className="btn ml-3 inline-flex items-center"
            onClick={() => {
              if (type === 'fb') connectFacebookAdAccount?.();
              if (type === 'tiktok') connectTiktokAdAccount?.();
              if (type === 'google') connectGoogleAdAccount?.();
            }}
            disabled={loadingAds}
          >
            {!isSending ? (
              <button className="btn">Connect</button>
            ) : (
              <div className="flex justify-end">
                <LoadingButton text="Connecting" />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdAccountModal;
