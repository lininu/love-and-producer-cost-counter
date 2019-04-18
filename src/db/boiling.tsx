import * as CONST from './../constant/boiling';

export const fragmentTotal = 80;
export const activityItemsToSingleFragment = 79;
export const expectAverage = 1.25;
export const free = 15;
export const preGrantTotalItems = 850;
export const preGiftItems = 200;
export const averageMax = 2;
export const averageMin = 1;
export const perDimandCost = 3;
export const milestoneGiftDimand = 1440;

export const activityItems = [
  {
    key: CONST.BOX_PRICE_PERFORMANCE,
    [CONST.PRICE]: 30,
    [CONST.DIMAND]: 85,
    [CONST.ACTIVITY_ITEM]: 79,
    [CONST.COIN]: 3700,
    [CONST.EXPERIENCE]: 10,
    [CONST.LIMIT]: 3,
    [CONST.ADVICE]: 3,
  }, {
    key: CONST.BOX_NORMAL,
    [CONST.PRICE]: 120,
    [CONST.DIMAND]: 280,
    [CONST.ACTIVITY_ITEM]: 98,
    [CONST.COIN]: 4700,
    [CONST.EXPERIENCE]: 24,
    [CONST.LIMIT]: 3,
    [CONST.ADVICE]: 0,
  }, {
    key: CONST.BOX_COMPETITIVE,
    [CONST.PRICE]: 390,
    [CONST.DIMAND]: 880,
    [CONST.ACTIVITY_ITEM]: 498,
    [CONST.COIN]: 24000,
    [CONST.EXPERIENCE]: 120,
    [CONST.LIMIT]: 5,
    [CONST.ADVICE]: 3,
  }
];

export const changeLog = {
  '[19.04.18]': [
    '精緻配飾售價改為120',
    '新增Q & A',
  ],
  '[19.04.17]': [
    '預計掉落個數 → 平均掉落個數',
    '(鑽石+白起的寫真)換算鑽石數 → (鑽石+寫真)換算鑽數',
    '1元幾鑽(只算鑽石+寫真) → (鑽石+寫真)1元幾鑽',
    '可得碎片 → 寫真可換碎片數',
  ],
};

export const qAndA = [
  {
    title: `為何「${CONST.NEEDED_DIMAND}」的結果會有負值？`,
    description: `表示本次活動你的${CONST.DIMAND_SHORT}（遊戲畫面右上角的${CONST.DIMAND}）總量最後沒有減少，反而增加。（大約多了負數結果的量）`
  },
  {
    title: `我購買了${CONST.BOX_PRICE_PERFORMANCE}*3 + ${CONST.BOX_COMPETITIVE}*5，按照${expectAverage}算，不是只要2000鑽附近嗎？可是我全部都花完了還沒拿到。`,
    description: `本計算機包含「${CONST.MILESTONE_DIMAND_GIFT}」，請確認是否都已經拿到回饋的${CONST.DIMAND}。如果只剩最後一個沒拿到，表示你原本的鑽量應該低於2800。遊戲不可能先讓你的${CONST.DIMAND_SHORT}量扣到-800再加回來到0，因此請你繼續努力先賺${CONST.DIMAND}吧！`
  }
]