import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import PostsModel from "../posts/model.js";

const CommentsModel = sequelize.define("comment", {
  commentId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // <-- This automagically generates a unique string every time we insert a new record
  },
  content: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
});

PostsModel.hasMany(CommentsModel, {
  foreignKey: { name: "postId", allowNull: false },
});
CommentsModel.belongsTo(PostsModel, {
  foreignKey: { name: "postId", allowNull: false },
});
export default CommentsModel;
