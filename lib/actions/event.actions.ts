"use server";

import EventModel from "../database/model/event.model";
import UserModel from "../database/model/user.model";
import CategoryModel from "../database/model/category.model";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import { nullable } from "zod";

const getCategoryByName = async (name: string) => {
  return CategoryModel.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: UserModel,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: CategoryModel, select: "_id name" });
};

// ==============================

// GET ALL EVENTS
export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = EventModel.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await EventModel.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export const getEventById = async (id: any) => {
  try {
    await connectToDatabase();
    const query = EventModel.findById(id);

    const event = await populateEvent(query);

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  console.log({
    ...event,
    category: event.categoryId,
    organizer: userId,
  });
  try {
    await connectToDatabase();
    const organizer = await UserModel.findById({ _id: userId });
    console.log(organizer);

    if (!organizer) throw new Error("Organizer Not Found");

    const newEvent = await EventModel.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  console.log(eventId);
  try {
    await connectToDatabase();
    const deleteEvent = await EventModel.findByIdAndDelete(eventId);

    if (deleteEvent) revalidatePath(path);

    return JSON.parse(JSON.stringify({ status: "OK" }));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const updateEvent = async ({
  userId,
  event,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDatabase();
    const eventToUpdate = await EventModel.findById(event._id);

    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify({ status: "OK", event: updatedEvent }));
  } catch (error) {
    handleError(error);
  }
};

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = EventModel.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await EventModel.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = EventModel.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await EventModel.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
