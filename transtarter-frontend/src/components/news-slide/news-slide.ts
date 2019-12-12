import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
class newsSlide extends Vue {
    @Prop({ type: Number, required: true }) readonly newsId!: number
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: String, required: true }) readonly img!: string
    @Prop({ type: String, required: true }) readonly category!: string
    @Prop({ type: String, required: true }) readonly date!: string
    @Prop({ type: String, required: true }) readonly newsRootUrl!: string
}
export default newsSlide
