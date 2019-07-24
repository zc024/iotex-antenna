"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAbiFunctions = getAbiFunctions;
exports.getArgTypes = getArgTypes;
exports.getHeaderHash = getHeaderHash;
exports.encodeArguments = encodeArguments;
exports.encodeInputData = encodeInputData;
exports.Constructor = void 0;

var _ethereumjsAbi = _interopRequireDefault(require("ethereumjs-abi"));

var address = _interopRequireWildcard(require("../crypto/address"));

var _hash = require("../crypto/hash");

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* tslint:disable:no-any */
function getAbiFunctions(abi) {
  const abiFunctions = {};
  abi.forEach(f => {
    if (f.type === "function") {
      abiFunctions[f.name] = f;
    }

    if (f.type === "constructor") {
      abiFunctions[Constructor] = f;
    }
  });
  return abiFunctions;
}

function getArgTypes(fnAbi) {
  const args = [];
  fnAbi.inputs.forEach(field => {
    args.push({
      name: field.name,
      type: field.type
    });
  });
  return args;
}

function getHeaderHash(fnAbi, args) {
  const inputs = args.map(i => {
    return i.type;
  });
  const signature = `${fnAbi.name}(${inputs.join(",")})`;
  const keccak256 = (0, _hash.hash256b)(signature).toString("hex");
  return keccak256.slice(0, 8);
}

function encodeArguments(args, userInput) {
  const types = [];
  const values = [];
  (args || []).forEach(arg => {
    if (arg.type === "bool") {
      types.push("uint256");
    } else {
      types.push(arg.type);
    }

    if (userInput.hasOwnProperty(arg.name)) {
      let value = userInput[arg.name];

      if (arg.type === "address") {
        value = address.fromString(value).stringEth();
      }

      if (arg.type === "address[]") {
        for (let i = 0; i < value.length; i++) {
          value[i] = address.fromString(value[i]).stringEth();
        }
      }

      values.push(value);
    } else {
      values.push("");
    }
  });

  try {
    const encoded = _ethereumjsAbi.default.rawEncode(types, values);

    return encoded.toString("hex");
  } catch (e) {
    throw new Error(`failed to rawEncode: ${e.stack}`);
  }
}

const Constructor = "constructor";
exports.Constructor = Constructor;

