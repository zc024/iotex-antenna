"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toActionTransfer = toActionTransfer;
exports.toTimestamp = toTimestamp;
exports.toActionExecution = toActionExecution;
exports.toActionStartSubChain = toActionStartSubChain;
exports.toActionStopSubChain = toActionStopSubChain;
exports.toActionPutBlock = toActionPutBlock;
exports.toActionCreateDeposit = toActionCreateDeposit;
exports.toActionSettleDeposit = toActionSettleDeposit;
exports.toActionCreatePlumChain = toActionCreatePlumChain;
exports.toActionTerminatePlumChain = toActionTerminatePlumChain;
exports.toActionPlumPutBlock = toActionPlumPutBlock;
exports.toActionPlumCreateDeposit = toActionPlumCreateDeposit;
exports.toActionPlumStartExit = toActionPlumStartExit;
exports.toActionPlumChallengeExit = toActionPlumChallengeExit;
exports.toActionPlumResponseChallengeExit = toActionPlumResponseChallengeExit;
exports.toActionPlumFinalizeExit = toActionPlumFinalizeExit;
exports.toActionPlumSettleDeposit = toActionPlumSettleDeposit;
exports.toActionPlumTransfer = toActionPlumTransfer;
exports.toActionDepositToRewardingFund = toActionDepositToRewardingFund;
exports.toActionClaimFromRewardingFund = toActionClaimFromRewardingFund;
exports.toActionGrantReward = toActionGrantReward;
exports.toAction = toAction;
exports.GetEpochMetaRequest = exports.ReadStateRequest = exports.EstimateGasForActionRequest = exports.SendActionResponse = exports.SendActionRequest = exports.ReadContractRequest = exports.GetReceiptByActionRequest = exports.SuggestGasPriceRequest = exports.GetActionsRequest = exports.GetBlockMetasRequest = exports.GetServerMetaRequest = exports.GetChainMetaRequest = exports.GetAccountRequest = void 0;

var _timestamp_pb = require("google-protobuf/google/protobuf/timestamp_pb");

var _api_pb = _interopRequireDefault(
  require("../../protogen/proto/api/api_pb")
);

