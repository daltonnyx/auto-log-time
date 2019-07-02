import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './dbContext';
import ProfileDetail from './profile-detail.model';
export default class Profile extends Model {}
Profile.init({
  Name: DataTypes.STRING,
  IsRecurring: DataTypes.BOOLEAN,
}, {
  sequelize
});
Profile.hasMany(ProfileDetail);