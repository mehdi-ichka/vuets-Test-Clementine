import { Component, Vue } from 'vue-property-decorator';
import WithRender from './editPopup.html';
import './editPopup.scss';

@WithRender
@Component
export default class EditPopup extends Vue {
    private task: string;
    private taskState: any;

    constructor() {
        super();
        this.task = '';
        this.taskState = null;
    }

    private checkFormValidity() {
        const valid = (this.$refs as any).form.checkValidity();
        this.taskState = valid ? 'valid' : 'invalid';
        return valid;
    }

    private resetModal() {
        this.task = '';
        this.taskState = null;
    }

    private closeModal() {
        this.task = '';
        this.taskState = null;
        this.$emit('close');
    }
    private handleOk(bvModalEvt: any) {
        // Prevent modal from closing
        bvModalEvt.preventDefault();
        // Trigger submit handler
        this.handleSubmit();
    }

    private handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
            return;
        }
        // Push the name to submitted names
        this.$emit('task', this.task);
        // Hide the modal manually
        this.$nextTick(() => {
            (this.$refs as any).modal.hide();
        });
    }
}
