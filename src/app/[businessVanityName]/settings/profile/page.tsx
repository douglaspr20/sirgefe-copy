import LoginHistoryTab from '_components/settings/profile/loginHistoryTab';
import PasswordTab from '_components/settings/profile/passwordTab';
import ProfileTab from '_components/settings/profile/profileTab';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Settings',
  description: 'Manage your billing settings.',
};

const Page = async () => {
  return (
    <div className="grow px-6 py-6">
      <h2 className="h4 mb-4 flex items-center">Profile</h2>

      <div className="max-w-2xl mx-auto">
        <div className="widget-container">
          <ul
            className="nav nav-tabs grid grid-cols-3 border-b border-extraLightColor pl-4 pr-4"
            id="tabs-tabFill"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-homeFill"
                className="tab-link relative active pt-4 pb-4 flex items-center justify-center font-medium text-sm text-darkGrade50 [&.active]:text-darkGrade100"
                id="tabs-home-tabFill"
                data-bs-toggle="pill"
                data-bs-target="#tabs-homeFill"
                role="tab"
                aria-controls="tabs-homeFill"
                aria-selected="true"
              >
                <i className="icon-person mr-1 text-xl"></i>
                Basic Information
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-profileFill"
                className="tab-link relative pt-4 pb-4 flex items-center justify-center font-medium text-sm text-darkGrade50 [&.active]:text-darkGrade100"
                id="tabs-profile-tabFill"
                data-bs-toggle="pill"
                data-bs-target="#tabs-profileFill"
                role="tab"
                aria-controls="tabs-profileFill"
                aria-selected="false"
              >
                <i className="icon-key mr-1 text-xl"></i>
                Password
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-messagesFill"
                className="tab-link relative pt-4 pb-4 flex items-center justify-center font-medium text-sm text-darkGrade50 [&.active]:text-darkGrade100"
                id="tabs-messages-tabFill"
                data-bs-toggle="pill"
                data-bs-target="#tabs-messagesFill"
                role="tab"
                aria-controls="tabs-messagesFill"
                aria-selected="false"
              >
                <i className="icon-document-bullet-list-clock mr-1 text-xl"></i>
                Login History
              </a>
            </li>
          </ul>

          <div className="tab-content" id="tabs-tabContentFill">
            <ProfileTab />
            <PasswordTab />
            <LoginHistoryTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
