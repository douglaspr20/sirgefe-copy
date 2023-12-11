import { ApexOptions } from 'apexcharts';

export const optionsDonusChart = (
  labels: string[],
  totalLabel: string,
  animation: boolean,
  color: { [x: string]: string },
  spentValue?: string,
  currency?: string,
): ApexOptions => {
  return {
    chart: {
      fontFamily: '',
      width: 400,
      animations: {
        enabled: true,
        animateGradually: {
          enabled: true,
          delay: 3000,
        },
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: '',
              fontWeight: 700,
              color: '#34404B',
              offsetY: 6,
            },
            total: {
              showAlways: true,
              show: true,
              label: `${totalLabel}`,
              fontSize: '12px',
              fontFamily: '',
              fontWeight: 400,
              color: '#A0A8AF',
              ...(spentValue && { formatter: () => `${spentValue}` }),
            },
          },
        },
      },
    },
    labels: labels,
    dataLabels: {
      formatter: function (val) {
        return Number(val) >= 100 ? `100%` : `${Number(val).toFixed(2)}%`;
      },
      dropShadow: {
        blur: 3,
        opacity: 0.8,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return totalLabel === 'Spent'
            ? val.toLocaleString('en-US', {
              style: 'currency',
              currency: (currency as string) ?? 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
            : `${val}`;
        },
      },
    },
    colors: labels.map((label) => color[label.toLowerCase()]),
    legend: {
      position: 'bottom',
    },
  };
};
export const optionsHalfDonusChart = (
  labels: string[],
  total?: string,
): ApexOptions => ({
  labels: labels,
  chart: {
    fontFamily: '',
    animations: {
      enabled: true,
      animateGradually: {
        enabled: true,
        delay: 3000,
      },
    },
  },
  stroke: {
    width: 0,
  },
  colors: ['#7DE28D', '#F67063'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      donut: {
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: '24px',
            fontFamily: '',
            fontWeight: 700,
            color: '#34404B',
            offsetY: -40,
          },
          total: {
            showAlways: true,
            show: true,
            label: 'Goal',
            fontSize: '12px',
            fontFamily: '',
            fontWeight: 400,
            color: '#A0A8AF',
            ...(total && {
              formatter: () => `${total}`,
            }),
          },
        },
      },
    },
  },
  grid: {
    padding: {
      bottom: -100,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'left',
  },
  responsive: [
    {
      breakpoint: 1500,
      options: {
        chart: {
          height: 220,
        },
        grid: {
          padding: {
            bottom: -80,
          },
        },
      },
    },
    {
      breakpoint: 1100,
      options: {
        chart: {
          height: 180,
        },
        grid: {
          padding: {
            bottom: -60,
          },
        },
      },
    },
  ],
});

