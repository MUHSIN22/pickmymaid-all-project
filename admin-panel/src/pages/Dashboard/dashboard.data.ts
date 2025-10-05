export const categoryAnalyticsPieOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
        show: false,
        selectorLabel: {
            show: false
        },
        selector: false
    },
    series: [
      {
        name: 'Category Analytics',
        type: 'pie',
        radius: '80%',
        data: [
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }