import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import { CDN_URL } from '@constants/config';
import Link from 'next/link';
import { Stack } from 'react-bootstrap';
import { v4 } from 'uuid';
import s from './styles.module.scss';

type TStats = {
  data:
    | {
        id: string;
        info: string;
        value: string;
        link: string;
      }[]
    | null;
};

const Stats = ({ data }: TStats) => {
  if (!data) return null;
  return (
    <>
      {data.length > 0 &&
        data.map(item => (
          <div className={s.statsInfo} key={`token-${v4()}`}>
            <Text
              size="18"
              fontWeight="semibold"
              className="text-secondary-color"
            >
              {item.info}
            </Text>
            <Stack direction="horizontal" gap={2}>
              {!!item?.link && (
                <Link href={item.link} target="_blank">
                  <SvgInset svgUrl={`${CDN_URL}/icons/ic-link.svg`} />
                </Link>
              )}
              <Text size="18" fontWeight="semibold">
                {item.value}
              </Text>
            </Stack>
          </div>
        ))}
    </>
  );
};

export default Stats;
