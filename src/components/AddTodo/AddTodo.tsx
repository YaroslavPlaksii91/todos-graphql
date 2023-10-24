import { FC, useState, KeyboardEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TODO, ALL_TODOS } from '../../apollo/todos';
import { TodoType } from '../TodosList/types';

type CacheDataType = {
  todos: {
    data: TodoType[];
  };
};

export const AddTodo: FC = () => {
  const [value, setValue] = useState('');
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({
        query: ALL_TODOS,
      }) as CacheDataType;

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: {
            data: [newTodo, ...todos.data],
          },
        },
      });
    },
  });

  const handleAddTodo = () => {
    if (value.trim().length) {
      addTodo({
        variables: {
          input: {
            title: value,
            completed: false,
          },
        },
      });
      setValue('');
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleAddTodo();
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  if (error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input
          type="text"
          placeholder="Type ..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
        />
      </label>
      <button type="submit">Add todo</button>
    </form>
  );
};