export const optionsDoughnutChart = (
  labels: string[],
  totalLabel: string,
  animation: boolean,
  color: { [x: string]: string },
  spentValue?: string,
  currency?: string,
): ApexOptions => {
  return {
    chart: {
      fontFamily: '',
      animations: {
        enabled: true,
        animateGradually: {
          enabled: true,
          delay: 3000,
        },
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          minAngleToShowLabel: 8,
        },
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: '',
              fontWeight: 700,
              color: '#34404B',
              offsetY: 6,
            },
            total: {
              showAlways: true,
              show: true,
              label: `${totalLabel}`,
              fontSize: '12px',
              fontFamily: '',
              fontWeight: 400,
              color: '#A0A8AF',
              ...(spentValue && { formatter: () => `${spentValue}` }),
            },
          },
        },
      },
    },
    labels: labels,
    dataLabels: {
      formatter: function (val) {
        return Number(val) >= 100 ? `100%` : `${Number(val).toFixed(2)}%`;
      },
      dropShadow: {
        blur: 3,
        opacity: 0.8,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return totalLabel.includes('Spent') ||
            totalLabel.includes('Remaining')
            ? val.toLocaleString('en-US', {
              style: 'currency',
              currency: (currency as string) ?? 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
            : `${val}`;
        },
      },
    },
    colors: labels.map((label) => color[label.toLowerCase()]),
    legend: {
      position: 'bottom',
    },
  };
};
export const optionsHalfDoughnutChart = (
  labels: string[],
  total?: string,
): ApexOptions => ({
  labels: labels,
  chart: {
    fontFamily: '',
    animations: {
      enabled: true,
      animateGradually: {
        enabled: true,
        delay: 3000,
      },
    },
  },
  stroke: {
    width: 0,
  },
  colors: ['#7DE28D', '#F67063'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 0,
      donut: {
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: '24px',
            fontFamily: '',
            fontWeight: 700,
            color: '#34404B',
            offsetY: -40,
          },
          total: {
            showAlways: true,
            show: true,
            label: 'Goal',
            fontSize: '12px',
            fontFamily: '',
            fontWeight: 400,
            color: '#A0A8AF',
            ...(total && {
              formatter: () => `${total}`,
            }),
          },
        },
      },
    },
  },
  grid: {
    padding: {
      bottom: -120,
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'left',
  },
  responsive: [
    {
      breakpoint: 1500,
      options: {
        grid: {
          padding: {
            bottom: -90,
          },
        },
      },
    },
    {
      breakpoint: 1350,
      options: {
        grid: {
          padding: {
            bottom: -60,
            left: 30,
            right: 30,
          },
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 0,
            donut: {
              labels: {
                show: true,
                value: {
                  show: true,
                  fontSize: '20px',
                  fontFamily: '',
                  fontWeight: 700,
                  color: '#34404B',
                  offsetY: -40,
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: 'Goal',
                  fontSize: '12px',
                  fontFamily: '',
                  fontWeight: 400,
                  color: '#A0A8AF',
                  ...(total && {
                    formatter: () => `${total}`,
                  }),
                },
              },
            },
          },
        },
      },
    },
  ],
});
export const optionsBarChart = (
  labels: string[],
  animation: boolean,
  businessName?: string,
): ApexOptions => {
  const colors = {
    Facebook: '#7DE28D',
    Google: '#9EADFB',
    [`${businessName}`]: '#E689D0',
    TikTok: '#68C7C0',
    Klaviyo: '#FAF333',
    Other: '#A1B3C4',
  };

  return {
    chart: {
      height: 320,
      toolbar: {
        show: false,
      },
      fontFamily: '',
      animations: {
        enabled: true,
        animateGradually: {
          enabled: true,
          delay: 3000,
        },
      },
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: labels.map((label) => colors[label]),
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#34404B'],
        fontWeight: 600,
        fontSize: '14px',
      },
      formatter: function (val: any, opt: any) {
        return `${opt.w.globals.labels[opt.dataPointIndex]}: ${val}%`;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
        opacity: 0.1,
      },
    },
    stroke: {
      width: 1,
      colors: ['#EBEFF3'],
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      markers: {
        radius: 12,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
  };
};

export const optionsLineChart = (
  labels: string[],
  animation: boolean,
  labelClass?: string,
  rotate = 0,
  fixedInteger = false,
): ApexOptions => ({
  chart: {
    height: 250,
    fontFamily: '',
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: animation,
    },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#84D3FF', '#7DE28D', '#9D84FF'],
  grid: {
    show: true,
    padding: {
      bottom: 0,
      right: 40,
      left: 40,
      top: 0,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  markers: {
    size: 0,
    strokeWidth: 0,
  },
  stroke: {
    curve: 'smooth',
    width: 4,
  },
  xaxis: {
    categories: labels,
    tooltip: {
      enabled: false,
    },
    labels: {
      offsetX: 0,
      offsetY: 5,
      style: {
        cssClass: labelClass,
      },
      hideOverlappingLabels: false,
      rotate: rotate,
    },
  },
  yaxis: {
    labels: {
      ...(fixedInteger && {
        formatter: (val) => Number(val).toFixed(0),
      }),
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
  },
});

export const optionsRadialBar = (animation: boolean): ApexOptions => ({
  series: [60],
  chart: {
    height: 38,
    width: 38,
    type: 'radialBar',
    animations: {
      enabled: animation,
    },
  },
  colors: ['#32C4D4'],
  grid: {
    padding: {
      left: -18,
      right: -18,
      top: -18,
      bottom: -18,
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '15%',
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
      },
    },
  },

  stroke: {
    lineCap: 'round',
  },
  legend: {
    show: false,
  },
});
