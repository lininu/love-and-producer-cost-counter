import React from 'react';
import * as CONST from './../constant/19summer';

export const freePerDay = 5;
export const duration = 14;
export const itemCost = 3;
export const gift = 264;
export const perRNeedItemsCount = 288;
export const perSSRNeedItemsCount = 3688;
// 最後一天的免費先不列入計算
export const selfStageFree = freePerDay * (duration - 1 >= 0 ? duration - 1 : 0);
// 達成5%機率為1SSR+其他3人的每日免費次數(不含最後一天)
export const afterStage1Count = perSSRNeedItemsCount + selfStageFree * 3;
// 達成10%機率為2SSR+其他2人的每日免費次數(不含最後一天)
export const afterStage2Count = perSSRNeedItemsCount * 2 + selfStageFree * 2;
export const afterStage1Probability = 1.05;
export const afterStage2Probability = 1.1;

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
  '[19.06.10]': [
    '修改「在第N次拍攝後開始有5%船票掉落機率」預設值「3688」→「3883」',
    '修改「在第N次拍攝後開始有10%船票掉落機率」預設值「7376」→「7506」',
    '調整計算結果的hover顏色',
    '修改「機率掉落船票後，仍需船票數」每個計算區間(5%、10%船票掉落率)都無條件進位'
  ],
  '[19.06.09]': [
    '上線',
    '調整Q & A第四條錯誤描述'
  ]
};

export const qAndA = [
  {
    title: `為何「扣除禮盒後仍需鑽數」的結果會有負值？`,
    description: `僅為計算結果，負數表示會多出許多鑽石+船票 (在本計算機已將此全數轉為鑽石做計算)。本計算機以單次活動「課金取得卡片」為主要目標，因此較建議選擇結果為大於等於0的購買數量，或者不要先把禮盒拿到的鑽石換成船票，避免船票過剩。`
  },
  {
    title: `計算機結果跟其他太太計算的不一樣？`,
    description: <span>本計算機用結果回推，並且按「該次數區間的占比」乘與「該次數區間加成」才扣除贈送額度。誤差值在每日的免費拍攝次數，為方便計算並沒有先扣掉而是算完後扣，以2SSR來說會比最接近解多18顆鑽。(請參考此篇 <a href="https://www.facebook.com/groups/302104066944567/permalink/375891872899119/">Ting-Chieh Yen</a> 之計算結果 )</span>
  },
  {
    title: `如何執行可以最接近計算結果？`,
    description: `最後一天再拿4張SSR，並且先拿到第一張SSR合成後，再跑第二張SSR的流程，一樣先合成第二張SSR。因為在第一張SSR合成時，應該可以同時達成5%船票掉落機率的條件，同理第二張SSR合成時，可以達成10%船票掉落率，因此除了每日都要刷免費拍攝次數外，最後一天建議不要先把4人免費的拍攝次數刷完，而是逐人刷&合成完成任務。`
  },
  {
    title: `為何最下方表列沒有1SSR+4R的結果？`,
    description: `每張SSR隱含有取得相同角色之R卡，因此「目標1SSR」+「其他3R」即表示「目標1SSR(含目標1R)及其他3R」。`
  },
  {
    title: `為何「在第N次拍攝後開始有5%船票掉落機率」預設值為「3883」？`,
    description: `這邊預期拿到第一張SSR的時候可以同時達成事件累計99次，並包含全部四人的免費次數：3688(1SSR所需次數) + ( 3(其他三人) * 13(活動天數-1) * 5(每日免費) )，按Q&A第三條所述，應該會在第3883次拍攝時得到5%船票掉落率。`
  },
]