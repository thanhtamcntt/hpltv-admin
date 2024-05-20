export const options = (max) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#36A2EB',
        align: 'top',
        verticalAlign: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: max * 10,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };
  return options;
};

export const optionsPur = (max) => {
  const optionsPur = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#36A2EB',
        align: 'top',
        verticalAlign: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: max + 50,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };
  return optionsPur;
};

export const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '17%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '17%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
    width: '36%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: '20%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Gender',
    dataIndex: 'sex',
    key: 'sex',
    width: '10%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
];

export const columns2 = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Type Package',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Price',
    dataIndex: 'monthlyPrice',
    key: 'price',
    width: '25%',
    render: (text) => `$${text}`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
];

export const optionsSelect = [
  {
    value: 'day',
    label: 'Day',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'year',
    label: 'Year',
  },
];