var _action_pb = _interopRequireDefault(
  require("../../protogen/proto/types/action_pb")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* tslint:disable:no-any */
const GetAccountRequest = {
  to(req) {
    const pbReq = new _api_pb.default.GetAccountRequest();
    pbReq.setAddress(req.address);
    return pbReq;
  },

  from(pbRes) {
    const meta = pbRes.getAccountmeta();

    if (!meta) {
      return {
        accountMeta: undefined
      };
    }

    return {
      accountMeta: {
        address: meta.getAddress(),
        balance: meta.getBalance(),
        nonce: meta.getNonce(),
        pendingNonce: meta.getPendingnonce(),
        numActions: meta.getNumactions()
      }
    };
  }
}; // interface for get chain meta

exports.GetAccountRequest = GetAccountRequest;
const GetChainMetaRequest = {
  // @ts-ignore
  to(req) {
    return new _api_pb.default.GetChainMetaRequest();
  },

  from(pbRes) {
    const meta = pbRes.getChainmeta();
    const res = {
      chainMeta: meta
    };

    if (meta) {
      const epochData = meta.Epoch;
      res.chainMeta = {
        height: meta.getHeight(),
        numActions: meta.getNumactions(),
        tps: meta.getTps(),
        epoch: epochData
      };
    }

    return res;
  }
}; // interface for get server metas

exports.GetChainMetaRequest = GetChainMetaRequest;
// @ts-ignore
const GetServerMetaRequest = {
  // @ts-ignore
  to(req) {
    return new _api_pb.default.GetServerMetaRequest();
  },

  from(pbRes) {
    const meta = pbRes.getServermeta();

    if (!meta) {
      return {
        serverMeta: undefined
      };
    }

    return {
      serverMeta: {
        packageVersion: meta.getPackageversion(),
        packageCommitID: meta.getPackagecommitid(),
        gitStatus: meta.getGitstatus(),
        goVersion: meta.getGoversion(),
        buildTime: meta.getBuildtime()
      }
    };
  }
}; // interface for get block metas
// Properties of a GetBlockMetasByIndexRequest.

exports.GetServerMetaRequest = GetServerMetaRequest;
const GetBlockMetasRequest = {
  to(req) {
    const pbReq = new _api_pb.default.GetBlockMetasRequest();

    if (req.byIndex) {
      const pbReqByIndex = new _api_pb.default.GetBlockMetasByIndexRequest();

      if (req.byIndex.start) {
        pbReqByIndex.setStart(req.byIndex.start);
      }

      if (req.byIndex.count) {
        pbReqByIndex.setCount(req.byIndex.count);
      }

      pbReq.setByindex(pbReqByIndex);
    } else if (req.byHash) {
      const pbReqByHash = new _api_pb.default.GetBlockMetaByHashRequest();
      pbReqByHash.setBlkhash(req.byHash.blkHash);
      pbReq.setByhash(pbReqByHash);
    }

    return pbReq;
  },

  from(pbRes) {
    const metas = pbRes.getBlkmetasList();
    const res = {
      blkMetas: metas
    };

    if (metas) {
      const parsedMetas = [];

      for (let i = 0; i < metas.length; i++) {
        parsedMetas[i] = {
          hash: metas[i].getHash(),
          height: metas[i].getHeight(),
          timestamp: metas[i].getTimestamp(),
          numActions: metas[i].getNumactions(),
          producerAddress: metas[i].getProduceraddress(),
          transferAmount: metas[i].getTransferamount(),
          txRoot: metas[i].getTxroot(),
          receiptRoot: metas[i].getReceiptroot(),
          deltaStateDigest: metas[i].getDeltastatedigest()
        };
      }

      res.blkMetas = parsedMetas;
    }

    return res;
  }
}; // interface for get actions
// Properties of a GetActionsByIndexRequest.

exports.GetBlockMetasRequest = GetBlockMetasRequest;

function toActionTransfer(req) {
  if (!req) {
    return undefined;
  }

  const pbTransfer = new _action_pb.default.Transfer();
  pbTransfer.setAmount(req.amount);
  pbTransfer.setRecipient(req.recipient);
  pbTransfer.setPayload(req.payload);
  return pbTransfer;
}

function toTimestamp(timestamp) {
  const ts = new _timestamp_pb.Timestamp();

  if (timestamp) {
    ts.setSeconds(timestamp.seconds);
    ts.setNanos(timestamp.nanos);
  }

  return ts;
}

function toActionExecution(req) {
  if (!req) {
    return undefined;
  }

  const pbExecution = new _action_pb.default.Execution();
  pbExecution.setAmount(req.amount);
  pbExecution.setContract(req.contract);
  pbExecution.setData(req.data);
  return pbExecution;
}

function toActionStartSubChain(req) {
  if (!req) {
    return undefined;
  }

  const pbStartSubChain = new _action_pb.default.StartSubChain();
  pbStartSubChain.setChainid(req.chainID);
  pbStartSubChain.setSecuritydeposit(req.securityDeposit);
  pbStartSubChain.setOperationdeposit(req.operationDeposit);
  pbStartSubChain.setStartheight(req.startHeight);
  pbStartSubChain.setParentheightoffset(req.parentHeightOffset);
  return pbStartSubChain;
}

function toActionStopSubChain(req) {
  if (!req) {
    return undefined;
  }

  const pbStopSubChain = new _action_pb.default.StopSubChain(); // @ts-ignore

  pbStopSubChain.setChainid(req.chainID); // @ts-ignore

  pbStopSubChain.setStopheight(req.stopHeight); // @ts-ignore

  pbStopSubChain.setSubchainaddress(req.subChainAddress);
  return pbStopSubChain;
}

function toActionPutBlock(req) {
  if (!req) {
    return undefined;
  }

  const roots = req.roots;
  const rootList = [];

  if (req.roots && roots) {
    for (let i = 0; i < req.roots.length; i++) {
      const rootItem = req.roots && req.roots[i];
      const mkroot = new _action_pb.default.MerkleRoot();
      mkroot.setName(rootItem.name);
      mkroot.setValue(rootItem.value);
      rootList[i] = mkroot;
    }
  }

  const pbPutBlock = new _action_pb.default.PutBlock();
  pbPutBlock.setSubchainaddress(req.subChainAddress);
  pbPutBlock.setHeight(req.height);
  pbPutBlock.setRootsList(rootList);
  return pbPutBlock;
}

function toActionCreateDeposit(req) {
  if (!req) {
    return undefined;
  }

  const pbCreateDeposit = new _action_pb.default.CreateDeposit();
  pbCreateDeposit.setChainid(req.chainID);
  pbCreateDeposit.setAmount(req.amount);
  pbCreateDeposit.setRecipient(req.recipient);
  return pbCreateDeposit;
}

function toActionSettleDeposit(req) {
  if (!req) {
    return undefined;
  }

  const pbSettleDeposit = new _action_pb.default.SettleDeposit();
  pbSettleDeposit.setAmount(req.amount);
  pbSettleDeposit.setRecipient(req.recipient);
  pbSettleDeposit.setIndex(req.index);
  return pbSettleDeposit;
}

function toActionCreatePlumChain(req) {
  if (!req) {
    return undefined;
  }

  return new _action_pb.default.CreatePlumChain();
}

function toActionTerminatePlumChain(req) {
  if (!req) {
    return undefined;
  }

  const pbTerminatePlumChain = new _action_pb.default.TerminatePlumChain();
  pbTerminatePlumChain.setSubchainaddress(req.subChainAddress);
  return pbTerminatePlumChain;
}

function toActionPlumPutBlock(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumPutBlock = new _action_pb.default.PlumPutBlock();
  pbPlumPutBlock.setSubchainaddress(req.subChainAddress);
  pbPlumPutBlock.setHeight(req.height);
  return pbPlumPutBlock;
}

function toActionPlumCreateDeposit(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumCreateDeposit = new _action_pb.default.PlumCreateDeposit(); // @ts-ignore

  pbPlumCreateDeposit.setSubchainaddress(req.subChainAddress); // @ts-ignore

  pbPlumCreateDeposit.setAmount(req.amount); // @ts-ignore

  pbPlumCreateDeposit.setRecipient(req.recipient);
  return pbPlumCreateDeposit;
}

function toActionPlumStartExit(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumStartExit = new _action_pb.default.PlumStartExit();
  pbPlumStartExit.setSubchainaddress(req.subChainAddress);
  pbPlumStartExit.setPrevioustransfer(req.previousTransfer);
  pbPlumStartExit.setPrevioustransferblockproof(req.previousTransferBlockProof);
  pbPlumStartExit.setPrevioustransferblockheight(
    req.previousTransferBlockHeight
  );
  pbPlumStartExit.setExittransfer(req.exitTransfer);
  pbPlumStartExit.setExittransferblockproof(req.exitTransferBlockProof);
  pbPlumStartExit.setExittransferblockheight(req.exitTransferBlockHeight);
  return pbPlumStartExit;
}

function toActionPlumChallengeExit(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumChallengeExit = new _action_pb.default.PlumChallengeExit();
  pbPlumChallengeExit.setSubchainaddress(req.subChainAddress);
  pbPlumChallengeExit.setCoinid(req.coinID);
  pbPlumChallengeExit.setChallengetransfer(req.challengeTransfer);
  pbPlumChallengeExit.setChallengetransferblockproof(
    req.challengeTransferBlockProof
  );
  pbPlumChallengeExit.setChallengetransferblockheight(
    req.challengeTransferBlockHeight
  );
  return pbPlumChallengeExit;
}

function toActionPlumResponseChallengeExit(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumResponseChallengeExit = new _action_pb.default.PlumResponseChallengeExit();
  pbPlumResponseChallengeExit.setSubchainaddress(req.subChainAddress);
  pbPlumResponseChallengeExit.setCoinid(req.coinID);
  pbPlumResponseChallengeExit.setChallengetransfer(req.challengeTransfer);
  pbPlumResponseChallengeExit.setResponsetransfer(req.responseTransfer);
  pbPlumResponseChallengeExit.setResponsetransferblockproof(
    req.responseTransferBlockProof
  );
  return pbPlumResponseChallengeExit;
}

function toActionPlumFinalizeExit(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumFinalizeExit = new _action_pb.default.PlumFinalizeExit();
  pbPlumFinalizeExit.setSubchainaddress(req.subChainAddress);
  pbPlumFinalizeExit.setCoinid(req.coinID);
  return pbPlumFinalizeExit;
}

function toActionPlumSettleDeposit(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumSettleDeposit = new _action_pb.default.PlumSettleDeposit();
  pbPlumSettleDeposit.setCoinid(req.coinID);
  return pbPlumSettleDeposit;
}

function toActionPlumTransfer(req) {
  if (!req) {
    return undefined;
  }

  const pbPlumTransfer = new _action_pb.default.PlumTransfer();
  pbPlumTransfer.setCoinid(req.coinID);
  pbPlumTransfer.setDenomination(req.denomination);
  pbPlumTransfer.setOwner(req.owner);
  pbPlumTransfer.setRecipient(req.recipient);
  return pbPlumTransfer;
}

function toActionDepositToRewardingFund(req) {
  if (!req) {
    return undefined;
  }

  const pbDepositToRewardingFund = new _action_pb.default.DepositToRewardingFund();
  pbDepositToRewardingFund.setAmount(req.amount);
  pbDepositToRewardingFund.setData(req.data);
  return pbDepositToRewardingFund;
}

function toActionClaimFromRewardingFund(req) {
  if (!req) {
    return undefined;
  }

  const pbClaimFromRewardingFund = new _action_pb.default.ClaimFromRewardingFund(); // @ts-ignore

  pbClaimFromRewardingFund.setAmount(req.amount); // @ts-ignore

  pbClaimFromRewardingFund.setData(req.data);
  return pbClaimFromRewardingFund;
}

function toActionGrantReward(req) {
  if (!req) {
    return undefined;
  }

  const pbGrantReward = new _action_pb.default.GrantReward();
  pbGrantReward.setType(req.type);
  return pbGrantReward;
}

function toAction(req) {
  const pbActionCore = new _action_pb.default.ActionCore();
  const core = req && req.core;

  if (core) {
    pbActionCore.setVersion(core.version);
    pbActionCore.setNonce(Number(core.nonce));
    pbActionCore.setGaslimit(Number(core.gasLimit));
    pbActionCore.setGasprice(core.gasPrice);
    pbActionCore.setTransfer(toActionTransfer(core.transfer));
    pbActionCore.setExecution(toActionExecution(core.execution));
    pbActionCore.setStartsubchain(toActionStartSubChain(core.startSubChain));
    pbActionCore.setStopsubchain(toActionStopSubChain(core.stopSubChain));
    pbActionCore.setPutblock(toActionPutBlock(core.putBlock));
    pbActionCore.setCreatedeposit(toActionCreateDeposit(core.createDeposit));
    pbActionCore.setSettledeposit(toActionSettleDeposit(core.settleDeposit));
    pbActionCore.setCreateplumchain(
      toActionCreatePlumChain(core.createPlumChain)
    );
    pbActionCore.setTerminateplumchain(
      toActionTerminatePlumChain(core.terminatePlumChain)
    );
    pbActionCore.setPlumputblock(toActionPlumPutBlock(core.plumPutBlock));
    pbActionCore.setPlumcreatedeposit(
      toActionPlumCreateDeposit(core.plumCreateDeposit)
    );
    pbActionCore.setPlumstartexit(toActionPlumStartExit(core.plumStartExit));
    pbActionCore.setPlumchallengeexit(
      toActionPlumChallengeExit(core.plumChallengeExit)
    );
    pbActionCore.setPlumresponsechallengeexit(
      toActionPlumResponseChallengeExit(core.plumResponseChallengeExit)
    );
    pbActionCore.setPlumfinalizeexit(
      toActionPlumFinalizeExit(core.plumFinalizeExit)
    );
    pbActionCore.setPlumsettledeposit(
      toActionPlumSettleDeposit(core.plumSettleDeposit)
    );
    pbActionCore.setPlumtransfer(toActionPlumTransfer(core.plumTransfer));
    pbActionCore.setDeposittorewardingfund(
      toActionDepositToRewardingFund(core.depositToRewardingFund)
    );
    pbActionCore.setClaimfromrewardingfund(
      toActionClaimFromRewardingFund(core.claimFromRewardingFund)
    );
    pbActionCore.setGrantreward(toActionGrantReward(core.grantReward));
  }

  const pbAction = new _action_pb.default.Action();
  pbAction.setCore(pbActionCore);

  if (req.senderPubKey) {
    pbAction.setSenderpubkey(req.senderPubKey);
  }

  if (req.signature) {
    pbAction.setSignature(req.signature);
  }

  return pbAction;
}

const GetActionsRequest = {
  byAddrTo(byAddr) {
    const pbReqByAddr = new _api_pb.default.GetActionsByAddressRequest();

    if (byAddr.address) {
      pbReqByAddr.setAddress(byAddr.address);
    }

    if (byAddr.start) {
      pbReqByAddr.setStart(byAddr.start);
    }

    if (byAddr.count) {
      pbReqByAddr.setCount(byAddr.count);
    }

    return pbReqByAddr;
  },

  byBlkTo(byBlk) {
    const pbReqByBlk = new _api_pb.default.GetActionsByBlockRequest();

    if (byBlk.blkHash) {
      pbReqByBlk.setBlkhash(byBlk.blkHash);
    }

    if (byBlk.start) {
      pbReqByBlk.setStart(byBlk.start);
    }

    if (byBlk.count) {
      pbReqByBlk.setCount(byBlk.count);
    }

    return pbReqByBlk;
  },

  byHashTo(byHash) {
    const pbReqByHash = new _api_pb.default.GetActionByHashRequest();

    if (byHash.actionHash) {
      pbReqByHash.setActionhash(byHash.actionHash);
    }

    if (byHash.checkingPending) {
      pbReqByHash.setCheckpending(byHash.checkingPending);
    }

    return pbReqByHash;
  },

  byIndexTo(byIndex) {
    const pbReqByIndex = new _api_pb.default.GetActionsByIndexRequest();

    if (byIndex.start) {
      pbReqByIndex.setStart(byIndex.start);
    }

    if (byIndex.count) {
      pbReqByIndex.setCount(byIndex.count);
    }

    return pbReqByIndex;
  },

  unconfirmedByAddrTo(unconfirmedByAddr) {
    const pbReqUnconfirmedByAddr = new _api_pb.default.GetUnconfirmedActionsByAddressRequest();

    if (unconfirmedByAddr.start) {
      pbReqUnconfirmedByAddr.setStart(unconfirmedByAddr.start);
    }

    if (unconfirmedByAddr.count) {
      pbReqUnconfirmedByAddr.setCount(unconfirmedByAddr.count);
    }

    if (unconfirmedByAddr.address) {
      pbReqUnconfirmedByAddr.setAddress(unconfirmedByAddr.address);
    }

    return pbReqUnconfirmedByAddr;
  },

  to(req) {
    const pbReq = new _api_pb.default.GetActionsRequest();

    if (req.byAddr) {
      pbReq.setByaddr(GetActionsRequest.byAddrTo(req.byAddr));
    }

    if (req.byBlk) {
      pbReq.setByblk(GetActionsRequest.byBlkTo(req.byBlk));
    }

    if (req.byHash) {
      pbReq.setByhash(GetActionsRequest.byHashTo(req.byHash));
    }

    if (req.byIndex) {
      pbReq.setByindex(GetActionsRequest.byIndexTo(req.byIndex));
    }

    if (req.unconfirmedByAddr) {
      pbReq.setUnconfirmedbyaddr(
        GetActionsRequest.unconfirmedByAddrTo(req.unconfirmedByAddr)
      );
    }

    return pbReq;
  },

  fromTransfer(pbRes) {
    let transferData = pbRes;

    if (pbRes) {
      transferData = {
        amount: pbRes.getAmount(),
        recipient: pbRes.getRecipient(),
        payload: pbRes.getPayload()
      };
    }

    return transferData;
  },

  fromVote(pbRes) {
    let voteData = pbRes;

    if (voteData) {
      voteData = {
        timestamp: pbRes.getTimestamp(),
        voteeAddress: pbRes.getVoteeaddress()
      };
    }

    return voteData;
  },

  fromExecution(pbRes) {
    let executionData = pbRes;

    if (executionData) {
      executionData = {
        amount: pbRes.getAmount(),
        contract: pbRes.getContract(),
        data: pbRes.getData()
      };
    }

    return executionData;
  },

  fromStartSubChain(pbRes) {
    let startSubChainData = pbRes;

    if (startSubChainData) {
      startSubChainData = {
        chainID: pbRes.chainID,
        securityDeposit: pbRes.securityDeposit,
        operationDeposit: pbRes.operationDeposit,
        startHeight: pbRes.startHeight,
        parentHeightOffset: pbRes.parentHeightOffset
      };
    }

    return startSubChainData;
  },

  fromStopSubChain(pbRes) {
    let stopSubChainData = pbRes;

    if (stopSubChainData) {
      stopSubChainData = {
        chainID: pbRes.chainID,
        stopHeight: pbRes.stopHeight,
        subChainAddress: pbRes.subChainAddress
      };
    }

    return stopSubChainData;
  },

  fromPutBlock(pbRes) {
    let putBlockData = pbRes;

    if (putBlockData) {
      const rootsData = pbRes.roots;

      if (rootsData) {
        for (let i = 0; i < pbRes.roots.length; i++) {
          rootsData[i] = {
            name: pbRes.roots[i].name,
            value: pbRes.roots[i].value
          };
        }
      }

      putBlockData = {
        subChainAddress: pbRes.subChainAddress,
        height: pbRes.height,
        roots: rootsData
      };
    }

    return putBlockData;
  },

  fromCreateDeposit(pbRes) {
    let createDepositData = pbRes;

    if (createDepositData) {
      createDepositData = {
        chainID: pbRes.chainID,
        amount: pbRes.amount,
        recipient: pbRes.recipient
      };
    }

    return createDepositData;
  },

  fromSettleDeposit(pbRes) {
    let settleDepositData = pbRes;

    if (settleDepositData) {
      settleDepositData = {
        amount: pbRes.amount,
        recipient: pbRes.recipient,
        index: pbRes.index
      };
    }

    return settleDepositData;
  },

  fromCreatePlumChain(pbRes) {
    let createPlumChainData = pbRes;

    if (createPlumChainData) {
      createPlumChainData = {};
    }

    return createPlumChainData;
  },

  fromTerminatePlumChain(pbRes) {
    let terminatePlumChainData = pbRes;

    if (terminatePlumChainData) {
      terminatePlumChainData = {
        subChainAddress: pbRes.subChainAddress
      };
    }

    return terminatePlumChainData;
  },

  fromPlumPutBlock(pbRes) {
    let plumPutBlockData = pbRes;

    if (plumPutBlockData) {
      plumPutBlockData = {
        subChainAddress: pbRes.subChainAddress,
        height: pbRes.height,
        roots: pbRes.roots
      };
    }

    return plumPutBlockData;
  },

  fromPlumCreateDeposit(pbRes) {
    let plumCreateDepositData = pbRes;

    if (plumCreateDepositData) {
      plumCreateDepositData = {
        subChainAddress: pbRes.subChainAddress,
        amount: pbRes.amount,
        recipient: pbRes.recipient
      };
    }

    return plumCreateDepositData;
  },

  fromPlumStartExit(pbRes) {
    let plumStartExitData = pbRes;

    if (plumStartExitData) {
      plumStartExitData = {
        subChainAddress: pbRes.subChainAddress,
        previousTransfer: pbRes.previousTransfer,
        previousTransferBlockProof: pbRes.previousTransferBlockProof,
        previousTransferBlockHeight: pbRes.previousTransferBlockHeight,
        exitTransfer: pbRes.exitTransfer,
        exitTransferBlockProof: pbRes.exitTransferBlockProof,
        exitTransferBlockHeight: pbRes.exitTransferBlockHeight
      };
    }

    return plumStartExitData;
  },

  fromPlumChallengeExit(pbRes) {
    let plumChallengeExitData = pbRes;

    if (plumChallengeExitData) {
      plumChallengeExitData = {
        subChainAddress: pbRes.subChainAddress,
        coinID: pbRes.coinID,
        challengeTransfer: pbRes.challengeTransfer,
        challengeTransferBlockProof: pbRes.challengeTransferBlockProof,
        challengeTransferBlockHeight: pbRes.challengeTransferBlockHeight
      };
    }

    return plumChallengeExitData;
  },

  fromPlumResponseChallengeExit(pbRes) {
    let plumResponseChallengeExitData = pbRes;

    if (plumResponseChallengeExitData) {
      plumResponseChallengeExitData = {
        subChainAddress: pbRes.subChainAddress,
        coinID: pbRes.coinID,
        challengeTransfer: pbRes.challengeTransfer,
        responseTransfer: pbRes.responseTransfer,
        responseTransferBlockProof: pbRes.responseTransferBlockProof,
        previousTransferBlockHeight: pbRes.previousTransferBlockHeight
      };
    }

    return plumResponseChallengeExitData;
  },

  fromPlumFinalizeExit(pbRes) {
    let plumFinalizeExitData = pbRes;

    if (plumFinalizeExitData) {
      plumFinalizeExitData = {
        subChainAddress: pbRes.subChainAddress,
        coinID: pbRes.coinID
      };
    }

    return plumFinalizeExitData;
  },

  fromPlumSettleDeposit(pbRes) {
    let plumSettleDepositData = pbRes;

    if (plumSettleDepositData) {
      plumSettleDepositData = {
        coinID: pbRes.coinID
      };
    }

    return plumSettleDepositData;
  },

  fromPlumTransfer(pbRes) {
    let plumTransferData = pbRes;

    if (plumTransferData) {
      plumTransferData = {
        coinID: pbRes.coinID,
        denomination: pbRes.denomination,
        owner: pbRes.owner,
        recipient: pbRes.recipient
      };
    }

    return plumTransferData;
  },

  fromDepositToRewardingFund(pbRes) {
    let depositToRewardingFundData = pbRes;

    if (depositToRewardingFundData) {
      depositToRewardingFundData = {
        amount: pbRes.amount,
        data: pbRes.data
      };
    }

    return depositToRewardingFundData;
  },

  fromClaimFromRewardingFund(pbRes) {
    let claimFromRewardingFundData = pbRes;

    if (claimFromRewardingFundData) {
      claimFromRewardingFundData = {
        amount: pbRes.amount,
        data: pbRes.data
      };
    }

    return claimFromRewardingFundData;
  },

  fromSetReward(pbRes) {
    let setRewardData = pbRes;

    if (setRewardData) {
      setRewardData = {
        amount: pbRes.amount,
        data: pbRes.data,
        type: pbRes.type
      };
    }

    return setRewardData;
  },

  fromGrantReward(pbRes) {
    if (!pbRes) {
      return undefined;
    }

    return {
      type: pbRes.getType(),
      height: pbRes.getHeight()
    };
  },

  getPutPollResult(req) {
    if (!req) {
      return undefined;
    }

    let candidateList;
    const rawCandidates = req.getCandidates();

    if (rawCandidates) {
      candidateList = {
        candidates: []
      };
      const rawCandidatesList = rawCandidates.getCandidatesList();

      if (rawCandidatesList) {
        for (const rawCandidate of rawCandidatesList) {
          candidateList.candidates.push({
            address: rawCandidate.getAddress(),
            votes: rawCandidate.getVotes(),
            pubKey: rawCandidate.getPubkey(),
            rewardAddress: rawCandidate.getRewardaddress()
          });
        }
      }
    }

    return {
      height: req.getHeight(),
      candidates: candidateList
    };
  },

  // tslint:disable-next-line:max-func-body-length
  from(pbRes) {
    const res = {
      actionInfo: []
    };
    const rawActionInfoList = pbRes.getActioninfoList();

    if (!rawActionInfoList) {
      return res;
    }

    for (const rawActionInfo of rawActionInfoList) {
      const actionInfo = {
        actHash: rawActionInfo.getActhash(),
        blkHash: rawActionInfo.getBlkhash(),
        timestamp: rawActionInfo.getTimestamp()
      };
      const rawAction = rawActionInfo.getAction();

      if (rawAction) {
        const rawActionCore = rawAction.getCore();
        let actionCore;

        if (rawActionCore) {
          actionCore = {
            version: rawActionCore.getVersion(),
            nonce: String(rawActionCore.getNonce()),
            gasLimit: String(rawActionCore.getGaslimit()),
            gasPrice: rawActionCore.getGasprice(),
            transfer: GetActionsRequest.fromTransfer(
              rawActionCore.getTransfer()
            ),
            execution: GetActionsRequest.fromExecution(
              rawActionCore.getExecution()
            ),
            startSubChain: GetActionsRequest.fromStartSubChain(
              rawActionCore.getStartsubchain()
            ),
            stopSubChain: GetActionsRequest.fromStopSubChain(
              rawActionCore.getStopsubchain()
            ),
            putBlock: GetActionsRequest.fromPutBlock(
              rawActionCore.getPutblock()
            ),
            createDeposit: GetActionsRequest.fromCreateDeposit(
              rawActionCore.getCreatedeposit()
            ),
            settleDeposit: GetActionsRequest.fromSettleDeposit(
              rawActionCore.getSettledeposit()
            ),
            createPlumChain: GetActionsRequest.fromCreatePlumChain(
              rawActionCore.getCreateplumchain()
            ),
            terminatePlumChain: GetActionsRequest.fromTerminatePlumChain(
              rawActionCore.getTerminateplumchain()
            ),
            plumPutBlock: GetActionsRequest.fromPlumPutBlock(
              rawActionCore.getPlumputblock()
            ),
            plumCreateDeposit: GetActionsRequest.fromPlumCreateDeposit(
              rawActionCore.getPlumcreatedeposit()
            ),
            plumStartExit: GetActionsRequest.fromPlumStartExit(
              rawActionCore.getPlumstartexit()
            ),
            plumChallengeExit: GetActionsRequest.fromPlumChallengeExit(
              rawActionCore.getPlumchallengeexit()
            ),
            plumResponseChallengeExit: GetActionsRequest.fromPlumResponseChallengeExit(
              rawActionCore.getPlumresponsechallengeexit()
            ),
            plumFinalizeExit: GetActionsRequest.fromPlumFinalizeExit(
              rawActionCore.getPlumfinalizeexit()
            ),
            plumSettleDeposit: GetActionsRequest.fromPlumSettleDeposit(
              rawActionCore.getPlumsettledeposit()
            ),
            plumTransfer: GetActionsRequest.fromPlumTransfer(
              rawActionCore.getPlumtransfer()
            ),
            depositToRewardingFund: GetActionsRequest.fromDepositToRewardingFund(
              rawActionCore.getDeposittorewardingfund()
            ),
            claimFromRewardingFund: GetActionsRequest.fromClaimFromRewardingFund(
              rawActionCore.getClaimfromrewardingfund()
            ),
            grantReward: GetActionsRequest.fromGrantReward(
              rawActionCore.getGrantreward()
            ),
            putPollResult: GetActionsRequest.getPutPollResult(
              rawActionCore.getPutpollresult()
            )
          };
        }

        actionInfo.action = {
          core: actionCore,
          senderPubKey: rawAction.getSenderpubkey(),
          signature: rawAction.getSignature()
        };
      }

      res.actionInfo.push(actionInfo);
    }

    return res;
  }
}; // Properties of a SuggestGasPrice Request.

exports.GetActionsRequest = GetActionsRequest;
const SuggestGasPriceRequest = {
  // @ts-ignore
  to(req) {
    return new _api_pb.default.SuggestGasPriceRequest();
  },

  from(pbRes) {
    const gasPrice = pbRes.getGasprice();
    return {
      gasPrice
    };
  }
}; // Properties of a GetReceiptByActionRequest.

exports.SuggestGasPriceRequest = SuggestGasPriceRequest;

function fromPbReceiptInfo(pbReceiptInfo) {
  if (!pbReceiptInfo) {
    return undefined;
  }

  return {
    receipt: fromPbReceipt(pbReceiptInfo.getReceipt()),
    blkHash: pbReceiptInfo.getBlkhash()
  };
}

const GetReceiptByActionRequest = {
  to(req) {
    const pbReq = new _api_pb.default.GetReceiptByActionRequest();

    if (req.actionHash) {
      pbReq.setActionhash(req.actionHash);
    }

    return pbReq;
  },

  from(pbRes) {
    return {
      receiptInfo: fromPbReceiptInfo(pbRes.getReceiptinfo())
    };
  }
};
exports.GetReceiptByActionRequest = GetReceiptByActionRequest;

function fromPbReceipt(pbReceipt) {
  if (!pbReceipt) {
    return undefined;
  }

  return {
    status: pbReceipt.getStatus(),
    blkHeight: pbReceipt.getBlkheight(),
    actHash: pbReceipt.getActhash(),
    gasConsumed: pbReceipt.getGasconsumed(),
    contractAddress: pbReceipt.getContractaddress(),
    logs: fromPbLogList(pbReceipt.getLogsList())
  };
}

function fromPbLogList(pbLogList) {
  if (!pbLogList) {
    return undefined;
  }

  const res = [];

  for (const log of pbLogList) {
    res.push({
      contractAddress: log.getContractaddress(),
      topics: log.getTopicsList(),
      data: log.getData(),
      blkHeight: log.getBlkheight(),
      actHash: log.getActhash(),
      index: log.getIndex()
    });
  }

  return res;
} // Properties of a ReadContractRequest.

const ReadContractRequest = {
  to(req) {
    const pbReq = new _api_pb.default.ReadContractRequest();
    pbReq.setCalleraddress(req.callerAddress);

    if (req.execution) {
      pbReq.setExecution(toActionExecution(req.execution));
    }

    return pbReq;
  },

  from(pbRes) {
    return {
      data: pbRes.getData(),
      receipt: fromPbReceipt(pbRes.getReceipt())
    };
  }
}; // Properties of a SendActionRequest.

exports.ReadContractRequest = ReadContractRequest;
const SendActionRequest = {
  to(req) {
    const pbReq = new _api_pb.default.SendActionRequest();

    if (req.action) {
      pbReq.setAction(toAction(req.action));
    }

    return pbReq;
  }
};
exports.SendActionRequest = SendActionRequest;
const SendActionResponse = {
  from(resp) {
    return {
      actionHash: resp.getActionhash()
    };
  }
}; // Properties of a EstimateGasForActionRequest.

exports.SendActionResponse = SendActionResponse;
const EstimateGasForActionRequest = {
  to(req) {
    const pbReq = new _api_pb.default.EstimateGasForActionRequest();

    if (req.action) {
      pbReq.setAction(toAction(req.action));
    }

    return pbReq;
  },

  from(pbRes) {
    return {
      gas: pbRes.getGas()
    };
  }
};
exports.EstimateGasForActionRequest = EstimateGasForActionRequest;
const ReadStateRequest = {
  to(req) {
    const pbReq = new _api_pb.default.ReadStateRequest();
    pbReq.setProtocolid(req.protocolID);
    pbReq.setMethodname(req.methodName);
    pbReq.setArgumentsList(req.arguments);
    return pbReq;
  },

  from(pbRes) {
    return {
      data: pbRes.getData()
    };
  }
}; // Properties of a BlockProducerInfo.

exports.ReadStateRequest = ReadStateRequest;
const GetEpochMetaRequest = {
  to(req) {
    const pbReq = new _api_pb.default.GetEpochMetaRequest();

    if (req.epochNumber) {
      pbReq.setEpochnumber(req.epochNumber);
    }

    return pbReq;
  },

  from(pbRes) {
    const epoch = pbRes.getEpochdata();
    const bpInfo = pbRes.getBlockproducersinfoList();
    const res = {
      epochData: {
        num: epoch.getNum(),
        height: epoch.getHeight(),
        gravityChainStartHeight: epoch.getGravitychainstartheight()
      },
      totalBlocks: pbRes.getTotalblocks(),
      blockProducersInfo: bpInfo
    };

    if (bpInfo) {
      const parsedBpinfo = [];

      for (let i = 0; i < bpInfo.length; i++) {
        parsedBpinfo[i] = {
          address: bpInfo[i].getAddress(),
          votes: bpInfo[i].getVotes(),
          active: bpInfo[i].getActive(),
          production: bpInfo[i].getProduction()
        };
      }

      res.blockProducersInfo = parsedBpinfo;
    }

    return res;
  }
};
exports.GetEpochMetaRequest = GetEpochMetaRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ycGMtbWV0aG9kL3R5cGVzLnRzIl0sIm5hbWVzIjpbIkdldEFjY291bnRSZXF1ZXN0IiwidG8iLCJyZXEiLCJwYlJlcSIsImFwaVBiIiwic2V0QWRkcmVzcyIsImFkZHJlc3MiLCJmcm9tIiwicGJSZXMiLCJtZXRhIiwiZ2V0QWNjb3VudG1ldGEiLCJhY2NvdW50TWV0YSIsInVuZGVmaW5lZCIsImdldEFkZHJlc3MiLCJiYWxhbmNlIiwiZ2V0QmFsYW5jZSIsIm5vbmNlIiwiZ2V0Tm9uY2UiLCJwZW5kaW5nTm9uY2UiLCJnZXRQZW5kaW5nbm9uY2UiLCJudW1BY3Rpb25zIiwiZ2V0TnVtYWN0aW9ucyIsIkdldENoYWluTWV0YVJlcXVlc3QiLCJnZXRDaGFpbm1ldGEiLCJyZXMiLCJjaGFpbk1ldGEiLCJlcG9jaERhdGEiLCJFcG9jaCIsImhlaWdodCIsImdldEhlaWdodCIsInRwcyIsImdldFRwcyIsImVwb2NoIiwiR2V0U2VydmVyTWV0YVJlcXVlc3QiLCJnZXRTZXJ2ZXJtZXRhIiwic2VydmVyTWV0YSIsInBhY2thZ2VWZXJzaW9uIiwiZ2V0UGFja2FnZXZlcnNpb24iLCJwYWNrYWdlQ29tbWl0SUQiLCJnZXRQYWNrYWdlY29tbWl0aWQiLCJnaXRTdGF0dXMiLCJnZXRHaXRzdGF0dXMiLCJnb1ZlcnNpb24iLCJnZXRHb3ZlcnNpb24iLCJidWlsZFRpbWUiLCJnZXRCdWlsZHRpbWUiLCJHZXRCbG9ja01ldGFzUmVxdWVzdCIsImJ5SW5kZXgiLCJwYlJlcUJ5SW5kZXgiLCJHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3QiLCJzdGFydCIsInNldFN0YXJ0IiwiY291bnQiLCJzZXRDb3VudCIsInNldEJ5aW5kZXgiLCJieUhhc2giLCJwYlJlcUJ5SGFzaCIsIkdldEJsb2NrTWV0YUJ5SGFzaFJlcXVlc3QiLCJzZXRCbGtoYXNoIiwiYmxrSGFzaCIsInNldEJ5aGFzaCIsIm1ldGFzIiwiZ2V0QmxrbWV0YXNMaXN0IiwiYmxrTWV0YXMiLCJwYXJzZWRNZXRhcyIsImkiLCJsZW5ndGgiLCJoYXNoIiwiZ2V0SGFzaCIsInRpbWVzdGFtcCIsImdldFRpbWVzdGFtcCIsInByb2R1Y2VyQWRkcmVzcyIsImdldFByb2R1Y2VyYWRkcmVzcyIsInRyYW5zZmVyQW1vdW50IiwiZ2V0VHJhbnNmZXJhbW91bnQiLCJ0eFJvb3QiLCJnZXRUeHJvb3QiLCJyZWNlaXB0Um9vdCIsImdldFJlY2VpcHRyb290IiwiZGVsdGFTdGF0ZURpZ2VzdCIsImdldERlbHRhc3RhdGVkaWdlc3QiLCJ0b0FjdGlvblRyYW5zZmVyIiwicGJUcmFuc2ZlciIsImFjdGlvblBiIiwiVHJhbnNmZXIiLCJzZXRBbW91bnQiLCJhbW91bnQiLCJzZXRSZWNpcGllbnQiLCJyZWNpcGllbnQiLCJzZXRQYXlsb2FkIiwicGF5bG9hZCIsInRvVGltZXN0YW1wIiwidHMiLCJUaW1lc3RhbXAiLCJzZXRTZWNvbmRzIiwic2Vjb25kcyIsInNldE5hbm9zIiwibmFub3MiLCJ0b0FjdGlvbkV4ZWN1dGlvbiIsInBiRXhlY3V0aW9uIiwiRXhlY3V0aW9uIiwic2V0Q29udHJhY3QiLCJjb250cmFjdCIsInNldERhdGEiLCJkYXRhIiwidG9BY3Rpb25TdGFydFN1YkNoYWluIiwicGJTdGFydFN1YkNoYWluIiwiU3RhcnRTdWJDaGFpbiIsInNldENoYWluaWQiLCJjaGFpbklEIiwic2V0U2VjdXJpdHlkZXBvc2l0Iiwic2VjdXJpdHlEZXBvc2l0Iiwic2V0T3BlcmF0aW9uZGVwb3NpdCIsIm9wZXJhdGlvbkRlcG9zaXQiLCJzZXRTdGFydGhlaWdodCIsInN0YXJ0SGVpZ2h0Iiwic2V0UGFyZW50aGVpZ2h0b2Zmc2V0IiwicGFyZW50SGVpZ2h0T2Zmc2V0IiwidG9BY3Rpb25TdG9wU3ViQ2hhaW4iLCJwYlN0b3BTdWJDaGFpbiIsIlN0b3BTdWJDaGFpbiIsInNldFN0b3BoZWlnaHQiLCJzdG9wSGVpZ2h0Iiwic2V0U3ViY2hhaW5hZGRyZXNzIiwic3ViQ2hhaW5BZGRyZXNzIiwidG9BY3Rpb25QdXRCbG9jayIsInJvb3RzIiwicm9vdExpc3QiLCJyb290SXRlbSIsIm1rcm9vdCIsIk1lcmtsZVJvb3QiLCJzZXROYW1lIiwibmFtZSIsInNldFZhbHVlIiwidmFsdWUiLCJwYlB1dEJsb2NrIiwiUHV0QmxvY2siLCJzZXRIZWlnaHQiLCJzZXRSb290c0xpc3QiLCJ0b0FjdGlvbkNyZWF0ZURlcG9zaXQiLCJwYkNyZWF0ZURlcG9zaXQiLCJDcmVhdGVEZXBvc2l0IiwidG9BY3Rpb25TZXR0bGVEZXBvc2l0IiwicGJTZXR0bGVEZXBvc2l0IiwiU2V0dGxlRGVwb3NpdCIsInNldEluZGV4IiwiaW5kZXgiLCJ0b0FjdGlvbkNyZWF0ZVBsdW1DaGFpbiIsIkNyZWF0ZVBsdW1DaGFpbiIsInRvQWN0aW9uVGVybWluYXRlUGx1bUNoYWluIiwicGJUZXJtaW5hdGVQbHVtQ2hhaW4iLCJUZXJtaW5hdGVQbHVtQ2hhaW4iLCJ0b0FjdGlvblBsdW1QdXRCbG9jayIsInBiUGx1bVB1dEJsb2NrIiwiUGx1bVB1dEJsb2NrIiwidG9BY3Rpb25QbHVtQ3JlYXRlRGVwb3NpdCIsInBiUGx1bUNyZWF0ZURlcG9zaXQiLCJQbHVtQ3JlYXRlRGVwb3NpdCIsInRvQWN0aW9uUGx1bVN0YXJ0RXhpdCIsInBiUGx1bVN0YXJ0RXhpdCIsIlBsdW1TdGFydEV4aXQiLCJzZXRQcmV2aW91c3RyYW5zZmVyIiwicHJldmlvdXNUcmFuc2ZlciIsInNldFByZXZpb3VzdHJhbnNmZXJibG9ja3Byb29mIiwicHJldmlvdXNUcmFuc2ZlckJsb2NrUHJvb2YiLCJzZXRQcmV2aW91c3RyYW5zZmVyYmxvY2toZWlnaHQiLCJwcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHQiLCJzZXRFeGl0dHJhbnNmZXIiLCJleGl0VHJhbnNmZXIiLCJzZXRFeGl0dHJhbnNmZXJibG9ja3Byb29mIiwiZXhpdFRyYW5zZmVyQmxvY2tQcm9vZiIsInNldEV4aXR0cmFuc2ZlcmJsb2NraGVpZ2h0IiwiZXhpdFRyYW5zZmVyQmxvY2tIZWlnaHQiLCJ0b0FjdGlvblBsdW1DaGFsbGVuZ2VFeGl0IiwicGJQbHVtQ2hhbGxlbmdlRXhpdCIsIlBsdW1DaGFsbGVuZ2VFeGl0Iiwic2V0Q29pbmlkIiwiY29pbklEIiwic2V0Q2hhbGxlbmdldHJhbnNmZXIiLCJjaGFsbGVuZ2VUcmFuc2ZlciIsInNldENoYWxsZW5nZXRyYW5zZmVyYmxvY2twcm9vZiIsImNoYWxsZW5nZVRyYW5zZmVyQmxvY2tQcm9vZiIsInNldENoYWxsZW5nZXRyYW5zZmVyYmxvY2toZWlnaHQiLCJjaGFsbGVuZ2VUcmFuc2ZlckJsb2NrSGVpZ2h0IiwidG9BY3Rpb25QbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IiwicGJQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IiwiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCIsInNldFJlc3BvbnNldHJhbnNmZXIiLCJyZXNwb25zZVRyYW5zZmVyIiwic2V0UmVzcG9uc2V0cmFuc2ZlcmJsb2NrcHJvb2YiLCJyZXNwb25zZVRyYW5zZmVyQmxvY2tQcm9vZiIsInRvQWN0aW9uUGx1bUZpbmFsaXplRXhpdCIsInBiUGx1bUZpbmFsaXplRXhpdCIsIlBsdW1GaW5hbGl6ZUV4aXQiLCJ0b0FjdGlvblBsdW1TZXR0bGVEZXBvc2l0IiwicGJQbHVtU2V0dGxlRGVwb3NpdCIsIlBsdW1TZXR0bGVEZXBvc2l0IiwidG9BY3Rpb25QbHVtVHJhbnNmZXIiLCJwYlBsdW1UcmFuc2ZlciIsIlBsdW1UcmFuc2ZlciIsInNldERlbm9taW5hdGlvbiIsImRlbm9taW5hdGlvbiIsInNldE93bmVyIiwib3duZXIiLCJ0b0FjdGlvbkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQiLCJwYkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQiLCJEZXBvc2l0VG9SZXdhcmRpbmdGdW5kIiwidG9BY3Rpb25DbGFpbUZyb21SZXdhcmRpbmdGdW5kIiwicGJDbGFpbUZyb21SZXdhcmRpbmdGdW5kIiwiQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCIsInRvQWN0aW9uR3JhbnRSZXdhcmQiLCJwYkdyYW50UmV3YXJkIiwiR3JhbnRSZXdhcmQiLCJzZXRUeXBlIiwidHlwZSIsInRvQWN0aW9uIiwicGJBY3Rpb25Db3JlIiwiQWN0aW9uQ29yZSIsImNvcmUiLCJzZXRWZXJzaW9uIiwidmVyc2lvbiIsInNldE5vbmNlIiwiTnVtYmVyIiwic2V0R2FzbGltaXQiLCJnYXNMaW1pdCIsInNldEdhc3ByaWNlIiwiZ2FzUHJpY2UiLCJzZXRUcmFuc2ZlciIsInRyYW5zZmVyIiwic2V0RXhlY3V0aW9uIiwiZXhlY3V0aW9uIiwic2V0U3RhcnRzdWJjaGFpbiIsInN0YXJ0U3ViQ2hhaW4iLCJzZXRTdG9wc3ViY2hhaW4iLCJzdG9wU3ViQ2hhaW4iLCJzZXRQdXRibG9jayIsInB1dEJsb2NrIiwic2V0Q3JlYXRlZGVwb3NpdCIsImNyZWF0ZURlcG9zaXQiLCJzZXRTZXR0bGVkZXBvc2l0Iiwic2V0dGxlRGVwb3NpdCIsInNldENyZWF0ZXBsdW1jaGFpbiIsImNyZWF0ZVBsdW1DaGFpbiIsInNldFRlcm1pbmF0ZXBsdW1jaGFpbiIsInRlcm1pbmF0ZVBsdW1DaGFpbiIsInNldFBsdW1wdXRibG9jayIsInBsdW1QdXRCbG9jayIsInNldFBsdW1jcmVhdGVkZXBvc2l0IiwicGx1bUNyZWF0ZURlcG9zaXQiLCJzZXRQbHVtc3RhcnRleGl0IiwicGx1bVN0YXJ0RXhpdCIsInNldFBsdW1jaGFsbGVuZ2VleGl0IiwicGx1bUNoYWxsZW5nZUV4aXQiLCJzZXRQbHVtcmVzcG9uc2VjaGFsbGVuZ2VleGl0IiwicGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCIsInNldFBsdW1maW5hbGl6ZWV4aXQiLCJwbHVtRmluYWxpemVFeGl0Iiwic2V0UGx1bXNldHRsZWRlcG9zaXQiLCJwbHVtU2V0dGxlRGVwb3NpdCIsInNldFBsdW10cmFuc2ZlciIsInBsdW1UcmFuc2ZlciIsInNldERlcG9zaXR0b3Jld2FyZGluZ2Z1bmQiLCJkZXBvc2l0VG9SZXdhcmRpbmdGdW5kIiwic2V0Q2xhaW1mcm9tcmV3YXJkaW5nZnVuZCIsImNsYWltRnJvbVJld2FyZGluZ0Z1bmQiLCJzZXRHcmFudHJld2FyZCIsImdyYW50UmV3YXJkIiwicGJBY3Rpb24iLCJBY3Rpb24iLCJzZXRDb3JlIiwic2VuZGVyUHViS2V5Iiwic2V0U2VuZGVycHVia2V5Iiwic2lnbmF0dXJlIiwic2V0U2lnbmF0dXJlIiwiR2V0QWN0aW9uc1JlcXVlc3QiLCJieUFkZHJUbyIsImJ5QWRkciIsInBiUmVxQnlBZGRyIiwiR2V0QWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QiLCJieUJsa1RvIiwiYnlCbGsiLCJwYlJlcUJ5QmxrIiwiR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0IiwiYnlIYXNoVG8iLCJHZXRBY3Rpb25CeUhhc2hSZXF1ZXN0IiwiYWN0aW9uSGFzaCIsInNldEFjdGlvbmhhc2giLCJjaGVja2luZ1BlbmRpbmciLCJzZXRDaGVja3BlbmRpbmciLCJieUluZGV4VG8iLCJHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3QiLCJ1bmNvbmZpcm1lZEJ5QWRkclRvIiwidW5jb25maXJtZWRCeUFkZHIiLCJwYlJlcVVuY29uZmlybWVkQnlBZGRyIiwiR2V0VW5jb25maXJtZWRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCIsInNldEJ5YWRkciIsInNldEJ5YmxrIiwic2V0VW5jb25maXJtZWRieWFkZHIiLCJmcm9tVHJhbnNmZXIiLCJ0cmFuc2ZlckRhdGEiLCJnZXRBbW91bnQiLCJnZXRSZWNpcGllbnQiLCJnZXRQYXlsb2FkIiwiZnJvbVZvdGUiLCJ2b3RlRGF0YSIsInZvdGVlQWRkcmVzcyIsImdldFZvdGVlYWRkcmVzcyIsImZyb21FeGVjdXRpb24iLCJleGVjdXRpb25EYXRhIiwiZ2V0Q29udHJhY3QiLCJnZXREYXRhIiwiZnJvbVN0YXJ0U3ViQ2hhaW4iLCJzdGFydFN1YkNoYWluRGF0YSIsImZyb21TdG9wU3ViQ2hhaW4iLCJzdG9wU3ViQ2hhaW5EYXRhIiwiZnJvbVB1dEJsb2NrIiwicHV0QmxvY2tEYXRhIiwicm9vdHNEYXRhIiwiZnJvbUNyZWF0ZURlcG9zaXQiLCJjcmVhdGVEZXBvc2l0RGF0YSIsImZyb21TZXR0bGVEZXBvc2l0Iiwic2V0dGxlRGVwb3NpdERhdGEiLCJmcm9tQ3JlYXRlUGx1bUNoYWluIiwiY3JlYXRlUGx1bUNoYWluRGF0YSIsImZyb21UZXJtaW5hdGVQbHVtQ2hhaW4iLCJ0ZXJtaW5hdGVQbHVtQ2hhaW5EYXRhIiwiZnJvbVBsdW1QdXRCbG9jayIsInBsdW1QdXRCbG9ja0RhdGEiLCJmcm9tUGx1bUNyZWF0ZURlcG9zaXQiLCJwbHVtQ3JlYXRlRGVwb3NpdERhdGEiLCJmcm9tUGx1bVN0YXJ0RXhpdCIsInBsdW1TdGFydEV4aXREYXRhIiwiZnJvbVBsdW1DaGFsbGVuZ2VFeGl0IiwicGx1bUNoYWxsZW5nZUV4aXREYXRhIiwiZnJvbVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQiLCJwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0RGF0YSIsImZyb21QbHVtRmluYWxpemVFeGl0IiwicGx1bUZpbmFsaXplRXhpdERhdGEiLCJmcm9tUGx1bVNldHRsZURlcG9zaXQiLCJwbHVtU2V0dGxlRGVwb3NpdERhdGEiLCJmcm9tUGx1bVRyYW5zZmVyIiwicGx1bVRyYW5zZmVyRGF0YSIsImZyb21EZXBvc2l0VG9SZXdhcmRpbmdGdW5kIiwiZGVwb3NpdFRvUmV3YXJkaW5nRnVuZERhdGEiLCJmcm9tQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCIsImNsYWltRnJvbVJld2FyZGluZ0Z1bmREYXRhIiwiZnJvbVNldFJld2FyZCIsInNldFJld2FyZERhdGEiLCJmcm9tR3JhbnRSZXdhcmQiLCJnZXRUeXBlIiwiZ2V0UHV0UG9sbFJlc3VsdCIsImNhbmRpZGF0ZUxpc3QiLCJyYXdDYW5kaWRhdGVzIiwiZ2V0Q2FuZGlkYXRlcyIsImNhbmRpZGF0ZXMiLCJyYXdDYW5kaWRhdGVzTGlzdCIsImdldENhbmRpZGF0ZXNMaXN0IiwicmF3Q2FuZGlkYXRlIiwicHVzaCIsInZvdGVzIiwiZ2V0Vm90ZXMiLCJwdWJLZXkiLCJnZXRQdWJrZXkiLCJyZXdhcmRBZGRyZXNzIiwiZ2V0UmV3YXJkYWRkcmVzcyIsImFjdGlvbkluZm8iLCJyYXdBY3Rpb25JbmZvTGlzdCIsImdldEFjdGlvbmluZm9MaXN0IiwicmF3QWN0aW9uSW5mbyIsImFjdEhhc2giLCJnZXRBY3RoYXNoIiwiZ2V0QmxraGFzaCIsInJhd0FjdGlvbiIsImdldEFjdGlvbiIsInJhd0FjdGlvbkNvcmUiLCJnZXRDb3JlIiwiYWN0aW9uQ29yZSIsImdldFZlcnNpb24iLCJTdHJpbmciLCJnZXRHYXNsaW1pdCIsImdldEdhc3ByaWNlIiwiZ2V0VHJhbnNmZXIiLCJnZXRFeGVjdXRpb24iLCJnZXRTdGFydHN1YmNoYWluIiwiZ2V0U3RvcHN1YmNoYWluIiwiZ2V0UHV0YmxvY2siLCJnZXRDcmVhdGVkZXBvc2l0IiwiZ2V0U2V0dGxlZGVwb3NpdCIsImdldENyZWF0ZXBsdW1jaGFpbiIsImdldFRlcm1pbmF0ZXBsdW1jaGFpbiIsImdldFBsdW1wdXRibG9jayIsImdldFBsdW1jcmVhdGVkZXBvc2l0IiwiZ2V0UGx1bXN0YXJ0ZXhpdCIsImdldFBsdW1jaGFsbGVuZ2VleGl0IiwiZ2V0UGx1bXJlc3BvbnNlY2hhbGxlbmdlZXhpdCIsImdldFBsdW1maW5hbGl6ZWV4aXQiLCJnZXRQbHVtc2V0dGxlZGVwb3NpdCIsImdldFBsdW10cmFuc2ZlciIsImdldERlcG9zaXR0b3Jld2FyZGluZ2Z1bmQiLCJnZXRDbGFpbWZyb21yZXdhcmRpbmdmdW5kIiwiZ2V0R3JhbnRyZXdhcmQiLCJwdXRQb2xsUmVzdWx0IiwiZ2V0UHV0cG9sbHJlc3VsdCIsImFjdGlvbiIsImdldFNlbmRlcnB1YmtleSIsImdldFNpZ25hdHVyZSIsIlN1Z2dlc3RHYXNQcmljZVJlcXVlc3QiLCJmcm9tUGJSZWNlaXB0SW5mbyIsInBiUmVjZWlwdEluZm8iLCJyZWNlaXB0IiwiZnJvbVBiUmVjZWlwdCIsImdldFJlY2VpcHQiLCJHZXRSZWNlaXB0QnlBY3Rpb25SZXF1ZXN0IiwicmVjZWlwdEluZm8iLCJnZXRSZWNlaXB0aW5mbyIsInBiUmVjZWlwdCIsInN0YXR1cyIsImdldFN0YXR1cyIsImJsa0hlaWdodCIsImdldEJsa2hlaWdodCIsImdhc0NvbnN1bWVkIiwiZ2V0R2FzY29uc3VtZWQiLCJjb250cmFjdEFkZHJlc3MiLCJnZXRDb250cmFjdGFkZHJlc3MiLCJsb2dzIiwiZnJvbVBiTG9nTGlzdCIsImdldExvZ3NMaXN0IiwicGJMb2dMaXN0IiwibG9nIiwidG9waWNzIiwiZ2V0VG9waWNzTGlzdCIsImdldEluZGV4IiwiUmVhZENvbnRyYWN0UmVxdWVzdCIsInNldENhbGxlcmFkZHJlc3MiLCJjYWxsZXJBZGRyZXNzIiwiU2VuZEFjdGlvblJlcXVlc3QiLCJzZXRBY3Rpb24iLCJTZW5kQWN0aW9uUmVzcG9uc2UiLCJyZXNwIiwiZ2V0QWN0aW9uaGFzaCIsIkVzdGltYXRlR2FzRm9yQWN0aW9uUmVxdWVzdCIsImdhcyIsImdldEdhcyIsIlJlYWRTdGF0ZVJlcXVlc3QiLCJzZXRQcm90b2NvbGlkIiwicHJvdG9jb2xJRCIsInNldE1ldGhvZG5hbWUiLCJtZXRob2ROYW1lIiwic2V0QXJndW1lbnRzTGlzdCIsImFyZ3VtZW50cyIsIkdldEVwb2NoTWV0YVJlcXVlc3QiLCJlcG9jaE51bWJlciIsInNldEVwb2NobnVtYmVyIiwiZ2V0RXBvY2hkYXRhIiwiYnBJbmZvIiwiZ2V0QmxvY2twcm9kdWNlcnNpbmZvTGlzdCIsIm51bSIsImdldE51bSIsImdyYXZpdHlDaGFpblN0YXJ0SGVpZ2h0IiwiZ2V0R3Jhdml0eWNoYWluc3RhcnRoZWlnaHQiLCJ0b3RhbEJsb2NrcyIsImdldFRvdGFsYmxvY2tzIiwiYmxvY2tQcm9kdWNlcnNJbmZvIiwicGFyc2VkQnBpbmZvIiwiYWN0aXZlIiwiZ2V0QWN0aXZlIiwicHJvZHVjdGlvbiIsImdldFByb2R1Y3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7Ozs7QUFWQTtBQW9ETyxNQUFNQSxpQkFBaUIsR0FBRztBQUMvQkMsRUFBQUEsRUFBRSxDQUFDQyxHQUFELEVBQStCO0FBQy9CLFVBQU1DLEtBQUss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LEVBQUVJLEtBQUssQ0FBQ0gsU0FBTixFQUZDO0FBR1Q2YSxRQUFBQSx1QkFBdUIsRUFBRTFhLEtBQUssQ0FBQzJhLDBCQUFOO0FBSGhCLE9BREQ7QUFNVkMsTUFBQUEsV0FBVyxFQUFFcGMsS0FBSyxDQUFDcWMsY0FBTixFQU5IO0FBT1ZDLE1BQUFBLGtCQUFrQixFQUFFUjtBQVBWLEtBQVo7O0FBU0EsUUFBSUEsTUFBSixFQUFZO0FBQ1YsWUFBTVMsWUFBWSxHQUFHLEVBQXJCOztBQUNBLFdBQUssSUFBSTlZLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxWSxNQUFNLENBQUNwWSxNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUN0QzhZLFFBQUFBLFlBQVksQ0FBQzlZLENBQUQsQ0FBWixHQUFrQjtBQUNoQjNELFVBQUFBLE9BQU8sRUFBRWdjLE1BQU0sQ0FBQ3JZLENBQUQsQ0FBTixDQUFVcEQsVUFBVixFQURPO0FBRWhCMFYsVUFBQUEsS0FBSyxFQUFFK0YsTUFBTSxDQUFDclksQ0FBRCxDQUFOLENBQVV1UyxRQUFWLEVBRlM7QUFHaEJ3RyxVQUFBQSxNQUFNLEVBQUVWLE1BQU0sQ0FBQ3JZLENBQUQsQ0FBTixDQUFVZ1osU0FBVixFQUhRO0FBSWhCQyxVQUFBQSxVQUFVLEVBQUVaLE1BQU0sQ0FBQ3JZLENBQUQsQ0FBTixDQUFVa1osYUFBVjtBQUpJLFNBQWxCO0FBTUQ7O0FBQ0QzYixNQUFBQSxHQUFHLENBQUNzYixrQkFBSixHQUF5QkMsWUFBekI7QUFDRDs7QUFFRCxXQUFPdmIsR0FBUDtBQUNEOztBQWxDZ0MsQ0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cblxuaW1wb3J0IHsgVGltZXN0YW1wIH0gZnJvbSBcImdvb2dsZS1wcm90b2J1Zi9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wX3BiXCI7XG5pbXBvcnQgYXBpUGIsIHtcbiAgR2V0QWNjb3VudFJlc3BvbnNlLFxuICBHZXRBY3Rpb25zUmVzcG9uc2UsXG4gIEdldFJlY2VpcHRCeUFjdGlvblJlc3BvbnNlLFxuICBHZXRTZXJ2ZXJNZXRhUmVzcG9uc2UsXG4gIFJlYWRTdGF0ZVJlc3BvbnNlXG59IGZyb20gXCIuLi8uLi9wcm90b2dlbi9wcm90by9hcGkvYXBpX3BiXCI7XG5pbXBvcnQgYWN0aW9uUGIsIHsgUHV0UG9sbFJlc3VsdCB9IGZyb20gXCIuLi8uLi9wcm90b2dlbi9wcm90by90eXBlcy9hY3Rpb25fcGJcIjtcblxuLy8gUHJvcGVydGllcyBvZiBhIFRpbWVzdGFtcC5cbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVzdGFtcCB7XG4gIC8vIFRpbWVzdGFtcCBzZWNvbmRzXG4gIHNlY29uZHM6IG51bWJlcjtcblxuICAvLyBUaW1lc3RhbXAgbmFub3NcbiAgbmFub3M6IG51bWJlcjtcbn1cblxuLy8gaW50ZXJmYWNlIGZvciBnZXQgYWNjb3VudFxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjY291bnRSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWNjb3VudFJlcXVlc3Qge1xuICAvLyBHZXRBY2NvdW50UmVxdWVzdCBhZGRyZXNzXG4gIGFkZHJlc3M6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhbiBBY2NvdW50TWV0YS5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjY291bnRNZXRhIHtcbiAgLy8gQWNjb3VudE1ldGEgYWRkcmVzc1xuICBhZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gQWNjb3VudE1ldGEgYmFsYW5jZVxuICBiYWxhbmNlOiBzdHJpbmc7XG5cbiAgLy8gQWNjb3VudE1ldGEgbm9uY2UuIFR5cGUgaXMgc3RyaW5nIGluIG5vZGUgYnV0IG51bWJlciBpbiBicm93c2VyLlxuICBub25jZTogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8vIEFjY291bnRNZXRhIHBlbmRpbmdOb25jZS4gVHlwZSBpcyBzdHJpbmcgaW4gbm9kZSBidXQgbnVtYmVyIGluIGJyb3dzZXIuXG4gIHBlbmRpbmdOb25jZTogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8vIEFjY291bnRNZXRhIG51bUFjdGlvbnMgcmVsYXRlZCB0byB0aGUgYWNjb3VudC4gVHlwZSBpcyBzdHJpbmcgaW4gbm9kZSBidXQgbnVtYmVyIGluIGJyb3dzZXIuXG4gIG51bUFjdGlvbnM6IHN0cmluZyB8IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjY291bnRSZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEFjY291bnRSZXNwb25zZSB7XG4gIC8vIEdldEFjY291bnRSZXNwb25zZSBhY2NvdW50TWV0YVxuICBhY2NvdW50TWV0YTogSUFjY291bnRNZXRhIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgR2V0QWNjb3VudFJlcXVlc3QgPSB7XG4gIHRvKHJlcTogSUdldEFjY291bnRSZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5HZXRBY2NvdW50UmVxdWVzdCgpO1xuICAgIHBiUmVxLnNldEFkZHJlc3MocmVxLmFkZHJlc3MpO1xuICAgIHJldHVybiBwYlJlcTtcbiAgfSxcblxuICBmcm9tKHBiUmVzOiBHZXRBY2NvdW50UmVzcG9uc2UpOiBJR2V0QWNjb3VudFJlc3BvbnNlIHtcbiAgICBjb25zdCBtZXRhID0gcGJSZXMuZ2V0QWNjb3VudG1ldGEoKTtcbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnRNZXRhOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY291bnRNZXRhOiB7XG4gICAgICAgIGFkZHJlc3M6IG1ldGEuZ2V0QWRkcmVzcygpLFxuICAgICAgICBiYWxhbmNlOiBtZXRhLmdldEJhbGFuY2UoKSxcbiAgICAgICAgbm9uY2U6IG1ldGEuZ2V0Tm9uY2UoKSxcbiAgICAgICAgcGVuZGluZ05vbmNlOiBtZXRhLmdldFBlbmRpbmdub25jZSgpLFxuICAgICAgICBudW1BY3Rpb25zOiBtZXRhLmdldE51bWFjdGlvbnMoKVxuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbi8vIGludGVyZmFjZSBmb3IgZ2V0IGNoYWluIG1ldGFcbmV4cG9ydCBpbnRlcmZhY2UgSUVwb2NoRGF0YSB7XG4gIG51bTogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgZ3Jhdml0eUNoYWluU3RhcnRIZWlnaHQ6IG51bWJlciB8IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2hhaW5NZXRhIHtcbiAgaGVpZ2h0OiBzdHJpbmc7XG4gIG51bUFjdGlvbnM6IHN0cmluZztcbiAgdHBzOiBzdHJpbmc7XG4gIGVwb2NoOiBJRXBvY2hEYXRhO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRDaGFpbk1ldGFSZXF1ZXN0IHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldENoYWluTWV0YVJlc3BvbnNlIHtcbiAgY2hhaW5NZXRhOiBJQ2hhaW5NZXRhO1xufVxuXG5leHBvcnQgY29uc3QgR2V0Q2hhaW5NZXRhUmVxdWVzdCA9IHtcbiAgLy8gQHRzLWlnbm9yZVxuICB0byhyZXE6IElHZXRDaGFpbk1ldGFSZXF1ZXN0KTogYW55IHtcbiAgICByZXR1cm4gbmV3IGFwaVBiLkdldENoYWluTWV0YVJlcXVlc3QoKTtcbiAgfSxcblxuICBmcm9tKHBiUmVzOiBhbnkpOiBJR2V0Q2hhaW5NZXRhUmVzcG9uc2Uge1xuICAgIGNvbnN0IG1ldGEgPSBwYlJlcy5nZXRDaGFpbm1ldGEoKTtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBjaGFpbk1ldGE6IG1ldGFcbiAgICB9O1xuICAgIGlmIChtZXRhKSB7XG4gICAgICBjb25zdCBlcG9jaERhdGEgPSBtZXRhLkVwb2NoO1xuICAgICAgcmVzLmNoYWluTWV0YSA9IHtcbiAgICAgICAgaGVpZ2h0OiBtZXRhLmdldEhlaWdodCgpLFxuICAgICAgICBudW1BY3Rpb25zOiBtZXRhLmdldE51bWFjdGlvbnMoKSxcbiAgICAgICAgdHBzOiBtZXRhLmdldFRwcygpLFxuICAgICAgICBlcG9jaDogZXBvY2hEYXRhXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59O1xuXG4vLyBpbnRlcmZhY2UgZm9yIGdldCBzZXJ2ZXIgbWV0YXNcbmV4cG9ydCBpbnRlcmZhY2UgSVNlcnZlck1ldGEge1xuICBwYWNrYWdlVmVyc2lvbjogc3RyaW5nO1xuICBwYWNrYWdlQ29tbWl0SUQ6IHN0cmluZztcbiAgZ2l0U3RhdHVzOiBzdHJpbmc7XG4gIGdvVmVyc2lvbjogc3RyaW5nO1xuICBidWlsZFRpbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJR2V0U2VydmVyTWV0YVJlcXVlc3Qge31cblxuZXhwb3J0IGludGVyZmFjZSBJR2V0U2VydmVyTWV0YVJlc3BvbnNlIHtcbiAgc2VydmVyTWV0YTogSVNlcnZlck1ldGEgfCB1bmRlZmluZWQ7XG59XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgR2V0U2VydmVyTWV0YVJlcXVlc3QgPSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgdG8ocmVxOiBJR2V0U2VydmVyTWV0YVJlcXVlc3QpOiBhcGlQYi5HZXRTZXJ2ZXJNZXRhUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBhcGlQYi5HZXRTZXJ2ZXJNZXRhUmVxdWVzdCgpO1xuICB9LFxuXG4gIGZyb20ocGJSZXM6IEdldFNlcnZlck1ldGFSZXNwb25zZSk6IElHZXRTZXJ2ZXJNZXRhUmVzcG9uc2Uge1xuICAgIGNvbnN0IG1ldGEgPSBwYlJlcy5nZXRTZXJ2ZXJtZXRhKCk7XG4gICAgaWYgKCFtZXRhKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZXJ2ZXJNZXRhOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlcnZlck1ldGE6IHtcbiAgICAgICAgcGFja2FnZVZlcnNpb246IG1ldGEuZ2V0UGFja2FnZXZlcnNpb24oKSxcbiAgICAgICAgcGFja2FnZUNvbW1pdElEOiBtZXRhLmdldFBhY2thZ2Vjb21taXRpZCgpLFxuICAgICAgICBnaXRTdGF0dXM6IG1ldGEuZ2V0R2l0c3RhdHVzKCksXG4gICAgICAgIGdvVmVyc2lvbjogbWV0YS5nZXRHb3ZlcnNpb24oKSxcbiAgICAgICAgYnVpbGRUaW1lOiBtZXRhLmdldEJ1aWxkdGltZSgpXG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxuLy8gaW50ZXJmYWNlIGZvciBnZXQgYmxvY2sgbWV0YXNcbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3Qge1xuICAvLyBHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3Qgc3RhcnRcbiAgc3RhcnQ6IG51bWJlcjtcblxuICAvLyBHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3QgY291bnRcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEJsb2NrTWV0YXNCeUhhc2hSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QmxvY2tNZXRhc0J5SGFzaFJlcXVlc3Qge1xuICAvLyBHZXRCbG9ja01ldGFzQnlIYXNoUmVxdWVzdCBhZGRyZXNzXG4gIGJsa0hhc2g6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEJsb2NrTWV0YXNSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QmxvY2tNZXRhc1JlcXVlc3Qge1xuICAvLyBHZXRCbG9ja01ldGFzUmVxdWVzdCBieUluZGV4XG4gIGJ5SW5kZXg/OiBJR2V0QmxvY2tNZXRhc0J5SW5kZXhSZXF1ZXN0O1xuXG4gIC8vIEdldEJsb2NrTWV0YXNSZXF1ZXN0IGJ5SGFzaFxuICBieUhhc2g/OiBJR2V0QmxvY2tNZXRhc0J5SGFzaFJlcXVlc3Q7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gYmxvY2tNZXRhLlxuZXhwb3J0IGludGVyZmFjZSBJQmxvY2tNZXRhIHtcbiAgLy8gQmxvY2tNZXRhIGhhc2hcbiAgaGFzaDogc3RyaW5nO1xuXG4gIC8vIEJsb2NrTWV0YSBoZWlnaHRcbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gQmxvY2tNZXRhIHRpbWVzdGFtcFxuICB0aW1lc3RhbXA6IElUaW1lc3RhbXA7XG5cbiAgLy8gQmxvY2tNZXRhIG51bUFjdGlvbnNcbiAgbnVtQWN0aW9uczogbnVtYmVyO1xuXG4gIC8vIEJsb2NrTWV0YSBwcm9kdWNlckFkZHJlc3NcbiAgcHJvZHVjZXJBZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gQmxvY2tNZXRhIHRyYW5zZmVyQW1vdW50XG4gIHRyYW5zZmVyQW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gQmxvY2tNZXRhIHR4Um9vdFxuICB0eFJvb3Q6IHN0cmluZztcblxuICAvLyBCbG9ja01ldGEgcmVjZWlwdFJvb3RcbiAgcmVjZWlwdFJvb3Q6IHN0cmluZztcblxuICAvLyBCbG9ja01ldGEgZGVsdGFTdGF0ZURpZ2VzdFxuICBkZWx0YVN0YXRlRGlnZXN0OiBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRCbG9ja01ldGFzUmVzcG9uc2UuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRCbG9ja01ldGFzUmVzcG9uc2Uge1xuICAvLyBHZXRCbG9ja01ldGFzUmVzcG9uc2UgYmxvY2tNZXRhc1xuICBibGtNZXRhczogQXJyYXk8SUJsb2NrTWV0YT47XG59XG5cbmV4cG9ydCBjb25zdCBHZXRCbG9ja01ldGFzUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJR2V0QmxvY2tNZXRhc1JlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxID0gbmV3IGFwaVBiLkdldEJsb2NrTWV0YXNSZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5ieUluZGV4KSB7XG4gICAgICBjb25zdCBwYlJlcUJ5SW5kZXggPSBuZXcgYXBpUGIuR2V0QmxvY2tNZXRhc0J5SW5kZXhSZXF1ZXN0KCk7XG4gICAgICBpZiAocmVxLmJ5SW5kZXguc3RhcnQpIHtcbiAgICAgICAgcGJSZXFCeUluZGV4LnNldFN0YXJ0KHJlcS5ieUluZGV4LnN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXEuYnlJbmRleC5jb3VudCkge1xuICAgICAgICBwYlJlcUJ5SW5kZXguc2V0Q291bnQocmVxLmJ5SW5kZXguY291bnQpO1xuICAgICAgfVxuICAgICAgcGJSZXEuc2V0QnlpbmRleChwYlJlcUJ5SW5kZXgpO1xuICAgIH0gZWxzZSBpZiAocmVxLmJ5SGFzaCkge1xuICAgICAgY29uc3QgcGJSZXFCeUhhc2ggPSBuZXcgYXBpUGIuR2V0QmxvY2tNZXRhQnlIYXNoUmVxdWVzdCgpO1xuICAgICAgcGJSZXFCeUhhc2guc2V0QmxraGFzaChyZXEuYnlIYXNoLmJsa0hhc2gpO1xuICAgICAgcGJSZXEuc2V0QnloYXNoKHBiUmVxQnlIYXNoKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxO1xuICB9LFxuXG4gIGZyb20ocGJSZXM6IGFueSk6IElHZXRCbG9ja01ldGFzUmVzcG9uc2Uge1xuICAgIGNvbnN0IG1ldGFzID0gcGJSZXMuZ2V0QmxrbWV0YXNMaXN0KCk7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgYmxrTWV0YXM6IG1ldGFzXG4gICAgfTtcbiAgICBpZiAobWV0YXMpIHtcbiAgICAgIGNvbnN0IHBhcnNlZE1ldGFzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1ldGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcnNlZE1ldGFzW2ldID0ge1xuICAgICAgICAgIGhhc2g6IG1ldGFzW2ldLmdldEhhc2goKSxcbiAgICAgICAgICBoZWlnaHQ6IG1ldGFzW2ldLmdldEhlaWdodCgpLFxuICAgICAgICAgIHRpbWVzdGFtcDogbWV0YXNbaV0uZ2V0VGltZXN0YW1wKCksXG4gICAgICAgICAgbnVtQWN0aW9uczogbWV0YXNbaV0uZ2V0TnVtYWN0aW9ucygpLFxuICAgICAgICAgIHByb2R1Y2VyQWRkcmVzczogbWV0YXNbaV0uZ2V0UHJvZHVjZXJhZGRyZXNzKCksXG4gICAgICAgICAgdHJhbnNmZXJBbW91bnQ6IG1ldGFzW2ldLmdldFRyYW5zZmVyYW1vdW50KCksXG4gICAgICAgICAgdHhSb290OiBtZXRhc1tpXS5nZXRUeHJvb3QoKSxcbiAgICAgICAgICByZWNlaXB0Um9vdDogbWV0YXNbaV0uZ2V0UmVjZWlwdHJvb3QoKSxcbiAgICAgICAgICBkZWx0YVN0YXRlRGlnZXN0OiBtZXRhc1tpXS5nZXREZWx0YXN0YXRlZGlnZXN0KClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJlcy5ibGtNZXRhcyA9IHBhcnNlZE1ldGFzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59O1xuXG4vLyBpbnRlcmZhY2UgZm9yIGdldCBhY3Rpb25zXG4vLyBQcm9wZXJ0aWVzIG9mIGEgR2V0QWN0aW9uc0J5SW5kZXhSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWN0aW9uc0J5SW5kZXhSZXF1ZXN0IHtcbiAgLy8gR2V0QWN0aW9uc0J5SW5kZXhSZXF1ZXN0IHN0YXJ0XG4gIHN0YXJ0OiBudW1iZXI7XG5cbiAgLy8gR2V0QWN0aW9uc0J5SW5kZXhSZXF1ZXN0IGNvdW50XG4gIGNvdW50OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRBY3Rpb25zQnlIYXNoUmVxdWVzdC5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEFjdGlvbnNCeUhhc2hSZXF1ZXN0IHtcbiAgLy8gR2V0QWN0aW9uc0J5SGFzaFJlcXVlc3QgYWN0aW9uSGFzaFxuICBhY3Rpb25IYXNoOiBzdHJpbmc7XG5cbiAgLy8gR2V0QWN0aW9uc0J5SGFzaFJlcXVlc3QgY2hlY2tpbmdQZW5kaW5nXG4gIGNoZWNraW5nUGVuZGluZzogYm9vbGVhbjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWN0aW9uc0J5QWRkcmVzc1JlcXVlc3Qge1xuICAvLyBHZXRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCBhZGRyZXNzXG4gIGFkZHJlc3M6IHN0cmluZztcblxuICAvLyBHZXRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCBzdGFydFxuICBzdGFydDogbnVtYmVyO1xuXG4gIC8vIEdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IGNvdW50XG4gIGNvdW50OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRVbmNvbmZpcm1lZEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0VW5jb25maXJtZWRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCB7XG4gIC8vIEdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QgYWRkcmVzc1xuICBhZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gR2V0VW5jb25maXJtZWRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCBzdGFydFxuICBzdGFydDogbnVtYmVyO1xuXG4gIC8vIEdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QgY291bnRcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdC5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdCB7XG4gIC8vIEdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdCBibGtIYXNoXG4gIGJsa0hhc2g6IHN0cmluZztcblxuICAvLyBHZXRBY3Rpb25zQnlCbG9ja1JlcXVlc3Qgc3RhcnRcbiAgc3RhcnQ6IG51bWJlcjtcblxuICAvLyBHZXRBY3Rpb25zQnlCbG9ja1JlcXVlc3QgY291bnRcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjdGlvbnNSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWN0aW9uc1JlcXVlc3Qge1xuICAvLyBHZXRBY3Rpb25zUmVxdWVzdCBieUluZGV4XG4gIGJ5SW5kZXg/OiBJR2V0QWN0aW9uc0J5SW5kZXhSZXF1ZXN0O1xuXG4gIC8vIEdldEFjdGlvbnNSZXF1ZXN0IGJ5SGFzaFxuICBieUhhc2g/OiBJR2V0QWN0aW9uc0J5SGFzaFJlcXVlc3Q7XG5cbiAgLy8gR2V0QWN0aW9uc1JlcXVlc3QgYnlBZGRyXG4gIGJ5QWRkcj86IElHZXRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdDtcblxuICAvLyBHZXRVbmNvbmZpcm1lZEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IHVuY29uZmlybWVkQnlBZGRyXG4gIHVuY29uZmlybWVkQnlBZGRyPzogSUdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3Q7XG5cbiAgLy8gR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0IGJ5QmxrXG4gIGJ5QmxrPzogSUdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdDtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFRyYW5zZmVyLlxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNmZXIge1xuICAvLyBUcmFuc2ZlciBhbW91bnRcbiAgYW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gVHJhbnNmZXIgcmVjaXBpZW50XG4gIHJlY2lwaWVudDogc3RyaW5nO1xuXG4gIC8vIFRyYW5zZmVyIHBheWxvYWRcbiAgcGF5bG9hZDogQnVmZmVyIHwgc3RyaW5nO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgRXhlY3V0aW9uLlxuZXhwb3J0IGludGVyZmFjZSBJRXhlY3V0aW9uIHtcbiAgLy8gRXhlY3V0aW9uIGFtb3VudFxuICBhbW91bnQ6IHN0cmluZztcblxuICAvLyBFeGVjdXRpb24gY29udHJhY3RcbiAgY29udHJhY3Q6IHN0cmluZztcblxuICAvLyBFeGVjdXRpb24gZGF0YVxuICBkYXRhOiBCdWZmZXIgfCBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTdGFydFN1YkNoYWluLlxuZXhwb3J0IGludGVyZmFjZSBJU3RhcnRTdWJDaGFpbiB7XG4gIC8vIFN0YXJ0U3ViQ2hhaW4gY2hhaW5JRFxuICBjaGFpbklEOiBudW1iZXI7XG5cbiAgLy8gU3RhcnRTdWJDaGFpbiBzZWN1cml0eURlcG9zaXRcbiAgc2VjdXJpdHlEZXBvc2l0OiBzdHJpbmc7XG5cbiAgLy8gU3RhcnRTdWJDaGFpbiBvcGVyYXRpb25EZXBvc2l0XG4gIG9wZXJhdGlvbkRlcG9zaXQ6IHN0cmluZztcblxuICAvLyBTdGFydFN1YkNoYWluIHN0YXJ0SGVpZ2h0XG4gIHN0YXJ0SGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gU3RhcnRTdWJDaGFpbiBwYXJlbnRIZWlnaHRPZmZzZXRcbiAgcGFyZW50SGVpZ2h0T2Zmc2V0OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTdG9wU3ViQ2hhaW4uXG5leHBvcnQgaW50ZXJmYWNlIElTdG9wU3ViQ2hhaW4ge1xuICAvLyBTdG9wU3ViQ2hhaW4gY2hhaW5JRFxuICBjaGFpbklEOiBudW1iZXI7XG5cbiAgLy8gU3RvcFN1YkNoYWluIHN0b3BIZWlnaHRcbiAgc3RvcEhlaWdodDogbnVtYmVyO1xuXG4gIC8vIFN0b3BTdWJDaGFpbiBzdWJDaGFpbkFkZHJlc3NcbiAgc3ViQ2hhaW5BZGRyZXNzOiBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBNZXJrbGVSb290LlxuZXhwb3J0IGludGVyZmFjZSBJTWVya2xlUm9vdCB7XG4gIC8vIE1lcmtsZVJvb3QgbmFtZVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgLy8gTWVya2xlUm9vdCB2YWx1ZVxuICB2YWx1ZTogQnVmZmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUHV0QmxvY2suXG5leHBvcnQgaW50ZXJmYWNlIElQdXRCbG9jayB7XG4gIC8vIFB1dEJsb2NrIHN1YkNoYWluQWRkcmVzc1xuICBzdWJDaGFpbkFkZHJlc3M6IHN0cmluZztcblxuICAvLyBQdXRCbG9jayBoZWlnaHRcbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gUHV0QmxvY2sgcm9vdHNcbiAgcm9vdHM6IEFycmF5PElNZXJrbGVSb290Pjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIENyZWF0ZURlcG9zaXQuXG5leHBvcnQgaW50ZXJmYWNlIElDcmVhdGVEZXBvc2l0IHtcbiAgLy8gQ3JlYXRlRGVwb3NpdCBjaGFpbklEXG4gIGNoYWluSUQ6IG51bWJlcjtcblxuICAvLyBDcmVhdGVEZXBvc2l0IGFtb3VudFxuICBhbW91bnQ6IHN0cmluZztcblxuICAvLyBDcmVhdGVEZXBvc2l0IHJlY2VpcHRcbiAgcmVjaXBpZW50OiBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTZXR0bGVEZXBvc2l0LlxuZXhwb3J0IGludGVyZmFjZSBJU2V0dGxlRGVwb3NpdCB7XG4gIC8vIFNldHRsZURlcG9zaXQgYW1vdW50XG4gIGFtb3VudDogc3RyaW5nO1xuXG4gIC8vIFNldHRsZURlcG9zaXQgcmVjaXBpZW50XG4gIHJlY2lwaWVudDogc3RyaW5nO1xuXG4gIC8vIFNldHRsZURlcG9zaXQgaW5kZXhcbiAgaW5kZXg6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIENyZWF0ZVBsdW1DaGFpbi5cbmV4cG9ydCBpbnRlcmZhY2UgSUNyZWF0ZVBsdW1DaGFpbiB7fVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgVGVybWluYXRlUGx1bUNoYWluLlxuZXhwb3J0IGludGVyZmFjZSBJVGVybWluYXRlUGx1bUNoYWluIHtcbiAgLy8gVGVybWluYXRlUGx1bUNoYWluIHN1YkNoYWluQWRkcmVzc1xuICBzdWJDaGFpbkFkZHJlc3M6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFBsdW1QdXRCbG9jay5cbmV4cG9ydCBpbnRlcmZhY2UgSVBsdW1QdXRCbG9jayB7XG4gIC8vIFBsdW1QdXRCbG9jayBzdWJDaGFpbkFkZHJlc3NcbiAgc3ViQ2hhaW5BZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gUGx1bVB1dEJsb2NrIGhlaWdodFxuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvLyBQbHVtUHV0QmxvY2sgaGVpZ2h0XG4gIHJvb3RzOiBNYXA8c3RyaW5nLCBCdWZmZXIgfCB7fT47XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBQbHVtQ3JlYXRlRGVwb3NpdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVBsdW1DcmVhdGVEZXBvc2l0IHtcbiAgLy8gUGx1bUNyZWF0ZURlcG9zaXQgc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIFBsdW1DcmVhdGVEZXBvc2l0IGFtb3VudFxuICBhbW91bnQ6IHN0cmluZztcblxuICAvLyBQbHVtQ3JlYXRlRGVwb3NpdCByZWNpcGllbnRcbiAgcmVjaXBpZW50OiBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBQbHVtU3RhcnRFeGl0LlxuZXhwb3J0IGludGVyZmFjZSBJUGx1bVN0YXJ0RXhpdCB7XG4gIC8vIFBsdW1TdGFydEV4aXQgc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIFBsdW1TdGFydEV4aXQgcHJldmlvdXNUcmFuc2ZlclxuICBwcmV2aW91c1RyYW5zZmVyOiBCdWZmZXI7XG5cbiAgLy8gUGx1bVN0YXJ0RXhpdCBwcmV2aW91c1RyYW5zZmVyQmxvY2tQcm9vZlxuICBwcmV2aW91c1RyYW5zZmVyQmxvY2tQcm9vZjogQnVmZmVyO1xuXG4gIC8vIFBsdW1TdGFydEV4aXQgcHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0XG4gIHByZXZpb3VzVHJhbnNmZXJCbG9ja0hlaWdodDogbnVtYmVyO1xuXG4gIC8vIFBsdW1TdGFydEV4aXQgZXhpdFRyYW5zZmVyXG4gIGV4aXRUcmFuc2ZlcjogQnVmZmVyIHwgc3RyaW5nO1xuXG4gIC8vIFBsdW1TdGFydEV4aXQgZXhpdFRyYW5zZmVyQmxvY2tQcm9vZlxuICBleGl0VHJhbnNmZXJCbG9ja1Byb29mOiBCdWZmZXIgfCBzdHJpbmc7XG5cbiAgLy8gUGx1bVN0YXJ0RXhpdCBleGl0VHJhbnNmZXJCbG9ja0hlaWdodFxuICBleGl0VHJhbnNmZXJCbG9ja0hlaWdodDogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUGx1bUNoYWxsZW5nZUV4aXQuXG5leHBvcnQgaW50ZXJmYWNlIElQbHVtQ2hhbGxlbmdlRXhpdCB7XG4gIC8vIFBsdW1DaGFsbGVuZ2VFeGl0IHN1YkNoYWluQWRkcmVzc1xuICBzdWJDaGFpbkFkZHJlc3M6IHN0cmluZztcblxuICAvLyBQbHVtQ2hhbGxlbmdlRXhpdCBjaGFpbklEXG4gIGNvaW5JRDogbnVtYmVyO1xuXG4gIC8vIFBsdW1DaGFsbGVuZ2VFeGl0IGNoYWxsZW5nZVRyYW5zZmVyXG4gIGNoYWxsZW5nZVRyYW5zZmVyOiBCdWZmZXIgfCBzdHJpbmc7XG5cbiAgLy8gUGx1bUNoYWxsZW5nZUV4aXQgY2hhbGxlbmdlVHJhbnNmZXJCbG9ja1Byb29mXG4gIGNoYWxsZW5nZVRyYW5zZmVyQmxvY2tQcm9vZjogQnVmZmVyIHwgc3RyaW5nO1xuXG4gIC8vIFBsdW1DaGFsbGVuZ2VFeGl0IGNoYWxsZW5nZVRyYW5zZmVyQmxvY2tIZWlnaHRcbiAgY2hhbGxlbmdlVHJhbnNmZXJCbG9ja0hlaWdodDogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQge1xuICAvLyBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IHN1YkNoYWluQWRkcmVzc1xuICBzdWJDaGFpbkFkZHJlc3M6IHN0cmluZztcblxuICAvLyBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IGNvaW5JRFxuICBjb2luSUQ6IG51bWJlcjtcblxuICAvLyBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IGNoYWxsZW5nZVRyYW5zZmVyXG4gIGNoYWxsZW5nZVRyYW5zZmVyOiBCdWZmZXI7XG5cbiAgLy8gUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCByZXNwb25zZVRyYW5zZmVyXG4gIHJlc3BvbnNlVHJhbnNmZXI6IEJ1ZmZlcjtcblxuICAvLyBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IHJlc3BvbnNlVHJhbnNmZXJCbG9ja1Byb29mXG4gIHJlc3BvbnNlVHJhbnNmZXJCbG9ja1Byb29mOiBCdWZmZXI7XG5cbiAgLy8gUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCBwcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHRcbiAgcHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBQbHVtRmluYWxpemVFeGl0LlxuZXhwb3J0IGludGVyZmFjZSBJUGx1bUZpbmFsaXplRXhpdCB7XG4gIC8vIFBsdW1GaW5hbGl6ZUV4aXQgc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIFBsdW1GaW5hbGl6ZUV4aXQgY29pbklEXG4gIGNvaW5JRDogbnVtYmVyO1xufVxuXG4vLyBwbHVtIHN1YiBjaGFpbiBBUElzXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUGx1bVNldHRsZURlcG9zaXQuXG5leHBvcnQgaW50ZXJmYWNlIElQbHVtU2V0dGxlRGVwb3NpdCB7XG4gIC8vIFBsdW1TZXR0bGVEZXBvc2l0IGNvaW5JRFxuICBjb2luSUQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFBsdW1UcmFuc2Zlci5cbmV4cG9ydCBpbnRlcmZhY2UgSVBsdW1UcmFuc2ZlciB7XG4gIC8vIFBsdW1UcmFuc2ZlciBjb2luSURcbiAgY29pbklEOiBudW1iZXI7XG5cbiAgLy8gUGx1bVRyYW5zZmVyIGRlbm9taW5hdGlvblxuICBkZW5vbWluYXRpb246IEJ1ZmZlcjtcblxuICAvLyBQbHVtVHJhbnNmZXIgb3duZXJcbiAgb3duZXI6IHN0cmluZztcblxuICAvLyBQbHVtVHJhbnNmZXIgcmVjaXBpZW50XG4gIHJlY2lwaWVudDogc3RyaW5nO1xufVxuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQkVMT1cgQVJFIERFRklOSVRJT05TIEZPUiBCTE9DSyBQUk9EVUNFUiBQUk9UT0NPTFxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gUHJvcGVydGllcyBvZiBhIERlcG9zaXRUb1Jld2FyZGluZ0Z1bmQuXG5leHBvcnQgaW50ZXJmYWNlIElEZXBvc2l0VG9SZXdhcmRpbmdGdW5kIHtcbiAgLy8gRGVwb3NpdFRvUmV3YXJkaW5nRnVuZCBhbW91bnRcbiAgYW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gRGVwb3NpdFRvUmV3YXJkaW5nRnVuZCBkYXRhXG4gIGRhdGE6IEJ1ZmZlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIENsYWltRnJvbVJld2FyZGluZ0Z1bmQuXG5leHBvcnQgaW50ZXJmYWNlIElDbGFpbUZyb21SZXdhcmRpbmdGdW5kIHtcbiAgLy8gQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCBhbW91bnRcbiAgYW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCBkYXRhXG4gIGRhdGE6IEJ1ZmZlciB8IHt9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJld2FyZFR5cGUge1xuICBCbG9ja1Jld2FyZDogMDtcbiAgRXBvY2hSZXdhcmQ6IDE7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTZXRSZXdhcmQuXG5leHBvcnQgaW50ZXJmYWNlIElTZXRSZXdhcmQge1xuICAvLyBTZXRSZXdhcmQgYW1vdW50XG4gIGFtb3VudDogc3RyaW5nO1xuXG4gIC8vIFNldFJld2FyZCBkYXRhXG4gIGRhdGE6IEJ1ZmZlciB8IHt9O1xuXG4gIC8vIFNldFJld2FyZCB0eXBlXG4gIHR5cGU6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdyYW50UmV3YXJkLlxuZXhwb3J0IGludGVyZmFjZSBJR3JhbnRSZXdhcmQge1xuICAvLyBHcmFudFJld2FyZCB0eXBlXG4gIHR5cGU6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNhbmRpZGF0ZSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgdm90ZXM6IEJ1ZmZlciB8IHt9O1xuICBwdWJLZXk6IEJ1ZmZlciB8IHt9O1xuICByZXdhcmRBZGRyZXNzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNhbmRpZGF0ZUxpc3Qge1xuICBjYW5kaWRhdGVzOiBBcnJheTxJQ2FuZGlkYXRlPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUHV0UG9sbFJlc3VsdCB7XG4gIGhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBjYW5kaWRhdGVzOiBJQ2FuZGlkYXRlTGlzdCB8IHVuZGVmaW5lZDtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhbiBBY3Rpb25Db3JlLlxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uQ29yZSB7XG4gIC8vIEFjdGlvbkNvcmUgdmVyc2lvblxuICB2ZXJzaW9uOiBudW1iZXI7XG5cbiAgLy8gQWN0aW9uQ29yZSBub25jZVxuICBub25jZTogc3RyaW5nO1xuXG4gIC8vIEFjdGlvbkNvcmUgZ2FzTGltaXRcbiAgZ2FzTGltaXQ6IHN0cmluZztcblxuICAvLyBBY3Rpb25Db3JlIGdhc1ByaWNlXG4gIGdhc1ByaWNlOiBzdHJpbmc7XG5cbiAgLy8gQWN0aW9uIGRldGFpbCBmaWVsZHNcbiAgLy8gQWN0aW9uQ29yZSB0cmFuc2ZlclxuICB0cmFuc2Zlcj86IElUcmFuc2ZlciB8IHVuZGVmaW5lZDtcbiAgLy8gQWN0aW9uQ29yZSBleGVjdXRpb25cbiAgZXhlY3V0aW9uPzogSUV4ZWN1dGlvbiB8IHVuZGVmaW5lZDtcblxuICAvLyBGZWRDaGFpblxuICAvLyBBY3Rpb25Db3JlIHN0YXJ0U3ViQ2hhaW5cbiAgc3RhcnRTdWJDaGFpbj86IElTdGFydFN1YkNoYWluIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHN0b3BTdWJDaGFpblxuICBzdG9wU3ViQ2hhaW4/OiBJU3RvcFN1YkNoYWluIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHB1dEJsb2NrXG4gIHB1dEJsb2NrPzogSVB1dEJsb2NrIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIGNyZWF0ZURlcG9zaXRcbiAgY3JlYXRlRGVwb3NpdD86IElDcmVhdGVEZXBvc2l0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHNldHRsZURlcG9zaXRcbiAgc2V0dGxlRGVwb3NpdD86IElTZXR0bGVEZXBvc2l0IHwgdW5kZWZpbmVkO1xuXG4gIC8vIFBsdW1DaGFpblxuICAvLyBBY3Rpb25Db3JlIGNyZWF0ZVBsdW1DaGFpblxuICBjcmVhdGVQbHVtQ2hhaW4/OiBJQ3JlYXRlUGx1bUNoYWluIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHRlcm1pbmF0ZVBsdW1DaGFpblxuICB0ZXJtaW5hdGVQbHVtQ2hhaW4/OiBJVGVybWluYXRlUGx1bUNoYWluIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1QdXRCbG9ja1xuICBwbHVtUHV0QmxvY2s/OiBJUGx1bVB1dEJsb2NrIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1DcmVhdGVEZXBvc2l0XG4gIHBsdW1DcmVhdGVEZXBvc2l0PzogSVBsdW1DcmVhdGVEZXBvc2l0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1TdGFydEV4aXRcbiAgcGx1bVN0YXJ0RXhpdD86IElQbHVtU3RhcnRFeGl0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1DaGFsbGVuZ2VFeGl0XG4gIHBsdW1DaGFsbGVuZ2VFeGl0PzogSVBsdW1DaGFsbGVuZ2VFeGl0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXRcbiAgcGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdD86IElQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1GaW5hbGl6ZUV4aXRcbiAgcGx1bUZpbmFsaXplRXhpdD86IElQbHVtRmluYWxpemVFeGl0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1TZXR0bGVEZXBvc2l0XG4gIHBsdW1TZXR0bGVEZXBvc2l0PzogSVBsdW1TZXR0bGVEZXBvc2l0IHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIHBsdW1UcmFuc2ZlclxuICBwbHVtVHJhbnNmZXI/OiBJUGx1bVRyYW5zZmVyIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFJld2FyZGluZyBwcm90b2NvbCBhY3Rpb25zXG4gIC8vIEFjdGlvbkNvcmUgZGVwb3NpdFRvUmV3YXJkaW5nRnVuZFxuICBkZXBvc2l0VG9SZXdhcmRpbmdGdW5kPzogSURlcG9zaXRUb1Jld2FyZGluZ0Z1bmQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgY2xhaW1Gcm9tUmV3YXJkaW5nRnVuZFxuICBjbGFpbUZyb21SZXdhcmRpbmdGdW5kPzogSUNsYWltRnJvbVJld2FyZGluZ0Z1bmQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgZ3JhbnRSZXdhcmRcbiAgZ3JhbnRSZXdhcmQ/OiBJR3JhbnRSZXdhcmQgfCB1bmRlZmluZWQ7XG5cbiAgcHV0UG9sbFJlc3VsdD86IElQdXRQb2xsUmVzdWx0IHwgdW5kZWZpbmVkO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGFuIEFjdGlvbi5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbiB7XG4gIC8vIEFjdGlvbiBjb3JlXG4gIGNvcmU6IElBY3Rpb25Db3JlIHwgdW5kZWZpbmVkO1xuXG4gIC8vIEFjdGlvbiBzZW5kZXJQdWJrZXlcbiAgc2VuZGVyUHViS2V5OiBVaW50OEFycmF5IHwgc3RyaW5nO1xuXG4gIC8vIEFjdGlvbiBzaWduYXR1cmVcbiAgc2lnbmF0dXJlOiBVaW50OEFycmF5IHwgc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25UcmFuc2ZlcihyZXE6IElUcmFuc2ZlciB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYlRyYW5zZmVyID0gbmV3IGFjdGlvblBiLlRyYW5zZmVyKCk7XG4gIHBiVHJhbnNmZXIuc2V0QW1vdW50KHJlcS5hbW91bnQpO1xuICBwYlRyYW5zZmVyLnNldFJlY2lwaWVudChyZXEucmVjaXBpZW50KTtcbiAgcGJUcmFuc2Zlci5zZXRQYXlsb2FkKHJlcS5wYXlsb2FkKTtcbiAgcmV0dXJuIHBiVHJhbnNmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1RpbWVzdGFtcCh0aW1lc3RhbXA6IElUaW1lc3RhbXApOiBUaW1lc3RhbXAge1xuICBjb25zdCB0cyA9IG5ldyBUaW1lc3RhbXAoKTtcbiAgaWYgKHRpbWVzdGFtcCkge1xuICAgIHRzLnNldFNlY29uZHModGltZXN0YW1wLnNlY29uZHMpO1xuICAgIHRzLnNldE5hbm9zKHRpbWVzdGFtcC5uYW5vcyk7XG4gIH1cbiAgcmV0dXJuIHRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25FeGVjdXRpb24oXG4gIHJlcTogSUV4ZWN1dGlvbiB8IHVuZGVmaW5lZFxuKTogYWN0aW9uUGIuRXhlY3V0aW9uIHwgdW5kZWZpbmVkIHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiRXhlY3V0aW9uID0gbmV3IGFjdGlvblBiLkV4ZWN1dGlvbigpO1xuICBwYkV4ZWN1dGlvbi5zZXRBbW91bnQocmVxLmFtb3VudCk7XG4gIHBiRXhlY3V0aW9uLnNldENvbnRyYWN0KHJlcS5jb250cmFjdCk7XG4gIHBiRXhlY3V0aW9uLnNldERhdGEocmVxLmRhdGEpO1xuICByZXR1cm4gcGJFeGVjdXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblN0YXJ0U3ViQ2hhaW4ocmVxOiBJU3RhcnRTdWJDaGFpbiB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHBiU3RhcnRTdWJDaGFpbiA9IG5ldyBhY3Rpb25QYi5TdGFydFN1YkNoYWluKCk7XG4gIHBiU3RhcnRTdWJDaGFpbi5zZXRDaGFpbmlkKHJlcS5jaGFpbklEKTtcbiAgcGJTdGFydFN1YkNoYWluLnNldFNlY3VyaXR5ZGVwb3NpdChyZXEuc2VjdXJpdHlEZXBvc2l0KTtcbiAgcGJTdGFydFN1YkNoYWluLnNldE9wZXJhdGlvbmRlcG9zaXQocmVxLm9wZXJhdGlvbkRlcG9zaXQpO1xuICBwYlN0YXJ0U3ViQ2hhaW4uc2V0U3RhcnRoZWlnaHQocmVxLnN0YXJ0SGVpZ2h0KTtcbiAgcGJTdGFydFN1YkNoYWluLnNldFBhcmVudGhlaWdodG9mZnNldChyZXEucGFyZW50SGVpZ2h0T2Zmc2V0KTtcbiAgcmV0dXJuIHBiU3RhcnRTdWJDaGFpbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uU3RvcFN1YkNoYWluKHJlcTogSVN0b3BTdWJDaGFpbiB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYlN0b3BTdWJDaGFpbiA9IG5ldyBhY3Rpb25QYi5TdG9wU3ViQ2hhaW4oKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYlN0b3BTdWJDaGFpbi5zZXRDaGFpbmlkKHJlcS5jaGFpbklEKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYlN0b3BTdWJDaGFpbi5zZXRTdG9waGVpZ2h0KHJlcS5zdG9wSGVpZ2h0KTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYlN0b3BTdWJDaGFpbi5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHJldHVybiBwYlN0b3BTdWJDaGFpbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uUHV0QmxvY2socmVxOiBJUHV0QmxvY2sgfCB1bmRlZmluZWQpOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3Qgcm9vdHMgPSByZXEucm9vdHM7XG4gIGNvbnN0IHJvb3RMaXN0ID0gW107XG4gIGlmIChyZXEucm9vdHMgJiYgcm9vdHMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcS5yb290cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm9vdEl0ZW0gPSByZXEucm9vdHMgJiYgcmVxLnJvb3RzW2ldO1xuICAgICAgY29uc3QgbWtyb290ID0gbmV3IGFjdGlvblBiLk1lcmtsZVJvb3QoKTtcbiAgICAgIG1rcm9vdC5zZXROYW1lKHJvb3RJdGVtLm5hbWUpO1xuICAgICAgbWtyb290LnNldFZhbHVlKHJvb3RJdGVtLnZhbHVlKTtcbiAgICAgIHJvb3RMaXN0W2ldID0gbWtyb290O1xuICAgIH1cbiAgfVxuICBjb25zdCBwYlB1dEJsb2NrID0gbmV3IGFjdGlvblBiLlB1dEJsb2NrKCk7XG4gIHBiUHV0QmxvY2suc2V0U3ViY2hhaW5hZGRyZXNzKHJlcS5zdWJDaGFpbkFkZHJlc3MpO1xuICBwYlB1dEJsb2NrLnNldEhlaWdodChyZXEuaGVpZ2h0KTtcbiAgcGJQdXRCbG9jay5zZXRSb290c0xpc3Qocm9vdExpc3QpO1xuICByZXR1cm4gcGJQdXRCbG9jaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uQ3JlYXRlRGVwb3NpdChyZXE6IElDcmVhdGVEZXBvc2l0IHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiQ3JlYXRlRGVwb3NpdCA9IG5ldyBhY3Rpb25QYi5DcmVhdGVEZXBvc2l0KCk7XG4gIHBiQ3JlYXRlRGVwb3NpdC5zZXRDaGFpbmlkKHJlcS5jaGFpbklEKTtcbiAgcGJDcmVhdGVEZXBvc2l0LnNldEFtb3VudChyZXEuYW1vdW50KTtcbiAgcGJDcmVhdGVEZXBvc2l0LnNldFJlY2lwaWVudChyZXEucmVjaXBpZW50KTtcbiAgcmV0dXJuIHBiQ3JlYXRlRGVwb3NpdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uU2V0dGxlRGVwb3NpdChyZXE6IElTZXR0bGVEZXBvc2l0IHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiU2V0dGxlRGVwb3NpdCA9IG5ldyBhY3Rpb25QYi5TZXR0bGVEZXBvc2l0KCk7XG4gIHBiU2V0dGxlRGVwb3NpdC5zZXRBbW91bnQocmVxLmFtb3VudCk7XG4gIHBiU2V0dGxlRGVwb3NpdC5zZXRSZWNpcGllbnQocmVxLnJlY2lwaWVudCk7XG4gIHBiU2V0dGxlRGVwb3NpdC5zZXRJbmRleChyZXEuaW5kZXgpO1xuICByZXR1cm4gcGJTZXR0bGVEZXBvc2l0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25DcmVhdGVQbHVtQ2hhaW4oXG4gIHJlcTogSUNyZWF0ZVBsdW1DaGFpbiB8IHVuZGVmaW5lZFxuKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBuZXcgYWN0aW9uUGIuQ3JlYXRlUGx1bUNoYWluKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblRlcm1pbmF0ZVBsdW1DaGFpbihcbiAgcmVxOiBJVGVybWluYXRlUGx1bUNoYWluIHwgdW5kZWZpbmVkXG4pOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJUZXJtaW5hdGVQbHVtQ2hhaW4gPSBuZXcgYWN0aW9uUGIuVGVybWluYXRlUGx1bUNoYWluKCk7XG4gIHBiVGVybWluYXRlUGx1bUNoYWluLnNldFN1YmNoYWluYWRkcmVzcyhyZXEuc3ViQ2hhaW5BZGRyZXNzKTtcbiAgcmV0dXJuIHBiVGVybWluYXRlUGx1bUNoYWluO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QbHVtUHV0QmxvY2socmVxOiBJUGx1bVB1dEJsb2NrIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiUGx1bVB1dEJsb2NrID0gbmV3IGFjdGlvblBiLlBsdW1QdXRCbG9jaygpO1xuICBwYlBsdW1QdXRCbG9jay5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHBiUGx1bVB1dEJsb2NrLnNldEhlaWdodChyZXEuaGVpZ2h0KTtcbiAgcmV0dXJuIHBiUGx1bVB1dEJsb2NrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QbHVtQ3JlYXRlRGVwb3NpdChcbiAgcmVxOiBJUGx1bUNyZWF0ZURlcG9zaXQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHBiUGx1bUNyZWF0ZURlcG9zaXQgPSBuZXcgYWN0aW9uUGIuUGx1bUNyZWF0ZURlcG9zaXQoKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYlBsdW1DcmVhdGVEZXBvc2l0LnNldFN1YmNoYWluYWRkcmVzcyhyZXEuc3ViQ2hhaW5BZGRyZXNzKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYlBsdW1DcmVhdGVEZXBvc2l0LnNldEFtb3VudChyZXEuYW1vdW50KTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYlBsdW1DcmVhdGVEZXBvc2l0LnNldFJlY2lwaWVudChyZXEucmVjaXBpZW50KTtcbiAgcmV0dXJuIHBiUGx1bUNyZWF0ZURlcG9zaXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1TdGFydEV4aXQocmVxOiBJUGx1bVN0YXJ0RXhpdCB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHBiUGx1bVN0YXJ0RXhpdCA9IG5ldyBhY3Rpb25QYi5QbHVtU3RhcnRFeGl0KCk7XG4gIHBiUGx1bVN0YXJ0RXhpdC5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHBiUGx1bVN0YXJ0RXhpdC5zZXRQcmV2aW91c3RyYW5zZmVyKHJlcS5wcmV2aW91c1RyYW5zZmVyKTtcbiAgcGJQbHVtU3RhcnRFeGl0LnNldFByZXZpb3VzdHJhbnNmZXJibG9ja3Byb29mKHJlcS5wcmV2aW91c1RyYW5zZmVyQmxvY2tQcm9vZik7XG4gIHBiUGx1bVN0YXJ0RXhpdC5zZXRQcmV2aW91c3RyYW5zZmVyYmxvY2toZWlnaHQoXG4gICAgcmVxLnByZXZpb3VzVHJhbnNmZXJCbG9ja0hlaWdodFxuICApO1xuICBwYlBsdW1TdGFydEV4aXQuc2V0RXhpdHRyYW5zZmVyKHJlcS5leGl0VHJhbnNmZXIpO1xuICBwYlBsdW1TdGFydEV4aXQuc2V0RXhpdHRyYW5zZmVyYmxvY2twcm9vZihyZXEuZXhpdFRyYW5zZmVyQmxvY2tQcm9vZik7XG4gIHBiUGx1bVN0YXJ0RXhpdC5zZXRFeGl0dHJhbnNmZXJibG9ja2hlaWdodChyZXEuZXhpdFRyYW5zZmVyQmxvY2tIZWlnaHQpO1xuICByZXR1cm4gcGJQbHVtU3RhcnRFeGl0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QbHVtQ2hhbGxlbmdlRXhpdChcbiAgcmVxOiBJUGx1bUNoYWxsZW5nZUV4aXQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHBiUGx1bUNoYWxsZW5nZUV4aXQgPSBuZXcgYWN0aW9uUGIuUGx1bUNoYWxsZW5nZUV4aXQoKTtcbiAgcGJQbHVtQ2hhbGxlbmdlRXhpdC5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHBiUGx1bUNoYWxsZW5nZUV4aXQuc2V0Q29pbmlkKHJlcS5jb2luSUQpO1xuICBwYlBsdW1DaGFsbGVuZ2VFeGl0LnNldENoYWxsZW5nZXRyYW5zZmVyKHJlcS5jaGFsbGVuZ2VUcmFuc2Zlcik7XG4gIHBiUGx1bUNoYWxsZW5nZUV4aXQuc2V0Q2hhbGxlbmdldHJhbnNmZXJibG9ja3Byb29mKFxuICAgIHJlcS5jaGFsbGVuZ2VUcmFuc2ZlckJsb2NrUHJvb2ZcbiAgKTtcbiAgcGJQbHVtQ2hhbGxlbmdlRXhpdC5zZXRDaGFsbGVuZ2V0cmFuc2ZlcmJsb2NraGVpZ2h0KFxuICAgIHJlcS5jaGFsbGVuZ2VUcmFuc2ZlckJsb2NrSGVpZ2h0XG4gICk7XG4gIHJldHVybiBwYlBsdW1DaGFsbGVuZ2VFeGl0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0KFxuICByZXE6IElQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IHwgdW5kZWZpbmVkXG4pOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgPSBuZXcgYWN0aW9uUGIuUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCgpO1xuICBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQuc2V0U3ViY2hhaW5hZGRyZXNzKHJlcS5zdWJDaGFpbkFkZHJlc3MpO1xuICBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQuc2V0Q29pbmlkKHJlcS5jb2luSUQpO1xuICBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQuc2V0Q2hhbGxlbmdldHJhbnNmZXIocmVxLmNoYWxsZW5nZVRyYW5zZmVyKTtcbiAgcGJQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0LnNldFJlc3BvbnNldHJhbnNmZXIocmVxLnJlc3BvbnNlVHJhbnNmZXIpO1xuICBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQuc2V0UmVzcG9uc2V0cmFuc2ZlcmJsb2NrcHJvb2YoXG4gICAgcmVxLnJlc3BvbnNlVHJhbnNmZXJCbG9ja1Byb29mXG4gICk7XG4gIHJldHVybiBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1GaW5hbGl6ZUV4aXQoXG4gIHJlcTogSVBsdW1GaW5hbGl6ZUV4aXQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYlBsdW1GaW5hbGl6ZUV4aXQgPSBuZXcgYWN0aW9uUGIuUGx1bUZpbmFsaXplRXhpdCgpO1xuICBwYlBsdW1GaW5hbGl6ZUV4aXQuc2V0U3ViY2hhaW5hZGRyZXNzKHJlcS5zdWJDaGFpbkFkZHJlc3MpO1xuICBwYlBsdW1GaW5hbGl6ZUV4aXQuc2V0Q29pbmlkKHJlcS5jb2luSUQpO1xuICByZXR1cm4gcGJQbHVtRmluYWxpemVFeGl0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QbHVtU2V0dGxlRGVwb3NpdChcbiAgcmVxOiBJUGx1bVNldHRsZURlcG9zaXQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYlBsdW1TZXR0bGVEZXBvc2l0ID0gbmV3IGFjdGlvblBiLlBsdW1TZXR0bGVEZXBvc2l0KCk7XG4gIHBiUGx1bVNldHRsZURlcG9zaXQuc2V0Q29pbmlkKHJlcS5jb2luSUQpO1xuICByZXR1cm4gcGJQbHVtU2V0dGxlRGVwb3NpdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uUGx1bVRyYW5zZmVyKHJlcTogSVBsdW1UcmFuc2ZlciB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYlBsdW1UcmFuc2ZlciA9IG5ldyBhY3Rpb25QYi5QbHVtVHJhbnNmZXIoKTtcbiAgcGJQbHVtVHJhbnNmZXIuc2V0Q29pbmlkKHJlcS5jb2luSUQpO1xuICBwYlBsdW1UcmFuc2Zlci5zZXREZW5vbWluYXRpb24ocmVxLmRlbm9taW5hdGlvbik7XG4gIHBiUGx1bVRyYW5zZmVyLnNldE93bmVyKHJlcS5vd25lcik7XG4gIHBiUGx1bVRyYW5zZmVyLnNldFJlY2lwaWVudChyZXEucmVjaXBpZW50KTtcbiAgcmV0dXJuIHBiUGx1bVRyYW5zZmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25EZXBvc2l0VG9SZXdhcmRpbmdGdW5kKFxuICByZXE6IElEZXBvc2l0VG9SZXdhcmRpbmdGdW5kIHwgdW5kZWZpbmVkXG4pOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJEZXBvc2l0VG9SZXdhcmRpbmdGdW5kID0gbmV3IGFjdGlvblBiLkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQoKTtcbiAgcGJEZXBvc2l0VG9SZXdhcmRpbmdGdW5kLnNldEFtb3VudChyZXEuYW1vdW50KTtcbiAgcGJEZXBvc2l0VG9SZXdhcmRpbmdGdW5kLnNldERhdGEocmVxLmRhdGEpO1xuICByZXR1cm4gcGJEZXBvc2l0VG9SZXdhcmRpbmdGdW5kO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25DbGFpbUZyb21SZXdhcmRpbmdGdW5kKFxuICByZXE6IElDbGFpbUZyb21SZXdhcmRpbmdGdW5kIHwgdW5kZWZpbmVkXG4pOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJDbGFpbUZyb21SZXdhcmRpbmdGdW5kID0gbmV3IGFjdGlvblBiLkNsYWltRnJvbVJld2FyZGluZ0Z1bmQoKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBwYkNsYWltRnJvbVJld2FyZGluZ0Z1bmQuc2V0QW1vdW50KHJlcS5hbW91bnQpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZC5zZXREYXRhKHJlcS5kYXRhKTtcbiAgcmV0dXJuIHBiQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uR3JhbnRSZXdhcmQocmVxOiBJR3JhbnRSZXdhcmQgfCB1bmRlZmluZWQpOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJHcmFudFJld2FyZCA9IG5ldyBhY3Rpb25QYi5HcmFudFJld2FyZCgpO1xuICBwYkdyYW50UmV3YXJkLnNldFR5cGUocmVxLnR5cGUpO1xuICByZXR1cm4gcGJHcmFudFJld2FyZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uKHJlcTogSUFjdGlvbik6IGFueSB7XG4gIGNvbnN0IHBiQWN0aW9uQ29yZSA9IG5ldyBhY3Rpb25QYi5BY3Rpb25Db3JlKCk7XG5cbiAgY29uc3QgY29yZSA9IHJlcSAmJiByZXEuY29yZTtcbiAgaWYgKGNvcmUpIHtcbiAgICBwYkFjdGlvbkNvcmUuc2V0VmVyc2lvbihjb3JlLnZlcnNpb24pO1xuICAgIHBiQWN0aW9uQ29yZS5zZXROb25jZShOdW1iZXIoY29yZS5ub25jZSkpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRHYXNsaW1pdChOdW1iZXIoY29yZS5nYXNMaW1pdCkpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRHYXNwcmljZShjb3JlLmdhc1ByaWNlKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0VHJhbnNmZXIodG9BY3Rpb25UcmFuc2Zlcihjb3JlLnRyYW5zZmVyKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldEV4ZWN1dGlvbih0b0FjdGlvbkV4ZWN1dGlvbihjb3JlLmV4ZWN1dGlvbikpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRTdGFydHN1YmNoYWluKHRvQWN0aW9uU3RhcnRTdWJDaGFpbihjb3JlLnN0YXJ0U3ViQ2hhaW4pKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0U3RvcHN1YmNoYWluKHRvQWN0aW9uU3RvcFN1YkNoYWluKGNvcmUuc3RvcFN1YkNoYWluKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldFB1dGJsb2NrKHRvQWN0aW9uUHV0QmxvY2soY29yZS5wdXRCbG9jaykpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRDcmVhdGVkZXBvc2l0KHRvQWN0aW9uQ3JlYXRlRGVwb3NpdChjb3JlLmNyZWF0ZURlcG9zaXQpKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0U2V0dGxlZGVwb3NpdCh0b0FjdGlvblNldHRsZURlcG9zaXQoY29yZS5zZXR0bGVEZXBvc2l0KSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldENyZWF0ZXBsdW1jaGFpbihcbiAgICAgIHRvQWN0aW9uQ3JlYXRlUGx1bUNoYWluKGNvcmUuY3JlYXRlUGx1bUNoYWluKVxuICAgICk7XG4gICAgcGJBY3Rpb25Db3JlLnNldFRlcm1pbmF0ZXBsdW1jaGFpbihcbiAgICAgIHRvQWN0aW9uVGVybWluYXRlUGx1bUNoYWluKGNvcmUudGVybWluYXRlUGx1bUNoYWluKVxuICAgICk7XG4gICAgcGJBY3Rpb25Db3JlLnNldFBsdW1wdXRibG9jayh0b0FjdGlvblBsdW1QdXRCbG9jayhjb3JlLnBsdW1QdXRCbG9jaykpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtY3JlYXRlZGVwb3NpdChcbiAgICAgIHRvQWN0aW9uUGx1bUNyZWF0ZURlcG9zaXQoY29yZS5wbHVtQ3JlYXRlRGVwb3NpdClcbiAgICApO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtc3RhcnRleGl0KHRvQWN0aW9uUGx1bVN0YXJ0RXhpdChjb3JlLnBsdW1TdGFydEV4aXQpKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UGx1bWNoYWxsZW5nZWV4aXQoXG4gICAgICB0b0FjdGlvblBsdW1DaGFsbGVuZ2VFeGl0KGNvcmUucGx1bUNoYWxsZW5nZUV4aXQpXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UGx1bXJlc3BvbnNlY2hhbGxlbmdlZXhpdChcbiAgICAgIHRvQWN0aW9uUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdChjb3JlLnBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQpXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UGx1bWZpbmFsaXplZXhpdChcbiAgICAgIHRvQWN0aW9uUGx1bUZpbmFsaXplRXhpdChjb3JlLnBsdW1GaW5hbGl6ZUV4aXQpXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UGx1bXNldHRsZWRlcG9zaXQoXG4gICAgICB0b0FjdGlvblBsdW1TZXR0bGVEZXBvc2l0KGNvcmUucGx1bVNldHRsZURlcG9zaXQpXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UGx1bXRyYW5zZmVyKHRvQWN0aW9uUGx1bVRyYW5zZmVyKGNvcmUucGx1bVRyYW5zZmVyKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldERlcG9zaXR0b3Jld2FyZGluZ2Z1bmQoXG4gICAgICB0b0FjdGlvbkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQoY29yZS5kZXBvc2l0VG9SZXdhcmRpbmdGdW5kKVxuICAgICk7XG4gICAgcGJBY3Rpb25Db3JlLnNldENsYWltZnJvbXJld2FyZGluZ2Z1bmQoXG4gICAgICB0b0FjdGlvbkNsYWltRnJvbVJld2FyZGluZ0Z1bmQoY29yZS5jbGFpbUZyb21SZXdhcmRpbmdGdW5kKVxuICAgICk7XG4gICAgcGJBY3Rpb25Db3JlLnNldEdyYW50cmV3YXJkKHRvQWN0aW9uR3JhbnRSZXdhcmQoY29yZS5ncmFudFJld2FyZCkpO1xuICB9XG5cbiAgY29uc3QgcGJBY3Rpb24gPSBuZXcgYWN0aW9uUGIuQWN0aW9uKCk7XG4gIHBiQWN0aW9uLnNldENvcmUocGJBY3Rpb25Db3JlKTtcblxuICBpZiAocmVxLnNlbmRlclB1YktleSkge1xuICAgIHBiQWN0aW9uLnNldFNlbmRlcnB1YmtleShyZXEuc2VuZGVyUHViS2V5KTtcbiAgfVxuXG4gIGlmIChyZXEuc2lnbmF0dXJlKSB7XG4gICAgcGJBY3Rpb24uc2V0U2lnbmF0dXJlKHJlcS5zaWduYXR1cmUpO1xuICB9XG5cbiAgcmV0dXJuIHBiQWN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25JbmZvIHtcbiAgYWN0aW9uOiBJQWN0aW9uO1xuICBhY3RIYXNoOiBzdHJpbmc7XG4gIGJsa0hhc2g6IHN0cmluZztcbiAgdGltZXN0YW1wOiBJVGltZXN0YW1wO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRBY3Rpb25zUmVzcG9uc2Uge1xuICBhY3Rpb25JbmZvOiBBcnJheTxJQWN0aW9uSW5mbz47XG59XG5cbmV4cG9ydCBjb25zdCBHZXRBY3Rpb25zUmVxdWVzdCA9IHtcbiAgYnlBZGRyVG8oYnlBZGRyOiBJR2V0QWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxQnlBZGRyID0gbmV3IGFwaVBiLkdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0KCk7XG4gICAgaWYgKGJ5QWRkci5hZGRyZXNzKSB7XG4gICAgICBwYlJlcUJ5QWRkci5zZXRBZGRyZXNzKGJ5QWRkci5hZGRyZXNzKTtcbiAgICB9XG4gICAgaWYgKGJ5QWRkci5zdGFydCkge1xuICAgICAgcGJSZXFCeUFkZHIuc2V0U3RhcnQoYnlBZGRyLnN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGJ5QWRkci5jb3VudCkge1xuICAgICAgcGJSZXFCeUFkZHIuc2V0Q291bnQoYnlBZGRyLmNvdW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxQnlBZGRyO1xuICB9LFxuXG4gIGJ5QmxrVG8oYnlCbGs6IElHZXRBY3Rpb25zQnlCbG9ja1JlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxQnlCbGsgPSBuZXcgYXBpUGIuR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0KCk7XG4gICAgaWYgKGJ5QmxrLmJsa0hhc2gpIHtcbiAgICAgIHBiUmVxQnlCbGsuc2V0QmxraGFzaChieUJsay5ibGtIYXNoKTtcbiAgICB9XG4gICAgaWYgKGJ5QmxrLnN0YXJ0KSB7XG4gICAgICBwYlJlcUJ5QmxrLnNldFN0YXJ0KGJ5QmxrLnN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGJ5QmxrLmNvdW50KSB7XG4gICAgICBwYlJlcUJ5QmxrLnNldENvdW50KGJ5QmxrLmNvdW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxQnlCbGs7XG4gIH0sXG5cbiAgYnlIYXNoVG8oYnlIYXNoOiBJR2V0QWN0aW9uc0J5SGFzaFJlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxQnlIYXNoID0gbmV3IGFwaVBiLkdldEFjdGlvbkJ5SGFzaFJlcXVlc3QoKTtcbiAgICBpZiAoYnlIYXNoLmFjdGlvbkhhc2gpIHtcbiAgICAgIHBiUmVxQnlIYXNoLnNldEFjdGlvbmhhc2goYnlIYXNoLmFjdGlvbkhhc2gpO1xuICAgIH1cbiAgICBpZiAoYnlIYXNoLmNoZWNraW5nUGVuZGluZykge1xuICAgICAgcGJSZXFCeUhhc2guc2V0Q2hlY2twZW5kaW5nKGJ5SGFzaC5jaGVja2luZ1BlbmRpbmcpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXFCeUhhc2g7XG4gIH0sXG5cbiAgYnlJbmRleFRvKGJ5SW5kZXg6IElHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxQnlJbmRleCA9IG5ldyBhcGlQYi5HZXRBY3Rpb25zQnlJbmRleFJlcXVlc3QoKTtcbiAgICBpZiAoYnlJbmRleC5zdGFydCkge1xuICAgICAgcGJSZXFCeUluZGV4LnNldFN0YXJ0KGJ5SW5kZXguc3RhcnQpO1xuICAgIH1cbiAgICBpZiAoYnlJbmRleC5jb3VudCkge1xuICAgICAgcGJSZXFCeUluZGV4LnNldENvdW50KGJ5SW5kZXguY291bnQpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXFCeUluZGV4O1xuICB9LFxuXG4gIHVuY29uZmlybWVkQnlBZGRyVG8oXG4gICAgdW5jb25maXJtZWRCeUFkZHI6IElHZXRVbmNvbmZpcm1lZEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0XG4gICk6IGFueSB7XG4gICAgY29uc3QgcGJSZXFVbmNvbmZpcm1lZEJ5QWRkciA9IG5ldyBhcGlQYi5HZXRVbmNvbmZpcm1lZEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0KCk7XG4gICAgaWYgKHVuY29uZmlybWVkQnlBZGRyLnN0YXJ0KSB7XG4gICAgICBwYlJlcVVuY29uZmlybWVkQnlBZGRyLnNldFN0YXJ0KHVuY29uZmlybWVkQnlBZGRyLnN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKHVuY29uZmlybWVkQnlBZGRyLmNvdW50KSB7XG4gICAgICBwYlJlcVVuY29uZmlybWVkQnlBZGRyLnNldENvdW50KHVuY29uZmlybWVkQnlBZGRyLmNvdW50KTtcbiAgICB9XG4gICAgaWYgKHVuY29uZmlybWVkQnlBZGRyLmFkZHJlc3MpIHtcbiAgICAgIHBiUmVxVW5jb25maXJtZWRCeUFkZHIuc2V0QWRkcmVzcyh1bmNvbmZpcm1lZEJ5QWRkci5hZGRyZXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxVW5jb25maXJtZWRCeUFkZHI7XG4gIH0sXG4gIHRvKHJlcTogSUdldEFjdGlvbnNSZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5HZXRBY3Rpb25zUmVxdWVzdCgpO1xuICAgIGlmIChyZXEuYnlBZGRyKSB7XG4gICAgICBwYlJlcS5zZXRCeWFkZHIoR2V0QWN0aW9uc1JlcXVlc3QuYnlBZGRyVG8ocmVxLmJ5QWRkcikpO1xuICAgIH1cbiAgICBpZiAocmVxLmJ5QmxrKSB7XG4gICAgICBwYlJlcS5zZXRCeWJsayhHZXRBY3Rpb25zUmVxdWVzdC5ieUJsa1RvKHJlcS5ieUJsaykpO1xuICAgIH1cbiAgICBpZiAocmVxLmJ5SGFzaCkge1xuICAgICAgcGJSZXEuc2V0QnloYXNoKEdldEFjdGlvbnNSZXF1ZXN0LmJ5SGFzaFRvKHJlcS5ieUhhc2gpKTtcbiAgICB9XG4gICAgaWYgKHJlcS5ieUluZGV4KSB7XG4gICAgICBwYlJlcS5zZXRCeWluZGV4KEdldEFjdGlvbnNSZXF1ZXN0LmJ5SW5kZXhUbyhyZXEuYnlJbmRleCkpO1xuICAgIH1cbiAgICBpZiAocmVxLnVuY29uZmlybWVkQnlBZGRyKSB7XG4gICAgICBwYlJlcS5zZXRVbmNvbmZpcm1lZGJ5YWRkcihcbiAgICAgICAgR2V0QWN0aW9uc1JlcXVlc3QudW5jb25maXJtZWRCeUFkZHJUbyhyZXEudW5jb25maXJtZWRCeUFkZHIpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXE7XG4gIH0sXG5cbiAgZnJvbVRyYW5zZmVyKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCB0cmFuc2ZlckRhdGEgPSBwYlJlcztcbiAgICBpZiAocGJSZXMpIHtcbiAgICAgIHRyYW5zZmVyRGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiBwYlJlcy5nZXRBbW91bnQoKSxcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5nZXRSZWNpcGllbnQoKSxcbiAgICAgICAgcGF5bG9hZDogcGJSZXMuZ2V0UGF5bG9hZCgpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdHJhbnNmZXJEYXRhO1xuICB9LFxuXG4gIGZyb21Wb3RlKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCB2b3RlRGF0YSA9IHBiUmVzO1xuICAgIGlmICh2b3RlRGF0YSkge1xuICAgICAgdm90ZURhdGEgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogcGJSZXMuZ2V0VGltZXN0YW1wKCksXG4gICAgICAgIHZvdGVlQWRkcmVzczogcGJSZXMuZ2V0Vm90ZWVhZGRyZXNzKClcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB2b3RlRGF0YTtcbiAgfSxcblxuICBmcm9tRXhlY3V0aW9uKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBleGVjdXRpb25EYXRhID0gcGJSZXM7XG4gICAgaWYgKGV4ZWN1dGlvbkRhdGEpIHtcbiAgICAgIGV4ZWN1dGlvbkRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogcGJSZXMuZ2V0QW1vdW50KCksXG4gICAgICAgIGNvbnRyYWN0OiBwYlJlcy5nZXRDb250cmFjdCgpLFxuICAgICAgICBkYXRhOiBwYlJlcy5nZXREYXRhKClcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBleGVjdXRpb25EYXRhO1xuICB9LFxuXG4gIGZyb21TdGFydFN1YkNoYWluKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBzdGFydFN1YkNoYWluRGF0YSA9IHBiUmVzO1xuICAgIGlmIChzdGFydFN1YkNoYWluRGF0YSkge1xuICAgICAgc3RhcnRTdWJDaGFpbkRhdGEgPSB7XG4gICAgICAgIGNoYWluSUQ6IHBiUmVzLmNoYWluSUQsXG4gICAgICAgIHNlY3VyaXR5RGVwb3NpdDogcGJSZXMuc2VjdXJpdHlEZXBvc2l0LFxuICAgICAgICBvcGVyYXRpb25EZXBvc2l0OiBwYlJlcy5vcGVyYXRpb25EZXBvc2l0LFxuICAgICAgICBzdGFydEhlaWdodDogcGJSZXMuc3RhcnRIZWlnaHQsXG4gICAgICAgIHBhcmVudEhlaWdodE9mZnNldDogcGJSZXMucGFyZW50SGVpZ2h0T2Zmc2V0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnRTdWJDaGFpbkRhdGE7XG4gIH0sXG5cbiAgZnJvbVN0b3BTdWJDaGFpbihwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgc3RvcFN1YkNoYWluRGF0YSA9IHBiUmVzO1xuICAgIGlmIChzdG9wU3ViQ2hhaW5EYXRhKSB7XG4gICAgICBzdG9wU3ViQ2hhaW5EYXRhID0ge1xuICAgICAgICBjaGFpbklEOiBwYlJlcy5jaGFpbklELFxuICAgICAgICBzdG9wSGVpZ2h0OiBwYlJlcy5zdG9wSGVpZ2h0LFxuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzc1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3BTdWJDaGFpbkRhdGE7XG4gIH0sXG5cbiAgZnJvbVB1dEJsb2NrKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBwdXRCbG9ja0RhdGEgPSBwYlJlcztcbiAgICBpZiAocHV0QmxvY2tEYXRhKSB7XG4gICAgICBjb25zdCByb290c0RhdGEgPSBwYlJlcy5yb290cztcbiAgICAgIGlmIChyb290c0RhdGEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYlJlcy5yb290cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJvb3RzRGF0YVtpXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IHBiUmVzLnJvb3RzW2ldLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogcGJSZXMucm9vdHNbaV0udmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwdXRCbG9ja0RhdGEgPSB7XG4gICAgICAgIHN1YkNoYWluQWRkcmVzczogcGJSZXMuc3ViQ2hhaW5BZGRyZXNzLFxuICAgICAgICBoZWlnaHQ6IHBiUmVzLmhlaWdodCxcbiAgICAgICAgcm9vdHM6IHJvb3RzRGF0YVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHB1dEJsb2NrRGF0YTtcbiAgfSxcblxuICBmcm9tQ3JlYXRlRGVwb3NpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgY3JlYXRlRGVwb3NpdERhdGEgPSBwYlJlcztcbiAgICBpZiAoY3JlYXRlRGVwb3NpdERhdGEpIHtcbiAgICAgIGNyZWF0ZURlcG9zaXREYXRhID0ge1xuICAgICAgICBjaGFpbklEOiBwYlJlcy5jaGFpbklELFxuICAgICAgICBhbW91bnQ6IHBiUmVzLmFtb3VudCxcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5yZWNpcGllbnRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVEZXBvc2l0RGF0YTtcbiAgfSxcblxuICBmcm9tU2V0dGxlRGVwb3NpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgc2V0dGxlRGVwb3NpdERhdGEgPSBwYlJlcztcbiAgICBpZiAoc2V0dGxlRGVwb3NpdERhdGEpIHtcbiAgICAgIHNldHRsZURlcG9zaXREYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHBiUmVzLmFtb3VudCxcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5yZWNpcGllbnQsXG4gICAgICAgIGluZGV4OiBwYlJlcy5pbmRleFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHNldHRsZURlcG9zaXREYXRhO1xuICB9LFxuXG4gIGZyb21DcmVhdGVQbHVtQ2hhaW4ocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IGNyZWF0ZVBsdW1DaGFpbkRhdGEgPSBwYlJlcztcbiAgICBpZiAoY3JlYXRlUGx1bUNoYWluRGF0YSkge1xuICAgICAgY3JlYXRlUGx1bUNoYWluRGF0YSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUGx1bUNoYWluRGF0YTtcbiAgfSxcblxuICBmcm9tVGVybWluYXRlUGx1bUNoYWluKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCB0ZXJtaW5hdGVQbHVtQ2hhaW5EYXRhID0gcGJSZXM7XG4gICAgaWYgKHRlcm1pbmF0ZVBsdW1DaGFpbkRhdGEpIHtcbiAgICAgIHRlcm1pbmF0ZVBsdW1DaGFpbkRhdGEgPSB7XG4gICAgICAgIHN1YkNoYWluQWRkcmVzczogcGJSZXMuc3ViQ2hhaW5BZGRyZXNzXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGVybWluYXRlUGx1bUNoYWluRGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bVB1dEJsb2NrKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBwbHVtUHV0QmxvY2tEYXRhID0gcGJSZXM7XG4gICAgaWYgKHBsdW1QdXRCbG9ja0RhdGEpIHtcbiAgICAgIHBsdW1QdXRCbG9ja0RhdGEgPSB7XG4gICAgICAgIHN1YkNoYWluQWRkcmVzczogcGJSZXMuc3ViQ2hhaW5BZGRyZXNzLFxuICAgICAgICBoZWlnaHQ6IHBiUmVzLmhlaWdodCxcbiAgICAgICAgcm9vdHM6IHBiUmVzLnJvb3RzXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcGx1bVB1dEJsb2NrRGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bUNyZWF0ZURlcG9zaXQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHBsdW1DcmVhdGVEZXBvc2l0RGF0YSA9IHBiUmVzO1xuICAgIGlmIChwbHVtQ3JlYXRlRGVwb3NpdERhdGEpIHtcbiAgICAgIHBsdW1DcmVhdGVEZXBvc2l0RGF0YSA9IHtcbiAgICAgICAgc3ViQ2hhaW5BZGRyZXNzOiBwYlJlcy5zdWJDaGFpbkFkZHJlc3MsXG4gICAgICAgIGFtb3VudDogcGJSZXMuYW1vdW50LFxuICAgICAgICByZWNpcGllbnQ6IHBiUmVzLnJlY2lwaWVudFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBsdW1DcmVhdGVEZXBvc2l0RGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bVN0YXJ0RXhpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bVN0YXJ0RXhpdERhdGEgPSBwYlJlcztcbiAgICBpZiAocGx1bVN0YXJ0RXhpdERhdGEpIHtcbiAgICAgIHBsdW1TdGFydEV4aXREYXRhID0ge1xuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzcyxcbiAgICAgICAgcHJldmlvdXNUcmFuc2ZlcjogcGJSZXMucHJldmlvdXNUcmFuc2ZlcixcbiAgICAgICAgcHJldmlvdXNUcmFuc2ZlckJsb2NrUHJvb2Y6IHBiUmVzLnByZXZpb3VzVHJhbnNmZXJCbG9ja1Byb29mLFxuICAgICAgICBwcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHQ6IHBiUmVzLnByZXZpb3VzVHJhbnNmZXJCbG9ja0hlaWdodCxcbiAgICAgICAgZXhpdFRyYW5zZmVyOiBwYlJlcy5leGl0VHJhbnNmZXIsXG4gICAgICAgIGV4aXRUcmFuc2ZlckJsb2NrUHJvb2Y6IHBiUmVzLmV4aXRUcmFuc2ZlckJsb2NrUHJvb2YsXG4gICAgICAgIGV4aXRUcmFuc2ZlckJsb2NrSGVpZ2h0OiBwYlJlcy5leGl0VHJhbnNmZXJCbG9ja0hlaWdodFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBsdW1TdGFydEV4aXREYXRhO1xuICB9LFxuXG4gIGZyb21QbHVtQ2hhbGxlbmdlRXhpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bUNoYWxsZW5nZUV4aXREYXRhID0gcGJSZXM7XG4gICAgaWYgKHBsdW1DaGFsbGVuZ2VFeGl0RGF0YSkge1xuICAgICAgcGx1bUNoYWxsZW5nZUV4aXREYXRhID0ge1xuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzcyxcbiAgICAgICAgY29pbklEOiBwYlJlcy5jb2luSUQsXG4gICAgICAgIGNoYWxsZW5nZVRyYW5zZmVyOiBwYlJlcy5jaGFsbGVuZ2VUcmFuc2ZlcixcbiAgICAgICAgY2hhbGxlbmdlVHJhbnNmZXJCbG9ja1Byb29mOiBwYlJlcy5jaGFsbGVuZ2VUcmFuc2ZlckJsb2NrUHJvb2YsXG4gICAgICAgIGNoYWxsZW5nZVRyYW5zZmVyQmxvY2tIZWlnaHQ6IHBiUmVzLmNoYWxsZW5nZVRyYW5zZmVyQmxvY2tIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtQ2hhbGxlbmdlRXhpdERhdGE7XG4gIH0sXG5cbiAgZnJvbVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXREYXRhID0gcGJSZXM7XG4gICAgaWYgKHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXREYXRhKSB7XG4gICAgICBwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0RGF0YSA9IHtcbiAgICAgICAgc3ViQ2hhaW5BZGRyZXNzOiBwYlJlcy5zdWJDaGFpbkFkZHJlc3MsXG4gICAgICAgIGNvaW5JRDogcGJSZXMuY29pbklELFxuICAgICAgICBjaGFsbGVuZ2VUcmFuc2ZlcjogcGJSZXMuY2hhbGxlbmdlVHJhbnNmZXIsXG4gICAgICAgIHJlc3BvbnNlVHJhbnNmZXI6IHBiUmVzLnJlc3BvbnNlVHJhbnNmZXIsXG4gICAgICAgIHJlc3BvbnNlVHJhbnNmZXJCbG9ja1Byb29mOiBwYlJlcy5yZXNwb25zZVRyYW5zZmVyQmxvY2tQcm9vZixcbiAgICAgICAgcHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0OiBwYlJlcy5wcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0RGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bUZpbmFsaXplRXhpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bUZpbmFsaXplRXhpdERhdGEgPSBwYlJlcztcbiAgICBpZiAocGx1bUZpbmFsaXplRXhpdERhdGEpIHtcbiAgICAgIHBsdW1GaW5hbGl6ZUV4aXREYXRhID0ge1xuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzcyxcbiAgICAgICAgY29pbklEOiBwYlJlcy5jb2luSURcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtRmluYWxpemVFeGl0RGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bVNldHRsZURlcG9zaXQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHBsdW1TZXR0bGVEZXBvc2l0RGF0YSA9IHBiUmVzO1xuICAgIGlmIChwbHVtU2V0dGxlRGVwb3NpdERhdGEpIHtcbiAgICAgIHBsdW1TZXR0bGVEZXBvc2l0RGF0YSA9IHtcbiAgICAgICAgY29pbklEOiBwYlJlcy5jb2luSURcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtU2V0dGxlRGVwb3NpdERhdGE7XG4gIH0sXG5cbiAgZnJvbVBsdW1UcmFuc2ZlcihwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bVRyYW5zZmVyRGF0YSA9IHBiUmVzO1xuICAgIGlmIChwbHVtVHJhbnNmZXJEYXRhKSB7XG4gICAgICBwbHVtVHJhbnNmZXJEYXRhID0ge1xuICAgICAgICBjb2luSUQ6IHBiUmVzLmNvaW5JRCxcbiAgICAgICAgZGVub21pbmF0aW9uOiBwYlJlcy5kZW5vbWluYXRpb24sXG4gICAgICAgIG93bmVyOiBwYlJlcy5vd25lcixcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5yZWNpcGllbnRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtVHJhbnNmZXJEYXRhO1xuICB9LFxuXG4gIGZyb21EZXBvc2l0VG9SZXdhcmRpbmdGdW5kKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBkZXBvc2l0VG9SZXdhcmRpbmdGdW5kRGF0YSA9IHBiUmVzO1xuICAgIGlmIChkZXBvc2l0VG9SZXdhcmRpbmdGdW5kRGF0YSkge1xuICAgICAgZGVwb3NpdFRvUmV3YXJkaW5nRnVuZERhdGEgPSB7XG4gICAgICAgIGFtb3VudDogcGJSZXMuYW1vdW50LFxuICAgICAgICBkYXRhOiBwYlJlcy5kYXRhXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZGVwb3NpdFRvUmV3YXJkaW5nRnVuZERhdGE7XG4gIH0sXG5cbiAgZnJvbUNsYWltRnJvbVJld2FyZGluZ0Z1bmQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IGNsYWltRnJvbVJld2FyZGluZ0Z1bmREYXRhID0gcGJSZXM7XG4gICAgaWYgKGNsYWltRnJvbVJld2FyZGluZ0Z1bmREYXRhKSB7XG4gICAgICBjbGFpbUZyb21SZXdhcmRpbmdGdW5kRGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiBwYlJlcy5hbW91bnQsXG4gICAgICAgIGRhdGE6IHBiUmVzLmRhdGFcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjbGFpbUZyb21SZXdhcmRpbmdGdW5kRGF0YTtcbiAgfSxcblxuICBmcm9tU2V0UmV3YXJkKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBzZXRSZXdhcmREYXRhID0gcGJSZXM7XG4gICAgaWYgKHNldFJld2FyZERhdGEpIHtcbiAgICAgIHNldFJld2FyZERhdGEgPSB7XG4gICAgICAgIGFtb3VudDogcGJSZXMuYW1vdW50LFxuICAgICAgICBkYXRhOiBwYlJlcy5kYXRhLFxuICAgICAgICB0eXBlOiBwYlJlcy50eXBlXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc2V0UmV3YXJkRGF0YTtcbiAgfSxcblxuICBmcm9tR3JhbnRSZXdhcmQoXG4gICAgcGJSZXM6IGFjdGlvblBiLkdyYW50UmV3YXJkIHwgdW5kZWZpbmVkXG4gICk6IElHcmFudFJld2FyZCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFwYlJlcykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHBiUmVzLmdldFR5cGUoKSxcbiAgICAgIGhlaWdodDogcGJSZXMuZ2V0SGVpZ2h0KClcbiAgICB9O1xuICB9LFxuXG4gIGdldFB1dFBvbGxSZXN1bHQocmVxOiBQdXRQb2xsUmVzdWx0IHwgdW5kZWZpbmVkKTogSVB1dFBvbGxSZXN1bHQgfCB1bmRlZmluZWQge1xuICAgIGlmICghcmVxKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZXQgY2FuZGlkYXRlTGlzdDogSUNhbmRpZGF0ZUxpc3QgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmF3Q2FuZGlkYXRlcyA9IHJlcS5nZXRDYW5kaWRhdGVzKCk7XG4gICAgaWYgKHJhd0NhbmRpZGF0ZXMpIHtcbiAgICAgIGNhbmRpZGF0ZUxpc3QgPSB7XG4gICAgICAgIGNhbmRpZGF0ZXM6IFtdXG4gICAgICB9O1xuICAgICAgY29uc3QgcmF3Q2FuZGlkYXRlc0xpc3QgPSByYXdDYW5kaWRhdGVzLmdldENhbmRpZGF0ZXNMaXN0KCk7XG4gICAgICBpZiAocmF3Q2FuZGlkYXRlc0xpc3QpIHtcbiAgICAgICAgZm9yIChjb25zdCByYXdDYW5kaWRhdGUgb2YgcmF3Q2FuZGlkYXRlc0xpc3QpIHtcbiAgICAgICAgICBjYW5kaWRhdGVMaXN0LmNhbmRpZGF0ZXMucHVzaCh7XG4gICAgICAgICAgICBhZGRyZXNzOiByYXdDYW5kaWRhdGUuZ2V0QWRkcmVzcygpLFxuICAgICAgICAgICAgdm90ZXM6IHJhd0NhbmRpZGF0ZS5nZXRWb3RlcygpLFxuICAgICAgICAgICAgcHViS2V5OiByYXdDYW5kaWRhdGUuZ2V0UHVia2V5KCksXG4gICAgICAgICAgICByZXdhcmRBZGRyZXNzOiByYXdDYW5kaWRhdGUuZ2V0UmV3YXJkYWRkcmVzcygpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogcmVxLmdldEhlaWdodCgpLFxuICAgICAgY2FuZGlkYXRlczogY2FuZGlkYXRlTGlzdFxuICAgIH07XG4gIH0sXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1mdW5jLWJvZHktbGVuZ3RoXG4gIGZyb20ocGJSZXM6IEdldEFjdGlvbnNSZXNwb25zZSk6IElHZXRBY3Rpb25zUmVzcG9uc2Uge1xuICAgIGNvbnN0IHJlcyA9ICh7XG4gICAgICBhY3Rpb25JbmZvOiBbXVxuICAgIH0gYXMgYW55KSBhcyBJR2V0QWN0aW9uc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHJhd0FjdGlvbkluZm9MaXN0ID0gcGJSZXMuZ2V0QWN0aW9uaW5mb0xpc3QoKTtcbiAgICBpZiAoIXJhd0FjdGlvbkluZm9MaXN0KSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmF3QWN0aW9uSW5mbyBvZiByYXdBY3Rpb25JbmZvTGlzdCkge1xuICAgICAgY29uc3QgYWN0aW9uSW5mbyA9ICh7XG4gICAgICAgIGFjdEhhc2g6IHJhd0FjdGlvbkluZm8uZ2V0QWN0aGFzaCgpLFxuICAgICAgICBibGtIYXNoOiByYXdBY3Rpb25JbmZvLmdldEJsa2hhc2goKSxcbiAgICAgICAgdGltZXN0YW1wOiByYXdBY3Rpb25JbmZvLmdldFRpbWVzdGFtcCgpXG4gICAgICB9IGFzIGFueSkgYXMgSUFjdGlvbkluZm87XG5cbiAgICAgIGNvbnN0IHJhd0FjdGlvbiA9IHJhd0FjdGlvbkluZm8uZ2V0QWN0aW9uKCk7XG4gICAgICBpZiAocmF3QWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJhd0FjdGlvbkNvcmUgPSByYXdBY3Rpb24uZ2V0Q29yZSgpO1xuICAgICAgICBsZXQgYWN0aW9uQ29yZTogSUFjdGlvbkNvcmUgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChyYXdBY3Rpb25Db3JlKSB7XG4gICAgICAgICAgYWN0aW9uQ29yZSA9IHtcbiAgICAgICAgICAgIHZlcnNpb246IHJhd0FjdGlvbkNvcmUuZ2V0VmVyc2lvbigpLFxuICAgICAgICAgICAgbm9uY2U6IFN0cmluZyhyYXdBY3Rpb25Db3JlLmdldE5vbmNlKCkpLFxuICAgICAgICAgICAgZ2FzTGltaXQ6IFN0cmluZyhyYXdBY3Rpb25Db3JlLmdldEdhc2xpbWl0KCkpLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IHJhd0FjdGlvbkNvcmUuZ2V0R2FzcHJpY2UoKSxcbiAgICAgICAgICAgIHRyYW5zZmVyOiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tVHJhbnNmZXIoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0VHJhbnNmZXIoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGV4ZWN1dGlvbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbUV4ZWN1dGlvbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRFeGVjdXRpb24oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXJ0U3ViQ2hhaW46IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21TdGFydFN1YkNoYWluKFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFN0YXJ0c3ViY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0b3BTdWJDaGFpbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVN0b3BTdWJDaGFpbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRTdG9wc3ViY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHB1dEJsb2NrOiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUHV0QmxvY2soXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UHV0YmxvY2soKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNyZWF0ZURlcG9zaXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21DcmVhdGVEZXBvc2l0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldENyZWF0ZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHNldHRsZURlcG9zaXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21TZXR0bGVEZXBvc2l0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFNldHRsZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNyZWF0ZVBsdW1DaGFpbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbUNyZWF0ZVBsdW1DaGFpbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRDcmVhdGVwbHVtY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRlcm1pbmF0ZVBsdW1DaGFpbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVRlcm1pbmF0ZVBsdW1DaGFpbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRUZXJtaW5hdGVwbHVtY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1QdXRCbG9jazogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVBsdW1QdXRCbG9jayhcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRQbHVtcHV0YmxvY2soKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1DcmVhdGVEZXBvc2l0OiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUGx1bUNyZWF0ZURlcG9zaXQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UGx1bWNyZWF0ZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1TdGFydEV4aXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21QbHVtU3RhcnRFeGl0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFBsdW1zdGFydGV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1DaGFsbGVuZ2VFeGl0OiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUGx1bUNoYWxsZW5nZUV4aXQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UGx1bWNoYWxsZW5nZWV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21QbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFBsdW1yZXNwb25zZWNoYWxsZW5nZWV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1GaW5hbGl6ZUV4aXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21QbHVtRmluYWxpemVFeGl0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFBsdW1maW5hbGl6ZWV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1TZXR0bGVEZXBvc2l0OiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUGx1bVNldHRsZURlcG9zaXQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UGx1bXNldHRsZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1UcmFuc2ZlcjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVBsdW1UcmFuc2ZlcihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRQbHVtdHJhbnNmZXIoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21EZXBvc2l0VG9SZXdhcmRpbmdGdW5kKFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldERlcG9zaXR0b3Jld2FyZGluZ2Z1bmQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNsYWltRnJvbVJld2FyZGluZ0Z1bmQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21DbGFpbUZyb21SZXdhcmRpbmdGdW5kKFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldENsYWltZnJvbXJld2FyZGluZ2Z1bmQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGdyYW50UmV3YXJkOiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tR3JhbnRSZXdhcmQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0R3JhbnRyZXdhcmQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHB1dFBvbGxSZXN1bHQ6IEdldEFjdGlvbnNSZXF1ZXN0LmdldFB1dFBvbGxSZXN1bHQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UHV0cG9sbHJlc3VsdCgpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGlvbkluZm8uYWN0aW9uID0ge1xuICAgICAgICAgIGNvcmU6IGFjdGlvbkNvcmUsXG4gICAgICAgICAgc2VuZGVyUHViS2V5OiByYXdBY3Rpb24uZ2V0U2VuZGVycHVia2V5KCksXG4gICAgICAgICAgc2lnbmF0dXJlOiByYXdBY3Rpb24uZ2V0U2lnbmF0dXJlKClcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmVzLmFjdGlvbkluZm8ucHVzaChhY3Rpb25JbmZvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG59O1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgU3VnZ2VzdEdhc1ByaWNlIFJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElTdWdnZXN0R2FzUHJpY2VSZXF1ZXN0IHt9XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTdWdnZXN0R2FzUHJpY2VSZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSVN1Z2dlc3RHYXNQcmljZVJlc3BvbnNlIHtcbiAgLy8gU3VnZ2VzdEdhc1ByaWNlUmVzcG9uc2UgZ2FzUHJpY2VcbiAgZ2FzUHJpY2U6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFN1Z2dlc3RHYXNQcmljZVJlcXVlc3QgPSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgdG8ocmVxOiBJU3VnZ2VzdEdhc1ByaWNlUmVxdWVzdCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBhcGlQYi5TdWdnZXN0R2FzUHJpY2VSZXF1ZXN0KCk7XG4gIH0sXG5cbiAgZnJvbShwYlJlczogYW55KTogSVN1Z2dlc3RHYXNQcmljZVJlc3BvbnNlIHtcbiAgICBjb25zdCBnYXNQcmljZSA9IHBiUmVzLmdldEdhc3ByaWNlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdhc1ByaWNlXG4gICAgfTtcbiAgfVxufTtcblxuLy8gUHJvcGVydGllcyBvZiBhIEdldFJlY2VpcHRCeUFjdGlvblJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRSZWNlaXB0QnlBY3Rpb25SZXF1ZXN0IHtcbiAgLy8gR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCBhY3Rpb25IYXNoXG4gIGFjdGlvbkhhc2g6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhbiBMb2cuXG5leHBvcnQgaW50ZXJmYWNlIElMb2cge1xuICAvLyBMb2cgYWRkcmVzc1xuICBjb250cmFjdEFkZHJlc3M6IHN0cmluZztcblxuICAvLyBMb2cgdG9waWNzXG4gIHRvcGljczogQXJyYXk8QnVmZmVyIHwge30+O1xuXG4gIC8vIExvZyBkYXRhXG4gIGRhdGE6IEJ1ZmZlciB8IHt9O1xuXG4gIC8vIExvZyBibGtIZWlnaHRcbiAgYmxrSGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gTG9nIHR4bkhhc2hcbiAgYWN0SGFzaDogQnVmZmVyIHwge307XG5cbiAgLy8gTG9nIGluZGV4XG4gIGluZGV4OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gUmVjZWlwdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY2VpcHQge1xuICAvLyBSZWNlaXB0IHN0YXR1c1xuICBzdGF0dXM6IG51bWJlcjtcblxuICAvLyBibGtIZWlnaHRcbiAgYmxrSGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gUmVjZWlwdCBhY3RIYXNoXG4gIGFjdEhhc2g6IEJ1ZmZlciB8IHt9O1xuXG4gIC8vIFJlY2VpcHQgZ2FzQ29uc3VtZWRcbiAgZ2FzQ29uc3VtZWQ6IG51bWJlcjtcblxuICAvLyBSZWNlaXB0IGNvbnRyYWN0QWRkcmVzc1xuICBjb250cmFjdEFkZHJlc3M6IHN0cmluZztcblxuICAvLyBSZWNlaXB0IGxvZ3NcbiAgbG9nczogQXJyYXk8SUxvZz4gfCB1bmRlZmluZWQ7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gUmVjZWlwdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY2VpcHRJbmZvIHtcbiAgLy8gUmVjZWlwdFxuICByZWNlaXB0OiBJUmVjZWlwdCB8IHVuZGVmaW5lZDtcblxuICAvLyBibGtIYXNoXG4gIGJsa0hhc2g6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldFJlY2VpcHRCeUFjdGlvblJlc3BvbnNlLlxuZXhwb3J0IGludGVyZmFjZSBJR2V0UmVjZWlwdEJ5QWN0aW9uUmVzcG9uc2Uge1xuICAvLyBHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZSByZWNlaXB0SW5mb1xuICByZWNlaXB0SW5mbzogSVJlY2VpcHRJbmZvIHwgdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBmcm9tUGJSZWNlaXB0SW5mbyhcbiAgcGJSZWNlaXB0SW5mbzogYXBpUGIuUmVjZWlwdEluZm8gfCB1bmRlZmluZWRcbik6IElSZWNlaXB0SW5mbyB8IHVuZGVmaW5lZCB7XG4gIGlmICghcGJSZWNlaXB0SW5mbykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICByZWNlaXB0OiBmcm9tUGJSZWNlaXB0KHBiUmVjZWlwdEluZm8uZ2V0UmVjZWlwdCgpKSxcbiAgICBibGtIYXNoOiBwYlJlY2VpcHRJbmZvLmdldEJsa2hhc2goKVxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXEgPSBuZXcgYXBpUGIuR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCgpO1xuICAgIGlmIChyZXEuYWN0aW9uSGFzaCkge1xuICAgICAgcGJSZXEuc2V0QWN0aW9uaGFzaChyZXEuYWN0aW9uSGFzaCk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcTtcbiAgfSxcblxuICBmcm9tKHBiUmVzOiBHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZSk6IElHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlY2VpcHRJbmZvOiBmcm9tUGJSZWNlaXB0SW5mbyhwYlJlcy5nZXRSZWNlaXB0aW5mbygpKVxuICAgIH07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGZyb21QYlJlY2VpcHQoXG4gIHBiUmVjZWlwdDogYWN0aW9uUGIuUmVjZWlwdCB8IHVuZGVmaW5lZFxuKTogSVJlY2VpcHQgfCB1bmRlZmluZWQge1xuICBpZiAoIXBiUmVjZWlwdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXM6IHBiUmVjZWlwdC5nZXRTdGF0dXMoKSxcbiAgICBibGtIZWlnaHQ6IHBiUmVjZWlwdC5nZXRCbGtoZWlnaHQoKSxcbiAgICBhY3RIYXNoOiBwYlJlY2VpcHQuZ2V0QWN0aGFzaCgpLFxuICAgIGdhc0NvbnN1bWVkOiBwYlJlY2VpcHQuZ2V0R2FzY29uc3VtZWQoKSxcbiAgICBjb250cmFjdEFkZHJlc3M6IHBiUmVjZWlwdC5nZXRDb250cmFjdGFkZHJlc3MoKSxcbiAgICBsb2dzOiBmcm9tUGJMb2dMaXN0KHBiUmVjZWlwdC5nZXRMb2dzTGlzdCgpKVxuICB9O1xufVxuXG5mdW5jdGlvbiBmcm9tUGJMb2dMaXN0KFxuICBwYkxvZ0xpc3Q6IEFycmF5PGFjdGlvblBiLkxvZz4gfCB1bmRlZmluZWRcbik6IEFycmF5PElMb2c+IHwgdW5kZWZpbmVkIHtcbiAgaWYgKCFwYkxvZ0xpc3QpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHJlcyA9IFtdIGFzIEFycmF5PElMb2c+O1xuICBmb3IgKGNvbnN0IGxvZyBvZiBwYkxvZ0xpc3QpIHtcbiAgICByZXMucHVzaCh7XG4gICAgICBjb250cmFjdEFkZHJlc3M6IGxvZy5nZXRDb250cmFjdGFkZHJlc3MoKSxcbiAgICAgIHRvcGljczogbG9nLmdldFRvcGljc0xpc3QoKSxcbiAgICAgIGRhdGE6IGxvZy5nZXREYXRhKCksXG4gICAgICBibGtIZWlnaHQ6IGxvZy5nZXRCbGtoZWlnaHQoKSxcbiAgICAgIGFjdEhhc2g6IGxvZy5nZXRBY3RoYXNoKCksXG4gICAgICBpbmRleDogbG9nLmdldEluZGV4KClcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUmVhZENvbnRyYWN0UmVxdWVzdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlYWRDb250cmFjdFJlcXVlc3Qge1xuICBleGVjdXRpb246IElFeGVjdXRpb247XG4gIGNhbGxlckFkZHJlc3M6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFJlYWRDb250cmFjdFJlc3BvbnNlLlxuZXhwb3J0IGludGVyZmFjZSBJUmVhZENvbnRyYWN0UmVzcG9uc2Uge1xuICBkYXRhOiBzdHJpbmc7XG4gIHJlY2VpcHQ6IElSZWNlaXB0IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgUmVhZENvbnRyYWN0UmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJUmVhZENvbnRyYWN0UmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXEgPSBuZXcgYXBpUGIuUmVhZENvbnRyYWN0UmVxdWVzdCgpO1xuICAgIHBiUmVxLnNldENhbGxlcmFkZHJlc3MocmVxLmNhbGxlckFkZHJlc3MpO1xuICAgIGlmIChyZXEuZXhlY3V0aW9uKSB7XG4gICAgICBwYlJlcS5zZXRFeGVjdXRpb24odG9BY3Rpb25FeGVjdXRpb24ocmVxLmV4ZWN1dGlvbikpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXE7XG4gIH0sXG5cbiAgZnJvbShwYlJlczogYXBpUGIuUmVhZENvbnRyYWN0UmVzcG9uc2UpOiBJUmVhZENvbnRyYWN0UmVzcG9uc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBwYlJlcy5nZXREYXRhKCksXG4gICAgICByZWNlaXB0OiBmcm9tUGJSZWNlaXB0KHBiUmVzLmdldFJlY2VpcHQoKSlcbiAgICB9O1xuICB9XG59O1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgU2VuZEFjdGlvblJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElTZW5kQWN0aW9uUmVxdWVzdCB7XG4gIC8vIFNlbmRBY3Rpb25SZXF1ZXN0IGFjdGlvblxuICBhY3Rpb246IElBY3Rpb247XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTZW5kQWN0aW9uUmVzcG9uc2UuXG5leHBvcnQgaW50ZXJmYWNlIElTZW5kQWN0aW9uUmVzcG9uc2Uge1xuICBhY3Rpb25IYXNoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBTZW5kQWN0aW9uUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJU2VuZEFjdGlvblJlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxID0gbmV3IGFwaVBiLlNlbmRBY3Rpb25SZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5hY3Rpb24pIHtcbiAgICAgIHBiUmVxLnNldEFjdGlvbih0b0FjdGlvbihyZXEuYWN0aW9uKSk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IFNlbmRBY3Rpb25SZXNwb25zZSA9IHtcbiAgZnJvbShyZXNwOiBhcGlQYi5TZW5kQWN0aW9uUmVzcG9uc2UpOiBJU2VuZEFjdGlvblJlc3BvbnNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uSGFzaDogcmVzcC5nZXRBY3Rpb25oYXNoKClcbiAgICB9O1xuICB9XG59O1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXF1ZXN0IHtcbiAgYWN0aW9uOiBJQWN0aW9uO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSUVzdGltYXRlR2FzRm9yQWN0aW9uUmVzcG9uc2Uge1xuICBnYXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEVzdGltYXRlR2FzRm9yQWN0aW9uUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5Fc3RpbWF0ZUdhc0ZvckFjdGlvblJlcXVlc3QoKTtcbiAgICBpZiAocmVxLmFjdGlvbikge1xuICAgICAgcGJSZXEuc2V0QWN0aW9uKHRvQWN0aW9uKHJlcS5hY3Rpb24pKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxO1xuICB9LFxuICBmcm9tKHBiUmVzOiBhbnkpOiBJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXNwb25zZSB7XG4gICAgcmV0dXJuIHsgZ2FzOiBwYlJlcy5nZXRHYXMoKSB9O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWFkU3RhdGVSZXF1ZXN0IHtcbiAgcHJvdG9jb2xJRDogQnVmZmVyO1xuICBtZXRob2ROYW1lOiBCdWZmZXI7XG4gIGFyZ3VtZW50czogQXJyYXk8QnVmZmVyPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVhZFN0YXRlUmVzcG9uc2Uge1xuICBkYXRhOiBCdWZmZXIgfCB7fTtcbn1cblxuZXhwb3J0IGNvbnN0IFJlYWRTdGF0ZVJlcXVlc3QgPSB7XG4gIHRvKHJlcTogSVJlYWRTdGF0ZVJlcXVlc3QpOiBhcGlQYi5SZWFkU3RhdGVSZXF1ZXN0IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5SZWFkU3RhdGVSZXF1ZXN0KCk7XG4gICAgcGJSZXEuc2V0UHJvdG9jb2xpZChyZXEucHJvdG9jb2xJRCk7XG4gICAgcGJSZXEuc2V0TWV0aG9kbmFtZShyZXEubWV0aG9kTmFtZSk7XG4gICAgcGJSZXEuc2V0QXJndW1lbnRzTGlzdChyZXEuYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcGJSZXE7XG4gIH0sXG4gIGZyb20ocGJSZXM6IFJlYWRTdGF0ZVJlc3BvbnNlKTogSVJlYWRTdGF0ZVJlc3BvbnNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogcGJSZXMuZ2V0RGF0YSgpXG4gICAgfTtcbiAgfVxufTtcblxuLy8gUHJvcGVydGllcyBvZiBhIEJsb2NrUHJvZHVjZXJJbmZvLlxuZXhwb3J0IGludGVyZmFjZSBJQmxvY2tQcm9kdWNlckluZm8ge1xuICAvLyBCbG9ja1Byb2R1Y2VySW5mbyBhZGRyZXNzXG4gIGFkZHJlc3M6IHN0cmluZztcblxuICAvLyBCbG9ja1Byb2R1Y2VySW5mbyB2b3Rlc1xuICB2b3Rlczogc3RyaW5nO1xuXG4gIC8vIEJsb2NrUHJvZHVjZXJJbmZvIGFjdGl2ZVxuICBhY3RpdmU6IGJvb2xlYW47XG5cbiAgLy8gQmxvY2tQcm9kdWNlckluZm8gcHJvZHVjdGlvblxuICBwcm9kdWN0aW9uOiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRFcG9jaE1ldGFSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0RXBvY2hNZXRhUmVxdWVzdCB7XG4gIGVwb2NoTnVtYmVyOiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRFcG9jaE1ldGFSZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEVwb2NoTWV0YVJlc3BvbnNlIHtcbiAgLy8gR2V0RXBvY2hNZXRhUmVzcG9uc2UgZXBvY2hEYXRhXG4gIGVwb2NoRGF0YTogSUVwb2NoRGF0YTtcblxuICAvLyBHZXRFcG9jaE1ldGFSZXNwb25zZSB0b3RhbEJsb2Nrc1xuICB0b3RhbEJsb2NrczogbnVtYmVyO1xuXG4gIC8vIEdldEVwb2NoTWV0YVJlc3BvbnNlIGJsb2NrUHJvZHVjZXJzSW5mb1xuICBibG9ja1Byb2R1Y2Vyc0luZm86IEFycmF5PElCbG9ja1Byb2R1Y2VySW5mbz47XG59XG5cbmV4cG9ydCBjb25zdCBHZXRFcG9jaE1ldGFSZXF1ZXN0ID0ge1xuICB0byhyZXE6IElHZXRFcG9jaE1ldGFSZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5HZXRFcG9jaE1ldGFSZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5lcG9jaE51bWJlcikge1xuICAgICAgcGJSZXEuc2V0RXBvY2hudW1iZXIocmVxLmVwb2NoTnVtYmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxO1xuICB9LFxuICBmcm9tKHBiUmVzOiBhbnkpOiBJR2V0RXBvY2hNZXRhUmVzcG9uc2Uge1xuICAgIGNvbnN0IGVwb2NoID0gcGJSZXMuZ2V0RXBvY2hkYXRhKCk7XG4gICAgY29uc3QgYnBJbmZvID0gcGJSZXMuZ2V0QmxvY2twcm9kdWNlcnNpbmZvTGlzdCgpO1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGVwb2NoRGF0YToge1xuICAgICAgICBudW06IGVwb2NoLmdldE51bSgpLFxuICAgICAgICBoZWlnaHQ6IGVwb2NoLmdldEhlaWdodCgpLFxuICAgICAgICBncmF2aXR5Q2hhaW5TdGFydEhlaWdodDogZXBvY2guZ2V0R3Jhdml0eWNoYWluc3RhcnRoZWlnaHQoKVxuICAgICAgfSxcbiAgICAgIHRvdGFsQmxvY2tzOiBwYlJlcy5nZXRUb3RhbGJsb2NrcygpLFxuICAgICAgYmxvY2tQcm9kdWNlcnNJbmZvOiBicEluZm9cbiAgICB9O1xuICAgIGlmIChicEluZm8pIHtcbiAgICAgIGNvbnN0IHBhcnNlZEJwaW5mbyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBicEluZm8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyc2VkQnBpbmZvW2ldID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGJwSW5mb1tpXS5nZXRBZGRyZXNzKCksXG4gICAgICAgICAgdm90ZXM6IGJwSW5mb1tpXS5nZXRWb3RlcygpLFxuICAgICAgICAgIGFjdGl2ZTogYnBJbmZvW2ldLmdldEFjdGl2ZSgpLFxuICAgICAgICAgIHByb2R1Y3Rpb246IGJwSW5mb1tpXS5nZXRQcm9kdWN0aW9uKClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJlcy5ibG9ja1Byb2R1Y2Vyc0luZm8gPSBwYXJzZWRCcGluZm87XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBJUnBjTWV0aG9kIHtcbiAgc2V0UHJvdmlkZXIocHJvdmlkZXI6IHN0cmluZyB8IElScGNNZXRob2QpOiB2b2lkO1xuXG4gIGdldEFjY291bnQocmVxOiBJR2V0QWNjb3VudFJlcXVlc3QpOiBQcm9taXNlPElHZXRBY2NvdW50UmVzcG9uc2U+O1xuXG4gIGdldEJsb2NrTWV0YXMocmVxOiBJR2V0QmxvY2tNZXRhc1JlcXVlc3QpOiBQcm9taXNlPElHZXRCbG9ja01ldGFzUmVzcG9uc2U+O1xuXG4gIGdldENoYWluTWV0YShyZXE6IElHZXRDaGFpbk1ldGFSZXF1ZXN0KTogUHJvbWlzZTxJR2V0Q2hhaW5NZXRhUmVzcG9uc2U+O1xuXG4gIGdldFNlcnZlck1ldGEocmVxOiBJR2V0U2VydmVyTWV0YVJlcXVlc3QpOiBQcm9taXNlPElHZXRTZXJ2ZXJNZXRhUmVzcG9uc2U+O1xuXG4gIGdldEFjdGlvbnMocmVxOiBJR2V0QWN0aW9uc1JlcXVlc3QpOiBQcm9taXNlPElHZXRBY3Rpb25zUmVzcG9uc2U+O1xuXG4gIHN1Z2dlc3RHYXNQcmljZShcbiAgICByZXE6IElTdWdnZXN0R2FzUHJpY2VSZXF1ZXN0XG4gICk6IFByb21pc2U8SVN1Z2dlc3RHYXNQcmljZVJlc3BvbnNlPjtcblxuICBnZXRSZWNlaXB0QnlBY3Rpb24oXG4gICAgcmVxOiBJR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdFxuICApOiBQcm9taXNlPElHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZT47XG5cbiAgcmVhZENvbnRyYWN0KHJlcTogSVJlYWRDb250cmFjdFJlcXVlc3QpOiBQcm9taXNlPElSZWFkQ29udHJhY3RSZXNwb25zZT47XG5cbiAgc2VuZEFjdGlvbihyZXE6IElTZW5kQWN0aW9uUmVxdWVzdCk6IFByb21pc2U8SVNlbmRBY3Rpb25SZXNwb25zZT47XG4gIHJlYWRTdGF0ZShyZXE6IElSZWFkU3RhdGVSZXF1ZXN0KTogUHJvbWlzZTxJUmVhZFN0YXRlUmVzcG9uc2U+O1xuICBlc3RpbWF0ZUdhc0ZvckFjdGlvbihcbiAgICByZXE6IElFc3RpbWF0ZUdhc0ZvckFjdGlvblJlcXVlc3RcbiAgKTogUHJvbWlzZTxJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXNwb25zZT47XG5cbiAgZ2V0RXBvY2hNZXRhKHJlcTogSUdldEVwb2NoTWV0YVJlcXVlc3QpOiBQcm9taXNlPElHZXRFcG9jaE1ldGFSZXNwb25zZT47XG59XG4iXX0=
