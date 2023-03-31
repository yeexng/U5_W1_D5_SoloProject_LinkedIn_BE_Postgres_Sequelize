import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const PostsModel = sequelize.define("post", {
  postId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
});

export default PostsModel;
