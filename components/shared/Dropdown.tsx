import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { ICategory } from '@/lib/database/model/category.model';
import { Input } from '../ui/input';
import {
  createCategory,
  getAllCategories,
} from '@/lib/actions/category.actions';

type DropDownProps = {
  onChangeHandler?: (string: string) => void;
  value?: string;
};

const Dropdown = ({ onChangeHandler, value }: DropDownProps) => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategory] = useState<ICategory[]>([]);

  const handleAddClick = () => {
    if (!newCategory) return;
    createCategory({ categoryName: newCategory }).then((cat) =>
      setCategory((preValue) => [...preValue, cat])
    );
  };

  useEffect(() => {
    async function fetchData() {
      const allCategories = await getAllCategories();
      allCategories && setCategory(allCategories as ICategory[]);
    }
    fetchData();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder='category' />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            );
          })}

        <AlertDialog>
          <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>
            Others...
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type='text'
                  placeholder='New category'
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddClick}>
                Add new Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
