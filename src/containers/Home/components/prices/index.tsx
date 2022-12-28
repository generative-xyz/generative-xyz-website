import Button from '@components/Button';
import { FRAME_OPTIONS } from '@constants/frame';
import { LogLevel } from '@enums/log-level';
import { registerLoading, unRegisterLoading } from '@helpers/anim.helpers';
import { useAppDispatch } from '@redux';
import { setCheckoutProductId } from '@redux/general/action';
import { getProductList } from '@services/api/product';
import log from '@utils/logger';
import { default as classNames, default as cn } from 'classnames';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AnimHeading } from 'src/animations/heading';
import useAsyncEffect from 'use-async-effect';
import { FrameItem } from '../frame-item';
import s from './prices.module.scss';

const LOG_PREFIX = 'Prices';

export const Prices = (): JSX.Element => {
  registerLoading();
  const dispatch = useAppDispatch();
  const [_, setProducts] = useState([]);

  const openCheckoutPopup = (productId: string) => {
    dispatch(setCheckoutProductId(productId));
  };

  useAsyncEffect(async () => {
    try {
      const { data } = await getProductList();
      setProducts(data.products);
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
        </div>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Display options
          </Col>
          <Col xs={3}>
            <div className={classNames(s.screen, s.screen__55, 'image__fit')}>
              <img src={FRAME_OPTIONS[0].img} alt="ethf4d1101ffd" />
            </div>
            <div className={cn(s.Home_specContent, s.highlight)}>
              55 inches (diagonal) OLED display
            </div>
            <div className={s.Home_specContent}>Aspect Ratio 16:9</div>
            <div className={s.Home_specContent}>
              Brightness (Typ.,cd/m²) 500 unit
            </div>
            <div className={s.Home_specContent}>Contrast Ratio 1,000,000:1</div>
            <div className={s.Home_specContent}>
              Adaptive refresh rates up to 120Hz
            </div>
          </Col>
          <Col xs={3}>
            <div className={classNames(s.screen, s.screen__43, 'image__fit')}>
              <img
                src={FRAME_OPTIONS[1].imgLeft || FRAME_OPTIONS[1].img}
                alt="eth3da62e0647"
              />
            </div>
            <div className={cn(s.Home_specContent, s.highlight)}>
              43 inches (diagonal) 4K LED display
            </div>
            <div className={s.Home_specContent}>Aspect Ratio 16:9</div>
            <div className={s.Home_specContent}>
              Brightness (Typ.,cd/m²) 500 unit
            </div>
            <div className={s.Home_specContent}>Contrast Ratio 1,000,000:1</div>
            <div className={s.Home_specContent}>
              Adaptive refresh rates up to 120Hz
            </div>
          </Col>
          <Col xs={3}>
            <div className={classNames(s.screen, s.screen__43, 'image__fit')}>
              <img
                src={FRAME_OPTIONS[1].imgLeft || FRAME_OPTIONS[1].img}
                alt="eth3da62e0647"
              />
            </div>
            <div className={cn(s.Home_specContent, s.highlight)}>
              43 inches (diagonal) 4K LED display
            </div>
            <div className={s.Home_specContent}>Aspect Ratio 16:9</div>
            <div className={s.Home_specContent}>
              Brightness (Typ.,cd/m²) 500 unit
            </div>
            <div className={s.Home_specContent}>Contrast Ratio 1,000,000:1</div>
            <div className={s.Home_specContent}>
              Adaptive refresh rates up to 120Hz
            </div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Price
          </Col>
          <Col xs={3}>
            <div className={cn(s.Home_specContent, s.price)}>
              <span>{FRAME_OPTIONS[0].price} ETH</span>
            </div>
            <Button
              className={s.buy_now}
              onClick={() => openCheckoutPopup(FRAME_OPTIONS[0].id)}
            >
              Buy
            </Button>
          </Col>
          <Col xs={3}>
            <div className={cn(s.Home_specContent, s.price)}>
              <span>{FRAME_OPTIONS[1].price} ETH</span>
            </div>
            <Button
              className={s.buy_now}
              onClick={() => openCheckoutPopup(FRAME_OPTIONS[1].id)}
            >
              Buy
            </Button>
          </Col>
          <Col xs={3}>
            <div className={cn(s.Home_specContent, s.price)}>
              <span>{FRAME_OPTIONS[1].price} ETH</span>
            </div>
            <Button
              className={s.buy_now}
              onClick={() => openCheckoutPopup(FRAME_OPTIONS[2].id)}
            >
              Buy
            </Button>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Dimensions
          </Col>
          <Col xs={3}>
            <img
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221227/43_inch_dimension4xba72e8945e.png"
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
          </Col>
          <Col xs={3}>
            <img
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221227/43_inch_dimension4xba72e8945e.png"
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
          </Col>
          <Col xs={3}>
            <img
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221227/43_inch_dimension4xba72e8945e.png"
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
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            In the box
          </Col>
          <Col xs={3}>
            <div className={s.Home_specContent}>Grail 55”</div>
            <div className={s.Home_specContent}>
              16 ft cable - Adapted to USA, EU, UK sockets
            </div>
          </Col>
          <Col xs={3}>
            <div className={s.Home_specContent}>Grail 43”</div>
            <div className={s.Home_specContent}>
              16 ft cable - Adapted to USA, EU, UK sockets
            </div>
          </Col>
          <Col xs={3}>
            <div className={s.Home_specContent}>Grail 43”</div>
            <div className={s.Home_specContent}>
              16 ft cable - Adapted to USA, EU, UK sockets
            </div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Shipping dimensions
          </Col>
          <Col xs={3}>
            <div
              className={s.Home_specContent}
            >{`58.8" L x 38.1" W x 5.7" H`}</div>
            <div className={s.Home_specContent}>Weight: 85 lbs</div>
          </Col>
          <Col xs={3}>
            <div
              className={s.Home_specContent}
            >{`48.6" L x 32.3" W x 5.7" H`}</div>
            <div className={s.Home_specContent}>Weight: 65 lbs</div>
          </Col>
          <Col xs={3}>
            <div
              className={s.Home_specContent}
            >{`48.6" L x 32.3" W x 5.7" H`}</div>
            <div className={s.Home_specContent}>Weight: 65 lbs</div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Processor
          </Col>
          <Col xs={8}>
            <div className={cn(s.Home_specContent, s.highlight)}>
              Intel 11th Core i5
            </div>
            <div className={s.Home_specContent}>
              6 cores CPU allow for good performance with the latest
              graphics-intense artworks
            </div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Graphic card
          </Col>
          <Col xs={8}>
            <div className={cn(s.Home_specContent, s.highlight)}>
              RTX 3060 OC Edition 12GB
            </div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Memory
          </Col>
          <Col xs={8}>
            <div className={s.Home_specContent}>8GB 2666MHz DDR4</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Storage
          </Col>
          <Col xs={8}>
            <div className={s.Home_specContent}>250GB SSD</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Connectivity
          </Col>
          <Col xs={8}>
            <div className={cn(s.Home_specContent, s.highlight)}>Wifi</div>
            <div className={s.Home_specContent}>
              802.11ax Wi-Fi 6 wireless networking
            </div>
            <div className={cn(s.Home_specContent, s.highlight)}>Bluetooth</div>
            <div className={s.Home_specContent}>
              Bluetooth 5.0 wireless technology
            </div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Frame material
          </Col>
          <Col xs={8}>
            <div className={s.Home_specContent}>Natural ash wood</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Electrical and Operating Requirements
          </Col>
          <Col xs={8}>
            <div className={s.Home_specContent}>
              Line voltage: AC100V to AC240V
            </div>
            <div className={s.Home_specContent}>
              Frequency: 50Hz to 60Hz. single phase
            </div>
            <div className={s.Home_specContent}>
              Operating temperature: 50° to 95° F (10° to 35° C)
            </div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Policy
          </Col>
          <Col xs={8}>
            <div className={s.Home_specContent}>No trial, no return</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-12', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={2} xs={12} className={s.Home_specTitle}>
            Warranty
          </Col>
          <Col xs={8}>
            <div className={s.Home_specContent}>1 year</div>
          </Col>
        </Row>
        <div
          className={classNames(s.home_rowFrame, 'row justify-content-center')}
        >
          {FRAME_OPTIONS.map((frame: IFrame) => {
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
