import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './dbContext';
import Profile from './profile.model';
export default class ProfileDetail extends Model {}
ProfileDetail.init({
  profileId: {
    type: DataTypes.INTEGER,
    references: {
      model: Profile,
      key: 'id'
    }
  },
  projectId: DataTypes.INTEGER,
  hours: DataTypes.INTEGER,
  activity: DataTypes.INTEGER,
  hourRate: DataTypes.DECIMAL
}, {
  sequelize
});
ProfileDetail.hasMany(Profile);