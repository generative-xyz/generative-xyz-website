import s from './prices.module.scss';
import { Col, Row } from 'react-bootstrap';
import cn from 'classnames';
import React from 'react';
import { useAppDispatch } from '@redux';
import { setIsOpenCheckoutPopup } from '@redux/general/action';
import { AnimHeading } from 'src/animations/heading';
import { AnimRanText } from 'src/animations/ranText';
import classNames from 'classnames';

export const Prices = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const openCheckoutPopup = () => dispatch(setIsOpenCheckoutPopup(true));
  return (
    <div className={s.tableInfo}>
      <div
        id="tech-spec"
        className={cn(s.tableInfo_specContainer, 'container')}
      >
        <div className="row">
          <div className="col-10 offset-1">
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
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Display options
          </Col>
          <Col md={3}>
            <div className={classNames(s.screen, s.screen__55, 'image__fit')}>
              <img
                src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221220/8-ethf4d1101ffd.jpg"
                alt="ethf4d1101ffd"
              />
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
          <Col md={{ span: 3, offset: 1 }}>
            <div className={classNames(s.screen, s.screen__43, 'image__fit')}>
              <img
                src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221220/4-eth3da62e0647.jpg"
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
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Price
          </Col>
          <Col md={3}>
            <div className={cn(s.Home_specContent, s.price)}>
              <span>8 ETH</span>
            </div>
          </Col>
          <Col md={{ span: 3, offset: 1 }}>
            <div className={cn(s.Home_specContent, s.price)}>
              <span>4 ETH</span>
            </div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Processor
          </Col>
          <Col md={8}>
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
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Graphic card
          </Col>
          <Col md={8}>
            <div className={cn(s.Home_specContent, s.highlight)}>
              RTX 3060 OC Edition 12GB
            </div>
          </Col>
        </Row>

        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Memory
          </Col>
          <Col md={8}>
            <div className={s.Home_specContent}>8GB 2666MHz DDR4</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Storage
          </Col>
          <Col md={8}>
            <div className={s.Home_specContent}>250GB SSD</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Connectivity
          </Col>
          <Col md={8}>
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
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Dimensions
          </Col>
          <Col md={3}>
            <img
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221110/55_inch_dimension4x_1e7badb7761.png"
              alt=""
              className={s.Home_specDimension}
            />
          </Col>
          <Col md={{ span: 3, offset: 1 }}>
            <img
              src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221110/43_inch_dimension4x_12309d86199.png"
              alt=""
              className={s.Home_specDimension}
            />
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Frame material
          </Col>
          <Col md={8}>
            <div className={s.Home_specContent}>Natural ash wood</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Electrical and Operating Requirements
          </Col>
          <Col md={8}>
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
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            In the box
          </Col>
          <Col md={8}>
            <div className={s.Home_specContent}>Grail 43”</div>
            <div className={s.Home_specContent}>
              16 ft cable - Adapted to USA, EU, UK sockets
            </div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Shipping dimensions
          </Col>
          <Col md={8}>
            <div
              className={s.Home_specContent}
            >{`48.6" L x 32.3" W x 5.7" H`}</div>
            <div className={s.Home_specContent}>Weight: 65 lbs</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Policy
          </Col>
          <Col md={8}>
            <div className={s.Home_specContent}>No trial, no return</div>
          </Col>
        </Row>
        <Row className={s.Home_rowSpec}>
          <div className={cn('col-10 offset-1', s.Home_rowSpec_colBor)}>
            <span className={s.Home_rowSpec_border} />
          </div>
          <Col md={{ span: 2, offset: 1 }} className={s.Home_specTitle}>
            Warranty
          </Col>
          <Col md={8}>
            <div className={s.Home_specContent}>1 year</div>
          </Col>
        </Row>
        <div className="row">
          <div className={cn(s.tableInfo_buy, 'col-5 offset-1')}>
            <div
              className={`${s.tableInfo_buy_item}`}
              onClick={openCheckoutPopup}
            >
              <div className={'image__fit'}>
                <img
                  src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221220/8-ethf4d1101ffd.jpg"
                  alt="8-ethf4d1101ffd"
                />
              </div>

              <p className="desc__medium">55” OLED Display</p>
              <AnimRanText
                tag={'p'}
                className={cn(
                  s.tableInfo_buy_item_price,
                  'desc__large text__black mb-0'
                )}
                offset={0.2}
              >
                8 ETH
              </AnimRanText>
            </div>
          </div>
          <div className={cn(s.tableInfo_buy, 'col-5')}>
            <div
              className={`${s.tableInfo_buy_item}`}
              onClick={openCheckoutPopup}
            >
              <div className="image__fit">
                <img
                  src="https://cdn.autonomous.ai/static/upload/images/common/upload/20221220/4-eth3da62e0647.jpg"
                  alt="4-eth3da62e0647"
                />
              </div>
              <p className="desc__medium">43” 4K Display</p>
              <AnimRanText
                tag={'p'}
                className={cn(
                  s.tableInfo_buy_item_price,
                  'desc__large text__black mb-0'
                )}
                offset={0.2}
              >
                4 ETH
              </AnimRanText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
