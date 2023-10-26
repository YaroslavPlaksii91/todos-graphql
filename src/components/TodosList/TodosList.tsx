import { FC } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { TodoType } from './types';
import { ALL_TODOS, DELETE_TODO, UPDATE_TODO } from '../../apollo/todos';

import styles from './TodoList.module.css';

export const TodosList: FC = () => {
  const { loading, error, data } = useQuery(ALL_TODOS);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo: { __ref: string }) =>
                todo.__ref !== `Todo:${removeTodo.id}`,
            );
          },
        },
      });
    },
  });

  const handleToggle = (id: string, completed: boolean) => {
    toggleTodo({
      variables: {
        id,
        completed: !completed,
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || updateError || deleteError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {data.todos.map((todo: TodoType) => (
          <li key={todo.id} className={styles.item}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
              />
            </label>
            <p>{todo.title}</p>
            <button
              type="button"
              onClick={() =>
                deleteTodo({
                  variables: {
                    id: todo.id,
                  },
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
