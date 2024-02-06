'use server';
import CategoryModel from '../database/model/category.model';
import { connectToDatabase } from '../database';
import { CreateCategoryParams } from '@/types';
import { handleError } from '../utils';

export async function getAllCategories() {
  try {
    connectToDatabase();
    const categories = await CategoryModel.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
}

export async function createCategory({ categoryName }: CreateCategoryParams) {
  try {
    connectToDatabase();
    const newCategory = await CategoryModel.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
}
