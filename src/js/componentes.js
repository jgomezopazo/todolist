import { Todo, TodoList } from "../classes";
import { todoListo } from '../index';

// Referencias al html
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const buttonDeleteCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado)?'completed':'' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado)?'checked':'' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> 
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    
    return div.firstElementChild;

}

txtInput.addEventListener( 'keyup', (event) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo(txtInput.value);
        todoListo.nuevoTodo( nuevoTodo );
        
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

        todoListo.marcarCompletado(1234);
    }
         
} );

divTodoList.addEventListener( 'click', (event) => {
    
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    
    if(nombreElemento.includes('input')){
        todoListo.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){
        todoListo.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

} );

buttonDeleteCompleted.addEventListener( 'click', (event) => {
    todoListo.eliminarCompletados();
    
    for( let i = divTodoList.children.length-1; i>=0; i-- ){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
} );

ulFilters.addEventListener( 'click', (event) => {
    const filtro = event.target.text;
    if(!filtro){ return; }

    anchorFiltros.forEach(element => {
        element.classList.remove('selected');
    });

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        event.target.classList.add('selected');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;
        }

    }

} );


