"use server";

import UserModel from "../database/model/user.model";
import EventModel from "../database/model/event.model";
import CategoryModel from "../database/model/category.model";
import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await UserModel.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const findUserById = async (id: string) => {
  try {
    await connectToDatabase();
    const user = await UserModel.findOne({ clerkId: id });
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (id: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();
    const updatedUser = await UserModel.findOneAndUpdate({ clerkId: id }, user);

    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id: any) => {
  try {
    await connectToDatabase();
    const deletedUser = await UserModel.findOneAndDelete({ clerkId: id });

    return JSON.parse(JSON.stringify(deleteUser));
  } catch (error) {
    handleError(error);
  }
};
