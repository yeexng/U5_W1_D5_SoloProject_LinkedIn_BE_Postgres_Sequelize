import express from "express";
import createHttpError from "http-errors";
import CommentsModel from "./model.js";

const commentsRouter = express.Router();

commentsRouter.post(
  "/:userId/posts/:postId/comments",
  async (req, res, next) => {
    try {
      const { commentId } = await CommentsModel.create({
        ...req.body,
        userId: req.params.userId,
        postId: req.params.postId,
      });
      res.status(201).send({ commentId });
    } catch (error) {
      next(error);
    }
  }
);

commentsRouter.get(
  "/:userId/posts/:postId/comments",
  async (req, res, next) => {
    try {
      const comments = await CommentsModel.findAll({
        where: { postId: req.params.postId },
      });
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }
);

commentsRouter.get(
  "/:userId/posts/:postId/comments/:commentId",
  async (req, res, next) => {
    try {
      const comment = await CommentsModel.findByPk(req.params.commentId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      }); // attributes could be an array (when you want to pass a list of the selected fields), or an object (with the exclude property, whenever you want to pass a list of omitted fields)
      if (comment) {
        res.send(comment);
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.commentId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

commentsRouter.put(
  "/:userId/posts/:postId/comments/:commentId",
  async (req, res, next) => {
    try {
      const [numberOfUpdatedRows, updatedRecords] = await CommentsModel.update(
        req.body,
        {
          where: { commentId: req.params.commentId },
          returning: true,
        }
      );
      if (numberOfUpdatedRows === 1) {
        res.send(updatedRecords[0]);
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.commentId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

commentsRouter.delete(
  "/:userId/posts/:postId/comments/:commentId",
  async (req, res, next) => {
    try {
      const numberOfDeletedRows = await CommentsModel.destroy({
        where: { commentId: req.params.commentId },
      });
      if (numberOfDeletedRows === 1) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.commentId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default commentsRouter;
