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
      blkMetas: metas,
      total: pbRes.getTotal()
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
    if (!pbRes) {
      return;
    }

    return {
      amount: pbRes.getAmount(),
      contract: pbRes.getContract(),
      // @ts-ignore
      data: Buffer.from(pbRes.getData())
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ycGMtbWV0aG9kL3R5cGVzLnRzIl0sIm5hbWVzIjpbIkdldEFjY291bnRSZXF1ZXN0IiwidG8iLCJyZXEiLCJwYlJlcSIsImFwaVBiIiwic2V0QWRkcmVzcyIsImFkZHJlc3MiLCJmcm9tIiwicGJSZXMiLCJtZXRhIiwiZ2V0QWNjb3VudG1ldGEiLCJhY2NvdW50TWV0YSIsInVuZGVmaW5lZCIsImdldEFkZHJlc3MiLCJiYWxhbmNlIiwiZ2V0QmFsYW5jZSIsIm5vbmNlIiwiZ2V0Tm9uY2UiLCJwZW5kaW5nTm9uY2UiLCJnZXRQZW5kaW5nbm9uY2UiLCJudW1BY3Rpb25zIiwiZ2V0TnVtYWN0aW9ucyIsIkdldENoYWluTWV0YVJlcXVlc3QiLCJnZXRDaGFpbm1ldGEiLCJyZXMiLCJjaGFpbk1ldGEiLCJlcG9jaERhdGEiLCJFcG9jaCIsImhlaWdodCIsImdldEhlaWdodCIsInRwcyIsImdldFRwcyIsImVwb2NoIiwiR2V0U2VydmVyTWV0YVJlcXVlc3QiLCJnZXRTZXJ2ZXJtZXRhIiwic2VydmVyTWV0YSIsInBhY2thZ2VWZXJzaW9uIiwiZ2V0UGFja2FnZXZlcnNpb24iLCJwYWNrYWdlQ29tbWl0SUQiLCJnZXRQYWNrYWdlY29tbWl0aWQiLCJnaXRTdGF0dXMiLCJnZXRHaXRzdGF0dXMiLCJnb1ZlcnNpb24iLCJnZXRHb3ZlcnNpb24iLCJidWlsZFRpbWUiLCJnZXRCdWlsZHRpbWUiLCJHZXRCbG9ja01ldGFzUmVxdWVzdCIsImJ5SW5kZXgiLCJwYlJlcUJ5SW5kZXgiLCJHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3QiLCJzdGFydCIsInNldFN0YXJ0IiwiY291bnQiLCJzZXRDb3VudCIsInNldEJ5aW5kZXgiLCJieUhhc2giLCJwYlJlcUJ5SGFzaCIsIkdldEJsb2NrTWV0YUJ5SGFzaFJlcXVlc3QiLCJzZXRCbGtoYXNoIiwiYmxrSGFzaCIsInNldEJ5aGFzaCIsIm1ldGFzIiwiZ2V0QmxrbWV0YXNMaXN0IiwiYmxrTWV0YXMiLCJ0b3RhbCIsImdldFRvdGFsIiwicGFyc2VkTWV0YXMiLCJpIiwibGVuZ3RoIiwiaGFzaCIsImdldEhhc2giLCJ0aW1lc3RhbXAiLCJnZXRUaW1lc3RhbXAiLCJwcm9kdWNlckFkZHJlc3MiLCJnZXRQcm9kdWNlcmFkZHJlc3MiLCJ0cmFuc2ZlckFtb3VudCIsImdldFRyYW5zZmVyYW1vdW50IiwidHhSb290IiwiZ2V0VHhyb290IiwicmVjZWlwdFJvb3QiLCJnZXRSZWNlaXB0cm9vdCIsImRlbHRhU3RhdGVEaWdlc3QiLCJnZXREZWx0YXN0YXRlZGlnZXN0IiwidG9BY3Rpb25UcmFuc2ZlciIsInBiVHJhbnNmZXIiLCJhY3Rpb25QYiIsIlRyYW5zZmVyIiwic2V0QW1vdW50IiwiYW1vdW50Iiwic2V0UmVjaXBpZW50IiwicmVjaXBpZW50Iiwic2V0UGF5bG9hZCIsInBheWxvYWQiLCJ0b1RpbWVzdGFtcCIsInRzIiwiVGltZXN0YW1wIiwic2V0U2Vjb25kcyIsInNlY29uZHMiLCJzZXROYW5vcyIsIm5hbm9zIiwidG9BY3Rpb25FeGVjdXRpb24iLCJwYkV4ZWN1dGlvbiIsIkV4ZWN1dGlvbiIsInNldENvbnRyYWN0IiwiY29udHJhY3QiLCJzZXREYXRhIiwiZGF0YSIsInRvQWN0aW9uU3RhcnRTdWJDaGFpbiIsInBiU3RhcnRTdWJDaGFpbiIsIlN0YXJ0U3ViQ2hhaW4iLCJzZXRDaGFpbmlkIiwiY2hhaW5JRCIsInNldFNlY3VyaXR5ZGVwb3NpdCIsInNlY3VyaXR5RGVwb3NpdCIsInNldE9wZXJhdGlvbmRlcG9zaXQiLCJvcGVyYXRpb25EZXBvc2l0Iiwic2V0U3RhcnRoZWlnaHQiLCJzdGFydEhlaWdodCIsInNldFBhcmVudGhlaWdodG9mZnNldCIsInBhcmVudEhlaWdodE9mZnNldCIsInRvQWN0aW9uU3RvcFN1YkNoYWluIiwicGJTdG9wU3ViQ2hhaW4iLCJTdG9wU3ViQ2hhaW4iLCJzZXRTdG9waGVpZ2h0Iiwic3RvcEhlaWdodCIsInNldFN1YmNoYWluYWRkcmVzcyIsInN1YkNoYWluQWRkcmVzcyIsInRvQWN0aW9uUHV0QmxvY2siLCJyb290cyIsInJvb3RMaXN0Iiwicm9vdEl0ZW0iLCJta3Jvb3QiLCJNZXJrbGVSb290Iiwic2V0TmFtZSIsIm5hbWUiLCJzZXRWYWx1ZSIsInZhbHVlIiwicGJQdXRCbG9jayIsIlB1dEJsb2NrIiwic2V0SGVpZ2h0Iiwic2V0Um9vdHNMaXN0IiwidG9BY3Rpb25DcmVhdGVEZXBvc2l0IiwicGJDcmVhdGVEZXBvc2l0IiwiQ3JlYXRlRGVwb3NpdCIsInRvQWN0aW9uU2V0dGxlRGVwb3NpdCIsInBiU2V0dGxlRGVwb3NpdCIsIlNldHRsZURlcG9zaXQiLCJzZXRJbmRleCIsImluZGV4IiwidG9BY3Rpb25DcmVhdGVQbHVtQ2hhaW4iLCJDcmVhdGVQbHVtQ2hhaW4iLCJ0b0FjdGlvblRlcm1pbmF0ZVBsdW1DaGFpbiIsInBiVGVybWluYXRlUGx1bUNoYWluIiwiVGVybWluYXRlUGx1bUNoYWluIiwidG9BY3Rpb25QbHVtUHV0QmxvY2siLCJwYlBsdW1QdXRCbG9jayIsIlBsdW1QdXRCbG9jayIsInRvQWN0aW9uUGx1bUNyZWF0ZURlcG9zaXQiLCJwYlBsdW1DcmVhdGVEZXBvc2l0IiwiUGx1bUNyZWF0ZURlcG9zaXQiLCJ0b0FjdGlvblBsdW1TdGFydEV4aXQiLCJwYlBsdW1TdGFydEV4aXQiLCJQbHVtU3RhcnRFeGl0Iiwic2V0UHJldmlvdXN0cmFuc2ZlciIsInByZXZpb3VzVHJhbnNmZXIiLCJzZXRQcmV2aW91c3RyYW5zZmVyYmxvY2twcm9vZiIsInByZXZpb3VzVHJhbnNmZXJCbG9ja1Byb29mIiwic2V0UHJldmlvdXN0cmFuc2ZlcmJsb2NraGVpZ2h0IiwicHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0Iiwic2V0RXhpdHRyYW5zZmVyIiwiZXhpdFRyYW5zZmVyIiwic2V0RXhpdHRyYW5zZmVyYmxvY2twcm9vZiIsImV4aXRUcmFuc2ZlckJsb2NrUHJvb2YiLCJzZXRFeGl0dHJhbnNmZXJibG9ja2hlaWdodCIsImV4aXRUcmFuc2ZlckJsb2NrSGVpZ2h0IiwidG9BY3Rpb25QbHVtQ2hhbGxlbmdlRXhpdCIsInBiUGx1bUNoYWxsZW5nZUV4aXQiLCJQbHVtQ2hhbGxlbmdlRXhpdCIsInNldENvaW5pZCIsImNvaW5JRCIsInNldENoYWxsZW5nZXRyYW5zZmVyIiwiY2hhbGxlbmdlVHJhbnNmZXIiLCJzZXRDaGFsbGVuZ2V0cmFuc2ZlcmJsb2NrcHJvb2YiLCJjaGFsbGVuZ2VUcmFuc2ZlckJsb2NrUHJvb2YiLCJzZXRDaGFsbGVuZ2V0cmFuc2ZlcmJsb2NraGVpZ2h0IiwiY2hhbGxlbmdlVHJhbnNmZXJCbG9ja0hlaWdodCIsInRvQWN0aW9uUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCIsInBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCIsIlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQiLCJzZXRSZXNwb25zZXRyYW5zZmVyIiwicmVzcG9uc2VUcmFuc2ZlciIsInNldFJlc3BvbnNldHJhbnNmZXJibG9ja3Byb29mIiwicmVzcG9uc2VUcmFuc2ZlckJsb2NrUHJvb2YiLCJ0b0FjdGlvblBsdW1GaW5hbGl6ZUV4aXQiLCJwYlBsdW1GaW5hbGl6ZUV4aXQiLCJQbHVtRmluYWxpemVFeGl0IiwidG9BY3Rpb25QbHVtU2V0dGxlRGVwb3NpdCIsInBiUGx1bVNldHRsZURlcG9zaXQiLCJQbHVtU2V0dGxlRGVwb3NpdCIsInRvQWN0aW9uUGx1bVRyYW5zZmVyIiwicGJQbHVtVHJhbnNmZXIiLCJQbHVtVHJhbnNmZXIiLCJzZXREZW5vbWluYXRpb24iLCJkZW5vbWluYXRpb24iLCJzZXRPd25lciIsIm93bmVyIiwidG9BY3Rpb25EZXBvc2l0VG9SZXdhcmRpbmdGdW5kIiwicGJEZXBvc2l0VG9SZXdhcmRpbmdGdW5kIiwiRGVwb3NpdFRvUmV3YXJkaW5nRnVuZCIsInRvQWN0aW9uQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCIsInBiQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCIsIkNsYWltRnJvbVJld2FyZGluZ0Z1bmQiLCJ0b0FjdGlvbkdyYW50UmV3YXJkIiwicGJHcmFudFJld2FyZCIsIkdyYW50UmV3YXJkIiwic2V0VHlwZSIsInR5cGUiLCJ0b0FjdGlvbiIsInBiQWN0aW9uQ29yZSIsIkFjdGlvbkNvcmUiLCJjb3JlIiwic2V0VmVyc2lvbiIsInZlcnNpb24iLCJzZXROb25jZSIsIk51bWJlciIsInNldEdhc2xpbWl0IiwiZ2FzTGltaXQiLCJzZXRHYXNwcmljZSIsImdhc1ByaWNlIiwic2V0VHJhbnNmZXIiLCJ0cmFuc2ZlciIsInNldEV4ZWN1dGlvbiIsImV4ZWN1dGlvbiIsInNldFN0YXJ0c3ViY2hhaW4iLCJzdGFydFN1YkNoYWluIiwic2V0U3RvcHN1YmNoYWluIiwic3RvcFN1YkNoYWluIiwic2V0UHV0YmxvY2siLCJwdXRCbG9jayIsInNldENyZWF0ZWRlcG9zaXQiLCJjcmVhdGVEZXBvc2l0Iiwic2V0U2V0dGxlZGVwb3NpdCIsInNldHRsZURlcG9zaXQiLCJzZXRDcmVhdGVwbHVtY2hhaW4iLCJjcmVhdGVQbHVtQ2hhaW4iLCJzZXRUZXJtaW5hdGVwbHVtY2hhaW4iLCJ0ZXJtaW5hdGVQbHVtQ2hhaW4iLCJzZXRQbHVtcHV0YmxvY2siLCJwbHVtUHV0QmxvY2siLCJzZXRQbHVtY3JlYXRlZGVwb3NpdCIsInBsdW1DcmVhdGVEZXBvc2l0Iiwic2V0UGx1bXN0YXJ0ZXhpdCIsInBsdW1TdGFydEV4aXQiLCJzZXRQbHVtY2hhbGxlbmdlZXhpdCIsInBsdW1DaGFsbGVuZ2VFeGl0Iiwic2V0UGx1bXJlc3BvbnNlY2hhbGxlbmdlZXhpdCIsInBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQiLCJzZXRQbHVtZmluYWxpemVleGl0IiwicGx1bUZpbmFsaXplRXhpdCIsInNldFBsdW1zZXR0bGVkZXBvc2l0IiwicGx1bVNldHRsZURlcG9zaXQiLCJzZXRQbHVtdHJhbnNmZXIiLCJwbHVtVHJhbnNmZXIiLCJzZXREZXBvc2l0dG9yZXdhcmRpbmdmdW5kIiwiZGVwb3NpdFRvUmV3YXJkaW5nRnVuZCIsInNldENsYWltZnJvbXJld2FyZGluZ2Z1bmQiLCJjbGFpbUZyb21SZXdhcmRpbmdGdW5kIiwic2V0R3JhbnRyZXdhcmQiLCJncmFudFJld2FyZCIsInBiQWN0aW9uIiwiQWN0aW9uIiwic2V0Q29yZSIsInNlbmRlclB1YktleSIsInNldFNlbmRlcnB1YmtleSIsInNpZ25hdHVyZSIsInNldFNpZ25hdHVyZSIsIkdldEFjdGlvbnNSZXF1ZXN0IiwiYnlBZGRyVG8iLCJieUFkZHIiLCJwYlJlcUJ5QWRkciIsIkdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IiwiYnlCbGtUbyIsImJ5QmxrIiwicGJSZXFCeUJsayIsIkdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdCIsImJ5SGFzaFRvIiwiR2V0QWN0aW9uQnlIYXNoUmVxdWVzdCIsImFjdGlvbkhhc2giLCJzZXRBY3Rpb25oYXNoIiwiY2hlY2tpbmdQZW5kaW5nIiwic2V0Q2hlY2twZW5kaW5nIiwiYnlJbmRleFRvIiwiR2V0QWN0aW9uc0J5SW5kZXhSZXF1ZXN0IiwidW5jb25maXJtZWRCeUFkZHJUbyIsInVuY29uZmlybWVkQnlBZGRyIiwicGJSZXFVbmNvbmZpcm1lZEJ5QWRkciIsIkdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QiLCJzZXRCeWFkZHIiLCJzZXRCeWJsayIsInNldFVuY29uZmlybWVkYnlhZGRyIiwiZnJvbVRyYW5zZmVyIiwidHJhbnNmZXJEYXRhIiwiZ2V0QW1vdW50IiwiZ2V0UmVjaXBpZW50IiwiZ2V0UGF5bG9hZCIsImZyb21Wb3RlIiwidm90ZURhdGEiLCJ2b3RlZUFkZHJlc3MiLCJnZXRWb3RlZWFkZHJlc3MiLCJmcm9tRXhlY3V0aW9uIiwiZ2V0Q29udHJhY3QiLCJCdWZmZXIiLCJnZXREYXRhIiwiZnJvbVN0YXJ0U3ViQ2hhaW4iLCJzdGFydFN1YkNoYWluRGF0YSIsImZyb21TdG9wU3ViQ2hhaW4iLCJzdG9wU3ViQ2hhaW5EYXRhIiwiZnJvbVB1dEJsb2NrIiwicHV0QmxvY2tEYXRhIiwicm9vdHNEYXRhIiwiZnJvbUNyZWF0ZURlcG9zaXQiLCJjcmVhdGVEZXBvc2l0RGF0YSIsImZyb21TZXR0bGVEZXBvc2l0Iiwic2V0dGxlRGVwb3NpdERhdGEiLCJmcm9tQ3JlYXRlUGx1bUNoYWluIiwiY3JlYXRlUGx1bUNoYWluRGF0YSIsImZyb21UZXJtaW5hdGVQbHVtQ2hhaW4iLCJ0ZXJtaW5hdGVQbHVtQ2hhaW5EYXRhIiwiZnJvbVBsdW1QdXRCbG9jayIsInBsdW1QdXRCbG9ja0RhdGEiLCJmcm9tUGx1bUNyZWF0ZURlcG9zaXQiLCJwbHVtQ3JlYXRlRGVwb3NpdERhdGEiLCJmcm9tUGx1bVN0YXJ0RXhpdCIsInBsdW1TdGFydEV4aXREYXRhIiwiZnJvbVBsdW1DaGFsbGVuZ2VFeGl0IiwicGx1bUNoYWxsZW5nZUV4aXREYXRhIiwiZnJvbVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQiLCJwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0RGF0YSIsImZyb21QbHVtRmluYWxpemVFeGl0IiwicGx1bUZpbmFsaXplRXhpdERhdGEiLCJmcm9tUGx1bVNldHRsZURlcG9zaXQiLCJwbHVtU2V0dGxlRGVwb3NpdERhdGEiLCJmcm9tUGx1bVRyYW5zZmVyIiwicGx1bVRyYW5zZmVyRGF0YSIsImZyb21EZXBvc2l0VG9SZXdhcmRpbmdGdW5kIiwiZGVwb3NpdFRvUmV3YXJkaW5nRnVuZERhdGEiLCJmcm9tQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCIsImNsYWltRnJvbVJld2FyZGluZ0Z1bmREYXRhIiwiZnJvbVNldFJld2FyZCIsInNldFJld2FyZERhdGEiLCJmcm9tR3JhbnRSZXdhcmQiLCJnZXRUeXBlIiwiZ2V0UHV0UG9sbFJlc3VsdCIsImNhbmRpZGF0ZUxpc3QiLCJyYXdDYW5kaWRhdGVzIiwiZ2V0Q2FuZGlkYXRlcyIsImNhbmRpZGF0ZXMiLCJyYXdDYW5kaWRhdGVzTGlzdCIsImdldENhbmRpZGF0ZXNMaXN0IiwicmF3Q2FuZGlkYXRlIiwicHVzaCIsInZvdGVzIiwiZ2V0Vm90ZXMiLCJwdWJLZXkiLCJnZXRQdWJrZXkiLCJyZXdhcmRBZGRyZXNzIiwiZ2V0UmV3YXJkYWRkcmVzcyIsImFjdGlvbkluZm8iLCJyYXdBY3Rpb25JbmZvTGlzdCIsImdldEFjdGlvbmluZm9MaXN0IiwicmF3QWN0aW9uSW5mbyIsImFjdEhhc2giLCJnZXRBY3RoYXNoIiwiZ2V0QmxraGFzaCIsInJhd0FjdGlvbiIsImdldEFjdGlvbiIsInJhd0FjdGlvbkNvcmUiLCJnZXRDb3JlIiwiYWN0aW9uQ29yZSIsImdldFZlcnNpb24iLCJTdHJpbmciLCJnZXRHYXNsaW1pdCIsImdldEdhc3ByaWNlIiwiZ2V0VHJhbnNmZXIiLCJnZXRFeGVjdXRpb24iLCJnZXRTdGFydHN1YmNoYWluIiwiZ2V0U3RvcHN1YmNoYWluIiwiZ2V0UHV0YmxvY2siLCJnZXRDcmVhdGVkZXBvc2l0IiwiZ2V0U2V0dGxlZGVwb3NpdCIsImdldENyZWF0ZXBsdW1jaGFpbiIsImdldFRlcm1pbmF0ZXBsdW1jaGFpbiIsImdldFBsdW1wdXRibG9jayIsImdldFBsdW1jcmVhdGVkZXBvc2l0IiwiZ2V0UGx1bXN0YXJ0ZXhpdCIsImdldFBsdW1jaGFsbGVuZ2VleGl0IiwiZ2V0UGx1bXJlc3BvbnNlY2hhbGxlbmdlZXhpdCIsImdldFBsdW1maW5hbGl6ZWV4aXQiLCJnZXRQbHVtc2V0dGxlZGVwb3NpdCIsImdldFBsdW10cmFuc2ZlciIsImdldERlcG9zaXR0b3Jld2FyZGluZ2Z1bmQiLCJnZXRDbGFpbWZyb21yZXdhcmRpbmdmdW5kIiwiZ2V0R3JhbnRyZXdhcmQiLCJwdXRQb2xsUmVzdWx0IiwiZ2V0UHV0cG9sbHJlc3VsdCIsImFjdGlvbiIsImdldFNlbmRlcnB1YmtleSIsImdldFNpZ25hdHVyZSIsIlN1Z2dlc3RHYXNQcmljZVJlcXVlc3QiLCJmcm9tUGJSZWNlaXB0SW5mbyIsInBiUmVjZWlwdEluZm8iLCJyZWNlaXB0IiwiZnJvbVBiUmVjZWlwdCIsImdldFJlY2VpcHQiLCJHZXRSZWNlaXB0QnlBY3Rpb25SZXF1ZXN0IiwicmVjZWlwdEluZm8iLCJnZXRSZWNlaXB0aW5mbyIsInBiUmVjZWlwdCIsInN0YXR1cyIsImdldFN0YXR1cyIsImJsa0hlaWdodCIsImdldEJsa2hlaWdodCIsImdhc0NvbnN1bWVkIiwiZ2V0R2FzY29uc3VtZWQiLCJjb250cmFjdEFkZHJlc3MiLCJnZXRDb250cmFjdGFkZHJlc3MiLCJsb2dzIiwiZnJvbVBiTG9nTGlzdCIsImdldExvZ3NMaXN0IiwicGJMb2dMaXN0IiwibG9nIiwidG9waWNzIiwiZ2V0VG9waWNzTGlzdCIsImdldEluZGV4IiwiUmVhZENvbnRyYWN0UmVxdWVzdCIsInNldENhbGxlcmFkZHJlc3MiLCJjYWxsZXJBZGRyZXNzIiwiU2VuZEFjdGlvblJlcXVlc3QiLCJzZXRBY3Rpb24iLCJTZW5kQWN0aW9uUmVzcG9uc2UiLCJyZXNwIiwiZ2V0QWN0aW9uaGFzaCIsIkVzdGltYXRlR2FzRm9yQWN0aW9uUmVxdWVzdCIsImdhcyIsImdldEdhcyIsIlJlYWRTdGF0ZVJlcXVlc3QiLCJzZXRQcm90b2NvbGlkIiwicHJvdG9jb2xJRCIsInNldE1ldGhvZG5hbWUiLCJtZXRob2ROYW1lIiwic2V0QXJndW1lbnRzTGlzdCIsImFyZ3VtZW50cyIsIkdldEVwb2NoTWV0YVJlcXVlc3QiLCJlcG9jaE51bWJlciIsInNldEVwb2NobnVtYmVyIiwiZ2V0RXBvY2hkYXRhIiwiYnBJbmZvIiwiZ2V0QmxvY2twcm9kdWNlcnNpbmZvTGlzdCIsIm51bSIsImdldE51bSIsImdyYXZpdHlDaGFpblN0YXJ0SGVpZ2h0IiwiZ2V0R3Jhdml0eWNoYWluc3RhcnRoZWlnaHQiLCJ0b3RhbEJsb2NrcyIsImdldFRvdGFsYmxvY2tzIiwiYmxvY2tQcm9kdWNlcnNJbmZvIiwicGFyc2VkQnBpbmZvIiwiYWN0aXZlIiwiZ2V0QWN0aXZlIiwicHJvZHVjdGlvbiIsImdldFByb2R1Y3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7Ozs7QUFWQTtBQXVETyxNQUFNQSxpQkFBaUIsR0FBRztBQUMvQkMsRUFBQUEsRUFBRSxDQUFDQyxHQUFELEVBQStCO0FBQy9C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S0FBSyxDQUFDMmEsTUFBTixFQURJO0FBRVQvYSxRQUFBQSxNQUFNLEVBQUVJLEtBQUssQ0FBQ0gsU0FBTixFQUZDO0FBR1QrYSxRQUFBQSx1QkFBdUIsRUFBRTVhLEtBQUssQ0FBQzZhLDBCQUFOO0FBSGhCLE9BREQ7QUFNVkMsTUFBQUEsV0FBVyxFQUFFdGMsS0FBSyxDQUFDdWMsY0FBTixFQU5IO0FBT1ZDLE1BQUFBLGtCQUFrQixFQUFFUjtBQVBWLEtBQVo7O0FBU0EsUUFBSUEsTUFBSixFQUFZO0FBQ1YsWUFBTVMsWUFBWSxHQUFHLEVBQXJCOztBQUNBLFdBQUssSUFBSTlZLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxWSxNQUFNLENBQUNwWSxNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUN0QzhZLFFBQUFBLFlBQVksQ0FBQzlZLENBQUQsQ0FBWixHQUFrQjtBQUNoQjdELFVBQUFBLE9BQU8sRUFBRWtjLE1BQU0sQ0FBQ3JZLENBQUQsQ0FBTixDQUFVdEQsVUFBVixFQURPO0FBRWhCNFYsVUFBQUEsS0FBSyxFQUFFK0YsTUFBTSxDQUFDclksQ0FBRCxDQUFOLENBQVV1UyxRQUFWLEVBRlM7QUFHaEJ3RyxVQUFBQSxNQUFNLEVBQUVWLE1BQU0sQ0FBQ3JZLENBQUQsQ0FBTixDQUFVZ1osU0FBVixFQUhRO0FBSWhCQyxVQUFBQSxVQUFVLEVBQUVaLE1BQU0sQ0FBQ3JZLENBQUQsQ0FBTixDQUFVa1osYUFBVjtBQUpJLFNBQWxCO0FBTUQ7O0FBQ0Q3YixNQUFBQSxHQUFHLENBQUN3YixrQkFBSixHQUF5QkMsWUFBekI7QUFDRDs7QUFFRCxXQUFPemIsR0FBUDtBQUNEOztBQWxDZ0MsQ0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cblxuaW1wb3J0IHsgVGltZXN0YW1wIH0gZnJvbSBcImdvb2dsZS1wcm90b2J1Zi9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wX3BiXCI7XG5pbXBvcnQgYXBpUGIsIHtcbiAgR2V0QWNjb3VudFJlc3BvbnNlLFxuICBHZXRBY3Rpb25zUmVzcG9uc2UsXG4gIEdldFJlY2VpcHRCeUFjdGlvblJlc3BvbnNlLFxuICBHZXRTZXJ2ZXJNZXRhUmVzcG9uc2UsXG4gIFJlYWRTdGF0ZVJlc3BvbnNlXG59IGZyb20gXCIuLi8uLi9wcm90b2dlbi9wcm90by9hcGkvYXBpX3BiXCI7XG5pbXBvcnQgYWN0aW9uUGIsIHtcbiAgRXhlY3V0aW9uLFxuICBQdXRQb2xsUmVzdWx0XG59IGZyb20gXCIuLi8uLi9wcm90b2dlbi9wcm90by90eXBlcy9hY3Rpb25fcGJcIjtcblxuLy8gUHJvcGVydGllcyBvZiBhIFRpbWVzdGFtcC5cbmV4cG9ydCBpbnRlcmZhY2UgSVRpbWVzdGFtcCB7XG4gIC8vIFRpbWVzdGFtcCBzZWNvbmRzXG4gIHNlY29uZHM6IG51bWJlcjtcblxuICAvLyBUaW1lc3RhbXAgbmFub3NcbiAgbmFub3M6IG51bWJlcjtcbn1cblxuLy8gaW50ZXJmYWNlIGZvciBnZXQgYWNjb3VudFxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjY291bnRSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWNjb3VudFJlcXVlc3Qge1xuICAvLyBHZXRBY2NvdW50UmVxdWVzdCBhZGRyZXNzXG4gIGFkZHJlc3M6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhbiBBY2NvdW50TWV0YS5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjY291bnRNZXRhIHtcbiAgLy8gQWNjb3VudE1ldGEgYWRkcmVzc1xuICBhZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gQWNjb3VudE1ldGEgYmFsYW5jZVxuICBiYWxhbmNlOiBzdHJpbmc7XG5cbiAgLy8gQWNjb3VudE1ldGEgbm9uY2UuIFR5cGUgaXMgc3RyaW5nIGluIG5vZGUgYnV0IG51bWJlciBpbiBicm93c2VyLlxuICBub25jZTogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8vIEFjY291bnRNZXRhIHBlbmRpbmdOb25jZS4gVHlwZSBpcyBzdHJpbmcgaW4gbm9kZSBidXQgbnVtYmVyIGluIGJyb3dzZXIuXG4gIHBlbmRpbmdOb25jZTogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIC8vIEFjY291bnRNZXRhIG51bUFjdGlvbnMgcmVsYXRlZCB0byB0aGUgYWNjb3VudC4gVHlwZSBpcyBzdHJpbmcgaW4gbm9kZSBidXQgbnVtYmVyIGluIGJyb3dzZXIuXG4gIG51bUFjdGlvbnM6IHN0cmluZyB8IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjY291bnRSZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEFjY291bnRSZXNwb25zZSB7XG4gIC8vIEdldEFjY291bnRSZXNwb25zZSBhY2NvdW50TWV0YVxuICBhY2NvdW50TWV0YTogSUFjY291bnRNZXRhIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgR2V0QWNjb3VudFJlcXVlc3QgPSB7XG4gIHRvKHJlcTogSUdldEFjY291bnRSZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5HZXRBY2NvdW50UmVxdWVzdCgpO1xuICAgIHBiUmVxLnNldEFkZHJlc3MocmVxLmFkZHJlc3MpO1xuICAgIHJldHVybiBwYlJlcTtcbiAgfSxcblxuICBmcm9tKHBiUmVzOiBHZXRBY2NvdW50UmVzcG9uc2UpOiBJR2V0QWNjb3VudFJlc3BvbnNlIHtcbiAgICBjb25zdCBtZXRhID0gcGJSZXMuZ2V0QWNjb3VudG1ldGEoKTtcbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnRNZXRhOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY291bnRNZXRhOiB7XG4gICAgICAgIGFkZHJlc3M6IG1ldGEuZ2V0QWRkcmVzcygpLFxuICAgICAgICBiYWxhbmNlOiBtZXRhLmdldEJhbGFuY2UoKSxcbiAgICAgICAgbm9uY2U6IG1ldGEuZ2V0Tm9uY2UoKSxcbiAgICAgICAgcGVuZGluZ05vbmNlOiBtZXRhLmdldFBlbmRpbmdub25jZSgpLFxuICAgICAgICBudW1BY3Rpb25zOiBtZXRhLmdldE51bWFjdGlvbnMoKVxuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbi8vIGludGVyZmFjZSBmb3IgZ2V0IGNoYWluIG1ldGFcbmV4cG9ydCBpbnRlcmZhY2UgSUVwb2NoRGF0YSB7XG4gIG51bTogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgZ3Jhdml0eUNoYWluU3RhcnRIZWlnaHQ6IG51bWJlciB8IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2hhaW5NZXRhIHtcbiAgaGVpZ2h0OiBzdHJpbmc7XG4gIG51bUFjdGlvbnM6IHN0cmluZztcbiAgdHBzOiBzdHJpbmc7XG4gIGVwb2NoOiBJRXBvY2hEYXRhO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRDaGFpbk1ldGFSZXF1ZXN0IHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldENoYWluTWV0YVJlc3BvbnNlIHtcbiAgY2hhaW5NZXRhOiBJQ2hhaW5NZXRhO1xufVxuXG5leHBvcnQgY29uc3QgR2V0Q2hhaW5NZXRhUmVxdWVzdCA9IHtcbiAgLy8gQHRzLWlnbm9yZVxuICB0byhyZXE6IElHZXRDaGFpbk1ldGFSZXF1ZXN0KTogYW55IHtcbiAgICByZXR1cm4gbmV3IGFwaVBiLkdldENoYWluTWV0YVJlcXVlc3QoKTtcbiAgfSxcblxuICBmcm9tKHBiUmVzOiBhbnkpOiBJR2V0Q2hhaW5NZXRhUmVzcG9uc2Uge1xuICAgIGNvbnN0IG1ldGEgPSBwYlJlcy5nZXRDaGFpbm1ldGEoKTtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBjaGFpbk1ldGE6IG1ldGFcbiAgICB9O1xuICAgIGlmIChtZXRhKSB7XG4gICAgICBjb25zdCBlcG9jaERhdGEgPSBtZXRhLkVwb2NoO1xuICAgICAgcmVzLmNoYWluTWV0YSA9IHtcbiAgICAgICAgaGVpZ2h0OiBtZXRhLmdldEhlaWdodCgpLFxuICAgICAgICBudW1BY3Rpb25zOiBtZXRhLmdldE51bWFjdGlvbnMoKSxcbiAgICAgICAgdHBzOiBtZXRhLmdldFRwcygpLFxuICAgICAgICBlcG9jaDogZXBvY2hEYXRhXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59O1xuXG4vLyBpbnRlcmZhY2UgZm9yIGdldCBzZXJ2ZXIgbWV0YXNcbmV4cG9ydCBpbnRlcmZhY2UgSVNlcnZlck1ldGEge1xuICBwYWNrYWdlVmVyc2lvbjogc3RyaW5nO1xuICBwYWNrYWdlQ29tbWl0SUQ6IHN0cmluZztcbiAgZ2l0U3RhdHVzOiBzdHJpbmc7XG4gIGdvVmVyc2lvbjogc3RyaW5nO1xuICBidWlsZFRpbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJR2V0U2VydmVyTWV0YVJlcXVlc3Qge31cblxuZXhwb3J0IGludGVyZmFjZSBJR2V0U2VydmVyTWV0YVJlc3BvbnNlIHtcbiAgc2VydmVyTWV0YTogSVNlcnZlck1ldGEgfCB1bmRlZmluZWQ7XG59XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgR2V0U2VydmVyTWV0YVJlcXVlc3QgPSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgdG8ocmVxOiBJR2V0U2VydmVyTWV0YVJlcXVlc3QpOiBhcGlQYi5HZXRTZXJ2ZXJNZXRhUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBhcGlQYi5HZXRTZXJ2ZXJNZXRhUmVxdWVzdCgpO1xuICB9LFxuXG4gIGZyb20ocGJSZXM6IEdldFNlcnZlck1ldGFSZXNwb25zZSk6IElHZXRTZXJ2ZXJNZXRhUmVzcG9uc2Uge1xuICAgIGNvbnN0IG1ldGEgPSBwYlJlcy5nZXRTZXJ2ZXJtZXRhKCk7XG4gICAgaWYgKCFtZXRhKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZXJ2ZXJNZXRhOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlcnZlck1ldGE6IHtcbiAgICAgICAgcGFja2FnZVZlcnNpb246IG1ldGEuZ2V0UGFja2FnZXZlcnNpb24oKSxcbiAgICAgICAgcGFja2FnZUNvbW1pdElEOiBtZXRhLmdldFBhY2thZ2Vjb21taXRpZCgpLFxuICAgICAgICBnaXRTdGF0dXM6IG1ldGEuZ2V0R2l0c3RhdHVzKCksXG4gICAgICAgIGdvVmVyc2lvbjogbWV0YS5nZXRHb3ZlcnNpb24oKSxcbiAgICAgICAgYnVpbGRUaW1lOiBtZXRhLmdldEJ1aWxkdGltZSgpXG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxuLy8gaW50ZXJmYWNlIGZvciBnZXQgYmxvY2sgbWV0YXNcbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3Qge1xuICAvLyBHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3Qgc3RhcnRcbiAgc3RhcnQ6IG51bWJlcjtcblxuICAvLyBHZXRCbG9ja01ldGFzQnlJbmRleFJlcXVlc3QgY291bnRcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEJsb2NrTWV0YXNCeUhhc2hSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QmxvY2tNZXRhc0J5SGFzaFJlcXVlc3Qge1xuICAvLyBHZXRCbG9ja01ldGFzQnlIYXNoUmVxdWVzdCBhZGRyZXNzXG4gIGJsa0hhc2g6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEJsb2NrTWV0YXNSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QmxvY2tNZXRhc1JlcXVlc3Qge1xuICAvLyBHZXRCbG9ja01ldGFzUmVxdWVzdCBieUluZGV4XG4gIGJ5SW5kZXg/OiBJR2V0QmxvY2tNZXRhc0J5SW5kZXhSZXF1ZXN0O1xuXG4gIC8vIEdldEJsb2NrTWV0YXNSZXF1ZXN0IGJ5SGFzaFxuICBieUhhc2g/OiBJR2V0QmxvY2tNZXRhc0J5SGFzaFJlcXVlc3Q7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gYmxvY2tNZXRhLlxuZXhwb3J0IGludGVyZmFjZSBJQmxvY2tNZXRhIHtcbiAgLy8gQmxvY2tNZXRhIGhhc2hcbiAgaGFzaDogc3RyaW5nO1xuXG4gIC8vIEJsb2NrTWV0YSBoZWlnaHRcbiAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gQmxvY2tNZXRhIHRpbWVzdGFtcFxuICB0aW1lc3RhbXA6IElUaW1lc3RhbXA7XG5cbiAgLy8gQmxvY2tNZXRhIG51bUFjdGlvbnNcbiAgbnVtQWN0aW9uczogbnVtYmVyO1xuXG4gIC8vIEJsb2NrTWV0YSBwcm9kdWNlckFkZHJlc3NcbiAgcHJvZHVjZXJBZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gQmxvY2tNZXRhIHRyYW5zZmVyQW1vdW50XG4gIHRyYW5zZmVyQW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gQmxvY2tNZXRhIHR4Um9vdFxuICB0eFJvb3Q6IHN0cmluZztcblxuICAvLyBCbG9ja01ldGEgcmVjZWlwdFJvb3RcbiAgcmVjZWlwdFJvb3Q6IHN0cmluZztcblxuICAvLyBCbG9ja01ldGEgZGVsdGFTdGF0ZURpZ2VzdFxuICBkZWx0YVN0YXRlRGlnZXN0OiBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRCbG9ja01ldGFzUmVzcG9uc2UuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRCbG9ja01ldGFzUmVzcG9uc2Uge1xuICAvLyBHZXRCbG9ja01ldGFzUmVzcG9uc2UgYmxvY2tNZXRhc1xuICBibGtNZXRhczogQXJyYXk8SUJsb2NrTWV0YT47XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBHZXRCbG9ja01ldGFzUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJR2V0QmxvY2tNZXRhc1JlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxID0gbmV3IGFwaVBiLkdldEJsb2NrTWV0YXNSZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5ieUluZGV4KSB7XG4gICAgICBjb25zdCBwYlJlcUJ5SW5kZXggPSBuZXcgYXBpUGIuR2V0QmxvY2tNZXRhc0J5SW5kZXhSZXF1ZXN0KCk7XG4gICAgICBpZiAocmVxLmJ5SW5kZXguc3RhcnQpIHtcbiAgICAgICAgcGJSZXFCeUluZGV4LnNldFN0YXJ0KHJlcS5ieUluZGV4LnN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXEuYnlJbmRleC5jb3VudCkge1xuICAgICAgICBwYlJlcUJ5SW5kZXguc2V0Q291bnQocmVxLmJ5SW5kZXguY291bnQpO1xuICAgICAgfVxuICAgICAgcGJSZXEuc2V0QnlpbmRleChwYlJlcUJ5SW5kZXgpO1xuICAgIH0gZWxzZSBpZiAocmVxLmJ5SGFzaCkge1xuICAgICAgY29uc3QgcGJSZXFCeUhhc2ggPSBuZXcgYXBpUGIuR2V0QmxvY2tNZXRhQnlIYXNoUmVxdWVzdCgpO1xuICAgICAgcGJSZXFCeUhhc2guc2V0QmxraGFzaChyZXEuYnlIYXNoLmJsa0hhc2gpO1xuICAgICAgcGJSZXEuc2V0QnloYXNoKHBiUmVxQnlIYXNoKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxO1xuICB9LFxuXG4gIGZyb20ocGJSZXM6IGFueSk6IElHZXRCbG9ja01ldGFzUmVzcG9uc2Uge1xuICAgIGNvbnN0IG1ldGFzID0gcGJSZXMuZ2V0QmxrbWV0YXNMaXN0KCk7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgYmxrTWV0YXM6IG1ldGFzLFxuICAgICAgdG90YWw6IHBiUmVzLmdldFRvdGFsKClcbiAgICB9O1xuICAgIGlmIChtZXRhcykge1xuICAgICAgY29uc3QgcGFyc2VkTWV0YXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyc2VkTWV0YXNbaV0gPSB7XG4gICAgICAgICAgaGFzaDogbWV0YXNbaV0uZ2V0SGFzaCgpLFxuICAgICAgICAgIGhlaWdodDogbWV0YXNbaV0uZ2V0SGVpZ2h0KCksXG4gICAgICAgICAgdGltZXN0YW1wOiBtZXRhc1tpXS5nZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICBudW1BY3Rpb25zOiBtZXRhc1tpXS5nZXROdW1hY3Rpb25zKCksXG4gICAgICAgICAgcHJvZHVjZXJBZGRyZXNzOiBtZXRhc1tpXS5nZXRQcm9kdWNlcmFkZHJlc3MoKSxcbiAgICAgICAgICB0cmFuc2ZlckFtb3VudDogbWV0YXNbaV0uZ2V0VHJhbnNmZXJhbW91bnQoKSxcbiAgICAgICAgICB0eFJvb3Q6IG1ldGFzW2ldLmdldFR4cm9vdCgpLFxuICAgICAgICAgIHJlY2VpcHRSb290OiBtZXRhc1tpXS5nZXRSZWNlaXB0cm9vdCgpLFxuICAgICAgICAgIGRlbHRhU3RhdGVEaWdlc3Q6IG1ldGFzW2ldLmdldERlbHRhc3RhdGVkaWdlc3QoKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmVzLmJsa01ldGFzID0gcGFyc2VkTWV0YXM7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbn07XG5cbi8vIGludGVyZmFjZSBmb3IgZ2V0IGFjdGlvbnNcbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3Qge1xuICAvLyBHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3Qgc3RhcnRcbiAgc3RhcnQ6IG51bWJlcjtcblxuICAvLyBHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3QgY291bnRcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldEFjdGlvbnNCeUhhc2hSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWN0aW9uc0J5SGFzaFJlcXVlc3Qge1xuICAvLyBHZXRBY3Rpb25zQnlIYXNoUmVxdWVzdCBhY3Rpb25IYXNoXG4gIGFjdGlvbkhhc2g6IHN0cmluZztcblxuICAvLyBHZXRBY3Rpb25zQnlIYXNoUmVxdWVzdCBjaGVja2luZ1BlbmRpbmdcbiAgY2hlY2tpbmdQZW5kaW5nOiBib29sZWFuO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgR2V0QWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCB7XG4gIC8vIEdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IGFkZHJlc3NcbiAgYWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIEdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IHN0YXJ0XG4gIHN0YXJ0OiBudW1iZXI7XG5cbiAgLy8gR2V0QWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QgY291bnRcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRVbmNvbmZpcm1lZEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IHtcbiAgLy8gR2V0VW5jb25maXJtZWRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCBhZGRyZXNzXG4gIGFkZHJlc3M6IHN0cmluZztcblxuICAvLyBHZXRVbmNvbmZpcm1lZEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0IHN0YXJ0XG4gIHN0YXJ0OiBudW1iZXI7XG5cbiAgLy8gR2V0VW5jb25maXJtZWRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCBjb3VudFxuICBjb3VudDogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0IHtcbiAgLy8gR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0IGJsa0hhc2hcbiAgYmxrSGFzaDogc3RyaW5nO1xuXG4gIC8vIEdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdCBzdGFydFxuICBzdGFydDogbnVtYmVyO1xuXG4gIC8vIEdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdCBjb3VudFxuICBjb3VudDogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgR2V0QWN0aW9uc1JlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRBY3Rpb25zUmVxdWVzdCB7XG4gIC8vIEdldEFjdGlvbnNSZXF1ZXN0IGJ5SW5kZXhcbiAgYnlJbmRleD86IElHZXRBY3Rpb25zQnlJbmRleFJlcXVlc3Q7XG5cbiAgLy8gR2V0QWN0aW9uc1JlcXVlc3QgYnlIYXNoXG4gIGJ5SGFzaD86IElHZXRBY3Rpb25zQnlIYXNoUmVxdWVzdDtcblxuICAvLyBHZXRBY3Rpb25zUmVxdWVzdCBieUFkZHJcbiAgYnlBZGRyPzogSUdldEFjdGlvbnNCeUFkZHJlc3NSZXF1ZXN0O1xuXG4gIC8vIEdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QgdW5jb25maXJtZWRCeUFkZHJcbiAgdW5jb25maXJtZWRCeUFkZHI/OiBJR2V0VW5jb25maXJtZWRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdDtcblxuICAvLyBHZXRBY3Rpb25zQnlCbG9ja1JlcXVlc3QgYnlCbGtcbiAgYnlCbGs/OiBJR2V0QWN0aW9uc0J5QmxvY2tSZXF1ZXN0O1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgVHJhbnNmZXIuXG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2ZlciB7XG4gIC8vIFRyYW5zZmVyIGFtb3VudFxuICBhbW91bnQ6IHN0cmluZztcblxuICAvLyBUcmFuc2ZlciByZWNpcGllbnRcbiAgcmVjaXBpZW50OiBzdHJpbmc7XG5cbiAgLy8gVHJhbnNmZXIgcGF5bG9hZFxuICBwYXlsb2FkOiBCdWZmZXIgfCBzdHJpbmc7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBFeGVjdXRpb24uXG5leHBvcnQgaW50ZXJmYWNlIElFeGVjdXRpb24ge1xuICAvLyBFeGVjdXRpb24gYW1vdW50XG4gIGFtb3VudDogc3RyaW5nO1xuXG4gIC8vIEV4ZWN1dGlvbiBjb250cmFjdFxuICBjb250cmFjdDogc3RyaW5nO1xuXG4gIC8vIEV4ZWN1dGlvbiBkYXRhXG4gIGRhdGE6IEJ1ZmZlciB8IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFN0YXJ0U3ViQ2hhaW4uXG5leHBvcnQgaW50ZXJmYWNlIElTdGFydFN1YkNoYWluIHtcbiAgLy8gU3RhcnRTdWJDaGFpbiBjaGFpbklEXG4gIGNoYWluSUQ6IG51bWJlcjtcblxuICAvLyBTdGFydFN1YkNoYWluIHNlY3VyaXR5RGVwb3NpdFxuICBzZWN1cml0eURlcG9zaXQ6IHN0cmluZztcblxuICAvLyBTdGFydFN1YkNoYWluIG9wZXJhdGlvbkRlcG9zaXRcbiAgb3BlcmF0aW9uRGVwb3NpdDogc3RyaW5nO1xuXG4gIC8vIFN0YXJ0U3ViQ2hhaW4gc3RhcnRIZWlnaHRcbiAgc3RhcnRIZWlnaHQ6IG51bWJlcjtcblxuICAvLyBTdGFydFN1YkNoYWluIHBhcmVudEhlaWdodE9mZnNldFxuICBwYXJlbnRIZWlnaHRPZmZzZXQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFN0b3BTdWJDaGFpbi5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3BTdWJDaGFpbiB7XG4gIC8vIFN0b3BTdWJDaGFpbiBjaGFpbklEXG4gIGNoYWluSUQ6IG51bWJlcjtcblxuICAvLyBTdG9wU3ViQ2hhaW4gc3RvcEhlaWdodFxuICBzdG9wSGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gU3RvcFN1YkNoYWluIHN1YkNoYWluQWRkcmVzc1xuICBzdWJDaGFpbkFkZHJlc3M6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIE1lcmtsZVJvb3QuXG5leHBvcnQgaW50ZXJmYWNlIElNZXJrbGVSb290IHtcbiAgLy8gTWVya2xlUm9vdCBuYW1lXG4gIG5hbWU6IHN0cmluZztcblxuICAvLyBNZXJrbGVSb290IHZhbHVlXG4gIHZhbHVlOiBCdWZmZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBQdXRCbG9jay5cbmV4cG9ydCBpbnRlcmZhY2UgSVB1dEJsb2NrIHtcbiAgLy8gUHV0QmxvY2sgc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIFB1dEJsb2NrIGhlaWdodFxuICBoZWlnaHQ6IG51bWJlcjtcblxuICAvLyBQdXRCbG9jayByb290c1xuICByb290czogQXJyYXk8SU1lcmtsZVJvb3Q+O1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgQ3JlYXRlRGVwb3NpdC5cbmV4cG9ydCBpbnRlcmZhY2UgSUNyZWF0ZURlcG9zaXQge1xuICAvLyBDcmVhdGVEZXBvc2l0IGNoYWluSURcbiAgY2hhaW5JRDogbnVtYmVyO1xuXG4gIC8vIENyZWF0ZURlcG9zaXQgYW1vdW50XG4gIGFtb3VudDogc3RyaW5nO1xuXG4gIC8vIENyZWF0ZURlcG9zaXQgcmVjZWlwdFxuICByZWNpcGllbnQ6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFNldHRsZURlcG9zaXQuXG5leHBvcnQgaW50ZXJmYWNlIElTZXR0bGVEZXBvc2l0IHtcbiAgLy8gU2V0dGxlRGVwb3NpdCBhbW91bnRcbiAgYW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gU2V0dGxlRGVwb3NpdCByZWNpcGllbnRcbiAgcmVjaXBpZW50OiBzdHJpbmc7XG5cbiAgLy8gU2V0dGxlRGVwb3NpdCBpbmRleFxuICBpbmRleDogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgQ3JlYXRlUGx1bUNoYWluLlxuZXhwb3J0IGludGVyZmFjZSBJQ3JlYXRlUGx1bUNoYWluIHt9XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBUZXJtaW5hdGVQbHVtQ2hhaW4uXG5leHBvcnQgaW50ZXJmYWNlIElUZXJtaW5hdGVQbHVtQ2hhaW4ge1xuICAvLyBUZXJtaW5hdGVQbHVtQ2hhaW4gc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUGx1bVB1dEJsb2NrLlxuZXhwb3J0IGludGVyZmFjZSBJUGx1bVB1dEJsb2NrIHtcbiAgLy8gUGx1bVB1dEJsb2NrIHN1YkNoYWluQWRkcmVzc1xuICBzdWJDaGFpbkFkZHJlc3M6IHN0cmluZztcblxuICAvLyBQbHVtUHV0QmxvY2sgaGVpZ2h0XG4gIGhlaWdodDogbnVtYmVyO1xuXG4gIC8vIFBsdW1QdXRCbG9jayBoZWlnaHRcbiAgcm9vdHM6IE1hcDxzdHJpbmcsIEJ1ZmZlciB8IHt9Pjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFBsdW1DcmVhdGVEZXBvc2l0LlxuZXhwb3J0IGludGVyZmFjZSBJUGx1bUNyZWF0ZURlcG9zaXQge1xuICAvLyBQbHVtQ3JlYXRlRGVwb3NpdCBzdWJDaGFpbkFkZHJlc3NcbiAgc3ViQ2hhaW5BZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gUGx1bUNyZWF0ZURlcG9zaXQgYW1vdW50XG4gIGFtb3VudDogc3RyaW5nO1xuXG4gIC8vIFBsdW1DcmVhdGVEZXBvc2l0IHJlY2lwaWVudFxuICByZWNpcGllbnQ6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFBsdW1TdGFydEV4aXQuXG5leHBvcnQgaW50ZXJmYWNlIElQbHVtU3RhcnRFeGl0IHtcbiAgLy8gUGx1bVN0YXJ0RXhpdCBzdWJDaGFpbkFkZHJlc3NcbiAgc3ViQ2hhaW5BZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gUGx1bVN0YXJ0RXhpdCBwcmV2aW91c1RyYW5zZmVyXG4gIHByZXZpb3VzVHJhbnNmZXI6IEJ1ZmZlcjtcblxuICAvLyBQbHVtU3RhcnRFeGl0IHByZXZpb3VzVHJhbnNmZXJCbG9ja1Byb29mXG4gIHByZXZpb3VzVHJhbnNmZXJCbG9ja1Byb29mOiBCdWZmZXI7XG5cbiAgLy8gUGx1bVN0YXJ0RXhpdCBwcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHRcbiAgcHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gUGx1bVN0YXJ0RXhpdCBleGl0VHJhbnNmZXJcbiAgZXhpdFRyYW5zZmVyOiBCdWZmZXIgfCBzdHJpbmc7XG5cbiAgLy8gUGx1bVN0YXJ0RXhpdCBleGl0VHJhbnNmZXJCbG9ja1Byb29mXG4gIGV4aXRUcmFuc2ZlckJsb2NrUHJvb2Y6IEJ1ZmZlciB8IHN0cmluZztcblxuICAvLyBQbHVtU3RhcnRFeGl0IGV4aXRUcmFuc2ZlckJsb2NrSGVpZ2h0XG4gIGV4aXRUcmFuc2ZlckJsb2NrSGVpZ2h0OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBQbHVtQ2hhbGxlbmdlRXhpdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVBsdW1DaGFsbGVuZ2VFeGl0IHtcbiAgLy8gUGx1bUNoYWxsZW5nZUV4aXQgc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIFBsdW1DaGFsbGVuZ2VFeGl0IGNoYWluSURcbiAgY29pbklEOiBudW1iZXI7XG5cbiAgLy8gUGx1bUNoYWxsZW5nZUV4aXQgY2hhbGxlbmdlVHJhbnNmZXJcbiAgY2hhbGxlbmdlVHJhbnNmZXI6IEJ1ZmZlciB8IHN0cmluZztcblxuICAvLyBQbHVtQ2hhbGxlbmdlRXhpdCBjaGFsbGVuZ2VUcmFuc2ZlckJsb2NrUHJvb2ZcbiAgY2hhbGxlbmdlVHJhbnNmZXJCbG9ja1Byb29mOiBCdWZmZXIgfCBzdHJpbmc7XG5cbiAgLy8gUGx1bUNoYWxsZW5nZUV4aXQgY2hhbGxlbmdlVHJhbnNmZXJCbG9ja0hlaWdodFxuICBjaGFsbGVuZ2VUcmFuc2ZlckJsb2NrSGVpZ2h0OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0LlxuZXhwb3J0IGludGVyZmFjZSBJUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCB7XG4gIC8vIFBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgc3ViQ2hhaW5BZGRyZXNzXG4gIHN1YkNoYWluQWRkcmVzczogc3RyaW5nO1xuXG4gIC8vIFBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgY29pbklEXG4gIGNvaW5JRDogbnVtYmVyO1xuXG4gIC8vIFBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgY2hhbGxlbmdlVHJhbnNmZXJcbiAgY2hhbGxlbmdlVHJhbnNmZXI6IEJ1ZmZlcjtcblxuICAvLyBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IHJlc3BvbnNlVHJhbnNmZXJcbiAgcmVzcG9uc2VUcmFuc2ZlcjogQnVmZmVyO1xuXG4gIC8vIFBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgcmVzcG9uc2VUcmFuc2ZlckJsb2NrUHJvb2ZcbiAgcmVzcG9uc2VUcmFuc2ZlckJsb2NrUHJvb2Y6IEJ1ZmZlcjtcblxuICAvLyBQbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0IHByZXZpb3VzVHJhbnNmZXJCbG9ja0hlaWdodFxuICBwcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHQ6IG51bWJlcjtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFBsdW1GaW5hbGl6ZUV4aXQuXG5leHBvcnQgaW50ZXJmYWNlIElQbHVtRmluYWxpemVFeGl0IHtcbiAgLy8gUGx1bUZpbmFsaXplRXhpdCBzdWJDaGFpbkFkZHJlc3NcbiAgc3ViQ2hhaW5BZGRyZXNzOiBzdHJpbmc7XG5cbiAgLy8gUGx1bUZpbmFsaXplRXhpdCBjb2luSURcbiAgY29pbklEOiBudW1iZXI7XG59XG5cbi8vIHBsdW0gc3ViIGNoYWluIEFQSXNcbi8vIFByb3BlcnRpZXMgb2YgYSBQbHVtU2V0dGxlRGVwb3NpdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVBsdW1TZXR0bGVEZXBvc2l0IHtcbiAgLy8gUGx1bVNldHRsZURlcG9zaXQgY29pbklEXG4gIGNvaW5JRDogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUGx1bVRyYW5zZmVyLlxuZXhwb3J0IGludGVyZmFjZSBJUGx1bVRyYW5zZmVyIHtcbiAgLy8gUGx1bVRyYW5zZmVyIGNvaW5JRFxuICBjb2luSUQ6IG51bWJlcjtcblxuICAvLyBQbHVtVHJhbnNmZXIgZGVub21pbmF0aW9uXG4gIGRlbm9taW5hdGlvbjogQnVmZmVyO1xuXG4gIC8vIFBsdW1UcmFuc2ZlciBvd25lclxuICBvd25lcjogc3RyaW5nO1xuXG4gIC8vIFBsdW1UcmFuc2ZlciByZWNpcGllbnRcbiAgcmVjaXBpZW50OiBzdHJpbmc7XG59XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBCRUxPVyBBUkUgREVGSU5JVElPTlMgRk9SIEJMT0NLIFBST0RVQ0VSIFBST1RPQ09MXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgRGVwb3NpdFRvUmV3YXJkaW5nRnVuZC5cbmV4cG9ydCBpbnRlcmZhY2UgSURlcG9zaXRUb1Jld2FyZGluZ0Z1bmQge1xuICAvLyBEZXBvc2l0VG9SZXdhcmRpbmdGdW5kIGFtb3VudFxuICBhbW91bnQ6IHN0cmluZztcblxuICAvLyBEZXBvc2l0VG9SZXdhcmRpbmdGdW5kIGRhdGFcbiAgZGF0YTogQnVmZmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZC5cbmV4cG9ydCBpbnRlcmZhY2UgSUNsYWltRnJvbVJld2FyZGluZ0Z1bmQge1xuICAvLyBDbGFpbUZyb21SZXdhcmRpbmdGdW5kIGFtb3VudFxuICBhbW91bnQ6IHN0cmluZztcblxuICAvLyBDbGFpbUZyb21SZXdhcmRpbmdGdW5kIGRhdGFcbiAgZGF0YTogQnVmZmVyIHwge307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV3YXJkVHlwZSB7XG4gIEJsb2NrUmV3YXJkOiAwO1xuICBFcG9jaFJld2FyZDogMTtcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFNldFJld2FyZC5cbmV4cG9ydCBpbnRlcmZhY2UgSVNldFJld2FyZCB7XG4gIC8vIFNldFJld2FyZCBhbW91bnRcbiAgYW1vdW50OiBzdHJpbmc7XG5cbiAgLy8gU2V0UmV3YXJkIGRhdGFcbiAgZGF0YTogQnVmZmVyIHwge307XG5cbiAgLy8gU2V0UmV3YXJkIHR5cGVcbiAgdHlwZTogbnVtYmVyO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgR3JhbnRSZXdhcmQuXG5leHBvcnQgaW50ZXJmYWNlIElHcmFudFJld2FyZCB7XG4gIC8vIEdyYW50UmV3YXJkIHR5cGVcbiAgdHlwZTogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlciB8IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2FuZGlkYXRlIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB2b3RlczogQnVmZmVyIHwge307XG4gIHB1YktleTogQnVmZmVyIHwge307XG4gIHJld2FyZEFkZHJlc3M6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2FuZGlkYXRlTGlzdCB7XG4gIGNhbmRpZGF0ZXM6IEFycmF5PElDYW5kaWRhdGU+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQdXRQb2xsUmVzdWx0IHtcbiAgaGVpZ2h0OiBudW1iZXIgfCBzdHJpbmc7XG4gIGNhbmRpZGF0ZXM6IElDYW5kaWRhdGVMaXN0IHwgdW5kZWZpbmVkO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGFuIEFjdGlvbkNvcmUuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25Db3JlIHtcbiAgLy8gQWN0aW9uQ29yZSB2ZXJzaW9uXG4gIHZlcnNpb246IG51bWJlcjtcblxuICAvLyBBY3Rpb25Db3JlIG5vbmNlXG4gIG5vbmNlOiBzdHJpbmc7XG5cbiAgLy8gQWN0aW9uQ29yZSBnYXNMaW1pdFxuICBnYXNMaW1pdDogc3RyaW5nO1xuXG4gIC8vIEFjdGlvbkNvcmUgZ2FzUHJpY2VcbiAgZ2FzUHJpY2U6IHN0cmluZztcblxuICAvLyBBY3Rpb24gZGV0YWlsIGZpZWxkc1xuICAvLyBBY3Rpb25Db3JlIHRyYW5zZmVyXG4gIHRyYW5zZmVyPzogSVRyYW5zZmVyIHwgdW5kZWZpbmVkO1xuICAvLyBBY3Rpb25Db3JlIGV4ZWN1dGlvblxuICBleGVjdXRpb24/OiBJRXhlY3V0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIC8vIEZlZENoYWluXG4gIC8vIEFjdGlvbkNvcmUgc3RhcnRTdWJDaGFpblxuICBzdGFydFN1YkNoYWluPzogSVN0YXJ0U3ViQ2hhaW4gfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgc3RvcFN1YkNoYWluXG4gIHN0b3BTdWJDaGFpbj86IElTdG9wU3ViQ2hhaW4gfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcHV0QmxvY2tcbiAgcHV0QmxvY2s/OiBJUHV0QmxvY2sgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgY3JlYXRlRGVwb3NpdFxuICBjcmVhdGVEZXBvc2l0PzogSUNyZWF0ZURlcG9zaXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgc2V0dGxlRGVwb3NpdFxuICBzZXR0bGVEZXBvc2l0PzogSVNldHRsZURlcG9zaXQgfCB1bmRlZmluZWQ7XG5cbiAgLy8gUGx1bUNoYWluXG4gIC8vIEFjdGlvbkNvcmUgY3JlYXRlUGx1bUNoYWluXG4gIGNyZWF0ZVBsdW1DaGFpbj86IElDcmVhdGVQbHVtQ2hhaW4gfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgdGVybWluYXRlUGx1bUNoYWluXG4gIHRlcm1pbmF0ZVBsdW1DaGFpbj86IElUZXJtaW5hdGVQbHVtQ2hhaW4gfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bVB1dEJsb2NrXG4gIHBsdW1QdXRCbG9jaz86IElQbHVtUHV0QmxvY2sgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bUNyZWF0ZURlcG9zaXRcbiAgcGx1bUNyZWF0ZURlcG9zaXQ/OiBJUGx1bUNyZWF0ZURlcG9zaXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bVN0YXJ0RXhpdFxuICBwbHVtU3RhcnRFeGl0PzogSVBsdW1TdGFydEV4aXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bUNoYWxsZW5nZUV4aXRcbiAgcGx1bUNoYWxsZW5nZUV4aXQ/OiBJUGx1bUNoYWxsZW5nZUV4aXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdFxuICBwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0PzogSVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bUZpbmFsaXplRXhpdFxuICBwbHVtRmluYWxpemVFeGl0PzogSVBsdW1GaW5hbGl6ZUV4aXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bVNldHRsZURlcG9zaXRcbiAgcGx1bVNldHRsZURlcG9zaXQ/OiBJUGx1bVNldHRsZURlcG9zaXQgfCB1bmRlZmluZWQ7XG4gIC8vIEFjdGlvbkNvcmUgcGx1bVRyYW5zZmVyXG4gIHBsdW1UcmFuc2Zlcj86IElQbHVtVHJhbnNmZXIgfCB1bmRlZmluZWQ7XG5cbiAgLy8gUmV3YXJkaW5nIHByb3RvY29sIGFjdGlvbnNcbiAgLy8gQWN0aW9uQ29yZSBkZXBvc2l0VG9SZXdhcmRpbmdGdW5kXG4gIGRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQ/OiBJRGVwb3NpdFRvUmV3YXJkaW5nRnVuZCB8IHVuZGVmaW5lZDtcbiAgLy8gQWN0aW9uQ29yZSBjbGFpbUZyb21SZXdhcmRpbmdGdW5kXG4gIGNsYWltRnJvbVJld2FyZGluZ0Z1bmQ/OiBJQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCB8IHVuZGVmaW5lZDtcbiAgLy8gQWN0aW9uQ29yZSBncmFudFJld2FyZFxuICBncmFudFJld2FyZD86IElHcmFudFJld2FyZCB8IHVuZGVmaW5lZDtcblxuICBwdXRQb2xsUmVzdWx0PzogSVB1dFBvbGxSZXN1bHQgfCB1bmRlZmluZWQ7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gQWN0aW9uLlxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uIHtcbiAgLy8gQWN0aW9uIGNvcmVcbiAgY29yZTogSUFjdGlvbkNvcmUgfCB1bmRlZmluZWQ7XG5cbiAgLy8gQWN0aW9uIHNlbmRlclB1YmtleVxuICBzZW5kZXJQdWJLZXk6IFVpbnQ4QXJyYXkgfCBzdHJpbmc7XG5cbiAgLy8gQWN0aW9uIHNpZ25hdHVyZVxuICBzaWduYXR1cmU6IFVpbnQ4QXJyYXkgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblRyYW5zZmVyKHJlcTogSVRyYW5zZmVyIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiVHJhbnNmZXIgPSBuZXcgYWN0aW9uUGIuVHJhbnNmZXIoKTtcbiAgcGJUcmFuc2Zlci5zZXRBbW91bnQocmVxLmFtb3VudCk7XG4gIHBiVHJhbnNmZXIuc2V0UmVjaXBpZW50KHJlcS5yZWNpcGllbnQpO1xuICBwYlRyYW5zZmVyLnNldFBheWxvYWQocmVxLnBheWxvYWQpO1xuICByZXR1cm4gcGJUcmFuc2Zlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvVGltZXN0YW1wKHRpbWVzdGFtcDogSVRpbWVzdGFtcCk6IFRpbWVzdGFtcCB7XG4gIGNvbnN0IHRzID0gbmV3IFRpbWVzdGFtcCgpO1xuICBpZiAodGltZXN0YW1wKSB7XG4gICAgdHMuc2V0U2Vjb25kcyh0aW1lc3RhbXAuc2Vjb25kcyk7XG4gICAgdHMuc2V0TmFub3ModGltZXN0YW1wLm5hbm9zKTtcbiAgfVxuICByZXR1cm4gdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvbkV4ZWN1dGlvbihcbiAgcmVxOiBJRXhlY3V0aW9uIHwgdW5kZWZpbmVkXG4pOiBhY3Rpb25QYi5FeGVjdXRpb24gfCB1bmRlZmluZWQge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJFeGVjdXRpb24gPSBuZXcgYWN0aW9uUGIuRXhlY3V0aW9uKCk7XG4gIHBiRXhlY3V0aW9uLnNldEFtb3VudChyZXEuYW1vdW50KTtcbiAgcGJFeGVjdXRpb24uc2V0Q29udHJhY3QocmVxLmNvbnRyYWN0KTtcbiAgcGJFeGVjdXRpb24uc2V0RGF0YShyZXEuZGF0YSk7XG4gIHJldHVybiBwYkV4ZWN1dGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uU3RhcnRTdWJDaGFpbihyZXE6IElTdGFydFN1YkNoYWluIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcGJTdGFydFN1YkNoYWluID0gbmV3IGFjdGlvblBiLlN0YXJ0U3ViQ2hhaW4oKTtcbiAgcGJTdGFydFN1YkNoYWluLnNldENoYWluaWQocmVxLmNoYWluSUQpO1xuICBwYlN0YXJ0U3ViQ2hhaW4uc2V0U2VjdXJpdHlkZXBvc2l0KHJlcS5zZWN1cml0eURlcG9zaXQpO1xuICBwYlN0YXJ0U3ViQ2hhaW4uc2V0T3BlcmF0aW9uZGVwb3NpdChyZXEub3BlcmF0aW9uRGVwb3NpdCk7XG4gIHBiU3RhcnRTdWJDaGFpbi5zZXRTdGFydGhlaWdodChyZXEuc3RhcnRIZWlnaHQpO1xuICBwYlN0YXJ0U3ViQ2hhaW4uc2V0UGFyZW50aGVpZ2h0b2Zmc2V0KHJlcS5wYXJlbnRIZWlnaHRPZmZzZXQpO1xuICByZXR1cm4gcGJTdGFydFN1YkNoYWluO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25TdG9wU3ViQ2hhaW4ocmVxOiBJU3RvcFN1YkNoYWluIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiU3RvcFN1YkNoYWluID0gbmV3IGFjdGlvblBiLlN0b3BTdWJDaGFpbigpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiU3RvcFN1YkNoYWluLnNldENoYWluaWQocmVxLmNoYWluSUQpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiU3RvcFN1YkNoYWluLnNldFN0b3BoZWlnaHQocmVxLnN0b3BIZWlnaHQpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiU3RvcFN1YkNoYWluLnNldFN1YmNoYWluYWRkcmVzcyhyZXEuc3ViQ2hhaW5BZGRyZXNzKTtcbiAgcmV0dXJuIHBiU3RvcFN1YkNoYWluO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QdXRCbG9jayhyZXE6IElQdXRCbG9jayB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCByb290cyA9IHJlcS5yb290cztcbiAgY29uc3Qgcm9vdExpc3QgPSBbXTtcbiAgaWYgKHJlcS5yb290cyAmJiByb290cykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVxLnJvb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb290SXRlbSA9IHJlcS5yb290cyAmJiByZXEucm9vdHNbaV07XG4gICAgICBjb25zdCBta3Jvb3QgPSBuZXcgYWN0aW9uUGIuTWVya2xlUm9vdCgpO1xuICAgICAgbWtyb290LnNldE5hbWUocm9vdEl0ZW0ubmFtZSk7XG4gICAgICBta3Jvb3Quc2V0VmFsdWUocm9vdEl0ZW0udmFsdWUpO1xuICAgICAgcm9vdExpc3RbaV0gPSBta3Jvb3Q7XG4gICAgfVxuICB9XG4gIGNvbnN0IHBiUHV0QmxvY2sgPSBuZXcgYWN0aW9uUGIuUHV0QmxvY2soKTtcbiAgcGJQdXRCbG9jay5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHBiUHV0QmxvY2suc2V0SGVpZ2h0KHJlcS5oZWlnaHQpO1xuICBwYlB1dEJsb2NrLnNldFJvb3RzTGlzdChyb290TGlzdCk7XG4gIHJldHVybiBwYlB1dEJsb2NrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25DcmVhdGVEZXBvc2l0KHJlcTogSUNyZWF0ZURlcG9zaXQgfCB1bmRlZmluZWQpOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJDcmVhdGVEZXBvc2l0ID0gbmV3IGFjdGlvblBiLkNyZWF0ZURlcG9zaXQoKTtcbiAgcGJDcmVhdGVEZXBvc2l0LnNldENoYWluaWQocmVxLmNoYWluSUQpO1xuICBwYkNyZWF0ZURlcG9zaXQuc2V0QW1vdW50KHJlcS5hbW91bnQpO1xuICBwYkNyZWF0ZURlcG9zaXQuc2V0UmVjaXBpZW50KHJlcS5yZWNpcGllbnQpO1xuICByZXR1cm4gcGJDcmVhdGVEZXBvc2l0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25TZXR0bGVEZXBvc2l0KHJlcTogSVNldHRsZURlcG9zaXQgfCB1bmRlZmluZWQpOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJTZXR0bGVEZXBvc2l0ID0gbmV3IGFjdGlvblBiLlNldHRsZURlcG9zaXQoKTtcbiAgcGJTZXR0bGVEZXBvc2l0LnNldEFtb3VudChyZXEuYW1vdW50KTtcbiAgcGJTZXR0bGVEZXBvc2l0LnNldFJlY2lwaWVudChyZXEucmVjaXBpZW50KTtcbiAgcGJTZXR0bGVEZXBvc2l0LnNldEluZGV4KHJlcS5pbmRleCk7XG4gIHJldHVybiBwYlNldHRsZURlcG9zaXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvbkNyZWF0ZVBsdW1DaGFpbihcbiAgcmVxOiBJQ3JlYXRlUGx1bUNoYWluIHwgdW5kZWZpbmVkXG4pOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIG5ldyBhY3Rpb25QYi5DcmVhdGVQbHVtQ2hhaW4oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uVGVybWluYXRlUGx1bUNoYWluKFxuICByZXE6IElUZXJtaW5hdGVQbHVtQ2hhaW4gfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYlRlcm1pbmF0ZVBsdW1DaGFpbiA9IG5ldyBhY3Rpb25QYi5UZXJtaW5hdGVQbHVtQ2hhaW4oKTtcbiAgcGJUZXJtaW5hdGVQbHVtQ2hhaW4uc2V0U3ViY2hhaW5hZGRyZXNzKHJlcS5zdWJDaGFpbkFkZHJlc3MpO1xuICByZXR1cm4gcGJUZXJtaW5hdGVQbHVtQ2hhaW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1QdXRCbG9jayhyZXE6IElQbHVtUHV0QmxvY2sgfCB1bmRlZmluZWQpOiBhbnkge1xuICBpZiAoIXJlcSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGJQbHVtUHV0QmxvY2sgPSBuZXcgYWN0aW9uUGIuUGx1bVB1dEJsb2NrKCk7XG4gIHBiUGx1bVB1dEJsb2NrLnNldFN1YmNoYWluYWRkcmVzcyhyZXEuc3ViQ2hhaW5BZGRyZXNzKTtcbiAgcGJQbHVtUHV0QmxvY2suc2V0SGVpZ2h0KHJlcS5oZWlnaHQpO1xuICByZXR1cm4gcGJQbHVtUHV0QmxvY2s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1DcmVhdGVEZXBvc2l0KFxuICByZXE6IElQbHVtQ3JlYXRlRGVwb3NpdCB8IHVuZGVmaW5lZFxuKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcGJQbHVtQ3JlYXRlRGVwb3NpdCA9IG5ldyBhY3Rpb25QYi5QbHVtQ3JlYXRlRGVwb3NpdCgpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiUGx1bUNyZWF0ZURlcG9zaXQuc2V0U3ViY2hhaW5hZGRyZXNzKHJlcS5zdWJDaGFpbkFkZHJlc3MpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiUGx1bUNyZWF0ZURlcG9zaXQuc2V0QW1vdW50KHJlcS5hbW91bnQpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiUGx1bUNyZWF0ZURlcG9zaXQuc2V0UmVjaXBpZW50KHJlcS5yZWNpcGllbnQpO1xuICByZXR1cm4gcGJQbHVtQ3JlYXRlRGVwb3NpdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uUGx1bVN0YXJ0RXhpdChyZXE6IElQbHVtU3RhcnRFeGl0IHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcGJQbHVtU3RhcnRFeGl0ID0gbmV3IGFjdGlvblBiLlBsdW1TdGFydEV4aXQoKTtcbiAgcGJQbHVtU3RhcnRFeGl0LnNldFN1YmNoYWluYWRkcmVzcyhyZXEuc3ViQ2hhaW5BZGRyZXNzKTtcbiAgcGJQbHVtU3RhcnRFeGl0LnNldFByZXZpb3VzdHJhbnNmZXIocmVxLnByZXZpb3VzVHJhbnNmZXIpO1xuICBwYlBsdW1TdGFydEV4aXQuc2V0UHJldmlvdXN0cmFuc2ZlcmJsb2NrcHJvb2YocmVxLnByZXZpb3VzVHJhbnNmZXJCbG9ja1Byb29mKTtcbiAgcGJQbHVtU3RhcnRFeGl0LnNldFByZXZpb3VzdHJhbnNmZXJibG9ja2hlaWdodChcbiAgICByZXEucHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0XG4gICk7XG4gIHBiUGx1bVN0YXJ0RXhpdC5zZXRFeGl0dHJhbnNmZXIocmVxLmV4aXRUcmFuc2Zlcik7XG4gIHBiUGx1bVN0YXJ0RXhpdC5zZXRFeGl0dHJhbnNmZXJibG9ja3Byb29mKHJlcS5leGl0VHJhbnNmZXJCbG9ja1Byb29mKTtcbiAgcGJQbHVtU3RhcnRFeGl0LnNldEV4aXR0cmFuc2ZlcmJsb2NraGVpZ2h0KHJlcS5leGl0VHJhbnNmZXJCbG9ja0hlaWdodCk7XG4gIHJldHVybiBwYlBsdW1TdGFydEV4aXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1DaGFsbGVuZ2VFeGl0KFxuICByZXE6IElQbHVtQ2hhbGxlbmdlRXhpdCB8IHVuZGVmaW5lZFxuKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcGJQbHVtQ2hhbGxlbmdlRXhpdCA9IG5ldyBhY3Rpb25QYi5QbHVtQ2hhbGxlbmdlRXhpdCgpO1xuICBwYlBsdW1DaGFsbGVuZ2VFeGl0LnNldFN1YmNoYWluYWRkcmVzcyhyZXEuc3ViQ2hhaW5BZGRyZXNzKTtcbiAgcGJQbHVtQ2hhbGxlbmdlRXhpdC5zZXRDb2luaWQocmVxLmNvaW5JRCk7XG4gIHBiUGx1bUNoYWxsZW5nZUV4aXQuc2V0Q2hhbGxlbmdldHJhbnNmZXIocmVxLmNoYWxsZW5nZVRyYW5zZmVyKTtcbiAgcGJQbHVtQ2hhbGxlbmdlRXhpdC5zZXRDaGFsbGVuZ2V0cmFuc2ZlcmJsb2NrcHJvb2YoXG4gICAgcmVxLmNoYWxsZW5nZVRyYW5zZmVyQmxvY2tQcm9vZlxuICApO1xuICBwYlBsdW1DaGFsbGVuZ2VFeGl0LnNldENoYWxsZW5nZXRyYW5zZmVyYmxvY2toZWlnaHQoXG4gICAgcmVxLmNoYWxsZW5nZVRyYW5zZmVyQmxvY2tIZWlnaHRcbiAgKTtcbiAgcmV0dXJuIHBiUGx1bUNoYWxsZW5nZUV4aXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQoXG4gIHJlcTogSVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdCA9IG5ldyBhY3Rpb25QYi5QbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0KCk7XG4gIHBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdC5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdC5zZXRDb2luaWQocmVxLmNvaW5JRCk7XG4gIHBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdC5zZXRDaGFsbGVuZ2V0cmFuc2ZlcihyZXEuY2hhbGxlbmdlVHJhbnNmZXIpO1xuICBwYlBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQuc2V0UmVzcG9uc2V0cmFuc2ZlcihyZXEucmVzcG9uc2VUcmFuc2Zlcik7XG4gIHBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdC5zZXRSZXNwb25zZXRyYW5zZmVyYmxvY2twcm9vZihcbiAgICByZXEucmVzcG9uc2VUcmFuc2ZlckJsb2NrUHJvb2ZcbiAgKTtcbiAgcmV0dXJuIHBiUGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQWN0aW9uUGx1bUZpbmFsaXplRXhpdChcbiAgcmVxOiBJUGx1bUZpbmFsaXplRXhpdCB8IHVuZGVmaW5lZFxuKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiUGx1bUZpbmFsaXplRXhpdCA9IG5ldyBhY3Rpb25QYi5QbHVtRmluYWxpemVFeGl0KCk7XG4gIHBiUGx1bUZpbmFsaXplRXhpdC5zZXRTdWJjaGFpbmFkZHJlc3MocmVxLnN1YkNoYWluQWRkcmVzcyk7XG4gIHBiUGx1bUZpbmFsaXplRXhpdC5zZXRDb2luaWQocmVxLmNvaW5JRCk7XG4gIHJldHVybiBwYlBsdW1GaW5hbGl6ZUV4aXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvblBsdW1TZXR0bGVEZXBvc2l0KFxuICByZXE6IElQbHVtU2V0dGxlRGVwb3NpdCB8IHVuZGVmaW5lZFxuKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiUGx1bVNldHRsZURlcG9zaXQgPSBuZXcgYWN0aW9uUGIuUGx1bVNldHRsZURlcG9zaXQoKTtcbiAgcGJQbHVtU2V0dGxlRGVwb3NpdC5zZXRDb2luaWQocmVxLmNvaW5JRCk7XG4gIHJldHVybiBwYlBsdW1TZXR0bGVEZXBvc2l0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25QbHVtVHJhbnNmZXIocmVxOiBJUGx1bVRyYW5zZmVyIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgaWYgKCFyZXEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBiUGx1bVRyYW5zZmVyID0gbmV3IGFjdGlvblBiLlBsdW1UcmFuc2ZlcigpO1xuICBwYlBsdW1UcmFuc2Zlci5zZXRDb2luaWQocmVxLmNvaW5JRCk7XG4gIHBiUGx1bVRyYW5zZmVyLnNldERlbm9taW5hdGlvbihyZXEuZGVub21pbmF0aW9uKTtcbiAgcGJQbHVtVHJhbnNmZXIuc2V0T3duZXIocmVxLm93bmVyKTtcbiAgcGJQbHVtVHJhbnNmZXIuc2V0UmVjaXBpZW50KHJlcS5yZWNpcGllbnQpO1xuICByZXR1cm4gcGJQbHVtVHJhbnNmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvbkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQoXG4gIHJlcTogSURlcG9zaXRUb1Jld2FyZGluZ0Z1bmQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQgPSBuZXcgYWN0aW9uUGIuRGVwb3NpdFRvUmV3YXJkaW5nRnVuZCgpO1xuICBwYkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQuc2V0QW1vdW50KHJlcS5hbW91bnQpO1xuICBwYkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQuc2V0RGF0YShyZXEuZGF0YSk7XG4gIHJldHVybiBwYkRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FjdGlvbkNsYWltRnJvbVJld2FyZGluZ0Z1bmQoXG4gIHJlcTogSUNsYWltRnJvbVJld2FyZGluZ0Z1bmQgfCB1bmRlZmluZWRcbik6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYkNsYWltRnJvbVJld2FyZGluZ0Z1bmQgPSBuZXcgYWN0aW9uUGIuQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZCgpO1xuICAvLyBAdHMtaWdub3JlXG4gIHBiQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZC5zZXRBbW91bnQocmVxLmFtb3VudCk7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcGJDbGFpbUZyb21SZXdhcmRpbmdGdW5kLnNldERhdGEocmVxLmRhdGEpO1xuICByZXR1cm4gcGJDbGFpbUZyb21SZXdhcmRpbmdGdW5kO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb25HcmFudFJld2FyZChyZXE6IElHcmFudFJld2FyZCB8IHVuZGVmaW5lZCk6IGFueSB7XG4gIGlmICghcmVxKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYkdyYW50UmV3YXJkID0gbmV3IGFjdGlvblBiLkdyYW50UmV3YXJkKCk7XG4gIHBiR3JhbnRSZXdhcmQuc2V0VHlwZShyZXEudHlwZSk7XG4gIHJldHVybiBwYkdyYW50UmV3YXJkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY3Rpb24ocmVxOiBJQWN0aW9uKTogYW55IHtcbiAgY29uc3QgcGJBY3Rpb25Db3JlID0gbmV3IGFjdGlvblBiLkFjdGlvbkNvcmUoKTtcblxuICBjb25zdCBjb3JlID0gcmVxICYmIHJlcS5jb3JlO1xuICBpZiAoY29yZSkge1xuICAgIHBiQWN0aW9uQ29yZS5zZXRWZXJzaW9uKGNvcmUudmVyc2lvbik7XG4gICAgcGJBY3Rpb25Db3JlLnNldE5vbmNlKE51bWJlcihjb3JlLm5vbmNlKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldEdhc2xpbWl0KE51bWJlcihjb3JlLmdhc0xpbWl0KSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldEdhc3ByaWNlKGNvcmUuZ2FzUHJpY2UpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRUcmFuc2Zlcih0b0FjdGlvblRyYW5zZmVyKGNvcmUudHJhbnNmZXIpKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0RXhlY3V0aW9uKHRvQWN0aW9uRXhlY3V0aW9uKGNvcmUuZXhlY3V0aW9uKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldFN0YXJ0c3ViY2hhaW4odG9BY3Rpb25TdGFydFN1YkNoYWluKGNvcmUuc3RhcnRTdWJDaGFpbikpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRTdG9wc3ViY2hhaW4odG9BY3Rpb25TdG9wU3ViQ2hhaW4oY29yZS5zdG9wU3ViQ2hhaW4pKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UHV0YmxvY2sodG9BY3Rpb25QdXRCbG9jayhjb3JlLnB1dEJsb2NrKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldENyZWF0ZWRlcG9zaXQodG9BY3Rpb25DcmVhdGVEZXBvc2l0KGNvcmUuY3JlYXRlRGVwb3NpdCkpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRTZXR0bGVkZXBvc2l0KHRvQWN0aW9uU2V0dGxlRGVwb3NpdChjb3JlLnNldHRsZURlcG9zaXQpKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0Q3JlYXRlcGx1bWNoYWluKFxuICAgICAgdG9BY3Rpb25DcmVhdGVQbHVtQ2hhaW4oY29yZS5jcmVhdGVQbHVtQ2hhaW4pXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0VGVybWluYXRlcGx1bWNoYWluKFxuICAgICAgdG9BY3Rpb25UZXJtaW5hdGVQbHVtQ2hhaW4oY29yZS50ZXJtaW5hdGVQbHVtQ2hhaW4pXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0UGx1bXB1dGJsb2NrKHRvQWN0aW9uUGx1bVB1dEJsb2NrKGNvcmUucGx1bVB1dEJsb2NrKSk7XG4gICAgcGJBY3Rpb25Db3JlLnNldFBsdW1jcmVhdGVkZXBvc2l0KFxuICAgICAgdG9BY3Rpb25QbHVtQ3JlYXRlRGVwb3NpdChjb3JlLnBsdW1DcmVhdGVEZXBvc2l0KVxuICAgICk7XG4gICAgcGJBY3Rpb25Db3JlLnNldFBsdW1zdGFydGV4aXQodG9BY3Rpb25QbHVtU3RhcnRFeGl0KGNvcmUucGx1bVN0YXJ0RXhpdCkpO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtY2hhbGxlbmdlZXhpdChcbiAgICAgIHRvQWN0aW9uUGx1bUNoYWxsZW5nZUV4aXQoY29yZS5wbHVtQ2hhbGxlbmdlRXhpdClcbiAgICApO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtcmVzcG9uc2VjaGFsbGVuZ2VleGl0KFxuICAgICAgdG9BY3Rpb25QbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0KGNvcmUucGx1bVJlc3BvbnNlQ2hhbGxlbmdlRXhpdClcbiAgICApO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtZmluYWxpemVleGl0KFxuICAgICAgdG9BY3Rpb25QbHVtRmluYWxpemVFeGl0KGNvcmUucGx1bUZpbmFsaXplRXhpdClcbiAgICApO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtc2V0dGxlZGVwb3NpdChcbiAgICAgIHRvQWN0aW9uUGx1bVNldHRsZURlcG9zaXQoY29yZS5wbHVtU2V0dGxlRGVwb3NpdClcbiAgICApO1xuICAgIHBiQWN0aW9uQ29yZS5zZXRQbHVtdHJhbnNmZXIodG9BY3Rpb25QbHVtVHJhbnNmZXIoY29yZS5wbHVtVHJhbnNmZXIpKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0RGVwb3NpdHRvcmV3YXJkaW5nZnVuZChcbiAgICAgIHRvQWN0aW9uRGVwb3NpdFRvUmV3YXJkaW5nRnVuZChjb3JlLmRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQpXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0Q2xhaW1mcm9tcmV3YXJkaW5nZnVuZChcbiAgICAgIHRvQWN0aW9uQ2xhaW1Gcm9tUmV3YXJkaW5nRnVuZChjb3JlLmNsYWltRnJvbVJld2FyZGluZ0Z1bmQpXG4gICAgKTtcbiAgICBwYkFjdGlvbkNvcmUuc2V0R3JhbnRyZXdhcmQodG9BY3Rpb25HcmFudFJld2FyZChjb3JlLmdyYW50UmV3YXJkKSk7XG4gIH1cblxuICBjb25zdCBwYkFjdGlvbiA9IG5ldyBhY3Rpb25QYi5BY3Rpb24oKTtcbiAgcGJBY3Rpb24uc2V0Q29yZShwYkFjdGlvbkNvcmUpO1xuXG4gIGlmIChyZXEuc2VuZGVyUHViS2V5KSB7XG4gICAgcGJBY3Rpb24uc2V0U2VuZGVycHVia2V5KHJlcS5zZW5kZXJQdWJLZXkpO1xuICB9XG5cbiAgaWYgKHJlcS5zaWduYXR1cmUpIHtcbiAgICBwYkFjdGlvbi5zZXRTaWduYXR1cmUocmVxLnNpZ25hdHVyZSk7XG4gIH1cblxuICByZXR1cm4gcGJBY3Rpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbkluZm8ge1xuICBhY3Rpb246IElBY3Rpb247XG4gIGFjdEhhc2g6IHN0cmluZztcbiAgYmxrSGFzaDogc3RyaW5nO1xuICB0aW1lc3RhbXA6IElUaW1lc3RhbXA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEFjdGlvbnNSZXNwb25zZSB7XG4gIGFjdGlvbkluZm86IEFycmF5PElBY3Rpb25JbmZvPjtcbn1cblxuZXhwb3J0IGNvbnN0IEdldEFjdGlvbnNSZXF1ZXN0ID0ge1xuICBieUFkZHJUbyhieUFkZHI6IElHZXRBY3Rpb25zQnlBZGRyZXNzUmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXFCeUFkZHIgPSBuZXcgYXBpUGIuR2V0QWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QoKTtcbiAgICBpZiAoYnlBZGRyLmFkZHJlc3MpIHtcbiAgICAgIHBiUmVxQnlBZGRyLnNldEFkZHJlc3MoYnlBZGRyLmFkZHJlc3MpO1xuICAgIH1cbiAgICBpZiAoYnlBZGRyLnN0YXJ0KSB7XG4gICAgICBwYlJlcUJ5QWRkci5zZXRTdGFydChieUFkZHIuc3RhcnQpO1xuICAgIH1cbiAgICBpZiAoYnlBZGRyLmNvdW50KSB7XG4gICAgICBwYlJlcUJ5QWRkci5zZXRDb3VudChieUFkZHIuY291bnQpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXFCeUFkZHI7XG4gIH0sXG5cbiAgYnlCbGtUbyhieUJsazogSUdldEFjdGlvbnNCeUJsb2NrUmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXFCeUJsayA9IG5ldyBhcGlQYi5HZXRBY3Rpb25zQnlCbG9ja1JlcXVlc3QoKTtcbiAgICBpZiAoYnlCbGsuYmxrSGFzaCkge1xuICAgICAgcGJSZXFCeUJsay5zZXRCbGtoYXNoKGJ5QmxrLmJsa0hhc2gpO1xuICAgIH1cbiAgICBpZiAoYnlCbGsuc3RhcnQpIHtcbiAgICAgIHBiUmVxQnlCbGsuc2V0U3RhcnQoYnlCbGsuc3RhcnQpO1xuICAgIH1cbiAgICBpZiAoYnlCbGsuY291bnQpIHtcbiAgICAgIHBiUmVxQnlCbGsuc2V0Q291bnQoYnlCbGsuY291bnQpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXFCeUJsaztcbiAgfSxcblxuICBieUhhc2hUbyhieUhhc2g6IElHZXRBY3Rpb25zQnlIYXNoUmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXFCeUhhc2ggPSBuZXcgYXBpUGIuR2V0QWN0aW9uQnlIYXNoUmVxdWVzdCgpO1xuICAgIGlmIChieUhhc2guYWN0aW9uSGFzaCkge1xuICAgICAgcGJSZXFCeUhhc2guc2V0QWN0aW9uaGFzaChieUhhc2guYWN0aW9uSGFzaCk7XG4gICAgfVxuICAgIGlmIChieUhhc2guY2hlY2tpbmdQZW5kaW5nKSB7XG4gICAgICBwYlJlcUJ5SGFzaC5zZXRDaGVja3BlbmRpbmcoYnlIYXNoLmNoZWNraW5nUGVuZGluZyk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcUJ5SGFzaDtcbiAgfSxcblxuICBieUluZGV4VG8oYnlJbmRleDogSUdldEFjdGlvbnNCeUluZGV4UmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXFCeUluZGV4ID0gbmV3IGFwaVBiLkdldEFjdGlvbnNCeUluZGV4UmVxdWVzdCgpO1xuICAgIGlmIChieUluZGV4LnN0YXJ0KSB7XG4gICAgICBwYlJlcUJ5SW5kZXguc2V0U3RhcnQoYnlJbmRleC5zdGFydCk7XG4gICAgfVxuICAgIGlmIChieUluZGV4LmNvdW50KSB7XG4gICAgICBwYlJlcUJ5SW5kZXguc2V0Q291bnQoYnlJbmRleC5jb3VudCk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcUJ5SW5kZXg7XG4gIH0sXG5cbiAgdW5jb25maXJtZWRCeUFkZHJUbyhcbiAgICB1bmNvbmZpcm1lZEJ5QWRkcjogSUdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3RcbiAgKTogYW55IHtcbiAgICBjb25zdCBwYlJlcVVuY29uZmlybWVkQnlBZGRyID0gbmV3IGFwaVBiLkdldFVuY29uZmlybWVkQWN0aW9uc0J5QWRkcmVzc1JlcXVlc3QoKTtcbiAgICBpZiAodW5jb25maXJtZWRCeUFkZHIuc3RhcnQpIHtcbiAgICAgIHBiUmVxVW5jb25maXJtZWRCeUFkZHIuc2V0U3RhcnQodW5jb25maXJtZWRCeUFkZHIuc3RhcnQpO1xuICAgIH1cbiAgICBpZiAodW5jb25maXJtZWRCeUFkZHIuY291bnQpIHtcbiAgICAgIHBiUmVxVW5jb25maXJtZWRCeUFkZHIuc2V0Q291bnQodW5jb25maXJtZWRCeUFkZHIuY291bnQpO1xuICAgIH1cbiAgICBpZiAodW5jb25maXJtZWRCeUFkZHIuYWRkcmVzcykge1xuICAgICAgcGJSZXFVbmNvbmZpcm1lZEJ5QWRkci5zZXRBZGRyZXNzKHVuY29uZmlybWVkQnlBZGRyLmFkZHJlc3MpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXFVbmNvbmZpcm1lZEJ5QWRkcjtcbiAgfSxcbiAgdG8ocmVxOiBJR2V0QWN0aW9uc1JlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxID0gbmV3IGFwaVBiLkdldEFjdGlvbnNSZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5ieUFkZHIpIHtcbiAgICAgIHBiUmVxLnNldEJ5YWRkcihHZXRBY3Rpb25zUmVxdWVzdC5ieUFkZHJUbyhyZXEuYnlBZGRyKSk7XG4gICAgfVxuICAgIGlmIChyZXEuYnlCbGspIHtcbiAgICAgIHBiUmVxLnNldEJ5YmxrKEdldEFjdGlvbnNSZXF1ZXN0LmJ5QmxrVG8ocmVxLmJ5QmxrKSk7XG4gICAgfVxuICAgIGlmIChyZXEuYnlIYXNoKSB7XG4gICAgICBwYlJlcS5zZXRCeWhhc2goR2V0QWN0aW9uc1JlcXVlc3QuYnlIYXNoVG8ocmVxLmJ5SGFzaCkpO1xuICAgIH1cbiAgICBpZiAocmVxLmJ5SW5kZXgpIHtcbiAgICAgIHBiUmVxLnNldEJ5aW5kZXgoR2V0QWN0aW9uc1JlcXVlc3QuYnlJbmRleFRvKHJlcS5ieUluZGV4KSk7XG4gICAgfVxuICAgIGlmIChyZXEudW5jb25maXJtZWRCeUFkZHIpIHtcbiAgICAgIHBiUmVxLnNldFVuY29uZmlybWVkYnlhZGRyKFxuICAgICAgICBHZXRBY3Rpb25zUmVxdWVzdC51bmNvbmZpcm1lZEJ5QWRkclRvKHJlcS51bmNvbmZpcm1lZEJ5QWRkcilcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcTtcbiAgfSxcblxuICBmcm9tVHJhbnNmZXIocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHRyYW5zZmVyRGF0YSA9IHBiUmVzO1xuICAgIGlmIChwYlJlcykge1xuICAgICAgdHJhbnNmZXJEYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHBiUmVzLmdldEFtb3VudCgpLFxuICAgICAgICByZWNpcGllbnQ6IHBiUmVzLmdldFJlY2lwaWVudCgpLFxuICAgICAgICBwYXlsb2FkOiBwYlJlcy5nZXRQYXlsb2FkKClcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2ZlckRhdGE7XG4gIH0sXG5cbiAgZnJvbVZvdGUocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHZvdGVEYXRhID0gcGJSZXM7XG4gICAgaWYgKHZvdGVEYXRhKSB7XG4gICAgICB2b3RlRGF0YSA9IHtcbiAgICAgICAgdGltZXN0YW1wOiBwYlJlcy5nZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgdm90ZWVBZGRyZXNzOiBwYlJlcy5nZXRWb3RlZWFkZHJlc3MoKVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHZvdGVEYXRhO1xuICB9LFxuXG4gIGZyb21FeGVjdXRpb24ocGJSZXM6IEV4ZWN1dGlvbiB8IHVuZGVmaW5lZCk6IElFeGVjdXRpb24gfCB1bmRlZmluZWQge1xuICAgIGlmICghcGJSZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGFtb3VudDogcGJSZXMuZ2V0QW1vdW50KCksXG4gICAgICBjb250cmFjdDogcGJSZXMuZ2V0Q29udHJhY3QoKSxcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGRhdGE6IEJ1ZmZlci5mcm9tKHBiUmVzLmdldERhdGEoKSlcbiAgICB9O1xuICB9LFxuXG4gIGZyb21TdGFydFN1YkNoYWluKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBzdGFydFN1YkNoYWluRGF0YSA9IHBiUmVzO1xuICAgIGlmIChzdGFydFN1YkNoYWluRGF0YSkge1xuICAgICAgc3RhcnRTdWJDaGFpbkRhdGEgPSB7XG4gICAgICAgIGNoYWluSUQ6IHBiUmVzLmNoYWluSUQsXG4gICAgICAgIHNlY3VyaXR5RGVwb3NpdDogcGJSZXMuc2VjdXJpdHlEZXBvc2l0LFxuICAgICAgICBvcGVyYXRpb25EZXBvc2l0OiBwYlJlcy5vcGVyYXRpb25EZXBvc2l0LFxuICAgICAgICBzdGFydEhlaWdodDogcGJSZXMuc3RhcnRIZWlnaHQsXG4gICAgICAgIHBhcmVudEhlaWdodE9mZnNldDogcGJSZXMucGFyZW50SGVpZ2h0T2Zmc2V0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnRTdWJDaGFpbkRhdGE7XG4gIH0sXG5cbiAgZnJvbVN0b3BTdWJDaGFpbihwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgc3RvcFN1YkNoYWluRGF0YSA9IHBiUmVzO1xuICAgIGlmIChzdG9wU3ViQ2hhaW5EYXRhKSB7XG4gICAgICBzdG9wU3ViQ2hhaW5EYXRhID0ge1xuICAgICAgICBjaGFpbklEOiBwYlJlcy5jaGFpbklELFxuICAgICAgICBzdG9wSGVpZ2h0OiBwYlJlcy5zdG9wSGVpZ2h0LFxuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzc1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3BTdWJDaGFpbkRhdGE7XG4gIH0sXG5cbiAgZnJvbVB1dEJsb2NrKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBwdXRCbG9ja0RhdGEgPSBwYlJlcztcbiAgICBpZiAocHV0QmxvY2tEYXRhKSB7XG4gICAgICBjb25zdCByb290c0RhdGEgPSBwYlJlcy5yb290cztcbiAgICAgIGlmIChyb290c0RhdGEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYlJlcy5yb290cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJvb3RzRGF0YVtpXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IHBiUmVzLnJvb3RzW2ldLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogcGJSZXMucm9vdHNbaV0udmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwdXRCbG9ja0RhdGEgPSB7XG4gICAgICAgIHN1YkNoYWluQWRkcmVzczogcGJSZXMuc3ViQ2hhaW5BZGRyZXNzLFxuICAgICAgICBoZWlnaHQ6IHBiUmVzLmhlaWdodCxcbiAgICAgICAgcm9vdHM6IHJvb3RzRGF0YVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHB1dEJsb2NrRGF0YTtcbiAgfSxcblxuICBmcm9tQ3JlYXRlRGVwb3NpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgY3JlYXRlRGVwb3NpdERhdGEgPSBwYlJlcztcbiAgICBpZiAoY3JlYXRlRGVwb3NpdERhdGEpIHtcbiAgICAgIGNyZWF0ZURlcG9zaXREYXRhID0ge1xuICAgICAgICBjaGFpbklEOiBwYlJlcy5jaGFpbklELFxuICAgICAgICBhbW91bnQ6IHBiUmVzLmFtb3VudCxcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5yZWNpcGllbnRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVEZXBvc2l0RGF0YTtcbiAgfSxcblxuICBmcm9tU2V0dGxlRGVwb3NpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgc2V0dGxlRGVwb3NpdERhdGEgPSBwYlJlcztcbiAgICBpZiAoc2V0dGxlRGVwb3NpdERhdGEpIHtcbiAgICAgIHNldHRsZURlcG9zaXREYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHBiUmVzLmFtb3VudCxcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5yZWNpcGllbnQsXG4gICAgICAgIGluZGV4OiBwYlJlcy5pbmRleFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHNldHRsZURlcG9zaXREYXRhO1xuICB9LFxuXG4gIGZyb21DcmVhdGVQbHVtQ2hhaW4ocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IGNyZWF0ZVBsdW1DaGFpbkRhdGEgPSBwYlJlcztcbiAgICBpZiAoY3JlYXRlUGx1bUNoYWluRGF0YSkge1xuICAgICAgY3JlYXRlUGx1bUNoYWluRGF0YSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUGx1bUNoYWluRGF0YTtcbiAgfSxcblxuICBmcm9tVGVybWluYXRlUGx1bUNoYWluKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCB0ZXJtaW5hdGVQbHVtQ2hhaW5EYXRhID0gcGJSZXM7XG4gICAgaWYgKHRlcm1pbmF0ZVBsdW1DaGFpbkRhdGEpIHtcbiAgICAgIHRlcm1pbmF0ZVBsdW1DaGFpbkRhdGEgPSB7XG4gICAgICAgIHN1YkNoYWluQWRkcmVzczogcGJSZXMuc3ViQ2hhaW5BZGRyZXNzXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGVybWluYXRlUGx1bUNoYWluRGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bVB1dEJsb2NrKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBwbHVtUHV0QmxvY2tEYXRhID0gcGJSZXM7XG4gICAgaWYgKHBsdW1QdXRCbG9ja0RhdGEpIHtcbiAgICAgIHBsdW1QdXRCbG9ja0RhdGEgPSB7XG4gICAgICAgIHN1YkNoYWluQWRkcmVzczogcGJSZXMuc3ViQ2hhaW5BZGRyZXNzLFxuICAgICAgICBoZWlnaHQ6IHBiUmVzLmhlaWdodCxcbiAgICAgICAgcm9vdHM6IHBiUmVzLnJvb3RzXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcGx1bVB1dEJsb2NrRGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bUNyZWF0ZURlcG9zaXQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHBsdW1DcmVhdGVEZXBvc2l0RGF0YSA9IHBiUmVzO1xuICAgIGlmIChwbHVtQ3JlYXRlRGVwb3NpdERhdGEpIHtcbiAgICAgIHBsdW1DcmVhdGVEZXBvc2l0RGF0YSA9IHtcbiAgICAgICAgc3ViQ2hhaW5BZGRyZXNzOiBwYlJlcy5zdWJDaGFpbkFkZHJlc3MsXG4gICAgICAgIGFtb3VudDogcGJSZXMuYW1vdW50LFxuICAgICAgICByZWNpcGllbnQ6IHBiUmVzLnJlY2lwaWVudFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBsdW1DcmVhdGVEZXBvc2l0RGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bVN0YXJ0RXhpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bVN0YXJ0RXhpdERhdGEgPSBwYlJlcztcbiAgICBpZiAocGx1bVN0YXJ0RXhpdERhdGEpIHtcbiAgICAgIHBsdW1TdGFydEV4aXREYXRhID0ge1xuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzcyxcbiAgICAgICAgcHJldmlvdXNUcmFuc2ZlcjogcGJSZXMucHJldmlvdXNUcmFuc2ZlcixcbiAgICAgICAgcHJldmlvdXNUcmFuc2ZlckJsb2NrUHJvb2Y6IHBiUmVzLnByZXZpb3VzVHJhbnNmZXJCbG9ja1Byb29mLFxuICAgICAgICBwcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHQ6IHBiUmVzLnByZXZpb3VzVHJhbnNmZXJCbG9ja0hlaWdodCxcbiAgICAgICAgZXhpdFRyYW5zZmVyOiBwYlJlcy5leGl0VHJhbnNmZXIsXG4gICAgICAgIGV4aXRUcmFuc2ZlckJsb2NrUHJvb2Y6IHBiUmVzLmV4aXRUcmFuc2ZlckJsb2NrUHJvb2YsXG4gICAgICAgIGV4aXRUcmFuc2ZlckJsb2NrSGVpZ2h0OiBwYlJlcy5leGl0VHJhbnNmZXJCbG9ja0hlaWdodFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBsdW1TdGFydEV4aXREYXRhO1xuICB9LFxuXG4gIGZyb21QbHVtQ2hhbGxlbmdlRXhpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bUNoYWxsZW5nZUV4aXREYXRhID0gcGJSZXM7XG4gICAgaWYgKHBsdW1DaGFsbGVuZ2VFeGl0RGF0YSkge1xuICAgICAgcGx1bUNoYWxsZW5nZUV4aXREYXRhID0ge1xuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzcyxcbiAgICAgICAgY29pbklEOiBwYlJlcy5jb2luSUQsXG4gICAgICAgIGNoYWxsZW5nZVRyYW5zZmVyOiBwYlJlcy5jaGFsbGVuZ2VUcmFuc2ZlcixcbiAgICAgICAgY2hhbGxlbmdlVHJhbnNmZXJCbG9ja1Byb29mOiBwYlJlcy5jaGFsbGVuZ2VUcmFuc2ZlckJsb2NrUHJvb2YsXG4gICAgICAgIGNoYWxsZW5nZVRyYW5zZmVyQmxvY2tIZWlnaHQ6IHBiUmVzLmNoYWxsZW5nZVRyYW5zZmVyQmxvY2tIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtQ2hhbGxlbmdlRXhpdERhdGE7XG4gIH0sXG5cbiAgZnJvbVBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXREYXRhID0gcGJSZXM7XG4gICAgaWYgKHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXREYXRhKSB7XG4gICAgICBwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0RGF0YSA9IHtcbiAgICAgICAgc3ViQ2hhaW5BZGRyZXNzOiBwYlJlcy5zdWJDaGFpbkFkZHJlc3MsXG4gICAgICAgIGNvaW5JRDogcGJSZXMuY29pbklELFxuICAgICAgICBjaGFsbGVuZ2VUcmFuc2ZlcjogcGJSZXMuY2hhbGxlbmdlVHJhbnNmZXIsXG4gICAgICAgIHJlc3BvbnNlVHJhbnNmZXI6IHBiUmVzLnJlc3BvbnNlVHJhbnNmZXIsXG4gICAgICAgIHJlc3BvbnNlVHJhbnNmZXJCbG9ja1Byb29mOiBwYlJlcy5yZXNwb25zZVRyYW5zZmVyQmxvY2tQcm9vZixcbiAgICAgICAgcHJldmlvdXNUcmFuc2ZlckJsb2NrSGVpZ2h0OiBwYlJlcy5wcmV2aW91c1RyYW5zZmVyQmxvY2tIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0RGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bUZpbmFsaXplRXhpdChwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bUZpbmFsaXplRXhpdERhdGEgPSBwYlJlcztcbiAgICBpZiAocGx1bUZpbmFsaXplRXhpdERhdGEpIHtcbiAgICAgIHBsdW1GaW5hbGl6ZUV4aXREYXRhID0ge1xuICAgICAgICBzdWJDaGFpbkFkZHJlc3M6IHBiUmVzLnN1YkNoYWluQWRkcmVzcyxcbiAgICAgICAgY29pbklEOiBwYlJlcy5jb2luSURcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtRmluYWxpemVFeGl0RGF0YTtcbiAgfSxcblxuICBmcm9tUGx1bVNldHRsZURlcG9zaXQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IHBsdW1TZXR0bGVEZXBvc2l0RGF0YSA9IHBiUmVzO1xuICAgIGlmIChwbHVtU2V0dGxlRGVwb3NpdERhdGEpIHtcbiAgICAgIHBsdW1TZXR0bGVEZXBvc2l0RGF0YSA9IHtcbiAgICAgICAgY29pbklEOiBwYlJlcy5jb2luSURcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtU2V0dGxlRGVwb3NpdERhdGE7XG4gIH0sXG5cbiAgZnJvbVBsdW1UcmFuc2ZlcihwYlJlczogYW55KTogYW55IHtcbiAgICBsZXQgcGx1bVRyYW5zZmVyRGF0YSA9IHBiUmVzO1xuICAgIGlmIChwbHVtVHJhbnNmZXJEYXRhKSB7XG4gICAgICBwbHVtVHJhbnNmZXJEYXRhID0ge1xuICAgICAgICBjb2luSUQ6IHBiUmVzLmNvaW5JRCxcbiAgICAgICAgZGVub21pbmF0aW9uOiBwYlJlcy5kZW5vbWluYXRpb24sXG4gICAgICAgIG93bmVyOiBwYlJlcy5vd25lcixcbiAgICAgICAgcmVjaXBpZW50OiBwYlJlcy5yZWNpcGllbnRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBwbHVtVHJhbnNmZXJEYXRhO1xuICB9LFxuXG4gIGZyb21EZXBvc2l0VG9SZXdhcmRpbmdGdW5kKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBkZXBvc2l0VG9SZXdhcmRpbmdGdW5kRGF0YSA9IHBiUmVzO1xuICAgIGlmIChkZXBvc2l0VG9SZXdhcmRpbmdGdW5kRGF0YSkge1xuICAgICAgZGVwb3NpdFRvUmV3YXJkaW5nRnVuZERhdGEgPSB7XG4gICAgICAgIGFtb3VudDogcGJSZXMuYW1vdW50LFxuICAgICAgICBkYXRhOiBwYlJlcy5kYXRhXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZGVwb3NpdFRvUmV3YXJkaW5nRnVuZERhdGE7XG4gIH0sXG5cbiAgZnJvbUNsYWltRnJvbVJld2FyZGluZ0Z1bmQocGJSZXM6IGFueSk6IGFueSB7XG4gICAgbGV0IGNsYWltRnJvbVJld2FyZGluZ0Z1bmREYXRhID0gcGJSZXM7XG4gICAgaWYgKGNsYWltRnJvbVJld2FyZGluZ0Z1bmREYXRhKSB7XG4gICAgICBjbGFpbUZyb21SZXdhcmRpbmdGdW5kRGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiBwYlJlcy5hbW91bnQsXG4gICAgICAgIGRhdGE6IHBiUmVzLmRhdGFcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjbGFpbUZyb21SZXdhcmRpbmdGdW5kRGF0YTtcbiAgfSxcblxuICBmcm9tU2V0UmV3YXJkKHBiUmVzOiBhbnkpOiBhbnkge1xuICAgIGxldCBzZXRSZXdhcmREYXRhID0gcGJSZXM7XG4gICAgaWYgKHNldFJld2FyZERhdGEpIHtcbiAgICAgIHNldFJld2FyZERhdGEgPSB7XG4gICAgICAgIGFtb3VudDogcGJSZXMuYW1vdW50LFxuICAgICAgICBkYXRhOiBwYlJlcy5kYXRhLFxuICAgICAgICB0eXBlOiBwYlJlcy50eXBlXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc2V0UmV3YXJkRGF0YTtcbiAgfSxcblxuICBmcm9tR3JhbnRSZXdhcmQoXG4gICAgcGJSZXM6IGFjdGlvblBiLkdyYW50UmV3YXJkIHwgdW5kZWZpbmVkXG4gICk6IElHcmFudFJld2FyZCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFwYlJlcykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHBiUmVzLmdldFR5cGUoKSxcbiAgICAgIGhlaWdodDogcGJSZXMuZ2V0SGVpZ2h0KClcbiAgICB9O1xuICB9LFxuXG4gIGdldFB1dFBvbGxSZXN1bHQocmVxOiBQdXRQb2xsUmVzdWx0IHwgdW5kZWZpbmVkKTogSVB1dFBvbGxSZXN1bHQgfCB1bmRlZmluZWQge1xuICAgIGlmICghcmVxKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZXQgY2FuZGlkYXRlTGlzdDogSUNhbmRpZGF0ZUxpc3QgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmF3Q2FuZGlkYXRlcyA9IHJlcS5nZXRDYW5kaWRhdGVzKCk7XG4gICAgaWYgKHJhd0NhbmRpZGF0ZXMpIHtcbiAgICAgIGNhbmRpZGF0ZUxpc3QgPSB7XG4gICAgICAgIGNhbmRpZGF0ZXM6IFtdXG4gICAgICB9O1xuICAgICAgY29uc3QgcmF3Q2FuZGlkYXRlc0xpc3QgPSByYXdDYW5kaWRhdGVzLmdldENhbmRpZGF0ZXNMaXN0KCk7XG4gICAgICBpZiAocmF3Q2FuZGlkYXRlc0xpc3QpIHtcbiAgICAgICAgZm9yIChjb25zdCByYXdDYW5kaWRhdGUgb2YgcmF3Q2FuZGlkYXRlc0xpc3QpIHtcbiAgICAgICAgICBjYW5kaWRhdGVMaXN0LmNhbmRpZGF0ZXMucHVzaCh7XG4gICAgICAgICAgICBhZGRyZXNzOiByYXdDYW5kaWRhdGUuZ2V0QWRkcmVzcygpLFxuICAgICAgICAgICAgdm90ZXM6IHJhd0NhbmRpZGF0ZS5nZXRWb3RlcygpLFxuICAgICAgICAgICAgcHViS2V5OiByYXdDYW5kaWRhdGUuZ2V0UHVia2V5KCksXG4gICAgICAgICAgICByZXdhcmRBZGRyZXNzOiByYXdDYW5kaWRhdGUuZ2V0UmV3YXJkYWRkcmVzcygpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogcmVxLmdldEhlaWdodCgpLFxuICAgICAgY2FuZGlkYXRlczogY2FuZGlkYXRlTGlzdFxuICAgIH07XG4gIH0sXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1mdW5jLWJvZHktbGVuZ3RoXG4gIGZyb20ocGJSZXM6IEdldEFjdGlvbnNSZXNwb25zZSk6IElHZXRBY3Rpb25zUmVzcG9uc2Uge1xuICAgIGNvbnN0IHJlcyA9ICh7XG4gICAgICBhY3Rpb25JbmZvOiBbXVxuICAgIH0gYXMgYW55KSBhcyBJR2V0QWN0aW9uc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHJhd0FjdGlvbkluZm9MaXN0ID0gcGJSZXMuZ2V0QWN0aW9uaW5mb0xpc3QoKTtcbiAgICBpZiAoIXJhd0FjdGlvbkluZm9MaXN0KSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcmF3QWN0aW9uSW5mbyBvZiByYXdBY3Rpb25JbmZvTGlzdCkge1xuICAgICAgY29uc3QgYWN0aW9uSW5mbyA9ICh7XG4gICAgICAgIGFjdEhhc2g6IHJhd0FjdGlvbkluZm8uZ2V0QWN0aGFzaCgpLFxuICAgICAgICBibGtIYXNoOiByYXdBY3Rpb25JbmZvLmdldEJsa2hhc2goKSxcbiAgICAgICAgdGltZXN0YW1wOiByYXdBY3Rpb25JbmZvLmdldFRpbWVzdGFtcCgpXG4gICAgICB9IGFzIGFueSkgYXMgSUFjdGlvbkluZm87XG5cbiAgICAgIGNvbnN0IHJhd0FjdGlvbiA9IHJhd0FjdGlvbkluZm8uZ2V0QWN0aW9uKCk7XG4gICAgICBpZiAocmF3QWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJhd0FjdGlvbkNvcmUgPSByYXdBY3Rpb24uZ2V0Q29yZSgpO1xuICAgICAgICBsZXQgYWN0aW9uQ29yZTogSUFjdGlvbkNvcmUgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChyYXdBY3Rpb25Db3JlKSB7XG4gICAgICAgICAgYWN0aW9uQ29yZSA9IHtcbiAgICAgICAgICAgIHZlcnNpb246IHJhd0FjdGlvbkNvcmUuZ2V0VmVyc2lvbigpLFxuICAgICAgICAgICAgbm9uY2U6IFN0cmluZyhyYXdBY3Rpb25Db3JlLmdldE5vbmNlKCkpLFxuICAgICAgICAgICAgZ2FzTGltaXQ6IFN0cmluZyhyYXdBY3Rpb25Db3JlLmdldEdhc2xpbWl0KCkpLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IHJhd0FjdGlvbkNvcmUuZ2V0R2FzcHJpY2UoKSxcbiAgICAgICAgICAgIHRyYW5zZmVyOiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tVHJhbnNmZXIoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0VHJhbnNmZXIoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGV4ZWN1dGlvbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbUV4ZWN1dGlvbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRFeGVjdXRpb24oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXJ0U3ViQ2hhaW46IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21TdGFydFN1YkNoYWluKFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFN0YXJ0c3ViY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0b3BTdWJDaGFpbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVN0b3BTdWJDaGFpbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRTdG9wc3ViY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHB1dEJsb2NrOiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUHV0QmxvY2soXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UHV0YmxvY2soKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNyZWF0ZURlcG9zaXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21DcmVhdGVEZXBvc2l0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldENyZWF0ZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHNldHRsZURlcG9zaXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21TZXR0bGVEZXBvc2l0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFNldHRsZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNyZWF0ZVBsdW1DaGFpbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbUNyZWF0ZVBsdW1DaGFpbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRDcmVhdGVwbHVtY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRlcm1pbmF0ZVBsdW1DaGFpbjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVRlcm1pbmF0ZVBsdW1DaGFpbihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRUZXJtaW5hdGVwbHVtY2hhaW4oKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1QdXRCbG9jazogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVBsdW1QdXRCbG9jayhcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRQbHVtcHV0YmxvY2soKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1DcmVhdGVEZXBvc2l0OiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUGx1bUNyZWF0ZURlcG9zaXQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UGx1bWNyZWF0ZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1TdGFydEV4aXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21QbHVtU3RhcnRFeGl0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFBsdW1zdGFydGV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1DaGFsbGVuZ2VFeGl0OiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUGx1bUNoYWxsZW5nZUV4aXQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UGx1bWNoYWxsZW5nZWV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1SZXNwb25zZUNoYWxsZW5nZUV4aXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21QbHVtUmVzcG9uc2VDaGFsbGVuZ2VFeGl0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFBsdW1yZXNwb25zZWNoYWxsZW5nZWV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1GaW5hbGl6ZUV4aXQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21QbHVtRmluYWxpemVFeGl0KFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldFBsdW1maW5hbGl6ZWV4aXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1TZXR0bGVEZXBvc2l0OiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tUGx1bVNldHRsZURlcG9zaXQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UGx1bXNldHRsZWRlcG9zaXQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHBsdW1UcmFuc2ZlcjogR2V0QWN0aW9uc1JlcXVlc3QuZnJvbVBsdW1UcmFuc2ZlcihcbiAgICAgICAgICAgICAgcmF3QWN0aW9uQ29yZS5nZXRQbHVtdHJhbnNmZXIoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGRlcG9zaXRUb1Jld2FyZGluZ0Z1bmQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21EZXBvc2l0VG9SZXdhcmRpbmdGdW5kKFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldERlcG9zaXR0b3Jld2FyZGluZ2Z1bmQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNsYWltRnJvbVJld2FyZGluZ0Z1bmQ6IEdldEFjdGlvbnNSZXF1ZXN0LmZyb21DbGFpbUZyb21SZXdhcmRpbmdGdW5kKFxuICAgICAgICAgICAgICByYXdBY3Rpb25Db3JlLmdldENsYWltZnJvbXJld2FyZGluZ2Z1bmQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGdyYW50UmV3YXJkOiBHZXRBY3Rpb25zUmVxdWVzdC5mcm9tR3JhbnRSZXdhcmQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0R3JhbnRyZXdhcmQoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHB1dFBvbGxSZXN1bHQ6IEdldEFjdGlvbnNSZXF1ZXN0LmdldFB1dFBvbGxSZXN1bHQoXG4gICAgICAgICAgICAgIHJhd0FjdGlvbkNvcmUuZ2V0UHV0cG9sbHJlc3VsdCgpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGlvbkluZm8uYWN0aW9uID0ge1xuICAgICAgICAgIGNvcmU6IGFjdGlvbkNvcmUsXG4gICAgICAgICAgc2VuZGVyUHViS2V5OiByYXdBY3Rpb24uZ2V0U2VuZGVycHVia2V5KCksXG4gICAgICAgICAgc2lnbmF0dXJlOiByYXdBY3Rpb24uZ2V0U2lnbmF0dXJlKClcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmVzLmFjdGlvbkluZm8ucHVzaChhY3Rpb25JbmZvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG59O1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgU3VnZ2VzdEdhc1ByaWNlIFJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElTdWdnZXN0R2FzUHJpY2VSZXF1ZXN0IHt9XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTdWdnZXN0R2FzUHJpY2VSZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSVN1Z2dlc3RHYXNQcmljZVJlc3BvbnNlIHtcbiAgLy8gU3VnZ2VzdEdhc1ByaWNlUmVzcG9uc2UgZ2FzUHJpY2VcbiAgZ2FzUHJpY2U6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFN1Z2dlc3RHYXNQcmljZVJlcXVlc3QgPSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgdG8ocmVxOiBJU3VnZ2VzdEdhc1ByaWNlUmVxdWVzdCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBhcGlQYi5TdWdnZXN0R2FzUHJpY2VSZXF1ZXN0KCk7XG4gIH0sXG5cbiAgZnJvbShwYlJlczogYW55KTogSVN1Z2dlc3RHYXNQcmljZVJlc3BvbnNlIHtcbiAgICBjb25zdCBnYXNQcmljZSA9IHBiUmVzLmdldEdhc3ByaWNlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdhc1ByaWNlXG4gICAgfTtcbiAgfVxufTtcblxuLy8gUHJvcGVydGllcyBvZiBhIEdldFJlY2VpcHRCeUFjdGlvblJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElHZXRSZWNlaXB0QnlBY3Rpb25SZXF1ZXN0IHtcbiAgLy8gR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCBhY3Rpb25IYXNoXG4gIGFjdGlvbkhhc2g6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhbiBMb2cuXG5leHBvcnQgaW50ZXJmYWNlIElMb2cge1xuICAvLyBMb2cgYWRkcmVzc1xuICBjb250cmFjdEFkZHJlc3M6IHN0cmluZztcblxuICAvLyBMb2cgdG9waWNzXG4gIHRvcGljczogQXJyYXk8QnVmZmVyIHwge30+O1xuXG4gIC8vIExvZyBkYXRhXG4gIGRhdGE6IEJ1ZmZlciB8IHt9O1xuXG4gIC8vIExvZyBibGtIZWlnaHRcbiAgYmxrSGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gTG9nIHR4bkhhc2hcbiAgYWN0SGFzaDogQnVmZmVyIHwge307XG5cbiAgLy8gTG9nIGluZGV4XG4gIGluZGV4OiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gUmVjZWlwdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY2VpcHQge1xuICAvLyBSZWNlaXB0IHN0YXR1c1xuICBzdGF0dXM6IG51bWJlcjtcblxuICAvLyBibGtIZWlnaHRcbiAgYmxrSGVpZ2h0OiBudW1iZXI7XG5cbiAgLy8gUmVjZWlwdCBhY3RIYXNoXG4gIGFjdEhhc2g6IEJ1ZmZlciB8IHt9O1xuXG4gIC8vIFJlY2VpcHQgZ2FzQ29uc3VtZWRcbiAgZ2FzQ29uc3VtZWQ6IG51bWJlcjtcblxuICAvLyBSZWNlaXB0IGNvbnRyYWN0QWRkcmVzc1xuICBjb250cmFjdEFkZHJlc3M6IHN0cmluZztcblxuICAvLyBSZWNlaXB0IGxvZ3NcbiAgbG9nczogQXJyYXk8SUxvZz4gfCB1bmRlZmluZWQ7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYW4gUmVjZWlwdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY2VpcHRJbmZvIHtcbiAgLy8gUmVjZWlwdFxuICByZWNlaXB0OiBJUmVjZWlwdCB8IHVuZGVmaW5lZDtcblxuICAvLyBibGtIYXNoXG4gIGJsa0hhc2g6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIEdldFJlY2VpcHRCeUFjdGlvblJlc3BvbnNlLlxuZXhwb3J0IGludGVyZmFjZSBJR2V0UmVjZWlwdEJ5QWN0aW9uUmVzcG9uc2Uge1xuICAvLyBHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZSByZWNlaXB0SW5mb1xuICByZWNlaXB0SW5mbzogSVJlY2VpcHRJbmZvIHwgdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBmcm9tUGJSZWNlaXB0SW5mbyhcbiAgcGJSZWNlaXB0SW5mbzogYXBpUGIuUmVjZWlwdEluZm8gfCB1bmRlZmluZWRcbik6IElSZWNlaXB0SW5mbyB8IHVuZGVmaW5lZCB7XG4gIGlmICghcGJSZWNlaXB0SW5mbykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICByZWNlaXB0OiBmcm9tUGJSZWNlaXB0KHBiUmVjZWlwdEluZm8uZ2V0UmVjZWlwdCgpKSxcbiAgICBibGtIYXNoOiBwYlJlY2VpcHRJbmZvLmdldEJsa2hhc2goKVxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXEgPSBuZXcgYXBpUGIuR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdCgpO1xuICAgIGlmIChyZXEuYWN0aW9uSGFzaCkge1xuICAgICAgcGJSZXEuc2V0QWN0aW9uaGFzaChyZXEuYWN0aW9uSGFzaCk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcTtcbiAgfSxcblxuICBmcm9tKHBiUmVzOiBHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZSk6IElHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlY2VpcHRJbmZvOiBmcm9tUGJSZWNlaXB0SW5mbyhwYlJlcy5nZXRSZWNlaXB0aW5mbygpKVxuICAgIH07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGZyb21QYlJlY2VpcHQoXG4gIHBiUmVjZWlwdDogYWN0aW9uUGIuUmVjZWlwdCB8IHVuZGVmaW5lZFxuKTogSVJlY2VpcHQgfCB1bmRlZmluZWQge1xuICBpZiAoIXBiUmVjZWlwdCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXM6IHBiUmVjZWlwdC5nZXRTdGF0dXMoKSxcbiAgICBibGtIZWlnaHQ6IHBiUmVjZWlwdC5nZXRCbGtoZWlnaHQoKSxcbiAgICBhY3RIYXNoOiBwYlJlY2VpcHQuZ2V0QWN0aGFzaCgpLFxuICAgIGdhc0NvbnN1bWVkOiBwYlJlY2VpcHQuZ2V0R2FzY29uc3VtZWQoKSxcbiAgICBjb250cmFjdEFkZHJlc3M6IHBiUmVjZWlwdC5nZXRDb250cmFjdGFkZHJlc3MoKSxcbiAgICBsb2dzOiBmcm9tUGJMb2dMaXN0KHBiUmVjZWlwdC5nZXRMb2dzTGlzdCgpKVxuICB9O1xufVxuXG5mdW5jdGlvbiBmcm9tUGJMb2dMaXN0KFxuICBwYkxvZ0xpc3Q6IEFycmF5PGFjdGlvblBiLkxvZz4gfCB1bmRlZmluZWRcbik6IEFycmF5PElMb2c+IHwgdW5kZWZpbmVkIHtcbiAgaWYgKCFwYkxvZ0xpc3QpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHJlcyA9IFtdIGFzIEFycmF5PElMb2c+O1xuICBmb3IgKGNvbnN0IGxvZyBvZiBwYkxvZ0xpc3QpIHtcbiAgICByZXMucHVzaCh7XG4gICAgICBjb250cmFjdEFkZHJlc3M6IGxvZy5nZXRDb250cmFjdGFkZHJlc3MoKSxcbiAgICAgIHRvcGljczogbG9nLmdldFRvcGljc0xpc3QoKSxcbiAgICAgIGRhdGE6IGxvZy5nZXREYXRhKCksXG4gICAgICBibGtIZWlnaHQ6IGxvZy5nZXRCbGtoZWlnaHQoKSxcbiAgICAgIGFjdEhhc2g6IGxvZy5nZXRBY3RoYXNoKCksXG4gICAgICBpbmRleDogbG9nLmdldEluZGV4KClcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgUmVhZENvbnRyYWN0UmVxdWVzdC5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlYWRDb250cmFjdFJlcXVlc3Qge1xuICBleGVjdXRpb246IElFeGVjdXRpb247XG4gIGNhbGxlckFkZHJlc3M6IHN0cmluZztcbn1cblxuLy8gUHJvcGVydGllcyBvZiBhIFJlYWRDb250cmFjdFJlc3BvbnNlLlxuZXhwb3J0IGludGVyZmFjZSBJUmVhZENvbnRyYWN0UmVzcG9uc2Uge1xuICBkYXRhOiBzdHJpbmc7XG4gIHJlY2VpcHQ6IElSZWNlaXB0IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY29uc3QgUmVhZENvbnRyYWN0UmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJUmVhZENvbnRyYWN0UmVxdWVzdCk6IGFueSB7XG4gICAgY29uc3QgcGJSZXEgPSBuZXcgYXBpUGIuUmVhZENvbnRyYWN0UmVxdWVzdCgpO1xuICAgIHBiUmVxLnNldENhbGxlcmFkZHJlc3MocmVxLmNhbGxlckFkZHJlc3MpO1xuICAgIGlmIChyZXEuZXhlY3V0aW9uKSB7XG4gICAgICBwYlJlcS5zZXRFeGVjdXRpb24odG9BY3Rpb25FeGVjdXRpb24ocmVxLmV4ZWN1dGlvbikpO1xuICAgIH1cbiAgICByZXR1cm4gcGJSZXE7XG4gIH0sXG5cbiAgZnJvbShwYlJlczogYXBpUGIuUmVhZENvbnRyYWN0UmVzcG9uc2UpOiBJUmVhZENvbnRyYWN0UmVzcG9uc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBwYlJlcy5nZXREYXRhKCksXG4gICAgICByZWNlaXB0OiBmcm9tUGJSZWNlaXB0KHBiUmVzLmdldFJlY2VpcHQoKSlcbiAgICB9O1xuICB9XG59O1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgU2VuZEFjdGlvblJlcXVlc3QuXG5leHBvcnQgaW50ZXJmYWNlIElTZW5kQWN0aW9uUmVxdWVzdCB7XG4gIC8vIFNlbmRBY3Rpb25SZXF1ZXN0IGFjdGlvblxuICBhY3Rpb246IElBY3Rpb247XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBTZW5kQWN0aW9uUmVzcG9uc2UuXG5leHBvcnQgaW50ZXJmYWNlIElTZW5kQWN0aW9uUmVzcG9uc2Uge1xuICBhY3Rpb25IYXNoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBTZW5kQWN0aW9uUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJU2VuZEFjdGlvblJlcXVlc3QpOiBhbnkge1xuICAgIGNvbnN0IHBiUmVxID0gbmV3IGFwaVBiLlNlbmRBY3Rpb25SZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5hY3Rpb24pIHtcbiAgICAgIHBiUmVxLnNldEFjdGlvbih0b0FjdGlvbihyZXEuYWN0aW9uKSk7XG4gICAgfVxuICAgIHJldHVybiBwYlJlcTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IFNlbmRBY3Rpb25SZXNwb25zZSA9IHtcbiAgZnJvbShyZXNwOiBhcGlQYi5TZW5kQWN0aW9uUmVzcG9uc2UpOiBJU2VuZEFjdGlvblJlc3BvbnNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uSGFzaDogcmVzcC5nZXRBY3Rpb25oYXNoKClcbiAgICB9O1xuICB9XG59O1xuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXF1ZXN0IHtcbiAgYWN0aW9uOiBJQWN0aW9uO1xufVxuXG4vLyBQcm9wZXJ0aWVzIG9mIGEgRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSUVzdGltYXRlR2FzRm9yQWN0aW9uUmVzcG9uc2Uge1xuICBnYXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEVzdGltYXRlR2FzRm9yQWN0aW9uUmVxdWVzdCA9IHtcbiAgdG8ocmVxOiBJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5Fc3RpbWF0ZUdhc0ZvckFjdGlvblJlcXVlc3QoKTtcbiAgICBpZiAocmVxLmFjdGlvbikge1xuICAgICAgcGJSZXEuc2V0QWN0aW9uKHRvQWN0aW9uKHJlcS5hY3Rpb24pKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxO1xuICB9LFxuICBmcm9tKHBiUmVzOiBhbnkpOiBJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXNwb25zZSB7XG4gICAgcmV0dXJuIHsgZ2FzOiBwYlJlcy5nZXRHYXMoKSB9O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWFkU3RhdGVSZXF1ZXN0IHtcbiAgcHJvdG9jb2xJRDogQnVmZmVyO1xuICBtZXRob2ROYW1lOiBCdWZmZXI7XG4gIGFyZ3VtZW50czogQXJyYXk8QnVmZmVyPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVhZFN0YXRlUmVzcG9uc2Uge1xuICBkYXRhOiBCdWZmZXIgfCB7fTtcbn1cblxuZXhwb3J0IGNvbnN0IFJlYWRTdGF0ZVJlcXVlc3QgPSB7XG4gIHRvKHJlcTogSVJlYWRTdGF0ZVJlcXVlc3QpOiBhcGlQYi5SZWFkU3RhdGVSZXF1ZXN0IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5SZWFkU3RhdGVSZXF1ZXN0KCk7XG4gICAgcGJSZXEuc2V0UHJvdG9jb2xpZChyZXEucHJvdG9jb2xJRCk7XG4gICAgcGJSZXEuc2V0TWV0aG9kbmFtZShyZXEubWV0aG9kTmFtZSk7XG4gICAgcGJSZXEuc2V0QXJndW1lbnRzTGlzdChyZXEuYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcGJSZXE7XG4gIH0sXG4gIGZyb20ocGJSZXM6IFJlYWRTdGF0ZVJlc3BvbnNlKTogSVJlYWRTdGF0ZVJlc3BvbnNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogcGJSZXMuZ2V0RGF0YSgpXG4gICAgfTtcbiAgfVxufTtcblxuLy8gUHJvcGVydGllcyBvZiBhIEJsb2NrUHJvZHVjZXJJbmZvLlxuZXhwb3J0IGludGVyZmFjZSBJQmxvY2tQcm9kdWNlckluZm8ge1xuICAvLyBCbG9ja1Byb2R1Y2VySW5mbyBhZGRyZXNzXG4gIGFkZHJlc3M6IHN0cmluZztcblxuICAvLyBCbG9ja1Byb2R1Y2VySW5mbyB2b3Rlc1xuICB2b3Rlczogc3RyaW5nO1xuXG4gIC8vIEJsb2NrUHJvZHVjZXJJbmZvIGFjdGl2ZVxuICBhY3RpdmU6IGJvb2xlYW47XG5cbiAgLy8gQmxvY2tQcm9kdWNlckluZm8gcHJvZHVjdGlvblxuICBwcm9kdWN0aW9uOiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRFcG9jaE1ldGFSZXF1ZXN0LlxuZXhwb3J0IGludGVyZmFjZSBJR2V0RXBvY2hNZXRhUmVxdWVzdCB7XG4gIGVwb2NoTnVtYmVyOiBudW1iZXI7XG59XG5cbi8vIFByb3BlcnRpZXMgb2YgYSBHZXRFcG9jaE1ldGFSZXNwb25zZS5cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEVwb2NoTWV0YVJlc3BvbnNlIHtcbiAgLy8gR2V0RXBvY2hNZXRhUmVzcG9uc2UgZXBvY2hEYXRhXG4gIGVwb2NoRGF0YTogSUVwb2NoRGF0YTtcblxuICAvLyBHZXRFcG9jaE1ldGFSZXNwb25zZSB0b3RhbEJsb2Nrc1xuICB0b3RhbEJsb2NrczogbnVtYmVyO1xuXG4gIC8vIEdldEVwb2NoTWV0YVJlc3BvbnNlIGJsb2NrUHJvZHVjZXJzSW5mb1xuICBibG9ja1Byb2R1Y2Vyc0luZm86IEFycmF5PElCbG9ja1Byb2R1Y2VySW5mbz47XG59XG5cbmV4cG9ydCBjb25zdCBHZXRFcG9jaE1ldGFSZXF1ZXN0ID0ge1xuICB0byhyZXE6IElHZXRFcG9jaE1ldGFSZXF1ZXN0KTogYW55IHtcbiAgICBjb25zdCBwYlJlcSA9IG5ldyBhcGlQYi5HZXRFcG9jaE1ldGFSZXF1ZXN0KCk7XG4gICAgaWYgKHJlcS5lcG9jaE51bWJlcikge1xuICAgICAgcGJSZXEuc2V0RXBvY2hudW1iZXIocmVxLmVwb2NoTnVtYmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHBiUmVxO1xuICB9LFxuICBmcm9tKHBiUmVzOiBhbnkpOiBJR2V0RXBvY2hNZXRhUmVzcG9uc2Uge1xuICAgIGNvbnN0IGVwb2NoID0gcGJSZXMuZ2V0RXBvY2hkYXRhKCk7XG4gICAgY29uc3QgYnBJbmZvID0gcGJSZXMuZ2V0QmxvY2twcm9kdWNlcnNpbmZvTGlzdCgpO1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGVwb2NoRGF0YToge1xuICAgICAgICBudW06IGVwb2NoLmdldE51bSgpLFxuICAgICAgICBoZWlnaHQ6IGVwb2NoLmdldEhlaWdodCgpLFxuICAgICAgICBncmF2aXR5Q2hhaW5TdGFydEhlaWdodDogZXBvY2guZ2V0R3Jhdml0eWNoYWluc3RhcnRoZWlnaHQoKVxuICAgICAgfSxcbiAgICAgIHRvdGFsQmxvY2tzOiBwYlJlcy5nZXRUb3RhbGJsb2NrcygpLFxuICAgICAgYmxvY2tQcm9kdWNlcnNJbmZvOiBicEluZm9cbiAgICB9O1xuICAgIGlmIChicEluZm8pIHtcbiAgICAgIGNvbnN0IHBhcnNlZEJwaW5mbyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBicEluZm8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyc2VkQnBpbmZvW2ldID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGJwSW5mb1tpXS5nZXRBZGRyZXNzKCksXG4gICAgICAgICAgdm90ZXM6IGJwSW5mb1tpXS5nZXRWb3RlcygpLFxuICAgICAgICAgIGFjdGl2ZTogYnBJbmZvW2ldLmdldEFjdGl2ZSgpLFxuICAgICAgICAgIHByb2R1Y3Rpb246IGJwSW5mb1tpXS5nZXRQcm9kdWN0aW9uKClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJlcy5ibG9ja1Byb2R1Y2Vyc0luZm8gPSBwYXJzZWRCcGluZm87XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBJUnBjTWV0aG9kIHtcbiAgc2V0UHJvdmlkZXIocHJvdmlkZXI6IHN0cmluZyB8IElScGNNZXRob2QpOiB2b2lkO1xuXG4gIGdldEFjY291bnQocmVxOiBJR2V0QWNjb3VudFJlcXVlc3QpOiBQcm9taXNlPElHZXRBY2NvdW50UmVzcG9uc2U+O1xuXG4gIGdldEJsb2NrTWV0YXMocmVxOiBJR2V0QmxvY2tNZXRhc1JlcXVlc3QpOiBQcm9taXNlPElHZXRCbG9ja01ldGFzUmVzcG9uc2U+O1xuXG4gIGdldENoYWluTWV0YShyZXE6IElHZXRDaGFpbk1ldGFSZXF1ZXN0KTogUHJvbWlzZTxJR2V0Q2hhaW5NZXRhUmVzcG9uc2U+O1xuXG4gIGdldFNlcnZlck1ldGEocmVxOiBJR2V0U2VydmVyTWV0YVJlcXVlc3QpOiBQcm9taXNlPElHZXRTZXJ2ZXJNZXRhUmVzcG9uc2U+O1xuXG4gIGdldEFjdGlvbnMocmVxOiBJR2V0QWN0aW9uc1JlcXVlc3QpOiBQcm9taXNlPElHZXRBY3Rpb25zUmVzcG9uc2U+O1xuXG4gIHN1Z2dlc3RHYXNQcmljZShcbiAgICByZXE6IElTdWdnZXN0R2FzUHJpY2VSZXF1ZXN0XG4gICk6IFByb21pc2U8SVN1Z2dlc3RHYXNQcmljZVJlc3BvbnNlPjtcblxuICBnZXRSZWNlaXB0QnlBY3Rpb24oXG4gICAgcmVxOiBJR2V0UmVjZWlwdEJ5QWN0aW9uUmVxdWVzdFxuICApOiBQcm9taXNlPElHZXRSZWNlaXB0QnlBY3Rpb25SZXNwb25zZT47XG5cbiAgcmVhZENvbnRyYWN0KHJlcTogSVJlYWRDb250cmFjdFJlcXVlc3QpOiBQcm9taXNlPElSZWFkQ29udHJhY3RSZXNwb25zZT47XG5cbiAgc2VuZEFjdGlvbihyZXE6IElTZW5kQWN0aW9uUmVxdWVzdCk6IFByb21pc2U8SVNlbmRBY3Rpb25SZXNwb25zZT47XG4gIHJlYWRTdGF0ZShyZXE6IElSZWFkU3RhdGVSZXF1ZXN0KTogUHJvbWlzZTxJUmVhZFN0YXRlUmVzcG9uc2U+O1xuICBlc3RpbWF0ZUdhc0ZvckFjdGlvbihcbiAgICByZXE6IElFc3RpbWF0ZUdhc0ZvckFjdGlvblJlcXVlc3RcbiAgKTogUHJvbWlzZTxJRXN0aW1hdGVHYXNGb3JBY3Rpb25SZXNwb25zZT47XG5cbiAgZ2V0RXBvY2hNZXRhKHJlcTogSUdldEVwb2NoTWV0YVJlcXVlc3QpOiBQcm9taXNlPElHZXRFcG9jaE1ldGFSZXNwb25zZT47XG59XG4iXX0=
