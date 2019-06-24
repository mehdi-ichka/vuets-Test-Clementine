import { Component, Vue } from 'vue-property-decorator';
import WithRender from './helloWorld.html';
import './helloWorld.scss';

@WithRender
@Component
export default class HelloWorld extends Vue {

}
