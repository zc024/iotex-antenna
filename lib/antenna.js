"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iotx = require("./iotx");

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

class Antenna {
  constructor(provider) {
    _defineProperty(this, "iotx", void 0);

    this.iotx = new _iotx.Iotx(provider);
  }

  setProvider(provider) {
    if (typeof provider === "object") {
      if (provider === this.iotx.currentProvider()) {
        return;
      }
    }

    this.iotx.setProvider(provider);
  }

  currentProvider() {
    return this.iotx.currentProvider();
  }
}

exports.default = Antenna;

_defineProperty(Antenna, "modules", void 0);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbnRlbm5hLnRzIl0sIm5hbWVzIjpbIkFudGVubmEiLCJjb25zdHJ1Y3RvciIsInByb3ZpZGVyIiwiaW90eCIsIklvdHgiLCJzZXRQcm92aWRlciIsImN1cnJlbnRQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBR2UsTUFBTUEsT0FBTixDQUFjO0FBRzNCQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBbUI7QUFBQTs7QUFDNUIsU0FBS0MsSUFBTCxHQUFZLElBQUlDLFVBQUosQ0FBU0YsUUFBVCxDQUFaO0FBQ0Q7O0FBTU1HLEVBQUFBLFdBQVAsQ0FBbUJILFFBQW5CLEVBQXdEO0FBQ3RELFFBQUksT0FBT0EsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUNoQyxVQUFJQSxRQUFRLEtBQUssS0FBS0MsSUFBTCxDQUFVRyxlQUFWLEVBQWpCLEVBQThDO0FBQzVDO0FBQ0Q7QUFDRjs7QUFDRCxTQUFLSCxJQUFMLENBQVVFLFdBQVYsQ0FBc0JILFFBQXRCO0FBQ0Q7O0FBRU1JLEVBQUFBLGVBQVAsR0FBcUM7QUFDbkMsV0FBTyxLQUFLSCxJQUFMLENBQVVHLGVBQVYsRUFBUDtBQUNEOztBQXRCMEI7Ozs7Z0JBQVJOLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJb3R4IH0gZnJvbSBcIi4vaW90eFwiO1xuaW1wb3J0IHsgSVJwY01ldGhvZCB9IGZyb20gXCIuL3JwYy1tZXRob2QvdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW50ZW5uYSB7XG4gIHB1YmxpYyBpb3R4OiBJb3R4O1xuXG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlvdHggPSBuZXcgSW90eChwcm92aWRlcik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG1vZHVsZXM6IHtcbiAgICBJb3R4OiBuZXcgKGhvc3RuYW1lOiBzdHJpbmcpID0+IElvdHg7XG4gIH07XG5cbiAgcHVibGljIHNldFByb3ZpZGVyKHByb3ZpZGVyOiBzdHJpbmcgfCBJUnBjTWV0aG9kKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBwcm92aWRlciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKHByb3ZpZGVyID09PSB0aGlzLmlvdHguY3VycmVudFByb3ZpZGVyKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlvdHguc2V0UHJvdmlkZXIocHJvdmlkZXIpO1xuICB9XG5cbiAgcHVibGljIGN1cnJlbnRQcm92aWRlcigpOiBJUnBjTWV0aG9kIHtcbiAgICByZXR1cm4gdGhpcy5pb3R4LmN1cnJlbnRQcm92aWRlcigpO1xuICB9XG59XG4iXX0=
