export const fetchDataSubscriberToday = async (setSubscriber) => {
  const response = await fetch(process.env.REACT_APP_API_GET_SUBSCRIBER_TODAY, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
    },
  });
  const json = await response.json();
  if (json.success) {
    setSubscriber(json.data);
  }
};

export const fetchDataSubscriberOrderToday = async (setData) => {
  const response = await fetch(
    process.env.REACT_APP_API_GET_SUBSCRIBER_ORDER_TODAY,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    },
  );
  const json = await response.json();
  if (json.success) {
    setData(json.data);
  }
};

export const fetchDataRegisterCurrentYear = async (setDataSummary) => {
  const response = await fetch(
    process.env.REACT_APP_API_GET_SUMMARY_PURCHASES_REGISTER_CURRENT_YEAR,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    },
  );
  const json = await response.json();
  if (json.success) {
    setDataSummary(json.data);
  }
};

export const fetchDataSummaryPurchases = async (
  setLabelPur,
  setDatasetPur,
  type,
  setDataExportPurchase,
  setMaxTotal,
) => {
  const response = await fetch(
    process.env.REACT_APP_API_GET_SUMMARY_PURCHASES + '?type=' + type,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    },
  );
  const json = await response.json();
  let labels = [],
    datasets = [],
    dataExport = [],
    total = 0;
  if (json.success) {
    for (let i = 0; i < json.data.length; i++) {
      let dataArr = [];
      if (i === 0) {
        const arr = Object.keys(json.data[i]);
        dataExport.push(arr);
      }
      if (json.data[i].total > total) {
        total = json.data[i].total;
      }

      if (type === 'year') {
        labels.push(`${json.data[i].year}`);
        for (let key in json.data[i]) {
          dataArr.push(json.data[i][key]);
        }
      } else if (type === 'day') {
        labels.push(`${json.data[i].day}`);
        for (let key in json.data[i]) {
          dataArr.push(json.data[i][key]);
        }
      } else {
        labels.push(`${json.data[i].month} ${json.data[i].year}`);
        for (let key in json.data[i]) {
          dataArr.push(json.data[i][key]);
        }
      }
      datasets.push(json.data[i].total);
      dataExport.push(dataArr);
    }
  }
  setLabelPur(labels);
  setDataExportPurchase(dataExport);
  setMaxTotal(total);
  setDatasetPur([
    {
      label: 'Total Purchases',
      data: datasets,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
      maxBarThickness: 30,
    },
  ]);
};

export const fetchDataSummaryRegister = async (
  setLabel,
  setDataset,
  type,
  setDataExportRegister,
  setMaxCount,
) => {
  const response = await fetch(
    process.env.REACT_APP_API_GET_SUMMARY_REGISTER + '?type=' + type,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    },
  );
  const json = await response.json();
  let labels = [],
    datasets = [],
    dataExport = [],
    quantity = 0;
  if (json.success) {
    for (let i = 0; i < json.data.length; i++) {
      let dataArr = [];
      if (i === 0) {
        const arr = Object.keys(json.data[i]);
        dataExport.push(arr);
      }
      if (json.data[i].quantity > quantity) {
        quantity = json.data[i].quantity;
      }

      if (type === 'year') {
        labels.push(`${json.data[i].year}`);
        for (let key in json.data[i]) {
          dataArr.push(json.data[i][key]);
        }
      } else if (type === 'day') {
        labels.push(`${json.data[i].day}`);
        for (let key in json.data[i]) {
          dataArr.push(json.data[i][key]);
        }
      } else {
        labels.push(`${json.data[i].month} ${json.data[i].year}`);
        for (let key in json.data[i]) {
          dataArr.push(json.data[i][key]);
        }
      }
      datasets.push(json.data[i].quantity);
      dataExport.push(dataArr);
    }
  }
  setLabel(labels);
  setDataExportRegister(dataExport);
  setMaxCount(quantity);
  setDataset([
    {
      label: 'Total Subscriber',
      data: datasets,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
      maxBarThickness: 30,
    },
  ]);
};
