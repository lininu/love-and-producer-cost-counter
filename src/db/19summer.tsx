import React from 'react';
import * as CONST from './../constant/19summer';

export const gift = 264;
export const perRNeedItemsCount = 288;
export const perSSRNeedItemsCount = 3688;
export const afterStage1Count = 3688;
export const afterStage2Count = afterStage1Count * 2;
export const afterStage1Probability = 1.05;
export const afterStage2Probability = 1.1;
export const freePerDay = 5;
export const duration = 14;
export const itemCost = 3;

export const activityItems = [
  {
    key: CONST.BOX_PRICE_PERFORMANCE,
    [CONST.PRICE]: 33,
    [CONST.DIMAND]: 66,
    [CONST.ACTIVITY_ITEM]: 56,
    [CONST.COIN]: 2000,
    [CONST.LIMIT]: 3,
    [CONST.ADVICE]: 3,
  }, {
    key: CONST.BOX_NORMAL,
    [CONST.PRICE]: 130,
    [CONST.DIMAND]: 300,
    [CONST.ACTIVITY_ITEM]: 80,
    [CONST.COIN]: null,
    [CONST.LIMIT]: null,
    [CONST.ADVICE]: 0,
  }, {
    key: CONST.BOX_COMPETITIVE,
    [CONST.PRICE]: 390,
    [CONST.DIMAND]: 880,
    [CONST.ACTIVITY_ITEM]: 400,
    [CONST.COIN]: null,
    [CONST.LIMIT]: null,
    [CONST.ADVICE]: 0,
  }
];


export const changeLog = {
  '[19.06.09]': [
    '上線',
  ]
};

export const qAndA = [
  {
    title: `為何「扣除禮盒後仍需鑽數」的結果會有負值？`,
    description: `僅為計算結果，負數表示會多出許多鑽石+船票 (在本計算機已將此全數轉為鑽石做計算)。本計算機以單次活動「課金取得卡片」為主要目標，因此較建議選擇結果為大於等於0的購買數量，或者不要先把禮盒拿到的鑽石換成船票，避免船票過剩。`
  },
  {
    title: `計算機結果跟其他太太計算的不一樣？`,
    description: <span>本計算機用結果回推，並且按「該次數區間的占比」乘與「該次數區間加成」才扣除贈送額度。誤差值在每日的免費拍攝次數，為方便計算並沒有先扣掉而是算完後扣，以4SSR來說會比最接近解少64顆鑽。(請參考此篇 <a href="https://www.facebook.com/groups/302104066944567/permalink/375891872899119/">Ting-Chieh Yen</a> 之計算結果 )</span>
  },
  {
    title: `如何執行可以最接近計算結果？`,
    description: `最後一天再拿4張SSR，並且先拿到第一張SSR合成後，再跑第二張SSR的流程，一樣先合成第二張SSR。因為在第一張SSR合成時，應該可以同時達成5%船票掉落機率的條件，同理第二張SSR合成時，可以達成10%船票掉落率，因此除了每日都要刷免費拍攝次數外，最後一天建議不要先把4人免費的拍攝次數刷完，而是逐人刷&合成完成任務。`
  },
  {
    title: `為何最下方表列沒有1SSR+4R的結果？`,
    description: `每張SSR隱含有取得相同角色之R卡，因此「目標1SSR」+「其他3R」及表示「目標4SSR(含目標1R及其他3R)」`
  },
]