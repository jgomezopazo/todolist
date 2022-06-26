import './styles.css';
import { TodoList } from './classes';
import { Todo } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoListo = new TodoList();
//const tarea1 = new Todo('');
//crearTodoHtml(tarea1);

console.log(todoListo.todos);

todoListo.todos.forEach( todo => crearTodoHtml(todo) );