import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/helloWorld/helloWorld'; // @ is an alias to /src
import WithRender from './home.html';

@WithRender
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
