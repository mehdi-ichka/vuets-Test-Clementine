import { Component, Vue, Prop } from 'vue-property-decorator';
import WithRender from './todo.html';
import MyStore from '@/store';
import { getModule } from 'vuex-module-decorators';

import './todo.scss';
import EditPopup from '../editPopup/editPopup';
const store = getModule(MyStore);

@WithRender
@Component({
    components: {
      EditPopup,
    },
  })
export default class Todo extends Vue {

    @Prop() title!: string;
    @Prop() identifier!: number;
    private showPopup: boolean;

    constructor() {
        super();
        this.showPopup = false;
    }

    public async deleteTodo() {
        const x = await store.deleteTodoAsync(this.identifier);
    }

    public async editTodo(title: string) {
        const todo = {} as any;

        todo.id = this.identifier;
        todo.title = title;
        todo.completed = false;
        await store.putTodoAsync(todo);
        this.showPopup = false;
    }
}
