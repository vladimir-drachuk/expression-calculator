function checkBrackets(expr) {
    let checkedStr = "";
    let exprWithout = ""; 
    let checkedBefore = expr;
    let string = "";
    for (let j of expr){
        if (j === "(" || j === ")") {
            exprWithout += j;
        } else {
            continue;
        }
}
    do {
      for (let i = 0; i <= exprWithout.length-1; i++) {
        if (exprWithout[i] == "("  && exprWithout[i+1] == ")") {
          i += 1;
          continue;
        }
        string += exprWithout[i];   
   }
      checkedStr = string;
      string = "";
      if (checkedBefore == checkedStr) break;
      checkedBefore = checkedStr;
      exprWithout = checkedStr;
    } while (checkedStr != "");
      return (!checkedStr);
  } 



  function resultInsideBrackets(expr) {
    let amount;
    for (let i = 0; i <= expr.length; i++){
        if (expr[i] === "*") {
            amount = +expr[i-1] * +expr[i+1];
            expr.splice(i-1 , 3 , amount); 
            i = 0;
        };
        if (expr[i] === "/") {
            if(!+expr[i+1]) {
                throw new Error("TypeError: Division by zero.")
            }
            amount = +expr[i-1] / +expr[i+1]; 
            expr.splice(i-1 , 3 , amount);
            i = 0; 
        }
    }
    for (let i = 0; i <= expr.length; i++){
        if (expr[i] === "+") {
            amount = +expr[i-1] + +expr[i+1];
            expr.splice(i-1 , 3 , amount); 
            i = 0;
        };
        if (expr[i] === "-") {
            amount = +expr[i-1] - +expr[i+1]; 
            expr.splice(i-1 , 3 , amount); 
            i = 0;
        }
    }
    return (expr[0]);    
  }    
  
  

function expressionCalculator(expr) {
   let exprArray = [];
   let element = 0;   
   if (checkBrackets(expr)) {
        for (let i = 0; i <= expr.length; i++){
            element = +expr[i];
            if (+expr[i] || (expr[i] === '0')) {   
                let elementString = "";        
                for (let j = i; j <= expr.length; j++) {
                    if (+expr[j] || (expr[j] === '0')) {
                        elementString += expr[j];
                    } else {
                        exprArray.push(elementString);
                        i = j-1;
                        break;
                    }
                }
            }
            if (isNaN(element) && (expr[i])) exprArray.push(expr[i]);
            if (!expr[i]) continue;
        }
        for ( let i = 0; i <= exprArray.length; i++) {
            if (exprArray[i] === "(") {
                for (let j = i+1; j <= exprArray.length; j++ ) {
                    if (exprArray[j] === "(" || exprArray[j] === ")") {
                        if (exprArray[i] != exprArray[j]) {
                            let numb;
                            numb = resultInsideBrackets(exprArray.slice(i+1, j));
                            exprArray.splice(i, j-i+1, numb);
                            j = 0;
                            i = -1;
                            break;
                        } else {
                            i = j-1;
                            break;
                        }
                    }
                }
            } 
        }
        return resultInsideBrackets(exprArray);
    } else {
        throw new Error("ExpressionError: Brackets must be paired");
    }

}

module.exports = {
   expressionCalculator
}
