"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WsSignerPlugin = void 0;

var _window = _interopRequireDefault(require("global/window"));

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

var _account = require("../account/account");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

// tslint:disable-next-line:insecure-random
let reqId = Math.round(Math.random() * 10000);

class WsSignerPlugin {
  constructor(provider) {
    _defineProperty(this, "ws", void 0);

    this.ws = new _isomorphicWs.default(provider);

    this.ws.onopen = () => {
      _window.default.console.log("[antenna-ws] connected");
    };

    this.ws.onclose = () => {
      _window.default.console.log("[antenna-ws] disconnected");
    };
  }

  async signAndSend(envelop) {
    const id = reqId++;
    const req = {
      reqId: id,
      envelop: Buffer.from(envelop.bytestream()).toString("hex")
    };
    this.ws.send(JSON.stringify(req)); // tslint:disable-next-line:promise-must-complete

    return new Promise(resolve => {
      this.ws.onmessage = event => {
        let resp = {
          reqId: -1,
          actionHash: ""
        };

        try {
          if (typeof event.data === "string") {
            resp = JSON.parse(event.data);
          }
        } catch (_) {
          return;
        }

        if (resp.reqId === id) {
          resolve(resp.actionHash);
        }
      };
    });
  }

  async getAccount(address) {
    const acct = new _account.Account();
    acct.address = address;
    return acct;
  }
}

