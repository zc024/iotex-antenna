"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;

var _crypto = require("../crypto/crypto");

var _hash = require("../crypto/hash");

var _utils = require("./utils");

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

class Account {
  constructor() {
    _defineProperty(this, "address", void 0);

    _defineProperty(this, "privateKey", void 0);

    _defineProperty(this, "publicKey", void 0);

    _defineProperty(this, "signer", void 0);
  }

  static fromPrivateKey(privateKey) {
    const obj = (0, _crypto.privateKeyToAccount)(privateKey);
    const act = new Account();
    act.address = obj.address;
    act.privateKey = obj.privateKey;
    act.publicKey = obj.publicKey;
    return act;
  }

  static fromAddressAndSigner(address, signer) {
    const act = new Account();
    act.address = address;
    act.signer = signer;
    return act;
  }

  sign(data) {
    if (!this.privateKey) {
      throw new Error("account sign only support local model.");
    }

    const h = this.hashMessage(data);
    return Buffer.from(
      (0, _crypto.makeSigner)(0)(h.toString("hex"), this.privateKey),
      "hex"
    );
  }

  recover(message, signature, preFixed) {
    let bytes = message;

    if (!preFixed) {
      bytes = this.hashMessage(message);
    } // @ts-ignore

    return (0, _crypto.recover)(bytes, signature);
  }

  hashMessage(data) {
    let bytes = data;

    if (typeof data === "string" && (0, _utils.isHexStrict)(data)) {
      bytes = (0, _utils.hexToBytes)(data);
    } // @ts-ignore

    const messageBuffer = Buffer.from(bytes);
    const preamble = `\x16IoTeX Signed Message:\n${bytes.length}`;
    const preambleBuffer = Buffer.from(preamble);
    const iotexMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    return (0, _hash.hash256b)(iotexMessage);
  }
}

