import { VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import Todo from './components/todo/todo';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);
const baseUrl = 'https://jsonplaceholder.typicode.com';

@Module({
  dynamic: true,
  name: 'MyStore',
  store: new Vuex.Store({}),
})
export default class MyStoreModule extends VuexModule {
  public todoList: ITodo[] = [];

  @Mutation
  public setTodoList(values: ITodo[]) {
    this.todoList = values;
  }

  @Mutation
  public addTodo(todo: ITodo) {
    this.todoList.push(todo);
  }

  @Mutation
  public removeTodo(key: number) {
    const id = this.todoList.findIndex(t => t.id === key);
    this.todoList.splice(id, 1);
  }

  @Mutation
  public updateTodo(key: number, todo: ITodo) {
    const id = this.todoList.findIndex(t => t.id === key);
    this.todoList.splice(id, 1, todo);
  }

  @Action({ commit: 'setTodoList' })
  public async getTodosAsync(): Promise<ITodo[]> {
    try {
      const res = await Axios.get<ITodo[]>(`${baseUrl}/todos`);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Action({ commit: 'addTodo' })
  public async postTodoAsync(todo: ITodo): Promise<ITodo> {
    try {
      const res = await Axios.post<ITodo>(`${baseUrl}/todos`, todo);
      //the fake api returns id=201 all the time so we override its value;
      res.data.id = todo.id;
      return res.data;
    } catch (error) {
      console.log(error);
      return {} as ITodo;
    }
  }

  @Action({ commit: 'removeTodo' })
  public async deleteTodoAsync(id: number): Promise<number> {
    try {
      const res = await Axios.delete<number>(`${baseUrl}/todos/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return {} as ITodo;
    }
  }

  @Action({ commit: 'updateTodo' })
  public async putTodoAsync(id: number, todo: ITodo) {
    try {
      const res = await Axios.put(`${baseUrl}/todos/${id}`, todo);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