exports.WsSignerPlugin = WsSignerPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4vd3MudHMiXSwibmFtZXMiOlsicmVxSWQiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJXc1NpZ25lclBsdWdpbiIsImNvbnN0cnVjdG9yIiwicHJvdmlkZXIiLCJ3cyIsIldlYlNvY2tldCIsIm9ub3BlbiIsIndpbmRvdyIsImNvbnNvbGUiLCJsb2ciLCJvbmNsb3NlIiwic2lnbkFuZFNlbmQiLCJlbnZlbG9wIiwiaWQiLCJyZXEiLCJCdWZmZXIiLCJmcm9tIiwiYnl0ZXN0cmVhbSIsInRvU3RyaW5nIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9ubWVzc2FnZSIsImV2ZW50IiwicmVzcCIsImFjdGlvbkhhc2giLCJkYXRhIiwicGFyc2UiLCJfIiwiZ2V0QWNjb3VudCIsImFkZHJlc3MiLCJhY2N0IiwiQWNjb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFJQTtBQUNBLElBQUlBLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixLQUEzQixDQUFaOztBQUVPLE1BQU1DLGNBQU4sQ0FBNkM7QUFHbERDLEVBQUFBLFdBQVcsQ0FBQ0MsUUFBRCxFQUFtQjtBQUFBOztBQUM1QixTQUFLQyxFQUFMLEdBQVUsSUFBSUMscUJBQUosQ0FBY0YsUUFBZCxDQUFWOztBQUNBLFNBQUtDLEVBQUwsQ0FBUUUsTUFBUixHQUFpQixNQUFZO0FBQzNCQyxzQkFBT0MsT0FBUCxDQUFlQyxHQUFmLENBQW1CLHdCQUFuQjtBQUNELEtBRkQ7O0FBR0EsU0FBS0wsRUFBTCxDQUFRTSxPQUFSLEdBQWtCLE1BQVk7QUFDNUJILHNCQUFPQyxPQUFQLENBQWVDLEdBQWYsQ0FBbUIsMkJBQW5CO0FBQ0QsS0FGRDtBQUdEOztBQUVELFFBQWFFLFdBQWIsQ0FBeUJDLE9BQXpCLEVBQTREO0FBQzFELFVBQU1DLEVBQUUsR0FBR2hCLEtBQUssRUFBaEI7QUFDQSxVQUFNaUIsR0FBRyxHQUFHO0FBQ1ZqQixNQUFBQSxLQUFLLEVBQUVnQixFQURHO0FBRVZELE1BQUFBLE9BQU8sRUFBRUcsTUFBTSxDQUFDQyxJQUFQLENBQVlKLE9BQU8sQ0FBQ0ssVUFBUixFQUFaLEVBQWtDQyxRQUFsQyxDQUEyQyxLQUEzQztBQUZDLEtBQVo7QUFJQSxTQUFLZCxFQUFMLENBQVFlLElBQVIsQ0FBYUMsSUFBSSxDQUFDQyxTQUFMLENBQWVQLEdBQWYsQ0FBYixFQU4wRCxDQU8xRDs7QUFDQSxXQUFPLElBQUlRLE9BQUosQ0FBb0JDLE9BQU8sSUFBSTtBQUNwQyxXQUFLbkIsRUFBTCxDQUFRb0IsU0FBUixHQUFvQkMsS0FBSyxJQUFJO0FBQzNCLFlBQUlDLElBQUksR0FBRztBQUFFN0IsVUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBVjtBQUFhOEIsVUFBQUEsVUFBVSxFQUFFO0FBQXpCLFNBQVg7O0FBQ0EsWUFBSTtBQUNGLGNBQUksT0FBT0YsS0FBSyxDQUFDRyxJQUFiLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDRixZQUFBQSxJQUFJLEdBQUdOLElBQUksQ0FBQ1MsS0FBTCxDQUFXSixLQUFLLENBQUNHLElBQWpCLENBQVA7QUFDRDtBQUNGLFNBSkQsQ0FJRSxPQUFPRSxDQUFQLEVBQVU7QUFDVjtBQUNEOztBQUNELFlBQUlKLElBQUksQ0FBQzdCLEtBQUwsS0FBZWdCLEVBQW5CLEVBQXVCO0FBQ3JCVSxVQUFBQSxPQUFPLENBQUNHLElBQUksQ0FBQ0MsVUFBTixDQUFQO0FBQ0Q7QUFDRixPQVpEO0FBYUQsS0FkTSxDQUFQO0FBZUQ7O0FBRUQsUUFBYUksVUFBYixDQUF3QkMsT0FBeEIsRUFBMkQ7QUFDekQsVUFBTUMsSUFBSSxHQUFHLElBQUlDLGdCQUFKLEVBQWI7QUFDQUQsSUFBQUEsSUFBSSxDQUFDRCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxXQUFPQyxJQUFQO0FBQ0Q7O0FBMUNpRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1pZ25vcmVcbmltcG9ydCB3aW5kb3cgZnJvbSBcImdsb2JhbC93aW5kb3dcIjtcbmltcG9ydCBXZWJTb2NrZXQgZnJvbSBcImlzb21vcnBoaWMtd3NcIjtcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tIFwiLi4vYWNjb3VudC9hY2NvdW50XCI7XG5pbXBvcnQgeyBFbnZlbG9wIH0gZnJvbSBcIi4uL2FjdGlvbi9lbnZlbG9wXCI7XG5pbXBvcnQgeyBTaWduZXJQbHVnaW4gfSBmcm9tIFwiLi4vYWN0aW9uL21ldGhvZFwiO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6aW5zZWN1cmUtcmFuZG9tXG5sZXQgcmVxSWQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG5cbmV4cG9ydCBjbGFzcyBXc1NpZ25lclBsdWdpbiBpbXBsZW1lbnRzIFNpZ25lclBsdWdpbiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgd3M6IFdlYlNvY2tldDtcblxuICBjb25zdHJ1Y3Rvcihwcm92aWRlcjogc3RyaW5nKSB7XG4gICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQocHJvdmlkZXIpO1xuICAgIHRoaXMud3Mub25vcGVuID0gKCk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nKFwiW2FudGVubmEtd3NdIGNvbm5lY3RlZFwiKTtcbiAgICB9O1xuICAgIHRoaXMud3Mub25jbG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhcIlthbnRlbm5hLXdzXSBkaXNjb25uZWN0ZWRcIik7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaWduQW5kU2VuZChlbnZlbG9wOiBFbnZlbG9wKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBpZCA9IHJlcUlkKys7XG4gICAgY29uc3QgcmVxID0ge1xuICAgICAgcmVxSWQ6IGlkLFxuICAgICAgZW52ZWxvcDogQnVmZmVyLmZyb20oZW52ZWxvcC5ieXRlc3RyZWFtKCkpLnRvU3RyaW5nKFwiaGV4XCIpXG4gICAgfTtcbiAgICB0aGlzLndzLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxKSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByb21pc2UtbXVzdC1jb21wbGV0ZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSBldmVudCA9PiB7XG4gICAgICAgIGxldCByZXNwID0geyByZXFJZDogLTEsIGFjdGlvbkhhc2g6IFwiXCIgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJlc3AgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzcC5yZXFJZCA9PT0gaWQpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3AuYWN0aW9uSGFzaCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0QWNjb3VudChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPEFjY291bnQ+IHtcbiAgICBjb25zdCBhY2N0ID0gbmV3IEFjY291bnQoKTtcbiAgICBhY2N0LmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgIHJldHVybiBhY2N0O1xuICB9XG59XG4iXX0=
