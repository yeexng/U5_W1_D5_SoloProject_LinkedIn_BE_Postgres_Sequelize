import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ExperiencesModel = sequelize.define("experience", {
  expId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // <-- This automagically generates a unique string every time we insert a new record
  },
  role: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(100), // VARCHAR(50)
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});

export default ExperiencesModel;
