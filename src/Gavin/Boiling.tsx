import React, { Component } from 'react';
import { InputNumber } from 'antd';
import * as _ from 'lodash';
import numeral from 'numeral';
import classnames from 'classnames';

const fragmentTotal = 80;
const activityItemsToSingleFragment = 79;

const GAVIN_ACTIVITY_ITEM = '白起的寫真';
const FRAGEMNT = '碎片';

class Boiling extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 1.25,
      free: 15,
      option: {
        '0420前累消2600鑽送': { [GAVIN_ACTIVITY_ITEM]: 850 },
        '登入送': { [GAVIN_ACTIVITY_ITEM]: 200 },
        '寫真換一碎片': { [GAVIN_ACTIVITY_ITEM]: activityItemsToSingleFragment },
        '總共需要碎片': fragmentTotal,
        '總共需要寫真': activityItemsToSingleFragment * fragmentTotal,
        '掉率': {
          max: 2,
          min: 1
        },
        '重置所需鑽數': 3,
        '拍攝里程碑反鑽數': 1440,
      },
      dataSource: [{
        key: '穿搭提示',
        '售價': 30,
        '鑽石': 85,
        [GAVIN_ACTIVITY_ITEM]: 79,
        '金幣': 3700,
        '紙鶴串': 10,
        '上限': 3,
        '建議': 3,
      }, {
        key: '精緻配飾',
        '售價': 150,
        '鑽石': 280,
        [GAVIN_ACTIVITY_ITEM]: 98,
        '金幣': 4700,
        '紙鶴串': 24,
        '上限': 3,
        '建議': 0,
      }, {
        key: '棚拍秘笈',
        '售價': 390,
        '鑽石': 880,
        [GAVIN_ACTIVITY_ITEM]: 498,
        '金幣': 24000,
        '紙鶴串': 120,
        '上限': 5,
        '建議': 3,
      }]
    };
  }

  componentDidMount() {
    this.setState({ dataSource: this.reccount(true) });
  }

  reccount(isInit = false) {
    const { dataSource, option, count, free } = this.state;
    const countedData = dataSource.map((data: any) => {
      const totalOwnDimand = data['鑽石'] + (data[GAVIN_ACTIVITY_ITEM] / count * option['重置所需鑽數']);
      const totalOwnPhoto = data['鑽石'] / option['重置所需鑽數'] * count + data[GAVIN_ACTIVITY_ITEM];
      data = {
        ...data,
        asumeCount: isInit ? data['建議'] : data.asumeCount,
        '(鑽石+白起的寫真)換算鑽石數': totalOwnDimand,
        '1元幾鑽(只算鑽石+寫真)': totalOwnDimand / data['售價'],
        '可得寫真': totalOwnPhoto,
        '可得碎片': totalOwnPhoto / activityItemsToSingleFragment,
      };
      if (isInit) {
        data['預計購買'] = <InputNumber key={`預計購買_${data.key}`} min={0} max={data['上限']} defaultValue={data['建議']} onChange={value => {
          this.setState({
            dataSource: this.state.dataSource.map((d: any) => {
              if (d.key === data.key) {
                const totalOwnPhoto = d['鑽石'] / option['重置所需鑽數'] * this.state.count + d[GAVIN_ACTIVITY_ITEM];
                d.asumeCount = value;
                d['預計可得寫真'] = d.asumeCount * totalOwnPhoto;
              }
              return d;
            })
          })
        }} />
      }

      data['預計可得寫真'] = data.asumeCount * totalOwnPhoto;
    
      return data;
    });
    return countedData;
  }

  render() {
    const { dataSource, option, count, free } = this.state;
    const totalPhoto = option['總共需要寫真'] - _.sumBy(this.state.dataSource, (d: any) => d['預計可得寫真']) - option['0420前累消2600鑽送'][GAVIN_ACTIVITY_ITEM] - option['登入送'][GAVIN_ACTIVITY_ITEM] - free - option['拍攝里程碑反鑽數'] / option['重置所需鑽數'] * count;
    // console.log(option['總共需要寫真'], _.sumBy(this.state.dataSource, (d: any) => d['預計可得寫真']), option['0420前累消2600鑽送'][GAVIN_ACTIVITY_ITEM], option['登入送'][GAVIN_ACTIVITY_ITEM], free, option['拍攝里程碑反鑽數'] / option['重置所需鑽數'] * count)
    return (
      <div className="container my-3">
        <h2>禮包計算機 <small>戀與製作人</small></h2>
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
                    !_.includes(['key', '建議', 'asumeCount'], key) ? 
                    <tr key={key}>
                      <th className={classnames({
                        'text-right': true,
                        'text-danger': _.includes(['預計購買'], key)
                      })}>{key}</th>
                      {_.map(dataSource, (item: any, index: any) => {
                        const displayKey = _.result(dataSource, `[${index}]['key']`);
                        let displayItem = _.result(dataSource, `[${index}][${key}]`);
                        if (_.isNumber(displayItem)) {
                          displayItem = numeral(displayItem).format('0,0.[000]');
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
                    <th className="text-right">課金總額</th>
                    <td className="text-right">NT$&nbsp;{numeral(_.sumBy(this.state.dataSource, (d: any) => d.asumeCount * d['售價'])||0).format('0,0.[000]')}</td>
                  </tr>
                  <tr>
                    <th className="text-right">仍需寫真數</th>
                    <td className="text-right">{numeral(totalPhoto).format('0,0.[000]')}</td>
                  </tr>
                  <tr className="bg-danger text-white">
                    <th className="text-right">除了活動禮包、反鑽等鑽石，額外需要的存鑽量</th>
                    <td className="text-right">{numeral(totalPhoto / count * option['重置所需鑽數']).format('0,0.[000]')}</td>
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
                    <th className="text-right">免費拍攝次數</th>
                    <td className="text-right"><InputNumber key="免費拍攝次數" min={15} max={15 * option['掉率']['max']} defaultValue={free} onChange={value => {
                      this.setState({ free: value }, () => {
                        this.setState({ dataSource: this.reccount() });
                      });
                    }}/></td>
                  </tr>
                  <tr>
                    <th className="text-right">預計掉落個數</th>
                    <td className="text-right"><InputNumber key="預計掉落個數" step={0.01} min={option['掉率']['min']} max={option['掉率']['max']} defaultValue={count} onChange={value => {
                      this.setState({ count: value }, () => {
                        this.setState({ dataSource: this.reccount() });
                      });
                    }}/></td>
                  </tr>
                  {_.map(option, (opt: any, key: string) => {
                    const value = _.isObject(opt) ? _.map(opt, (val, k) => numeral(val).format('0,0')).join('') : numeral(opt).format('0,0');

                    return !_.includes(['掉率', 'asumeCount'], key) ?
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
      </div>
    );
  }
}

export default Boiling;