import { gql } from '@apollo/client';

export const ALL_TODOS = gql`
  query AllTodos {
    todos {
      data {
        id
        title
        completed
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($input: CreateTodoInput!) {
    newTodo: createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!, $id: ID!) {
    updateTodo(input: $input, id: $id) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
