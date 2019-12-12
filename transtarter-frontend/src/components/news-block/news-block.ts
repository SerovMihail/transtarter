// fuck it should be about new details and sales
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
class NewsBlock extends Vue {
    @Prop({ required: true, type: Array }) readonly items!: any[]
    @Prop(Boolean) readonly small!: boolean
    get smallBlockItems() {
        return this.small ? this.items : this.items.slice(3)
    }
    vueAppWebApp = process.env.VUE_APP_WEB_APP
}
export default NewsBlock
