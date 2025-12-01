let currentExpression = "";
    const display = document.getElementById("display");

    function appendNumber(num) {
      if (display.value === "0" || display.value === "Error") {
        display.value = num;
      } else {
        display.value += num;
      }
      currentExpression += num;
    }

    function appendOperator(op) {
      if (display.value !== "Error") {
        display.value += op;
        currentExpression += op;
      }
    }

    function appendSymbol(symbol) {
      if (display.value === "Error") return;
      display.value += symbol;
      currentExpression += symbol;
    }

    function clearAll() {
      display.value = "0";
      currentExpression = "";
    }

    function toggleSign() {
      if (display.value === "0" || display.value === "Error") return;
      if (display.value.startsWith("-")) {
        display.value = display.value.substring(1);
      } else {
        display.value = "-" + display.value;
      }
      currentExpression = display.value;
    }

    function calculate() {
      try {
        let expr = display.value.replace(/×/g, "*").replace(/÷/g, "/");

        // Handle percentage
        if (expr.includes("%")) {
          expr = expr.replace(/(\d+)%/g, "($1*0.01)");
        }

        let result = eval(expr);

        if (Number.isInteger(result)) {
          display.value = result;
        } else {
          display.value = parseFloat(result.toFixed(8));
        }

        currentExpression = display.value;
      } catch (error) {
        display.value = "Error";
        currentExpression = "";
      }
    }