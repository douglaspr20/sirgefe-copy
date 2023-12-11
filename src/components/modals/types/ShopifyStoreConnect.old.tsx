import React, { useState } from 'react';
import { useBusinessProfileContext } from '@providers/businessProfileProvider';

type ShopifyStoreConnectProps = object;

const ShopifyStoreConnect = (_props: ShopifyStoreConnectProps) => {
  const { businessProfile, userProfile } = useBusinessProfileContext();

  const [shopifyStore, setShopifyStore] = useState('');

  const BusinessProfile = businessProfile?.profile;
  const UserProfile = userProfile;

  const storeJson = {
    id: BusinessProfile?.business_id,
    uid: UserProfile?.id,
  };

  const encodedString = Buffer.from(JSON.stringify(storeJson)).toString(
    'base64',
  );

  const launchShopifyUrl = () => {
    window.open(
      `https://${shopifyStore}.myshopify.com/admin/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID}&scope=read_all_orders,read_customers,read_orders&redirect_uri=https://api.dev.sirge.io/v1/connections/shopify&state=${encodedString}&grant_options[]=value`,
      '_self',
    );
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      launchShopifyUrl();
    }
  };

  return (
    <>
      {/* <Dialog
      open={true}
      onClose={() => {
        setModal(ModalTypes.SHOPIFY_STORE_CONNECT);
      }}
    >
      <DialogTitle>Shopify Store</DialogTitle>
      <DialogContent sx={{ minwidth: '400px' }}>
        Step 1
        <FormControl variant="filled">
          <FilledInput
            fullWidth
            id="filled-adornment-weight"
            autoFocus
            required
            onChange={(e) => {
              setShopifyStore(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            endAdornment={
              <InputAdornment position="end">.myshopify.com</InputAdornment>
            }
            inputProps={{
              'aria-label': '.myshopify.com',
              className: 'adornmentTXInput',
            }}
          />
          <br></br>
          Step 2
          <Button
            variant="contained"
            style={{ backgroundColor: '#f7f8fa' }}
            onClick={() => {
              window.open(
                'https://' +
                  shopifyStore +
                  '.myshopify.com/admin/settings/apps/development',
                '_blank',
              );
            }}
          >
            Create Private App
          </Button>
          <br></br>
          click create app and seelect scope permissions.scriptags. customer
          orders and get access token.
          <TextField
            required
            id="filled-required"
            label="Access Token"
            variant="filled"
            fullWidth
            placeholder=""
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setModal(ModalTypes.SHOPIFY_STORE_CONNECT);
          }}
        >
          Cancel
        </Button>
        {shopifyStore.length > 0 ? (
          <Button variant="outlined" onClick={launchShopifyUrl}>
            Connect
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            Connect
          </Button>
        )}
      </DialogActions>
    </Dialog> */}
    </>
  );
};

export default ShopifyStoreConnect;
