import React, { useMemo } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { CDN_URL } from '@constants/config';
import Select, { SingleValue } from 'react-select';

const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  {
    value: 'newest',
    label: 'Date minted: Newest',
  },
  {
    value: 'recent-listed',
    label: 'Recently listed',
  },
  {
    value: 'price-asc',
    label: 'Price: Low to High',
  },
  {
    value: 'price-desc',
    label: 'Price: High to Low',
  },
  {
    value: 'rarity-asc',
    label: 'Rarity: Low to High',
  },
  {
    value: 'rarity-desc',
    label: 'Rarity: High to Low',
  },
];

interface IProps {
  keyword: string;
  sort: string;
  onKeyWordChange: (k: string) => void;
  onSortChange: (v: string) => void;
}

const TokenTopFilter: React.FC<IProps> = ({
  keyword,
  sort,
  onKeyWordChange,
  onSortChange,
}: IProps): React.ReactElement => {
  const selectedOption = useMemo(() => {
    return SORT_OPTIONS.find(op => sort === op.value) ?? SORT_OPTIONS[0];
  }, [sort]);

  return (
    <div className={s.tokenTopFilter}>
      <div className={s.inputWrapper}>
        <div className={s.inputPrefixWrapper}>
          <Image
            src={`${CDN_URL}/icons/ic-search-14x14.svg`}
            width={20}
            height={20}
            alt="ic-triangle-exclamation"
          />
        </div>
        <input
          value={keyword}
          onChange={e => onKeyWordChange(e.target.value)}
          className={s.input}
          placeholder="owner, item, address..."
          type="text"
        />
      </div>
      <div className={s.dropDownWrapper}>
        <Select
          isSearchable={false}
          isClearable={false}
          defaultValue={selectedOption}
          options={SORT_OPTIONS}
          className={s.selectInput}
          classNamePrefix="select"
          onChange={(val: SingleValue<any>) => {
            onSortChange(val.value);
          }}
        />
      </div>
    </div>
  );
};

export default TokenTopFilter;
