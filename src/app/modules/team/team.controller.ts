import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { teamSearchableFields } from './team.constant';
import { ITeam } from './team.interface';
import { TeamService } from './team.service';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const { ...academicTeamData } = req.body;
  const result = await TeamService.createTeam(academicTeamData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Team Created Successfully`,
    data: result,
  });
});

const getAllTeam = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, teamSearchableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TeamService.getAllTeam(filters, paginationOptions);

  sendResponse<ITeam[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Team Data`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TeamService.getSingleTeam(id);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `${id} not found in Database`,
    });
  } else {
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Team Data `,
      data: result,
    });
  }
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await TeamService.updateTeam(id, updatedData);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `Team not found in Database`,
    });
  } else {
    sendResponse<ITeam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Team Data Updated`,
      data: result,
    });
  }
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TeamService.deleteTeam(id);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team deleted successfully !',
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
