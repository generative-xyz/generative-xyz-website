import { LogLevel } from '@enums/log-level';
import { useAppDispatch } from '@redux';
import { setCheckoutProduct } from '@redux/general/action';
import { getProductList } from '@services/api/product';
import log from '@utils/logger';
import { default as classNames, default as cn } from 'classnames';
import { useState, useContext } from 'react';
import { AnimHeading } from 'src/animations/heading';
import useAsyncEffect from 'use-async-effect';
import { FrameItem } from '../frame-item';
import s from './prices.module.scss';
import Button from '@components/Button';
import { CDN_URL } from '@constants/config';
import { LoadingContext } from '@contexts/loading-context';

const LOG_PREFIX = 'Prices';

export const Prices = (): JSX.Element => {
  const { registerLoading, unRegisterLoading } = useContext(LoadingContext);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<IFrame[]>([]);

  const openCheckoutPopup = (product: IFrame) => {
    dispatch(setCheckoutProduct(product));
  };

  useAsyncEffect(async () => {
    try {
      registerLoading('Prices2');
      const { data } = await getProductList();
      if (data.products) {
        unRegisterLoading('Prices2');
        setProducts(data.products);
      }
    } catch (_: unknown) {
      unRegisterLoading('Prices2');
      log('failed to get products', LogLevel.Error, LOG_PREFIX);
    }

    return () => {
      unRegisterLoading('Prices2');
    };
  }, []);

  if (products.length === 0) return <></>;

  return (
    <div className={s.tableInfo}>
      <div className={cn(s.tableInfo_specContainer, 'container')}>
        <div className="row">
          <div className="col-12">
            <AnimHeading
              tag={'div'}
              className={cn(
                s.Home_headline,
                'heading heading__medium text__black'
              )}
            >
              Tech specs
            </AnimHeading>
          </div>
          <div id="tech-spec" className={classNames('col-12', s.Home_table)}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Display options</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Display options</span>
                    <div
                      className={classNames(
                        s.screen,
                        s.screen__55,
                        'image__fit'
                      )}
                    >
                      <img src={products[0].image} alt="ethf4d1101ffd" />
                    </div>
                    <div
                      className={cn(
                        s.Home_specContent,
                        s.highlight,
                        s.highlight__name
                      )}
                    >
                      55 inches (diagonal) OLED display
                    </div>
                    <div className={s.Home_specContent}>
                      Display Resolution: 4K (3840x2160 pixels)
                    </div>
                    <div className={s.Home_specContent}>Aspect Ratio 16:9</div>
                    <div className={s.Home_specContent}>
                      Brightness (Typ.,cd/m²) 800 unit
                    </div>
                    <div className={s.Home_specContent}>
                      Contrast Ratio 1,000,000:1
                    </div>
                    <div className={s.Home_specContent}>
                      Adaptive refresh rates up to 120Hz
                    </div>
                  </td>
                  <td>
                    <div
                      className={classNames(
                        s.screen,
                        s.screen__55,
                        'image__fit'
                      )}
                    >
                      <img src={products[2].image_left} alt="ethf4d1101ffd" />
                    </div>
                    <div
                      className={cn(
                        s.Home_specContent,
                        s.highlight,
                        s.highlight__name
                      )}
                    >
                      29.5” LCD display
                    </div>
                    <div className={s.Home_specContent}>
                      Display Resolution: 2K (2160x2160 pixels)
                    </div>
                    <div className={s.Home_specContent}>
                      Aspect ratio 1:1 (H:V)
                    </div>
                    <div className={s.Home_specContent}>
                      Brightness 600 nits
                    </div>
                    <div className={s.Home_specContent}>
                      Contrast ratio 3000:1
                    </div>
                    <div className={s.Home_specContent}>
                      Refresh rates up to 60Hz
                    </div>
                    <div className={s.Home_specContent}>
                      Color depth a-Si TFT-LCD 16.7M color
                    </div>
                  </td>
                  <td>
                    <div
                      className={classNames(
                        s.screen,
                        s.screen__45,
                        'image__fit'
                      )}
                    >
                      <img
                        src={products[1].image_left || products[1].image}
                        alt="ethf4d1101ffd"
                      />
                    </div>
                    <div
                      className={cn(
                        s.Home_specContent,
                        s.highlight,
                        s.highlight__name
                      )}
                    >
                      43 inches (diagonal) 4K LED display
                    </div>
                    <div className={s.Home_specContent}>
                      Display Resolution: 4K (3840x2160 pixels)
                    </div>
                    <div className={s.Home_specContent}>Aspect Ratio 16:9</div>
                    <div className={s.Home_specContent}>
                      Brightness (Typ.,cd/m²) 500 unit
                    </div>
                    <div className={s.Home_specContent}>
                      Contrast Ratio 1,000,000:1
                    </div>
                    <div className={s.Home_specContent}>
                      Adaptive refresh rates up to 120Hz
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Price</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Price</span>

                    <div className={cn(s.Home_specContent, s.price)}>
                      <span>
                        {products[0].eth_price || products[0].price} ETH
                      </span>
                    </div>
                    <Button
                      className={s.buy_now}
                      onClick={() => openCheckoutPopup(products[0])}
                    >
                      Buy
                    </Button>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.price)}>
                      <span>
                        {products[2].eth_price || products[2].price} ETH
                      </span>
                    </div>
                    <Button
                      className={s.buy_now}
                      onClick={() => openCheckoutPopup(products[2])}
                    >
                      Buy
                    </Button>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.price)}>
                      <span>
                        {products[1].eth_price || products[1].price} ETH
                      </span>
                    </div>
                    <Button
                      className={s.buy_now}
                      onClick={() => openCheckoutPopup(products[1])}
                    >
                      Buy
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Dimensions</span>
                  </td>
                  <td className={s.dimensions}>
                    <span className={s.Home_specTitle}>Dimensions</span>
                    <img
                      src={`${CDN_URL}/pages/home/icons/55_.svg`}
                      alt="55_"
                      className={s.Home_specDimension}
                    />
                    <div
                      className={classNames(
                        s.Home_specContent,
                        s.Home_specContent_specDimension
                      )}
                    >
                      Weight: 70 lbs
                    </div>
                  </td>
                  <td className={s.dimensions}>
                    <img
                      src={`${CDN_URL}/pages/landingpage/30_.svg`}
                      alt="30_"
                      className={s.Home_specDimension}
                    />
                    <div
                      className={classNames(
                        s.Home_specContent,
                        s.Home_specContent_specDimension
                      )}
                    >
                      Weight: 66 lbs
                    </div>
                  </td>
                  <td className={s.dimensions}>
                    <img
                      src={`${CDN_URL}/pages/home/icons/43_.svg`}
                      alt="43_"
                      className={s.Home_specDimension}
                    />
                    <div
                      className={classNames(
                        s.Home_specContent,
                        s.Home_specContent_specDimension
                      )}
                    >
                      Weight: 50 lbs
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={s.Home_specTitle}>In the box</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>In the box</span>
                    <div className={s.Home_specContent}>
                      Generative Display 55”
                    </div>
                    <div className={s.Home_specContent}>
                      16 ft cable - Adapted to USA, EU, UK sockets
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>
                      Generative Display 30”
                    </div>
                    <div className={s.Home_specContent}>
                      16 ft cable - Adapted to USA, EU, UK sockets
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>
                      Generative Display 43”
                    </div>
                    <div className={s.Home_specContent}>
                      16 ft cable - Adapted to USA, EU, UK sockets
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={s.Home_specTitle}>
                      Shipping dimensions
                    </span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>
                      Shipping dimensions
                    </span>

                    <div
                      className={s.Home_specContent}
                    >{`58.8" L x 38.1" W x 5.7" H`}</div>
                    <div className={s.Home_specContent}>Weight: 85 lbs</div>
                  </td>
                  <td>
                    <div
                      className={s.Home_specContent}
                    >{`33.5" L x 33.5" W x 8.3" H`}</div>
                    <div className={s.Home_specContent}>Weight: 65 lbs</div>
                  </td>
                  <td>
                    <div
                      className={s.Home_specContent}
                    >{`48.6" L x 32.3" W x 5.7" H`}</div>
                    <div className={s.Home_specContent}>Weight: 65 lbs</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Processor</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Processor</span>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Intel 11th Core i5
                    </div>
                    <div className={s.Home_specContent}>
                      6 cores CPU allow for good performance with the latest
                      graphics-intense artworks
                    </div>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Intel 11th Core i5
                    </div>
                    <div className={s.Home_specContent}>
                      6 cores CPU allow for good performance with the latest
                      graphics-intense artworks
                    </div>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Intel 11th Core i5
                    </div>
                    <div className={s.Home_specContent}>
                      6 cores CPU allow for good performance with the latest
                      graphics-intense artworks
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Graphic card</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Graphic card</span>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      RTX 3060 OC Edition 12GB
                    </div>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      RTX 3060 OC Edition 12GB
                    </div>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      RTX 3060 OC Edition 12GB
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Memory</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Memory</span>
                    <div className={s.Home_specContent}>8GB 2666MHz DDR4</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>8GB 2666MHz DDR4</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>8GB 2666MHz DDR4</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Storage</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Storage</span>
                    <div className={s.Home_specContent}>250GB SSD</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>250GB SSD</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>250GB SSD</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Connectivity</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Connectivity</span>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Wifi
                    </div>
                    <div className={s.Home_specContent}>
                      802.11ax Wi-Fi 6 wireless networking
                    </div>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Bluetooth
                    </div>
                    <div className={s.Home_specContent}>
                      Bluetooth 5.0 wireless technology
                    </div>
                  </td>

                  <td>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Wifi
                    </div>
                    <div className={s.Home_specContent}>
                      802.11ax Wi-Fi 6 wireless networking
                    </div>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Bluetooth
                    </div>
                    <div className={s.Home_specContent}>
                      Bluetooth 5.0 wireless technology
                    </div>
                  </td>
                  <td>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Wifi
                    </div>
                    <div className={s.Home_specContent}>
                      802.11ax Wi-Fi 6 wireless networking
                    </div>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      Bluetooth
                    </div>
                    <div className={s.Home_specContent}>
                      Bluetooth 5.0 wireless technology
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Frame material</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Frame material</span>
                    <div className={s.Home_specContent}>Natural ash wood</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>Natural ash wood</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>Natural ash wood</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>
                      Electrical and Operating Requirements
                    </span>
                  </td>
                  <td className={s.Home_specTitle_large}>
                    <span className={s.Home_specTitle}>
                      Electrical and Operating Requirements
                    </span>
                    <div className={s.Home_specContent}>
                      Line voltage: AC100V to AC240V
                    </div>
                    <div className={s.Home_specContent}>
                      Frequency: 50Hz to 60Hz. single phase
                    </div>
                    <div className={s.Home_specContent}>
                      Operating temperature: 50° to 95° F (10° to 35° C)
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>
                      Line voltage: AC100V to AC240V
                    </div>
                    <div className={s.Home_specContent}>
                      Frequency: 50Hz to 60Hz. single phase
                    </div>
                    <div className={s.Home_specContent}>
                      Operating temperature: 50° to 95° F (10° to 35° C)
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>
                      Line voltage: AC100V to AC240V
                    </div>
                    <div className={s.Home_specContent}>
                      Frequency: 50Hz to 60Hz. single phase
                    </div>
                    <div className={s.Home_specContent}>
                      Operating temperature: 50° to 95° F (10° to 35° C)
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Policy</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Policy</span>
                    <div className={s.Home_specContent}>
                      No trial, no return
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>
                      No trial, no return
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>
                      No trial, no return
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Warranty</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Warranty</span>
                    <div className={s.Home_specContent}>1 year</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>1 year</div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>1 year</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          className={classNames(s.home_rowFrame, 'row justify-content-center')}
        >
          <div className="col-xl-4 col-sm-6 col-12">
            <FrameItem
              data={products[0]}
              openCheckoutPopup={() => openCheckoutPopup(products[0])}
            />
          </div>
          <div className="col-xl-4 col-sm-6 col-12">
            <FrameItem
              data={products[2]}
              openCheckoutPopup={() => openCheckoutPopup(products[2])}
            />
          </div>
          <div className="col-xl-4 col-sm-6 col-12">
            <FrameItem
              data={products[1]}
              openCheckoutPopup={() => openCheckoutPopup(products[1])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
