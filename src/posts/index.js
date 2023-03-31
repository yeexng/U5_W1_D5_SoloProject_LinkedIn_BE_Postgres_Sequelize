import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import PostsModel from "./model.js";

const postsRouter = express.Router();

postsRouter.post("/:userId/posts", async (req, res, next) => {
  try {
    const { postId } = await PostsModel.create({
      ...req.body,
      userId: req.params.userId,
    });
    res.status(201).send({ postId });
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:userId/posts", async (req, res, next) => {
  try {
    const posts = await PostsModel.findAll({
      where: { userId: req.params.userId },
    });

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:userId/posts/:postId", async (req, res, next) => {
  try {
    const post = await PostsModel.findByPk(req.params.postId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }); // attributes could be an array (when you want to pass a list of the selected fields), or an object (with the exclude property, whenever you want to pass a list of omitted fields)
    if (post) {
      res.send(post);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:userId/posts/:postId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await PostsModel.update(
      req.body,
      { where: { postId: req.params.postId }, returning: true }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:userId/posts/:postId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await PostsModel.destroy({
      where: { postId: req.params.postId },
    });
    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
