import data from "./data.json";

export const MappedinOrange = "#bf4320";
export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const plugin = {
  id: "corsair",
  defaults: {
    width: 1,
    color: "#FF4949",
    dash: [3, 3],
  },
  afterInit: (chart, args, opts) => {
    chart.corsair = {
      x: 0,
      y: 0,
    };
  },
  afterEvent: (chart, args) => {
    const { inChartArea } = args;
    const { type, x, y } = args.event;

    chart.corsair = { x, y, draw: inChartArea };
    chart.draw();
  },
  beforeDatasetsDraw: (chart, args, opts) => {
    const { ctx } = chart;
    const { top, bottom, left, right } = chart.chartArea;
    const { x, y, draw } = chart.corsair;
    if (!draw) return;

    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = opts.width;
    ctx.strokeStyle = opts.color;
    //ctx.setLineDash(opts.dash);
    ctx.moveTo(x, bottom);
    ctx.lineTo(x, top);
    //ctx.moveTo(left, y);
    //ctx.lineTo(right, y);
    ctx.stroke();

    ctx.restore();
  },
};

export const occupancyData = {
  labels: weekdays,
  datasets: [
    {
      data: data["occupancyByHour"][0],
    },
    {
      data: data["occupancyByHour"][1],
    },
    {
      data: data["occupancyByHour"][2],
    },
    {
      data: data["occupancyByHour"][3],
    },
    {
      data: data["occupancyByHour"][4],
    },
    {
      data: data["occupancyByHour"][5],
    },
    {
      data: data["occupancyByHour"][6],
    },
    {
      data: data["occupancyByHour"][7],
    },
    {
      data: data["occupancyByHour"][8],
    },
    {
      data: data["occupancyByHour"][9],
    },
    {
      data: data["occupancyByHour"][10],
    },
    {
      data: data["occupancyByHour"][11],
    },
  ],
};

export const chartOptions: any = {
  animation: false,
  maintainAspectRatio: false,
  borderColor: MappedinOrange,
  backgroundColor: MappedinOrange,
  hoverBorderWidth: 2,
  hoverBorderColor: "#CCCCCC",
  pointStyle: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  hover: {
    mode: "nearest",
    instersect: false,
    axis: "x",
  },
  scales: {
    x: {},
    y: {
      display: false,
      max: 100,
    },
  },
  plugins: {
    corsair: {
      color: "#AAAAAA",
    },
    title: {
      display: true,
      padding: 0,
      text: "Room/Desk Occupancy",
    },
    subtitle: {
      display: true,
      padding: {
        bottom: 10,
      },
      text: "July 2 - July 8",
    },
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};
