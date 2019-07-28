import React, { Component } from 'react';
import * as _ from 'lodash';
import numeral from 'numeral';
import { InputNumber, Select } from 'antd';
import classnames from 'classnames';
import {
  activityItems,
  gift,
  perRNeedItemsCount,
  perSSRNeedItemsCount,
  afterStage1Count,
  afterStage2Count,
  afterStage1Probability,
  afterStage2Probability,
  freePerDay,
  duration,
  itemCost,
  changeLog,
  qAndA
} from '../db/19qixi';
import * as CONST from './../constant/19qixi';
import { NUMERAL_FORMAT } from './../constant/config';

class Qixi extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: activityItems,
      result: [],
      stage1: afterStage1Count,
      stage2: afterStage2Count,
      free: freePerDay,
      du: duration,
    };
  }

  componentDidMount() {
    this.reccount(true);
  }

  getItems(d: any) {
    // console.log(d);
    return (d[CONST.DIMAND] / itemCost + d[CONST.ACTIVITY_ITEM]) * d.asumeCount;
  }

  getPrice(d: any) {
    return d[CONST.PRICE] * d.asumeCount;
  }

  reccount(isInit = false) {
    const { dataSource, } = this.state;
    const countedDataSource = dataSource.map((data: any, index: number) => {
      data = {
        ...data,
        asumeCount: isInit ? data[CONST.ADVICE] : data.asumeCount,
        ['同心鎖+鑽石(1元可換鑽)']: (data[CONST.ACTIVITY_ITEM] * itemCost + data[CONST.DIMAND]) / data[CONST.PRICE],
      };
      if (isInit) {
        data = {
          ...data,
          ['預期購買數量']: <select defaultValue={data.asumeCount} value={this.state.dataSource[index].asumeCount} onChange={e =>
            this.setState({
              dataSource: this.state.dataSource.map((d: any) => {
                if (d.key === data.key) {
                  d.asumeCount = +e.target.value;
                  d['可獲總同心鎖數'] = this.getItems(d);
                  d['預期花費'] = this.getPrice(d);
                }
                return d;
              })
            }, () => {
              this.reccount();
            })
          }>
            {_.range(data[CONST.LIMIT] > 0 ? data[CONST.LIMIT] + 1 : 100)
              .map(item =>
                <option key={`${data.key}_${item}`} value={item}>{item}</option>
            )}
          </select>
        }
      }
      data = {
        ...data,
        ['可獲總同心鎖數']: this.getItems(data),
        ['預期花費']: this.getPrice(data),
      }
      return data;
    });
    const countedResult = () => {
      let result:any = [];
      for (let i = 0; i < 5; i++) {
        for (let j = 4 - i; j >= 0; j--) {
          const 期間減一 = this.state.du - 1 >= 0 ? this.state.du - 1 : 0;
          const 所需總同心鎖 = perRNeedItemsCount * j + perSSRNeedItemsCount * i + ((4 - i - j) * this.state.free * 期間減一);
          const 機率掉落同心鎖後仍需同心鎖數 = function(g) {
            if (所需總同心鎖 > g.state.stage2) {
              return _.ceil((所需總同心鎖 - g.state.stage2) / afterStage2Probability) +
              _.ceil((g.state.stage2 - g.state.stage1) / afterStage1Probability) +
                g.state.stage1;
            } else if (所需總同心鎖 > g.state.stage1) {
              return _.ceil((所需總同心鎖 - g.state.stage1) / afterStage1Probability) + g.state.stage1;
            }

            return 所需總同心鎖;
          }(this);
          const 扣除贈送額度後仍需同心鎖數 = function (g) {
            const 期間減一 = g.state.du - 1 >= 0 ? g.state.du - 1 : 0;
            const 目標每日額度 = (g.state.free * g.state.du) * (i + j);
            const 其他非目標的每日額度 = (g.state.free * 期間減一) * (4 - i - j);
            return 機率掉落同心鎖後仍需同心鎖數 - gift - 目標每日額度 - 其他非目標的每日額度;
          }(this);
          const 扣除禮盒後仍需同心鎖數 = function (g) {
            return 扣除贈送額度後仍需同心鎖數 - _.sumBy(g.state.dataSource, '可獲總同心鎖數');
          }(this);
          result = [...result, {
            ['目標ssr']: i,
            ['其他r']: j,
            ['所需總同心鎖']: 所需總同心鎖,
            ['機率掉落同心鎖後，仍需同心鎖數']: 機率掉落同心鎖後仍需同心鎖數,
            ['扣除贈送額度後仍需同心鎖數']: 扣除贈送額度後仍需同心鎖數,
            ['所需鑽數']: 扣除贈送額度後仍需同心鎖數 * itemCost,
            ['扣除禮盒後仍需同心鎖數']: 扣除禮盒後仍需同心鎖數,
            ['扣除禮盒後仍需鑽數']: 扣除禮盒後仍需同心鎖數 * itemCost,
          }];
        }
      }
      return result;
    }
    this.setState({
      dataSource: countedDataSource,
    }, () => {
        this.setState({
          result: countedResult(),
        });
    });
  }

  render() {
    const { dataSource, result } = this.state;
    
    return (
      <div className="container my-3">
        <h1 className="mb-3 h3">【{CONST.PAGE_TITLE}】禮包計算機 <small>戀與製作人</small></h1>
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
                      })}>{key}</th>
                      {_.map(dataSource, (item: any, index: any) => {
                        const displayKey = _.result(dataSource, `[${index}]['key']`);
                        let displayItem: any = _.result(dataSource, `[${index}][${key}]`);
                        if (_.isNumber(displayItem)) {
                          displayItem = numeral(displayItem).format(NUMERAL_FORMAT);
                        }
                        return <td className="text-right" key={`${key}_${displayKey}`} >{displayItem}</td>;
                      })}
                    </tr> : null
                  )}
                </tbody>
              </table>
              <table className="table table-striped">
                <tbody>
                  <tr className="bg-secondary text-white">
                    <th className="text-right">總同心鎖數</th>
                    <td className="text-right">{numeral(_.sumBy(dataSource, '可獲總同心鎖數')).format(NUMERAL_FORMAT)}</td>
                  </tr>
                  <tr className="bg-danger text-white">
                    <th className="text-right">總花費</th>
                    <td className="text-right">$ {numeral(_.sumBy(dataSource, '預期花費')).format(NUMERAL_FORMAT)}</td>
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
                    <th className="text-right">官方贈送同心鎖</th>
                    <td className="text-right">{gift}</td>
                  </tr>
                  <tr>
                    <th className="text-right">一張R卡需要同心鎖數</th>
                    <td className="text-right">{perRNeedItemsCount}</td>
                  </tr>
                  <tr>
                    <th className="text-right">一張SSR卡需要同心鎖數(附帶一張R卡)</th>
                    <td className="text-right">{perSSRNeedItemsCount}</td>
                  </tr>
                  <tr>
                    <th className="text-right">在第N次拍攝後開始有5%同心鎖掉落機率</th>
                    <td className="text-right"><InputNumber min={0} defaultValue={afterStage1Count} onChange={value => {
                      this.setState({ stage1: value }, () => {
                        this.reccount();
                      });
                    }}/></td>
                  </tr>
                  <tr>
                    <th className="text-right">在第N次拍攝後開始有10%同心鎖掉落機率</th>
                    <td className="text-right"><InputNumber min={0} defaultValue={afterStage2Count} onChange={value => {
                      this.setState({ stage2: value }, () => {
                        this.reccount();
                      });
                    }}/></td>
                  </tr>
                  <tr>
                    <th className="text-right">每日免費拍攝次數</th>
                    <td className="text-right"><InputNumber min={0} defaultValue={freePerDay} onChange={value => {
                      this.setState({ free: value }, () => {
                        this.reccount();
                      });
                    }}/></td>
                  </tr>
                  <tr>
                    <th className="text-right">活動天數</th>
                    <td className="text-right"><InputNumber min={0} defaultValue={duration} onChange={value => {
                      this.setState({ du: value }, () => {
                        this.reccount();
                      });
                    }}/></td>
                  </tr>
                  <tr>
                    <th className="text-right">一張同心鎖需要鑽石數</th>
                    <td className="text-right">{itemCost}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-hover-info">
                <thead>
                  <tr>
                    {_.map(result[0], (value: any, key: any) =>
                      <th className="text-right small" key={key}>{key}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {_.map(result, (item: any) =>
                    item['目標ssr'] > 0 || item['其他r'] > 0 ?
                    <tr key={`${item['目標ssr']}_${item['其他r']}`}>
                      {_.map(item, (value: any, key: string) =>
                        <td key={`${item['目標ssr']}_${item['其他r']}_${_.indexOf(_.keys(item), key)}`}
                          className={classnames({
                            'text-right': true,
                            'text-danger': key === '扣除禮盒後仍需鑽數'
                          })}>
                          {numeral(value).format(NUMERAL_FORMAT)}
                        </td>
                      )}
                    </tr> : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr />
        <h2 className="mb-3 h4">Q & A</h2>
        <div className="d-table w-100 text-black-50">
          {qAndA.map((qa: any, index: number) => [
            <div key={`qa_${index}_title`} className="d-table-row text-info">
              <div className="d-table-cell pr-1 text-nowrap">{index + 1}.</div>
              <div className="d-table-cell"><b>{qa.title}</b></div>
            </div>,
            <div key={`qa_${index}_description`} className="d-table-row">
              <div className="d-table-cell pr-1 text-nowrap"></div>
              <div className="d-table-cell">{qa.description}</div>
            </div>
          ])}
        </div>
        <hr />
        <p className="text-black-50 mb-2">CHANGELOG</p>
        {_.map(changeLog, (log: any, key: string) => [
          <p key={key} className="text-black-50 small mb-1"><b>{key}</b></p>,
          <div key={`${key}_content`} className="d-table w-100 text-black-50 small pb-2">
            {log.map((item: string, index: Number) =>
              <div key={`${key}_${index}`} className="d-table-row">
                <div className="d-table-cell pr-1 width--xs text-nowrap">※</div>
                <div className="d-table-cell">{item}</div>
              </div>
            )}
          </div>
        ])}
      </div>
    );
  }
}

export default Qixi;