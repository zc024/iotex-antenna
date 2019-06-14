"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contract = void 0;

var _method = require("../action/method");

var _abiToByte = require("./abi-to-byte");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class Contract {
  // The json interface for the contract to instantiate
  // This address is necessary for executions and call requests
  // The options of the contract.
  setProvider(provider) {
    this.provider = provider;
  }

  constructor(jsonInterface, address, options) { // tslint:disable-next-line: no-any
    _defineProperty(this, "abi", void 0);

    _defineProperty(this, "address", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "provider", void 0);

    _defineProperty(this, "methods", void 0);

    this.provider = options && options.provider;

    if (jsonInterface) {
      this.abi = (0, _abiToByte.getAbiFunctions)(jsonInterface);
    }

    this.address = address;
    this.options = options; // mount methods

    this.methods = {}; // tslint:disable-next-line: no-for-in

    for (const func in this.abi) {
      if (!this.abi.hasOwnProperty(func)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      this.methods[func] = async (
        // @ts-ignore
        ...args
      ) => {
        if (!this.address || !this.abi) {
          throw new Error("must set contract address and abi");
        }

        if (args.length < 1) {
          throw new Error("must set method execute parameter");
        }

        if (!this.provider) {
          throw new Error("no rpc method provider specified");
        }

        const executeParameter = args[args.length - 1];
        const abiFunc = this.abi[func];
        const userInput = {};

        if (!abiFunc.inputs || !Array.isArray(abiFunc.inputs)) {
          return userInput;
        } // tslint:disable-next-line: no-any

        abiFunc.inputs.map((val, i) => {
          // @ts-ignore
          userInput[val.name] = args[i];
        });
        const methodEnvelop = this.encodeMethod(
          executeParameter.amount || "0",
          func,
          userInput,
          executeParameter.gasLimit,
          executeParameter.gasPrice
        );
        const method = new _method.ExecutionMethod(
          this.provider,
          executeParameter.account,
          methodEnvelop
        );
        return method.execute();
      };
    }
  } // tslint:disable-next-line: no-any

  getABI() {
    return this.abi;
  }

  getAddress() {
    return this.address;
  }

  async deploy(
    account, // tslint:disable-next-line: no-any
    inputs,
    gasLimit,
    gasPrice
  ) {
    if (!this.options) {
      throw new Error("must set contract byte code");
    }

    if (!this.provider) {
      throw new Error("no rpc method provider specified");
    }

    let data = this.options.data || Buffer.from([]);

    if (this.abi && this.abi.hasOwnProperty(_abiToByte.Constructor)) {
      const abiFunc = this.abi[_abiToByte.Constructor];
      const userInput = {}; // @ts-ignore

      if (!abiFunc.inputs || !Array.isArray(abiFunc.inputs)) {
        throw new Error("construtor input error");
      } // @ts-ignore
      // tslint:disable-next-line: no-any

      abiFunc.inputs.map((val, i) => {
        // @ts-ignore
        userInput[val.name] = inputs[i];
      });
      data = Buffer.concat([
        data, // @ts-ignore
        Buffer.from(
          (0, _abiToByte.encodeArguments)(
            (0, _abiToByte.getArgTypes)(abiFunc),
            userInput
          ),
          "hex"
        )
      ]);
    }

    const contractEnvelop = {
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      contract: "",
      amount: "0",
      data: data
    };
    return new _method.ExecutionMethod(
      this.provider,
      account,
      contractEnvelop
    ).execute();
  }

  pureEncodeMethod(
    amount,
    method, // @ts-ignore
    ...args
  ) {
    if (!this.address || !this.abi) {
      throw new Error("must set contract address and abi");
    }

    if (!this.abi[method]) {
      throw new Error(`method ${method} dose not in abi`);
    }

    const abiFunc = this.abi[method];
    const userInput = {}; // tslint:disable-next-line: no-any

    abiFunc.inputs.map((val, i) => {
      // @ts-ignore
      userInput[val.name] = args[i];
    });
    return this.encodeMethod(amount, method, userInput);
  }

  encodeMethod(
    amount,
    method, // tslint:disable-next-line:no-any
    input,
    gasLimit,
    gasPrice
  ) {
    if (!this.address || !this.abi) {
      throw new Error("must set contract address and abi");
    }

    if (!this.abi[method]) {
      throw new Error(`method ${method} dose not in abi`);
    }

    return {
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      contract: this.address,
      amount: amount,
      data: Buffer.from(
        (0, _abiToByte.encodeInputData)(this.abi, method, input),
        "hex"
      )
    };
  }
}

exports.Contract = Contract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jb250cmFjdC50cyJdLCJuYW1lcyI6WyJDb250cmFjdCIsInNldFByb3ZpZGVyIiwicHJvdmlkZXIiLCJjb25zdHJ1Y3RvciIsImpzb25JbnRlcmZhY2UiLCJhZGRyZXNzIiwib3B0aW9ucyIsImFiaSIsIm1ldGhvZHMiLCJmdW5jIiwiaGFzT3duUHJvcGVydHkiLCJhcmdzIiwiRXJyb3IiLCJsZW5ndGgiLCJleGVjdXRlUGFyYW1ldGVyIiwiYWJpRnVuYyIsInVzZXJJbnB1dCIsImlucHV0cyIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsInZhbCIsImkiLCJuYW1lIiwibWV0aG9kRW52ZWxvcCIsImVuY29kZU1ldGhvZCIsImFtb3VudCIsImdhc0xpbWl0IiwiZ2FzUHJpY2UiLCJtZXRob2QiLCJFeGVjdXRpb25NZXRob2QiLCJhY2NvdW50IiwiZXhlY3V0ZSIsImdldEFCSSIsImdldEFkZHJlc3MiLCJkZXBsb3kiLCJkYXRhIiwiQnVmZmVyIiwiZnJvbSIsIkNvbnN0cnVjdG9yIiwiY29uY2F0IiwiY29udHJhY3RFbnZlbG9wIiwiY29udHJhY3QiLCJwdXJlRW5jb2RlTWV0aG9kIiwiaW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFHQTs7OztBQWVPLE1BQU1BLFFBQU4sQ0FBZTtBQUNwQjtBQUdBO0FBR0E7QUFPT0MsRUFBQUEsV0FBUCxDQUFtQkMsUUFBbkIsRUFBK0M7QUFDN0MsU0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7QUFFREMsRUFBQUEsV0FBVyxFQUNUO0FBQ0FDLEVBQUFBLGFBRlMsRUFHVEMsT0FIUyxFQUlUQyxPQUpTLEVBS1Q7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDQSxTQUFLSixRQUFMLEdBQWdCSSxPQUFPLElBQUlBLE9BQU8sQ0FBQ0osUUFBbkM7O0FBQ0EsUUFBSUUsYUFBSixFQUFtQjtBQUNqQixXQUFLRyxHQUFMLEdBQVcsZ0NBQWdCSCxhQUFoQixD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QVEsRUFBRUEsUUFGTDtBQUdMYyxNQUFBQSxRQUFRLEVBQUUsS0FBS3JDLE9BSFY7QUFJTHFCLE1BQUFBLE1BQU0sRUFBRUEsTUFKSDtBQUtMVSxNQUFBQSxJQUFJLEVBQUVDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGdDQUFnQixLQUFLL0IsR0FBckIsRUFBMEJzQixNQUExQixFQUFrQ2UsS0FBbEMsQ0FBWixFQUFzRCxLQUF0RDtBQUxELEtBQVA7QUFPRDs7QUE1TG1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUFjY291bnQgfSBmcm9tIFwiLi4vYWNjb3VudC9hY2NvdW50XCI7XG5pbXBvcnQgeyBFeGVjdXRpb25NZXRob2QgfSBmcm9tIFwiLi4vYWN0aW9uL21ldGhvZFwiO1xuaW1wb3J0IHsgRXhlY3V0aW9uIH0gZnJvbSBcIi4uL2FjdGlvbi90eXBlc1wiO1xuaW1wb3J0IHsgSVJwY01ldGhvZCB9IGZyb20gXCIuLi9ycGMtbWV0aG9kL3R5cGVzXCI7XG5pbXBvcnQge1xuICBBYmlCeUZ1bmMsXG4gIENvbnN0cnVjdG9yLFxuICBlbmNvZGVBcmd1bWVudHMsXG4gIGVuY29kZUlucHV0RGF0YSxcbiAgZ2V0QWJpRnVuY3Rpb25zLFxuICBnZXRBcmdUeXBlc1xufSBmcm9tIFwiLi9hYmktdG8tYnl0ZVwiO1xuXG5leHBvcnQgdHlwZSBPcHRpb25zID0ge1xuICAvLyBUaGUgYnl0ZSBjb2RlIG9mIHRoZSBjb250cmFjdC4gVXNlZCB3aGVuIHRoZSBjb250cmFjdCBnZXRzIGRlcGxveWVkXG4gIGRhdGE/OiBCdWZmZXI7XG4gIHByb3ZpZGVyPzogSVJwY01ldGhvZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDb250cmFjdCB7XG4gIC8vIFRoZSBqc29uIGludGVyZmFjZSBmb3IgdGhlIGNvbnRyYWN0IHRvIGluc3RhbnRpYXRlXG4gIHByaXZhdGUgcmVhZG9ubHkgYWJpPzogQWJpQnlGdW5jO1xuXG4gIC8vIFRoaXMgYWRkcmVzcyBpcyBuZWNlc3NhcnkgZm9yIGV4ZWN1dGlvbnMgYW5kIGNhbGwgcmVxdWVzdHNcbiAgcHJpdmF0ZSByZWFkb25seSBhZGRyZXNzPzogc3RyaW5nO1xuXG4gIC8vIFRoZSBvcHRpb25zIG9mIHRoZSBjb250cmFjdC5cbiAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zPzogT3B0aW9ucztcblxuICBwdWJsaWMgcHJvdmlkZXI/OiBJUnBjTWV0aG9kO1xuXG4gIHB1YmxpYyByZWFkb25seSBtZXRob2RzOiB7IFtmdW5jTmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfTtcblxuICBwdWJsaWMgc2V0UHJvdmlkZXIocHJvdmlkZXI6IElScGNNZXRob2QpOiB2b2lkIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueVxuICAgIGpzb25JbnRlcmZhY2U/OiBBcnJheTxhbnk+LFxuICAgIGFkZHJlc3M/OiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IE9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5wcm92aWRlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcm92aWRlcjtcbiAgICBpZiAoanNvbkludGVyZmFjZSkge1xuICAgICAgdGhpcy5hYmkgPSBnZXRBYmlGdW5jdGlvbnMoanNvbkludGVyZmFjZSk7XG4gICAgfVxuICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8vIG1vdW50IG1ldGhvZHNcbiAgICB0aGlzLm1ldGhvZHMgPSB7fTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWZvci1pblxuICAgIGZvciAoY29uc3QgZnVuYyBpbiB0aGlzLmFiaSkge1xuICAgICAgaWYgKCF0aGlzLmFiaS5oYXNPd25Qcm9wZXJ0eShmdW5jKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWV0aG9kc1tmdW5jXSA9IGFzeW5jIChcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAuLi5hcmdzXG4gICAgICApID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmFkZHJlc3MgfHwgIXRoaXMuYWJpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibXVzdCBzZXQgY29udHJhY3QgYWRkcmVzcyBhbmQgYWJpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdXN0IHNldCBtZXRob2QgZXhlY3V0ZSBwYXJhbWV0ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByb3ZpZGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gcnBjIG1ldGhvZCBwcm92aWRlciBzcGVjaWZpZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXhlY3V0ZVBhcmFtZXRlciA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3QgYWJpRnVuYyA9IHRoaXMuYWJpW2Z1bmNdO1xuICAgICAgICBjb25zdCB1c2VySW5wdXQgPSB7fTtcbiAgICAgICAgaWYgKCFhYmlGdW5jLmlucHV0cyB8fCAhQXJyYXkuaXNBcnJheShhYmlGdW5jLmlucHV0cykpIHtcbiAgICAgICAgICByZXR1cm4gdXNlcklucHV0O1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55XG4gICAgICAgIGFiaUZ1bmMuaW5wdXRzLm1hcCgodmFsOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB1c2VySW5wdXRbdmFsLm5hbWVdID0gYXJnc1tpXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kRW52ZWxvcCA9IHRoaXMuZW5jb2RlTWV0aG9kKFxuICAgICAgICAgIGV4ZWN1dGVQYXJhbWV0ZXIuYW1vdW50IHx8IFwiMFwiLFxuICAgICAgICAgIGZ1bmMsXG4gICAgICAgICAgdXNlcklucHV0LFxuICAgICAgICAgIGV4ZWN1dGVQYXJhbWV0ZXIuZ2FzTGltaXQsXG4gICAgICAgICAgZXhlY3V0ZVBhcmFtZXRlci5nYXNQcmljZVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBtZXRob2QgPSBuZXcgRXhlY3V0aW9uTWV0aG9kKFxuICAgICAgICAgIHRoaXMucHJvdmlkZXIsXG4gICAgICAgICAgZXhlY3V0ZVBhcmFtZXRlci5hY2NvdW50LFxuICAgICAgICAgIG1ldGhvZEVudmVsb3BcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbWV0aG9kLmV4ZWN1dGUoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnlcbiAgcHVibGljIGdldEFCSSgpOiBBYmlCeUZ1bmMgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmFiaTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBZGRyZXNzKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYWRkcmVzcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXBsb3koXG4gICAgYWNjb3VudDogSUFjY291bnQsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnlcbiAgICBpbnB1dHM6IEFycmF5PGFueT4sXG4gICAgZ2FzTGltaXQ/OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgZ2FzUHJpY2U/OiBzdHJpbmdcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibXVzdCBzZXQgY29udHJhY3QgYnl0ZSBjb2RlXCIpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucHJvdmlkZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIHJwYyBtZXRob2QgcHJvdmlkZXIgc3BlY2lmaWVkXCIpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gdGhpcy5vcHRpb25zLmRhdGEgfHwgQnVmZmVyLmZyb20oW10pO1xuICAgIGlmICh0aGlzLmFiaSAmJiB0aGlzLmFiaS5oYXNPd25Qcm9wZXJ0eShDb25zdHJ1Y3RvcikpIHtcbiAgICAgIGNvbnN0IGFiaUZ1bmMgPSB0aGlzLmFiaVtDb25zdHJ1Y3Rvcl07XG4gICAgICBjb25zdCB1c2VySW5wdXQgPSB7fTtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmICghYWJpRnVuYy5pbnB1dHMgfHwgIUFycmF5LmlzQXJyYXkoYWJpRnVuYy5pbnB1dHMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbnN0cnV0b3IgaW5wdXQgZXJyb3JcIik7XG4gICAgICB9XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueVxuICAgICAgYWJpRnVuYy5pbnB1dHMubWFwKCh2YWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdXNlcklucHV0W3ZhbC5uYW1lXSA9IGlucHV0c1tpXTtcbiAgICAgIH0pO1xuICAgICAgZGF0YSA9IEJ1ZmZlci5jb25jYXQoW1xuICAgICAgICBkYXRhLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIEJ1ZmZlci5mcm9tKGVuY29kZUFyZ3VtZW50cyhnZXRBcmdUeXBlcyhhYmlGdW5jKSwgdXNlcklucHV0KSwgXCJoZXhcIilcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRyYWN0RW52ZWxvcCA9IHtcbiAgICAgIGdhc0xpbWl0OiBnYXNMaW1pdCxcbiAgICAgIGdhc1ByaWNlOiBnYXNQcmljZSxcbiAgICAgIGNvbnRyYWN0OiBcIlwiLFxuICAgICAgYW1vdW50OiBcIjBcIixcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIHJldHVybiBuZXcgRXhlY3V0aW9uTWV0aG9kKFxuICAgICAgdGhpcy5wcm92aWRlcixcbiAgICAgIGFjY291bnQsXG4gICAgICBjb250cmFjdEVudmVsb3BcbiAgICApLmV4ZWN1dGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBwdXJlRW5jb2RlTWV0aG9kKFxuICAgIGFtb3VudDogc3RyaW5nLFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHR5cGVkZWZcbiAgICAuLi5hcmdzXG4gICk6IEV4ZWN1dGlvbiB7XG4gICAgaWYgKCF0aGlzLmFkZHJlc3MgfHwgIXRoaXMuYWJpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdXN0IHNldCBjb250cmFjdCBhZGRyZXNzIGFuZCBhYmlcIik7XG4gICAgfVxuICAgIGlmICghdGhpcy5hYmlbbWV0aG9kXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBtZXRob2QgJHttZXRob2R9IGRvc2Ugbm90IGluIGFiaWApO1xuICAgIH1cbiAgICBjb25zdCBhYmlGdW5jID0gdGhpcy5hYmlbbWV0aG9kXTtcblxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHt9O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW55XG4gICAgYWJpRnVuYy5pbnB1dHMubWFwKCh2YWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB1c2VySW5wdXRbdmFsLm5hbWVdID0gYXJnc1tpXTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmVuY29kZU1ldGhvZChhbW91bnQsIG1ldGhvZCwgdXNlcklucHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBlbmNvZGVNZXRob2QoXG4gICAgYW1vdW50OiBzdHJpbmcsXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIGlucHV0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgIGdhc0xpbWl0Pzogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGdhc1ByaWNlPzogc3RyaW5nXG4gICk6IEV4ZWN1dGlvbiB7XG4gICAgaWYgKCF0aGlzLmFkZHJlc3MgfHwgIXRoaXMuYWJpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdXN0IHNldCBjb250cmFjdCBhZGRyZXNzIGFuZCBhYmlcIik7XG4gICAgfVxuICAgIGlmICghdGhpcy5hYmlbbWV0aG9kXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBtZXRob2QgJHttZXRob2R9IGRvc2Ugbm90IGluIGFiaWApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBnYXNMaW1pdDogZ2FzTGltaXQsXG4gICAgICBnYXNQcmljZTogZ2FzUHJpY2UsXG4gICAgICBjb250cmFjdDogdGhpcy5hZGRyZXNzLFxuICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICBkYXRhOiBCdWZmZXIuZnJvbShlbmNvZGVJbnB1dERhdGEodGhpcy5hYmksIG1ldGhvZCwgaW5wdXQpLCBcImhleFwiKVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRob2RFeGVjdXRlUGFyYW1ldGVyIHtcbiAgYWNjb3VudDogSUFjY291bnQ7XG4gIGFtb3VudD86IHN0cmluZztcbiAgZ2FzTGltaXQ/OiBzdHJpbmc7XG4gIGdhc1ByaWNlPzogc3RyaW5nO1xufVxuIl19
