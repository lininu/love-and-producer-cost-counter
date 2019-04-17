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
    [CONST.PRICE]: 150,
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