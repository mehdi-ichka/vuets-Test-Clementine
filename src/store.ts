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
  public addTodo() {

  }

  @Mutation
  public removeTodo() {

  }

  // @Action({ commit: 'setTodoList' })
  @Action
  public async getTodos(): Promise<ITodo[]> {
    try {
      const res = await Axios.get<ITodo[]>(`${baseUrl}/todos`);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Action
  public async postTodo(todo: ITodo): Promise<boolean> {
    try {
      const res = await Axios.post(`${baseUrl}/todos`, todo);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Action
  public async deleteTodo(id: number) {
    try {
      const res = await Axios.delete(`${baseUrl}/todos/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Action
  public async updateTodo(id: number, todo: ITodo) {
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
