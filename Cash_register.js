function checkCashRegister(price, cash, cid) {
    let change = [];
    let returnObj = {};
    let left;
    let curr;
    let j = 0;
    let val;
    let extra = 0;
    let value;
    let total = 0;
    let num;
    left = cash - price;


    if (left > 100) curr = "ONE HUNDRED"
    else if (left > 20) curr = "TWENTY"
    else if (left > 10) curr = "TEN"
    else if (left > 5) curr = "FIVE"
    else if (left > 1) curr = "ONE"
    else if (left > 0.25) curr = "QUARTER"
    else if (left > 0.1) curr = "DIME"
    else if (left > 0.05) curr = "NICKEL"
    else if (left > 0.01) curr = "PENNY"


    for (let i = 0; i < cid.length; i++) {
        total += cid[i][1];
    }

    if (left == total) {
        returnObj.status = "CLOSED";
        returnObj.change = cid;
        return returnObj;
    }

    for (let i = 0; i < cid.length; i++) {

        if (cid[i][0] === curr) {
            extra = left;
            if (cid[i][1] != 0) {
                val = cid[i][1];
                cid[i][1] -= extra;
                cid[i][1] = cid[i][1].toFixed(2);
                returnObj.status = "OPEN";
                if (cid[i][1] < 0) {
                    extra = -cid[i][1];
                    cid[i][1] = 0;
                    change.push([cid[i][0], val]);
                }
                else {
                    if (i >= 4)
                        change.push([cid[i][0], Math.floor(left)]);
                    else
                        change.push([cid[i][0], left]);
                    extra = 0;
                }
            }
            j = i;
            while (extra != 0) {
                {
                    if (j > 0) {
                        if (cid[--j][1] != 0) {
                            if ((j == 0 && extra >= 0.01) ||
                                (j == 1 && extra >= 0.05) ||
                                (j == 2 && extra >= 0.1) ||
                                (j == 3 && extra >= 0.25) ||
                                (j == 4 && extra >= 1) ||
                                (j == 5 && extra >= 5) ||
                                (j == 6 && extra >= 10) ||
                                (j == 7 && extra >= 20) ||
                                (j == 8 && extra >= 100)) {
                                value = extra;
                                val = cid[j][1];
                                cid[j][1] -= extra;
                                cid[j][1] = cid[j][1].toFixed(2);
                                if (cid[j][1] < 0) {
                                    extra = -cid[j][1];
                                    cid[j][1] = 0;
                                    change.push([cid[j][0], val]);
                                }
                                else {
                                    switch (j) {
                                        case 0:
                                            num = 0.01
                                            break;
                                        case 1:
                                            num = 0.05
                                            break;
                                        case 2:
                                            num = 0.1
                                            break;
                                        case 3:
                                            num = 0.25
                                            break;
                                        case 4:
                                            num = 1
                                            break;
                                        case 5:
                                            num = 5
                                            break;
                                        case 6:
                                            num = 10
                                            break;
                                        case 7:
                                            num = 20
                                            break;
                                        case 8:
                                            num = 100
                                    }

                                    total = extra / num
                                    extra = Math.floor(total) * num;
                                    if (num >= 1) {
                                        change.push([cid[j][0], Math.floor(extra)]);
                                        extra = value - Math.floor(extra);
                                    }
                                    else {
                                        change.push([cid[j][0], extra]);
                                        extra = value - extra;

                                    }
                                    extra = extra.toFixed(2);
                                }
                            }
                        }
                    }
                    else {
                        returnObj.status = "INSUFFICIENT_FUNDS";
                        change = [];
                        extra = 0;
                    }
                }
            }
        }
    }
    returnObj.change = change;

    return returnObj;
}

let a = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

console.log(a)