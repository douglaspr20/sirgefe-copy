export type FileUpload = {
  file: File;
  extension_type: string;
  content_type: string;
};

export type Sidebar = {
  route: string;
  title: string;
  icon: JSX.Element;
};

declare global {
  interface Window {
    tolt_referral: string | null;
    tolt: {
      signup: (shopify_store_url: string | null) => void;
    };
    fbq: any;
  }
}
