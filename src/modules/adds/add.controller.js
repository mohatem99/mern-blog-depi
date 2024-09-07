import { populate } from "dotenv";
import Add from "../../db/models.js/adds.model.js";
import { errorHandler } from "../../middlewares/error.middleware.js";

export const addAdd = async (req, res) => {
  const { title, imageUrl } = req.body;
  const newAdd = await Add.create({ title, imageUrl, createdBy: req.user_id });
  res.status(201).json({ message: "created Successfully", newAdd });
};

export const getAdds = errorHandler(async (req, res, next) => {
  const adds = await Add.find().populate("createdBy", "name");
  res.status(200).json(adds);
});

export const getAdd = errorHandler(async (req, res, next) => {
  const { id } = req.params;
  const add = await Add.findById(id).populate("createdBy", "name");
  res.status(200).json(add);
});

export const updateAdd = errorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  const addExist = await Add.findById(id);
  if (!addExist) return next(new Error("Add not found for this ID"));

  if (addExist.createdBy.toString() !== req.user_id.toString())
    return next(new Error("You are not allowed"));

  const add = await Add.findByIdAndUpdate(id, { title }, { new: true });

  res.status(200).json({ message: "updated Successfully", add });
});

export const deleteAdd = errorHandler(async (req, res, next) => {
  const { id } = req.params;
  const addExist = await Add.findById(id);
  if (!addExist) return next(new Error("Add not found for this ID"));

  if (addExist.createdBy.toString() !== req.user_id.toString())
    return next(new Error("You are not allowed"));

  await Add.findByIdAndDelete(id);

  res.status(200).json({ message: "deleted Successfully" });
});
