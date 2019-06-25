import { Component, Vue, Prop } from 'vue-property-decorator';
import WithRender from './todo.html';
import './todo.scss';

@WithRender
@Component
export default class Todo extends Vue {

    @Prop() title!: string;
    @Prop() id!: string;
    
    constructor() {
        super();
    }

    public deleteTodo() {
        return null;
    }

    public editTodo() {
        return null;
    }
}
