import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/apiError';
import { IEbl365 } from '../ebl365/ebl365.interface';
import { Ebl365 } from '../ebl365/ebl365.model';
import { IEblAgent } from '../eblAgent/eblAgent.interface';
import { EblAgent } from '../eblAgent/eblAgent.model';
import { IEblBranch } from '../eblBranch/eblBranch.interface';
import { EblBranch } from '../eblBranch/eblBranch.model';
import { IEblSubBranch } from '../eblSubBranch/eblSubBranch.interface';
import { EblSubBranch } from '../eblSubBranch/eblSubBranch.model';
import { IEblNetwork } from './eblNetwork.interface';
import { EblNetwork } from './eblNetwork.model';

const createBranch = async (
  eblBranch: IEblBranch,
  network: IEblNetwork,
): Promise<IEblNetwork | null> => {
  network.type = 'eblBranch';

  let newData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    eblBranch.networkId = network.networkId;

    const newBranch = await EblBranch.create([eblBranch], { session });

    if (!newBranch.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }
    network.eblBranch = newBranch[0]._id;

    const newNetwork = await EblNetwork.create([network], { session });
    if (!newNetwork.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newData = newNetwork[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newData = await EblNetwork.findOne({
    networkId: newData.networkId,
  }).populate('eblBranch');

  return newData;
};

const createSubBranch = async (
  eblSubBranch: IEblSubBranch,
  network: IEblNetwork,
): Promise<IEblNetwork | null> => {
  network.type = 'eblSubBranch';

  let newData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    eblSubBranch.networkId = network.networkId;

    const newSubBranch = await EblSubBranch.create([eblSubBranch], { session });
    if (!newSubBranch.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }
    network.eblSubBranch = newSubBranch[0]._id;

    const newNetwork = await EblNetwork.create([network], { session });
    if (!newNetwork.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newData = newNetwork[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newData = await EblNetwork.findOne({
    networkId: newData.networkId,
  }).populate('eblSubBranch');

  return newData;
};

const createAgent = async (
  eblAgent: IEblAgent,
  network: IEblNetwork,
): Promise<IEblNetwork | null> => {
  network.type = 'eblAgent';

  let newData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    eblAgent.networkId = network.networkId;

    const newAgent = await EblAgent.create([eblAgent], { session });
    if (!newAgent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }
    network.eblAgent = newAgent[0]._id;

    const newNetwork = await EblNetwork.create([network], { session });
    if (!newNetwork.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newData = newNetwork[0];

    await session.commitTransaction();

    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newData = await EblNetwork.findOne({
    networkId: newData.networkId,
  }).populate('eblAgent');

  return newData;
};

const create365 = async (
  ebl365: IEbl365,
  network: IEblNetwork,
): Promise<IEblNetwork | null> => {
  network.type = 'ebl365';
  let newData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    ebl365.networkId = network.networkId;

    const new365 = await Ebl365.create([ebl365], { session });
    if (!new365.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create customer');
    }
    network.ebl365 = new365[0]._id;

    const newNetwork = await EblNetwork.create([network], { session });
    if (!newNetwork.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newData = newNetwork[0];

    await session.commitTransaction();

    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newData = await EblNetwork.findOne({
    networkId: newData.networkId,
  }).populate('ebl365');

  return newData;
};

export const EblNetworkService = {
  createBranch,
  createSubBranch,
  createAgent,
  create365,
};