function encodeInputData(abiByFunc, fnName, userInput) {
  const fnAbi = abiByFunc[fnName];
  const args = getArgTypes(fnAbi);
  const header = getHeaderHash(fnAbi, args);
  const encodedArgs = encodeArguments(args, userInput);
  return `${header}${encodedArgs}`;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9hYmktdG8tYnl0ZS50cyJdLCJuYW1lcyI6WyJnZXRBYmlGdW5jdGlvbnMiLCJhYmkiLCJhYmlGdW5jdGlvbnMiLCJmb3JFYWNoIiwiZiIsInR5cGUiLCJuYW1lIiwiQ29uc3RydWN0b3IiLCJnZXRBcmdUeXBlcyIsImZuQWJpIiwiYXJncyIsImlucHV0cyIsImZpZWxkIiwicHVzaCIsImdldEhlYWRlckhhc2giLCJtYXAiLCJpIiwic2lnbmF0dXJlIiwiam9pbiIsImtlY2NhazI1NiIsInRvU3RyaW5nIiwic2xpY2UiLCJlbmNvZGVBcmd1bWVudHMiLCJ1c2VySW5wdXQiLCJ0eXBlcyIsInZhbHVlcyIsImFyZyIsImhhc093blByb3BlcnR5IiwidmFsdWUiLCJhZGRyZXNzIiwiZnJvbVN0cmluZyIsInN0cmluZ0V0aCIsImxlbmd0aCIsImVuY29kZWQiLCJldGhlcmV1bWpzIiwicmF3RW5jb2RlIiwiZSIsIkVycm9yIiwic3RhY2siLCJlbmNvZGVJbnB1dERhdGEiLCJhYmlCeUZ1bmMiLCJmbk5hbWUiLCJoZWFkZXIiLCJlbmNvZGVkQXJncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUhBO0FBVU8sU0FBU0EsZUFBVCxDQUF5QkMsR0FBekIsRUFBcUQ7QUFDMUQsUUFBTUMsWUFBWSxHQUFJLEVBQXRCO0FBQ0FELEVBQUFBLEdBQUcsQ0FBQ0UsT0FBSixDQUFZQyxDQUFDLElBQUk7QUFDZixRQUFJQSxDQUFDLENBQUNDLElBQUYsS0FBVyxVQUFmLEVBQTJCO0FBQ3pCSCxNQUFBQSxZQUFZLENBQUNFLENBQUMsQ0FBQ0UsSUFBSCxDQUFaLEdBQXVCRixDQUF2QjtBQUNEOztBQUNELFFBQUlBLENBQUMsQ0FBQ0MsSUFBRixLQUFXLGFBQWYsRUFBOEI7QUFDNUJILE1BQUFBLFlBQVksQ0FBQ0ssV0FBRCxDQUFaLEdBQTRCSCxDQUE1QjtBQUNEO0FBQ0YsR0FQRDtBQVNBLFNBQU9GLFlBQVA7QUFDRDs7QUFFTSxTQUFTTSxXQUFULENBQXFCQyxLQUFyQixFQUUrQjtBQUNwQyxRQUFNQyxJQUFJLEdBQUcsRUFBYjtBQUNBRCxFQUFBQSxLQUFLLENBQUNFLE1BQU4sQ0FBYVIsT0FBYixDQUFxQlMsS0FBSyxJQUFJO0FBQzVCRixJQUFBQSxJQUFJLENBQUNHLElBQUwsQ0FBVTtBQUFFUCxNQUFBQSxJQUFJLEVBQUVNLEtBQUssQ0FBQ04sSUFBZDtBQUFvQkQsTUFBQUEsSUFBSSxFQUFFTyxLQUFLLENBQUNQO0FBQWhDLEtBQVY7QUFDRCxHQUZEO0FBR0EsU0FBT0ssSUFBUDtBQUNEOztBQUVNLFNBQVNJLGFBQVQsQ0FDTEwsS0FESyxFQUVMQyxJQUZLLEVBR0c7QUFDUixRQUFNQyxNQUFNLEdBQUdELElBQUksQ0FBQ0ssR0FBTCxDQUFTQyxDQUFDLElBQUk7QUFDM0IsV0FBT0EsQ0FBQyxDQUFDWCxJQUFUO0FBQ0QsR0FGYyxDQUFmO0FBR0EsUUFBTVksU0FBUyxHQUFJLEdBQUVSLEtBQUssQ0FBQ0gsSUFBSyxJQUFHSyxNQUFNLENBQUNPLElBQVAsQ0FBWSxHQUFaLENBQWlCLEdBQXBEO0FBQ0EsUUFBTUMsU0FBUyxHQUFHLG9CQUFTRixTQUFULEVBQW9CRyxRQUFwQixDQUE2QixLQUE3QixDQUFsQjtBQUNBLFNBQU9ELFNBQVMsQ0FBQ0UsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsZUFBVCxDQUNMWixJQURLLEVBRUxhLFNBRkssRUFHRztBQUNSLFFBQU1DLEtBQUssR0FBRyxFQUFkO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLEVBQWY7QUFFQSxHQUFDZixJQUFJLElBQUksRUFBVCxFQUFhUCxPQUFiLENBQXFCdUIsR0FBRyxJQUFJO0FBQzFCLFFBQUlBLEdBQUcsQ0FBQ3JCLElBQUosS0FBYSxNQUFqQixFQUF5QjtBQUN2Qm1CLE1BQUFBLEtBQUssQ0FBQ1gsSUFBTixDQUFXLFNBQVg7QUFDRCxLQUZELE1BRU87QUFDTFcsTUFBQUEsS0FBSyxDQUFDWCxJQUFOLENBQVdhLEdBQUcsQ0FBQ3JCLElBQWY7QUFDRDs7QUFDRCxRQUFJa0IsU0FBUyxDQUFDSSxjQUFWLENBQXlCRCxHQUFHLENBQUNwQixJQUE3QixDQUFKLEVBQXdDO0FBQ3RDLFVBQUlzQixLQUFLLEdBQUdMLFNBQVMsQ0FBQ0csR0FBRyxDQUFDcEIsSUFBTCxDQUFyQjs7QUFDQSxVQUFJb0IsR0FBRyxDQUFDckIsSUFBSixLQUFhLFNBQWpCLEVBQTRCO0FBQzFCdUIsUUFBQUEsS0FBSyxHQUFHQyxPQUFPLENBQUNDLFVBQVIsQ0FBbUJGLEtBQW5CLEVBQTBCRyxTQUExQixFQUFSO0FBQ0Q7O0FBQ0QsVUFBSUwsR0FBRyxDQUFDckIsSUFBSixLQUFhLFdBQWpCLEVBQThCO0FBQzVCLGFBQUssSUFBSVcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1ksS0FBSyxDQUFDSSxNQUExQixFQUFrQ2hCLENBQUMsRUFBbkMsRUFBdUM7QUFDckNZLFVBQUFBLEtBQUssQ0FBQ1osQ0FBRCxDQUFMLEdBQVdhLE9BQU8sQ0FBQ0MsVUFBUixDQUFtQkYsS0FBSyxDQUFDWixDQUFELENBQXhCLEVBQTZCZSxTQUE3QixFQUFYO0FBQ0Q7QUFDRjs7QUFDRE4sTUFBQUEsTUFBTSxDQUFDWixJQUFQLENBQVllLEtBQVo7QUFDRCxLQVhELE1BV087QUFDTEgsTUFBQUEsTUFBTSxDQUFDWixJQUFQLENBQVksRUFBWjtBQUNEO0FBQ0YsR0FwQkQ7O0FBcUJBLE1BQUk7QUFDRixVQUFNb0IsT0FBTyxHQUFHQyx1QkFBV0MsU0FBWCxDQUFxQlgsS0FBckIsRUFBNEJDLE1BQTVCLENBQWhCOztBQUNBLFdBQU9RLE9BQU8sQ0FBQ2IsUUFBUixDQUFpQixLQUFqQixDQUFQO0FBQ0QsR0FIRCxDQUdFLE9BQU9nQixDQUFQLEVBQVU7QUFDVixVQUFNLElBQUlDLEtBQUosQ0FBVyx3QkFBdUJELENBQUMsQ0FBQ0UsS0FBTSxFQUExQyxDQUFOO0FBQ0Q7QUFDRjs7QUFFTSxNQUFNL0IsV0FBVyxHQUFHLGFBQXBCOzs7QUFNQSxTQUFTZ0MsZUFBVCxDQUNMQyxTQURLLEVBRUxDLE1BRkssRUFHTGxCLFNBSEssRUFJRztBQUNSLFFBQU1kLEtBQUssR0FBRytCLFNBQVMsQ0FBQ0MsTUFBRCxDQUF2QjtBQUNBLFFBQU0vQixJQUFJLEdBQUdGLFdBQVcsQ0FBQ0MsS0FBRCxDQUF4QjtBQUNBLFFBQU1pQyxNQUFNLEdBQUc1QixhQUFhLENBQUNMLEtBQUQsRUFBUUMsSUFBUixDQUE1QjtBQUNBLFFBQU1pQyxXQUFXLEdBQUdyQixlQUFlLENBQUNaLElBQUQsRUFBT2EsU0FBUCxDQUFuQztBQUNBLFNBQVEsR0FBRW1CLE1BQU8sR0FBRUMsV0FBWSxFQUEvQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXG5pbXBvcnQgZXRoZXJldW1qcyBmcm9tIFwiZXRoZXJldW1qcy1hYmlcIjtcbmltcG9ydCAqIGFzIGFkZHJlc3MgZnJvbSBcIi4uL2NyeXB0by9hZGRyZXNzXCI7XG5pbXBvcnQgeyBoYXNoMjU2YiB9IGZyb20gXCIuLi9jcnlwdG8vaGFzaFwiO1xuaW1wb3J0IHsgRXRoQWJpRGVjb2RlUGFyYW1ldGVyc1R5cGUgfSBmcm9tIFwiLi9hYmlcIjtcblxuZXhwb3J0IHR5cGUgQWJpQnlGdW5jID0ge1xuICBbZnVuYzogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFiaUZ1bmN0aW9ucyhhYmk6IEFycmF5PGFueT4pOiBBYmlCeUZ1bmMge1xuICBjb25zdCBhYmlGdW5jdGlvbnMgPSAoe30gYXMgYW55KSBhcyBBYmlCeUZ1bmM7XG4gIGFiaS5mb3JFYWNoKGYgPT4ge1xuICAgIGlmIChmLnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYWJpRnVuY3Rpb25zW2YubmFtZV0gPSBmO1xuICAgIH1cbiAgICBpZiAoZi50eXBlID09PSBcImNvbnN0cnVjdG9yXCIpIHtcbiAgICAgIGFiaUZ1bmN0aW9uc1tDb25zdHJ1Y3Rvcl0gPSBmO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFiaUZ1bmN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFyZ1R5cGVzKGZuQWJpOiB7XG4gIGlucHV0czogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHR5cGU6IHN0cmluZyB9Pjtcbn0pOiBBcnJheTxFdGhBYmlEZWNvZGVQYXJhbWV0ZXJzVHlwZT4ge1xuICBjb25zdCBhcmdzID0gW10gYXMgQXJyYXk8RXRoQWJpRGVjb2RlUGFyYW1ldGVyc1R5cGU+O1xuICBmbkFiaS5pbnB1dHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgYXJncy5wdXNoKHsgbmFtZTogZmllbGQubmFtZSwgdHlwZTogZmllbGQudHlwZSB9KTtcbiAgfSk7XG4gIHJldHVybiBhcmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGVhZGVySGFzaChcbiAgZm5BYmk6IGFueSxcbiAgYXJnczogQXJyYXk8RXRoQWJpRGVjb2RlUGFyYW1ldGVyc1R5cGU+XG4pOiBzdHJpbmcge1xuICBjb25zdCBpbnB1dHMgPSBhcmdzLm1hcChpID0+IHtcbiAgICByZXR1cm4gaS50eXBlO1xuICB9KTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gYCR7Zm5BYmkubmFtZX0oJHtpbnB1dHMuam9pbihcIixcIil9KWA7XG4gIGNvbnN0IGtlY2NhazI1NiA9IGhhc2gyNTZiKHNpZ25hdHVyZSkudG9TdHJpbmcoXCJoZXhcIik7XG4gIHJldHVybiBrZWNjYWsyNTYuc2xpY2UoMCwgOCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVBcmd1bWVudHMoXG4gIGFyZ3M6IEFycmF5PEV0aEFiaURlY29kZVBhcmFtZXRlcnNUeXBlPixcbiAgdXNlcklucHV0OiBVc2VySW5wdXRcbik6IHN0cmluZyB7XG4gIGNvbnN0IHR5cGVzID0gW10gYXMgQXJyYXk8YW55PjtcbiAgY29uc3QgdmFsdWVzID0gW10gYXMgQXJyYXk8YW55PjtcblxuICAoYXJncyB8fCBbXSkuZm9yRWFjaChhcmcgPT4ge1xuICAgIGlmIChhcmcudHlwZSA9PT0gXCJib29sXCIpIHtcbiAgICAgIHR5cGVzLnB1c2goXCJ1aW50MjU2XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlcy5wdXNoKGFyZy50eXBlKTtcbiAgICB9XG4gICAgaWYgKHVzZXJJbnB1dC5oYXNPd25Qcm9wZXJ0eShhcmcubmFtZSkpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHVzZXJJbnB1dFthcmcubmFtZV07XG4gICAgICBpZiAoYXJnLnR5cGUgPT09IFwiYWRkcmVzc1wiKSB7XG4gICAgICAgIHZhbHVlID0gYWRkcmVzcy5mcm9tU3RyaW5nKHZhbHVlKS5zdHJpbmdFdGgoKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcudHlwZSA9PT0gXCJhZGRyZXNzW11cIikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFsdWVbaV0gPSBhZGRyZXNzLmZyb21TdHJpbmcodmFsdWVbaV0pLnN0cmluZ0V0aCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlcy5wdXNoKFwiXCIpO1xuICAgIH1cbiAgfSk7XG4gIHRyeSB7XG4gICAgY29uc3QgZW5jb2RlZCA9IGV0aGVyZXVtanMucmF3RW5jb2RlKHR5cGVzLCB2YWx1ZXMpO1xuICAgIHJldHVybiBlbmNvZGVkLnRvU3RyaW5nKFwiaGV4XCIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gcmF3RW5jb2RlOiAke2Uuc3RhY2t9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IENvbnN0cnVjdG9yID0gXCJjb25zdHJ1Y3RvclwiO1xuXG50eXBlIFVzZXJJbnB1dCA9IHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUlucHV0RGF0YShcbiAgYWJpQnlGdW5jOiBBYmlCeUZ1bmMsXG4gIGZuTmFtZTogc3RyaW5nLFxuICB1c2VySW5wdXQ6IFVzZXJJbnB1dFxuKTogc3RyaW5nIHtcbiAgY29uc3QgZm5BYmkgPSBhYmlCeUZ1bmNbZm5OYW1lXTtcbiAgY29uc3QgYXJncyA9IGdldEFyZ1R5cGVzKGZuQWJpKTtcbiAgY29uc3QgaGVhZGVyID0gZ2V0SGVhZGVySGFzaChmbkFiaSwgYXJncyk7XG4gIGNvbnN0IGVuY29kZWRBcmdzID0gZW5jb2RlQXJndW1lbnRzKGFyZ3MsIHVzZXJJbnB1dCk7XG4gIHJldHVybiBgJHtoZWFkZXJ9JHtlbmNvZGVkQXJnc31gO1xufVxuIl19
