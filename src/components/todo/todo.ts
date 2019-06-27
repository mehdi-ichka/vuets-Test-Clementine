import { Component, Vue, Prop } from 'vue-property-decorator';
import WithRender from './todo.html';
import MyStore from '@/store';
import { getModule } from 'vuex-module-decorators';

import './todo.scss';
const store = getModule(MyStore);

@WithRender
@Component
export default class Todo extends Vue {

    @Prop() title!: string;
    @Prop() id!: string;

    constructor() {
        super();
    }

    public async deleteTodo() {
        const id = this.id;
        const x = await store.deleteTodoAsync(id);
        return null;
    }

    public async editTodo() {
        const id = this.id;
        const newTodo = {} as ITodo;

        newTodo.id = id;
        newTodo.title = this.title;
        newTodo.completed = false;
        const x = await store.putTodoAsync(id, newTodo);
        return null;
    }
}
