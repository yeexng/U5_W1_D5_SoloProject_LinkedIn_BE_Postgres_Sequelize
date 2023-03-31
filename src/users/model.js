import { DataTypes } from "sequelize";
import CommentsModel from "../comments/model.js";
import sequelize from "../db.js";
import ExperiencesModel from "../experiences/model.js";
import PostsModel from "../posts/model.js";

const UsersModel = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // <-- This automagically generates a unique string every time we insert a new record
  },
  name: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  title: {
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
//User to Exp
UsersModel.hasMany(ExperiencesModel, {
  foreignKey: { name: "userId", allowNull: true },
});
ExperiencesModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: true },
});

//User to Post
UsersModel.hasMany(PostsModel, {
  foreignKey: { name: "userId", allowNull: true },
});
PostsModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: true },
});

//User to Comment
UsersModel.hasMany(CommentsModel, {
  foreignKey: { name: "userId", allowNull: true },
});
CommentsModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: true },
});

export default UsersModel;
