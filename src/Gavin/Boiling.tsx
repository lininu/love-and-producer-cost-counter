import React, { Component } from 'react';
import { InputNumber } from 'antd';
import * as _ from 'lodash';
import numeral from 'numeral';
import classnames from 'classnames';
import {
  activityItems,
  expectAverage,
  free as freeDefault,
  preGrantTotalItems,
  preGiftItems,
  averageMax,
  averageMin,
  perDimandCost,
  milestoneGiftDimand,
  fragmentTotal,
  activityItemsToSingleFragment,
} from '../db/boiling';
import * as CONST from './../constant/boiling';
import { NUMERAL_FORMAT } from './../constant/config';

class Boiling extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: expectAverage,
      free: freeDefault,
      option: {
        [CONST.GRAND_TOTAL_GIFT_ACTIVITY_ITEMS]: { [CONST.ACTIVITY_ITEM]: preGrantTotalItems },
        [CONST.LOGIN_GIFT_ACTIVITY_ITEMS]: { [CONST.ACTIVITY_ITEM]: preGiftItems },
        [CONST.ACTIVITY_ITEM_TO_FRAGEMNT]: { [CONST.ACTIVITY_ITEM]: activityItemsToSingleFragment },
        [CONST.TOTAL_FRAGEMNT]: fragmentTotal,
        [CONST.TOTAL_ACTIVITY_ITEMS]: activityItemsToSingleFragment * fragmentTotal,
        [CONST.AVERAGE]: {
          max: averageMax,
          min: averageMin
        },
        [CONST.RESET_DIMAND_COST]: perDimandCost,
        [CONST.MILESTONE_DIMAND_GIFT]: milestoneGiftDimand,
      },
      dataSource: activityItems
    };
  }

  componentDidMount() {
    this.setState({ dataSource: this.reccount(true) });
  }

  reccount(isInit = false) {
    const { dataSource, option, count, free } = this.state;
    const countedData = dataSource.map((data: any) => {
      const totalOwnDimand = data[CONST.DIMAND] + (data[CONST.ACTIVITY_ITEM] / count * option[CONST.RESET_DIMAND_COST]);
      const totalOwnPhoto = data[CONST.DIMAND] / option[CONST.RESET_DIMAND_COST] * count + data[CONST.ACTIVITY_ITEM];
      data = {
        ...data,
        asumeCount: isInit ? data[CONST.ADVICE] : data.asumeCount,
        [CONST.CONVERT_DIMAND]: totalOwnDimand,
        [CONST.PROICE_PERCENTAGE]: totalOwnDimand / data[CONST.PRICE],
        [CONST.OWN_ACTIVITY_ITEMS]: totalOwnPhoto,
        [CONST.OWN_ACTIVITY_ITEMS_TO_FRAGEMNT]: totalOwnPhoto / activityItemsToSingleFragment,
      };
      if (isInit) {
        data[CONST.EXPECT_PURCHASE] = <InputNumber key={`${CONST.EXPECT_PURCHASE}_${data.key}`} min={0} max={data[CONST.LIMIT]} defaultValue={data[CONST.ADVICE]} onChange={value => {
          this.setState({
            dataSource: this.state.dataSource.map((d: any) => {
              if (d.key === data.key) {
                const totalOwnPhoto = d[CONST.DIMAND] / option[CONST.RESET_DIMAND_COST] * this.state.count + d[CONST.ACTIVITY_ITEM];
                d.asumeCount = value;
                d[CONST.EXPECT_OWN_TOTAL_ACTIVITY_ITEMS] = d.asumeCount * totalOwnPhoto;
              }
              return d;
            })
          })
        }} />
      }

      data[CONST.EXPECT_OWN_TOTAL_ACTIVITY_ITEMS] = data.asumeCount * totalOwnPhoto;
    
      return data;
    });
    return countedData;
  }

  render() {
    const { dataSource, option, count, free } = this.state;
    const totalPhoto = option[CONST.TOTAL_ACTIVITY_ITEMS] - _.sumBy(this.state.dataSource, (d: any) => d[CONST.EXPECT_OWN_TOTAL_ACTIVITY_ITEMS]) - option[CONST.GRAND_TOTAL_GIFT_ACTIVITY_ITEMS][CONST.ACTIVITY_ITEM] - option[CONST.LOGIN_GIFT_ACTIVITY_ITEMS][CONST.ACTIVITY_ITEM] - free - option[CONST.MILESTONE_DIMAND_GIFT] / option[CONST.RESET_DIMAND_COST] * count;
    // console.log(option[CONST.TOTAL_ACTIVITY_ITEMS], _.sumBy(this.state.dataSource, (d: any) => d[CONST.EXPECT_OWN_TOTAL_ACTIVITY_ITEMS]), option[CONST.GRAND_TOTAL_GIFT_ACTIVITY_ITEMS][CONST.ACTIVITY_ITEM], option[CONST.LOGIN_GIFT_ACTIVITY_ITEMS][CONST.ACTIVITY_ITEM], free, option[CONST.MILESTONE_DIMAND_GIFT] / option[CONST.RESET_DIMAND_COST] * count)
    return (
      <div className="container my-3">
        <h3 className="mb-3">【{CONST.PAGE_TITLE}】禮包計算機 <small>戀與製作人</small></h3>
        <div className="row">
          <div className="col-12 col-lg-7">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{minWidth: 90}}></th>
                    {_.map(dataSource, (item: any, index: any) =>
                      <th className="text-center" key={index}>{item.key}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {_.map(dataSource[0], (row: any, key: string) =>
                    !_.includes(['key', CONST.ADVICE, 'asumeCount'], key) ? 
                    <tr key={key}>
                      <th className={classnames({
                        'text-right': true,
                        'text-danger': _.includes([CONST.EXPECT_PURCHASE], key)
                      })}>{key}</th>
                      {_.map(dataSource, (item: any, index: any) => {
                        const displayKey = _.result(dataSource, `[${index}]['key']`);
                        let displayItem = _.result(dataSource, `[${index}][${key}]`);
                        if (_.isNumber(displayItem)) {
                          displayItem = numeral(displayItem).format(NUMERAL_FORMAT);
                        }
                        return <td className="text-right" key={`${key}_${displayKey}`} >{displayItem}</td>;
                      })}
                    </tr> : null
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr className="bg-secondary text-white">
                    <th className="text-right">{CONST.TOTAL_PRICE}</th>
                    <td className="text-right">NT$&nbsp;{numeral(_.sumBy(this.state.dataSource, (d: any) => d.asumeCount * d[CONST.PRICE])||0).format(NUMERAL_FORMAT)}</td>
                  </tr>
                  <tr>
                    <th className="text-right">{CONST.NEEDED_ACTIVITY_ITEMS}</th>
                    <td className="text-right">{numeral(totalPhoto).format(NUMERAL_FORMAT)}</td>
                  </tr>
                  <tr className="bg-danger text-white">
                    <th className="text-right">{CONST.NEEDED_DIMAND}</th>
                    <td className="text-right">{numeral(totalPhoto / count * option[CONST.RESET_DIMAND_COST]).format(NUMERAL_FORMAT)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th className="text-right">{CONST.FREE_ACTIVITY_COUNT}</th>
                    <td className="text-right"><InputNumber key={CONST.FREE_ACTIVITY_COUNT} min={freeDefault} max={free * option[CONST.AVERAGE]['max']} defaultValue={freeDefault} onChange={value => {
                      this.setState({ free: value }, () => {
                        this.setState({ dataSource: this.reccount() });
                      });
                    }}/></td>
                  </tr>
                  <tr>
                    <th className="text-right">{CONST.AVERAGE_ACTIVITY_ITEMS}</th>
                    <td className="text-right"><InputNumber key={CONST.AVERAGE_ACTIVITY_ITEMS} step={0.01} min={option[CONST.AVERAGE]['min']} max={option[CONST.AVERAGE]['max']} defaultValue={count} onChange={value => {
                      this.setState({ count: value }, () => {
                        this.setState({ dataSource: this.reccount() });
                      });
                    }}/></td>
                  </tr>
                  {_.map(option, (opt: any, key: string) => {
                    const value = _.isObject(opt) ? _.map(opt, (val, k) => numeral(val).format('0,0')).join('') : numeral(opt).format('0,0');

                    return !_.includes([CONST.AVERAGE, 'asumeCount'], key) ?
                      <tr key={key}>
                        <th className="text-right">{key}</th>
                        <td className="text-right">{value}</td>
                      </tr> : null
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
        <p className="text-black-50 mb-2">CHANGELOG</p>
        <p className="text-black-50 small mb-1">[19.04.17] 名稱異動</p>
        <div className="d-table w-100 text-black-50 small">
          <div className="d-table-row">
            <div className="d-table-cell pr-1 width--xs text-nowrap">※</div>
            <div className="d-table-cell">預計掉落個數 → 平均掉落個數</div>
          </div>
          <div className="d-table-row">
            <div className="d-table-cell pr-1 width--xs text-nowrap">※</div>
            <div className="d-table-cell">(鑽石+白起的寫真)換算鑽石數 → (鑽石+寫真)換算鑽數</div>
          </div>
          <div className="d-table-row">
            <div className="d-table-cell pr-1 width--xs text-nowrap">※</div>
            <div className="d-table-cell">1元幾鑽(只算鑽石+寫真) → (鑽石+寫真)1元幾鑽</div>
          </div>
          <div className="d-table-row">
            <div className="d-table-cell pr-1 width--xs text-nowrap">※</div>
            <div className="d-table-cell">可得碎片 → 寫真可換碎片數</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Boiling;