exports.Account = Account;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY2NvdW50L2FjY291bnQudHMiXSwibmFtZXMiOlsiQWNjb3VudCIsImZyb21Qcml2YXRlS2V5IiwicHJpdmF0ZUtleSIsIm9iaiIsImFjdCIsImFkZHJlc3MiLCJwdWJsaWNLZXkiLCJmcm9tQWRkcmVzc0FuZFNpZ25lciIsInNpZ25lciIsInNpZ24iLCJkYXRhIiwiRXJyb3IiLCJoIiwiaGFzaE1lc3NhZ2UiLCJCdWZmZXIiLCJmcm9tIiwidG9TdHJpbmciLCJyZWNvdmVyIiwibWVzc2FnZSIsInNpZ25hdHVyZSIsInByZUZpeGVkIiwiYnl0ZXMiLCJtZXNzYWdlQnVmZmVyIiwicHJlYW1ibGUiLCJsZW5ndGgiLCJwcmVhbWJsZUJ1ZmZlciIsImlvdGV4TWVzc2FnZSIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7O0FBYU8sTUFBTUEsT0FBTixDQUFrQztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFNdkMsU0FBY0MsY0FBZCxDQUE2QkMsVUFBN0IsRUFBMkQ7QUFDekQsVUFBTUMsR0FBRyxHQUFHLGlDQUFvQkQsVUFBcEIsQ0FBWjtBQUNBLFVBQU1FLEdBQUcsR0FBRyxJQUFJSixPQUFKLEVBQVo7QUFDQUksSUFBQUEsR0FBRyxDQUFDQyxPQUFKLEdBQWNGLEdBQUcsQ0FBQ0UsT0FBbEI7QUFDQUQsSUFBQUEsR0FBRyxDQUFDRixVQUFKLEdBQWlCQyxHQUFHLENBQUNELFVBQXJCO0FBQ0FFLElBQUFBLEdBQUcsQ0FBQ0UsU0FBSixHQUFnQkgsR0FBRyxDQUFDRyxTQUFwQjtBQUNBLFdBQU9GLEdBQVA7QUFDRDs7QUFFRCxTQUFjRyxvQkFBZCxDQUNFRixPQURGLEVBRUVHLE1BRkYsRUFHWTtBQUNWLFVBQU1KLEdBQUcsR0FBRyxJQUFJSixPQUFKLEVBQVo7QUFDQUksSUFBQUEsR0FBRyxDQUFDQyxPQUFKLEdBQWNBLE9BQWQ7QUFDQUQsSUFBQUEsR0FBRyxDQUFDSSxNQUFKLEdBQWFBLE1BQWI7QUFDQSxXQUFPSixHQUFQO0FBQ0Q7O0FBRU1LLEVBQUFBLElBQVAsQ0FBWUMsSUFBWixFQUF3RDtBQUN0RCxRQUFJLENBQUMsS0FBS1IsVUFBVixFQUFzQjtBQUNwQixZQUFNLElBQUlTLEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBTUMsQ0FBQyxHQUFHLEtBQUtDLFdBQUwsQ0FBaUJILElBQWpCLENBQVY7QUFDQSxXQUFPSSxNQUFNLENBQUNDLElBQVAsQ0FDTCx3QkFBVyxDQUFYLEVBQWNILENBQUMsQ0FBQ0ksUUFBRixDQUFXLEtBQVgsQ0FBZCxFQUFpQyxLQUFLZCxVQUF0QyxDQURLLEVBRUwsS0FGSyxDQUFQO0FBSUQ7O0FBRU1lLEVBQUFBLE9BQVAsQ0FDRUMsT0FERixFQUVFQyxTQUZGLEVBR0VDLFFBSEYsRUFJVTtBQUNSLFFBQUlDLEtBQUssR0FBR0gsT0FBWjs7QUFDQSxRQUFJLENBQUNFLFFBQUwsRUFBZTtBQUNiQyxNQUFBQSxLQUFLLEdBQUcsS0FBS1IsV0FBTCxDQUFpQkssT0FBakIsQ0FBUjtBQUNELEtBSk8sQ0FLUjs7O0FBQ0EsV0FBTyxxQkFBUUcsS0FBUixFQUFlRixTQUFmLENBQVA7QUFDRDs7QUFFTU4sRUFBQUEsV0FBUCxDQUFtQkgsSUFBbkIsRUFBK0Q7QUFDN0QsUUFBSVcsS0FBSyxHQUFHWCxJQUFaOztBQUNBLFFBQUksT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0Qix3QkFBWUEsSUFBWixDQUFoQyxFQUFtRDtBQUNqRFcsTUFBQUEsS0FBSyxHQUFHLHVCQUFXWCxJQUFYLENBQVI7QUFDRCxLQUo0RCxDQU03RDs7O0FBQ0EsVUFBTVksYUFBYSxHQUFHUixNQUFNLENBQUNDLElBQVAsQ0FBWU0sS0FBWixDQUF0QjtBQUNBLFVBQU1FLFFBQVEsR0FBSSw4QkFBNkJGLEtBQUssQ0FBQ0csTUFBTyxFQUE1RDtBQUNBLFVBQU1DLGNBQWMsR0FBR1gsTUFBTSxDQUFDQyxJQUFQLENBQVlRLFFBQVosQ0FBdkI7QUFDQSxVQUFNRyxZQUFZLEdBQUdaLE1BQU0sQ0FBQ2EsTUFBUCxDQUFjLENBQUNGLGNBQUQsRUFBaUJILGFBQWpCLENBQWQsQ0FBckI7QUFDQSxXQUFPLG9CQUFTSSxZQUFULENBQVA7QUFDRDs7QUE3RHNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFrZVNpZ25lciwgcHJpdmF0ZUtleVRvQWNjb3VudCwgcmVjb3ZlciB9IGZyb20gXCIuLi9jcnlwdG8vY3J5cHRvXCI7XG5pbXBvcnQgeyBoYXNoMjU2YiB9IGZyb20gXCIuLi9jcnlwdG8vaGFzaFwiO1xuaW1wb3J0IHsgSVNpZ25lciB9IGZyb20gXCIuL3NpZ25lclwiO1xuaW1wb3J0IHsgaGV4VG9CeXRlcywgaXNIZXhTdHJpY3QgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBY2NvdW50IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBwcml2YXRlS2V5OiBzdHJpbmc7XG4gIHB1YmxpY0tleTogc3RyaW5nO1xuICBzaWduZXI/OiBJU2lnbmVyO1xuXG4gIHNpZ24oZGF0YTogc3RyaW5nIHwgQnVmZmVyIHwgVWludDhBcnJheSk6IEJ1ZmZlcjtcbiAgcmVjb3ZlcihtZXNzYWdlOiBzdHJpbmcsIHNpZ25hdHVyZTogQnVmZmVyLCBwcmVGaXhlZDogYm9vbGVhbik6IFN0cmluZztcbiAgaGFzaE1lc3NhZ2UoZGF0YTogc3RyaW5nIHwgQnVmZmVyIHwgVWludDhBcnJheSk6IEJ1ZmZlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFjY291bnQgaW1wbGVtZW50cyBJQWNjb3VudCB7XG4gIHB1YmxpYyBhZGRyZXNzOiBzdHJpbmc7XG4gIHB1YmxpYyBwcml2YXRlS2V5OiBzdHJpbmc7XG4gIHB1YmxpYyBwdWJsaWNLZXk6IHN0cmluZztcbiAgcHVibGljIHNpZ25lcj86IElTaWduZXI7XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tUHJpdmF0ZUtleShwcml2YXRlS2V5OiBzdHJpbmcpOiBJQWNjb3VudCB7XG4gICAgY29uc3Qgb2JqID0gcHJpdmF0ZUtleVRvQWNjb3VudChwcml2YXRlS2V5KTtcbiAgICBjb25zdCBhY3QgPSBuZXcgQWNjb3VudCgpO1xuICAgIGFjdC5hZGRyZXNzID0gb2JqLmFkZHJlc3M7XG4gICAgYWN0LnByaXZhdGVLZXkgPSBvYmoucHJpdmF0ZUtleTtcbiAgICBhY3QucHVibGljS2V5ID0gb2JqLnB1YmxpY0tleTtcbiAgICByZXR1cm4gYWN0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tQWRkcmVzc0FuZFNpZ25lcihcbiAgICBhZGRyZXNzOiBzdHJpbmcsXG4gICAgc2lnbmVyOiBJU2lnbmVyXG4gICk6IElBY2NvdW50IHtcbiAgICBjb25zdCBhY3QgPSBuZXcgQWNjb3VudCgpO1xuICAgIGFjdC5hZGRyZXNzID0gYWRkcmVzcztcbiAgICBhY3Quc2lnbmVyID0gc2lnbmVyO1xuICAgIHJldHVybiBhY3Q7XG4gIH1cblxuICBwdWJsaWMgc2lnbihkYXRhOiBzdHJpbmcgfCBCdWZmZXIgfCBVaW50OEFycmF5KTogQnVmZmVyIHtcbiAgICBpZiAoIXRoaXMucHJpdmF0ZUtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWNjb3VudCBzaWduIG9ubHkgc3VwcG9ydCBsb2NhbCBtb2RlbC5cIik7XG4gICAgfVxuICAgIGNvbnN0IGggPSB0aGlzLmhhc2hNZXNzYWdlKGRhdGEpO1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShcbiAgICAgIG1ha2VTaWduZXIoMCkoaC50b1N0cmluZyhcImhleFwiKSwgdGhpcy5wcml2YXRlS2V5KSxcbiAgICAgIFwiaGV4XCJcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlY292ZXIoXG4gICAgbWVzc2FnZTogc3RyaW5nIHwgQnVmZmVyIHwgVWludDhBcnJheSxcbiAgICBzaWduYXR1cmU6IEJ1ZmZlcixcbiAgICBwcmVGaXhlZDogYm9vbGVhblxuICApOiBTdHJpbmcge1xuICAgIGxldCBieXRlcyA9IG1lc3NhZ2U7XG4gICAgaWYgKCFwcmVGaXhlZCkge1xuICAgICAgYnl0ZXMgPSB0aGlzLmhhc2hNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIHJlY292ZXIoYnl0ZXMsIHNpZ25hdHVyZSk7XG4gIH1cblxuICBwdWJsaWMgaGFzaE1lc3NhZ2UoZGF0YTogc3RyaW5nIHwgQnVmZmVyIHwgVWludDhBcnJheSk6IEJ1ZmZlciB7XG4gICAgbGV0IGJ5dGVzID0gZGF0YTtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgJiYgaXNIZXhTdHJpY3QoZGF0YSkpIHtcbiAgICAgIGJ5dGVzID0gaGV4VG9CeXRlcyhkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgbWVzc2FnZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGJ5dGVzKTtcbiAgICBjb25zdCBwcmVhbWJsZSA9IGBcXHgxNklvVGVYIFNpZ25lZCBNZXNzYWdlOlxcbiR7Ynl0ZXMubGVuZ3RofWA7XG4gICAgY29uc3QgcHJlYW1ibGVCdWZmZXIgPSBCdWZmZXIuZnJvbShwcmVhbWJsZSk7XG4gICAgY29uc3QgaW90ZXhNZXNzYWdlID0gQnVmZmVyLmNvbmNhdChbcHJlYW1ibGVCdWZmZXIsIG1lc3NhZ2VCdWZmZXJdKTtcbiAgICByZXR1cm4gaGFzaDI1NmIoaW90ZXhNZXNzYWdlKTtcbiAgfVxufVxuIl19
