// import Button from '@components/Button';
import { FRAME_OPTIONS } from '@constants/frame';
import { LogLevel } from '@enums/log-level';
import { registerLoading, unRegisterLoading } from '@helpers/anim.helpers';
import { useAppDispatch } from '@redux';
import { setCheckoutProductId } from '@redux/general/action';
import { getProductList } from '@services/api/product';
import log from '@utils/logger';
import { default as classNames, default as cn } from 'classnames';
import { useState, useEffect } from 'react';
import { AnimHeading } from 'src/animations/heading';
import useAsyncEffect from 'use-async-effect';
import { FrameItem } from '../frame-item';
import s from './prices.module.scss';
import Button from '@components/Button';

const LOG_PREFIX = 'Prices';

export const Prices = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<IFrame[]>(FRAME_OPTIONS);

  const openCheckoutPopup = (productId: string) => {
    dispatch(setCheckoutProductId(productId));
  };

  useEffect(() => {
    registerLoading();
  }, []);

  useAsyncEffect(async () => {
    try {
      const { data } = await getProductList();
      if (data.products) {
        // setProducts(data.products);
        setProducts(FRAME_OPTIONS);
      }
    } catch (_: unknown) {
      log('failed to get products', LogLevel.Error, LOG_PREFIX);
    } finally {
      unRegisterLoading();
    }
  }, []);

  return (
    <div className={s.tableInfo}>
      <div
        id="tech-spec"
        className={cn(s.tableInfo_specContainer, 'container')}
      >
        <div className="row">
          <div className="col-xl-10 offset-xl-1 col-12">
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
          <div
            className={classNames('col-xl-10 offset-xl-1 col-12', s.Home_table)}
          >
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
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      55 inches (diagonal) OLED display
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
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      43 inches (diagonal) 4K LED display
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
                      onClick={() => openCheckoutPopup(products[0].id)}
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
                      onClick={() => openCheckoutPopup(products[1].id)}
                    >
                      Buy
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Dimensions</span>
                  </td>
                  <td>
                    <span className={s.Home_specTitle}>Dimensions</span>
                    <img
                      src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221228/55_inch8628b80500.png"
                      alt=""
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
                  <td>
                    <img
                      src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221228/43_inch7826279f9c.png"
                      alt=""
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
                    <div className={s.Home_specContent}>Grail 55”</div>
                    <div className={s.Home_specContent}>
                      16 ft cable - Adapted to USA, EU, UK sockets
                    </div>
                  </td>
                  <td>
                    <div className={s.Home_specContent}>Grail 43”</div>
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
                    >{`48.6" L x 32.3" W x 5.7" H`}</div>
                    <div className={s.Home_specContent}>Weight: 65 lbs</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Processor</span>
                  </td>
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Processor</span>
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
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Graphic card</span>
                    <div className={cn(s.Home_specContent, s.highlight)}>
                      RTX 3060 OC Edition 12GB
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Memory</span>
                  </td>
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Memory</span>
                    <div className={s.Home_specContent}>8GB 2666MHz DDR4</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Storage</span>
                  </td>
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Storage</span>
                    <div className={s.Home_specContent}>250GB SSD</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Connectivity</span>
                  </td>
                  <td className={s.table_td_one}>
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
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Frame material</span>
                  </td>
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Frame material</span>
                    <div className={s.Home_specContent}>Natural ash wood</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>
                      Electrical and Operating Requirements
                    </span>
                  </td>
                  <td className={s.table_td_one}>
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
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Policy</span>
                  </td>
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Policy</span>
                    <div className={s.Home_specContent}>
                      No trial, no return
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className={s.Home_specTitle}>Warranty</span>
                  </td>
                  <td className={s.table_td_one}>
                    <span className={s.Home_specTitle}>Warranty</span>
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
          {products.map((frame: IFrame) => {
            return (
              <div key={frame.id} className="col-xl-4 col-sm-6 col-12">
                <FrameItem
                  data={frame}
                  openCheckoutPopup={() => openCheckoutPopup(frame.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
