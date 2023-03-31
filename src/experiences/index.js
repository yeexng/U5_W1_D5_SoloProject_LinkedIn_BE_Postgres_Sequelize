import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import ExperiencesModel from "./model.js";

const experiencesRouter = express.Router();

experiencesRouter.post("/:usersId/experiences", async (req, res, next) => {
  try {
    const { expId } = await ExperiencesModel.create({
      ...req.body,
      userId: req.params.usersId,
    });
    res.status(201).send({ expId });
  } catch (error) {
    next(error);
  }
});

experiencesRouter.get("/:usersId/experiences", async (req, res, next) => {
  try {
    const experiences = await ExperiencesModel.findAll({
      where: { userId: req.params.usersId },
    });
    res.send(experiences);
  } catch (error) {
    next(error);
  }
});

experiencesRouter.get(
  "/:usersId/experiences/:expId",
  async (req, res, next) => {
    try {
      const experience = await ExperiencesModel.findByPk(req.params.expId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      }); // attributes could be an array (when you want to pass a list of the selected fields), or an object (with the exclude property, whenever you want to pass a list of omitted fields)
      if (experience) {
        res.send(experience);
      } else {
        next(
          createHttpError(
            404,
            `Experience with id ${req.params.expId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

experiencesRouter.put(
  "/:usersId/experiences/:expId",
  async (req, res, next) => {
    try {
      const [numberOfUpdatedRows, updatedRecords] =
        await ExperiencesModel.update(req.body, {
          where: { expId: req.params.expId },
          returning: true,
        });
      if (numberOfUpdatedRows === 1) {
        res.send(updatedRecords[0]);
      } else {
        next(
          createHttpError(
            404,
            `Experience with id ${req.params.expId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

experiencesRouter.delete(
  "/:usersId/experiences/:expId",
  async (req, res, next) => {
    try {
      const numberOfDeletedRows = await ExperiencesModel.destroy({
        where: { expId: req.params.expId },
      });
      if (numberOfDeletedRows === 1) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `Experience with id ${req.params.expId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default experiencesRouter;
