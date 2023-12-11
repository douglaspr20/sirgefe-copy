import React, {useState} from 'react';
import { useEffect, useRef } from 'react';
import type { LottiePlayer } from 'lottie-web';
type BoltLoaderProps = {
  type?: 'overlay';
};

const BoltLoader = ({}: BoltLoaderProps) => {
    const lottieRef = useRef(null);
    const [lottie, setLottie] = useState<LottiePlayer | null>(null);

    useEffect(() => {
        import('lottie-web').then((Lottie) => setLottie(Lottie.default));
    }, []);
  useEffect(() => {
    if (lottie && lottieRef.current) {
            const animation = lottie.loadAnimation({
                container: lottieRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path:'/loader/logo.json'
            });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div id="lottieitem" ref={lottieRef}></div>
        </div>
      </div>
    </>
  );
};

export default BoltLoader;
