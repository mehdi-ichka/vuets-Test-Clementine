import { Component, Vue } from 'vue-property-decorator';
import Todo from '@/components/todo/todo'; // @ is an alias to /src
import EditPopup from '@/components/editPopup/editPopup';
import WithRender from './home.html';
import MyStore from '@/store';
import { getModule } from 'vuex-module-decorators';
import './home.scss';
const store = getModule(MyStore);

@WithRender
@Component({
  components: {
    Todo,
  },
})
export default class Home extends Vue {
  private todos: ITodo[];
  private title: string;
  private currentPage: number;

  constructor() {
    super();
    this.todos = [];
    this.title = '';
    this.currentPage = 1;
  }

  public mounted() {
    this.getAllTodos();
  }

  private async getAllTodos(): Promise<void> {
    const todos = await store.getTodosAsync();
    this.todos = store.todoList;
  }

  private async addTodo(): Promise<void> {
    const todos = store.todoList;
    const newTodo = {} as ITodo;

    newTodo.id = todos[todos.length - 1].id + 1;
    newTodo.title = this.title;
    newTodo.completed = false;

    await store.postTodoAsync(newTodo);
  }

  get listPerPage(): ITodo[] {
    const todos = store.todoList;
    // Return just page of items needed
    return todos.slice(
      (this.currentPage - 1) * 20,
      this.currentPage * 20,
    )
  }

}
