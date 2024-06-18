import { Input, Select } from 'antd';
import { memo } from 'react';
import { DivLook, BtnLook } from './styles';

function LookInfo(props) {
  return (
    props.type !== 'film-for-series' &&
    props.type !== 'trash-film-for-series' && (
      <DivLook>
        <Input
          placeholder={
            props.type === 'category'
              ? 'Search by category name'
              : props.type === 'movies' || props.type === 'trash-movies'
              ? 'Search by movie name'
              : props.type === 'series' || props.type === 'trash-series'
              ? 'Search by series name'
              : props.type === 'payment'
              ? 'Search by first name or last name'
              : 'Search by name package'
          }
          allowClear
          value={props.textLook}
          onChange={(e) => props.setTextLook(e.target.value)}
        />
        {props.type !== 'category' && props.type !== 'subscription-price' && (
          <Select
            showSearch
            defaultValue={'All'}
            value={
              props.valueCountries ? props.valueCountries : props.valuePackage
            }
            placeholder={
              props.type !== 'payment' && props.type !== 'subscription-price'
                ? 'Select a country'
                : 'Select a package'
            }
            optionFilterProp="children"
            onChange={(value) => {
              if (
                props.type !== 'payment' &&
                props.type !== 'subscription-price'
              ) {
                props.setValueCountries(value);
              } else {
                props.setValuePackage(value);
              }
            }}
            filterOption={props.filterOption}
            options={
              props.dataCountries ? props.dataCountries : props.dataPayment
            }
          />
        )}
        <BtnLook onClick={() => props.onChangeLook()}>Search</BtnLook>
      </DivLook>
    )
  );
}

export default memo(LookInfo);
