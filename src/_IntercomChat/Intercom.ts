// Set your APP_ID
export const APP_ID = 'k8fwyjtu';

// Loads Intercom with the snippet
// This must be run before boot, it initializes window.Intercom

export const load = () => {
  (function () {
    const w = window;
    const ic = (w as any).Intercom;
    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', (w as any).intercomSettings);
    } else {
      const d = document;
      const i: any = function () {
        /**/
        (i as any).c();
      };
      i.q = [];
      i.c = function (args: any) {
        i.q.push(args);
      };
      (w as any).Intercom = i;
      const l = function () {
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + APP_ID;
        const x: any = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === 'complete') {
        l();
      } else if ((w as any).attachEvent) {
        (w as any).attachEvent('onload', l);
      } else {
        (w as any).addEventListener('load', l, false);
      }
    }
  })();
};

// Initializes Intercom
export const boot = (options = {} as any) => {
  window &&
    (window as any).Intercom &&
    (window as any).Intercom('boot', { app_id: APP_ID, ...options });
};

export const shutdown = () => {
  window && (window as any).Intercom && (window as any).Intercom('shutdown');
};

export const update = () => {
  window && (window as any).Intercom && (window as any).Intercom('update');
};
