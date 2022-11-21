var denom = [
	{ name: 'ONE HUNDRED', val: 100},
	{ name: 'TWENTY', val: 20},
	{ name: 'TEN', val: 10},
	{ name: 'FIVE', val: 5},
	{ name: 'ONE', val: 1},
	{ name: 'QUARTER', val: 0.25},
	{ name: 'DIME', val: 0.1},
	{ name: 'NICKEL', val: 0.05},
	{ name: 'PENNY', val: 0.01}
];

function checkCashRegister(precio, cash, cid) {
  var salida = {status: null, change: []};
  var change = cash - precio;
  var register = cid.reduce(function(acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  }, {total: 0});
  if(register.total === change) {
    salida.status = 'CLOSED';
    salida.change = cid;
    return salida;
  }
  if(register.total < change) {
    salida.status = 'INSUFFICIENT_FUNDS';
    return salida;
 }
  var change_arr = denom.reduce(function(acc, curr) {
    var valor = 0;
    while(register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      valor += curr.val;
      change = Math.round(change * 100) / 100;
    }
    if(valor > 0) {
      acc.push([ curr.name, valor ]);
    }
    return acc;
  }, []);
  if(change_arr.length < 1 || change > 0) {
    salida.status = 'INSUFFICIENT_FUNDS';
    return salida;
    }
  salida.status = 'OPEN';
  salida.change = change_arr;
  return salida;
}
