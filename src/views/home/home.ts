import { Component, Vue } from 'vue-property-decorator';
import Todo from '@/components/todo/todo'; // @ is an alias to /src
import WithRender from './home.html';
import MyStore from '@/store';
import { getModule } from 'vuex-module-decorators';

const store = getModule(MyStore);

@WithRender
@Component({
  components: {
    Todo,
  },
})
export default class Home extends Vue {
  private todos: ITodo[];

  constructor() {
    super();
    this.todos = [];
  }

  public mounted() {
    this.getAllTodos();
  }

  private async getAllTodos() {
    const todos = await store.getTodos();
    console.log(JSON.stringify(todos));
    store.setTodoList(todos);
    this.todos = store.todoList;
  }

  private addTodo() {
    return null;
  }
}
