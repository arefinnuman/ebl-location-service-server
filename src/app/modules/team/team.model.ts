import { Schema, model } from 'mongoose';
import { ITeam, TeamModel } from './team.interface';

const TeamSchema = new Schema<ITeam, TeamModel>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Team = model<ITeam, TeamModel>('Team', TeamSchema);
