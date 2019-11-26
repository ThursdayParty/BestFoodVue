import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
    }
  },
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.addGradient();
    this.addYAxes();
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    addGradient() {
      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 330)
      this.gradient.addColorStop(0.0, 'rgba(132, 172, 103, 0.9)') //제일 위
      this.gradient.addColorStop(0.3, 'rgba(132, 172, 103, 0.6)')
      this.gradient.addColorStop(0.6, 'rgba(132, 172, 103, 0.3)')
      this.gradient.addColorStop(0.9, 'rgba(132, 172, 103, 0.0)') // 제일 아래
      this.chartData.datasets[0].backgroundColor = this.gradient
    },
    addYAxes() {
      const max = Math.max.apply(null, this.chartData.datasets[0].data)
      const min = Math.min.apply(null, this.chartData.datasets[0].data)      
      this.options.scales.yAxes[0].ticks.min = Math.max(min - (max * 0.2), 0);
      this.options.scales.yAxes[0].ticks.max = max * 1.2;
    } 
  }
}
