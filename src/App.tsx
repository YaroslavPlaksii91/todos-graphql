import { TodosList } from './components/TodosList/TodosList';
import { AddTodo } from './components/AddTodo/AddTodo';

export const App = () => {
  return (
    <div>
      <AddTodo />
      <TodosList />
    </div>
  );
};
